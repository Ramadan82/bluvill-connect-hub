import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Check user role to determine redirect
      const { data: userData, error: userError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .maybeSingle();
      
      if (userError && userError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - this just means they don't have a specific role yet
        console.error("Error checking user role:", userError);
      }

      // Successful login - determine redirect based on role
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      // Default to student portal if no specific role is found
      if (userData?.role === 'staff') {
        navigate('/staff-portal');
      } else if (userData?.role === 'applicant') {
        navigate('/apply');
      } else {
        navigate('/student-portal');
      }

    } catch (error) {
      let message = "Login failed. Please try again.";
      
      if (error.message.includes("Invalid login credentials")) {
        message = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        message = "Please verify your email first";
      }

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                {...form.register("email")}
                type="email"
                disabled={isSubmitting}
              />
              {form.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                {...form.register("password")}
                type="password"
                disabled={isSubmitting}
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Log In'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm space-y-2">
            <div>
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </div>
            <div>
              <a href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
