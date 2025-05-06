
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Award, BookOpen } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  isEnrolled?: boolean;
  moduleCount?: number;
  onEnroll?: (courseId: string) => void;
}

const CourseCard = ({ 
  id, 
  title, 
  description, 
  imageUrl, 
  isEnrolled = false,
  moduleCount = 0,
  onEnroll 
}: CourseCardProps) => {
  const handleEnroll = () => {
    if (onEnroll) {
      onEnroll(id);
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {imageUrl ? (
        <div className="h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            onError={(e) => {
              // Fallback to placeholder image if the course image fails to load
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-gray-400" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {description || "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            <span>{moduleCount} {moduleCount === 1 ? 'module' : 'modules'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>Self-paced</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isEnrolled ? (
          <Link to={`/student-portal/courses/${id}`} className="w-full">
            <Button variant="default" className="w-full">
              <Award className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          </Link>
        ) : (
          <Button 
            variant="outline" 
            className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
            onClick={handleEnroll}
          >
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
