import React from 'react';
import SeoImage from './SeoImage';

const PatientStoryCard = ({ title, image, videoUrl, ctaText = "Watch Video" }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="h-56 md:h-64 overflow-hidden">
        <SeoImage
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 max-w-full"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 line-clamp-2">{title}</h3>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-700 font-medium hover:text-amber-600 transition-colors flex items-center gap-1"
        >
          {ctaText} →
        </a>
      </div>
    </div>
  );
};

export default PatientStoryCard;
