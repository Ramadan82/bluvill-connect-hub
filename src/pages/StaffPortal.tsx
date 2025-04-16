
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Users, Book, Mail, Phone, HelpCircle, ClipboardList, BookOpen } from 'lucide-react';

const StaffPortal = () => {
  return (
    <div>
      <PageHeader
        title="Staff Portal"
        subtitle="Access faculty resources, administrative tools, and university services"
        background="gradient"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Login Form */}
            <div className="lg:col-span-1">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-bluvill-800">Staff Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access the staff portal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="staff-id">Staff ID</Label>
                        <Input id="staff-id" placeholder="Enter your staff ID" />
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
                        Need help?
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
                      <CardTitle>About the Staff Portal</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-700">
                        The Bluvill University Staff Portal is a comprehensive platform designed to streamline 
                        administrative tasks, facilitate teaching and research activities, and provide access 
                        to important institutional resources.
                      </p>
                      <p className="text-gray-700">
                        After logging in, you'll have access to your personal dashboard, where you can manage courses, 
                        view class rosters, submit grades, access teaching resources, manage research projects, 
                        and communicate with students and colleagues.
                      </p>
                      <div className="bg-bluvill-50 rounded-lg p-4 border border-bluvill-100">
                        <h4 className="font-semibold text-bluvill-800 mb-2">Access Levels</h4>
                        <p className="text-gray-700">
                          The portal provides different access levels based on your role at the university. 
                          Faculty members, administrative staff, and departmental heads will have access to 
                          role-specific tools and resources.
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
                          <BookOpen className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Course Management</h4>
                            <p className="text-gray-600 text-sm">Create and manage course content, class rosters, assignments, and grading</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Users className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Student Advising</h4>
                            <p className="text-gray-600 text-sm">Access student records, academic progress, and advising tools</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Book className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Research Management</h4>
                            <p className="text-gray-600 text-sm">Manage research projects, grant applications, and publications</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Calendar className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Calendar & Scheduling</h4>
                            <p className="text-gray-600 text-sm">Manage your academic schedule, meetings, and appointments</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <FileText className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Administrative Tools</h4>
                            <p className="text-gray-600 text-sm">Access forms, policies, procedures, and administrative resources</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <ClipboardList className="h-6 w-6 text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-semibold text-gray-800">Professional Development</h4>
                            <p className="text-gray-600 text-sm">Access training resources, workshops, and career development tools</p>
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
                            <a href="mailto:staffsupport@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              staffsupport@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 777 8888</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-bluvill-800 mb-2">Academic Technology</h4>
                          <p className="text-gray-700 mb-2">
                            For assistance with teaching tools, learning management system, or instructional technology.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Email:</span>
                            <a href="mailto:edutech@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              edutech@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 999 0000</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <h4 className="font-semibold text-bluvill-800 mb-2">Human Resources</h4>
                          <p className="text-gray-700 mb-2">
                            For questions about employment, benefits, payroll, or personnel matters.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Email:</span>
                            <a href="mailto:hr@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                              hr@bluvilluniversity.edu.ng
                            </a>
                          </div>
                          <div className="flex items-center text-sm">
                            <span className="font-medium mr-2">Phone:</span>
                            <span>+234 800 111 2222</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <a href="#" className="text-bluvill-600 hover:underline">
                          View Staff Handbook
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
