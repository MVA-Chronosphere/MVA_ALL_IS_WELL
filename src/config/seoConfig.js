// Configuration for SEO API endpoints
const seoConfig = {
 // Base URL for SEO API (update this to your PHP backend URL)
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/seo_backend',  // Default to local path for development
  
  // SEO API endpoints
 endpoints: {
    seoData: '/seo_api.php',      // Endpoint to fetch SEO data for a URL
    imageAlt: '/seo_api.php',     // Endpoint to fetch image alt text,
 },
  
  // Default SEO values
  defaults: {
    title: 'All Is Well Hospital - Best Healthcare Services',
    description: 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
    keywords: 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology',
    image: '/aiwlogo.webp'
  }
};

export default seoConfig;
