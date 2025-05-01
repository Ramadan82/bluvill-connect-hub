
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import CourseCard from './CourseCard';
import { Loader2 } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
}

interface Enrollment {
  course_id: string;
}

const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchCoursesAndEnrollments = async () => {
      try {
        // Fetch courses
        const { data: coursesData, error: coursesError } = await supabase
          .from('courses')
          .select('*');
        
        if (coursesError) throw coursesError;
        
        // Fetch user enrollments
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const { data: enrollmentsData, error: enrollmentsError } = await supabase
            .from('enrollments')
            .select('course_id')
            .eq('user_id', session.user.id);
          
          if (enrollmentsError) throw enrollmentsError;
          
          setEnrollments(enrollmentsData.map((e: Enrollment) => e.course_id));
        }
        
        setCourses(coursesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load courses. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCoursesAndEnrollments();
  }, []);
  
  const handleEnroll = async (courseId: string) => {
    try {
      setEnrolling(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to enroll in courses.",
          variant: "destructive",
        });
        return;
      }
      
      const { error } = await supabase.from('enrollments').insert({
        user_id: session.user.id,
        course_id: courseId
      });
      
      if (error) throw error;
      
      // Update local state
      setEnrollments([...enrollments, courseId]);
      
      toast({
        title: "Enrolled Successfully",
        description: "You have been enrolled in the course.",
      });
    } catch (error) {
      console.error('Error enrolling in course:', error);
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll in the course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEnrolling(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }
  
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No courses available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          imageUrl={course.image_url}
          isEnrolled={enrollments.includes(course.id)}
          onEnroll={handleEnroll}
        />
      ))}
    </div>
  );
};

export default CoursesList;
