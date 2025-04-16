
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, Clock, ArrowRight } from 'lucide-react';

interface ProgramCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  imageUrl: string;
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  id,
  title,
  description,
  duration,
  level,
  imageUrl
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl text-bluvill-800">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <GraduationCap size={16} className="mr-1" />
            <span>{level}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/programs/${id}`} className="w-full">
          <Button variant="default" className="w-full bg-bluvill-600 hover:bg-bluvill-700">
            Learn More <ArrowRight size={16} className="ml-2" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;
