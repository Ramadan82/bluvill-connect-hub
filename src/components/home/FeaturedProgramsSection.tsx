
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProgramCard from '@/components/ProgramCard';

const featuredPrograms = [
  {
    id: 'medical-sciences',
    title: 'Medical Sciences',
    description: 'Comprehensive programs in basic and clinical medical sciences',
    duration: '5-6 years',
    level: 'Undergraduate & Graduate',
    imageUrl: '/assets/images/medical sciences2.png',
  },
  {
    id: 'law',
    title: 'Law',
    description: 'Rigorous legal education with focus on Nigerian and international law',
    duration: '5 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'information-technology',
    title: 'Information Technology',
    description: 'Cutting-edge programs in computer science and information systems',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'management',
    title: 'Management',
    description: 'Business and management education for future leaders',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
  }
];

const FeaturedProgramsSection = () => {
  return (
    <section className="py-16 bg-blue-950">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="section-heading">Our Featured Programs</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our diverse range of undergraduate and graduate programs designed 
            to prepare you for success in your chosen field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} {...program} />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/programs">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProgramsSection;
