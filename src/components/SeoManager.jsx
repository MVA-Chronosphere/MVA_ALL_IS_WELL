import { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import SeoService from '../services/SeoService';

// This component will handle dynamic SEO updates
// It fetches SEO data from your PHP backend based on the current path
const SeoManager = ({ children }) => {
  const location = useLocation();
  const [seoData, setSeoData] = useState({
    title: "All Is Well Hospital - Best Healthcare Services",
    description: "All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.",
    keywords: "hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology",
    image: '/aiwlogo.webp'
  });
  
  // Use ref to prevent duplicate requests for the same path
  const currentPathRef = useRef(location.pathname);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchSeoData = async () => {
      // Only fetch if the path has actually changed
      if (location.pathname !== currentPathRef.current) {
        try {
          const data = await SeoService.getSeoData(location.pathname);
          setSeoData(data);
          currentPathRef.current = location.pathname; // Update the ref with the new path
        } catch (error) {
          console.error('Error fetching SEO data:', error);
          // Use default data if there's an error
          setSeoData(SeoService.getDefaultSeoData());
          currentPathRef.current = location.pathname; // Update the ref even on error
        }
      }
    };

    // On initial mount, we always fetch, but on subsequent route changes, we check if it's a new path
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchSeoData();
      currentPathRef.current = location.pathname;
    } else if (location.pathname !== currentPathRef.current) {
      fetchSeoData();
    }
  }, [location.pathname]);

  const { title: seoTitle, description: seoDescription, keywords: seoKeywords, image: seoImage } = seoData;

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {seoImage && <meta property="og:image" content={`${window.location.origin}${seoImage}`} />}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={window.location.href} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        {seoImage && <meta property="twitter:image" content={`${window.location.origin}${seoImage}`} />}
        
        {/* Ensure these are updated properly */}
        <meta property="og:site_name" content="All Is Well Hospital" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      {children}
    </>
  );
};

export default SeoManager;
