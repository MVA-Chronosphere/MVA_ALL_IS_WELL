# SeoManager Component

The `SeoManager` component is responsible for managing all SEO-related meta tags, titles, and descriptions throughout the application. It dynamically updates these elements based on the current page using data fetched from the backend.

## Features

- Dynamic page titles
- Meta descriptions
- Meta keywords
- Open Graph (OG) tags for social sharing
- Twitter card tags
- Image alt text management (planned)

## How It Works

1. The component uses `useLocation` from React Router to detect the current URL
2. It fetches SEO data from the backend based on the current path
3. It updates the document head with the appropriate meta tags
4. It includes fallback mechanisms in case of API failures

## Backend Integration

The SEO data is fetched from your PHP/MySQL backend through API endpoints:
- `/api/seo-data.php` - Fetches SEO data for a specific URL
- `/api/image-alt.php` - Fetches alt text for images (planned)

## Usage

The `SeoManager` component is wrapped around each route in `App.jsx`:

```jsx
<Route path="/" element={<SeoManager><HomePage /></SeoManager>} />
```

## Configuration

SEO configuration is managed in `src/config/seoConfig.js` where you can update API endpoints and default values.

## Future Enhancements

- Integration with your marketing dashboard for dynamic content updates
- Image alt text API integration
- Advanced schema markup support
- Analytics integration for SEO performance tracking
