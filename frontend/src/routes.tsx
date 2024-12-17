import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TimeSheet from './pages/timesheet/TimeSheet';
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/projects/Projects';
import Teams from './pages/teams/Teams';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/timesheet" element={<TimeSheet />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/teams" element={<Teams />} />
    </Routes>
  );
};

export default AppRoutes;
