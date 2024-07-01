import React from 'react';
import EmployerRegistrationForm from '../components/EmployerRegistrationForm';
import '../Css/FormStyles.css';

const EmployerRegistrationPage = () => {
    return (
      <div className="page-container">
        <div className="registration-form-container">
          <EmployerRegistrationForm />
        </div>
      </div>
    );
  };
  
  export default EmployerRegistrationPage;
