import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            <h1>Welcome to the Recruitment Management System</h1>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/register/employer"><button>Register as Employer</button></Link>
            <Link to="/register/applicant"><button>Register as Applicant</button></Link>
        </div>
    );
};

export default HomePage;
