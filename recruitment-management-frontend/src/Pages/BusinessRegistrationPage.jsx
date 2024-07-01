import React from 'react';
import BusinessRegistrationForm from '../components/BusinessRegistrationForm';
import '../Css/FormStyles.css';

const BusinessRegistrationPage = () => {
    return (
      <div className="page-container">
        <div className="registration-form-container">
          <BusinessRegistrationForm />
        </div>
      </div>
    );
  };
  
  export default BusinessRegistrationPage;
