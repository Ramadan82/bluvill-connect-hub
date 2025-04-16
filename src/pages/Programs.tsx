
import React from 'react';
import PageHeader from '@/components/PageHeader';
import ProgramCard from '@/components/ProgramCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const programs = [
  {
    id: 'medical-sciences',
    title: 'Medical Sciences',
    description: 'Comprehensive programs in basic and clinical medical sciences',
    duration: '5-6 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b9576?q=80&w=1200&auto=format&fit=crop',
    category: 'undergraduate'
  },
  {
    id: 'law',
    title: 'Law',
    description: 'Rigorous legal education with focus on Nigerian and international law',
    duration: '5 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
    category: 'undergraduate'
  },
  {
    id: 'information-technology',
    title: 'Information Technology',
    description: 'Cutting-edge programs in computer science and information systems',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    category: 'undergraduate'
  },
  {
    id: 'management',
    title: 'Management',
    description: 'Business and management education for future leaders',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    category: 'undergraduate'
  },
  {
    id: 'medical-sciences-msc',
    title: 'Medical Sciences (MSc)',
    description: 'Advanced studies in medical sciences',
    duration: '2 years',
    level: 'Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1576671414121-aa2d60f1cc6c?q=80&w=1200&auto=format&fit=crop',
    category: 'graduate'
  },
  {
    id: 'law-llm',
    title: 'Law (LLM)',
    description: 'Master of Laws specializing in various legal fields',
    duration: '1-2 years',
    level: 'Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=1200&auto=format&fit=crop',
    category: 'graduate'
  },
  {
    id: 'information-technology-msc',
    title: 'Information Technology (MSc)',
    description: 'Advanced studies in IT, data science, and cybersecurity',
    duration: '2 years',
    level: 'Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
    category: 'graduate'
  },
  {
    id: 'management-mba',
    title: 'Management (MBA)',
    description: 'Master of Business Administration',
    duration: '1-2 years',
    level: 'Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop',
    category: 'graduate'
  }
];

const Programs = () => {
  return (
    <div>
      <PageHeader 
        title="Academic Programs" 
        subtitle="Discover our comprehensive range of undergraduate and graduate programs"
        background="gradient"
      />
      
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <Tabs defaultValue="all" className="mb-12">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Programs</TabsTrigger>
                <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
                <TabsTrigger value="graduate">Graduate</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {programs.map((program) => (
                  <ProgramCard key={program.id} {...program} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="undergraduate" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {programs
                  .filter((program) => program.category === 'undergraduate')
                  .map((program) => (
                    <ProgramCard key={program.id} {...program} />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="graduate" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {programs
                  .filter((program) => program.category === 'graduate')
                  .map((program) => (
                    <ProgramCard key={program.id} {...program} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Programs;
