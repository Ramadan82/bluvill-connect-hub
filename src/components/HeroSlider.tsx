
import React, { useEffect, useState } from 'react';

const images = [
  "/assets/images/image1.png",
  "/assets/images/image2.png",
  "/assets/images/image3.png",
  "https://images.unsplash.com/photo-1431576901776-e539bd916ba2?q=80&w=1200&auto=format&fit=crop",
];

interface HeroSliderProps {
  children: React.ReactNode;
  className?: string;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ children, className = "" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className={`relative py-16 md:py-24 ${className}`}>
      {images.map((src, index) => (
        <div 
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(10, 20, 50, 0.85), rgba(15, 30, 75, 0.9)), url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1
          }}
        />
      ))}
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-white">
        {children}
      </div>
    </section>
  );
};

export default HeroSlider;
