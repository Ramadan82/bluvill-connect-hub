
import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  background?: 'light' | 'dark' | 'gradient';
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle,
  background = 'light'
}) => {
  let bgClasses = "bg-card";
  let textColorClass = "text-blue-800";
  let subtitleColorClass = "text-blue-600";
  
  if (background === 'dark') {
    bgClasses = "bg-blue-900";
    textColorClass = "text-white";
    subtitleColorClass = "text-blue-200";
  } else if (background === 'gradient') {
    bgClasses = "hero-gradient";
    textColorClass = "text-white";
    subtitleColorClass = "text-blue-200";
  }
  
  return (
    <div className={`py-16 ${bgClasses}`}>
      <div className="container mx-auto px-4 md:px-8">
        <h1 className={`text-4xl md:text-5xl font-bold ${textColorClass}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`mt-4 text-xl ${subtitleColorClass}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
