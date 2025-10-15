import React from 'react';
import LoginForm from '../components/LoginForm';

const BlogLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            All Is Well Hospital
          </h1>
        </div>
      </div>
      <LoginForm />
    </div>
  );
};

export default BlogLoginPage;
