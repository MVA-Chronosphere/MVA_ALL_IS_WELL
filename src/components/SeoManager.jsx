import { useEffect, useState, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import SeoService from '../services/SeoService';
import StructuredData from './StructuredData';

// This component will handle dynamic SEO updates
// It fetches SEO data from your PHP backend based on the current path
const SeoManager = ({ children }) => {
  const location = useLocation();
 const [seoData, setSeoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  
  // Use ref to prevent duplicate requests for the same path
  const currentPathRef = useRef(location.pathname);
  const isInitialMount = useRef(true);

 useEffect(() => {
    const fetchSeoData = async () => {
      if (location.pathname !== currentPathRef.current) {
        try {
          const data = await SeoService.getSeoData(location.pathname);
          setSeoData(data);
        } catch (error) {
          console.error('Error fetching SEO data:', error);
          setSeoData(SeoService.getDefaultSeoData(location.pathname));
        }
        currentPathRef.current = location.pathname;
      }
    };


    // On initial mount, we always fetch, but on subsequent route changes, we check if it's a new path
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchSeoData().finally(() => setIsLoading(false));
      currentPathRef.current = location.pathname;
    } else if (location.pathname !== currentPathRef.current) {
      fetchSeoData().finally(() => setIsLoading(false));
    }
  }, [location.pathname]);

  // Destructure with fallback values to prevent errors if seoData is null/undefined
  const { 
    title: seoTitle = "All Is Well Hospital - Best Healthcare Services",
    description: seoDescription = "All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.",
    keywords: seoKeywords = "hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology",
    image: seoImage = '/aiwlogo.webp'
  } = seoData || {};

  // Memoize structured data type to prevent unnecessary re-renders
  const structuredDataType = useMemo(() => {
    if (location.pathname.startsWith('/doctor/')) {
      return 'Doctor';
    } else if (location.pathname === '/' || location.pathname === '/about') {
      return 'MedicalOrganization';
    } else {
      return 'WebPage';
    }
  }, [location.pathname]);

  // Memoize normalized URL to prevent unnecessary re-calculations
  const canonicalUrl = useMemo(() => {
    try {
      const urlObj = new URL(`${window.location.origin}${location.pathname}`);
      // Only add trailing slash for homepage
      if (urlObj.pathname === '/') {
        urlObj.pathname = '/';
      } else {
        // Remove trailing slash for all other paths
        urlObj.pathname = urlObj.pathname.replace(/\/$/, '');
      }
      // Remove query parameters and fragments for canonical URL
      urlObj.search = '';
      urlObj.hash = '';
      return urlObj.toString();
    } catch (e) {
      // If URL parsing fails, return the original URL
      return `${window.location.origin}${location.pathname}`;
    }
  }, [location.pathname]);
  
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        {seoImage && <meta property="og:image" content={`${window.location.origin}${seoImage}`} />}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={canonicalUrl} />
        <meta property="twitter:title" content={seoTitle} />
        <meta property="twitter:description" content={seoDescription} />
        {seoImage && <meta property="twitter:image" content={`${window.location.origin}${seoImage}`} />}
        
        {/* Ensure these are updated properly */}
        <meta property="og:site_name" content="All Is Well Hospital" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <StructuredData type={structuredDataType} data={seoData} />
      {children}
    </>
  );
};

export default SeoManager;
