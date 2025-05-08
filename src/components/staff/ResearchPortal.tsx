
import { ResearchSquare, BookCopy, Download, Link as LinkIcon, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const ResearchPortal = () => {
  // This would typically be fetched from an API
  const researchProjects = [
    {
      id: 1,
      title: "Artificial Intelligence in Education",
      department: "Computer Science",
      progress: 75,
      grants: "$250,000",
      team: ["Dr. John Smith", "Dr. Emily Chen", "Prof. David Lee"],
      publications: 3
    },
    {
      id: 2,
      title: "Climate Change Impact on Local Agriculture",
      department: "Environmental Science",
      progress: 45,
      grants: "$120,000",
      team: ["Dr. Sarah Johnson", "Prof. Michael Brown"],
      publications: 1
    },
    {
      id: 3,
      title: "Novel Drug Delivery Systems",
      department: "Pharmaceutical Sciences",
      progress: 90,
      grants: "$350,000",
      team: ["Dr. Robert Williams", "Dr. Jennifer Lopez", "Dr. Thomas Wright"],
      publications: 5
    }
  ];

  const publications = [
    {
      id: 1,
      title: "Machine Learning Applications in Higher Education",
      authors: "Smith J., Chen E., Lee D.",
      journal: "Journal of Educational Technology",
      year: 2024,
      citations: 15
    },
    {
      id: 2,
      title: "Evaluating Climate Adaptation Strategies for Small-Scale Farmers",
      authors: "Johnson S., Brown M.",
      journal: "Environmental Science & Policy",
      year: 2024,
      citations: 8
    },
    {
      id: 3,
      title: "Nanoparticle-Based Drug Delivery for Cancer Treatment",
      authors: "Williams R., Lopez J., Wright T.",
      journal: "Advanced Drug Delivery Reviews",
      year: 2023,
      citations: 32
    }
  ];

  const researchGrants = [
    {
      id: 1,
      title: "AI for Accessible Education",
      funder: "National Science Foundation",
      amount: "$250,000",
      status: "Active",
      deadline: "N/A (Funded)",
    },
    {
      id: 2,
      title: "Climate Resilience in Agricultural Communities",
      funder: "Environmental Protection Agency",
      amount: "$120,000",
      status: "Active",
      deadline: "N/A (Funded)",
    },
    {
      id: 3,
      title: "Emerging Healthcare Technologies Grant",
      funder: "National Institutes of Health",
      amount: "$350,000",
      status: "Active",
      deadline: "N/A (Funded)",
    },
    {
      id: 4,
      title: "Educational Innovation Research Grant",
      funder: "Department of Education",
      amount: "$175,000",
      status: "Application Open",
      deadline: "June 30, 2025",
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Research Portal</h1>
        <Button>Create New Project</Button>
      </div>
      
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="projects">Research Projects</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="grants">Research Grants</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
          {researchProjects.map(project => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>Department: {project.department}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">Manage</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Project Progress</p>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2" />
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Grant Funding</p>
                    <p className="font-medium">{project.grants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Publications</p>
                    <p className="font-medium">{project.publications}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Research Team</p>
                  <div className="flex flex-wrap gap-2">
                    {project.team.map((member, i) => (
                      <div key={i} className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full">
                        {member}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="publications" className="space-y-4">
          {publications.map(pub => (
            <Card key={pub.id}>
              <CardHeader>
                <CardTitle className="text-xl">{pub.title}</CardTitle>
                <CardDescription>{pub.authors}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Journal</p>
                    <p className="font-medium">{pub.journal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Year</p>
                    <p className="font-medium">{pub.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Citations</p>
                    <p className="font-medium">{pub.citations}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex gap-2">
                    <Download className="h-4 w-4" /> Download PDF
                  </Button>
                  <Button variant="outline" size="sm" className="flex gap-2">
                    <LinkIcon className="h-4 w-4" /> View Online
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="grants" className="space-y-4">
          {researchGrants.map(grant => (
            <Card key={grant.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{grant.title}</CardTitle>
                    <CardDescription>Funder: {grant.funder}</CardDescription>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm ${
                    grant.status === "Active" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {grant.status}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount</p>
                    <p className="font-medium">{grant.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Deadline</p>
                    <p className="font-medium">{grant.deadline}</p>
                  </div>
                </div>
                {grant.status === "Application Open" && (
                  <Button className="mt-4">Apply Now</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResearchPortal;
