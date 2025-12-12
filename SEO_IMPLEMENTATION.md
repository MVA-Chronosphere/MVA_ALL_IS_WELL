# SEO and Image Alt Text Implementation

## Overview

This implementation provides comprehensive SEO optimization and dynamic image alt text functionality for the All Is Well Hospital website. The solution integrates both frontend and backend components to ensure proper SEO from the start.

## Components

### 1. SeoImage Component (`src/components/SeoImage.jsx`)

The `SeoImage` component is a drop-in replacement for standard `<img>` tags that automatically fetches and applies appropriate alt text from the backend.

#### Features:
- Dynamically fetches alt text from the backend API
- Provides fallback alt text if none is found in the database
- Includes a loading state for better UX
- Supports all standard image props

#### Usage:
```jsx
import SeoImage from '../components/SeoImage';

<SeoImage
 src="/path/to/image.webp"
  className="your-classes"
  loading="lazy"
  // other img props...
/>
```

### 2. SeoService (`src/services/SeoService.js`)

Handles communication with the backend SEO API to fetch both page SEO data and image alt text.

#### Key Functions:
- `getSeoData(path)` - Fetches SEO data for a specific page
- `getImageAltText(imagePath)` - Fetches alt text for a specific image

### 3. SeoManager Component (`src/components/SeoManager.jsx`)

Manages dynamic SEO updates for each page, including title, meta description, keywords, and Open Graph tags.

### 4. Backend API (`seo_backend/seo_api.php`)

Handles all SEO data operations including:
- Storing and retrieving page SEO data
- Storing and retrieving image alt text
- Hierarchical URL matching for SEO inheritance

## Implementation Details

### Image Alt Text Strategy

1. **Database Lookup**: First tries to fetch alt text from the backend database
2. **Fallback Generation**: If no specific alt text is found, generates appropriate alt text based on image path
3. **Default Fallback**: If all else fails, uses a generic "All Is Well Hospital Image" alt text

### SEO Inheritance

The backend implements hierarchical SEO inheritance:
- Specific page URLs inherit from parent URLs if no specific SEO data exists
- Default SEO values are used if no parent data is found

## Files Updated

The following files have been updated to implement the SEO and image alt text functionality:

1. `src/components/Header.jsx` - Replaced `<img>` tags with `<SeoImage>`
2. `src/components/Footer.jsx` - Replaced `<img>` tags with `<SeoImage>`
3. `src/pages/HomePage.jsx` - Replaced `<img>` and `<motion.img>` tags with `<SeoImage>`
4. `src/App.jsx` - Ensures all routes are wrapped with SeoManager
5. `seo_backend/initialize_image_alt_data.php` - Script to initialize image alt text data

## Database Schema

The backend uses the following tables:

### `seo_data`
- `id`: Primary key
- `page_url`: URL path for the page
- `title`, `description`, `keywords`: Standard SEO fields
- `og_*` and `twitter_*` fields: Open Graph and Twitter card data

### `image_alt_text`
- `id`: Primary key
- `image_path`: Path to the image file
- `alt_text`: Alt text for the image
- `page_url`: Optional page association

## Usage

To implement SEO-optimized images throughout the application:

1. Import the `SeoImage` component
2. Replace standard `<img>` tags with `<SeoImage>` components
3. The component will automatically handle alt text retrieval

For new pages, ensure they are wrapped with the `SeoManager` component to get dynamic SEO updates.

## Testing

The implementation has been tested with:
- Various image types (logos, service images, photos)
- Different page routes
- Fallback scenarios when alt text is not available in the database
- SEO tag updates on page navigation
