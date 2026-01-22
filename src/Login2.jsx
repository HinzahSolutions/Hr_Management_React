'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Building, User, Key, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Login2() {
  const [showPassword, setShowPassword] = useState(false);
  const [companyCode, setCompanyCode] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation - Based on your API screenshot
    if (!companyCode.trim() || !name.trim() || !password.trim()) {
      setError('Please enter company name, company code, and password');
      return;
    }

    setIsLoading(true);

    try {
      // Login API call - Updated to match your screenshot
      const loginResponse = await fetch(
        'https://hr.hinzah.com/api/employer/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            company_code: companyCode,
            password: password,
          }),
        }
      );

      const loginResult = await loginResponse.json();
      console.log('Login Response:', loginResult);

      if (!loginResponse.ok) {
        throw new Error(loginResult.message || 'Invalid credentials');
      }

      // Check if login was successful
      if (!loginResult.status) {
        throw new Error(loginResult.message || 'Login failed');
      }

      // ✅ Extract token & data from response
      const { token, data } = loginResult;

      // ✅ Store securely
      localStorage.setItem('token', token);
      localStorage.setItem('employerData', JSON.stringify(data));
      
      // Store individual items for easy access
      localStorage.setItem('employer_id', data.employer_id);
      localStorage.setItem('company_code', data.company_code);
      localStorage.setItem('company_name', data.name);

      console.log('Stored employer data:', data);

      // Optional: Fetch additional dashboard data
      try {
        const dashboardResponse = await fetch(
          'http://127.0.0.1:8000/api/employer/dashboard', // Adjust this endpoint as needed
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          }
        );

        if (dashboardResponse.ok) {
          const dashboardData = await dashboardResponse.json();
          console.log('Dashboard Data:', dashboardData);
          localStorage.setItem('dashboardData', JSON.stringify(dashboardData));
        }
      } catch (dashboardError) {
        console.log('Dashboard fetch skipped or failed:', dashboardError);
        // Continue to navigation even if dashboard fetch fails
      }

      // ✅ Navigate to dashboard
      navigate('/employer/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-50 rounded-full">
                <Smartphone className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Employer Portal</h1>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to manage your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company Name
                </div>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter company name"
                disabled={isLoading}
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">e.g., Hinzac Technologies</p> */}
            </div>

            {/* Company Code Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Company Code
                </div>
              </label>
              <input
                type="text"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Enter company code"
                disabled={isLoading}
                required
              />
              {/* <p className="text-xs text-gray-500 mt-1">e.g., COMP0005</p> */}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  Password
                </div>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {/* <p className="text-xs text-gray-500 mt-1">Default: 123456</p> */}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 animate-pulse">
                <div className="flex items-center">
                  <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            {/* Success Message Demo - Remove in production */}
            {/* <div className="bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg p-3">
              <div className="font-medium mb-1">API Test Data:</div>
              <div className="grid grid-cols-2 gap-1">
                <div>Company: <span className="font-mono">Hinzac Technologies</span></div>
                <div>Code: <span className="font-mono">COMP0005</span></div>
                <div>Password: <span className="font-mono">123456</span></div>
              </div>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-800 disabled:from-green-300 disabled:to-green-400 disabled:cursor-not-allowed transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Sign In as Employer
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Need help? Contact support@hinzah.com
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg className="w-6 h-6 text-green-600" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 2L2 12h4v16h8v-8h4v8h8V12h4L16 2z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-800">Hinzah Solutions</span>
          </div>
          <p className="text-xs text-gray-400">
            Employer Portal v1.0 • © 2024 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}