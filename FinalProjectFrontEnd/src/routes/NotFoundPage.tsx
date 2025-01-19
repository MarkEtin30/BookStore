// src/pages/NotFoundPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-8 rounded-xl shadow-lg w-full sm:w-96">
        <div className="text-center">
          {/* Icon or Image */}
          <div className="text-6xl text-white mb-4">
            <i className="fas fa-exclamation-triangle"></i> {/* You can replace this with any icon */}
          </div>

          {/* Main title */}
          <h1 className="text-4xl font-bold text-white mb-4">404 Not Found</h1>

          {/* Main message */}
          <p className="text-lg text-white mb-4">
            Oops! The page you're looking for does not exist.
          </p>

          {/* Instructions */}
          <p className="text-lg text-gray-200 mb-6">
            It may have been moved or deleted. Try navigating back to the homepage.
          </p>

          {/* Button to redirect to home */}
          <Link
            to="/"
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full transition duration-300"
          >
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
