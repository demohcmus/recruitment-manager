import React from 'react';
import { useAuth } from '../components/AuthContext';

const HomeEmployee = () => {
  const auth = useAuth();
  const userRole = auth.user?.role;

  if (userRole !== 'Employee') {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Welcome to the Employee Dashboard</h1>
      {/* Employee specific content here */}
    </div>
  );
};

export default HomeEmployee;
