import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Check } from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import PageHeader from '@/components/PageHeader';

// Form schemas for validation
const undergraduateFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  gender: z.enum(["male", "female", "other"], { required_error: "You need to select a gender." }),
  program: z.string({ required_error: "Please select a program." }),
  jambRegNo: z.string().min(10, { message: "JAMB registration number must be at least 10 characters." }),
  jambScore: z.string().min(2, { message: "Please enter your JAMB score." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  stateOfOrigin: z.string().min(2, { message: "Please enter your state of origin." }),
  lga: z.string().min(2, { message: "Please enter your LGA." }),
  secondarySchool: z.string().min(5, { message: "Please enter your secondary school name." }),
  graduationYear: z.string().min(4, { message: "Please enter your graduation year." }),
  oLevelResults: z.string().min(5, { message: "Please describe your O'Level results." }),
  sponsorName: z.string().min(2, { message: "Sponsor name must be at least 2 characters." }),
  sponsorPhone: z.string().min(10, { message: "Sponsor phone must be at least 10 digits." }),
});

const graduateFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  dob: z.date({ required_error: "A date of birth is required." }),
  gender: z.enum(["male", "female", "other"], { required_error: "You need to select a gender." }),
  program: z.string({ required_error: "Please select a program." }),
  degreeType: z.enum(["master", "phd"], { required_error: "Please select degree type." }),
  address: z.string().min(10, { message: "Address must be at least 10 characters." }),
  stateOfOrigin: z.string().min(2, { message: "Please enter your state of origin." }),
  lga: z.string().min(2, { message: "Please enter your LGA." }),
  universityAttended: z.string().min(5, { message: "Please enter your university name." }),
  graduationYear: z.string().min(4, { message: "Please enter your graduation year." }),
  degreeClass: z.string().min(2, { message: "Please enter your degree class." }),
  researchInterest: z.string().min(10, { message: "Please describe your research interests." }),
  workExperience: z.string().min(10, { message: "Please describe your work experience." }),
});

type UndergraduateFormValues = z.infer<typeof undergraduateFormSchema>;
type GraduateFormValues = z.infer<typeof graduateFormSchema>;

const undergraduatePrograms = [
  "Accounting", "Business Administration", "Computer Science", 
  "Economics", "Electrical Engineering", "Law",
  "Mass Communication", "Medicine and Surgery", "Microbiology", 
  "Political Science"
];

const graduatePrograms = [
  "MBA (Master of Business Administration)",
  "M.Sc. Computer Science",
  "M.Sc. Economics",
  "M.Sc. Microbiology",
  "Ph.D. Computer Science",
  "Ph.D. Economics",
  "Ph.D. Political Science"
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
      program: "",
      jambRegNo: "",
      jambScore: "",
      address: "",
      stateOfOrigin: "",
      lga: "",
      secondarySchool: "",
      graduationYear: "",
      oLevelResults: "",
      sponsorName: "",
      sponsorPhone: "",
    },
  });

  const graduateForm = useForm<GraduateFormValues>({
    resolver: zodResolver(graduateFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      program: "",
      degreeType: "master",
      address: "",
      stateOfOrigin: "",
      lga: "",
      universityAttended: "",
      graduationYear: "",
      degreeClass: "",
      researchInterest: "",
      workExperience: "",
    },
  });

  const onSubmitUndergraduate = (data: UndergraduateFormValues) => {
    setIsSubmitting(true);
    console.log("Undergraduate Application Submitted:", data);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };
const handleContinue = () => {
  
      setStep(3);
    
};
const handleContinue2 = () => {
  
      setStep(4);
    
};
const handleApplication1 = () => {
    setIsSuccess(true)
}


  const onSubmitGraduate = (data: GraduateFormValues) => {
    setIsSubmitting(true);
    console.log("Graduate Application Submitted:", data);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/admissions');
    }
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
            <div className="max-w-3xl mx-auto text-center">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8">
                <strong className="font-bold">Success! </strong>
                <span className="block sm:inline">
                  Your application has been submitted successfully. You will receive a confirmation email shortly.
                </span>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="text-left space-y-4">
                  <p className="text-gray-700">
                    <strong>1. Application Review:</strong> Our admissions team will review your application within 7-10 working days.
                  </p>
                  <p className="text-gray-700">
                    <strong>2. Admission Decision:</strong> You will receive an email notification once a decision has been made.
                  </p>
                  <p className="text-gray-700">
                    <strong>3. Payment of Fees:</strong> If accepted, you'll receive instructions for paying your acceptance fee.
                  </p>
                  <p className="text-gray-700">
                    <strong>4. Registration:</strong> Complete your registration process before the semester begins.
                  </p>
                  <div className="pt-4">
                    <Button 
                      onClick={() => navigate('/')} 
                      className="bg-blue-700 hover:bg-blue-800 mr-4"
                    >
                      Return to Home
                    </Button>
                    <Button 
                      onClick={() => navigate('/admissions')} 
                      variant="outline"
                    >
                      View Admission Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
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
            {/* Enhanced Step Indicator */}
            <div className="relative mb-12">
              <div className="absolute h-[2px] bg-gray-200 top-5 left-10 right-10 -z-10">
                <div 
                  className="h-[2px] bg-green-600 transition-all duration-300" 
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center relative
                      ${step > stepNumber 
                        ? 'bg-green-100 border-2 border-green-600' 
                        : step === stepNumber 
                          ? 'bg-bluvill-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step > stepNumber ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <span className="font-medium">{stepNumber}</span>
                      )}
                    </div>
                    <p className={`
                      mt-2 text-sm font-medium
                      ${step > stepNumber 
                        ? 'text-green-600' 
                        : step === stepNumber 
                          ? 'text-bluvill-600' 
                          : 'text-gray-500'
                      }`}
                    >
                      {stepNumber === 1 && 'Application Type'}
                      {stepNumber === 2 && 'Personal Info'}
                      {stepNumber === 3 && 'Academic Details'}
                      {stepNumber === 4 && 'Review & Submit'}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {applicationType === 'undergraduate' ? 'Undergraduate' : 'Graduate'} Application
                </CardTitle>
                <CardDescription>
                  Step {step} of 4
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold">Select Application Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div 
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${applicationType === 'undergraduate' ? 'border-bluvill-600 bg-bluvill-50' : 'border-gray-300 hover:border-bluvill-400'}`}
                        onClick={() => setApplicationType('undergraduate')}
                      >
                        <h4 className="font-semibold text-lg mb-2">Undergraduate Programs</h4>
                        <p className="text-gray-600">
                          For students seeking bachelor's degrees (B.Sc., B.A., etc.)
                        </p>
                      </div>
                      <div 
                        className={`border rounded-lg p-6 cursor-pointer transition-all ${applicationType === 'graduate' ? 'border-bluvill-600 bg-bluvill-50' : 'border-gray-300 hover:border-bluvill-400'}`}
                        onClick={() => setApplicationType('graduate')}
                      >
                        <h4 className="font-semibold text-lg mb-2">Graduate Programs</h4>
                        <p className="text-gray-600">
                          For students seeking master's or doctoral degrees (M.Sc., MBA, Ph.D.)
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={() => setStep(2)}
                        className="bg-blue-700 hover:bg-blue-800"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    {applicationType === 'undergraduate' ? (
                      <Form {...undergraduateForm}>
                        <form 
                        //   onSubmit={undergraduateForm.handleSubmit(() => {
                        //      {
                        //       setStep(3);
                        //     }
                        //   })} 
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={undergraduateForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* ... other form fields ... */} 
                            <FormField
                              control={undergraduateForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="dob"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date of Birth</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Gender</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Male
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Female
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="other" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Other
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Residential Address</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Enter your full address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="stateOfOrigin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State of Origin</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your state of origin" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="lga"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Local Government Area (LGA)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your LGA" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-between pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button 
                              type="button"
                              onClick={handleContinue}
                              className="bg-blue-700 hover:bg-blue-800"
                            >
                              Continue
                            </Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <Form {...graduateForm}>
                        <form 
                          // onSubmit={graduateForm.handleSubmit(() => {
                          //    {
                          //     setStep(3);
                          //   }
                          // })} 
                          className="space-y-6"
                        >
                          <h3 className="text-lg font-semibold">Personal Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={graduateForm.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* ... other form fields ... */}
                             <FormField
                              control={graduateForm.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input type="email" placeholder="Enter your email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="dob"
                              render={({ field }) => (
                                <FormItem className="flex flex-col">
                                  <FormLabel>Date of Birth</FormLabel>
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <FormControl>
                                        <Button
                                          variant={"outline"}
                                          className={cn(
                                            "w-full pl-3 text-left font-normal",
                                            !field.value && "text-muted-foreground"
                                          )}
                                        >
                                          {field.value ? (
                                            format(field.value, "PPP")
                                          ) : (
                                            <span>Pick a date</span>
                                          )}
                                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                      </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                          date > new Date() || date < new Date("1900-01-01")
                                        }
                                        initialFocus
                                      />
                                    </PopoverContent>
                                  </Popover>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="gender"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Gender</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex flex-col space-y-1"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Male
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Female
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="other" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Other
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Residential Address</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder="Enter your full address" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="stateOfOrigin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>State of Origin</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your state of origin" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="lga"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Local Government Area (LGA)</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your LGA" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                                
                          </div>
                          <div className="flex justify-between pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={handleBack}
                            >
                              Back
                            </Button>
                            <Button 
                              type="button"
                              onClick={handleContinue}
                              className="bg-blue-700 hover:bg-blue-800"
                            >
                              Continue
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                )}

                {/* Steps 3 and 4 remain the same as before */}
                {step === 3 && (
                  <div>
                    {/* ... Academic Details form ... */}
                      {applicationType === 'undergraduate' ? (
                      <Form {...undergraduateForm}>
                        <form onSubmit={undergraduateForm.handleSubmit(() => setStep(4))} className="space-y-6">
                          <h3 className="text-lg font-semibold">Academic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={undergraduateForm.control}
                              name="program"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Program of Study</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your program" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {undergraduatePrograms.map((program) => (
                                        <SelectItem key={program} value={program}>
                                          {program}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="jambRegNo"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>JAMB Registration Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your JAMB registration number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="jambScore"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>JAMB Score</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Enter your JAMB score" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="secondarySchool"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Secondary School Attended</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your secondary school name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="graduationYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Graduation</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Enter your graduation year" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="oLevelResults"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>O'Level Results</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="List your O'Level results (e.g., English - A1, Mathematics - B2, etc.)" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="sponsorName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sponsor's Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your sponsor's name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={undergraduateForm.control}
                              name="sponsorPhone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sponsor's Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your sponsor's phone number" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-between pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setStep(2)}
                            >
                              Back
                            </Button>
                            <Button 
                              type="button"
                              className="bg-blue-700 hover:bg-blue-800"
                              onClick={handleContinue2}
                            >
                              Continue
                            </Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <Form {...graduateForm}>
                        <form onSubmit={graduateForm.handleSubmit(() => setStep(4))} className="space-y-6">
                          <h3 className="text-lg font-semibold">Academic Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={graduateForm.control}
                              name="program"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Program of Study</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select your program" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {graduatePrograms.map((program) => (
                                        <SelectItem key={program} value={program}>
                                          {program}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="degreeType"
                              render={({ field }) => (
                                <FormItem className="space-y-3">
                                  <FormLabel>Degree Type</FormLabel>
                                  <FormControl>
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="flex space-x-4"
                                    >
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="master" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Master's
                                        </FormLabel>
                                      </FormItem>
                                      <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <RadioGroupItem value="phd" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                          Ph.D.
                                        </FormLabel>
                                      </FormItem>
                                    </RadioGroup>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="universityAttended"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>University Attended</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your university name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="graduationYear"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Year of Graduation</FormLabel>
                                  <FormControl>
                                    <Input type="number" placeholder="Enter your graduation year" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="degreeClass"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Degree Class</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Enter your degree class (e.g., First Class, 2:1, etc.)" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="researchInterest"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Research Interests</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe your research interests and goals for graduate study" 
                                      {...field} 
                                      rows={4}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={graduateForm.control}
                              name="workExperience"
                              render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                  <FormLabel>Work Experience</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Describe your relevant work experience (if any)" 
                                      {...field} 
                                      rows={4}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex justify-between pt-4">
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setStep(2)}
                            >
                              Back
                            </Button>
                            <Button 
                              type="button"
                              onClick={handleContinue2}
                              className="bg-blue-700 hover:bg-blue-800"
                            >
                              Continue
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    {/* ... Review & Submit form ... */}
                     {applicationType === 'undergraduate' ? (
                      <Form {...undergraduateForm}>
                        <form onSubmit={undergraduateForm.handleSubmit(onSubmitUndergraduate)} className="space-y-6">
                          <h3 className="text-lg font-semibold">Review Your Application</h3>
                          <p className="text-gray-600">
                            Please review all the information you've provided before submitting your application.
                          </p>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-500">Full Name</p>
                                <p>{`${undergraduateForm.watch('firstName')} ${undergraduateForm.watch('lastName')}`}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Email</p>
                                <p>{undergraduateForm.watch('email')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Phone</p>
                                <p>{undergraduateForm.watch('phone')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Date of Birth</p>
                                <p>{undergraduateForm.watch('dob') ? format(undergraduateForm.watch('dob') as Date, "PPP") : 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Gender</p>
                                <p>{undergraduateForm.watch('gender')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Address</p>
                                <p>{undergraduateForm.watch('address')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">State of Origin</p>
                                <p>{undergraduateForm.watch('stateOfOrigin')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">LGA</p>
                                <p>{undergraduateForm.watch('lga')}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Academic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-500">Program</p>
                                <p>{undergraduateForm.watch('program') || 'Not selected'}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">JAMB Reg No</p>
                                <p>{undergraduateForm.watch('jambRegNo')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">JAMB Score</p>
                                <p>{undergraduateForm.watch('jambScore')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Secondary School</p>
                                <p>{undergraduateForm.watch('secondarySchool')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Graduation Year</p>
                                <p>{undergraduateForm.watch('graduationYear')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">O'Level Results</p>
                                <p className="whitespace-pre-line">{undergraduateForm.watch('oLevelResults')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Sponsor's Name</p>
                                <p>{undergraduateForm.watch('sponsorName')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Sponsor's Phone</p>
                                <p>{undergraduateForm.watch('sponsorPhone')}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="agreeTerms" required className="mt-1" />
                            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                              I certify that all information provided in this application is accurate and complete. 
                              I understand that providing false information may result in the rejection of my 
                              application or revocation of admission.
                            </label>
                          </div>

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
                              onClick={handleApplication1}
                              className="bg-blue-700 hover:bg-blue-800"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <Form {...graduateForm}>
                        <form onSubmit={graduateForm.handleSubmit(onSubmitGraduate)} className="space-y-6">
                          <h3 className="text-lg font-semibold">Review Your Application</h3>
                          <p className="text-gray-600">
                            Please review all the information you've provided before submitting your application.
                          </p>
                          
                          <Card>
                            <CardHeader>
                              <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-500">Full Name</p>
                                <p>{`${graduateForm.watch('firstName')} ${graduateForm.watch('lastName')}`}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Email</p>
                                <p>{graduateForm.watch('email')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Phone</p>
                                <p>{graduateForm.watch('phone')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Date of Birth</p>
                                <p>{graduateForm.watch('dob') ? format(graduateForm.watch('dob') as Date, "PPP") : 'Not provided'}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Gender</p>
                                <p>{graduateForm.watch('gender')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Address</p>
                                <p>{graduateForm.watch('address')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">State of Origin</p>
                                <p>{graduateForm.watch('stateOfOrigin')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">LGA</p>
                                <p>{graduateForm.watch('lga')}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle>Academic Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium text-gray-500">Program</p>
                                <p>{graduateForm.watch('program') || 'Not selected'}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Degree Type</p>
                                <p>{graduateForm.watch('degreeType') === 'master' ? "Master's" : "Ph.D."}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">University Attended</p>
                                <p>{graduateForm.watch('universityAttended')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Graduation Year</p>
                                <p>{graduateForm.watch('graduationYear')}</p>
                              </div>
                              <div>
                                <p className="font-medium text-gray-500">Degree Class</p>
                                <p>{graduateForm.watch('degreeClass')}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="font-medium text-gray-500">Research Interests</p>
                                <p className="whitespace-pre-line">{graduateForm.watch('researchInterest')}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="font-medium text-gray-500">Work Experience</p>
                                <p className="whitespace-pre-line">{graduateForm.watch('workExperience')}</p>
                              </div>
                            </CardContent>
                          </Card>

                          <div className="flex items-start space-x-2">
                            <input type="checkbox" id="agreeTerms" required className="mt-1" />
                            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                              I certify that all information provided in this application is accurate and complete. 
                              I understand that providing false information may result in the rejection of my 
                              application or revocation of admission.
                            </label>
                          </div>

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
                              onClick={handleApplication1}
                              className="bg-blue-700 hover:bg-blue-800"
                              disabled={isSubmitting}
                            >
                              {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </Button>
                          </div>
                        </form>
                      </Form>
                    )}
                    
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