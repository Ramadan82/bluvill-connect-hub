
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Book, FileText, Link as LinkIcon, Archive } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resource {
  id: string;
  title: string;
  author: string;
  type: string;
  link: string;
  description: string;
}

const LibraryResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample library resources data
  const libraryResources: Resource[] = [
    {
      id: '1',
      title: 'JSTOR Academic Journals',
      author: 'JSTOR',
      type: 'database',
      link: 'https://www.jstor.org',
      description: 'Digital library with academic journals, books, and primary sources.'
    },
    {
      id: '2',
      title: 'ScienceDirect',
      author: 'Elsevier',
      type: 'database',
      link: 'https://www.sciencedirect.com',
      description: 'Full-text scientific database offering articles from academic journals and books.'
    },
    {
      id: '3',
      title: 'Data Analysis Techniques in Research',
      author: 'Robert Johnson',
      type: 'ebook',
      link: '#',
      description: 'A comprehensive guide to modern data analysis methods for researchers.'
    },
    {
      id: '4',
      title: 'IEEE Xplore',
      author: 'IEEE',
      type: 'database',
      link: 'https://ieeexplore.ieee.org',
      description: 'Research database for technology-related content.'
    },
    {
      id: '5',
      title: 'Introduction to Modern Physics',
      author: 'Maria Zhang',
      type: 'ebook',
      link: '#',
      description: 'Digital textbook covering fundamental concepts in modern physics.'
    },
    {
      id: '6',
      title: 'University Digital Archives',
      author: 'University Library',
      type: 'archive',
      link: '#',
      description: 'Collection of historical university documents and research papers.'
    }
  ];
  
  // Filter resources based on search query
  const filteredResources = libraryResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Group resources by type
  const databases = filteredResources.filter(r => r.type === 'database');
  const ebooks = filteredResources.filter(r => r.type === 'ebook');
  const archives = filteredResources.filter(r => r.type === 'archive');
  
  // Icon mapper
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'database':
        return <Search className="h-5 w-5 text-blue-500" />;
      case 'ebook':
        return <Book className="h-5 w-5 text-green-500" />;
      case 'archive':
        return <Archive className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card key={resource.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex">
          <div className="mr-4 mt-1">
            {getResourceIcon(resource.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-lg">{resource.title}</h3>
                <p className="text-sm text-gray-500">{resource.author}</p>
              </div>
              <Badge variant="outline" className="ml-2">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Badge>
            </div>
            <p className="text-sm mt-2">{resource.description}</p>
            <div className="mt-3">
              <Button variant="outline" size="sm" asChild>
                <a href={resource.link} target="_blank" rel="noopener noreferrer">
                  <LinkIcon className="h-4 w-4 mr-1" />
                  Access Resource
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <div className="space-y-4">
      <div className="w-full md:w-1/2 mx-auto mb-6">
        <Input
          placeholder="Search for library resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="ebooks">Ebooks</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Book className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">No resources found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="databases" className="mt-6 space-y-4">
          {databases.length > 0 ? (
            databases.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">No databases found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="ebooks" className="mt-6 space-y-4">
          {ebooks.length > 0 ? (
            ebooks.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Book className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">No ebooks found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="archives" className="mt-6 space-y-4">
          {archives.length > 0 ? (
            archives.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <Archive className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-lg font-medium mb-2">No archives found</h3>
                <p className="text-gray-500">Try adjusting your search query</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LibraryResources;
