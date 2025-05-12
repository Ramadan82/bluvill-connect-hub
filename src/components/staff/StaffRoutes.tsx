
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StaffDashboard from './StaffDashboard';
import SupportServices from './SupportServices';
import FormsPolicies from './FormsPolicies';
import AcademicCalendar from './AcademicCalendar';
import FacultyDirectory from './FacultyDirectory';
import TeachingResources from './TeachingResources';
import ResearchPortal from './ResearchPortal';

interface StaffRoutesProps {
  staffType: string;
}

const StaffRoutes: React.FC<StaffRoutesProps> = ({ staffType }) => {
  return (
    <Routes>
      <Route path="/" element={<StaffDashboard staffType={staffType} />} />
      <Route path="/dashboard" element={<StaffDashboard staffType={staffType} />} />
      <Route path="/support" element={<SupportServices />} />
      <Route path="/forms-policies" element={<FormsPolicies staffType={staffType} />} />
      <Route path="/academic-calendar" element={<AcademicCalendar />} />
      <Route path="/faculty-directory" element={<FacultyDirectory />} />
      <Route path="/teaching-resources" element={<TeachingResources staffType={staffType} />} />
      <Route path="/research-portal" element={<ResearchPortal staffType={staffType} />} />
    </Routes>
  );
};

export default StaffRoutes;
