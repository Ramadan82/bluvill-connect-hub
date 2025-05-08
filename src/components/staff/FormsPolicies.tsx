
import { useState } from 'react';
import { FileText, Download, Search, Filter, Eye, Clock, CalendarDays, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const FormsPolicies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  
  // Mock data for forms and policies
  const forms = [
    {
      id: 1,
      title: "Course Registration Form",
      category: "Academic",
      lastUpdated: "April 15, 2025",
      description: "Form for faculty to register new courses for the upcoming semester",
      fileType: "PDF",
      fileSizeKB: 245
    },
    {
      id: 2,
      title: "Grade Change Request",
      category: "Academic",
      lastUpdated: "March 22, 2025",
      description: "Form to request changes to previously submitted student grades",
      fileType: "DOCX",
      fileSizeKB: 180
    },
    {
      id: 3,
      title: "Travel Reimbursement Request",
      category: "Finance",
      lastUpdated: "May 1, 2025",
      description: "Form for requesting reimbursement for approved travel expenses",
      fileType: "PDF",
      fileSizeKB: 320
    },
    {
      id: 4,
      title: "Equipment Purchase Request",
      category: "Procurement",
      lastUpdated: "April 28, 2025",
      description: "Form for requesting new equipment purchases for departments",
      fileType: "PDF",
      fileSizeKB: 275
    }
  ];

  const policies = [
    {
      id: 1,
      title: "Academic Integrity Policy",
      category: "Academic",
      lastUpdated: "January 10, 2025",
      description: "Guidelines for maintaining academic integrity and addressing violations",
      appliesTo: ["Academic Staff", "Students"]
    },
    {
      id: 2,
      title: "Faculty Leave Policy",
      category: "HR",
      lastUpdated: "February 5, 2025",
      description: "Procedures and eligibility for faculty leave requests",
      appliesTo: ["Academic Staff", "Administrative Staff"]
    },
    {
      id: 3,
      title: "Research Ethics Guidelines",
      category: "Research",
      lastUpdated: "March 15, 2025",
      description: "Guidelines for ethical research practices and obtaining research approval",
      appliesTo: ["Academic Staff", "Research Assistants"]
    },
    {
      id: 4,
      title: "IT Acceptable Use Policy",
      category: "IT",
      lastUpdated: "April 20, 2025",
      description: "Guidelines for appropriate use of university computing resources",
      appliesTo: ["All Staff", "Students"]
    }
  ];
  
  // Filter forms and policies based on search term and category
  const filterItems = (items) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || item.category === category;
      
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredForms = filterItems(forms);
  const filteredPolicies = filterItems(policies);
  
  // Categories for filter dropdown
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Academic", label: "Academic" },
    { value: "Finance", label: "Finance" },
    { value: "HR", label: "Human Resources" },
    { value: "Research", label: "Research" },
    { value: "Procurement", label: "Procurement" },
    { value: "IT", label: "Information Technology" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Forms & Policies</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Submit New Form
        </Button>
      </div>
      
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            <span>Find Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input 
                placeholder="Search forms and policies" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Forms and Policies Tabs */}
      <Tabs defaultValue="forms">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        
        <TabsContent value="forms" className="space-y-4">
          {filteredForms.length > 0 ? (
            filteredForms.map(form => (
              <Card key={form.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3 items-center">
                      <div className={`p-2 rounded-full ${
                        form.fileType === 'PDF' ? 'bg-red-100 text-red-600' : 
                        form.fileType === 'DOCX' ? 'bg-blue-100 text-blue-600' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>{form.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Last updated: {form.lastUpdated}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{form.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{form.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {form.fileType} • {(form.fileSizeKB/1024).toFixed(2) < 1 ? 
                        `${form.fileSizeKB} KB` : 
                        `${(form.fileSizeKB/1024).toFixed(2)} MB`}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium mb-1">No forms found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="policies" className="space-y-4">
          {filteredPolicies.length > 0 ? (
            filteredPolicies.map(policy => (
              <Card key={policy.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{policy.title}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        <span>Last updated: {policy.lastUpdated}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{policy.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{policy.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Applies to:</p>
                    <div className="flex flex-wrap gap-2">
                      {policy.appliesTo.map((group, i) => (
                        <Badge key={i} variant="secondary">{group}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      View Full Policy
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="flex flex-col items-center">
                <FileText className="h-12 w-12 text-gray-300 mb-2" />
                <h3 className="text-lg font-medium mb-1">No policies found</h3>
                <p className="text-gray-500">Try adjusting your search criteria</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FormsPolicies;
