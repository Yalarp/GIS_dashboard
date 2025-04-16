import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignupPage.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations after component mount
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrorMessage('');
  };

  const validateInputs = () => {
    const { username, email, password, confirmPassword } = formData;
    if (username.length < 3) {
      return 'Username must be at least 3 characters long.';
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return 'Please enter a valid email address.';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (password !== confirmPassword) {
      return 'Passwords do not match.';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateInputs();
    if (error) {
      setErrorMessage(error);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        
        // Add transition effect before navigation
        setIsVisible(false);
        setTimeout(() => {
          navigate('/login');
        }, 500);
      } else {
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error connecting to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`signup-container ${isVisible ? 'visible' : ''}`}>
      <div className="signup-overlay"></div>
      <div className="particle-container">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      <div className="content-section">
        <div className="content-wrapper">
          <h1 className="main-title">Create Account</h1>
          <h2 className="sub-title">Join our community</h2>
          <p className="description">
            Create an account to access our powerful GIS platform with interactive 2D and 3D 
            data visualization capabilities. Unlock advanced features and join thousands of 
            professionals who trust our tools for spatial data analysis.
          </p>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <span>Interactive Maps</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <span>Data Analysis</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure Storage</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="signup-form">
        <div className="form-header">
          <h2>Sign Up</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="fa fa-user input-icon"></i>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="fa fa-envelope input-icon"></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="fa fa-lock input-icon"></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="fa fa-check-circle input-icon"></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
            />
            <label htmlFor="terms">I agree to the <a href="#" className="terms-link">Terms & Conditions</a></label>
          </div>

          <button type="submit" className="signup-btn" disabled={isSubmitting}>
            {isSubmitting ? 
              <span className="btn-content"><span className="loader"></span>Creating Account</span> : 
              <span className="btn-content">CREATE ACCOUNT</span>
            }
          </button>

          <div className="divider">
            <span>or sign up with</span>
          </div>

          <div className="social-login">
            <button type="button" className="social-btn facebook" aria-label="Sign up with Facebook">
              <i className="fa fa-facebook"></i>
            </button>
            <button type="button" className="social-btn google" aria-label="Sign up with Google">
              <i className="fa fa-google"></i>
            </button>
            <button type="button" className="social-btn twitter" aria-label="Sign up with Twitter">
              <i className="fa fa-twitter"></i>
            </button>
            <button type="button" className="social-btn github" aria-label="Sign up with GitHub">
              <i className="fa fa-github"></i>
            </button>
          </div>
          
          <div className="links">
            <Link to="/login" className="login-link">Already have an account? Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;