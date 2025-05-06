import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import HomePage from './Home';
import LoginForm from './Login';
import Register from './Register';
import Welcome from './Welcome';
import PatientForm from './PatientForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // login tracking

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/welcome">Welcome</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-danger" onClick={() => setIsLoggedIn(false)}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<Welcome />} />
        {/* Protected route for PatientForm */}
        <Route path="/patient" element={isLoggedIn ? <PatientForm /> : <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />} />
      </Routes>
    </div>
  );
}
