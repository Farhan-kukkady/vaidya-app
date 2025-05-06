import React, { useState } from 'react';
import userdetailsService from './userdetailsService';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 🔗 Make sure to create this file

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userdetailsService.saveUserDetails(formData)
      .then((response) => {
        alert("Registration successful! Redirecting to login...");
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error registering user:", error);
        alert("Registration failed. Try again.");
      });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Create Account</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
