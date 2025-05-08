
import { useState } from 'react';
import { HelpCircle, MessageSquare, Check, AlertTriangle, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const SupportServices = () => {
  const [ticketType, setTicketType] = useState('');
  const [ticketPriority, setTicketPriority] = useState('');
  
  // Mock data for support tickets
  const activeTickets = [
    {
      id: 1,
      title: "Unable to access research database",
      type: "IT Support",
      status: "In Progress",
      priority: "High",
      dateSubmitted: "May 5, 2025",
      lastUpdated: "2 hours ago",
      description: "I'm unable to connect to the research database from my office computer. I've tried restarting and checking my network connection.",
      assignedTo: "Robert Davis"
    },
    {
      id: 2,
      title: "Request for classroom equipment",
      type: "Facilities",
      status: "Pending",
      priority: "Medium",
      dateSubmitted: "May 4, 2025",
      lastUpdated: "1 day ago",
      description: "Requesting a projector and microphone setup for Room 302 for a guest lecture on May 10.",
      assignedTo: "Sarah Lopez"
    }
  ];
  
  const resolvedTickets = [
    {
      id: 3,
      title: "Software installation request",
      type: "IT Support",
      status: "Resolved",
      priority: "Medium",
      dateSubmitted: "April 28, 2025",
      resolvedDate: "May 1, 2025",
      description: "Request to install SPSS software on my office computer for research analysis.",
      assignedTo: "Robert Davis",
      resolution: "Software installed and license activated. User provided with basic training materials."
    },
    {
      id: 4,
      title: "Office air conditioning issue",
      type: "Facilities",
      status: "Resolved",
      priority: "Low",
      dateSubmitted: "April 25, 2025",
      resolvedDate: "April 27, 2025",
      description: "The air conditioning in Room 204 is not functioning properly. It's either too cold or doesn't work at all.",
      assignedTo: "Mark Johnson",
      resolution: "Thermostat replaced and system recalibrated. Provided instructions on optimal temperature settings."
    }
  ];
  
  // Knowledge Base Articles (mock data)
  const knowledgeBaseArticles = [
    {
      id: 1,
      title: "How to Access Online Library Resources",
      category: "Academic Resources",
      views: 328,
      lastUpdated: "April 15, 2025"
    },
    {
      id: 2,
      title: "Setting Up Your University Email on Mobile Devices",
      category: "IT Support",
      views: 512,
      lastUpdated: "March 20, 2025"
    },
    {
      id: 3,
      title: "Guide to Classroom Technology",
      category: "Teaching Resources",
      views: 243,
      lastUpdated: "May 1, 2025"
    },
    {
      id: 4,
      title: "Requesting Building Maintenance",
      category: "Facilities",
      views: 187,
      lastUpdated: "April 22, 2025"
    }
  ];

  // Ticket type options
  const ticketTypes = [
    "IT Support",
    "Facilities",
    "Academic Resources",
    "Human Resources",
    "Financial Services",
    "Other"
  ];
  
  // Ticket priority options
  const ticketPriorities = [
    "Low",
    "Medium",
    "High",
    "Urgent"
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Support Services</h1>
      </div>
      
      <Tabs defaultValue="submit">
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="submit">Submit Ticket</TabsTrigger>
          <TabsTrigger value="tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
        </TabsList>
        
        {/* Submit New Ticket */}
        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Support Ticket</CardTitle>
              <CardDescription>
                Fill out the form below to request assistance from the appropriate department.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ticket Type</label>
                  <Select value={ticketType} onValueChange={setTicketType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of support" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={ticketPriority} onValueChange={setTicketPriority}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {ticketPriorities.map((priority) => (
                        <SelectItem key={priority} value={priority}>{priority}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Brief description of the issue" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Please provide details about your issue or request" rows={5} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Attachments (Optional)</label>
                <div className="border border-dashed rounded-md p-6 text-center">
                  <p className="text-gray-500">Drag and drop files here or click to browse</p>
                  <input 
                    type="file" 
                    className="hidden" 
                    id="file-upload" 
                    multiple 
                  />
                  <Button 
                    variant="outline" 
                    type="button" 
                    className="mt-2"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Select Files
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full md:w-auto">Submit Ticket</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* My Tickets */}
        <TabsContent value="tickets" className="space-y-6">
          {/* Active Tickets */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Active Tickets</h2>
            {activeTickets.length > 0 ? (
              <div className="space-y-4">
                {activeTickets.map(ticket => (
                  <Card key={ticket.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{ticket.title}</CardTitle>
                          <CardDescription>Ticket #{ticket.id} • {ticket.type}</CardDescription>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-600' :
                          ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {ticket.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{ticket.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 mb-1">Priority</p>
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${
                            ticket.priority === 'High' ? 'bg-red-100 text-red-600' :
                            ticket.priority === 'Medium' ? 'bg-amber-100 text-amber-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            <AlertTriangle className={`h-3 w-3 ${
                              ticket.priority === 'High' ? 'text-red-600' :
                              ticket.priority === 'Medium' ? 'text-amber-600' :
                              'text-green-600'
                            }`} />
                            {ticket.priority}
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Submitted</p>
                          <p>{ticket.dateSubmitted}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 mb-1">Assigned To</p>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback>{ticket.assignedTo.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span>{ticket.assignedTo}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t pt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        Last updated: {ticket.lastUpdated}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          Add Comment
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Check className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-gray-600">You don't have any active support tickets</p>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Resolved Tickets */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Resolved Tickets</h2>
            <div className="space-y-4">
              {resolvedTickets.map(ticket => (
                <Card key={ticket.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{ticket.title}</CardTitle>
                        <CardDescription>Ticket #{ticket.id} • {ticket.type}</CardDescription>
                      </div>
                      <div className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-600">
                        {ticket.status}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-600 mb-2">{ticket.description}</p>
                      <div className="mt-4">
                        <p className="text-sm font-medium">Resolution:</p>
                        <p className="text-gray-600">{ticket.resolution}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Submitted</p>
                        <p>{ticket.dateSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Resolved</p>
                        <p>{ticket.resolvedDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Resolved By</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{ticket.assignedTo.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <span>{ticket.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button size="sm" variant="outline">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Knowledge Base */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Find answers to common questions and tutorials for university systems</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input 
                  placeholder="Search knowledge base articles..." 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                {knowledgeBaseArticles.map(article => (
                  <div 
                    key={article.id} 
                    className="flex items-start p-4 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span className="flex items-center">
                          <User className="h-3 w-3 mr-1" /> {article.views} views
                        </span>
                        <span>•</span>
                        <span>Updated: {article.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact IT Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">Get help with computer issues, software, and system access</p>
                <p className="mb-1">
                  <span className="font-medium">Phone:</span> +234 800 222 3333
                </p>
                <p>
                  <span className="font-medium">Email:</span> it@bluvilluniversity.edu.ng
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact IT</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Facilities Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">Request maintenance, repairs, or room setup assistance</p>
                <p className="mb-1">
                  <span className="font-medium">Phone:</span> +234 800 444 5555
                </p>
                <p>
                  <span className="font-medium">Email:</span> facilities@bluvilluniversity.edu.ng
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact Facilities</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Academic Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-3">Get help with teaching resources, LMS, and grading systems</p>
                <p className="mb-1">
                  <span className="font-medium">Phone:</span> +234 800 666 7777
                </p>
                <p>
                  <span className="font-medium">Email:</span> academic@bluvilluniversity.edu.ng
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Contact Academic Support</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportServices;
