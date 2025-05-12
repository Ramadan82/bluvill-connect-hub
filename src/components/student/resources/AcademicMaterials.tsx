
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Book, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Material {
  id: string;
  title: string;
  subject: string;
  type: string;
  format: string;
  size: string;
  date: string;
}

const AcademicMaterials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  
  // Sample academic materials data
  const academicMaterials: Material[] = [
    {
      id: '1',
      title: 'Introduction to Programming',
      subject: 'Computer Science',
      type: 'lecture',
      format: 'PDF',
      size: '2.4 MB',
      date: '2023-10-15'
    },
    {
      id: '2',
      title: 'Advanced Data Structures',
      subject: 'Computer Science',
      type: 'exercise',
      format: 'PDF',
      size: '1.8 MB',
      date: '2023-11-02'
    },
    {
      id: '3',
      title: 'Organic Chemistry Fundamentals',
      subject: 'Chemistry',
      type: 'textbook',
      format: 'PDF',
      size: '5.6 MB',
      date: '2023-09-28'
    },
    {
      id: '4',
      title: 'Linear Algebra Exercises',
      subject: 'Mathematics',
      type: 'exercise',
      format: 'PDF',
      size: '1.2 MB',
      date: '2023-10-20'
    },
    {
      id: '5',
      title: 'Human Anatomy Atlas',
      subject: 'Medicine',
      type: 'textbook',
      format: 'PDF',
      size: '8.3 MB',
      date: '2023-09-15'
    }
  ];
  
  // Get unique subjects for filter
  const subjects = ['all', ...new Set(academicMaterials.map(material => material.subject))];
  const types = ['all', ...new Set(academicMaterials.map(material => material.type))];
  
  // Filter materials based on search query and filters
  const filteredMaterials = academicMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || material.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    
    return matchesSearch && matchesSubject && matchesType;
  });
  
  // Icon mapper
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'lecture':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'exercise':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'textbook':
        return <Book className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Badge color based on type
  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800';
      case 'exercise':
        return 'bg-green-100 text-green-800';
      case 'textbook':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select
            value={subjectFilter}
            onValueChange={(value) => setSubjectFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject === 'all' ? 'All Subjects' : subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredMaterials.length > 0 ? (
        <div className="space-y-4">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {getTypeIcon(material.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-lg">{material.title}</h3>
                      <Badge className={getTypeBadgeColor(material.type)}>
                        {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{material.subject}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      <span className="mr-3">{material.format}</span>
                      <span className="mr-3">{material.size}</span>
                      <span>{new Date(material.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="ml-2">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-gray-300" />
            </div>
            <h3 className="text-lg font-medium mb-2">No materials found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AcademicMaterials;
