import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/FormStyles.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const EmployeeRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    identityNumber: '',
    birthDate: '',
    email: '',
    phoneNumber: '',
    position: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.identityNumber) newErrors.identityNumber = 'Identity Number is required';
    else if (!/^\d{12}$/.test(formData.identityNumber)) newErrors.identityNumber = 'Identity Number must be 12 digits';
    if (!formData.birthDate) newErrors.birthDate = 'Birth Date is required';
    else if (new Date(formData.birthDate) >= new Date()) newErrors.birthDate = 'Birth Date must be before today';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone Number is required';
    else if (!/^0\d{9}$/.test(formData.phoneNumber)) newErrors.phoneNumber = 'Phone Number must start with 0 and be 10 digits';
    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/registration/employee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/register-password', { state: { formData, role: 'Employee' } });
      } else {
        const errorData = await response.json();
        setMessage(`Failed to register employee: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering employee');
    }
  };

  return (
    <div className="form-container">
      <h2>Register as Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="identityNumber">Identity Number</label>
          <input
            type="text"
            name="identityNumber"
            id="identityNumber"
            placeholder="Identity Number"
            value={formData.identityNumber}
            onChange={handleChange}
            required
          />
          {errors.identityNumber && <span className="error-message">{errors.identityNumber}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />
          {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            name="position"
            id="position"
            placeholder="Position"
            value={formData.position}
            onChange={handleChange}
            required
          />
          {errors.position && <span className="error-message">{errors.position}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
        <div className="d-flex justify-content-between gap-3">
        <button type="submit" className="form-btn">Register Employee</button>
        <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/login')}>Cancel</button>
        </div>
      </form>
      {message && <p className="error-message">{message}</p>}
    </div>
  );
};

export default EmployeeRegistrationForm;
