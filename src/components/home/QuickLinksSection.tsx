
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

const QuickLinksSection = () => {
  return (
    <section className="bg-blue-950 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-700">
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
              <CardTitle className="flex items-center text-blue-700">
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
              <CardTitle className="flex items-center text-blue-700">
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
  );
};

export default QuickLinksSection;
