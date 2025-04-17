
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSlider from '@/components/HeroSlider';

const HeroSection = () => {
  return (
    <HeroSlider>
      <div className="max-w-3xl animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
          Welcome to Bluvill University
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-blue-100">
          Empowering Future Leaders Through Excellence in Education
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/admissions">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50">
              Apply Now
            </Button>
          </Link>
          <Link to="/campus-tour">
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-blue-800/20">
              Explore Campus
            </Button>
          </Link>
        </div>
      </div>
    </HeroSlider>
  );
};

export default HeroSection;
