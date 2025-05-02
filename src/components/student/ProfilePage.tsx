
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Mail, Phone, Home, Award, Calendar, User, FileEdit } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample student data - in a real app, this would come from the database
  const student = {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@student.bluvilluniversity.edu.ng',
    phone: '+234 123 456 7890',
    avatar: null,
    address: '123 University Residence, Bluvill Campus',
    studentId: 'BUS-2023-001245',
    program: 'Bachelor of Science in Computer Science',
    level: '300 Level',
    enrollment: 'Fall 2022',
    gpa: '3.85/4.00',
    academicStatus: 'Good Standing',
    advisor: 'Dr. Michael Smith',
    guardianName: 'Robert Johnson',
    guardianContact: '+234 987 654 3210',
    completed: [
      { course: 'CS 101: Introduction to Programming', grade: 'A', credits: 3 },
      { course: 'MATH 201: Calculus I', grade: 'A-', credits: 4 },
      { course: 'ENG 101: Academic Writing', grade: 'B+', credits: 3 },
      { course: 'CS 102: Data Structures', grade: 'A', credits: 3 },
      { course: 'PHYS 101: General Physics', grade: 'B', credits: 4 },
    ],
    current: [
      { course: 'CS 301: Database Systems', status: 'In Progress' },
      { course: 'CS 305: Software Engineering', status: 'In Progress' },
      { course: 'MATH 302: Linear Algebra', status: 'In Progress' },
      { course: 'CS 310: Web Development', status: 'In Progress' },
    ]
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Student Profile</h2>
          <p className="text-gray-500">Manage your personal information and academic record.</p>
        </div>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Changes' : (
            <>
              <FileEdit className="h-4 w-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={student.avatar || undefined} />
              <AvatarFallback className="bg-blue-200 text-blue-700 text-2xl">
                {student.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{student.name}</CardTitle>
            <CardDescription>{student.studentId}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <GraduationCap className="h-4 w-4 mr-2" /> 
                Academic Information
              </h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Program:</span>
                  <span>{student.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Level:</span>
                  <span>{student.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Enrollment:</span>
                  <span>{student.enrollment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">GPA:</span>
                  <span className="font-medium">{student.gpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <span className="text-green-600">{student.academicStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Advisor:</span>
                  <span>{student.advisor}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <User className="h-4 w-4 mr-2" /> 
                Contact Information
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <span>{student.email}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-start">
                  <Home className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                  <span>{student.address}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-2">Emergency Contact</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span>{student.guardianName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone:</span>
                  <span>{student.guardianContact}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Academic Record & Settings */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="academic" className="w-full">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Student Record</CardTitle>
                <TabsList>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="account">Account Settings</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                View your academic history and manage account settings
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <TabsContent value="academic" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Current Courses
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    {student.current.map((course, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="font-medium">{course.course}</span>
                        <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {course.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    Completed Courses
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left py-2 px-3 font-medium">Course</th>
                          <th className="text-center py-2 px-3 font-medium">Grade</th>
                          <th className="text-center py-2 px-3 font-medium">Credits</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {student.completed.map((course, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="py-2 px-3">{course.course}</td>
                            <td className="py-2 px-3 text-center">{course.grade}</td>
                            <td className="py-2 px-3 text-center">{course.credits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Download Transcript</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="account" className="mt-0 space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          defaultValue={student.name} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          defaultValue={student.email} 
                          disabled={true} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          defaultValue={student.phone} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          defaultValue={student.address} 
                          disabled={!isEditing} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Emergency Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guardianName">Contact Name</Label>
                        <Input 
                          id="guardianName" 
                          defaultValue={student.guardianName} 
                          disabled={!isEditing} 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guardianPhone">Contact Phone</Label>
                        <Input 
                          id="guardianPhone" 
                          defaultValue={student.guardianContact} 
                          disabled={!isEditing} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input 
                          id="currentPassword" 
                          type="password" 
                          disabled={!isEditing} 
                          placeholder="Enter current password" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input 
                          id="newPassword" 
                          type="password" 
                          disabled={!isEditing} 
                          placeholder="Enter new password" 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" disabled={!isEditing}>Cancel</Button>
                    <Button disabled={!isEditing}>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
