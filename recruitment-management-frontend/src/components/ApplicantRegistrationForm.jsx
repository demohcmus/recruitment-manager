import React, { useState } from 'react';
import '../Css/FormStyles.css';

const ApplicantRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    identityNumber: '',
    birthDate: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    skills: '',
    educationLevel: 'THPT'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <div className="form-container">
      <h2>Register as Applicant</h2>
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
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
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
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            name="skills"
            id="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="educationLevel">Education Level</label>
          <select
            name="educationLevel"
            id="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          >
            <option value="THPT">THPT</option>
            <option value="Dai Hoc">Đại Học</option>
            <option value="Cao Hoc">Cao Học</option>
          </select>
        </div>
        <button type="submit" className="form-btn">Register Applicant</button>
      </form>
    </div>
  );
};

export default ApplicantRegistrationForm;
