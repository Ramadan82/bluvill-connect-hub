import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FileText, Search, Download, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Policy {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  department: string;
  downloadUrl: string;
}

interface Form {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  downloadUrl: string;
}

interface FormsPoliciesProps {
  staffType: string;
}

const FormsPolicies: React.FC<FormsPoliciesProps> = ({ staffType }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('forms');
  const [filteredForms, setFilteredForms] = useState<Form[]>([]);
  const [filteredPolicies, setFilteredPolicies] = useState<Policy[]>([]);
  
  const academicForms: Form[] = [
    {
      id: '1',
      title: 'Course Registration Form',
      category: 'Academic',
      lastUpdated: '2025-04-12',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Exam Accommodation Request',
      category: 'Academic',
      lastUpdated: '2025-03-22',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Research Grant Application',
      category: 'Research',
      lastUpdated: '2025-04-05',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Curriculum Change Proposal',
      category: 'Academic',
      lastUpdated: '2025-02-18',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Student Assessment Form',
      category: 'Academic',
      lastUpdated: '2025-03-30',
      downloadUrl: '#'
    }
  ];

  const nonAcademicForms: Form[] = [
    {
      id: '1',
      title: 'IT Resource Request',
      category: 'Administrative',
      lastUpdated: '2025-04-10',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Office Supply Requisition',
      category: 'Administrative',
      lastUpdated: '2025-03-15',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Event Space Booking',
      category: 'Facilities',
      lastUpdated: '2025-04-02',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Travel Expense Claim',
      category: 'Finance',
      lastUpdated: '2025-03-25',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Maintenance Request Form',
      category: 'Facilities',
      lastUpdated: '2025-04-08',
      downloadUrl: '#'
    }
  ];
  
  const academicPolicies: Policy[] = [
    {
      id: '1',
      title: 'Academic Integrity Policy',
      category: 'Academic',
      department: 'Office of Academic Affairs',
      lastUpdated: '2025-01-15',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Research Ethics Guidelines',
      category: 'Research',
      department: 'Research Office',
      lastUpdated: '2025-02-10',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Course Development Standards',
      category: 'Academic',
      department: 'Faculty Development Center',
      lastUpdated: '2025-03-05',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Faculty Evaluation Framework',
      category: 'Academic',
      department: 'Human Resources',
      lastUpdated: '2025-02-28',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'Student Engagement Guidelines',
      category: 'Academic',
      department: 'Student Affairs',
      lastUpdated: '2025-03-20',
      downloadUrl: '#'
    }
  ];
  
  const nonAcademicPolicies: Policy[] = [
    {
      id: '1',
      title: 'Staff Code of Conduct',
      category: 'Administrative',
      department: 'Human Resources',
      lastUpdated: '2025-01-20',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Workplace Health & Safety',
      category: 'Administrative',
      department: 'Facility Management',
      lastUpdated: '2025-03-12',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'IT Usage Policy',
      category: 'IT',
      department: 'IT Services',
      lastUpdated: '2025-02-25',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Financial Procedures Manual',
      category: 'Finance',
      department: 'Finance Office',
      lastUpdated: '2025-04-01',
      downloadUrl: '#'
    },
    {
      id: '5',
      title: 'University Property Usage',
      category: 'Administrative',
      department: 'Asset Management',
      lastUpdated: '2025-03-18',
      downloadUrl: '#'
    }
  ];
  
  // Filter data based on staff type and search term
  useEffect(() => {
    const forms = staffType === 'academic' ? academicForms : nonAcademicForms;
    const policies = staffType === 'academic' ? academicPolicies : nonAcademicPolicies;
    
    setFilteredForms(
      forms.filter(form => 
        form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        form.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setFilteredPolicies(
      policies.filter(policy => 
        policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.department.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, staffType]);
  
  // Compare dates as date objects, not strings
  const sortByDate = (a: string, b: string) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB.getTime() - dateA.getTime(); // newest first
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Forms & Policies</h1>
        <p className="text-gray-500">
          Access and download important university forms and policy documents
        </p>
      </div>
      
      {/* Search and filter */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search for forms or policies..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forms" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredForms.length > 0 ? (
              filteredForms.map((form) => (
                <Card key={form.id}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{form.title}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="outline">{form.category}</Badge>
                          <span className="text-gray-500">Updated: {form.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="flex items-center gap-2" asChild>
                      <a href={form.downloadUrl} download>
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No forms found matching your search criteria.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="policies" className="pt-4">
          <div className="grid grid-cols-1 gap-4">
            {filteredPolicies.length > 0 ? (
              filteredPolicies.map((policy) => (
                <Card key={policy.id}>
                  <CardContent className="p-6 flex justify-between items-center">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{policy.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-2 text-sm">
                          <Badge variant="outline">{policy.category}</Badge>
                          <span className="text-gray-600">{policy.department}</span>
                          <span className="text-gray-500">Updated: {policy.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={policy.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                          View
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                        <a href={policy.downloadUrl} download>
                          <Download className="h-4 w-4" />
                          Download
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500 py-10">No policies found matching your search criteria.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsPolicies;
