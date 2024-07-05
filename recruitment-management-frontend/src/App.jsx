import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import BusinessRegistrationPage from './Pages/BusinessRegistrationPage';
import ApplicantRegistrationPage from './Pages/ApplicantRegistrationPage';
import EmployeeRegistrationPage from './Pages/EmployeeRegistrationPage';
import RegisterPassword from './components/RegisterPassword';
import HomeBusiness from './Pages/HomeBusiness';
import HomeEmployee from './Pages/HomeEmployee';
import HomeApplicant from './Pages/HomeApplicant';
import RecruitmentRegistrationPage from './Pages/RecruitmentRegistrationPage'; // Import thêm
import { AuthProvider, useAuth } from './components/AuthContext';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/home/business" element={<PrivateRoute><HomeBusiness /></PrivateRoute>} />
                    <Route path="/home/employee" element={<PrivateRoute><HomeEmployee /></PrivateRoute>} />
                    <Route path="/home/applicant" element={<PrivateRoute><HomeApplicant /></PrivateRoute>} />
                    <Route path="/register/business" element={<BusinessRegistrationPage />} />
                    <Route path="/register/applicant" element={<ApplicantRegistrationPage />} />
                    <Route path="/register/employee" element={<EmployeeRegistrationPage />} />
                    <Route path="/register-password" element={<RegisterPassword />} />
                    <Route path="/register-recruitment" element={<PrivateRoute><RecruitmentRegistrationPage /></PrivateRoute>} /> {/* Thêm route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
