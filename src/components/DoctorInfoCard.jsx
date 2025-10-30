// src/components/DoctorInfoCard.jsx
import React from 'react';

const DoctorInfoCard = ({ image, title, description, onBookClick }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 flex-col h-full w-full max-w-[280px] mx-auto overflow-hidden flex flex-col">
      {/* Responsive image container with fixed aspect ratio */}
      <div className="w-full aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover max-w-full"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.webp";
          }}
        />
      </div>

      {/* Content area with consistent padding */}
      <div className="p-3 flex flex-col flex-grow overflow-hidden flex-1">
        <h3 className="text-sm font-serif font-bold text-[#002d72] mb-1 line-clamp-1">
          {title}
        </h3>
        <div className="w-full h-px bg-[#d4af37] mb-1"></div>
        <p className="font-sans text-[#444] text-xs flex-grow line-clamp-2 overflow-hidden mb-2">
          {description}
        </p>
        {onBookClick && (
          <button
            onClick={onBookClick}
            className="mt-auto bg-[#d4af37] hover:bg-[#c0992a] text-white px-2 py-1 rounded-full text-xs font-medium transition"
          >
            Book Appointment
          </button>
        )}
      </div>
    </div>
  );
};

export default DoctorInfoCard;
