// VerifyAccount.jsx - Email/Phone Verification Page
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errors, setErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  // Get data from navigation state
  const { message, userId, email, phone, authMethod } = location.state || {};

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Redirect if no verification data
  useEffect(() => {
    if (!userId) {
      navigate('/register');
    }
  }, [userId, navigate]);

  // Format time display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setErrors({});

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newCode = pastedData.split('').slice(0, 6);
    
    while (newCode.length < 6) {
      newCode.push('');
    }
    
    setVerificationCode(newCode);
    setErrors({});
    
    // Focus last filled input + 1
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  // Verify code
  const handleVerify = async () => {
    const code = verificationCode.join('');
    
    if (code.length !== 6) {
      setErrors({ code: 'Please enter the complete 6-digit code' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/v1/auth/verify-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          verificationCode: code,
          authMethod: authMethod || 'email'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Verification successful
        dispatch(login({
          user: data.user,
          token: data.token
        }));
        
        navigate('/', { 
          state: { 
            message: 'Account verified successfully! Welcome!' 
          }
        });
      } else {
        setErrors({ 
          code: data.message || 'Invalid verification code. Please try again.' 
        });
        
        // Clear the code on error
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error('Verification error:', error);
      setErrors({ 
        code: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend verification code
  const handleResend = async () => {
    setIsResending(true);
    setErrors({});

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${apiUrl}/api/v1/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          authMethod: authMethod || 'email'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTimeLeft(300); // Reset timer
        setCanResend(false);
        setVerificationCode(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        
        // Show success message
        setErrors({ 
          success: `New verification code sent to your ${authMethod === 'phone' ? 'phone' : 'email'}!` 
        });
      } else {
        setErrors({ 
          resend: data.message || 'Failed to resend verification code' 
        });
      }
    } catch (error) {
      console.error('Resend error:', error);
      setErrors({ 
        resend: 'Network error. Please try again.' 
      });
    } finally {
      setIsResending(false);
    }
  };

  // Auto-verify when all fields are filled
  useEffect(() => {
    const code = verificationCode.join('');
    if (code.length === 6 && !isLoading) {
      handleVerify();
    }
  }, [verificationCode]);

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
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
            
            {/* Header */}
            <div className="text-center">
              <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Verify Your Account
              </h2>
              
              <p className="mt-2 text-white/70 text-sm">
                {message || `We sent a 6-digit code to your ${authMethod === 'phone' ? 'phone number' : 'email address'}`}
              </p>
              
              {(email || phone) && (
                <p className="mt-1 text-white/90 font-medium">
                  {email || phone}
                </p>
              )}
            </div>

            {/* Verification Code Input */}
            <div className="space-y-6">
              <div className="flex justify-center gap-3">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value.replace(/\D/g, ''))}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className={`w-12 h-14 text-center text-xl font-bold bg-white/10 border-2 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.code ? 'border-red-400 bg-red-500/10' : 'border-white/20 hover:border-white/30'
                    }`}
                    placeholder="0"
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-white/60 text-sm">
                    Resend code in <span className="font-mono text-white/80">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <p className="text-white/60 text-sm">
                    Didn't receive the code?
                  </p>
                )}
              </div>

              {/* Error Messages */}
              {errors.code && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{errors.code}</p>
                  </div>
                </div>
              )}

              {errors.success && (
                <div className="bg-green-500/10 border border-green-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{errors.success}</p>
                  </div>
                </div>
              )}

              {errors.resend && (
                <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-red-300">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm">{errors.resend}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {/* Verify Button */}
              <button
                onClick={handleVerify}
                disabled={isLoading || verificationCode.join('').length !== 6}
                className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all duration-300 transform ${
                  isLoading || verificationCode.join('').length !== 6
                    ? 'bg-gray-500/50 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-transparent'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verify Account
                  </div>
                )}
              </button>

              {/* Resend Button */}
              <button
                onClick={handleResend}
                disabled={!canResend || isResending}
                className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                  canResend && !isResending
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30'
                    : 'bg-gray-500/20 text-gray-400 cursor-not-allowed border border-gray-500/20'
                }`}
              >
                {isResending ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Resend Code
                  </div>
                )}
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center pt-4 border-t border-white/10 space-y-2">
              <p className="text-white/60 text-sm">
                Need help?{' '}
                <a href="#" className="text-purple-300 hover:text-white transition-colors">
                  Contact Support
                </a>
              </p>
              
              <p className="text-white/60 text-sm">
                Wrong email/phone?{' '}
                <Link 
                  to="/register" 
                  className="text-purple-300 hover:text-white font-medium transition-colors"
                >
                  Register Again
                </Link>
              </p>
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
      `}</style>
    </div>
  );
};

export default VerifyAccount;