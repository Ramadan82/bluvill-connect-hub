
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Calendar, 
  Book, 
  BookOpen, 
  Users, 
  FileText, 
  HelpCircle, 
  Mail, 
  Phone,
  LayoutDashboard,
  Settings,
  Bell,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaffRoutes from '@/components/staff/StaffRoutes';
import StaffTypeSelector from '@/components/staff/StaffTypeSelector';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const StaffPortal = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [staffType, setStaffType] = useState('academic');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New student inquiry', read: false },
    { id: 2, title: 'Faculty meeting today at 2PM', read: false },
    { id: 3, title: 'Grade submission deadline extended', read: true },
  ]);
  const [profile, setProfile] = useState({
    name: 'Loading...',
    email: 'Loading...',
    avatar: '',
    department: 'Loading...'
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate('/login');
          return;
        }
        
        // Check if user has staff role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .eq('role', 'staff')
          .maybeSingle();
        
        if (roleError && roleError.code !== 'PGRST116') {
          console.error("Error checking staff role:", roleError);
        }
        
        // If user doesn't have staff role, redirect to student portal
        if (!roleData) {
          toast({
            title: "Access Denied",
            description: "You do not have permission to access the staff portal.",
            variant: "destructive",
          });
          navigate('/student-portal');
          return;
        }
        
        // Get staff type (academic or non-academic)
        const { data: profileData } = await supabase
          .from('profiles')
          .select('staff_type, full_name, department, avatar_url')
          .eq('id', session.user.id)
          .single();
          
        if (profileData?.staff_type) {
          setStaffType(profileData.staff_type);
        }
        
        // Set user profile
        setProfile({
          name: profileData?.full_name || session.user.user_metadata?.full_name || 'Staff Member',
          email: session.user.email || 'No email available',
          avatar: profileData?.avatar_url || session.user.user_metadata?.avatar_url || '',
          department: profileData?.department || 'University Department'
        });
        
        setAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setAuthenticated(false);
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
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(note => ({ ...note, read: true })));
    toast({
      title: "Notifications",
      description: "All notifications marked as read",
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!authenticated) {
    return null; // Will redirect in useEffect
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-700">
                {staffType === 'academic' ? 'Academic Staff Portal' : 'Administrative Staff Portal'}
              </h1>
              <StaffTypeSelector 
                currentType={staffType}
                onTypeChange={setStaffType}
                className="hidden md:flex"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className="p-0">
                        <div className={`p-3 w-full ${notification.read ? '' : 'bg-blue-50'}`}>
                          <div className="flex justify-between items-start">
                            <span className={`${notification.read ? 'text-gray-600' : 'font-medium'}`}>
                              {notification.title}
                            </span>
                            {!notification.read && (
                              <Badge variant="secondary" className="ml-2 text-xs">New</Badge>
                            )}
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-3 text-center text-gray-500">No notifications</div>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <Link to="/staff-portal/notifications" className="p-3 w-full text-center text-blue-600">
                      View all notifications
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Messages */}
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback className="bg-blue-200 text-blue-700">
                        {profile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium">{profile.name}</p>
                      <p className="text-xs text-gray-500">{profile.department}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {/* Mobile staff type selector */}
          <div className="md:hidden mt-2">
            <StaffTypeSelector 
              currentType={staffType}
              onTypeChange={setStaffType}
              className="w-full"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-gray-50 border-r border-gray-200 p-4">
          <nav className="flex flex-col space-y-1">
            <Link to="/staff-portal" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <LayoutDashboard className="h-5 w-5 mr-3" />
              <span>Dashboard</span>
            </Link>
            <Link to="/staff-portal/calendar" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <Calendar className="h-5 w-5 mr-3" />
              <span>Academic Calendar</span>
            </Link>
            <Link to="/staff-portal/teaching" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <BookOpen className="h-5 w-5 mr-3" />
              <span>Teaching Resources</span>
            </Link>
            <Link to="/staff-portal/research" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <Book className="h-5 w-5 mr-3" />
              <span>Research Portal</span>
            </Link>
            <Link to="/staff-portal/directory" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <Users className="h-5 w-5 mr-3" />
              <span>Faculty Directory</span>
            </Link>
            <Link to="/staff-portal/forms" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <FileText className="h-5 w-5 mr-3" />
              <span>Forms & Policies</span>
            </Link>
            <Link to="/staff-portal/support" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <HelpCircle className="h-5 w-5 mr-3" />
              <span>Support Services</span>
            </Link>
          </nav>
          
          {/* Support Contact Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-700 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-2">Contact IT Support:</p>
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <Phone className="h-3 w-3 mr-2" />
              <span>+234 800 444 5555</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-3 w-3 mr-2" />
              <span>it@bluvilluniversity.edu.ng</span>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <StaffRoutes staffType={staffType} />
          <Outlet />
        </main>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex justify-around items-center fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10">
        <Link to="/staff-portal" className="flex flex-col items-center p-2">
          <LayoutDashboard className="h-5 w-5" />
          <span className="text-xs mt-1">Dashboard</span>
        </Link>
        <Link to="/staff-portal/calendar" className="flex flex-col items-center p-2">
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Calendar</span>
        </Link>
        <Link to="/staff-portal/teaching" className="flex flex-col items-center p-2">
          <BookOpen className="h-5 w-5" />
          <span className="text-xs mt-1">Teaching</span>
        </Link>
        <Link to="/staff-portal/forms" className="flex flex-col items-center p-2">
          <FileText className="h-5 w-5" />
          <span className="text-xs mt-1">Forms</span>
        </Link>
        <Link to="/staff-portal/support" className="flex flex-col items-center p-2">
          <HelpCircle className="h-5 w-5" />
          <span className="text-xs mt-1">Support</span>
        </Link>
      </nav>
    </div>
  );
};

export default StaffPortal;
