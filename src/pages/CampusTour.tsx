
import React from 'react';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const campusImages = [
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1200&auto=format&fit=crop",
    alt: "University Main Building",
    caption: "The iconic main administration building of Bluvill University."
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=1200&auto=format&fit=crop",
    alt: "Library",
    caption: "Our state-of-the-art library with over 500,000 volumes and digital resources."
  },
  {
    src: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?q=80&w=1200&auto=format&fit=crop",
    alt: "Science Complex",
    caption: "The science complex houses our advanced laboratories and research facilities."
  },
  {
    src: "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=1200&auto=format&fit=crop",
    alt: "Student Center",
    caption: "The student center provides spaces for collaboration, events, and student services."
  },
];

const CampusTour = () => {
  return (
    <div>
      <PageHeader 
        title="Campus Tour" 
        subtitle="Explore our beautiful campus facilities" 
        background="gradient"
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-bluvill-800 mb-8">Tour Our Campus</h2>
          
          <Carousel className="mb-12">
            <CarouselContent>
              {campusImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center p-0">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-[400px] object-cover rounded-t-lg"
                        />
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold mb-2">{image.alt}</h3>
                          <p className="text-gray-600">{image.caption}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
          <div className="prose max-w-none">
            <h3 className="text-2xl font-semibold text-bluvill-700 mb-4">About Our Campus</h3>
            <p className="mb-4">
              Located in the heart of Abuja, Nigeria, Bluvill University's campus spans over 200 acres
              of beautifully landscaped grounds. Our modern facilities provide the perfect environment
              for academic excellence and personal growth.
            </p>
            <p className="mb-4">
              From our state-of-the-art laboratories to our comfortable student residences, every
              aspect of our campus is designed to enhance the educational experience. Our facilities
              include a modern library, multiple computer labs, sports complexes, medical center,
              and various student service centers.
            </p>
            <h3 className="text-2xl font-semibold text-bluvill-700 mb-4">Campus Facilities</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Modern lecture halls and classrooms</li>
              <li>Research laboratories and innovation centers</li>
              <li>Digital library with extensive online resources</li>
              <li>Student accommodation facilities</li>
              <li>Sports complexes and recreational areas</li>
              <li>Medical center and wellness facilities</li>
              <li>Cafeterias and dining halls</li>
              <li>Student union building</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusTour;
