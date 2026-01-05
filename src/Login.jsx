// src/pages/Login.jsx
// 'use client';

// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('admin');
//   const [password, setPassword] = useState('admin');
//   const [comID,setComID] = useState("0001")
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
//             <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
//             <p className="text-sm text-gray-600 mt-1">
//               Please login to access the dashboard.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Company ID</label>
//               <input
//                 type="text"
//                 value={comID}
//                 onChange={(e) => setComID(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
//                 placeholder="admin"
//               />
//             </div>
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



// src/Login.jsx  


// 'use client';

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

  //   try {
  //     // Get all companies
  //     const saved = localStorage.getItem('companies');
  //     if (!saved) {
  //       toast.error('No company found. Please create one first.');
  //       setIsLoading(false);
  //       return;
  //     }

  //     const companies = JSON.parse(saved);
  //     const company = companies.find(c => c.companyId === companyId.trim());

  //     if (!company) {
  //       toast.error('Company ID not found');
  //       setIsLoading(false);
  //       return;
  //     }

  //     if (company.username !== username.trim()) {
  //       toast.error('Incorrect username');
  //       setIsLoading(false);
  //       return;
  //     }

  //     const correctPassword = company.password ? atob(company.password) : '';
  //     if (correctPassword !== password) {
  //       toast.error('Incorrect password');
  //       setIsLoading(false);
  //       return;
  //     }

  //     // SUCCESS! Login with full company data
  //     login(company); // This updates AuthContext + localStorage

  //     toast.success(
  //       <div className="flex items-center gap-3">
  //         <CheckCircle className="w-8 h-8 text-white" />
  //         <div>
  //           <p className="font-bold text-lg">Welcome back!</p>
  //           <p className="text-sm opacity-90">
  //             {company.username} • {company.companyId}
  //           </p>
  //         </div>
  //       </div>,
  //       {
  //         duration: 4000,
  //         style: {
  //           background: '#10b981',
  //           color: 'white',
  //           padding: '16px',
  //           borderRadius: '16px',
  //           fontSize: '16px',
  //         },
  //       }
  //     );

  //     // Smooth redirect
  //     setTimeout(() => {
  //       navigate('/dashboard');
  //     }, 1200);

  //   } catch (err) {
  //     toast.error('Login failed. Please try again.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Show company preview when typing Company ID
   
// In your Login.jsx handleSubmit function, update the login call:
// In Login.jsx handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Clear old data
  localStorage.removeItem('currentUser');
  localStorage.removeItem('authToken');
  localStorage.removeItem('tokenExpiry');

  try {
    // API call to login endpoint
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

    // Check if login was successful
    if (data.status === true && data.company) {
      // Use the login function with transformed data
      login(data.company, data.token);
      
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
          duration: 4000,
          style: {
            background: '#10b981',
            color: 'white',
            padding: '16px',
            borderRadius: '16px',
            fontSize: '16px',
          },
        }
      );

      // Redirect to saved path or dashboard
      const redirectPath = sessionStorage.getItem('redirectPath') || '/dashboard';
      sessionStorage.removeItem('redirectPath');
      
      setTimeout(() => {
        navigate(redirectPath, { replace: true });
      }, 1200);

    } else {
      // toast.error(data.message || 'Login failed. Please try again.');
    }

  } catch (err) {
    console.error('Login error:', err);
    
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      toast.error('Network error. Please check your internet connection.');
    } else {
      toast.error('Login failed. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
};

  // const previewCompany = (() => {
  //   if (!companyId) return null;
  //   const saved = localStorage.getItem('companies');
  //   if (!saved) return null;
  //   try {
  //     const companies = JSON.parse(saved);
  //     return companies.find(c => c.companyId === companyId);
  //   } catch {
  //     return null;
  //   }
  // })();

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

            {/* Demo Info */}
            {/* <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-200">
              <p className="text-xs text-orange-800 font-medium text-center">
                Demo: <strong>Company ID</strong> HINZAH2025 • <strong>Username</strong> admin • <strong>Password</strong> admin
              </p>
            </div> */}
          </div>

          {/* Company Preview at Bottom */}
          {/* <div className="mt-10 text-center">
            {previewCompany ? (
              <div className="flex flex-col items-center gap-4 animate-fadeIn">
                {previewCompany.logo ? (
                  <img
                    src={previewCompany.logo}
                    alt={previewCompany.username}
                    className="w-24 h-24 rounded-3xl shadow-2xl object-contain bg-white p-4 border-4 border-white"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                    {previewCompany.username[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{previewCompany.username}</h3>
                  <p className="text-sm text-gray-500">ID: {previewCompany.companyId}</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">
                <div className="w-20 h-20 mx-auto bg-gray-200 rounded-3xl flex items-center justify-center mb-3 shadow-lg">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
                <p className="text-xl font-medium">Hinzah Solutions</p>
                <p className="text-sm">Multi-Company HRMS</p>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
}



// 'use client';
// import React, { useState } from 'react';
// import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import toast, { Toaster } from 'react-hot-toast';

// export default function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   try {

//     // http://192.168.0.3:8000/api/employees
//     const response = await fetch("http://192.168.0.3:8000/api/admin/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     // If API cannot be reached (CORS, DNS, wrong URL)
//     if (!response.ok) {
//       console.error("❌ Server Error:", response.status, response.statusText);
//       toast.error("Server error: " + response.statusText);
//       return;
//     }

//     const result = await response.json();

//     console.log("🔥 API FULL RESPONSE:", result);

//     // Backend validation or auth error
//     if (!result.status) {
//       console.error("❌ Backend Message:", result.message);
//       toast.error(result.message || "Invalid username or password");
//       return;
//     }

//     // Save token
//     localStorage.setItem("authToken", result.token);
//     localStorage.setItem("adminData", JSON.stringify(result.data));

//     login(result.data);

//     toast.success("Login successful!");
//     setTimeout(() => navigate("/dashboard"), 1200);

//   } catch (err) {
//     console.error("🚨 FETCH ERROR (Network/CORS/URL):", err.message);
//     toast.error("Network error — check API URL or connection");
//   } finally {
//     setIsLoading(false);
//   }
// };

//   return (
//     <>
//       <Toaster position="top-center" />

//       <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
//         <div className="max-w-md w-full">

//           <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
//             <div className="text-center mb-8">
//               <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
//                 HINZAH HRMS
//               </h1>
//               <p className="text-gray-600 mt-3 text-lg">Admin Login</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">

//               {/* Username */}
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-2">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   className="w-full px-5 py-4 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition"
//                   placeholder="e.g. admin"
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-bold text-gray-700 mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full px-5 py-4 pr-14 border border-gray-300 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition"
//                     placeholder="Enter your password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-4 text-gray-500 hover:text-orange-600 transition"
//                   >
//                     {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl hover:from-orange-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
//               >
//                 {isLoading ? (
//                   <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
//                 ) : (
//                   <Lock className="w-6 h-6" />
//                 )}
//                 {isLoading ? 'Signing in...' : 'Secure Sign In'}
//               </button>

//             </form>

//             {/* Demo Credentials */}
//             <div className="mt-6 p-4 bg-orange-50 rounded-2xl border border-orange-200">
//               <p className="text-xs text-orange-800 font-medium text-center">
//                 Demo login: <strong>admin</strong> • <strong>password</strong>
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }
