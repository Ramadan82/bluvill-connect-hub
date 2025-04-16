
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, ClipboardList, FileText, HelpCircle, User } from 'lucide-react';

const StudentPortal = () => {
  return (
    <div>
      <PageHeader
        title="Student Portal"
        subtitle="Access your academic information, resources, and university services"
        background="gradient"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Login Form */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-bluvill-800">Student Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access the student portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input id="student-id" placeholder="Enter your student ID" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" />
                      </div>
                    </div>
                  </form>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-4">
                    <Button className="w-full bg-bluvill-700 hover:bg-bluvill-800">
                      Login
                    </Button>
                    <div className="text-center space-y-2">
                      <a href="#" className="text-sm text-bluvill-600 hover:underline block">
                        Forgot password?
                      </a>
                      <a href="#" className="text-sm text-bluvill-600 hover:underline block">
                        Account activation
                      </a>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>

            {/* Portal Information */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="help">Help</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About the Student Portal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        The Bluvill University Student Portal is your one-stop platform for managing all aspects 
                        of your academic journey. From course registration to accessing learning resources, 
                        the portal offers a comprehensive set of tools to enhance your university experience.
                      </p>
                      <p className="text-gray-700">
                        After logging in, you'll have access to your personal dashboard, where you can view your 
                        schedule, check grades, pay fees, register for courses, access learning materials, and 
                        communicate with faculty and staff.
                      </p>
                      <div className="bg-bluvill-50 rounded-lg p-4 border border-bluvill-100">
                        <h4 className="font-semibold text-bluvill-800 mb-2">First-time Users</h4>
                        <p className="text-gray-700">
                          If this is your first time accessing the portal, you will need to activate your account 
                          using your student ID and the temporary password provided during orientation. Follow the 
                          "Account activation" link below the login form.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="services" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Portal Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                          <ClipboardList className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Course Registration</h4>
                            <p className="text-gray-600 text-sm">Register for courses, view course catalog, and manage your academic schedule</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Academic Records</h4>
                            <p className="text-gray-600 text-sm">View your grades, transcripts, degree progress, and academic status</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <BookOpen className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Learning Resources</h4>
                            <p className="text-gray-600 text-sm">Access course materials, online library, research databases, and learning tools</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Calendar className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Calendar & Scheduling</h4>
                            <p className="text-gray-600 text-sm">View academic calendar, class schedules, and important deadlines</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <User className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Profile Management</h4>
                            <p className="text-gray-600 text-sm">Update personal information, contact details, and notification preferences</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <HelpCircle className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Support Services</h4>
                            <p className="text-gray-600 text-sm">Access academic advising, counseling services, and technical support</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="help" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Help & Support</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-bluvill-800 mb-2">Technical Support</h4>
                          <p className="text-gray-700 mb-2">
                            For login issues, password resets, or technical difficulties with the portal.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Email:</span>
                            <a href="mailto:itsupport@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              itsupport@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 111 2222</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-bluvill-800 mb-2">Academic Support</h4>
                          <p className="text-gray-700 mb-2">
                            For questions about course registration, academic records, or educational resources.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Email:</span>
                            <a href="mailto:academics@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              academics@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 333 4444</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-bluvill-800 mb-2">Student Services</h4>
                          <p className="text-gray-700 mb-2">
                            For questions about student life, housing, financial aid, or general inquiries.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Email:</span>
                            <a href="mailto:studentservices@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              studentservices@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 555 6666</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <a href="#" className="text-bluvill-600 hover:underline">
                          View Portal User Guide
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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
                  Important Announcements
                </h2>
                <p className="text-gray-600">
                  Stay updated with the latest information and deadlines
                </p>
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Course Registration Open</CardTitle>
                      <span className="text-sm text-gray-500">May 10, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Course registration for the Fall 2025 semester is now open. Please log in to your 
                      student portal to register for courses. Registration deadline is June 15, 2025.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">System Maintenance</CardTitle>
                      <span className="text-sm text-gray-500">May 5, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      The student portal will be undergoing scheduled maintenance on May 20, 2025, 
                      from 11:00 PM to 3:00 AM. Some services may be unavailable during this time.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">New Learning Resources</CardTitle>
                      <span className="text-sm text-gray-500">April 28, 2025</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      New digital resources have been added to the library database, including expanded 
                      access to research journals and e-books. Access them through your portal dashboard.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-2">
                  Quick Links & Resources
                </h2>
                <p className="text-gray-600">
                  Useful tools and resources for your academic success
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <Calendar className="h-8 w-8" />
                  <span>Academic Calendar</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <BookOpen className="h-8 w-8" />
                  <span>Online Library</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <ClipboardList className="h-8 w-8" />
                  <span>Course Catalog</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700">
                  <FileText className="h-8 w-8" />
                  <span>Examination Schedule</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center gap-2 border-gray-300 hover:bg-gray-100 hover:text-bluvill-700 sm:col-span-2">
                  <HelpCircle className="h-8 w-8" />
                  <span>Student Support Services</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentPortal;
