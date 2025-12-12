import React from 'react';
import SeoImage from './SeoImage';

const BoardMemberCard = ({ name, position, image, alt }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
      <div className="mx-auto mb-4 rounded-lg overflow-hidden shadow-md flex items-center justify-center bg-white border border-[#d4af37] w-full max-w-[400px] aspect-[4/5]">
        <SeoImage 
          src={image} 
          alt={alt || name}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">{name}</h3>
      <p className="text-[#444] font-sans">{position}</p>
    </div>
  );
};

export default BoardMemberCard;
