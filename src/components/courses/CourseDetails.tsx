
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { BookOpen, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Module {
  id: string;
  title: string;
  description: string | null;
  sequence_order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  sequence_order: number;
  completed?: boolean;  // Added completed property
}

interface Course {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  instructor_id: string | null;
  modules: Module[];
  totalLessons: number;
  completedLessons: number;
}

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [instructorName, setInstructorName] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch the course details
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select(`
            id, 
            title, 
            description, 
            image_url,
            instructor_id
          `)
          .eq('id', courseId)
          .single();
        
        if (courseError) throw courseError;
        
        // Fetch the modules for this course
        const { data: modulesData, error: modulesError } = await supabase
          .from('course_modules')
          .select(`
            id,
            title,
            description,
            sequence_order
          `)
          .eq('course_id', courseId)
          .order('sequence_order', { ascending: true });
        
        if (modulesError) throw modulesError;
        
        // If there are modules, set the first one as active
        if (modulesData && modulesData.length > 0) {
          setActiveModuleId(modulesData[0].id);
        }
        
        // Get all lessons for the modules
        const modulesWithLessons = await Promise.all(
          modulesData.map(async (module) => {
            const { data: lessonsData, error: lessonsError } = await supabase
              .from('course_lessons')
              .select(`
                id,
                title,
                sequence_order
              `)
              .eq('module_id', module.id)
              .order('sequence_order', { ascending: true });
            
            if (lessonsError) throw lessonsError;
            
            return {
              ...module,
              lessons: lessonsData || []
            };
          })
        );
        
        // Get total and completed lessons for the course
        const allLessons = modulesWithLessons.flatMap(module => module.lessons);
        const totalLessons = allLessons.length;
        
        // Get user's progress for this course (which lessons have been completed)
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user.id;
        
        let completedLessons = 0;
        
        if (userId) {
          // Get the lesson IDs
          const lessonIds = allLessons.map(lesson => lesson.id);
          
          // Get progress data for these lessons
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('lesson_id, completed')
            .eq('user_id', userId)
            .eq('completed', true)
            .in('lesson_id', lessonIds);
          
          if (progressData) {
            modulesWithLessons.forEach(module => {
              module.lessons.forEach(lesson => {
                // Here we're adding the completed property to the lesson object
                lesson.completed = progressData.some(p => p.lesson_id === lesson.id) || false;
              });
            });
            
            completedLessons = progressData.length;
          }
        }
        
        // Calculate progress percentage
        const progressPercentage = totalLessons > 0 
          ? Math.round((completedLessons / totalLessons) * 100) 
          : 0;
        
        setProgress(progressPercentage);
        
        // Get instructor name if available
        if (courseData.instructor_id) {
          const { data: instructorData } = await supabase
            .from('profiles')
            .select('email')
            .eq('id', courseData.instructor_id)
            .single();
          
          if (instructorData) {
            setInstructorName(instructorData.email);
          }
        }
        
        // Set the course with all its data
        setCourse({
          ...courseData,
          modules: modulesWithLessons,
          totalLessons,
          completedLessons
        });
        
      } catch (error) {
        console.error('Error fetching course details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);
  
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="h-40 w-full">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold mb-2">Course Not Found</h3>
        <p className="text-gray-500 mb-4">
          The course you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link to="/student-portal/courses">
          <Button>
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      {/* Course Header */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold">{course.title}</h1>
            {instructorName && <p className="text-gray-500">Instructor: {instructorName}</p>}
          </div>
          <Link to="/student-portal/courses">
            <Button variant="outline">
              <ChevronRight className="h-4 w-4 mr-2 rotate-180" />
              Back to All Courses
            </Button>
          </Link>
        </div>
        
        {course.image_url && (
          <div className="mt-4 h-48 md:h-64 lg:h-80 w-full overflow-hidden rounded-lg">
            <img 
              src={course.image_url} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      {/* Course Progress */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {course.completedLessons} of {course.totalLessons} lessons completed
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>
      
      {/* Course Description */}
      <div>
        <h2 className="text-xl font-semibold mb-3">About This Course</h2>
        <div className="prose max-w-none">
          {course.description || "No description available for this course."}
        </div>
      </div>
      
      {/* Course Modules and Lessons */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Course Content</h2>
        
        <div className="space-y-4">
          {course.modules.map((module) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader 
                className={`cursor-pointer ${activeModuleId === module.id ? 'bg-blue-50' : ''}`}
                onClick={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
              >
                <CardTitle className="flex justify-between items-center text-base">
                  <span>
                    Module {module.sequence_order}: {module.title}
                  </span>
                  <span className="text-sm font-normal text-gray-500">
                    {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                  </span>
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              
              {activeModuleId === module.id && (
                <CardContent className="px-0 py-0">
                  <Separator />
                  <ul>
                    {module.lessons.map((lesson, idx) => (
                      <li key={lesson.id} className={idx < module.lessons.length - 1 ? 'border-b' : ''}>
                        <Link 
                          to={`/student-portal/courses/${courseId}/lessons/${lesson.id}`} 
                          className="flex items-center justify-between py-3 px-6 hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            {lesson.completed ? (
                              <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                            ) : (
                              <PlayCircle className="h-5 w-5 text-blue-500 mr-3" />
                            )}
                            <span>Lesson {lesson.sequence_order}: {lesson.title}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
