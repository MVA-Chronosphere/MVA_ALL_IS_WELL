import React, { useState } from 'react';

const ReadMoreSection = ({ children, initialCollapsedHeight = 280 }) => {
  const [expanded, setExpanded] = useState(false);

  const ReadMoreToggle = ({ expanded, onClick }) => (
    <div className="mt-6 flex flex-col items-center">
      <button
        onClick={onClick}
        className="uppercase tracking-[0.35em] text-xs md:text-sm text-blue-800 hover:text-blue-600 transition-colors"
      >
        {expanded ? "Show Less" : "Read More"}
      </button>
      <div className="mt-2 h-px w-24 bg-blue-800/80" />
    </div>
  );

  const ContentClamp = ({ expanded, collapsedHeight, children }) => {
    const maskedStyle = !expanded
      ? {
          WebkitMaskImage: "linear-gradient(180deg, #000 65%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(180deg, #000 65%, rgba(0,0,0,0) 100%)",
        }
      : undefined;
    
    return (
      <div className="relative">
        <div
          className="transition-[max-height] duration-500 ease-out overflow-hidden"
          style={{ 
            maxHeight: expanded ? 2000 : collapsedHeight, 
            ...maskedStyle 
          }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <div>
      <ContentClamp expanded={expanded} collapsedHeight={initialCollapsedHeight}>
        {children}
      </ContentClamp>
      <ReadMoreToggle 
        expanded={expanded} 
        onClick={() => setExpanded(!expanded)} 
      />
    </div>
  );
};

export default ReadMoreSection;