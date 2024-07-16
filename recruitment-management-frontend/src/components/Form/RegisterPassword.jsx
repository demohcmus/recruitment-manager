import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../Css/FormStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const RegisterPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, role } = location.state || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!formData || !role) {
      navigate('/login');
    }
  }, [formData, role, navigate]);

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 12) {
      errors.password = 'Password must be at least 12 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      errors.password = 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Password must contain at least one symbol';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordErrors = validatePassword(password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors);
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'User registered successfully');
        navigate('/login');
      } else {
        const errorData = await response.json();
        setMessage(`Failed to register: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering user');
    }
  };

  return (
    <div className="form-container">
      <h2>Set Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            name="role"
            id="role"
            placeholder="Role"
            value={role}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Enter Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
              className="password-icon"
            />
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Re-Enter Password</label>
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-Enter Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-icon"
            />
          </div>
        </div>
        <button type="submit" className="form-btn">Set Password</button>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default RegisterPassword;
