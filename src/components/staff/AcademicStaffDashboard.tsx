
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, BookOpen, FileText, Calendar } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';

interface StaffMember {
  id: string;
  full_name?: string;
  email?: string;
  department?: string;
  avatar_url?: string;
}

const AcademicStaffDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);
  
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        // Get the current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;
        
        // Fetch staff profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, full_name, department, avatar_url')
          .eq('id', session.user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          console.error("Error fetching staff profile:", profileError);
        }
        
        setStaffMember({
          id: session.user.id,
          full_name: profileData?.full_name || session.user.user_metadata?.full_name || 'Academic Staff Member',
          email: session.user.email,
          department: profileData?.department || 'Academic Department',
          avatar_url: profileData?.avatar_url || session.user.user_metadata?.avatar_url
        });
        
        // Get course count
        const { count: courses, error: coursesError } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true });
          
        if (coursesError) {
          console.error("Error fetching course count:", coursesError);
        } else {
          setCourseCount(courses || 0);
        }
        
        // Get student count (users with student role)
        // Using the raw query approach to check the role count
        const { data: roleData, error: studentsError } = await supabase
          .from('user_roles')
          .select('id')
          .eq('role', 'student');
          
        if (studentsError) {
          console.error("Error fetching student count:", studentsError);
        } else {
          setStudentCount(roleData?.length || 0);
        }
        
      } catch (error) {
        console.error("Error fetching academic staff dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaffData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Welcome, {staffMember?.full_name}</h1>
        <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">My Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{courseCount}</span>
              <BookOpen className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">My Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{studentCount}</span>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Active Research Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">3</span>
              <FileText className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">4</span>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Academic Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Academic Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Course Materials Updated</p>
                  <p className="text-sm text-gray-500">Introduction to Computer Science - Week 5</p>
                </div>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Assignment Graded</p>
                  <p className="text-sm text-gray-500">Advanced Mathematics - Assignment 3</p>
                </div>
                <span className="text-xs text-gray-500">Yesterday</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Student Inquiry</p>
                  <p className="text-sm text-gray-500">From John Doe regarding course registration</p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Faculty Meeting</p>
                  <p className="text-sm text-gray-500">Minutes uploaded to shared drive</p>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Course Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Introduction to Computer Science</span>
                  <span className="text-sm">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Advanced Mathematics</span>
                  <span className="text-sm">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Principles of Economics</span>
                  <span className="text-sm">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Introduction to Psychology</span>
                  <span className="text-sm">45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Research Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Research Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Machine Learning Applications in Educational Technology</h3>
              <div className="flex items-center mt-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div className="ml-4">
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Impact of Climate Change on Coastal Communities</h3>
              <div className="flex items-center mt-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
                <div className="ml-4">
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Sustainable Urban Development in Nigerian Cities</h3>
              <div className="flex items-center mt-2">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Progress</span>
                    <span className="text-sm font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="ml-4">
                  <Button size="sm">View</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AcademicStaffDashboard;
