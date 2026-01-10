import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  const location = useLocation();
  const requiredPermissions = location.state?.requiredPermissions || [];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-red-100 rounded-full">
          <svg className="w-10 h-10 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Access Denied</h1>
        
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        
        {requiredPermissions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-medium text-gray-700 mb-2">Required Permissions:</p>
            <div className="flex flex-wrap gap-2">
              {requiredPermissions.map((perm, index) => (
                <span 
                  key={index}
                  className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
                >
                  {perm}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}