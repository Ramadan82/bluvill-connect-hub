
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Award, Clock, ChevronRight, Bell, Calendar, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
}

interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  location: string | null;
  type: string;
}

interface AcademicDeadline {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  type: string;
}

const StudentDashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [academicDeadlines, setAcademicDeadlines] = useState<AcademicDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Get user's profile to display first name
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('full_name, email')
            .eq('id', session.user.id)
            .single();
            
          if (profileData?.full_name) {
            // Extract first name from full name
            setFirstName(profileData.full_name.split(' ')[0]);
          } else {
            // Fallback to email username if no full name
            setFirstName(session.user.email?.split('@')[0] || 'Student');
          }
          
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
              
              // Get module IDs for the course
              const { data: modules } = await supabase
                .from('course_modules')
                .select('id')
                .eq('course_id', course.id);
                
              // Extract module IDs as an array of strings
              const moduleIds = modules ? modules.map(m => m.id) : [];
              
              // Get total lessons for the course
              let totalLessons = 0;
              let lessonIds: string[] = [];
              
              if (moduleIds.length > 0) {
                // Get lessons count for all modules
                const { count, error: lessonsError } = await supabase
                  .from('course_lessons')
                  .select('id', { count: 'exact' })
                  .in('module_id', moduleIds);
                  
                if (lessonsError) throw lessonsError;
                totalLessons = count || 0;
                
                // Get all lesson IDs
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
                  .select('*', { count: 'exact' })
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

          // Fetch announcements
          const { data: announcementsData, error: announcementsError } = await supabase
            .from('announcements')
            .select('*')
            .eq('published', true)
            .order('created_at', { ascending: false })
            .limit(5);

          if (announcementsError) throw announcementsError;
          setAnnouncements(announcementsData || []);

          // Fetch upcoming events
          const { data: eventsData, error: eventsError } = await supabase
            .from('events')
            .select('*')
            .eq('published', true)
            .gte('event_date', new Date().toISOString())
            .order('event_date', { ascending: true })
            .limit(5);

          if (eventsError) throw eventsError;
          setUpcomingEvents(eventsData || []);

          // Fetch academic deadlines
          const { data: deadlinesData, error: deadlinesError } = await supabase
            .from('academic_deadlines')
            .select('*')
            .eq('published', true)
            .gte('due_date', new Date().toISOString())
            .order('due_date', { ascending: true })
            .limit(5);

          if (deadlinesError) throw deadlinesError;
          setAcademicDeadlines(deadlinesData || []);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'academic':
        return <BookOpen className="h-4 w-4 text-blue-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'social':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDeadlineTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'assignment':
        return 'bg-yellow-100 text-yellow-800';
      case 'project':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h2 className="text-2xl font-bold">Welcome, {firstName}!</h2>
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
                  {course.image_url ? (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={course.image_url} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder image if the course image fails to load
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      <BookOpen className="h-12 w-12 text-gray-400" />
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

      {/* Announcements Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : announcements.length > 0 ? (
          <div className="space-y-3">
            {announcements.map(announcement => (
              <Card key={announcement.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getAnnouncementIcon(announcement.type)}
                        <h4 className="font-medium">{announcement.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          announcement.type === 'urgent' ? 'bg-red-100 text-red-800' :
                          announcement.type === 'academic' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {announcement.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                    </div>
                    <span className="text-xs text-gray-500 ml-4">
                      {new Date(announcement.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <Bell className="h-8 w-8 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No recent announcements</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <Card key={event.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <h4 className="font-medium">{event.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeColor(event.type)}`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{new Date(event.event_date).toLocaleDateString()}</span>
                          {event.location && <span>{event.location}</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No upcoming events</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Academic Deadlines */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Academic Deadlines</h3>
          {loading ? (
            <div className="space-y-3">
              {[1, 2].map(i => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : academicDeadlines.length > 0 ? (
            <div className="space-y-3">
              {academicDeadlines.map(deadline => (
                <Card key={deadline.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                          <h4 className="font-medium">{deadline.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getDeadlineTypeColor(deadline.type)}`}>
                            {deadline.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{deadline.description}</p>
                        <span className="text-xs text-gray-500">
                          Due: {new Date(deadline.due_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">No upcoming deadlines</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
