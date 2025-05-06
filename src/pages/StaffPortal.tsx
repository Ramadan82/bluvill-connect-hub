import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { LogOut, Calendar, Book, BookOpen, Users, FileText, HelpCircle, Mail, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import StaffDashboard from '@/components/staff/StaffDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StaffPortal = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <PageHeader
        title="Staff Portal"
        subtitle="Access faculty resources, administrative tools, and university services"
        background="gradient"
      />

      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-6 flex justify-end">
            <Button 
              variant="outline" 
              className="text-red-600 hover:bg-red-50 hover:text-red-700"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log Out
            </Button>
          </div>
          
          <StaffDashboard />
        </div>
      </section>

      {/* Announcements & Resources */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Announcements */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-2">
                  Faculty Announcements
                </h2>
                <p className="text-gray-600">
                  Stay updated with the latest information and deadlines
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Academic Calendar Released</CardTitle>
                      <span className="text-sm text-gray-500">May 15, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      The academic calendar for the 2025-2026 academic year has been released. Please review important 
                      dates for course planning, examinations, and academic events.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Faculty Meeting</CardTitle>
                      <span className="text-sm text-gray-500">May 10, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      The next faculty meeting will be held on May 25, 2025, at 2:00 PM in the Main Hall. 
                      The agenda includes curriculum review and discussion of the upcoming accreditation visit.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Research Grant Opportunity</CardTitle>
                      <span className="text-sm text-gray-500">May 5, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Applications for internal research grants are now open. Faculty members are encouraged to 
                      submit research proposals by June 15, 2025. Details available on the Research Office page.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-2">
                  Faculty Resources
                </h2>
                <p className="text-gray-600">
                  Useful tools and resources for teaching, research, and administration
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <Calendar className="h-8 w-8" />
                  <span>Academic Calendar</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <Book className="h-8 w-8" />
                  <span>Research Portal</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <BookOpen className="h-8 w-8" />
                  <span>Teaching Resources</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <Users className="h-8 w-8" />
                  <span>Faculty Directory</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <FileText className="h-8 w-8" />
                  <span>Forms & Policies</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <HelpCircle className="h-8 w-8" />
                  <span>Support Services</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-bluvill-800 mb-2">
                Faculty Support Contacts
              </h2>
              <p className="text-gray-700">
                Need assistance? Contact the appropriate department for support.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardHeader>
                  <Mail className="h-10 w-10 text-bluvill-600 mx-auto" />
                  <CardTitle className="mt-2">Academic Affairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <a href="mailto:academic@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                      academic@bluvilluniversity.edu.ng
                    </a>
                  </p>
                  <p className="text-gray-700">
                    +234 800 222 3333
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <Phone className="h-10 w-10 text-bluvill-600 mx-auto" />
                  <CardTitle className="mt-2">IT Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <a href="mailto:it@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                      it@bluvilluniversity.edu.ng
                    </a>
                  </p>
                  <p className="text-gray-700">
                    +234 800 444 5555
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <HelpCircle className="h-10 w-10 text-bluvill-600 mx-auto" />
                  <CardTitle className="mt-2">Faculty Affairs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <a href="mailto:faculty@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                      faculty@bluvilluniversity.edu.ng
                    </a>
                  </p>
                  <p className="text-gray-700">
                    +234 800 666 7777
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffPortal;
