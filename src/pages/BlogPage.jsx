import React from 'react';
import BlogForm from '../components/BlogForm';
import BlogSection from '../components/BlogSection';
import { useAuth } from '../contexts/AuthContext';

const BlogPage = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with logout button */}
      <div className="py-4 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Hospital Blog Management
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {currentUser?.name || currentUser?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogForm />
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSection showViewAllButton={false} />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
