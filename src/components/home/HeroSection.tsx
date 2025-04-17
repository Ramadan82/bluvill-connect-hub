
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
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Empowering Future Leaders Through Excellence in Education
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/admissions">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Apply Now
            </Button>
          </Link>
          <Link to="/campus-tour">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary/10"
            >
              Explore Campus
            </Button>
          </Link>
        </div>
      </div>
    </HeroSlider>
  );
};

export default HeroSection;
