import React from 'react';
import { useAuth } from '../components/AuthContext';

const HomePage = ({ role }) => {
  const auth = useAuth();
  const userRole = auth.user?.role;

  if (role && userRole !== role) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Welcome to the Recruitment Management System</h1>
      <h2>Your role: {userRole}</h2>
      {userRole === 'business' && <div>Business Dashboard</div>}
      {userRole === 'employee' && <div>Employee Dashboard</div>}
      {userRole === 'applicant' && <div>Applicant Dashboard</div>}
    </div>
  );
};

export default HomePage;
