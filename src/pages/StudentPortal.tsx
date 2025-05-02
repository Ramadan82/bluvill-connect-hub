
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
  User, Settings, Home, Mail, HelpCircle
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

const StudentPortal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
            <SidebarProvider>
              <div className="flex w-full min-h-[70vh]">
                {/* Sidebar */}
                <Sidebar side="left" variant="sidebar" className="bg-white">
                  <SidebarHeader className="p-4 flex justify-between items-center">
                    <h3 className="font-semibold text-lg">Student Portal</h3>
                    <SidebarTrigger />
                  </SidebarHeader>
                  
                  <SidebarContent className="p-2">
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton 
                          asChild
                          tooltip="Dashboard"
                          isActive={isDashboardPage}
                        >
                          <Link to="/student-portal/dashboard">
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
                
                {/* Main Content Area */}
                <main className={`flex-1 transition-all duration-300 ${isCoursePage ? '' : 'p-6'}`}>
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
