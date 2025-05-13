
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Check, Save, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from '@/components/PageHeader';
import { toast } from '@/components/ui/use-toast';

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
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const navigate = useNavigate();

  // Form setup
  const undergraduateForm = useForm<UndergraduateFormValues>({
    resolver: zodResolver(undergraduateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: undefined,
      gender: undefined,
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
      gender: undefined,
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

  // Check for saved application and load it on component mount
  useEffect(() => {
    const loadSavedApplication = async () => {
      try {
        // Get the current user
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          // Not logged in, can't load saved application
          return;
        }
        
        // Try to get saved application from localStorage
        const savedApplicationKey = `application_${userId}_${applicationType}`;
        const savedApplication = localStorage.getItem(savedApplicationKey);
        
        if (savedApplication) {
          const parsedApplication = JSON.parse(savedApplication);
          
          if (parsedApplication.type === 'undergraduate') {
            undergraduateForm.reset(parsedApplication.data);
            setStep(parsedApplication.step || 1);
          } else if (parsedApplication.type === 'graduate') {
            graduateForm.reset(parsedApplication.data);
            setStep(parsedApplication.step || 1);
          }
          
          toast({
            title: "Application Loaded",
            description: "Your previously saved application has been loaded.",
          });
        }
      } catch (error) {
        console.error("Error loading saved application:", error);
      }
    };
    
    loadSavedApplication();
  }, [applicationType]);

  // Function to save application progress
  const handleSaveProgress = async () => {
    setIsSaving(true);
    try {
      // Get the current user
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      
      if (!userId) {
        toast({
          title: "Not logged in",
          description: "You need to be logged in to save your progress.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }

      // Get the form data based on application type
      const formData = applicationType === 'undergraduate' 
        ? undergraduateForm.getValues()
        : graduateForm.getValues();
      
      // Save to localStorage
      localStorage.setItem(`application_${userId}_${applicationType}`, JSON.stringify({
        type: applicationType,
        step: step,
        data: formData,
        lastSaved: new Date().toISOString()
      }));
      
      toast({
        title: "Progress Saved",
        description: "Your application progress has been saved successfully.",
      });
    } catch (error) {
      console.error("Error saving progress:", error);
      toast({
        title: "Save Failed",
        description: "There was an issue saving your progress.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  // Function to handle logout
  const handleLogout = async () => {
    try {
      // Ask user if they want to save progress before logging out
      const shouldSave = window.confirm("Would you like to save your progress before logging out?");
      
      if (shouldSave) {
        await handleSaveProgress();
      }
      
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "There was an issue logging you out. Please try again.",
        variant: "destructive",
      });
    }
  };

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
            <div className="flex justify-between items-center mb-4">
              <StepIndicator 
                currentStep={step}
                applicationType={applicationType} 
              />
              
              {/* Desktop Action Buttons */}
              <div className="hidden md:flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={handleSaveProgress}
                  disabled={isSaving}
                  className="flex items-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Progress'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
            
            {/* Mobile Action Buttons - Fixed at bottom */}
            <div className="md:hidden flex justify-between fixed bottom-0 left-0 right-0 bg-white p-3 border-t z-10 shadow-lg">
              <Button 
                variant="outline"
                onClick={handleSaveProgress}
                disabled={isSaving}
                className="flex items-center flex-1 mr-2"
                size="sm"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center flex-1"
                size="sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Button>
            </div>
            
            <Card className="mb-16 md:mb-0">
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
