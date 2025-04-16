
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, BookOpen, Coffee, Home, Music, User, Users, Utensils, Dumbbell } from 'lucide-react';

const CampusLife = () => {
  const facilities = [
    {
      icon: <Home className="h-6 w-6 text-bluvill-600" />,
      title: 'Student Housing',
      description: 'Modern dormitories and student apartments with Wi-Fi, study areas, and 24-hour security.'
    },
    {
      icon: <Utensils className="h-6 w-6 text-bluvill-600" />,
      title: 'Dining Facilities',
      description: 'Multiple dining halls and cafes offering a variety of nutritious and delicious meals.'
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-bluvill-600" />,
      title: 'Sports Complex',
      description: 'State-of-the-art facilities including a gymnasium, swimming pool, and multiple sports courts.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-bluvill-600" />,
      title: 'Libraries',
      description: 'Modern libraries with extensive collections, digital resources, and comfortable study spaces.'
    },
    {
      icon: <Coffee className="h-6 w-6 text-bluvill-600" />,
      title: 'Student Center',
      description: 'A hub for student activities, featuring lounges, meeting rooms, and recreational areas.'
    },
    {
      icon: <Award className="h-6 w-6 text-bluvill-600" />,
      title: 'Career Center',
      description: 'Resources and support for internships, job search, and career development.'
    }
  ];

  const clubs = [
    {
      name: 'Student Government Association',
      description: 'Elected student representatives advocating for student interests and organizing campus activities.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format&fit=crop'
    },
    {
      name: 'Debate Club',
      description: 'Enhancing public speaking skills through competitive debates and discussions.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=500&auto=format&fit=crop'
    },
    {
      name: 'Cultural Association',
      description: 'Celebrating diversity through cultural events, performances, and educational activities.',
      image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=500&auto=format&fit=crop'
    },
    {
      name: 'Entrepreneurship Club',
      description: 'Fostering innovation and business skills through workshops, competitions, and mentorship.',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=500&auto=format&fit=crop'
    },
    {
      name: 'Arts & Media Society',
      description: 'Expressing creativity through visual arts, photography, filmmaking, and digital media.',
      image: 'https://images.unsplash.com/photo-1522401957850-2a4d7fecbf6a?q=80&w=500&auto=format&fit=crop'
    },
    {
      name: 'Sports Teams',
      description: 'Competitive teams in football, basketball, volleyball, athletics, swimming, and more.',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=500&auto=format&fit=crop'
    }
  ];

  const events = [
    {
      title: 'Orientation Week',
      date: 'September',
      description: 'Welcome activities for new students, including campus tours, information sessions, and social events.'
    },
    {
      title: 'Cultural Festival',
      date: 'November',
      description: 'A celebration of cultural diversity featuring food, music, dance, and art from different cultures.'
    },
    {
      title: 'Academic Conference',
      date: 'February',
      description: 'Annual scholarly conference with presentations, keynote speakers, and research exhibitions.'
    },
    {
      title: 'Sports Tournament',
      date: 'March',
      description: 'Inter-faculty sports competition in various sports disciplines.'
    },
    {
      title: 'Career Fair',
      date: 'April',
      description: 'Networking opportunity with potential employers, featuring job opportunities and internships.'
    },
    {
      title: 'Graduation Ceremony',
      date: 'July',
      description: 'Formal ceremony celebrating the achievements of graduating students.'
    }
  ];

  return (
    <div>
      <PageHeader
        title="Campus Life"
        subtitle="Experience the vibrant community and enriching opportunities at Bluvill University"
        background="gradient"
      />

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">Life at Bluvill University</h2>
              <p className="text-gray-700 text-lg mb-6">
                At Bluvill University, campus life is about more than just academics. It's about personal growth, 
                building lifelong friendships, developing leadership skills, and creating memories that will last a lifetime.
              </p>
              <p className="text-gray-700 text-lg">
                Our vibrant campus community offers a wide range of extracurricular activities, clubs, sports, 
                cultural events, and social opportunities that complement your academic journey and contribute to 
                a well-rounded university experience.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop" 
                alt="Campus Life" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=500&auto=format&fit=crop" 
                alt="Campus Life" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=500&auto=format&fit=crop" 
                alt="Campus Life" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=500&auto=format&fit=crop" 
                alt="Campus Life" 
                className="rounded-lg shadow-md w-full h-48 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Campus Facilities */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Campus Facilities</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our modern campus offers a wide range of facilities designed to support your academic success and personal well-being.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center mb-2">
                    {facility.icon}
                    <CardTitle className="ml-2">{facility.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">
                    {facility.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Student Life</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Explore the diverse aspects of student life at Bluvill University.
            </p>
          </div>
          
          <Tabs defaultValue="clubs" className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="clubs" className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Clubs & Organizations
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center">
                  <Music className="mr-2 h-4 w-4" />
                  Events & Activities
                </TabsTrigger>
                <TabsTrigger value="support" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Student Support
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="clubs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clubs.map((club, index) => (
                  <Card key={index} className="overflow-hidden h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={club.image} 
                        alt={club.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{club.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700">
                        {club.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-bluvill-700">{event.title}</CardTitle>
                      <CardDescription>{event.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="support">
              <Card className="border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-bluvill-700 mb-3">Academic Support</h3>
                      <p className="text-gray-700 mb-3">
                        Our Academic Support Center offers tutoring, study skills workshops, writing assistance, 
                        and learning resources to help you succeed in your studies.
                      </p>
                      <p className="text-gray-700">
                        Academic advisors are also available to guide you through course selection, academic planning, 
                        and ensuring you stay on track for graduation.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-bluvill-700 mb-3">Health & Wellness</h3>
                      <p className="text-gray-700 mb-3">
                        The Student Health Center provides comprehensive healthcare services, including routine 
                        check-ups, immunizations, and treatment for common illnesses.
                      </p>
                      <p className="text-gray-700">
                        Our Counseling Center offers confidential counseling services, mental health resources, 
                        and wellness programs to support your emotional and psychological well-being.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-bluvill-700 mb-3">Career Services</h3>
                      <p className="text-gray-700 mb-3">
                        The Career Development Center offers resume reviews, interview preparation, job search 
                        strategies, and career counseling to help you prepare for your future career.
                      </p>
                      <p className="text-gray-700">
                        We also organize career fairs, networking events, and employer information sessions to 
                        connect you with potential employers and internship opportunities.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-bluvill-700 mb-3">International Student Support</h3>
                      <p className="text-gray-700">
                        The International Student Office provides specialized support for international students, 
                        including visa assistance, cultural adjustment resources, and social activities to help 
                        you feel at home at Bluvill University.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Campus Tour */}
      <section className="bg-bluvill-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-heading">Visit Our Campus</h2>
            <p className="text-gray-700 text-lg mb-8">
              The best way to experience Bluvill University is to visit our campus. Join one of our campus tours to see our facilities, 
              meet current students and faculty, and get a feel for life at Bluvill University.
            </p>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-bluvill-700 mb-4">Campus Tour Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-6">
                <div>
                  <p className="font-semibold">Weekday Tours</p>
                  <p className="text-gray-700">Monday - Friday</p>
                  <p className="text-gray-700">10:00 AM & 2:00 PM</p>
                </div>
                <div>
                  <p className="font-semibold">Weekend Tours</p>
                  <p className="text-gray-700">Saturday</p>
                  <p className="text-gray-700">11:00 AM</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Tours start at the Visitor Center and last approximately 90 minutes. Reservations are recommended 
                but walk-ins are welcome based on availability.
              </p>
              <button className="bg-bluvill-600 hover:bg-bluvill-700 text-white font-bold py-2 px-6 rounded">
                Schedule a Campus Tour
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusLife;
