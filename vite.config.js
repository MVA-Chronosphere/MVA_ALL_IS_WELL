import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-vendor': ['framer-motion', 'lucide-react'],
          'seo-vendor': ['react-helmet-async'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true
  },
  server: {
    proxy: {
      '/seo_backend': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        // Rewrite the URL to decode encoded paths
        rewrite: (path) => {
          // Decode URL-encoded characters
          return path.replace(/%2F/g, '/');
        }
      },
      // Also proxy direct API calls to seo_api.php
      '/seo_api.php': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => {
          return path.replace(/%2F/g, '/');
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react/jsx-runtime']
  }
})
