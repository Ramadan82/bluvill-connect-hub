
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, Search, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  
  // Sample FAQ data - in a real app, this would come from a database
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking the 'Forgot Password' link on the login page. You will receive an email with instructions to create a new password."
    },
    {
      question: "How do I enroll in a course?",
      answer: "To enroll in a course, navigate to the 'Courses' section, browse available courses, and click the 'Enroll' button on the course details page. If the course requires approval, your request will be sent to the instructor."
    },
    {
      question: "Where can I see my grades?",
      answer: "Your grades can be found in your Profile page under the 'Academic' tab. There you can view your current GPA and grades for all completed courses."
    },
    {
      question: "How do I access course materials?",
      answer: "Course materials are available in the 'Resources' section or directly within each course page. You can access readings, presentations, and other materials uploaded by your instructors."
    },
    {
      question: "Can I download my class schedule?",
      answer: "Yes, you can download your class schedule from the Calendar page. Click on the 'Export' or 'Download' button to save your schedule in various formats."
    },
    {
      question: "How do I contact my instructor?",
      answer: "You can contact your instructor through the Messages section. Select the course, compose a new message, and it will be sent directly to your instructor."
    },
    {
      question: "How do I submit assignments?",
      answer: "Assignments can be submitted through the specific course page. Navigate to the assignment, click on 'Submit' and follow the instructions to upload your files."
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
  
  const handleSubmitSupportRequest = () => {
    if (!supportMessage.trim()) return;
    
    // In a real app, this would send the support request to the backend
    toast({
      title: "Support Request Sent",
      description: "We've received your message and will respond shortly.",
    });
    
    // Clear the input field after sending
    setSupportMessage('');
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Help Center</h2>
        <p className="text-gray-500">Find answers to common questions or contact support.</p>
      </div>
      
      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search for help topics..." 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="faq" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </TabsTrigger>
          <TabsTrigger value="resources">
            <MessageSquare className="h-4 w-4 mr-2" />
            Help Resources
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions and answers to help you navigate the student portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No Results Found</h3>
                  <p className="text-gray-500">
                    We couldn't find any FAQs matching your search query.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get help from our support team with any questions or issues
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Mail className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">Email Support</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    For general inquiries and non-urgent issues
                  </p>
                  <a 
                    href="mailto:support@bluvilluniversity.edu.ng" 
                    className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                  >
                    support@bluvilluniversity.edu.ng
                  </a>
                  <p className="text-xs text-gray-500 mt-2">Response time: Within 24 hours</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center mb-3">
                    <Phone className="h-5 w-5 mr-2 text-blue-600" />
                    <h3 className="font-medium">Phone Support</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    For urgent issues requiring immediate assistance
                  </p>
                  <a 
                    href="tel:+2341234567890" 
                    className="text-blue-600 hover:underline text-sm font-medium flex items-center"
                  >
                    +234 123 456 7890
                  </a>
                  <p className="text-xs text-gray-500 mt-2">Available: Monday-Friday, 9 AM - 5 PM</p>
                </div>
              </div>
              
              <div className="space-y-4 pt-2">
                <h3 className="font-medium">Send a Support Request</h3>
                <div className="space-y-4">
                  <div>
                    <textarea 
                      className="w-full p-3 border rounded-md min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your issue or question..."
                      value={supportMessage}
                      onChange={(e) => setSupportMessage(e.target.value)}
                    ></textarea>
                  </div>
                  <Button 
                    className="w-full sm:w-auto"
                    onClick={handleSubmitSupportRequest}
                  >
                    Submit Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Help Resources</CardTitle>
              <CardDescription>
                Additional resources to help you navigate the student portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Student Portal Guide</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      A comprehensive guide to using all features of the student portal.
                    </p>
                    <Button variant="outline" className="w-full">View Guide</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Video Tutorials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Step-by-step video guides for common student portal tasks.
                    </p>
                    <Button variant="outline" className="w-full">Watch Tutorials</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">IT Services Knowledge Base</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Technical articles and solutions for common IT issues.
                    </p>
                    <Button variant="outline" className="w-full">Browse Articles</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Academic Policies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      University policies regarding courses, grading, and academic conduct.
                    </p>
                    <Button variant="outline" className="w-full">Read Policies</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpPage;
