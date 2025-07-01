
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, BookOpen, FileText, Calendar, ClipboardCheck, BarChart4 } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface StaffMember {
  id: string;
  full_name?: string;
  email?: string;
  department?: string;
  avatar_url?: string;
}

const StaffDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
  const [courseCount, setCourseCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for charts
  const attendanceData = [
    { name: 'Week 1', students: 82 },
    { name: 'Week 2', students: 75 },
    { name: 'Week 3', students: 88 },
    { name: 'Week 4', students: 95 },
    { name: 'Week 5', students: 90 },
    { name: 'Week 6', students: 85 },
  ];
  
  const gradeDistributionData = [
    { name: 'A', value: 15 },
    { name: 'B', value: 30 },
    { name: 'C', value: 35 },
    { name: 'D', value: 15 },
    { name: 'F', value: 5 },
  ];
  
  const COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];
  
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
          full_name: profileData?.full_name || session.user.user_metadata?.full_name || 'Staff Member',
          email: session.user.email,
          department: profileData?.department || 'Academic Staff',
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
        console.error("Error fetching staff dashboard data:", error);
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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {staffMember?.full_name}</h1>
          <p className="text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <TabsContent value="overview" className="mt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-500">Total Courses</CardTitle>
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
              <CardTitle className="text-sm text-gray-500">Total Students</CardTitle>
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
              <CardTitle className="text-sm text-gray-500">Active Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">12</span>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <ClipboardCheck className="h-5 w-5 mr-2 text-blue-600" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start justify-between border-l-4 border-blue-500 pl-3 py-1">
                  <div>
                    <p className="font-medium">Course Materials Updated</p>
                    <p className="text-sm text-gray-500">Introduction to Computer Science - Week 5</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">2 hours ago</span>
                </li>
                <li className="flex items-start justify-between border-l-4 border-green-500 pl-3 py-1">
                  <div>
                    <p className="font-medium">Assignment Graded</p>
                    <p className="text-sm text-gray-500">Advanced Mathematics - Assignment 3</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">Yesterday</span>
                </li>
                <li className="flex items-start justify-between border-l-4 border-amber-500 pl-3 py-1">
                  <div>
                    <p className="font-medium">Student Inquiry</p>
                    <p className="text-sm text-gray-500">From John Doe regarding course registration</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">2 days ago</span>
                </li>
                <li className="flex items-start justify-between border-l-4 border-purple-500 pl-3 py-1">
                  <div>
                    <p className="font-medium">Faculty Meeting</p>
                    <p className="text-sm text-gray-500">Minutes uploaded to shared drive</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap">3 days ago</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          {/* Course Progress */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center">
                <BarChart4 className="h-5 w-5 mr-2 text-green-600" />
                Course Progress
              </CardTitle>
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
        
        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <BookOpen className="h-5 w-5 mb-2" />
                <span>Add Course</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <FileText className="h-5 w-5 mb-2" />
                <span>Grade Assignments</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Calendar className="h-5 w-5 mb-2" />
                <span>Schedule Event</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                <Users className="h-5 w-5 mb-2" />
                <span>Manage Students</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="analytics" className="mt-0 space-y-6">
        {/* Attendance Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Student Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={attendanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="students" stroke="#82ca9d" fill="#82ca9d" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Grade Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {gradeDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Course Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Course Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Average Assignment Score</span>
                    <span>78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Course Completion Rate</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Student Satisfaction</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-sm font-medium">
                    <span>Discussion Participation</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </div>
  );
};

export default StaffDashboard;
