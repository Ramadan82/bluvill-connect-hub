
import { Routes, Route } from 'react-router-dom';
import AcademicStaffDashboard from '@/components/staff/AcademicStaffDashboard';
import NonAcademicStaffDashboard from '@/components/staff/NonAcademicStaffDashboard';
import AcademicCalendar from '@/components/staff/AcademicCalendar';
import ResearchPortal from '@/components/staff/ResearchPortal';
import TeachingResources from '@/components/staff/TeachingResources';
import FacultyDirectory from '@/components/staff/FacultyDirectory';
import FormsPolicies from '@/components/staff/FormsPolicies';
import SupportServices from '@/components/staff/SupportServices';

interface StaffRoutesProps {
  staffType: string;
}

const StaffRoutes = ({ staffType }: StaffRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={staffType === 'academic' ? <AcademicStaffDashboard /> : <NonAcademicStaffDashboard />} />
      <Route path="/calendar" element={<AcademicCalendar />} />
      <Route path="/research" element={<ResearchPortal />} />
      <Route path="/teaching" element={<TeachingResources />} />
      <Route path="/directory" element={<FacultyDirectory />} />
      <Route path="/forms" element={<FormsPolicies staffType={staffType} />} />
      <Route path="/support" element={<SupportServices />} />
    </Routes>
  );
};

export default StaffRoutes;
