import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/FormStyles.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const RecruitmentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    position: '',
    numberOfPositions: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    requirements: '',
    jobDescription: '',
    salary: '',
    jobType: 'Full-time',
    postingForm: 'Online',
    postingStartDate: '',
    postingDurationDays: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/api/recruitment/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Recruitment information registered successfully');
        setTimeout(() => {
          navigate('/home/business');
        }, 2000);
      } else {
        let errorData = null;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          setMessage(`Failed to register recruitment: ${response.statusText}`);
          return;
        }
        setMessage(`Failed to register recruitment: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering recruitment information');
    }
  };

  return (
    <div className="form-container">
      <h2>Register Recruitment Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Form Fields */}
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
        </div>
        <div className="form-group">
          <label htmlFor="numberOfPositions">Number of Positions</label>
          <input
            type="number"
            name="numberOfPositions"
            id="numberOfPositions"
            placeholder="Number of Positions"
            value={formData.numberOfPositions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruitmentStartDate">Recruitment Start Date</label>
          <input
            type="date"
            name="recruitmentStartDate"
            id="recruitmentStartDate"
            value={formData.recruitmentStartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recruitmentEndDate">Recruitment End Date</label>
          <input
            type="date"
            name="recruitmentEndDate"
            id="recruitmentEndDate"
            value={formData.recruitmentEndDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requirements</label>
          <textarea
            name="requirements"
            id="requirements"
            placeholder="Requirements"
            value={formData.requirements}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            name="jobDescription"
            id="jobDescription"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary</label>
          <input
            type="number"
            name="salary"
            id="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select
            name="jobType"
            id="jobType"
            value={formData.jobType}
            onChange={handleChange}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Part-time">Part-time</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postingForm">Posting Form</label>
          <select
            name="postingForm"
            id="postingForm"
            value={formData.postingForm}
            onChange={handleChange}
            required
          >
            <option value="Online">Online</option>
            <option value="Newspaper">Newspaper</option>
            <option value="Advertising Banner">Advertising Banner</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="postingStartDate">Posting Start Date</label>
          <input
            type="date"
            name="postingStartDate"
            id="postingStartDate"
            value={formData.postingStartDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="postingDurationDays">Posting Duration Days</label>
          <input
            type="number"
            name="postingDurationDays"
            id="postingDurationDays"
            placeholder="Posting Duration Days"
            value={formData.postingDurationDays}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-btn">Register Recruitment</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default RecruitmentRegistrationForm;
