import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
      }
    }
  }
})
