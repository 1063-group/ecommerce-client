// Register.jsx - Complete Fixed Version with Improved Error Handling
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    authMethod: 'email'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');


  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clear errors when switching auth methods
  useEffect(() => {
    setErrors({});
    setSuccessMessage('');
  }, [formData.authMethod]);

  // Real-time validation
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Invalid email format';
        } else {
          delete newErrors.email;
        }
        break;

      case 'phone':
        if (value) {
          const cleanPhone = value.replace(/\D/g, '');
          
          // ✅ Check valid Uzbekistan phone formats
          const isValid = (
            (cleanPhone.length === 12 && cleanPhone.startsWith('998')) || // +998991234567 -> 998991234567
            (cleanPhone.length === 9) // 991234567
          );
          
          if (!isValid) {
            newErrors.phone = 'Enter valid Uzbekistan phone (+998XXXXXXXXX or XXXXXXXXX)';
          } else {
            delete newErrors.phone;
          }
        } else {
          delete newErrors.phone;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 8) {
          newErrors.password = 'Password must be at least 8 characters';
        } else {
          const hasUpper = /[A-Z]/.test(value);
          const hasLower = /[a-z]/.test(value);
          const hasNumber = /\d/.test(value);
          
          if (!hasUpper || !hasLower || !hasNumber) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
          } else {
            delete newErrors.password;
          }
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      case 'firstName':
        if (!value || value.trim().length < 2) {
          newErrors.firstName = 'First name must be at least 2 characters';
        } else {
          delete newErrors.firstName;
        }
        break;

      case 'lastName':
        if (value && value.trim().length < 2) {
          newErrors.lastName = 'Last name must be at least 2 characters';
        } else {
          delete newErrors.lastName;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear success message when user starts typing
    if (successMessage) {
      setSuccessMessage('');
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    validateField(name, value);
  };

  const handleAuthMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      authMethod: method,
      // Clear opposite field when switching
      ...(method === 'email' ? { phone: '' } : { email: '' })
    }));
    
    // Clear related errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.email;
      delete newErrors.phone;
      delete newErrors.auth;
      delete newErrors.submit;
      delete newErrors.duplicate;
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name is required (min 2 characters)';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password is required (min 8 characters)';
    } else {
      const hasUpper = /[A-Z]/.test(formData.password);
      const hasLower = /[a-z]/.test(formData.password);
      const hasNumber = /\d/.test(formData.password);
      
      if (!hasUpper || !hasLower || !hasNumber) {
        newErrors.password = 'Password must contain uppercase, lowercase, and number';
      }
    }

    if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords must match';
    }

    // Check auth method requirement
    if (formData.authMethod === 'email') {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
      }
    } else if (formData.authMethod === 'phone') {
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else {
        const cleanPhone = formData.phone.replace(/\D/g, '');
        
        // ✅ Check valid Uzbekistan phone formats
        const isValid = (
          (cleanPhone.length === 12 && cleanPhone.startsWith('998')) || // +998991234567 -> 998991234567
          (cleanPhone.length === 9) // 991234567
        );
        
        if (!isValid) {
          newErrors.phone = 'Enter valid Uzbekistan phone (+998XXXXXXXXX or XXXXXXXXX)';
        }
      }
    }

    // If neither email nor phone is provided
    if (!formData.email && !formData.phone) {
      newErrors.auth = 'Email or phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Form submitted!', formData);

    // Clear previous messages
    setSuccessMessage('');

    // Validate form
    if (!validateForm()) {
      console.log('❌ Validation failed:', errors);
      setErrors(prev => ({ ...prev, submit: 'Please fix the errors above' }));
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // ✅ Clean the data properly
      const requestData = {
        email: formData.email.trim() || undefined,
        phone: formData.phone.replace(/\D/g, '') || undefined,
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName?.trim() || undefined,
        authMethod: formData.authMethod
      };

      // Remove empty values to prevent null issues
      Object.keys(requestData).forEach(key => {
        if (requestData[key] === undefined || requestData[key] === '') {
          delete requestData[key];
        }
      });

      console.log('📤 Sending request to:', `${apiUrl}/api/v1/auth/register`);
      console.log('📤 Request data:', requestData);

      const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log('📥 Response status:', response.status);
      console.log('📥 Response data:', data);

      if (response.ok) {
        console.log('✅ Registration successful!');
        setSuccessMessage('Registration successful! Redirecting to verification...');
        dispatch(register(data.user));
        
        // Navigate to verification page with user data
        setTimeout(() => {
          navigate('/verify-account', {
            state: {
              message: data.message,
              userId: data.user.id,
              email: data.user.email,
              phone: data.user.phone,
              authMethod: data.user.authMethod,
              nextStep: data.nextStep
            }
          });
        }, 1500);

      } else {
        // ✅ Handle different error types
        console.error('❌ Registration failed:', data);
        
        if (response.status === 409) {
          // Duplicate user error
          const field = data.field || 'email/phone';
          setErrors({
            duplicate: `A user with this ${field} already exists. Please use a different ${field} or try logging in.`,
            [field]: `This ${field} is already registered`
          });
          
          // Highlight the duplicate field
          if (field === 'email') {
            setFormData(prev => ({ ...prev, authMethod: 'email' }));
          } else if (field === 'phone') {
            setFormData(prev => ({ ...prev, authMethod: 'phone' }));
          }
        } else if (response.status === 400) {
          // Validation errors
          if (data.errors) {
            setErrors(data.errors);
          } else {
            setErrors({ submit: data.message || 'Please check your input and try again' });
          }
        } else {
          // Generic server error
          setErrors({ 
            submit: data.message || 'Registration failed. Please try again later.' 
          });
        }
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setErrors({ 
        submit: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Clear form for new user
  const handleClearForm = () => {
    setFormData({
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      authMethod: 'email'
    });
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
            
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Create Account
              </h2>
              
              <p className="mt-2 text-white/70">
                Join us today and start your journey
              </p>
            </div>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4 animate-pulse">
                <div className="flex items-center gap-2 text-green-300">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Auth Method Tabs */}
              <div className="grid grid-cols-2 bg-white/5 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => handleAuthMethodChange('email')}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    formData.authMethod === 'email'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  📧 Email
                </button>
                <button
                  type="button"
                  onClick={() => handleAuthMethodChange('phone')}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                    formData.authMethod === 'phone'
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-white/60 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  📱 Phone
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-white/90 text-sm font-medium">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.firstName ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                        }`}
                        placeholder="John"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <svg className="h-5 w-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    {errors.firstName && (
                      <p className="text-red-300 text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-white/90 text-sm font-medium">Last Name</label>
                    <div className="relative">
                      <input
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          errors.lastName ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-300 text-xs flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Auth Field */}
                <div className="space-y-4">
                  {formData.authMethod === 'email' ? (
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.email ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="john@example.com"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <svg className="h-5 w-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                      </div>
                      {errors.email && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.phone ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="+998901234567"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <svg className="h-5 w-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                      </div>
                      {errors.phone && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Password Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">
                        Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.password ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="Min 8 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/50 transition-colors"
                        >
                          {showPassword ? (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password strength indicator */}
                      {formData.password && (
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white/60 text-xs">Password strength:</span>
                            <span className={`text-xs ${
                              formData.password.length >= 8 && 
                              /[A-Z]/.test(formData.password) && 
                              /[a-z]/.test(formData.password) && 
                              /\d/.test(formData.password)
                                ? 'text-green-300' 
                                : 'text-red-300'
                            }`}>
                              {formData.password.length >= 8 && 
                               /[A-Z]/.test(formData.password) && 
                               /[a-z]/.test(formData.password) && 
                               /\d/.test(formData.password) 
                                ? 'Strong' 
                                : 'Weak'}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            <div className={`h-1 flex-1 rounded ${formData.password.length >= 4 ? 'bg-red-400' : 'bg-white/20'}`}></div>
                            <div className={`h-1 flex-1 rounded ${formData.password.length >= 6 ? 'bg-yellow-400' : 'bg-white/20'}`}></div>
                            <div className={`h-1 flex-1 rounded ${formData.password.length >= 8 && /[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) && /\d/.test(formData.password) ? 'bg-green-400' : 'bg-white/20'}`}></div>
                          </div>
                        </div>
                      )}

                      {errors.password && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">
                        Confirm Password <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.confirmPassword ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="Repeat password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/50 transition-colors"
                        >
                          {showConfirmPassword ? (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Password match indicator */}
                      {formData.confirmPassword && (
                        <div className="text-xs">
                          {formData.confirmPassword === formData.password ? (
                            <div className="flex items-center gap-1 text-green-300">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>Passwords match</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-300">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span>Passwords don't match</span>
                            </div>
                          )}
                        </div>
                      )}

                      {errors.confirmPassword && (
                        <p className="text-red-300 text-xs flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Duplicate Error */}
              {errors.duplicate && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium">{errors.duplicate}</p>
                      <div className="mt-2 flex gap-2">
                        <Link
                          to="/login"
                          className="text-xs text-blue-300 hover:text-blue-200 underline"
                        >
                          Login instead
                        </Link>
                        <button
                          type="button"
                          onClick={handleClearForm}
                          className="text-xs text-purple-300 hover:text-purple-200 underline"
                        >
                          Try with different details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* General Errors */}
              {(errors.auth || errors.submit) && !errors.duplicate && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{errors.auth || errors.submit}</p>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || successMessage}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 ${
                  isLoading || successMessage
                    ? 'bg-white/20 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Creating Account...
                  </div>
                ) : successMessage ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Success!
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Account
                  </div>
                )}
              </button>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-white/60 text-sm">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-purple-300 hover:text-purple-200 font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>

            {/* Debug Info (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-black/20 rounded-xl border border-white/10">
                <details className="text-white/60 text-xs">
                  <summary className="cursor-pointer text-white/80">Debug Info</summary>
                  <pre className="mt-2 overflow-auto">
                    {JSON.stringify({ formData, errors }, null, 2)}
                  </pre>
                </details>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;