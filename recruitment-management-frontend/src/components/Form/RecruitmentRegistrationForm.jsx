import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Css/FormStyles.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239';

const RecruitmentRegistrationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    position: '',
    numberOfPositions: '',
    requirements: '',
    jobDescription: '',
    salary: '',
    jobType: 'Full-time',
    postingForm: 'Online',
    postingStartDate: '',
    postingDurationDays: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

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
    const today = new Date();
    const postingStartDate = new Date(formData.postingStartDate);

    if (!formData.position) newErrors.position = 'Position is required';
    if (!formData.numberOfPositions) newErrors.numberOfPositions = 'Number of Positions is required';
    else if (formData.numberOfPositions <= 0) newErrors.numberOfPositions = 'Number of Positions must be greater than 0';
    if (!formData.requirements) newErrors.requirements = 'Requirements are required';
    if (!formData.jobDescription) newErrors.jobDescription = 'Job Description is required';
    if (!formData.salary) newErrors.salary = 'Salary is required';
    else if (formData.salary <= 0) newErrors.salary = 'Salary must be greater than 0';
    if (!formData.postingStartDate) newErrors.postingStartDate = 'Posting Start Date is required';
    else if (postingStartDate <= today) newErrors.postingStartDate = 'Posting Start Date must be a future date';
    if (!formData.postingDurationDays) newErrors.postingDurationDays = 'Posting Duration Days are required';
    else if (formData.postingDurationDays <= 0) newErrors.postingDurationDays = 'Posting Duration Days must be greater than 0';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const today = new Date();
    const postingStartDate = new Date(formData.postingStartDate);

    const recruitmentStartDate = today;
    const recruitmentEndDate = new Date(postingStartDate);
    recruitmentEndDate.setDate(recruitmentEndDate.getDate() + parseInt(formData.postingDurationDays));

    const requestData = {
      ...formData,
      email: localStorage.getItem('email'), // Include email from localStorage
      recruitmentStartDate: recruitmentStartDate.toISOString(),
      recruitmentEndDate: recruitmentEndDate.toISOString()
    };

    try {
      const response = await fetch(`${apiUrl}/api/recruitment/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Optional: Only if backend requires it
        },
        body: JSON.stringify(requestData),
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
          <label htmlFor="numberOfPositions">Number of Positions</label>
          <input
            type="number"
            name="numberOfPositions"
            id="numberOfPositions"
            placeholder="Number of Positions"
            value={formData.numberOfPositions}
            onChange={handleChange}
            required
            min="1"
          />
          {errors.numberOfPositions && <span className="error-message">{errors.numberOfPositions}</span>}
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
          {errors.requirements && <span className="error-message">{errors.requirements}</span>}
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
          {errors.jobDescription && <span className="error-message">{errors.jobDescription}</span>}
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
            min="1"
          />
          {errors.salary && <span className="error-message">{errors.salary}</span>}
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
          {errors.postingStartDate && <span className="error-message">{errors.postingStartDate}</span>}
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
            min="1"
          />
          {errors.postingDurationDays && <span className="error-message">{errors.postingDurationDays}</span>}
        </div>
        <div className="d-flex justify-content-between gap-3">
          <button type="submit" className="form-btn">Register Recruitment</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/home/business')}>Cancel</button>
        </div>

        {message && <p className="error-message">{message}</p>}
      </form>
    </div>
  );
};

export default RecruitmentRegistrationForm;
