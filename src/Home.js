import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-text">
          <h1>Vaidyakiya Sahayaka</h1>
          <p>Connecting patients in need with affordable government healthcare</p>
          <Link to="/register" className="btn">Register a Patient</Link>
        </div>
        <img src="/images/hospital4.jpeg" alt="Helping hands" className="hero-image" />
      </div>

      <div className="features-section">
        <h2>Our Mission</h2>
        <p>We guide patients to the right hospitals and help them navigate treatment access smoothly.</p>

        <div className="image-grid">
          <img src="/images/hospital1.jpg" alt="Hospital 1" />
          <img src="/images/hospital2.jpg" alt="Hospital 2" />
          <img src="/images/hospital3.jpeg" alt="Helping people" />
        </div>
      </div>

      <div className="cta-bottom">
        <h3>Need help? Start by registering the patient.</h3>
        <Link to="/register" className="btn">Get Started</Link>
      </div>
    </div>
  );
}
