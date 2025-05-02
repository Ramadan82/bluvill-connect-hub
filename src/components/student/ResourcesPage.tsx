
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FileText, Book, Video, Download, Search, BookOpen, GraduationCap, Library } from 'lucide-react';

const ResourcesPage = () => {
  // Sample resources - in a real app, these would come from a database
  const resources = [
    {
      id: '1',
      title: 'Introduction to Programming',
      type: 'document',
      format: 'PDF',
      size: '2.4 MB',
      course: 'Computer Science 101',
      date: '2023-10-15'
    },
    {
      id: '2',
      title: 'Database Design Principles',
      type: 'document',
      format: 'PDF',
      size: '3.1 MB',
      course: 'Database Systems',
      date: '2023-10-22'
    },
    {
      id: '3',
      title: 'Object-Oriented Programming Examples',
      type: 'document',
      format: 'DOCX',
      size: '1.8 MB',
      course: 'Java Programming',
      date: '2023-11-05'
    },
    {
      id: '4',
      title: 'Introduction to Neural Networks',
      type: 'video',
      format: 'MP4',
      size: '45 MB',
      course: 'Artificial Intelligence',
      date: '2023-09-18'
    },
    {
      id: '5',
      title: 'Web Development Frameworks',
      type: 'video',
      format: 'MP4',
      size: '38 MB',
      course: 'Web Development',
      date: '2023-10-30'
    },
    {
      id: '6',
      title: 'Data Structures and Algorithms',
      type: 'book',
      format: 'EPUB',
      size: '5.6 MB',
      course: 'Computer Science 101',
      date: '2023-11-12'
    },
  ];

  // Resource type icons
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'document':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'video':
        return <Video className="h-6 w-6 text-red-500" />;
      case 'book':
        return <Book className="h-6 w-6 text-green-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Academic Resources</h2>
        <p className="text-gray-500">Access study materials, textbooks, and other learning resources.</p>
      </div>
      
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <Card className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] flex flex-col items-center p-4 hover:shadow-md cursor-pointer transition-shadow">
          <BookOpen className="h-10 w-10 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium">Course Materials</h3>
          <p className="text-sm text-gray-500 text-center">Access your course slides, readings, and assignments</p>
        </Card>
        
        <Card className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] flex flex-col items-center p-4 hover:shadow-md cursor-pointer transition-shadow">
          <Library className="h-10 w-10 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium">Library Resources</h3>
          <p className="text-sm text-gray-500 text-center">Ebooks, journals, and research databases</p>
        </Card>
        
        <Card className="w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] flex flex-col items-center p-4 hover:shadow-md cursor-pointer transition-shadow">
          <GraduationCap className="h-10 w-10 text-blue-500 mb-2" />
          <h3 className="text-lg font-medium">Academic Support</h3>
          <p className="text-sm text-gray-500 text-center">Tutoring, writing help, and learning guides</p>
        </Card>
      </div>
      
      <div className="mt-8">
        <Tabs defaultValue="all">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0 mb-4">
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center">
              <Input 
                placeholder="Search resources..." 
                className="w-full sm:w-64 mr-2" 
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>All Resources</CardTitle>
                <CardDescription>Documents, videos, and books from your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {resources.map(resource => (
                    <div key={resource.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-gray-500">{resource.course}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span className="mr-3">{resource.format}</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>PDFs, Word documents, and other text files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {resources
                    .filter(resource => resource.type === 'document')
                    .map(resource => (
                      <div key={resource.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-gray-500">{resource.course}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">{resource.format}</span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="videos" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Videos</CardTitle>
                <CardDescription>Lecture recordings and educational videos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {resources
                    .filter(resource => resource.type === 'video')
                    .map(resource => (
                      <div key={resource.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-gray-500">{resource.course}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">{resource.format}</span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="books" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Books</CardTitle>
                <CardDescription>Ebooks and digital textbooks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {resources
                    .filter(resource => resource.type === 'book')
                    .map(resource => (
                      <div key={resource.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex items-start">
                          <div className="mr-3 mt-1">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{resource.title}</h4>
                            <p className="text-sm text-gray-500">{resource.course}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <span className="mr-3">{resource.format}</span>
                              <span>{resource.size}</span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResourcesPage;
