import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import EmployerRegistrationPage from './Pages/EmployerRegistrationPage';
import ApplicantRegistrationPage from './Pages/ApplicantRegistrationPage';
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
                    <Route path="/home/employee" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/home/employer" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/home/applicant" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/register/employer" element={<EmployerRegistrationPage />} />
                    <Route path="/register/applicant" element={<ApplicantRegistrationPage />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;

