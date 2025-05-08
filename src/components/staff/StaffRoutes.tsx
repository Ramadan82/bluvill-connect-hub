
import { Routes, Route } from 'react-router-dom';
import StaffDashboard from '@/components/staff/StaffDashboard';
import AcademicCalendar from '@/components/staff/AcademicCalendar';
import ResearchPortal from '@/components/staff/ResearchPortal';
import TeachingResources from '@/components/staff/TeachingResources';
import FacultyDirectory from '@/components/staff/FacultyDirectory';
import FormsPolicies from '@/components/staff/FormsPolicies';
import SupportServices from '@/components/staff/SupportServices';

const StaffRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StaffDashboard />} />
      <Route path="/calendar" element={<AcademicCalendar />} />
      <Route path="/research" element={<ResearchPortal />} />
      <Route path="/teaching" element={<TeachingResources />} />
      <Route path="/directory" element={<FacultyDirectory />} />
      <Route path="/forms" element={<FormsPolicies />} />
      <Route path="/support" element={<SupportServices />} />
    </Routes>
  );
};

export default StaffRoutes;
