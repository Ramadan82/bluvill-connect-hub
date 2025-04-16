
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, FileText, GraduationCap, Info, Mail, Phone, CheckCircle } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const admissionProcess = [
  {
    title: 'Research Programs',
    description: 'Explore our undergraduate and graduate programs to find the right fit for your interests and career goals.',
    icon: <GraduationCap className="h-8 w-8 text-bluvill-600" />
  },
  {
    title: 'Check Requirements',
    description: 'Review the admission requirements for your chosen program to ensure you meet the eligibility criteria.',
    icon: <CheckCircle className="h-8 w-8 text-bluvill-600" />
  },
  {
    title: 'Complete Application',
    description: 'Fill out the online application form and submit all required documents by the application deadline.',
    icon: <FileText className="h-8 w-8 text-bluvill-600" />
  },
  {
    title: 'Application Review',
    description: 'Our admissions committee will review your application and supporting documents.',
    icon: <Clock className="h-8 w-8 text-bluvill-600" />
  },
  {
    title: 'Receive Decision',
    description: 'You will be notified of the admission decision via email. If accepted, you will receive an offer letter.',
    icon: <Mail className="h-8 w-8 text-bluvill-600" />
  }
];

const faqs = [
  {
    question: 'What are the application deadlines?',
    answer: 'For the September intake, applications close on June 30. For the January intake (available for some programs), applications close on November 30. We recommend applying early as some programs fill up quickly.'
  },
  {
    question: 'Can international students apply?',
    answer: 'Yes, Bluvill University welcomes applications from international students. International applicants must meet the same academic requirements and provide proof of English language proficiency (TOEFL, IELTS, etc.).'
  },
  {
    question: 'Are scholarships available?',
    answer: 'Yes, Bluvill University offers merit-based scholarships, need-based financial aid, and specific scholarships for outstanding achievements in academics, sports, and community service. Separate applications are required for most scholarships.'
  },
  {
    question: 'What documents are required for application?',
    answer: 'Required documents include academic transcripts, JAMB results (for undergraduate applicants), personal statement, letters of recommendation, CV/resume (for graduate applicants), and a copy of your ID or passport.'
  },
  {
    question: 'Is there an application fee?',
    answer: 'Yes, there is a non-refundable application fee of ₦10,000 for Nigerian applicants and $50 for international applicants. This fee must be paid at the time of application submission.'
  },
  {
    question: 'How can I check my application status?',
    answer: 'After submitting your application, you will receive login credentials for our application portal. You can check your application status by logging into the portal at any time.'
  }
];

const Admissions = () => {
  return (
    <div>
      <PageHeader
        title="Admissions"
        subtitle="Your journey to becoming a Bluvill University student starts here"
        background="gradient"
      />

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-heading">Start Your Application</h2>
            <p className="text-gray-700 mb-8">
              Bluvill University offers a streamlined application process for both undergraduate and graduate programs. 
              Choose your application type below to get started.
            </p>
            
            <Tabs defaultValue="undergraduate" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="undergraduate">Undergraduate</TabsTrigger>
                <TabsTrigger value="graduate">Graduate</TabsTrigger>
              </TabsList>
              <TabsContent value="undergraduate" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Undergraduate Admissions</CardTitle>
                    <CardDescription>
                      For prospective students seeking bachelor's degrees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Our undergraduate programs provide a solid foundation for your future career. 
                      Applications for the upcoming academic year are now open.
                    </p>
                    <div className="flex justify-center">
                      <Button size="lg" className="bg-bluvill-700 hover:bg-bluvill-800">
                        Apply for Undergraduate Programs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="graduate" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Graduate Admissions</CardTitle>
                    <CardDescription>
                      For prospective students seeking master's or doctoral degrees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      Our graduate programs will help you advance your career or pursue academic excellence. 
                      Applications for the upcoming academic year are now open.
                    </p>
                    <div className="flex justify-center">
                      <Button size="lg" className="bg-bluvill-700 hover:bg-bluvill-800">
                        Apply for Graduate Programs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="bg-gray-50 py-16" id="process">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Admission Process</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our admission process is designed to be clear and straightforward. Follow these steps to apply to Bluvill University.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {admissionProcess.map((step, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto bg-bluvill-50 p-4 rounded-full">{step.icon}</div>
                  <CardTitle className="text-bluvill-800 mt-4">Step {index + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/programs">
              <Button variant="outline" className="mr-4">View Programs</Button>
            </Link>
            <Button className="bg-bluvill-700 hover:bg-bluvill-800">Begin Application</Button>
          </div>
        </div>
      </section>

      {/* Entry Requirements */}
      <section className="py-16" id="requirements">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Entry Requirements</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Review the general admission requirements for our programs. Specific programs may have additional requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2 text-bluvill-600" />
                  <CardTitle>Undergraduate Requirements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">1</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Academic Qualifications:</strong> Five O'level credits including English Language and Mathematics in WASSCE, NECO, or equivalent in relevant subjects.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">2</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>JAMB Score:</strong> Minimum JAMB UTME score of 180 (requirements vary by program).
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">3</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Post-UTME Screening:</strong> Successful performance in the Bluvill University post-UTME screening exercise.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">4</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Direct Entry:</strong> NCE, OND, HND, or A'Level with minimum of Merit or equivalent for applicants seeking direct entry admission.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <GraduationCap className="h-6 w-6 mr-2 text-bluvill-600" />
                  <CardTitle>Graduate Requirements</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">1</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Academic Qualifications:</strong> Bachelor's degree with a minimum of Second Class Lower (2.2) from a recognized university in a relevant field.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">2</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>References:</strong> Two academic references from your previous institution.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">3</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Statement of Purpose:</strong> A well-written statement of purpose outlining your academic and research interests.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-bluvill-100 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                      <span className="font-semibold text-bluvill-700">4</span>
                    </div>
                    <span className="text-gray-700">
                      <strong>Additional Requirements:</strong> Specific programs may require work experience, entrance examinations, or interviews.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Find answers to common questions about admissions at Bluvill University.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-4">
                  Need More Information?
                </h2>
                <p className="text-gray-700">
                  Our Admissions Office is here to help you with any questions you may have about applying to Bluvill University.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <Mail className="h-10 w-10 text-bluvill-600 mx-auto" />
                    <CardTitle className="mt-4">Email Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      <a href="mailto:admissions@bluvilluniversity.edu.ng" className="text-bluvill-600 hover:underline">
                        admissions@bluvilluniversity.edu.ng
                      </a>
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <Phone className="h-10 w-10 text-bluvill-600 mx-auto" />
                    <CardTitle className="mt-4">Call Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      <a href="tel:+2348001234567" className="text-bluvill-600 hover:underline">
                        +234 800 123 4567
                      </a>
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="text-center">
                    <Info className="h-10 w-10 text-bluvill-600 mx-auto" />
                    <CardTitle className="mt-4">Visit Us</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700">
                      Admissions Office, Bluvill Campus,<br />
                      Abuja, Nigeria
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;
