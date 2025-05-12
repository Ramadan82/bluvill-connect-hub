
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BookOpen, Library, GraduationCap, Search } from 'lucide-react';
import { useState } from 'react';
import AcademicMaterials from './resources/AcademicMaterials';
import LibraryResources from './resources/LibraryResources';
import AcademicSupport from './resources/AcademicSupport';

const ResourcesPage = () => {
  const [activeTab, setActiveTab] = useState('materials');
  const [globalSearch, setGlobalSearch] = useState('');
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Academic Resources</h2>
        <p className="text-gray-500">Access study materials, textbooks, and other learning resources.</p>
      </div>
      
      <div className="flex flex-wrap gap-4 sm:gap-6">
        <div 
          className={`w-full sm:w-[calc(33.333%-16px)] flex flex-col items-center p-4 cursor-pointer transition-all ${activeTab === 'materials' ? 'bg-blue-50 border-blue-200' : 'bg-white'} rounded-lg border shadow-sm hover:shadow-md`}
          onClick={() => setActiveTab('materials')}
        >
          <BookOpen className={`h-10 w-10 ${activeTab === 'materials' ? 'text-blue-600' : 'text-blue-500'} mb-2`} />
          <h3 className="text-lg font-medium">Course Materials</h3>
          <p className="text-sm text-gray-500 text-center">Access your course slides, readings, and assignments</p>
        </div>
        
        <div 
          className={`w-full sm:w-[calc(33.333%-16px)] flex flex-col items-center p-4 cursor-pointer transition-all ${activeTab === 'library' ? 'bg-blue-50 border-blue-200' : 'bg-white'} rounded-lg border shadow-sm hover:shadow-md`}
          onClick={() => setActiveTab('library')}
        >
          <Library className={`h-10 w-10 ${activeTab === 'library' ? 'text-blue-600' : 'text-blue-500'} mb-2`} />
          <h3 className="text-lg font-medium">Library Resources</h3>
          <p className="text-sm text-gray-500 text-center">Ebooks, journals, and research databases</p>
        </div>
        
        <div 
          className={`w-full sm:w-[calc(33.333%-16px)] flex flex-col items-center p-4 cursor-pointer transition-all ${activeTab === 'support' ? 'bg-blue-50 border-blue-200' : 'bg-white'} rounded-lg border shadow-sm hover:shadow-md`}
          onClick={() => setActiveTab('support')}
        >
          <GraduationCap className={`h-10 w-10 ${activeTab === 'support' ? 'text-blue-600' : 'text-blue-500'} mb-2`} />
          <h3 className="text-lg font-medium">Academic Support</h3>
          <p className="text-sm text-gray-500 text-center">Tutoring, writing help, and learning guides</p>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex items-center mx-auto mt-8 mb-4">
        <Input 
          placeholder="Search across all resources..." 
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          className="w-full"
        />
        <Button variant="outline" size="icon" className="ml-2">
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mt-6">
        {activeTab === 'materials' && <AcademicMaterials />}
        {activeTab === 'library' && <LibraryResources />}
        {activeTab === 'support' && <AcademicSupport />}
      </div>
    </div>
  );
};

export default ResourcesPage;
