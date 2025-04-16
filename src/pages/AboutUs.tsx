
import PageHeader from '@/components/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BookOpen, GraduationCap, Globe, Heart, Lightbulb, MapPin, UserCheck } from 'lucide-react';

const AboutUs = () => {
  const values = [
    {
      icon: <Award className="h-10 w-10 text-bluvill-600" />,
      title: 'Excellence',
      description: 'We strive for excellence in teaching, research, and all institutional activities.'
    },
    {
      icon: <Heart className="h-10 w-10 text-bluvill-600" />,
      title: 'Compassion',
      description: 'We foster a caring community that prioritizes the wellbeing of all members.'
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-bluvill-600" />,
      title: 'Innovation',
      description: 'We embrace creativity and pioneering approaches to education and research.'
    },
    {
      icon: <UserCheck className="h-10 w-10 text-bluvill-600" />,
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty, ethics, and transparency.'
    },
    {
      icon: <Globe className="h-10 w-10 text-bluvill-600" />,
      title: 'Diversity',
      description: 'We celebrate diversity of people, cultures, and ideas in our community.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-bluvill-600" />,
      title: 'Lifelong Learning',
      description: 'We promote continuous personal and intellectual growth for all.'
    }
  ];

  const leaders = [
    {
      name: 'Dr. Emmanuel Okonkwo',
      position: 'Vice-Chancellor',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Prof. Fatima Ibrahim',
      position: 'Deputy Vice-Chancellor (Academic)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Prof. Chukwudi Eze',
      position: 'Deputy Vice-Chancellor (Administration)',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    {
      name: 'Dr. Amina Mohammed',
      position: 'Registrar',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <div>
      <PageHeader
        title="About Bluvill University"
        subtitle="Learn about our history, mission, and vision"
        background="gradient"
      />

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="border-l-4 border-bluvill-600 pl-6 mb-6">
                <h2 className="text-3xl font-bold text-bluvill-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Bluvill University is dedicated to excellence in teaching, research, and service. We are committed to providing 
                a comprehensive, high-quality education that prepares our students for leadership and service in a diverse, 
                global society.
              </p>
              <p className="text-gray-700 text-lg">
                We strive to foster an environment of innovation, critical thinking, and intellectual growth that 
                empowers our students to address complex challenges and make meaningful contributions to society.
              </p>
            </div>
            
            <div>
              <div className="border-l-4 border-bluvill-600 pl-6 mb-6">
                <h2 className="text-3xl font-bold text-bluvill-800">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                To be a leading institution of higher education in Africa, recognized globally for academic excellence, 
                innovative research, and community engagement.
              </p>
              <p className="text-gray-700 text-lg">
                We aim to be at the forefront of knowledge creation and dissemination, producing graduates who are 
                not only professionally competent but also ethically responsible and socially conscious leaders 
                capable of transforming Nigeria, Africa, and the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-heading">Our History</h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-bluvill-700 mb-4">Founding and Early Years (2005-2010)</h3>
                <p className="text-gray-700">
                  Bluvill University was founded in 2005 by a group of visionary educators and business leaders 
                  committed to revolutionizing higher education in Nigeria. Starting with just two faculties - 
                  Management and Information Technology - the university quickly established a reputation for 
                  academic rigor and innovation.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-bluvill-700 mb-4">Growth and Expansion (2010-2015)</h3>
                <p className="text-gray-700">
                  As enrollment grew, so did our academic offerings. The Faculty of Law was established in 2010, 
                  followed by the Faculty of Medical Sciences in 2012. During this period, we also invested heavily 
                  in campus infrastructure, building state-of-the-art facilities including our central library, 
                  science laboratories, and student housing complexes.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-bluvill-700 mb-4">National Recognition (2015-2020)</h3>
                <p className="text-gray-700">
                  By 2015, Bluvill University had become one of Nigeria's most respected private universities, 
                  known for producing graduates who excel in their fields. Our programs received full accreditation 
                  from the National Universities Commission, and we established partnerships with leading universities 
                  across Africa, Europe, and North America.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-bluvill-700 mb-4">Bluvill Today (2020-Present)</h3>
                <p className="text-gray-700">
                  Today, Bluvill University stands as a beacon of academic excellence in Nigeria. With four 
                  faculties, over 10,000 students, and a growing alumni network of more than 15,000 graduates, 
                  we continue to expand our impact through innovative teaching methodologies, groundbreaking 
                  research, and meaningful community engagement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Our Core Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              These values guide our decisions, shape our culture, and define who we are as an institution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="pt-6">
                  <div className="mx-auto bg-bluvill-50 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-bluvill-800 mb-3">{value.title}</h3>
                  <p className="text-gray-700">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">University Leadership</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Meet the dedicated leaders who guide Bluvill University toward its mission and vision.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {leaders.map((leader, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-bluvill-800 mb-1">{leader.name}</h3>
                <p className="text-gray-600">{leader.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Location */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="border-l-4 border-bluvill-600 pl-6 mb-6">
                <h2 className="text-3xl font-bold text-bluvill-800">Our Campus</h2>
              </div>
              <p className="text-gray-700 text-lg mb-6">
                Bluvill University is located in the heart of Abuja, Nigeria's capital city. Our modern campus 
                spans over 200 acres of beautifully landscaped grounds, providing an ideal environment for 
                learning, research, and personal growth.
              </p>
              <div className="flex items-center mb-6">
                <MapPin className="text-bluvill-600 mr-2 flex-shrink-0" />
                <span className="text-gray-700">Bluvill Campus, Abuja, Nigeria</span>
              </div>
              <p className="text-gray-700 text-lg">
                The campus features state-of-the-art academic buildings, research facilities, student housing, 
                sports complexes, and recreational areas. Our facilities are designed to support a comprehensive 
                educational experience that extends beyond the classroom.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop" 
                alt="Bluvill University Campus" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
