// src/pages/NotAuthorizedPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 rounded-xl shadow-lg w-full sm:w-96">
        <div className="text-center">
          {/* Icon or Image */}
          <div className="text-6xl text-white mb-4">
            <i className="fas fa-lock"></i> {/* You can replace this with any icon */}
          </div>

          {/* Main title */}
          <h1 className="text-4xl font-bold text-white mb-4">401 Unauthorized</h1>

          {/* Main message */}
          <p className="text-lg text-white mb-4">
            You do not have permission to view this page.
          </p>

          {/* Instructions */}
          <p className="text-lg text-gray-200 mb-6">
            Please check your login credentials or contact the administrator.
          </p>

          {/* Button to redirect to login */}
      
        </div>
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
