
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TeachingResources from './TeachingResources';
import ResearchPortal from './ResearchPortal';
import AcademicCalendar from './AcademicCalendar';
import FacultyDirectory from './FacultyDirectory';
import FormsPolicies from './FormsPolicies';
import SupportServices from './SupportServices';
import AcademicStaffDashboard from './AcademicStaffDashboard';
import NonAcademicStaffDashboard from './NonAcademicStaffDashboard';

interface StaffRoutesProps {
  staffType: string;
}

const StaffRoutes: React.FC<StaffRoutesProps> = ({ staffType }) => {
  return (
    <Routes>
      <Route path="/" element={staffType === 'academic' ? <AcademicStaffDashboard /> : <NonAcademicStaffDashboard />} />
      <Route path="/dashboard" element={staffType === 'academic' ? <AcademicStaffDashboard /> : <NonAcademicStaffDashboard />} />
      <Route path="/calendar" element={<AcademicCalendar />} />
      <Route path="/teaching-resources" element={<TeachingResources />} />
      <Route path="/research-portal" element={<ResearchPortal />} />
      <Route path="/faculty-directory" element={<FacultyDirectory />} />
      <Route path="/forms-policies" element={<FormsPolicies />} />
      <Route path="/support-services" element={<SupportServices />} />
      <Route path="*" element={<Navigate to="/staff-portal" replace />} />
    </Routes>
  );
};

export default StaffRoutes;
