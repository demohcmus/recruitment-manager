import React, { useState } from 'react';
import '../Css/FormStyles.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5239'; // Đảm bảo URL không bị null

const BusinessRegistrationForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    taxCode: '',
    email: '',
    address: '',
    phoneNumber: ''
  });

  const [message, setMessage] = useState('');

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
      const response = await fetch(`${apiUrl}/api/registration/business`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Try to parse JSON, fallback to text if parsing fails
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const data = await response.json();
          setMessage(data.message || 'Business registered successfully');
        } else {
          const textData = await response.text();
          setMessage(textData || 'Business registered successfully');
        }
      } else {
        const errorData = await response.json();
        setMessage(`Failed to register business: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while registering business');
    }
  };
  
  

  return (
    <div className="form-container">
      <h2>Register as Business</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="taxCode">Tax Code</label>
          <input
            type="text"
            name="taxCode"
            id="taxCode"
            placeholder="Tax Code"
            value={formData.taxCode}
            onChange={handleChange}
            required
          />
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
        <button type="submit" className="form-btn">Register Business</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BusinessRegistrationForm;
