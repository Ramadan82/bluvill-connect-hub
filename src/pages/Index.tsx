import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, MapPin, Award, Globe } from 'lucide-react';
import ProgramCard from '@/components/ProgramCard';
import HeroSlider from '@/components/HeroSlider';

const featuredPrograms = [
  {
    id: 'medical-sciences',
    title: 'Medical Sciences',
    description: 'Comprehensive programs in basic and clinical medical sciences',
    duration: '5-6 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b9576?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'law',
    title: 'Law',
    description: 'Rigorous legal education with focus on Nigerian and international law',
    duration: '5 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'information-technology',
    title: 'Information Technology',
    description: 'Cutting-edge programs in computer science and information systems',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'management',
    title: 'Management',
    description: 'Business and management education for future leaders',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
  }
];

const stats = [
  { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Students' },
  { icon: <GraduationCap className="h-6 w-6" />, value: '500+', label: 'Faculty Members' },
  { icon: <BookOpen className="h-6 w-6" />, value: '25+', label: 'Degree Programs' },
  { icon: <Award className="h-6 w-6" />, value: '95%', label: 'Employment Rate' },
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSlider>
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Bluvill University
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Empowering Future Leaders Through Excellence in Education
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/admissions">
              <Button size="lg" className="bg-white text-bluvill-800 hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link to="/campus-tour">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Campus Tour
              </Button>
            </Link>
          </div>
        </div>
      </HeroSlider>

      {/* Quick Links */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-bluvill-700">
                  <GraduationCap className="mr-2" size={24} />
                  For Prospective Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Discover our world-class programs and admission process
                </CardDescription>
                <Link to="/admissions">
                  <Button variant="outline" className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-bluvill-700">
                  <Users className="mr-2" size={24} />
                  For Current Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Access resources, schedules, and support services
                </CardDescription>
                <Link to="/student-portal">
                  <Button variant="outline" className="w-full">Student Portal</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="card-hover">
              <CardHeader>
                <CardTitle className="flex items-center text-bluvill-700">
                  <BookOpen className="mr-2" size={24} />
                  For Faculty & Staff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  Access teaching resources and administrative tools
                </CardDescription>
                <Link to="/staff-portal">
                  <Button variant="outline" className="w-full">Staff Portal</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Bluvill */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-heading">About Bluvill University</h2>
              <p className="mb-4 text-gray-700">
                Established with a vision to transform education in Nigeria, Bluvill University
                has grown to become one of the leading institutions of higher learning in West Africa.
              </p>
              <p className="mb-6 text-gray-700">
                Located in Abuja, Nigeria's capital city, our university offers a diverse range
                of undergraduate and graduate programs designed to prepare students for global 
                leadership and professional excellence.
              </p>
              <div className="flex items-center mb-6">
                <MapPin className="text-bluvill-600 mr-2" />
                <span className="text-gray-700">Bluvill Campus, Abuja, Nigeria</span>
              </div>
              <Link to="/about">
                <Button className="bg-bluvill-600 hover:bg-bluvill-700">Learn More About Us</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center card-hover">
                  <CardHeader className="pb-2">
                    <div className="mx-auto text-bluvill-600">{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-bluvill-800">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Featured Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our diverse range of undergraduate and graduate programs designed 
              to prepare you for success in your chosen field.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPrograms.map((program) => (
              <ProgramCard key={program.id} {...program} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/programs">
              <Button size="lg" className="bg-bluvill-600 hover:bg-bluvill-700">
                View All Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <HeroSlider className="py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Begin Your Journey at Bluvill University
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our diverse community of scholars and innovators. 
            Applications for the upcoming academic year are now open.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admissions">
              <Button size="lg" className="bg-white text-bluvill-800 hover:bg-gray-100">
                Apply Now
              </Button>
            </Link>
            <Link to="/campus-tour">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Campus Tour
              </Button>
            </Link>
          </div>
        </div>
      </HeroSlider>
    </div>
  );
};

export default Index;
