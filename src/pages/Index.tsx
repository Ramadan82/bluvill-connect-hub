
import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import QuickLinksSection from '@/components/home/QuickLinksSection';
import AboutSection from '@/components/home/AboutSection';
import FeaturedProgramsSection from '@/components/home/FeaturedProgramsSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <QuickLinksSection />
      <AboutSection />
      <FeaturedProgramsSection />
      <CTASection />
    </div>
  );
};

export default Index;
