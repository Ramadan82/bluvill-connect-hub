
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  BookOpen, Calendar, FileText, LogOut, 
  User, Settings, Home, Mail, HelpCircle, Menu, X
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import CoursesList from '@/components/courses/CoursesList';
import CourseContent from '@/components/courses/CourseContent';
import CourseDetails from '@/components/courses/CourseDetails';
import StudentDashboard from '@/components/courses/StudentDashboard';
import CalendarPage from '@/components/student/CalendarPage';
import ResourcesPage from '@/components/student/ResourcesPage';
import MessagesPage from '@/components/student/MessagesPage';
import ProfilePage from '@/components/student/ProfilePage';
import SettingsPage from '@/components/student/SettingsPage';
import HelpPage from '@/components/student/HelpPage';

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}

const StudentPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error checking auth status:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
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
  
  const isCoursePage = location.pathname.includes('/courses/') && location.pathname.includes('/lessons/');
  const isDashboardPage = location.pathname === '/student-portal' || location.pathname === '/student-portal/dashboard';
  const isCoursesPage = location.pathname === '/student-portal/courses';

  const closeMobileSidebar = () => setMobileSidebarOpen(false);
  const toggleMobileSidebar = () => setMobileSidebarOpen(!mobileSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50">
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
            <SidebarProvider>
              <div className="flex w-full min-h-[70vh]">
                {/* Desktop Sidebar - Always visible */}
                <div className="hidden md:block md:w-64">
                  <Sidebar 
                    side="left" 
                    className="bg-white shadow-lg h-[calc(100vh-120px)] sticky top-24"
                  >
                    <SidebarHeader className="p-4 flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Student Portal</h3>
                    </SidebarHeader>
                    
                    <SidebarContent className="p-2">
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Dashboard"
                            isActive={isDashboardPage}
                          >
                            <Link to="/student-portal">
                              <Home className="h-5 w-5 mr-2" />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="My Courses"
                            isActive={isCoursesPage || location.pathname.includes('/courses/')}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/courses">
                              <BookOpen className="h-5 w-5 mr-2" />
                              <span>My Courses</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Calendar"
                            isActive={location.pathname === '/student-portal/calendar'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/calendar">
                              <Calendar className="h-5 w-5 mr-2" />
                              <span>Calendar</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Resources"
                            isActive={location.pathname === '/student-portal/resources'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/resources">
                              <FileText className="h-5 w-5 mr-2" />
                              <span>Resources</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Messages"
                            isActive={location.pathname === '/student-portal/messages'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/messages">
                              <Mail className="h-5 w-5 mr-2" />
                              <span>Messages</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Profile"
                            isActive={location.pathname === '/student-portal/profile'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/profile">
                              <User className="h-5 w-5 mr-2" />
                              <span>Profile</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Settings"
                            isActive={location.pathname === '/student-portal/settings'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/settings">
                              <Settings className="h-5 w-5 mr-2" />
                              <span>Settings</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Help"
                            isActive={location.pathname === '/student-portal/help'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/help">
                              <HelpCircle className="h-5 w-5 mr-2" />
                              <span>Help</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarContent>
                    
                    <SidebarFooter className="border-t p-4">
                      <Button 
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Log Out
                      </Button>
                    </SidebarFooter>
                  </Sidebar>
                </div>

                {/* Mobile Sidebar - Controlled by state */}
                <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                  <div className="relative h-full w-64 bg-white shadow-lg">
                    <SidebarHeader className="p-4 flex justify-between items-center">
                      <h3 className="font-semibold text-lg">Student Portal</h3>
                      <button onClick={closeMobileSidebar} className="p-1 rounded-md hover:bg-gray-100">
                        <X className="h-6 w-6" />
                      </button>
                    </SidebarHeader>
                    
                    <SidebarContent className="p-2">
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Dashboard"
                            isActive={isDashboardPage}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal">
                              <Home className="h-5 w-5 mr-2" />
                              <span>Dashboard</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="My Courses"
                            isActive={isCoursesPage || location.pathname.includes('/courses/')}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/courses">
                              <BookOpen className="h-5 w-5 mr-2" />
                              <span>My Courses</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Calendar"
                            isActive={location.pathname === '/student-portal/calendar'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/calendar">
                              <Calendar className="h-5 w-5 mr-2" />
                              <span>Calendar</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Resources"
                            isActive={location.pathname === '/student-portal/resources'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/resources">
                              <FileText className="h-5 w-5 mr-2" />
                              <span>Resources</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Messages"
                            isActive={location.pathname === '/student-portal/messages'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/messages">
                              <Mail className="h-5 w-5 mr-2" />
                              <span>Messages</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Profile"
                            isActive={location.pathname === '/student-portal/profile'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/profile">
                              <User className="h-5 w-5 mr-2" />
                              <span>Profile</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Settings"
                            isActive={location.pathname === '/student-portal/settings'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/settings">
                              <Settings className="h-5 w-5 mr-2" />
                              <span>Settings</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        
                        <SidebarMenuItem>
                          <SidebarMenuButton 
                            asChild
                            tooltip="Help"
                            isActive={location.pathname === '/student-portal/help'}
                            onClick={closeMobileSidebar}
                          >
                            <Link to="/student-portal/help">
                              <HelpCircle className="h-5 w-5 mr-2" />
                              <span>Help</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarContent>
                    
                    <SidebarFooter className="border-t p-4">
                      <Button 
                        variant="ghost"
                        onClick={() => {
                          handleLogout();
                          closeMobileSidebar();
                        }}
                        className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700"
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Log Out
                      </Button>
                    </SidebarFooter>
                  </div>
                </div>

                {/* Overlay for mobile sidebar */}
                {mobileSidebarOpen && (
                  <div 
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
                    onClick={closeMobileSidebar}
                  />
                )}
                
                {/* Mobile toggle button */}
                <div className="md:hidden fixed bottom-4 right-4 z-40">
                  <Button 
                    size="icon" 
                    className="rounded-full h-12 w-12 shadow-lg bg-blue-600 hover:bg-blue-700"
                    onClick={toggleMobileSidebar}
                  >
                    {mobileSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                  </Button>
                </div>
                
                {/* Main Content */}
                <main className={`flex-1 ${isCoursePage ? '' : 'p-6'} ${mobileSidebarOpen ? 'ml-64' : ''}`}>
                  <div className={`${isCoursePage ? '' : 'bg-white rounded-lg shadow p-6'}`}>
                    <Routes>
                      <Route path="/" element={<StudentDashboard />} />
                      <Route path="/dashboard" element={<StudentDashboard />} />
                      <Route path="/courses" element={<CoursesList />} />
                      <Route path="/courses/:courseId" element={<CourseDetails />} />
                      <Route path="/courses/:courseId/lessons/:lessonId" element={<CourseContent />} />
                      <Route path="/calendar" element={<CalendarPage />} />
                      <Route path="/resources" element={<ResourcesPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/profile" element={<ProfilePage />} />
                      <Route path="/settings" element={<SettingsPage />} />
                      <Route path="/help" element={<HelpPage />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </SidebarProvider>
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

export default StudentPortal;
