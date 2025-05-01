import { Check } from 'lucide-react';

type StepIndicatorProps = {
  currentStep: number;
  applicationType: 'undergraduate' | 'graduate';
};

export const StepIndicator = ({ 
  currentStep, 
  applicationType 
}: StepIndicatorProps) => {
  // Define steps for each application type
  const graduateSteps = [
    'Application Type',
    'Personal Info',
    'Academic Details',
    'Documents',
    'References',
    'Review & Submit'
  ];

  const undergraduateSteps = [
    'Application Type',
    'Personal Info',
    'Academic Details',
    'Documents',
    'Review & Submit'
  ];

  const steps = applicationType === 'graduate' ? graduateSteps : undergraduateSteps;
  const totalSteps = steps.length;

  return (
    <div className="relative mb-12">
      {/* Progress bar background */}
      <div className="absolute h-[2px] bg-gray-200 top-5 left-10 right-10 -z-10">
        {/* Progress bar fill */}
        <div 
          className="h-[2px] bg-green-600 transition-all duration-300" 
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
          }}
        ></div>
      </div>
      
      {/* Steps container */}
      <div className="flex justify-between">
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          
          return (
            <div 
              key={label} 
              className="flex flex-col items-center" 
              style={{ width: `${100 / totalSteps}%` }}
            >
              {/* Step circle */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center relative
                ${isCompleted 
                  ? 'bg-green-100 border-2 border-green-600' 
                  : isCurrent
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <span className="font-medium">{stepNumber}</span>
                )}
              </div>
              
              {/* Step label */}
              <p className={`
                mt-2 text-sm font-medium text-center
                ${isCompleted 
                  ? 'text-green-600' 
                  : isCurrent
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}
                style={{ maxWidth: '80px' }}
              >
                {label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};