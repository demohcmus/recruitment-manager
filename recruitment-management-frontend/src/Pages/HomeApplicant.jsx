import React from 'react';
import { useAuth } from '../components/AuthContext';

const HomeApplicant = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;

  if (userRole !== 'Applicant') {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Welcome to the Applicant Dashboard</h1>
      {/* Applicant specific content here */}
    </div>
  );
};

export default HomeApplicant;
