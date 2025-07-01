
-- Create announcements table for student dashboard
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general', -- 'general', 'urgent', 'academic', 'event'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN DEFAULT true,
  target_audience TEXT DEFAULT 'all' -- 'all', 'students', 'staff'
);

-- Create upcoming events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT,
  type TEXT DEFAULT 'general', -- 'academic', 'social', 'deadline', 'general'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN DEFAULT true
);

-- Create academic deadlines table
CREATE TABLE public.academic_deadlines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  course_id UUID REFERENCES public.courses(id),
  type TEXT NOT NULL DEFAULT 'assignment', -- 'assignment', 'exam', 'project', 'registration'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  published BOOLEAN DEFAULT true
);

-- Enable Row Level Security for all tables
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_deadlines ENABLE ROW LEVEL SECURITY;

-- Create policies for announcements (visible to all authenticated users)
CREATE POLICY "Anyone can view published announcements" 
  ON public.announcements 
  FOR SELECT 
  USING (published = true);

-- Create policies for events (visible to all authenticated users)
CREATE POLICY "Anyone can view published events" 
  ON public.events 
  FOR SELECT 
  USING (published = true);

-- Create policies for academic deadlines (visible to all authenticated users)
CREATE POLICY "Anyone can view published deadlines" 
  ON public.academic_deadlines 
  FOR SELECT 
  USING (published = true);

-- Insert some sample data for announcements
INSERT INTO public.announcements (title, content, type) VALUES 
('Welcome to the New Semester', 'We are excited to welcome all students back for the new academic semester. Please check your course schedules and ensure you have all required materials.', 'general'),
('Library Hours Extended', 'The university library will now be open 24/7 during exam periods to support student learning and research activities.', 'academic'),
('Campus WiFi Maintenance', 'There will be scheduled maintenance on the campus WiFi network this weekend. Please plan accordingly for any online activities.', 'urgent');

-- Insert some sample data for events
INSERT INTO public.events (title, description, event_date, location, type) VALUES 
('Freshman Orientation', 'Welcome session for new students covering campus resources, academic policies, and student life.', '2024-01-15 09:00:00+00', 'Main Auditorium', 'academic'),
('Career Fair', 'Meet with potential employers and learn about internship and job opportunities.', '2024-01-20 10:00:00+00', 'Student Center', 'general'),
('Research Symposium', 'Annual presentation of student and faculty research projects across all departments.', '2024-01-25 14:00:00+00', 'Science Building', 'academic');

-- Insert some sample data for academic deadlines
INSERT INTO public.academic_deadlines (title, description, due_date, type) VALUES 
('Course Registration Deadline', 'Last day to register for spring semester courses without late fees.', '2024-01-10 23:59:00+00', 'registration'),
('Midterm Exams Begin', 'Start of midterm examination period for all courses.', '2024-02-15 08:00:00+00', 'exam'),
('Final Project Proposals', 'Submit final project proposals for capstone courses.', '2024-02-20 23:59:00+00', 'project');
