import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../components/AuthContext';
import '../Css/LoginPage.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.json();
        auth.login(data.token);
        const decoded = jwtDecode(data.token);
        navigate(`/home/${decoded.role.toLowerCase()}`);
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error', error);
      alert('Login error. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-social">
          <h2>SMART</h2>
          <p>Login using social media to get quick access</p>
          <button className="social-btn facebook">Sign With Facebook</button>
          <button className="social-btn twitter">Sign With Twitter</button>
          <button className="social-btn google">Sign With Google</button>
          <button className="social-btn business" onClick={() => navigate('/register/business')}>Sign as Business</button>
          <button className="social-btn applicant" onClick={() => navigate('/register/applicant')}>Sign as Applicant</button>
          <button className="social-btn business" onClick={() => navigate('/register/employee')}>Sign as Employee</button>
        </div>
        <div className="login-form">
          <h2>Login to your account</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Enter Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-footer">
              <div>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
