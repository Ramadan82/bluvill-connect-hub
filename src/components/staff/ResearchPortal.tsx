
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Download, Search, Users, Calendar, FileText } from 'lucide-react';

interface ResearchProject {
  id: string;
  title: string;
  status: 'Active' | 'Completed' | 'Proposed';
  field: string;
  collaborators: number;
  progress: number;
  deadline: string;
  fundingSource?: string;
  grantAmount?: string;
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
  authors: string;
  citations: number;
  type: 'Journal' | 'Conference' | 'Book Chapter';
  downloadUrl: string;
}

const ResearchPortal: React.FC<{ staffType: string }> = ({ staffType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [filteredProjects, setFilteredProjects] = useState<ResearchProject[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>([]);
  
  const academicProjects: ResearchProject[] = [
    {
      id: '1',
      title: 'Machine Learning Applications in Educational Technology',
      status: 'Active',
      field: 'Computer Science',
      collaborators: 4,
      progress: 65,
      deadline: '2025-12-15',
      fundingSource: 'National Science Foundation',
      grantAmount: '₦250,000'
    },
    {
      id: '2',
      title: 'Sustainable Urban Development in Nigerian Cities',
      status: 'Active',
      field: 'Urban Planning',
      collaborators: 6,
      progress: 35,
      deadline: '2026-03-30',
      fundingSource: 'Ministry of Urban Development',
      grantAmount: '₦420,000'
    },
    {
      id: '3',
      title: 'Impact of Climate Change on Coastal Communities',
      status: 'Proposed',
      field: 'Environmental Science',
      collaborators: 3,
      progress: 10,
      deadline: '2026-06-01',
      fundingSource: 'African Climate Foundation',
      grantAmount: '₦350,000'
    },
    {
      id: '4',
      title: 'Advancements in Renewable Energy Storage Systems',
      status: 'Completed',
      field: 'Engineering',
      collaborators: 7,
      progress: 100,
      deadline: '2025-01-30',
      fundingSource: 'Energy Commission',
      grantAmount: '₦500,000'
    }
  ];
  
  const nonAcademicProjects: ResearchProject[] = [
    {
      id: '1',
      title: 'Optimization of University Administrative Processes',
      status: 'Active',
      field: 'Administrative',
      collaborators: 3,
      progress: 45,
      deadline: '2025-09-30'
    },
    {
      id: '2',
      title: 'Student Services Improvement Initiative',
      status: 'Proposed',
      field: 'Student Affairs',
      collaborators: 5,
      progress: 15,
      deadline: '2026-01-15'
    },
    {
      id: '3',
      title: 'Campus Sustainability Project',
      status: 'Active',
      field: 'Facilities',
      collaborators: 4,
      progress: 70,
      deadline: '2025-11-30'
    },
    {
      id: '4',
      title: 'Digital Transformation of Library Services',
      status: 'Completed',
      field: 'Library Science',
      collaborators: 6,
      progress: 100,
      deadline: '2025-02-28'
    }
  ];
  
  const academicPublications: Publication[] = [
    {
      id: '1',
      title: 'Advances in Neural Network Architectures for Natural Language Processing',
      journal: 'Journal of Artificial Intelligence Research',
      year: '2024',
      authors: 'A. Okafor, B. Adeyemi, C. Nwachukwu',
      citations: 24,
      type: 'Journal',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Sustainable Urban Planning in Developing Nations: A Case Study of Lagos',
      journal: 'Urban Studies Quarterly',
      year: '2024',
      authors: 'D. Olawale, E. Mensah, F. Okorie',
      citations: 12,
      type: 'Journal',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Educational Technology Implementation in Nigerian Universities',
      journal: 'International Conference on Education in Africa',
      year: '2023',
      authors: 'G. Eze, H. Mohammed, I. Chukwu',
      citations: 8,
      type: 'Conference',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Renewable Energy Solutions for Rural Communities',
      journal: 'Handbook of Sustainable Development',
      year: '2023',
      authors: 'J. Okonkwo, K. Abiodun, L. Nwosu',
      citations: 15,
      type: 'Book Chapter',
      downloadUrl: '#'
    }
  ];
  
  const nonAcademicPublications: Publication[] = [
    {
      id: '1',
      title: 'Best Practices in University Administration',
      journal: 'Higher Education Management Review',
      year: '2024',
      authors: 'M. Johnson, N. Abara, O. Taiwo',
      citations: 5,
      type: 'Journal',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Implementing Efficient Resource Management Systems in Universities',
      journal: 'Conference on Educational Administration',
      year: '2023',
      authors: 'P. Obi, Q. Dauda, R. Egwu',
      citations: 3,
      type: 'Conference',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Digital Transformation of University Support Services',
      journal: 'Journal of Educational Technology Management',
      year: '2023',
      authors: 'S. Garba, T. Adeleke, U. Musa',
      citations: 7,
      type: 'Journal',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Sustainable Practices in University Operations',
      journal: 'Handbook of Institutional Sustainability',
      year: '2022',
      authors: 'V. Chikwendu, W. Balogun, X. Nduka',
      citations: 9,
      type: 'Book Chapter',
      downloadUrl: '#'
    }
  ];
  
  // Filter data based on staff type and search term
  useEffect(() => {
    const projects = staffType === 'academic' ? academicProjects : nonAcademicProjects;
    const publications = staffType === 'academic' ? academicPublications : nonAcademicPublications;
    
    setFilteredProjects(
      projects.filter(project => 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.status.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredPublications(
      publications.filter(publication => 
        publication.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publication.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, staffType]);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Proposed':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Journal':
        return 'bg-purple-100 text-purple-800';
      case 'Conference':
        return 'bg-indigo-100 text-indigo-800';
      case 'Book Chapter':
        return 'bg-teal-100 text-teal-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Research Portal</h1>
        <p className="text-gray-500">
          {staffType === 'academic' 
            ? 'Manage your academic research projects, publications, and grant applications'
            : 'Access university research resources and operational improvement projects'}
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search research projects and publications..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                          <Badge variant="outline">{project.field}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Deadline</div>
                        <div className="font-medium">{project.deadline}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-500">Progress</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{project.collaborators} Collaborators</span>
                        </div>
                        
                        {project.fundingSource && (
                          <div className="text-sm">
                            <span className="text-gray-500">Funding: </span>
                            <span>{project.fundingSource}</span>
                            {project.grantAmount && (
                              <span className="ml-1">({project.grantAmount})</span>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No research projects found matching your search criteria.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="publications" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPublications.length > 0 ? (
              filteredPublications.map((publication) => (
                <Card key={publication.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Book className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{publication.title}</h3>
                          <p className="text-gray-600">{publication.journal}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                            <Badge className={getTypeColor(publication.type)}>
                              {publication.type}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5 text-gray-500" />
                              <span className="text-sm text-gray-600">{publication.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-3.5 w-3.5 text-gray-500" />
                              <span className="text-sm text-gray-600">{publication.citations} citations</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Authors:</span> {publication.authors}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={publication.downloadUrl} download>
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No publications found matching your search criteria.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchPortal;
