import React, { useState } from 'react';
import TopLoadingBar from 'react-top-loading-bar';
import { Link } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Start the progress bar
    setProgress(20);

    // Simulate the forgot password logic (e.g., API call simulation)
    setTimeout(() => setProgress(60), 500);
    setTimeout(() => {
      console.log('Email for password reset:', email);
      setMessage('If an account with that email exists, a reset link will be sent to you.');
      setProgress(100);
      setIsSubmitting(false);
    }, 1000);

    // Reset progress after completion
    setTimeout(() => setProgress(0), 1500);
  };

  return (
    <div className="forgot-password-container">
      {/* Add the TopLoadingBar */}
      <TopLoadingBar
        progress={progress}
        color="#4a90e2"
        height={3}
        onLoaderFinished={() => setProgress(0)}
      />
      
      <div className="content-section">
        <h1 className="main-title">The best Visualization</h1>
        <h2 className="sub-title">for your spatial data</h2>
        <p className="description">
          This project is a full-stack web-based Geographic Information System (GIS) platform developed using the MERN stack (MongoDB, Express.js, React, Node.js). It offers interactive 2D and 3D data visualization capabilities, user authentication, and robust data management.
        </p>
      </div>
      
      <div className="forgot-password-form">
        <h2>Forgot Password</h2>
        <p className="instruction">Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          
          {message && <p className="success-message">{message}</p>}
          
          <button 
            type="submit" 
            className="login-btn" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'RESET PASSWORD'}
          </button>
          
          <div className="links">
            <Link to="/login">Back to Login</Link>
            <Link to="/signup">Create New Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;