
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, MapPin, Award } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const stats = [
  { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Students' },
  { icon: <GraduationCap className="h-6 w-6" />, value: '500+', label: 'Faculty Members' },
  { icon: <BookOpen className="h-6 w-6" />, value: '25+', label: 'Degree Programs' },
  { icon: <Award className="h-6 w-6" />, value: '95%', label: 'Employment Rate' },
];

const AboutSection = () => {
  return (
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
  );
};

export default AboutSection;
