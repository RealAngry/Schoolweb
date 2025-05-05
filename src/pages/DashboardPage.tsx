import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import UserManagement from '../components/dashboard/UserManagement';
import StudentManagement from '../components/dashboard/StudentManagement';
import Reports from '../components/dashboard/Reports';
import SchoolJourney from '../components/dashboard/SchoolJourney';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        
        {/* Admin-only routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/reports" element={<Reports />} />
          </>
        )}
        
        {/* Teacher & Admin routes */}
        {(user.role === 'admin' || user.role === 'teacher') && (
          <>
            <Route path="/students" element={<StudentManagement />} />
          </>
        )}
        
        {/* Common routes for all roles */}
        <Route path="/journey" element={<SchoolJourney />} />
        
        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardPage;