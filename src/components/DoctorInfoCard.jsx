// src/components/DoctorInfoCard.jsx
import React from 'react';

const DoctorInfoCard = ({ image, title, description, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-primary-gold border border-primary-gold hover:shadow-md transition duration-300 flex flex-col h-full w-full max-w-xs mx-auto overflow-hidden">
      {/* Responsive image container with fixed aspect ratio */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover max-w-full"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
          }}
        />
      </div>

      {/* Content area with consistent padding */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow overflow-hidden">
        <h3 className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#002d72] mb-1 sm:mb-2 line-clamp-1">
          {title}
        </h3>
        <div className="w-full h-px bg-primary-gold mb-1 sm:mb-2"></div>
        <p className="font-sans text-[#444] text-xs sm:text-sm flex-grow line-clamp-2 sm:line-clamp-3 overflow-hidden mb-2 sm:mb-3">
          {description}
        </p>
        {onBookClick && (
          <button
            onClick={onBookClick}
            className="mt-2 sm:mt-3 bg-primary-gold hover:bg-primary-gold/90 text-white px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition"
          >
            Book
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorInfoCard;
