
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSlider from '@/components/HeroSlider';

const HeroSection = () => {
  return (
    <HeroSlider>
      <div className="max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Welcome to Bluvill University
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Empowering Future Leaders Through Excellence in Education
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/admissions">
            <Button size="lg" className="bg-white text-bluvill-800 hover:bg-gray-100">
              Apply Now
            </Button>
          </Link>
          <Link to="/campus-tour">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Explore Campus
            </Button>
          </Link>
        </div>
      </div>
    </HeroSlider>
  );
};

export default HeroSection;
