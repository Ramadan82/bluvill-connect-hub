
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar, Clock, DollarSign, GraduationCap, BookOpen, Award, Check, ArrowLeft } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const programData = {
  'medical-sciences': {
    title: 'Medical Sciences',
    description: 'The Medical Sciences program at Bluvill University offers comprehensive education in both basic and clinical medical sciences, preparing students for careers in healthcare, research, and related fields.',
    imageUrl: '/assets/images/medical science1.png',
    duration: '5-6 years',
    level: 'Undergraduate & Graduate',
    tuition: '₦2,500,000 - ₦3,500,000 per academic year',
    accreditation: 'Nigerian Medical Association (NMA)',
    startDates: 'September and January',
    overview: 'Our Medical Sciences program provides rigorous training in the fundamentals of medical science, including anatomy, physiology, biochemistry, pharmacology, and clinical practice. Students benefit from state-of-the-art facilities, experienced faculty, and clinical rotations at partner hospitals.',
    outcomes: [
      'Medical Doctor (upon completion of clinical rotations)',
      'Medical Researcher',
      'Healthcare Administrator',
      'Public Health Specialist',
      'Biomedical Scientist'
    ],
    curriculum: [
      { year: 'Year 1', courses: ['Introduction to Medical Sciences', 'General Biology', 'Chemistry for Medical Sciences', 'Physics for Medical Sciences', 'Medical Ethics'] },
      { year: 'Year 2', courses: ['Human Anatomy I', 'Physiology I', 'Medical Biochemistry', 'Histology', 'Medical Statistics'] },
      { year: 'Year 3', courses: ['Human Anatomy II', 'Physiology II', 'Pathology', 'Pharmacology I', 'Medical Microbiology'] },
      { year: 'Year 4', courses: ['Clinical Rotations I', 'Internal Medicine', 'Surgery', 'Pharmacology II', 'Diagnostic Methods'] },
      { year: 'Year 5', courses: ['Clinical Rotations II', 'Obstetrics & Gynecology', 'Pediatrics', 'Psychiatry', 'Community Medicine'] },
      { year: 'Year 6', courses: ['Clinical Rotations III', 'Emergency Medicine', 'Family Medicine', 'Medical Jurisprudence', 'Research Project'] }
    ]
  },
  'law': {
    title: 'Law',
    description: 'Bluvill University\'s Law program provides a comprehensive legal education with a focus on both Nigerian and international law, equipping students with the knowledge and skills needed for successful legal careers.',
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1200&auto=format&fit=crop',
    duration: '5 years',
    level: 'Undergraduate & Graduate',
    tuition: '₦2,000,000 - ₦2,800,000 per academic year',
    accreditation: 'Council of Legal Education, Nigeria',
    startDates: 'September',
    overview: 'Our Law program combines rigorous academic study with practical legal skills training. Students gain deep knowledge of legal principles, critical thinking abilities, and ethical considerations essential for legal practice. The program covers Nigerian law, international law, and specialized legal areas.',
    outcomes: [
      'Barrister and Solicitor (after Bar qualification)',
      'Legal Consultant',
      'Corporate Counsel',
      'Government Legal Advisor',
      'Academic/Legal Researcher'
    ],
    curriculum: [
      { year: 'Year 1', courses: ['Introduction to Nigerian Legal System', 'Constitutional Law', 'Legal Methods', 'Law of Contract', 'Criminal Law I'] },
      { year: 'Year 2', courses: ['Criminal Law II', 'Law of Tort', 'Commercial Law', 'Administrative Law', 'Family Law'] },
      { year: 'Year 3', courses: ['Law of Evidence', 'Land Law', 'Equity and Trusts', 'Company Law', 'Jurisprudence'] },
      { year: 'Year 4', courses: ['International Law', 'Intellectual Property Law', 'Labor Law', 'Environmental Law', 'Legal Practice'] },
      { year: 'Year 5', courses: ['Legal Drafting', 'Alternative Dispute Resolution', 'Human Rights Law', 'Law of Taxation', 'Research Project'] }
    ]
  },
  'information-technology': {
    title: 'Information Technology',
    description: 'The Information Technology program at Bluvill University offers cutting-edge education in various IT disciplines, preparing students for careers in the rapidly evolving digital landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    tuition: '₦1,800,000 - ₦2,500,000 per academic year',
    accreditation: 'Nigeria Computer Society (NCS)',
    startDates: 'September and January',
    overview: 'Our Information Technology program provides comprehensive training in computer science, programming, networking, data management, and cybersecurity. Students learn both theoretical concepts and practical applications, with hands-on experience in our modern computer laboratories.',
    outcomes: [
      'Software Developer',
      'Systems Analyst',
      'Network Administrator',
      'Database Administrator',
      'Cybersecurity Specialist',
      'IT Project Manager'
    ],
    curriculum: [
      { year: 'Year 1', courses: ['Introduction to Computer Science', 'Programming Fundamentals', 'Mathematics for Computing', 'Digital Logic', 'Introduction to Information Systems'] },
      { year: 'Year 2', courses: ['Data Structures and Algorithms', 'Object-Oriented Programming', 'Database Systems', 'Computer Networks', 'Web Development'] },
      { year: 'Year 3', courses: ['Operating Systems', 'Software Engineering', 'Mobile Application Development', 'Cloud Computing', 'Artificial Intelligence'] },
      { year: 'Year 4', courses: ['Cybersecurity', 'Data Science and Analytics', 'IoT and Embedded Systems', 'IT Project Management', 'Final Year Project'] }
    ]
  },
  'management': {
    title: 'Management',
    description: 'The Management program at Bluvill University provides comprehensive education in business administration and management principles, preparing students for leadership roles in various industries.',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    duration: '4 years',
    level: 'Undergraduate & Graduate',
    tuition: '₦1,800,000 - ₦2,500,000 per academic year',
    accreditation: 'Nigeria Institute of Management (NIM)',
    startDates: 'September and January',
    overview: 'Our Management program offers a comprehensive education in business administration, strategic planning, marketing, finance, and human resources management. Students develop leadership skills, business acumen, and practical management abilities through coursework, case studies, and internships.',
    outcomes: [
      'Business Manager',
      'Marketing Executive',
      'Human Resources Manager',
      'Financial Analyst',
      'Management Consultant',
      'Entrepreneur'
    ],
    curriculum: [
      { year: 'Year 1', courses: ['Principles of Management', 'Business Mathematics', 'Introduction to Economics', 'Business Communication', 'Organizational Behavior'] },
      { year: 'Year 2', courses: ['Marketing Management', 'Financial Accounting', 'Business Law', 'Entrepreneurship', 'Statistics for Business'] },
      { year: 'Year 3', courses: ['Human Resources Management', 'Operations Management', 'Strategic Management', 'International Business', 'Business Ethics'] },
      { year: 'Year 4', courses: ['Corporate Finance', 'Project Management', 'Leadership Development', 'Business Analysis', 'Research Project'] }
    ]
  },
};

// Add more programs by copying from the data above

const ProgramDetail = () => {
  const { id } = useParams<{ id: string }>();
  const program = programData[id as keyof typeof programData];

  if (!program) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Program Not Found</h2>
        <p className="mb-6">The program you're looking for does not exist.</p>
        <Link to="/programs">
          <Button>View All Programs</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={program.title}
        subtitle={program.description}
        background="gradient"
      />

      <div className="container mx-auto px-4 md:px-8 py-16 ">
        <div className="mb-6">
          <Link to="/programs" className="inline-flex items-center text-bluvill-600 hover:text-bluvill-800">
            <ArrowLeft size={16} className="mr-2" /> Back to Programs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <img 
                src={program.imageUrl} 
                alt={program.title} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-4">Program Overview</h2>
                <p className="text-gray-700 mb-6">{program.overview}</p>

                <h3 className="text-xl font-bold text-bluvill-700 mb-3">Career Outcomes</h3>
                <ul className="mb-6 space-y-2">
                  {program.outcomes.map((outcome, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-bluvill-800 mb-4">Curriculum</h2>
                <p className="text-gray-700 mb-6">
                  The curriculum for our {program.title} program is designed to provide students 
                  with both theoretical knowledge and practical skills. Below is the outline of courses 
                  for each year of study.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  {program.curriculum.map((year, index) => (
                    <AccordionItem key={index} value={`year-${index}`}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {year.year}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 pt-2">
                          {year.courses.map((course, courseIndex) => (
                            <li key={courseIndex} className="flex items-start">
                              <BookOpen size={16} className="text-bluvill-600 mr-2 flex-shrink-0 mt-1" />
                              <span className="text-gray-700">{course}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="shadow-md mb-6">
              <CardHeader>
                <CardTitle>Program Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Clock size={20} className="text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Duration</h4>
                    <p className="text-gray-600">{program.duration}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <GraduationCap size={20} className="text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Degree Level</h4>
                    <p className="text-gray-600">{program.level}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <DollarSign size={20} className="text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Tuition</h4>
                    <p className="text-gray-600">{program.tuition}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award size={20} className="text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Accreditation</h4>
                    <p className="text-gray-600">{program.accreditation}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar size={20} className="text-bluvill-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold">Start Dates</h4>
                    <p className="text-gray-600">{program.startDates}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Link to="/admissions" className="w-full">
                <Button size="lg" className="w-full bg-bluvill-700 hover:bg-bluvill-800">
                  Apply Now
                </Button>
              </Link>
              
              <Link to="/admissions#requirements" className="w-full">
                <Button size="lg" variant="outline" className="w-full">
                  Entry Requirements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;
