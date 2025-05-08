
import { BookOpen, Video, FileText, Download, Users, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const TeachingResources = () => {
  // Mock data for teaching resources
  const courseTemplates = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      type: "Course Template",
      description: "Complete course template with syllabus, assignments, and lesson plans",
      downloadable: true
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      type: "Course Template",
      description: "Comprehensive template for calculus, linear algebra, and statistics courses",
      downloadable: true
    },
    {
      id: 3,
      title: "Business Administration Fundamentals",
      type: "Course Template",
      description: "Business course template with case studies and group project frameworks",
      downloadable: true
    }
  ];

  const teachingMaterials = [
    {
      id: 1,
      title: "Virtual Lab Simulations",
      type: "Interactive",
      description: "Collection of virtual lab simulations for science courses",
      format: "Web-based" 
    },
    {
      id: 2,
      title: "Student Engagement Strategies",
      type: "Guide",
      description: "Best practices for increasing student participation and engagement",
      format: "PDF"
    },
    {
      id: 3,
      title: "Grading Rubric Templates",
      type: "Templates",
      description: "Standardized grading rubrics for different assignment types",
      format: "Document"
    }
  ];

  const trainingVideos = [
    {
      id: 1,
      title: "Learning Management System Tutorial",
      duration: "45 minutes",
      instructor: "Dr. Michelle Carter",
      thumbnail: "https://placehold.co/200x120"
    },
    {
      id: 2,
      title: "Effective Online Teaching Strategies",
      duration: "60 minutes",
      instructor: "Prof. Robert Johnson",
      thumbnail: "https://placehold.co/200x120"
    },
    {
      id: 3,
      title: "Creating Engaging Course Content",
      duration: "30 minutes",
      instructor: "Dr. Sarah Williams",
      thumbnail: "https://placehold.co/200x120"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teaching Resources</h1>
        <div className="flex gap-2">
          <Input placeholder="Search resources..." className="w-60" />
          <Button variant="outline">Search</Button>
        </div>
      </div>
      
      <Tabs defaultValue="templates">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="templates">Course Templates</TabsTrigger>
          <TabsTrigger value="materials">Teaching Materials</TabsTrigger>
          <TabsTrigger value="videos">Training Videos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-4">
          {courseTemplates.map(template => (
            <Card key={template.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{template.title}</CardTitle>
                      <CardDescription>{template.type}</CardDescription>
                    </div>
                  </div>
                  {template.downloadable && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" /> 
                      Download
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{template.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Preview</Button>
                  <Button size="sm" variant="outline">Customize</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="materials" className="space-y-4">
          {teachingMaterials.map(material => (
            <Card key={material.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex gap-3 items-center">
                    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription>{material.type} • {material.format}</CardDescription>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> 
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{material.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button size="sm">Access Now</Button>
                  <Button size="sm" variant="outline">Share</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="videos" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trainingVideos.map(video => (
            <Card key={video.id} className="overflow-hidden">
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-36 object-cover" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
                  <Button size="icon" variant="ghost" className="rounded-full bg-white text-black hover:bg-white hover:text-blue-600">
                    <Play className="h-8 w-8" />
                  </Button>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>{video.duration} • {video.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Watch Now</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeachingResources;
