import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from '@/components/PageHeader';

import { 
  undergraduateFormSchema, 
  graduateFormSchema,
  UndergraduateFormValues,
  GraduateFormValues
} from "./schemas";
import { SuccessMessage } from "./components/SuccessMessage";
import { StepIndicator } from "./components/StepIndicator";
import { ApplicationTypeStep } from "./components/ApplicationTypeStep";
import { UndergraduatePersonalInfoForm } from "./components/UndergraduatePersonalInfoForm";
import { GraduatePersonalInfoForm } from "./components/GraduatePersonalInfoForm";
import { UndergraduateAcademicInfoForm } from "./components/UndergraduateAcademicInfoForm";
import { GraduateAcademicInfoForm } from "./components/GraduateAcademicInfoForm";
import { DocumentsUploadForm } from "./components/DocumentsUploadForm";
import { ReferencesForm } from "./components/ReferencesForm";
import { UndergraduateReviewForm } from "./components/UndergraduateReviewForm";
import { GraduateReviewForm } from "./components/GraduateReviewForm";

const steps = [
  "Application Type",
  "Personal Info",
  "Academic Details",
  "Documents",
  "References",
  "Review & Submit"
];

const Apply = () => {
  const [applicationType, setApplicationType] = useState<'undergraduate' | 'graduate'>('undergraduate');
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const undergraduateForm = useForm<UndergraduateFormValues>({
  resolver: zodResolver(undergraduateFormSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: undefined,
    gender: undefined, // Changed from "" to undefined
    address: "",
    stateOfOrigin: "",
    lga: "",
    program: "",
    jambRegNo: "",
    jambScore: "",
    secondarySchool: "",
    graduationYear: "",
    oLevelResults: "",
    sponsorName: "",
    sponsorPhone: "",
    documents: []
  },
});

const graduateForm = useForm<GraduateFormValues>({
  resolver: zodResolver(graduateFormSchema),
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: undefined,
    gender: undefined, // Changed from "" to undefined
    address: "",
    stateOfOrigin: "",
    lga: "",
    degreeType: "master",
    program: "",
    universityAttended: "",
    graduationYear: "",
    degreeClass: "",
    researchInterest: "",
    workExperience: "",
    documents: [],
    references: [
      { name: "", email: "", relationship: "" },
      { name: "", email: "", relationship: "" }
    ]
  },
});

  const onSubmitUndergraduate = async (data: UndergraduateFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Undergraduate Application Submitted:", data);
      // Here you would typically make an API call
      // await submitUndergraduateApplication(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitGraduate = async (data: GraduateFormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Graduate Application Submitted:", data);
      // Here you would typically make an API call
      // await submitGraduateApplication(data);
      setIsSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/admissions');
    }
  };

  const getCurrentStepTitle = () => {
    if (applicationType === 'undergraduate' && step === 5) {
      return steps[5]; // Skip references for undergrad
    }
    return steps[step - 1];
  };

  if (isSuccess) {
    return (
      <div>
        <PageHeader
          title="Application Submitted"
          subtitle="Thank you for applying to Bluvill University"
          background="gradient"
        />
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <SuccessMessage />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Apply Now"
        subtitle="Start your journey to becoming a Bluvill University student"
        background="gradient"
      />
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <StepIndicator 
              currentStep={step}
              applicationType={applicationType} 
             />
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {applicationType === 'undergraduate' ? 'Undergraduate' : 'Graduate'} Application
                </CardTitle>
                <CardDescription>
                  Step {step} of {applicationType === 'undergraduate' ? 5 : 6}: {getCurrentStepTitle()}
                </CardDescription>
              </CardHeader>
              <CardContent>

                {/* Step 1 - Application Type */}
{step === 1 && (
  <ApplicationTypeStep 
    applicationType={applicationType}
    setApplicationType={setApplicationType}
    onContinue={() => setStep(2)}
  />
)}

{/* Step 2 - Personal Info */}
{step === 2 && (
  <div>
    {applicationType === 'undergraduate' ? (
      <FormProvider {...undergraduateForm}>
        <UndergraduatePersonalInfoForm 
          onBack={handleBack}
          onContinue={() => setStep(3)}
        />
      </FormProvider>
    ) : (
      <FormProvider {...graduateForm}>
        <GraduatePersonalInfoForm 
          onBack={handleBack}
          onContinue={() => setStep(3)}
        />
      </FormProvider>
    )}
  </div>
)}

{/* Step 3 - Academic Details */}
{step === 3 && (
  <div>
    {applicationType === 'undergraduate' ? (
      <FormProvider {...undergraduateForm}>
        <UndergraduateAcademicInfoForm 
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      </FormProvider>
    ) : (
      <FormProvider {...graduateForm}>
        <GraduateAcademicInfoForm 
          onBack={() => setStep(2)}
          onContinue={() => setStep(4)}
        />
      </FormProvider>
    )}
  </div>
)}

{/* Step 4 - Documents */}
{step === 4 && (
  <div>
    {applicationType === 'undergraduate' ? (
      <FormProvider {...undergraduateForm}>
        <DocumentsUploadForm />
      </FormProvider>
    ) : (
      <FormProvider {...graduateForm}>
        <DocumentsUploadForm />
      </FormProvider>
    )}
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setStep(3)}
      >
        Back
      </Button>
      <Button 
        type="button"
        onClick={() => setStep(applicationType === 'graduate' ? 5 : 5)} // Both go to 5, but graduate's 5 is references
        className="bg-blue-700 hover:bg-blue-800"
      >
        Continue
      </Button>
    </div>
  </div>
)}

{/* Step 5 - References (Graduate only) OR Review (Undergraduate) */}
{step === 5 && (
  <div>
    {applicationType === 'graduate' ? (
      <FormProvider {...graduateForm}>
        <ReferencesForm />
      </FormProvider>
    ) : (
      <FormProvider {...undergraduateForm}>
        <UndergraduateReviewForm 
          onBack={() => setStep(4)}
          onSubmit={onSubmitUndergraduate}
          isSubmitting={isSubmitting}
        />
      </FormProvider>
    )}
    <div className="flex justify-between pt-4">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => setStep(4)}
      >
        Back
      </Button>
      {applicationType === 'graduate' ? (
        <Button 
          type="button"
          onClick={() => setStep(6)}
          className="bg-blue-700 hover:bg-blue-800"
        >
          Continue
        </Button>
      ) : null}
    </div>
  </div>
)}

{/* Step 6 - Review (Graduate only) */}
{applicationType === 'graduate' && step === 6 && (
  <div>
    <FormProvider {...graduateForm}>
      <GraduateReviewForm 
        onBack={() => setStep(5)}
        onSubmit={onSubmitGraduate}
        isSubmitting={isSubmitting}
        applicationType={applicationType}
      />
    </FormProvider>
  </div>
)}

              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apply;