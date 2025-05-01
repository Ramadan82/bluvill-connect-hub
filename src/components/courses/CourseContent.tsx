
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, BookOpen, CheckCircle, Circle, 
  Clock, FileText, Loader2 
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from '@/components/ui/scroll-area';

interface Lesson {
  id: string;
  title: string;
  content: string | null;
  video_url: string | null;
  sequence_order: number;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  sequence_order: number;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string | null;
}

interface LessonProgress {
  lesson_id: string;
  completed: boolean;
}

const CourseContent = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      
      try {
        // Fetch course details
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
        
        if (courseError) throw courseError;
        
        // Fetch modules with lessons
        const { data: modulesData, error: modulesError } = await supabase
          .from('course_modules')
          .select('*')
          .eq('course_id', courseId)
          .order('sequence_order', { ascending: true });
        
        if (modulesError) throw modulesError;
        
        // For each module, fetch its lessons
        const modulesWithLessons = await Promise.all(
          modulesData.map(async (module) => {
            const { data: lessonsData, error: lessonsError } = await supabase
              .from('course_lessons')
              .select('*')
              .eq('module_id', module.id)
              .order('sequence_order', { ascending: true });
            
            if (lessonsError) throw lessonsError;
            
            return {
              ...module,
              lessons: lessonsData || []
            };
          })
        );
        
        // Fetch lesson progress
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: progressData, error: progressError } = await supabase
            .from('lesson_progress')
            .select('lesson_id, completed')
            .eq('user_id', session.user.id);
          
          if (progressError) throw progressError;
          
          const progressMap = progressData.reduce((acc, curr) => {
            acc[curr.lesson_id] = curr.completed;
            return acc;
          }, {} as Record<string, boolean>);
          
          setLessonProgress(progressMap);
        }
        
        setCourse(courseData);
        setModules(modulesWithLessons);
        
        // If a specific lesson is specified, load it
        if (lessonId) {
          // Find the lesson in all modules
          for (const module of modulesWithLessons) {
            const lesson = module.lessons.find(l => l.id === lessonId);
            if (lesson) {
              setCurrentLesson(lesson);
              break;
            }
          }
        } else if (modulesWithLessons.length > 0 && modulesWithLessons[0].lessons.length > 0) {
          // Navigate to the first lesson if none is specified
          navigate(`/student-portal/courses/${courseId}/lessons/${modulesWithLessons[0].lessons[0].id}`);
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load course content. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseData();
  }, [courseId, lessonId, navigate]);
  
  const handleMarkComplete = async () => {
    if (!currentLesson || !courseId) return;
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: 'Authentication Required',
          description: 'Please log in to track your progress.',
          variant: 'destructive',
        });
        return;
      }
      
      // Check if progress record already exists
      const { data: existingProgress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('user_id', session.user.id)
        .eq('lesson_id', currentLesson.id)
        .single();
      
      if (existingProgress) {
        // Update existing record
        await supabase
          .from('lesson_progress')
          .update({ 
            completed: !lessonProgress[currentLesson.id],
            completion_date: !lessonProgress[currentLesson.id] ? new Date().toISOString() : null,
            last_accessed: new Date().toISOString()
          })
          .eq('user_id', session.user.id)
          .eq('lesson_id', currentLesson.id);
      } else {
        // Create new record
        await supabase
          .from('lesson_progress')
          .insert({
            user_id: session.user.id,
            lesson_id: currentLesson.id,
            completed: true,
            completion_date: new Date().toISOString(),
            last_accessed: new Date().toISOString()
          });
      }
      
      // Update local state
      setLessonProgress({
        ...lessonProgress,
        [currentLesson.id]: !lessonProgress[currentLesson.id]
      });
      
      toast({
        title: lessonProgress[currentLesson.id] ? 'Lesson Unmarked' : 'Lesson Completed',
        description: lessonProgress[currentLesson.id] 
          ? 'This lesson has been marked as incomplete.'
          : 'This lesson has been marked as complete.',
      });
    } catch (error) {
      console.error('Error updating lesson progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to update lesson progress. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const navigateToNextLesson = () => {
    if (!currentLesson || !courseId) return;
    
    // Find current module and lesson indexes
    let currentModuleIndex = -1;
    let currentLessonIndex = -1;
    
    for (let i = 0; i < modules.length; i++) {
      const lessonIndex = modules[i].lessons.findIndex(l => l.id === currentLesson.id);
      if (lessonIndex !== -1) {
        currentModuleIndex = i;
        currentLessonIndex = lessonIndex;
        break;
      }
    }
    
    if (currentModuleIndex === -1 || currentLessonIndex === -1) return;
    
    // Check if there's another lesson in the same module
    if (currentLessonIndex < modules[currentModuleIndex].lessons.length - 1) {
      const nextLesson = modules[currentModuleIndex].lessons[currentLessonIndex + 1];
      navigate(`/student-portal/courses/${courseId}/lessons/${nextLesson.id}`);
    } else if (currentModuleIndex < modules.length - 1) {
      // Move to first lesson of the next module
      const nextLesson = modules[currentModuleIndex + 1].lessons[0];
      if (nextLesson) {
        navigate(`/student-portal/courses/${courseId}/lessons/${nextLesson.id}`);
      }
    } else {
      // End of course reached
      toast({
        title: 'Course Complete',
        description: 'You have reached the end of this course.',
      });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Course navigation sidebar */}
      <div className="lg:col-span-1 bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <Link to="/student-portal/courses" className="flex items-center text-blue-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to Courses</span>
          </Link>
          <h3 className="text-lg font-medium">{course?.title}</h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course?.description}</p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-350px)]">
          <div className="p-4">
            <Accordion type="multiple" className="w-full">
              {modules.map((module) => (
                <AccordionItem key={module.id} value={module.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left">{module.title}</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 py-1">
                      {module.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <Link 
                            to={`/student-portal/courses/${courseId}/lessons/${lesson.id}`}
                            className={`flex items-center px-2 py-1.5 text-sm rounded-md ${
                              currentLesson?.id === lesson.id 
                                ? 'bg-blue-50 text-blue-700' 
                                : 'hover:bg-gray-100'
                            }`}
                          >
                            {lessonProgress[lesson.id] ? (
                              <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                            )}
                            <span className="line-clamp-1">{lesson.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
      
      {/* Lesson content */}
      <div className="lg:col-span-3 bg-white rounded-lg shadow p-6">
        {currentLesson ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{currentLesson.title}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="mr-4">Last updated: {new Date().toLocaleDateString()}</span>
                <FileText className="h-4 w-4 mr-1" />
                <span>Lesson content</span>
              </div>
            </div>
            
            {currentLesson.video_url && (
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe 
                  src={currentLesson.video_url} 
                  title="Video content"
                  className="w-full h-96 border-0 rounded-md mb-6" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            {currentLesson.content ? (
              <div className="prose max-w-none mb-8">
                {currentLesson.content}
              </div>
            ) : (
              <div className="text-gray-500 italic mb-8">
                No additional content for this lesson.
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row justify-between border-t pt-6 mt-8">
              <Button 
                variant="outline" 
                className="mb-3 sm:mb-0"
                onClick={handleMarkComplete}
              >
                {lessonProgress[currentLesson.id] ? (
                  <>
                    <Circle className="h-4 w-4 mr-2" />
                    Mark as Incomplete
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Complete
                  </>
                )}
              </Button>
              
              <Button onClick={navigateToNextLesson}>
                <BookOpen className="h-4 w-4 mr-2" />
                Next Lesson
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No Lesson Selected</h3>
            <p className="text-gray-500 mt-2">
              Please select a lesson from the sidebar to start learning.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
