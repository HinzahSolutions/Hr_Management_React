

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); // This is the key!
  const navigate = useNavigate();


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // Clear old data
//   localStorage.removeItem('currentUser');
//   localStorage.removeItem('authToken');
//   localStorage.removeItem('tokenExpiry');

//   try {
//     // API call to login endpoint
//     const response = await fetch('https://hr.hinzah.com/api/company/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         company_code: companyId.trim(),
//         username: username.trim(),
//         password: password
//       }),
//     });

//     const data = await response.json();
//     console.log('Login Response:', data);

//     if (!response.ok || !data.status) {
//       toast.error(data.message || `Login failed (Status: ${response.status})`);
//       setIsLoading(false);
//       return;
//     }

//     // Check if login was successful
//     if (data.status === true && data.company) {
//       // Use the login function with transformed data
//       login(data.company, data.token);
      
//       toast.success(
//         <div className="flex items-center gap-3">
//           <CheckCircle className="w-8 h-8 text-white" />
//           <div>
//             <p className="font-bold text-lg">Welcome to {data.company.company_name}!</p>
//             <p className="text-sm opacity-90">
//               {data.company.username} • {data.company.company_code}
//             </p>
//           </div>
//         </div>,
//         {
//           duration: 4000,
//           style: {
//             background: '#10b981',
//             color: 'white',
//             padding: '16px',
//             borderRadius: '16px',
//             fontSize: '16px',
//           },
//         }
//       );

//       // Redirect to saved path or dashboard
//       const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
//       sessionStorage.removeItem('redirectPath');
      
//       setTimeout(() => {
//         navigate(redirectPath, { replace: true });
//       }, 1200);

//     } else {
//       // toast.error(data.message || 'Login failed. Please try again.');
//     }

//   } catch (err) {
//     console.error('Login error:', err);
    
//     if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
//       toast.error('Network error. Please check your internet connection.');
//     } else {
//       toast.error('Login failed. Please try again.');
//     }
//   } finally {
//     setIsLoading(false);
//   }
// };
  

  // In your Login.js, update the handleSubmit function:
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Clear old data
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');
  localStorage.removeItem('permissions');

  try {
    const response = await fetch('https://hr.hinzah.com/api/company/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company_code: companyId.trim(),
        username: username.trim(),
        password: password
      }),
    });

    const data = await response.json();
    console.log('Login Response:', data);

    if (!response.ok || !data.status) {
      toast.error(data.message || `Login failed (Status: ${response.status})`);
      setIsLoading(false);
      return;
    }

    if (data.status === true && data.company) {
      // Use the login function
      const loginSuccess = await login(data.company, data.token);
      
      if (!loginSuccess) {
        setIsLoading(false);
        return;
      }
      
      toast.success(
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-white" />
          <div>
            <p className="font-bold text-lg">Welcome to {data.company.company_name}!</p>
            <p className="text-sm opacity-90">
              {data.company.username} • {data.company.company_code}
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
      setTimeout(() => {
        const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
        sessionStorage.removeItem('redirectPath');
        console.log('Redirecting to:', redirectPath);
        navigate(redirectPath, { replace: true });
      }, 1000);

    } else {
      toast.error(data.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }

  } catch (err) {
    console.error('Login error:', err);
    
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      toast.error('Network error. Please check your internet connection.');
    } else {
      toast.error('Login failed. Please try again.');
    }
    setIsLoading(false);
  }
};

  return (
    <>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                 HRMS
              </h1>
              <p className="text-gray-600 mt-3 text-lg">Sign in to your company</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company ID */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Company ID</label>
                <input
                  type="text"
                  required
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-gray-800"
                  placeholder="e.g. HINZAH2025"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                  placeholder="e.g. admin"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition"
                    placeholder="Enter your password"
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-300 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:from-blue-600 hover:to-blue-900 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Lock className="w-6 h-6" />
                )}
                {isLoading ? 'Signing in...' : 'Secure Sign In'}
              </button>
            </form>

      
          </div>

        </div>
      </div>
    </>
  );
}

