
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
import StaffDashboard from './StaffDashboard';

interface StaffRoutesProps {
  staffType: string;
}

const StaffRoutes: React.FC<StaffRoutesProps> = ({ staffType }) => {
  return (
    <Routes>
      <Route path="/" element={<StaffDashboard />} />
      <Route path="/dashboard" element={<StaffDashboard />} />
      <Route path="/calendar" element={<AcademicCalendar />} />
      <Route path="/teaching" element={<TeachingResources />} />
      <Route path="/research" element={<ResearchPortal />} />
      <Route path="/directory" element={<FacultyDirectory />} />
      <Route path="/forms" element={<FormsPolicies staffType={staffType} />} />
      <Route path="/support" element={<SupportServices staffType={staffType} />} />
      <Route path="*" element={<Navigate to="/staff-portal" replace />} />
    </Routes>
  );
};

export default StaffRoutes;
