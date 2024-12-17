import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Projects from '../pages/projects/Projects';
import ProjectDetails from '../pages/projects/ProjectDetails';
import TimeSheet from '../pages/timesheet/TimeSheet';
import NotFound from '../pages/NotFound';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected Routes */}
      <Route path="/" element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      } />
      
      <Route path="/projects" element={
        <PrivateRoute>
          <Projects />
        </PrivateRoute>
      } />
      
      <Route path="/projects/:id" element={
        <PrivateRoute>
          <ProjectDetails />
        </PrivateRoute>
      } />
      
      <Route path="/timesheet" element={
        <PrivateRoute>
          <TimeSheet />
        </PrivateRoute>
      } />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
