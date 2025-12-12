import React from 'react';
import SeoImage from './SeoImage';

const ServiceCard = ({ title, description, image, ctaText = "Read more" }) => {
  return (
    <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8">
      <div className="md:w-1/2 h-64 md:h-auto">
        <SeoImage
          src={image}
          alt={title}
          className="w-full h-full object-cover max-w-full"
        />
      </div>
      <div className="p-8 md:w-1/2 flex flex-col justify-center bg-gray-50">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-gray-700 mb-6 flex-grow">{description}</p>
        <a
          href="#"
          className="text-amber-700 font-semibold hover:text-amber-600 transition-colors flex items-center gap-1"
        >
          {ctaText} →
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
