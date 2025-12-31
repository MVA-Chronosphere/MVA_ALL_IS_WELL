// YoutubeLazyLoader.jsx
// Component for lazy loading YouTube videos with cookie consent

import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

const YoutubeLazyLoader = ({ videoId, title, className = '', onPlay }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showConsentBanner, setShowConsentBanner] = useState(false);
  const iframeRef = useRef(null);

  // Check if user has already given consent
  useEffect(() => {
    const consent = localStorage.getItem('youtube-consent');
    if (consent === 'granted') {
      setIsLoaded(true);
    } else if (consent === 'denied') {
      setShowConsentBanner(true);
    }
  }, []);

  const handleLoadVideo = () => {
    // Check if user has already given consent
    const consent = localStorage.getItem('youtube-consent');
    
    if (consent === 'granted') {
      setIsLoaded(true);
      setShowPreview(false);
      if (onPlay) onPlay();
      return;
    }
    
    // Show consent banner if not yet consented
    setShowConsentBanner(true);
  };

  const acceptConsent = () => {
    localStorage.setItem('youtube-consent', 'granted');
    setIsLoaded(true);
    setShowPreview(false);
    setShowConsentBanner(false);
    if (onPlay) onPlay();
  };

  const declineConsent = () => {
    localStorage.setItem('youtube-consent', 'denied');
    setShowConsentBanner(false);
    setShowPreview(false);
  };

  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  if (isLoaded) {
    return (
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-full ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {showPreview && (
        <div className="relative w-full h-full cursor-pointer group">
          <img
            src={getThumbnailUrl(videoId)}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all duration-300">
            <div className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full transition-all duration-300 transform group-hover:scale-110">
              <Play size={32} />
            </div>
          </div>
          
          <button
            onClick={handleLoadVideo}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={`Play video: ${title}`}
          />
        </div>
      )}
      
      {showConsentBanner && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4 text-center text-white">
          <h3 className="text-xl font-bold mb-2">YouTube Video Consent</h3>
          <p className="mb-4">
            This video uses YouTube cookies. By clicking "Accept", you agree to 
            YouTube's privacy policy and consent to third-party cookies.
          </p>
          <div className="flex gap-3">
            <button
              onClick={acceptConsent}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              Accept
            </button>
            <button
              onClick={declineConsent}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutubeLazyLoader;
