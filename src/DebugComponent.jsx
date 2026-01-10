'use client';

import { useAuth } from './AuthContext';
import { PERMISSION_CODES } from './AuthContext';

export default function DebugComponent() {
  const { user, permissions, getAllPermissions, hasPermission, getRawPermissions } = useAuth();
  const rawPermissions = getRawPermissions();
  
  // Get module counts
  const moduleCounts = rawPermissions?.permissions ? 
    Object.keys(rawPermissions.permissions).map(module => ({
      name: module,
      count: Object.keys(rawPermissions.permissions[module]).filter(
        perm => rawPermissions.permissions[module][perm]?.view === true
      ).length
    })) : [];

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md max-h-96 overflow-y-auto z-50">
      <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">Permissions Debug</h3>
      
      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">User:</p>
          <p className="text-gray-800 dark:text-white">{user?.company_name || 'No user'}</p>
          <p className="text-xs text-gray-400">{user?.company_code}</p>
        </div>
        
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Total Permission Codes:</p>
          <p className={`text-sm font-bold ${permissions.length > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {permissions.length}
          </p>
        </div>
        
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Module Access Counts:</p>
          <div className="flex flex-wrap gap-1 mt-1">
            {/* {moduleCounts.map((module, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded"
              >
                {module}: {module.count}
              </span>
            ))} */}
          </div>
        </div>
        
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">Key Permission Checks:</p>
          <div className="grid grid-cols-2 gap-1 mt-1">
            {Object.entries(PERMISSION_CODES).slice(0, 10).map(([name, code]) => (
              <div key={code} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-300">{name}:</span>
                <span className={`text-xs font-bold ${hasPermission(code) ? 'text-green-600' : 'text-red-600'}`}>
                  {hasPermission(code) ? '✓' : '✗'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <p className="font-medium text-gray-500 dark:text-gray-400">All Permission Codes:</p>
          <div className="flex flex-wrap gap-1 mt-1 max-h-32 overflow-y-auto">
            {permissions.map((perm, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded"
              >
                {perm}
              </span>
            ))}
            {permissions.length === 0 && (
              <span className="text-xs text-red-500">No permissions loaded!</span>
            )}
          </div>
        </div>
        
        <button
          onClick={() => {
            console.log('Debug Info:', {
              user,
              permissions,
              rawPermissions,
              localStorage: {
                token: localStorage.getItem('authToken'),
                userData: localStorage.getItem('userData'),
                userPermissions: localStorage.getItem('userPermissions'),
              }
            });
          }}
          className="mt-2 px-3 py-1 bg-orange-500 text-white text-xs rounded hover:bg-orange-600"
        >
          Log to Console
        </button>
      </div>
    </div>
  );
}