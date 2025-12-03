# Testing Instructions for SEO Management System

## Local Testing Setup

### 1. Prepare Your Environment
- Make sure XAMPP is installed and running on your local machine
- Start Apache and MySQL services in XAMPP control panel

### 2. Set Up the PHP Backend
- Copy the `seo_backend` folder to your XAMPP htdocs directory:
  - Windows: `C:\xampp\htdocs\seo_backend\`
  - Mac: `/Applications/XAMPP/htdocs/seo_backend/`
  - Linux: `/opt/lampp/htdocs/seo_backend/`

### 3. Create the Database
- Option A: Use phpMyAdmin
  1. Open your browser and go to `http://localhost/phpmyadmin`
  2. Click "New" to create a new database
  3. Name it `seo_management` and click "Create"

- Option B: Run the initialization script
 1. Open your browser and go to `http://localhost/seo_backend/init_db.php`
  2. This will create the database and all required tables
  3. It will also create a default admin user (username: admin, password: admin123)

### 4. Configure Database Connection
- Open `seo_backend/config.php` 
- Update the database credentials if needed (default XAMPP settings should work):
  - DB_HOST: localhost
 - DB_USER: root
  - DB_PASS: (empty)
  - DB_NAME: seo_management

### 5. Test the API Endpoints
- Test getting SEO data: `http://localhost/seo_backend/seo_api.php/page/`
- Test getting all SEO data: `http://localhost/seo_backend/seo_api.php/all`
- Test the login endpoint with POST request to: `http://localhost/seo_backend/seo_api.php/login`

### 6. Update Frontend Configuration
- The React app is already configured to connect to the local backend
- The default API URL in `src/config/seoConfig.js` is set to `/seo_backend`

### 7. Start the React Development Server
- Make sure your React development server is running (you should already have this from earlier)
- If not, run `npm run dev` in your project directory

### 8. Testing the Full Integration
1. Open your browser and go to your React app (likely `http://localhost:5173/`)
2. Navigate to different pages and check:
   - The page title changes appropriately
   - Meta tags are updated (inspect the page source)
   - The SeoManager component is fetching data
3. Add some SEO data through the API (or manually in the database) and verify it appears on the frontend

### 9. API Testing Examples
- To add/update SEO data:
  ```
  POST http://localhost/seo_backend/seo_api.php/seo
 Content-Type: application/json
  
  {
    "page_url": "/test-page",
    "title": "Test Page - All Is Well Hospital",
    "description": "This is a test page for SEO",
    "keywords": "test, seo, hospital"
  }
  ```

- To get SEO data for a page:
  ```
  GET http://localhost/seo_backend/seo_api.php/page/test-page
  ```

### 10. Troubleshooting
- If the frontend can't connect to the backend, check that both Apache and MySQL are running
- Verify that the database credentials in `config.php` are correct
- Check the browser console for any CORS or network errors
- Ensure the database tables were created properly

The system is designed with fallbacks, so even if the backend is not accessible, the frontend will continue to work with default SEO values.
