// CardComponent.jsx
import React from 'react';

const CardComponent = ({ items }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-primary-gold border border-primary-gold hover:shadow-md transition duration-300 flex flex-col h-full"
        >
          {item.image && (
            <div className="mb-4 w-full h-48 overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover max-w-full"
              />
            </div>
          )}
          <h3 className="text-xl font-serif font-bold text-[#002d72] mb-3 break-words">{item.title}</h3>
          <div className="w-full h-px bg-primary-gold mb-3"></div>
          <p className="font-sans text-[#444] flex-grow break-words">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
