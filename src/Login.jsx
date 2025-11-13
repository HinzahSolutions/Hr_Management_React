// src/pages/Login.jsx
'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (login(username, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
            <p className="text-sm text-gray-600 mt-1">
              Please login to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700"
            >
              <Lock className="h-4 w-4" />
              Secure Sign-in
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-600">
            <p>
              <strong>Note:</strong> Use <code className="bg-gray-100 px-1 rounded">admin</code> /{' '}
              <code className="bg-gray-100 px-1 rounded">admin</code>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-red-600 hover:text-red-700">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L2 12h4v16h8v-8h4v8h8V12h4L16 2z" />
            </svg>
            <span className="text-lg font-medium">Horilla.</span>
          </div>
        </div>
      </div>
    </div>
  );
}