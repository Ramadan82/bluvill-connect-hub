
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import HeroSlider from '@/components/HeroSlider';

const CTASection = () => {
  return (
    <HeroSlider className="py-16">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Begin Your Journey at Bluvill University
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-200">
          Join our diverse community of scholars and innovators. 
          Applications for the upcoming academic year are now open.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/admissions">
            <Button size="lg" variant="glass" className="backdrop-blur-sm">
              Apply Now
            </Button>
          </Link>
          <Link to="/campus-tour">
            <Button size="lg" variant="outline" className="bg-transparent text-white border-blue-400 hover:bg-blue-800/30">
              Campus Tour
            </Button>
          </Link>
        </div>
      </div>
    </HeroSlider>
  );
};

export default CTASection;
