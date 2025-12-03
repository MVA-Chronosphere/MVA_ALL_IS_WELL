# SEO Management API Documentation

This API allows the CMS dashboard to manage SEO content for the All Is Well Hospital website.

## Base URL
`http://localhost/seo_backend/seo_api.php` (for local testing)
`https://yourdomain.com/seo_backend/seo_api.php` (for production)

## Authentication
The API requires authentication for write operations. The default login credentials are:
- Username: `admin`
- Password: `admin123`

## API Endpoints

### Authentication

#### POST `/login`
Authenticate a user to get access to write operations.

**Request:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": 1,
    "username": "admin"
  }
}
```

### SEO Data Management

#### GET `/page/{page_url}` or `?url={page_url}`
Get SEO data for a specific page.

**Response:**
```json
{
  "success": true,
  "message": "SEO data retrieved successfully",
  "data": {
    "id": 1,
    "page_url": "/about",
    "title": "About Us - All Is Well Hospital",
    "description": "Learn about All Is Well Hospital...",
    "keywords": "about hospital, healthcare services",
    "og_title": "About Us - All Is Well Hospital",
    "og_description": "Learn about All Is Well Hospital...",
    "og_image": "/about-image.jpg",
    "twitter_title": "About Us - All Is Well Hospital",
    "twitter_description": "Learn about All Is Well Hospital...",
    "twitter_image": "/about-image.jpg",
    "created_at": "2023-01-01 10:00:00",
    "updated_at": "2023-01-01 10:00"
  }
}
```

#### GET `/all`
Get all SEO data entries.

#### POST `/seo`
Add or update SEO data for a page.

**Request:**
```json
{
  "page_url": "/about",
  "title": "About Us - All Is Well Hospital",
  "description": "Learn about All Is Well Hospital...",
  "keywords": "about hospital, healthcare services",
  "og_title": "About Us - All Is Well Hospital",
  "og_description": "Learn about All Is Well Hospital...",
  "og_image": "/about-image.jpg",
  "twitter_title": "About Us - All Is Well Hospital",
  "twitter_description": "Learn about All Is Well Hospital...",
  "twitter_image": "/about-image.jpg"
}
```

#### PUT `/seo`
Update SEO data for a page.

**Request:**
```json
{
  "page_url": "/about",
  "title": "About Us - All Is Well Hospital",
  "description": "Learn about All Is Well Hospital...",
  "keywords": "about hospital, healthcare services",
  "og_title": "About Us - All Is Well Hospital",
  "og_description": "Learn about All Is Well Hospital...",
  "og_image": "/about-image.jpg",
  "twitter_title": "About Us - All Is Well Hospital",
  "twitter_description": "Learn about All Is Well Hospital...",
  "twitter_image": "/about-image.jpg"
}
```

#### DELETE `/seo/{page_url}` or with body
Delete SEO data for a page.

**Request:**
```json
{
  "page_url": "/about"
}
```

### Image Alt Text Management

#### GET `/image-alt/{image_path}` or `?path={image_path}`
Get alt text for a specific image.

**Response:**
```json
{
  "success": true,
  "message": "Image alt text retrieved successfully",
  "data": {
    "id": 1,
    "image_path": "/images/doctor.jpg",
    "alt_text": "Doctor examining patient",
    "page_url": "/find-doctor",
    "created_at": "2023-01-01 10:00",
    "updated_at": "2023-01-01 10:00:00"
  }
}
```

#### POST `/image-alt`
Add or update alt text for an image.

**Request:**
```json
{
  "image_path": "/images/doctor.jpg",
  "alt_text": "Doctor examining patient",
  "page_url": "/find-doctor"
}
```

#### PUT `/image-alt`
Update alt text for an image.

**Request:**
```json
{
  "image_path": "/images/doctor.jpg",
  "alt_text": "Doctor examining patient",
  "page_url": "/find-doctor"
}
```

#### DELETE `/image-alt/{image_path}` or with body
Delete alt text for an image.

**Request:**
```json
{
 "image_path": "/images/doctor.jpg"
}
```

## Database Structure

### seo_data table
- id: INT (PRIMARY KEY, AUTO_INCREMENT)
- page_url: VARCHAR(500) NOT NULL UNIQUE
- title: VARCHAR(500) NOT NULL
- description: TEXT
- keywords: TEXT
- og_title: VARCHAR(50)
- og_description: TEXT
- og_image: VARCHAR(500)
- twitter_title: VARCHAR(500)
- twitter_description: TEXT
- twitter_image: VARCHAR(500)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

### image_alt_text table
- id: INT (PRIMARY KEY, AUTO_INCREMENT)
- image_path: VARCHAR(500) NOT NULL UNIQUE
- alt_text: TEXT
- page_url: VARCHAR(50)
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
- updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

### users table
- id: INT (PRIMARY KEY, AUTO_INCREMENT)
- username: VARCHAR(100) NOT NULL UNIQUE
- password: VARCHAR(255) NOT NULL
- email: VARCHAR(100) NOT NULL UNIQUE
- created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP

## Setup Instructions

1. Upload all files to your web server
2. Update the database credentials in `config.php`
3. Run `init_db.php` to create the database and tables (delete after use for security)
4. Update your React app to use the correct API URL in `seoConfig.js`

## Security Notes

- Remove or secure the `init_db.php` file after database creation
- Change the default admin password
- Use HTTPS in production
- Implement proper authentication tokens in production
