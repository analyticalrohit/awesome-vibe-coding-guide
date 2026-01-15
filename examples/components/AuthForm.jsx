import React, { useState, useEffect } from 'react';
import { validateEmail, validatePassword } from '../utils/validation';
import { registerUser, loginUser } from '../services/authService';

/**
 * AI-Generated Authentication Component
 * Demonstrates form validation, error handling, and user feedback
 */
const AuthForm = ({ mode = 'login', onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Real-time validation with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      validateField('email', formData.email);
      if (mode === 'register') {
        validateField('name', formData.name);
        validateField('confirmPassword', formData.confirmPassword);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, formData.name, formData.confirmPassword]);

  const validateField = (fieldName, value) => {
    const newErrors = { ...errors };
    
    switch (fieldName) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
        
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (!validatePassword(value)) {
          newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and numbers';
        } else {
          delete newErrors.password;
        }
        break;
        
      case 'confirmPassword':
        if (mode === 'register' && value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
        
      case 'name':
        if (mode === 'register') {
          if (!value) {
            newErrors.name = 'Name is required';
          } else if (value.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
          } else {
            delete newErrors.name;
          }
        }
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setAuthError('');
    
    // Validate field immediately on change (except for password confirmation)
    if (name !== 'confirmPassword') {
      validateField(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      // Validate all fields before submission
      const validationErrors = {};
      
      if (!formData.email) validationErrors.email = 'Email is required';
      if (!formData.password) validationErrors.password = 'Password is required';
      
      if (mode === 'register') {
        if (!formData.name) validationErrors.name = 'Name is required';
        if (formData.password !== formData.confirmPassword) {
          validationErrors.confirmPassword = 'Passwords do not match';
        }
      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      let response;
      if (mode === 'login') {
        response = await loginUser(formData.email, formData.password);
      } else {
        response = await registerUser({
          email: formData.email,
          password: formData.password,
          name: formData.name
        });
      }

      if (response.success) {
        onSuccess(response.user);
      } else {
        setAuthError(response.error || 'Authentication failed');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    const hasErrors = Object.keys(errors).length > 0;
    const isComplete = mode === 'login' 
      ? formData.email && formData.password
      : formData.email && formData.password && formData.name && formData.confirmPassword;
    
    return !hasErrors && isComplete && !isLoading;
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <h2>{mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
        
        {authError && (
          <div className="error-message" role="alert">
            {authError}
          </div>
        )}

        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={(e) => validateField('name', e.target.value)}
              className={errors.name ? 'error' : ''}
              disabled={isLoading}
              placeholder="Enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={(e) => validateField('email', e.target.value)}
            className={errors.email ? 'error' : ''}
            disabled={isLoading}
            placeholder="Enter your email"
            autoComplete="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={(e) => validateField('password', e.target.value)}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
              placeholder="Enter your password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '👁️‍🗨️' : '👁️'}
            </button>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        {mode === 'register' && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              onBlur={(e) => validateField('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'error' : ''}
              disabled={isLoading}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <span className="error-text">{errors.confirmPassword}</span>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={!isFormValid()}
          className="submit-button"
        >
          {isLoading ? (
            <span className="loading-spinner">🔄</span>
          ) : (
            mode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </button>

        <div className="form-footer">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <a href="/register" className="link">
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <a href="/login" className="link">
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;