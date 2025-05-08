
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Users, Building, FileText, Calendar } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';

interface StaffMember {
  id: string;
  full_name?: string;
  email?: string;
  department?: string;
  avatar_url?: string;
}

const NonAcademicStaffDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [staffMember, setStaffMember] = useState<StaffMember | null>(null);
  
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
          full_name: profileData?.full_name || session.user.user_metadata?.full_name || 'Non-Academic Staff Member',
          email: session.user.email,
          department: profileData?.department || 'Administrative Department',
          avatar_url: profileData?.avatar_url || session.user.user_metadata?.avatar_url
        });
        
      } catch (error) {
        console.error("Error fetching non-academic staff dashboard data:", error);
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
            <CardTitle className="text-sm text-gray-500">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">12</span>
              <Building className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Staff</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">156</span>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">8</span>
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
              <span className="text-2xl font-bold">5</span>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Administrative Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Administrative Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Procurement Request Approved</p>
                  <p className="text-sm text-gray-500">Office equipment for Computer Science department</p>
                </div>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Maintenance Ticket Resolved</p>
                  <p className="text-sm text-gray-500">Network issues in Engineering building</p>
                </div>
                <span className="text-xs text-gray-500">Yesterday</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Staff Meeting Scheduled</p>
                  <p className="text-sm text-gray-500">Monthly administrative review</p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </li>
              <li className="flex items-start justify-between">
                <div>
                  <p className="font-medium">Budget Report Submitted</p>
                  <p className="text-sm text-gray-500">Q2 2025 departmental expenses</p>
                </div>
                <span className="text-xs text-gray-500">3 days ago</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Project Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Administrative Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Campus Wi-Fi Upgrade</span>
                  <span className="text-sm">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Staff Record Digitization</span>
                  <span className="text-sm">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">Inventory Management System</span>
                  <span className="text-sm">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">University Website Redesign</span>
                  <span className="text-sm">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <FileText className="h-5 w-5 mb-2" />
              <span>Submit Request</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Users className="h-5 w-5 mb-2" />
              <span>Staff Directory</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Calendar className="h-5 w-5 mb-2" />
              <span>Book Facility</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
              <Building className="h-5 w-5 mb-2" />
              <span>Department Info</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NonAcademicStaffDashboard;
