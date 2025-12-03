import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          padding: '16px',
          background: '#ffffff',
          color: '#333333',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0.1)',
        },
        success: {
          style: {
            border: '1px solid #10b981',
            background: '#f0fdf4',
          },
        },
        error: {
          style: {
            border: '1px solid #ef4444',
            background: '#fef2f2',
          },
        },
        loading: {
          style: {
            border: '1px solid #3b82f6',
            background: '#eff6ff',
          },
        },
      }}
    />
  );
};

export default ToastContainer;
