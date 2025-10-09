import React from 'react';

const NewsBanner = ({ title, image, ctaText = "Read more" }) => {
  return (
    <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="p-8 bg-white">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{title}</h3>
        <a
          href="#"
          className="inline-block px-6 py-3 bg-amber-700 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
};

export default NewsBanner;