
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Define a type for our user role
type UserRole = 'staff' | 'student' | 'applicant' | null;

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session);
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "Please log in to access this page.",
            variant: "default",
          });
          return;
        }
        
        // Check user role if authenticated
        // Using the RPC method with Supabase to avoid TypeScript errors
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (!roleError && roleData) {
          setUserRole(roleData.role as UserRole);
        }
        
      } catch (error) {
        console.error("Auth check failed:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem checking your authentication status.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthenticated(!!session);
        
        if (event === 'SIGNED_OUT') {
          setUserRole(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-2 text-lg text-blue-600">Loading...</span>
      </div>
    );
  }

  // Handle role-specific routes
  if (authenticated) {
    // Staff portal access check
    if (location.pathname.startsWith('/staff-portal') && userRole !== 'staff') {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the staff portal.",
        variant: "destructive",
      });
      return <Navigate to="/student-portal" state={{ from: location.pathname }} replace />;
    }
    
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
}
