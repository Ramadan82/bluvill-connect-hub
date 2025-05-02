import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, ChevronRight } from 'lucide-react';

interface EnrolledCourse {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  progress: number;
  last_accessed?: string;
  total_lessons: number;
  completed_lessons: number;
}

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user's email to display
          setUsername(session.user.email || 'Student');
          
          // Fetch user's enrolled courses
          const { data: enrollments, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select(`
              course_id,
              enrolled_at,
              completed_at,
              courses (
                id,
                title,
                description,
                image_url
              )
            `)
            .eq('user_id', session.user.id);
          
          if (enrollmentsError) throw enrollmentsError;
          
          // For each enrollment, calculate progress
          const coursesWithProgress = await Promise.all(
            enrollments.map(async (enrollment) => {
              const course = enrollment.courses;
              
              // Get total lessons for the course
              const { count: totalLessons, error: lessonsError } = await supabase
                .from('course_lessons')
                .select('*', { count: 'exact', head: true })
                .in('module_id', 
                  // Fix: Extract the SQL query and get the data first
                  (
                    await supabase
                      .from('course_modules')
                      .select('id')
                      .eq('course_id', course.id)
                  ).data?.map(m => m.id) || []
                );
              
              if (lessonsError) throw lessonsError;
              
              // Get module IDs for the course
              const { data: modules } = await supabase
                .from('course_modules')
                .select('id')
                .eq('course_id', course.id);
                
              // Extract module IDs as an array of strings
              const moduleIds = modules ? modules.map(m => m.id) : [];
              
              // Get lessons for these modules only if we have module IDs
              let lessonIds: string[] = [];
              if (moduleIds.length > 0) {
                const { data: lessons } = await supabase
                  .from('course_lessons')
                  .select('id')
                  .in('module_id', moduleIds);
                  
                lessonIds = lessons ? lessons.map(l => l.id) : [];
              }
              
              // Get completed lessons for the course only if we have lesson IDs
              let completedLessons = 0;
              let latestAccess = null;
              
              if (lessonIds.length > 0) {
                // Get completed lessons count
                const { count: completedCount, error: progressError } = await supabase
                  .from('lesson_progress')
                  .select('*', { count: 'exact', head: true })
                  .eq('user_id', session.user.id)
                  .eq('completed', true)
                  .in('lesson_id', lessonIds);
                
                if (progressError) throw progressError;
                completedLessons = completedCount || 0;
                
                // Get latest accessed lesson
                const { data: latestAccessData } = await supabase
                  .from('lesson_progress')
                  .select('last_accessed')
                  .eq('user_id', session.user.id)
                  .in('lesson_id', lessonIds)
                  .order('last_accessed', { ascending: false })
                  .limit(1);
                
                latestAccess = latestAccessData?.[0]?.last_accessed;
              }
              
              const progress = totalLessons > 0 
                ? Math.round((completedLessons / totalLessons) * 100) 
                : 0;
              
              return {
                id: course.id,
                title: course.title,
                description: course.description,
                image_url: course.image_url,
                progress,
                last_accessed: latestAccess,
                total_lessons: totalLessons || 0,
                completed_lessons: completedLessons || 0
              };
            })
          );
          
          setEnrolledCourses(coursesWithProgress);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h2 className="text-2xl font-bold">Welcome, {username}!</h2>
        <p className="text-gray-500">Track your progress and continue learning.</p>
      </div>
      
      {/* Course progress section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">My Courses</h3>
          <Link to="/student-portal/courses" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
            View All Courses
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <Card key={i} className="animate-pulse">
                <div className="h-40 bg-gray-200 rounded-t-lg" />
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="h-4 bg-gray-200 rounded w-full mb-4" />
                  <div className="h-2 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrolledCourses.map(course => (
              <Link key={course.id} to={`/student-portal/courses/${course.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer h-full">
                  {course.image_url && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={course.image_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="line-clamp-1">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{course.completed_lessons}/{course.total_lessons} lessons</span>
                      </div>
                      {course.last_accessed && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            {new Date(course.last_accessed).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Award className="h-12 w-12 text-blue-300 mb-4" />
              <h4 className="text-lg font-medium mb-1">No Enrolled Courses</h4>
              <p className="text-gray-500 text-center mb-4">
                Explore our course catalog and start learning today.
              </p>
              <Link to="/student-portal/courses" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse Courses
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
