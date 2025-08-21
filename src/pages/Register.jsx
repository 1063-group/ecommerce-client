// Register.jsx - Landscape/Album Layout
import React, { useState } from 'react';
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          if (!/^(\+998)?[0-9]{9}$/.test(cleanPhone)) {
            newErrors.phone = 'Invalid phone format (+998XXXXXXXXX)';
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
      ...(method === 'email' ? { phone: '' } : { email: '' })
    }));
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.email;
      delete newErrors.phone;
      delete newErrors.auth;
      return newErrors;
    });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check required fields
    if (!formData.firstName || formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Password is required (min 8 characters)';
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
      if (!formData.phone || !/^(\+998)?[0-9]{9}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Valid phone number is required';
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
    console.log('🚀 Form submitted!', formData); // Debug log

    // Validate form
    if (!validateForm()) {
      console.log('❌ Validation failed:', errors);
      setErrors(prev => ({ ...prev, submit: 'Please fix the errors above' }));
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Use Vite environment variables
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const requestData = {
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        password: formData.password,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName?.trim() || undefined,
        authMethod: formData.authMethod
      };

      console.log('📤 Sending request to:', `${apiUrl}/api/v1/auth/register`);
      console.log('📤 Request data:', requestData);

      const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      console.log('📥 Response status:', response.status);
      const data = await response.json();
      console.log('📥 Response data:', data);

      if (response.ok) {
        console.log('✅ Registration successful!');
        dispatch(register({
          user: data.user,
          token: data.token
        }));

        if (data.nextStep === 'verify_account') {
          navigate('/verify-account', { 
            state: { 
              message: 'Please check your email/phone for verification code',
              userId: data.user.id 
            }
          });
        } else {
          navigate('/');
        }
      } else {
        console.log('❌ Registration failed:', data);
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ submit: data.message || 'Registration failed' });
        }
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, text: '' };
    
    let strength = 0;
    let feedback = [];
    
    if (password.length >= 8) strength += 25;
    else feedback.push('at least 8 characters');
    
    if (/[A-Z]/.test(password)) strength += 25;
    else feedback.push('uppercase letter');
    
    if (/[a-z]/.test(password)) strength += 25;
    else feedback.push('lowercase letter');
    
    if (/\d/.test(password)) strength += 25;
    else feedback.push('number');
    
    const colors = {
      0: 'bg-gray-200',
      25: 'bg-red-500',
      50: 'bg-yellow-500',
      75: 'bg-blue-500',
      100: 'bg-green-500'
    };
    
    const texts = {
      0: '',
      25: 'Weak',
      50: 'Fair',
      75: 'Good',
      100: 'Strong'
    };
    
    return {
      strength,
      color: colors[strength],
      text: texts[strength],
      feedback: feedback.length > 0 ? `Missing: ${feedback.join(', ')}` : 'Password looks good!'
    };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-40 w-96 h-96 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-emerald-400 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-black/5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
        backgroundSize: '20px 20px'
      }}></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 lg:p-8">
        <div className="w-full max-w-6xl">
          {/* Main Container - Landscape Layout */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="grid lg:grid-cols-2 min-h-[700px]">
              
              {/* Left Panel - Welcome Section */}
              <div className="hidden lg:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-purple-600/20 to-pink-600/20 relative">
                {/* Decorative elements */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>

                <div className="text-center max-w-md">
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-4">
                    Welcome to Our Store
                  </h1>
                  
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    Join thousands of satisfied customers and discover amazing products at unbeatable prices.
                  </p>

                  {/* Features List */}
                  <div className="space-y-4 text-left">
                    {[
                      { icon: "🛍️", text: "Exclusive deals and discounts" },
                      { icon: "🚚", text: "Free shipping on orders over $50" },
                      { icon: "🔒", text: "Secure and safe payments" },
                      { icon: "💫", text: "24/7 customer support" }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 text-white/80">
                        <span className="text-xl">{feature.icon}</span>
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom decorative element */}
                <div className="absolute bottom-8 right-8 w-24 h-24 border border-white/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Right Panel - Registration Form */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {/* Mobile Header */}
                <div className="lg:hidden text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                  <p className="text-white/70 text-sm">Join our platform today</p>
                </div>

                {/* Desktop Header */}
                <div className="hidden lg:block mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Create Your Account</h2>
                  <p className="text-white/70">Get started with your free account</p>
                </div>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Debug Info - Remove in production */}
                  {import.meta.env.DEV && (
                    <div className="bg-black/20 p-3 rounded-lg text-xs text-white/70">
                      <strong>Debug:</strong> Auth: {formData.authMethod}, Email: {formData.email}, Phone: {formData.phone}, Password: {formData.password ? '***' : 'empty'}
                      <br />
                      <strong>API URL:</strong> {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
                    </div>
                  )}
                  {/* Auth Method Selection */}
                  <div className="flex space-x-2 p-1 bg-white/5 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() => handleAuthMethodChange('email')}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        formData.authMethod === 'email'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        Email
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAuthMethodChange('phone')}
                      className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        formData.authMethod === 'phone'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Phone
                      </span>
                    </button>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">First Name *</label>
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
                  {formData.authMethod === 'email' ? (
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">Email Address *</label>
                      <div className="relative">
                        <input
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.email ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="john@example.com"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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
                      <label className="text-white/90 text-sm font-medium">Phone Number *</label>
                      <div className="relative">
                        <input
                          name="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pl-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.phone ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="+998901234567"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
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

                  {/* Password Fields - Side by Side on Desktop */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-white/90 text-sm font-medium">Password *</label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.password ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="Enter strong password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <svg className="h-5 w-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/70 transition-colors"
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

                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-white/10 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${passwordStrength.strength}%` }}
                              />
                            </div>
                            <span className="text-xs text-white/70 min-w-[60px]">{passwordStrength.text}</span>
                          </div>
                          <p className="text-xs text-white/60">{passwordStrength.feedback}</p>
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
                      <label className="text-white/90 text-sm font-medium">Confirm Password *</label>
                      <div className="relative">
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 pl-12 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                            errors.confirmPassword ? 'border-red-400 bg-red-500/10' : 'hover:border-white/30'
                          }`}
                          placeholder="Confirm your password"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                          <svg className="h-5 w-5 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/30 hover:text-white/70 transition-colors"
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

                      {/* Password Match Indicator */}
                      {formData.confirmPassword && (
                        <div className="flex items-center gap-2">
                          {formData.password === formData.confirmPassword ? (
                            <div className="flex items-center gap-1 text-green-300">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs">Passwords match</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-red-300">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs">Passwords don't match</span>
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

                  {/* General Errors */}
                  {(errors.auth || errors.submit) && (
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
                    disabled={isLoading}
                    onClick={(e) => {
                      console.log('🔥 Button clicked!');
                      handleSubmit(e);
                    }}
                    className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 transform ${
                      isLoading
                        ? 'bg-gray-500/50 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-transparent'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Creating your account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Create Account
                      </div>
                    )}
                  </button>

                  {/* Login Link */}
                  <div className="text-center pt-4 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      Already have an account?{' '}
                      <Link 
                        to="/login" 
                        className="text-purple-300 hover:text-white font-medium transition-colors duration-300 hover:underline"
                      >
                        Sign in here
                      </Link>
                    </p>
                  </div>

                  {/* Social Login Options */}
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white/5 text-white/60 rounded-lg">or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                      </button>

                      <button
                        type="button"
                        className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 rounded-xl text-blue-200 hover:text-white transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-.962 6.502-.454 1.766-1.352 2.056-1.352 2.056-.766.078-.934-.671-.934-.671L12.77 14.58l-1.398-2.05s-.115-.166-.115-.23c0-.065.105-.136.105-.136l8.184-5.529s.175-.115.233-.175c.058-.06.02-.123-.089-.123-.109 0-.233.089-.233.089L8.15 11.897l-2.173-.69s-.33-.115-.33-.38c0-.266.35-.398.35-.398L15.94 7.128s.287-.126.966-.126z"/>
                        </svg>
                        Telegram
                      </button>
                    </div>
                  </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-6">
                  <p className="text-white/40 text-xs">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-purple-300 hover:text-white transition-colors">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-purple-300 hover:text-white transition-colors">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Register;