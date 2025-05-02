
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Calendar, FileText, LogOut, 
  User, Settings, Home, Mail, HelpCircle,
  Menu, X
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import CoursesList from '@/components/courses/CoursesList';
import CourseContent from '@/components/courses/CourseContent';
import CourseDetails from '@/components/courses/CourseDetails';
import StudentDashboard from '@/components/courses/StudentDashboard';
import { useIsMobile } from '@/hooks/use-mobile';

const StudentPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        if (!session?.user) {
          navigate('/login');
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, [navigate]);
  
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };
  
  // Determine if we're on a course page - used for layout decisions
  const isCoursePage = location.pathname.includes('/courses/') && location.pathname.includes('/lessons/');
  
  // Check if we're on the main student portal page or any of its subpages
  const isMainPortalPage = location.pathname === '/student-portal';
  const isDashboardPage = location.pathname === '/student-portal/dashboard';
  const isCoursesPage = location.pathname === '/student-portal/courses';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Only show the header on main portal and overview pages, not in course content */}
      {!isCoursePage && (
        <PageHeader
          title="Student Portal"
          subtitle="Access your courses, resources, and track your academic progress"
          background="gradient"
        />
      )}
      
      <section className={`py-4 ${isCoursePage ? 'pt-2' : ''}`}>
        <div className="container mx-auto px-4">
          {user ? (
            <div className="relative min-h-[70vh]">
              {/* Mobile sidebar toggle */}
              <div className="lg:hidden fixed bottom-4 right-4 z-40">
                <Button 
                  onClick={toggleSidebar} 
                  size="icon" 
                  className="rounded-full h-12 w-12 shadow-lg bg-blue-600 hover:bg-blue-700"
                >
                  {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>

              {/* Sidebar Navigation */}
              <div className={`
                lg:block fixed lg:sticky top-0 lg:top-24 z-30 
                transition-transform duration-300 ease-in-out
                ${isMobile ? (sidebarOpen ? 'translate-x-0' : 'translate-x-[-100%]') : ''}
                lg:translate-x-0 w-64 h-[calc(100vh-6rem)]
              `}>
                <div className="bg-white rounded-lg shadow p-4 h-full overflow-y-auto">
                  <div className="flex flex-col space-y-1">
                    <Link to="/student-portal/dashboard" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          isDashboardPage ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <Home className="h-5 w-5 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Link to="/student-portal/courses" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          isCoursesPage || location.pathname.includes('/courses/') ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <BookOpen className="h-5 w-5 mr-2" />
                        My Courses
                      </Button>
                    </Link>
                    <Link to="/student-portal/calendar" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/calendar' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <Calendar className="h-5 w-5 mr-2" />
                        Calendar
                      </Button>
                    </Link>
                    <Link to="/student-portal/resources" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/resources' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <FileText className="h-5 w-5 mr-2" />
                        Resources
                      </Button>
                    </Link>
                    <Link to="/student-portal/messages" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/messages' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <Mail className="h-5 w-5 mr-2" />
                        Messages
                      </Button>
                    </Link>
                    <Link to="/student-portal/profile" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/profile' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <User className="h-5 w-5 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Link to="/student-portal/settings" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/settings' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <Settings className="h-5 w-5 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Link to="/student-portal/help" onClick={closeSidebarOnMobile}>
                      <Button 
                        variant="ghost" 
                        className={`w-full justify-start ${
                          location.pathname === '/student-portal/help' ? 'bg-blue-50 text-blue-700' : ''
                        }`}
                      >
                        <HelpCircle className="h-5 w-5 mr-2" />
                        Help
                      </Button>
                    </Link>
                  </div>
                  <div className="pt-4 mt-4 border-t">
                    <Button 
                      variant="ghost" 
                      onClick={handleLogout}
                      className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area with padding for mobile sidebar */}
              <div className={`
                transition-all duration-300 ease-in-out
                ${isMobile ? 'pl-0' : 'lg:pl-72'}
              `}>
                <div className={`${isCoursePage ? '' : 'bg-white rounded-lg shadow p-6'} mt-4 lg:mt-0`}>
                  <Routes>
                    <Route path="/" element={<StudentDashboard />} />
                    <Route path="/dashboard" element={<StudentDashboard />} />
                    <Route path="/courses" element={<CoursesList />} />
                    <Route path="/courses/:courseId" element={<CourseDetails />} />
                    <Route path="/courses/:courseId/lessons/:lessonId" element={<CourseContent />} />
                    <Route path="/calendar" element={<CalendarPlaceholder />} />
                    <Route path="/resources" element={<ResourcesPlaceholder />} />
                    <Route path="/messages" element={<MessagesPlaceholder />} />
                    <Route path="/profile" element={<ProfilePlaceholder />} />
                    <Route path="/settings" element={<SettingsPlaceholder />} />
                    <Route path="/help" element={<HelpPlaceholder />} />
                  </Routes>
                  
                  {/* Show portal information when not on course routes */}
                  {isMainPortalPage && (
                    <div className="mt-8">
                      <Tabs defaultValue="about">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="about">About</TabsTrigger>
                          <TabsTrigger value="services">Services</TabsTrigger>
                          <TabsTrigger value="help">Help</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="about" className="mt-6 space-y-4">
                          <h3 className="text-lg font-semibold">About the Student Portal</h3>
                          <p className="text-gray-700">
                            The Bluvill University Student Portal is your one-stop platform for managing all aspects 
                            of your academic journey. From course enrollment to accessing learning resources, 
                            the portal offers a comprehensive set of tools to enhance your university experience.
                          </p>
                          <p className="text-gray-700">
                            Your personal dashboard gives you access to your course schedule, grades, 
                            learning materials, and communication tools to connect with faculty and other students.
                          </p>
                        </TabsContent>
                        
                        <TabsContent value="services" className="mt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start">
                              <BookOpen className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-semibold text-gray-800">Online Learning</h4>
                                <p className="text-gray-600 text-sm">Access course materials, video lectures, and interactive assignments</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <FileText className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-semibold text-gray-800">Academic Records</h4>
                                <p className="text-gray-600 text-sm">View your grades, transcripts, and academic progress</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <Calendar className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-semibold text-gray-800">Calendar & Scheduling</h4>
                                <p className="text-gray-600 text-sm">Track important dates, class schedules, and assignment deadlines</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start">
                              <BookOpen className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                              <div>
                                <h4 className="font-semibold text-gray-800">Course Enrollment</h4>
                                <p className="text-gray-600 text-sm">Browse and enroll in available courses for your program</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="help" className="mt-6 space-y-4">
                          <h3 className="text-lg font-semibold">Help & Support</h3>
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Technical Support</h4>
                            <p className="text-gray-700 mb-2">
                              For login issues, password resets, or technical difficulties with the portal.
                            </p>
                            <div className="flex items-center text-sm">
                              <span className="font-medium mr-2">Email:</span>
                              <a href="mailto:itsupport@bluvilluniversity.edu.ng" className="text-blue-600 hover:underline">
                                itsupport@bluvilluniversity.edu.ng
                              </a>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold text-blue-800 mb-2">Academic Support</h4>
                            <p className="text-gray-700 mb-2">
                              For questions about course content, assignments, or other academic matters.
                            </p>
                            <div className="flex items-center text-sm">
                              <span className="font-medium mr-2">Email:</span>
                              <a href="mailto:academics@bluvilluniversity.edu.ng" className="text-blue-600 hover:underline">
                                academics@bluvilluniversity.edu.ng
                              </a>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                <User className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Please Log In</h3>
              <p className="text-gray-600 mb-4">
                You need to be logged in to access the student portal.
              </p>
              <Link to="/login">
                <Button>
                  Log In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Placeholder components for future implementation
const CalendarPlaceholder = () => (
  <div className="text-center py-8">
    <Calendar className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Calendar Coming Soon</h3>
    <p className="text-gray-600">
      Track your class schedule, assignment due dates, and important academic deadlines.
    </p>
  </div>
);

const ResourcesPlaceholder = () => (
  <div className="text-center py-8">
    <FileText className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Resources Coming Soon</h3>
    <p className="text-gray-600">
      Access study materials, library resources, and academic support services.
    </p>
  </div>
);

const MessagesPlaceholder = () => (
  <div className="text-center py-8">
    <Mail className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Messages Coming Soon</h3>
    <p className="text-gray-600">
      Communicate with professors and classmates through our secure messaging system.
    </p>
  </div>
);

const ProfilePlaceholder = () => (
  <div className="text-center py-8">
    <User className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Profile Management Coming Soon</h3>
    <p className="text-gray-600">
      Update your personal information, preferences, and account settings.
    </p>
  </div>
);

const SettingsPlaceholder = () => (
  <div className="text-center py-8">
    <Settings className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Settings Coming Soon</h3>
    <p className="text-gray-600">
      Customize your portal experience, notification preferences, and privacy settings.
    </p>
  </div>
);

const HelpPlaceholder = () => (
  <div className="text-center py-8">
    <HelpCircle className="h-12 w-12 text-blue-300 mx-auto mb-4" />
    <h3 className="text-xl font-semibold mb-2">Help Center Coming Soon</h3>
    <p className="text-gray-600">
      Find answers to common questions and access technical support resources.
    </p>
    <div className="mt-6 text-left max-w-md mx-auto">
      <h4 className="font-semibold mb-2">Contact Support</h4>
      <p className="mb-2">For immediate assistance, please contact:</p>
      <div className="bg-gray-50 p-4 rounded border">
        <p className="flex items-center mb-2">
          <Mail className="h-4 w-4 mr-2 text-blue-500" />
          <a href="mailto:support@bluvilluniversity.edu.ng" className="text-blue-600 hover:underline">
            support@bluvilluniversity.edu.ng
          </a>
        </p>
        <p>Response time: Within 24 hours</p>
      </div>
    </div>
  </div>
);

export default StudentPortal;
