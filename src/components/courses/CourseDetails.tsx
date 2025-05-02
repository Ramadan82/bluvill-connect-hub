import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  BookOpen, 
  CheckCircle, 
  Circle, 
  Clock,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string | null;
  lessons: Lesson[];
  sequence_order: number;
}

interface Lesson {
  id: string;
  title: string;
  sequence_order: number;
  completed?: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  modules: Module[];
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;
      
      try {
        // Fetch basic course info
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single();
        
        if (courseError) throw courseError;
        
        // Fetch modules
        const { data: modulesData, error: modulesError } = await supabase
          .from('course_modules')
          .select('*')
          .eq('course_id', courseId)
          .order('sequence_order', { ascending: true });
        
        if (modulesError) throw modulesError;
        
        // For each module, fetch lessons
        const modulesWithLessons = await Promise.all(
          modulesData.map(async (module) => {
            const { data: lessonsData, error: lessonsError } = await supabase
              .from('course_lessons')
              .select('id, title, sequence_order')
              .eq('module_id', module.id)
              .order('sequence_order', { ascending: true });
            
            if (lessonsError) throw lessonsError;
            return {
              ...module,
              lessons: lessonsData || []
            };
          })
        );
        
        // Get total lesson count
        const totalLessons = modulesWithLessons.reduce(
          (acc, module) => acc + module.lessons.length, 0
        );
        
        // Get user's completed lessons for this course
        const { data: { session } } = await supabase.auth.getSession();
        let completedLessons = 0;
        let progress = 0;
        
        if (session) {
          // Get all lesson IDs for this course
          const lessonIds = modulesWithLessons.flatMap(
            module => module.lessons.map(lesson => lesson.id)
          );
          
          // Fetch completion status for these lessons
          if (lessonIds.length > 0) {
            const { data: progressData, error: progressError } = await supabase
              .from('lesson_progress')
              .select('lesson_id, completed')
              .eq('user_id', session.user.id)
              .eq('completed', true)
              .in('lesson_id', lessonIds);
            
            if (progressError) throw progressError;
            
            completedLessons = progressData?.length || 0;
            
            // Add completion status to each lesson
            if (progressData) {
              modulesWithLessons.forEach(module => {
                module.lessons.forEach(lesson => {
                  // Here we're adding the completed property to the lesson object
                  lesson.completed = progressData.some(p => p.lesson_id === lesson.id) || false;
                });
              });
            }
          }
          
          progress = totalLessons > 0 
            ? Math.round((completedLessons / totalLessons) * 100) 
            : 0;
        }
        
        setCourse({
          ...courseData,
          modules: modulesWithLessons,
          progress,
          completedLessons,
          totalLessons
        });
      } catch (error) {
        console.error('Error fetching course details:', error);
        toast({
          title: 'Error',
          description: 'Failed to load course details',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Course not found</p>
        <Link to="/student-portal/courses" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          Go back to courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link to="/student-portal/dashboard" className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back</span>
        </Link>
        <h2 className="text-2xl font-bold">{course.title}</h2>
      </div>
      
      {course.image_url && (
        <div className="rounded-lg overflow-hidden h-48 md:h-64 lg:h-80">
          <img 
            src={course.image_url} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course overview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span>Progress</span>
                  <span className="font-medium">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-sm text-gray-500 mt-1">
                  {course.completedLessons} of {course.totalLessons} lessons completed
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Course stats */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">{course.modules.length} Modules</p>
                  <p className="text-sm text-gray-500">{course.totalLessons} Total lessons</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-500" />
                <div>
                  <p className="font-medium">Self-paced</p>
                  <p className="text-sm text-gray-500">Learn at your own speed</p>
                </div>
              </div>
              <div className="pt-2">
                <Link to={`/student-portal/courses/${courseId}/lessons/${course.modules[0]?.lessons[0]?.id}`}>
                  <Button className="w-full">
                    {course.completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Course content */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Course Content</h3>
        <Accordion type="single" collapsible className="w-full">
          {course.modules.map((module) => (
            <AccordionItem key={module.id} value={module.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start">
                  <span className="text-lg">{module.title}</span>
                  <span className="text-sm text-gray-500">{module.lessons.length} lessons</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pl-2">
                  {module.lessons.map((lesson) => (
                    <li key={lesson.id} className="py-1">
                      <Link 
                        to={`/student-portal/courses/${courseId}/lessons/${lesson.id}`}
                        className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                      >
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5 mr-3 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="h-5 w-5 mr-3 text-gray-400 flex-shrink-0" />
                        )}
                        <span>{lesson.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default CourseDetails;
