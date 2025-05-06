// Welcome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome!</h2>
      <p>You are now logged in.</p>
      <button onClick={() => navigate("/patient")}>
        Register a Patient
      </button><br /><br></br>
      <button onClick={() => alert("Update feature coming soon!")}>
        Update a Patient
      </button>
    </div>
  );
}
