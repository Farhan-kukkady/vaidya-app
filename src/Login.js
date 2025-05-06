import React, { useState } from 'react';
import userdetailsService from './userdetailsService';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file

export default function LoginForm({ onLoginSuccess }) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    userdetailsService.validateUser(mobileNumber, password)
      .then((response) => {
        if (response.data) {
          alert("Login successful!");
          onLoginSuccess();
          navigate('/welcome');
        } else {
          alert("Invalid credentials.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed.");
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="tel"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
