import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file for styles (if created)

export const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract user data from location.state
  const { email, name } = location.state || {};

  // Redirect to login page if email or name is missing
  if (!email || !name) {
    navigate('/');
    return null; // Prevent the component from rendering
  }

  return (
    <div className="home-container">
      <h1 className="welcome-header">Welcome, {name}!</h1>
      <p className="email-text">Email: {email}</p>
      <button className="logout-button" onClick={() => navigate('/')}>Logout</button>
    </div>
  );
};
