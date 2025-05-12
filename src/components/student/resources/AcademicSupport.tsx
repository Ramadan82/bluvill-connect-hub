
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, FileText, Calendar, Clock } from 'lucide-react';

const AcademicSupport = () => {
  // Sample tutoring services
  const tutoringServices = [
    {
      id: '1',
      title: 'Math Tutoring Center',
      description: 'Get help with calculus, algebra, statistics and more',
      location: 'Learning Center, Room 203',
      hours: 'Mon-Fri: 9am-5pm, Sat: 10am-2pm'
    },
    {
      id: '2',
      title: 'Writing Lab',
      description: 'Assistance with papers, essays, and research projects',
      location: 'Library, 2nd Floor',
      hours: 'Mon-Thu: 10am-7pm, Fri: 10am-5pm'
    },
    {
      id: '3',
      title: 'Science Study Groups',
      description: 'Collaborative learning for biology, chemistry and physics',
      location: 'Science Building, Room 105',
      hours: 'Tue & Thu: 3pm-6pm'
    }
  ];
  
  // Sample learning resources
  const learningResources = [
    {
      id: '1',
      title: 'Academic Success Strategies',
      type: 'guide',
      description: 'Tips and techniques for effective studying and time management'
    },
    {
      id: '2',
      title: 'Research Paper Guidelines',
      type: 'template',
      description: 'Format guidelines and templates for academic papers'
    },
    {
      id: '3',
      title: 'Presentation Skills Workshop',
      type: 'workshop',
      description: 'Learn to create and deliver effective presentations',
      date: '2023-11-15',
      time: '2:00 PM'
    }
  ];
  
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Tutoring Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tutoringServices.map((service) => (
            <Card key={service.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p>{service.description}</p>
                <div className="text-sm text-gray-500 space-y-2">
                  <div className="flex items-start">
                    <BookOpen className="h-4 w-4 mr-2 mt-0.5" />
                    <span>{service.location}</span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5" />
                    <span>{service.hours}</span>
                  </div>
                </div>
                <Button className="w-full" variant="outline">Schedule Session</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Learning Resources</h2>
        <div className="space-y-4">
          {learningResources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">
                    {resource.type === 'workshop' ? (
                      <Calendar className="h-5 w-5 text-blue-500" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{resource.title}</h3>
                    <p className="text-sm text-gray-500">{resource.description}</p>
                    {resource.type === 'workshop' && (
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span className="mr-3">{new Date(resource.date).toLocaleDateString()}</span>
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{resource.time}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    {resource.type === 'workshop' ? 'Register' : 'Download'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Academic Advising</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Schedule an Advising Appointment</h3>
                <p className="text-gray-500">
                  Meet with an academic advisor to discuss course selection, degree requirements, 
                  and academic planning.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-base mb-2">General Academic Advising</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    For questions about core requirements, electives, and general academic planning.
                  </p>
                  <Button>Schedule General Advising</Button>
                </div>
                
                <div>
                  <h4 className="font-medium text-base mb-2">Major-Specific Advising</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    For questions related to your specific major or program requirements.
                  </p>
                  <Button>Schedule Major Advising</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default AcademicSupport;
