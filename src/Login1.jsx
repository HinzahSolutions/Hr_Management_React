'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Clear old data
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    localStorage.removeItem('permissions');

    try {
      // Call the admin login API
      const response = await fetch('https://hr.hinzah.com/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password
        }),
      });

      const data = await response.json();
      console.log('Admin API Response:', data);

      if (!response.ok || !data.status) {
        toast.error(data.message || `Admin login failed (Status: ${response.status})`);
        setError(data.message || 'Invalid admin credentials');
        setIsLoading(false);
        return;
      }

      if (data.status === true && data.data) {
        // Transform admin data to match your auth context structure
        const adminData = {
          id: data.data.id,
          username: data.data.username,
          role: data.role, // "superadmin" from API
          token: data.token,
          company_name: "Hinzah Admin System",
          company_code: "ADMIN_SYSTEM",
          isAdmin: true, // Add flag to identify admin users
          ...data.data
        };

        console.log('Transformed admin data:', adminData);

        // Store admin session data directly
        localStorage.setItem('currentUser', JSON.stringify(adminData));
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('permissions', JSON.stringify({
          // Hardcode admin permissions to only show Base module
          Base: {
            Company: { view: true, create: true, edit: true, delete: true },
            'Permission Assign': { view: true, create: true, edit: true, delete: true },
            'Admin Profile': { view: true, create: true, edit: true, delete: true }
          }
        }));
        
        const expiryTime = Date.now() + 30 * 60 * 1000;
        localStorage.setItem('tokenExpiry', expiryTime.toString());

        // Manually set auth state
        window.dispatchEvent(new Event('storage'));

        toast.success(
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-white" />
            <div>
              <p className="font-bold text-lg">Welcome Admin {adminData.username}!</p>
              <p className="text-sm opacity-90">
                Role: {data.role}
              </p>
            </div>
          </div>,
          {
            duration: 3000,
            style: {
              background: '#10b981',
              color: 'white',
              padding: '16px',
              borderRadius: '16px',
              fontSize: '16px',
            },
          }
        );

        // IMPORTANT: Wait a moment for the auth state to update
          // IMPORTANT: Wait a moment for the auth state to update
      setTimeout(() => {
        const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
        sessionStorage.removeItem('redirectPath');
        console.log('Redirecting to:', redirectPath);
        navigate('/dashboard', { replace: true });
      }, 1000);

      } else {
        setError(data.message || 'Admin login failed. Please try again.');
        setIsLoading(false);
      }

    } catch (err) {
      console.error('Admin login error:', err);
      
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        toast.error('Network error. Please check your internet connection.');
        setError('Network error. Please check your connection.');
      } else {
        toast.error('Admin login failed. Please try again.');
        setError('Login failed. Please try again.');
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                HRMS Admin
              </h1>
              <p className="text-gray-600 mt-3 text-lg">Administrator Sign In</p>
              <p className="text-sm text-gray-500 mt-1">Superadmin access to base management</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-gray-800"
                  placeholder="Enter admin username"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                    placeholder="Enter admin password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-blue-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-5 rounded-2xl font-bold text-lg shadow-lg hover:from-blue-600 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Admin Sign In
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-600 bg-gray-50 p-4 rounded-xl">
              <p className="font-medium mb-1">Admin Test Credentials:</p>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Username:</span>{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">admin</code>
                </p>
                <p>
                  <span className="font-semibold">Password:</span>{' '}
                  <code className="bg-gray-100 px-2 py-1 rounded">password</code>
                </p>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-blue-600">
                  <strong>Note:</strong> Admin login only grants access to Base Management
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot password?
              </a>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="flex items-center justify-center gap-3 text-gray-600">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 2L2 12h4v16h8v-8h4v8h8V12h4L16 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">Hinzah Solutions</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Admin Portal • Base Management System</p>
          </div>
        </div>
      </div>
    </>
  );
}