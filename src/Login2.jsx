// // src/pages/Login.jsx
// 'use client';

// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('admin');
//   const [password, setPassword] = useState('admin');
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     if (login(username, password)) {
//       navigate('/dashboard');
//     } else {
//       setError('Invalid username or password');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <div className="bg-white rounded-3xl shadow-lg p-8">
//           <div className="text-center mb-8">
//             <h1 className="text-2xl font-bold text-gray-900">Super Admin Sign In</h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Please login to access the dashboard.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                 placeholder="admin"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                   placeholder="••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
//                 >
//                   {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                 </button>
//               </div>
//             </div>

//             {error && <p className="text-sm text-red-600">{error}</p>}

//             <button
//               type="submit"
//               className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700"
//             >
//               <Lock className="h-4 w-4" />
//               Secure Sign-in
//             </button>
//           </form>

//           <div className="mt-6 text-center text-xs text-gray-600">
//             <p>
//               <strong>Note:</strong> Use <code className="bg-gray-100 px-1 rounded">admin</code> /{' '}
//               <code className="bg-gray-100 px-1 rounded">admin</code>
//             </p>
//           </div>

//           <div className="mt-4 text-center">
//             <a href="#" className="text-xs text-red-600 hover:text-red-700">
//               Forgot password?
//             </a>
//           </div>
//         </div>

//         <div className="mt-8 text-center text-gray-400">
//           <div className="flex items-center justify-center gap-2">
//             <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
//               <path d="M16 2L2 12h4v16h8v-8h4v8h8V12h4L16 2z" />
//             </svg>
//             <span className="text-lg font-medium">Hinzah solutions</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
    
  //   if (!username.trim() || !password.trim()) {
  //     setError('Please enter both username and password');
  //     return;
  //   }

  //   setIsLoading(true);
    
  //   try {
  //     const result = await fectch ("http://192.168.0.5:8000/api/superadmin/login");
      
  //     if (result.success) {
  //       navigate('/dashboard');
  //         try {
  //     const result = await fectch ("http://192.168.0.5:8000/api/admin/home");
  //           console.log(result.data)
  //         }
  //         catch(err){
  //            console.error('Login error:', err);
  //         }
  //     } else {
  //       setError(result.error || 'Invalid credentials');
  //     }
  //   } catch (err) {
  //     setError('An error occurred. Please try again.');
  //     console.error('Login error:', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
    const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!username.trim() || !password.trim()) {
    setError('Please enter both username and password');
    return;
  }

  setIsLoading(true);

  try {
    // 1️⃣ LOGIN API (POST)
    const loginResponse = await fetch(
      'http://192.168.0.5:8000/api/admin/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    const loginResult = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(loginResult.message || 'Invalid credentials');
    }

    // ✅ Extract token & user
    const { token, user } = loginResult;

    // ✅ Store securely (better than localStorage = httpOnly cookie, but for now)
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));

    // 2️⃣ SECOND API (GET) — ADMIN HOME
    const homeResponse = await fetch(
      'http://192.168.0.5:8000/api/admin/home',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const homeResult = await homeResponse.json();

    if (!homeResponse.ok) {
      throw new Error('Failed to load dashboard');
    }

    console.log('Dashboard Data:', homeResult);

    // 3️⃣ NAVIGATE
    navigate('/dashboard');

  } catch (err) {
    console.error('Login error:', err);
    setError(err.message || 'Something went wrong');
  } finally {
    setIsLoading(false);
  }
};
 

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Super Admin Sign In</h1>
            <p className="text-sm text-gray-600 mt-1">
              Please login to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your username"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
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
                  Secure Sign-in
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-center">
            <a href="#" className="text-xs text-red-600 hover:text-red-700 hover:underline">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 2L2 12h4v16h8v-8h4v8h8V12h4L16 2z" />
            </svg>
            <span className="text-lg font-medium">Hinzah solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
}


// 'use client';

// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import toast, { Toaster } from 'react-hot-toast';

// export default function SuperAdminLogin() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       // Super Admin API endpoint
//       const response = await fetch("http://192.168.0.4:8000/api/company/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         console.error("❌ Server Error:", response.status, response.statusText);
//         toast.error("Server error: " + response.statusText);
//         return;
//       }

//       const result = await response.json();

//       console.log("🔥 Super Admin Login Response:", result);
//        setTimeout(() => {
//         navigate('/dashboard');
//       }, 1200);

//       if (!result.status) {
//         console.error("❌ Backend Message:", result.message);
//         toast.error(result.message || "Invalid username or password");
//         return;
//       }

//       // Add user_type to identify superadmin
//       const superAdminData = {
//         ...result.data,
//         user_type: 'superadmin'
//       };

//       // Save token and user data
//       localStorage.setItem("authToken", result.token);
//       localStorage.setItem("currentUser", JSON.stringify(superAdminData));

//       login(superAdminData);

//       toast.success("Super Admin Login successful!");
//       setTimeout(() => navigate("/dashboard"), 1200);

//     } catch (err) {
//       console.error("🚨 FETCH ERROR (Network/CORS/URL):", err.message);
//       toast.error("Network error — check API URL or connection");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <Toaster position="top-center" />

//       <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 flex items-center justify-center px-4">
//         <div className="max-w-md w-full">

//           <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-extrabold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
//                 HINZAH HRMS
//               </h1>
//               <p className="text-gray-600 mt-3 text-lg">Super Admin Login</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Full system access & management
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">

//               {/* Username */}
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-2">
//                   Super Admin Username
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//                   placeholder="e.g. superadmin"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-2">
//                   Master Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 outline-none transition"
//                     placeholder="Enter master password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-4 text-gray-500 hover:text-red-600 transition"
//                   >
//                     {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-red-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:from-red-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//               >
//                 {isLoading ? (
//                   <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Lock className="w-6 h-6" />
//                 )}
//                 {isLoading ? 'Signing in...' : 'Super Admin Sign In'}
//               </button>

//             </form>

//             {/* Switch to Admin Login */}
//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Regular admin?{' '}
//                 <a 
//                   href="/admin/login" 
//                   className="text-red-600 font-semibold hover:text-red-700 hover:underline"
//                 >
//                   Go to Admin Login
//                 </a>
//               </p>
//             </div>

//             {/* Demo Credentials (Optional) */}
//             <div className="mt-6 p-4 bg-red-50 rounded-2xl border border-red-200">
//               <p className="text-xs text-red-800 font-medium text-center">
//                 Super Admin credentials have higher privileges
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }