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

  useEffect(() => {
  if (!seoData) return;

  // --- Update <title> ---
  if (seoData.title) {
    document.title = seoData.title.trim();
  }

  const setMeta = (selector, attr, value) => {
    if (!value) return;

    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
      if (attr === "name") tag.setAttribute("name", selector.replace('meta[name="', '').replace('"]', ''));
      if (attr === "property") tag.setAttribute("property", selector.replace('meta[property="', '').replace('"]', ''));
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", value);
  };

  // --- Basic SEO ---
  setMeta('meta[name="description"]', "name", seoData.description);
  setMeta('meta[name="keywords"]', "name", seoData.keywords);

  // --- Open Graph (Facebook) ---
  setMeta('meta[property="og:title"]', "property", seoData.title);
  setMeta('meta[property="og:description"]', "property", seoData.description);
  setMeta('meta[property="og:image"]', "property", `${window.location.origin}${seoData.image || seoData.og_image}`);
  setMeta('meta[property="og:url"]', "property", window.location.href);

  // --- Twitter ---
  setMeta('meta[name="twitter:title"]', "name", seoData.title);
  setMeta('meta[name="twitter:description"]', "name", seoData.description);
  setMeta('meta[name="twitter:image"]', "name", `${window.location.origin}${seoData.image || seoData.twitter_image}`);

}, [seoData]);

  
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
      setSeoData(SeoService.getDefaultSeoData());
    }
    currentPathRef.current = location.pathname;
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

  // Destructure with fallback values to prevent errors if seoData is null/undefined
  const { 
    title: seoTitle = "All Is Well Hospital - Best Healthcare Services",
    description: seoDescription = "All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.",
    keywords: seoKeywords = "hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology",
    image: seoImage = '/aiwlogo.webp'
  } = seoData || {};

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
