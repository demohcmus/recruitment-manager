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
import Layout from './components/Layout';
import BusinessList from './Pages/BusinessList';
import ApplicantList from './Pages/ApplicantList';
import RecruitmentInforList from './Pages/RecruitmentInforList';
import ProfilesOfApplicant from './Pages/ProfilesOfApplicant';

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
                    <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path="dashboard" element={<HomeEmployee />} />
                        <Route path="home/business" element={<HomeBusiness />} />
                        <Route path="home/employee" element={<HomeEmployee />} />
                        <Route path="home/applicant" element={<HomeApplicant />} />
                        <Route path="register/business" element={<BusinessRegistrationPage />} />
                        <Route path="register/applicant" element={<ApplicantRegistrationPage />} />
                        <Route path="register/employee" element={<EmployeeRegistrationPage />} />
                        <Route path="register-password" element={<RegisterPassword />} />
                        <Route path="register-recruitment" element={<RecruitmentRegistrationPage />} />
                        <Route path="business-list" element={<BusinessList />} />
                        <Route path="applicant-list" element={<ApplicantList />} />
                        <Route path="recruitment-infor-list" element={<RecruitmentInforList />} />
                        <Route path="applicant-profile-list" element={<ProfilesOfApplicant />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
