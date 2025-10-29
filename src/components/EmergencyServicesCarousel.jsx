import React, { useState, useEffect } from "react";

const EmergencyServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Services data for the carousel - with content
  const services = [
    {
      id: 1,
      type: "Ambulance Service",
      image: "/banners/Ambulance.jpg", // Using an appropriate image
      alt: "Emergency Ambulance Services",
      title: "Emergency Ambulance Services – Available 24x7",
      subtitle: "Reliable and Life-Saving Care",
      description: "Rapid Response Anytime, Anywhere\nEnsuring immediate medical assistance with trained staff and fully equipped ambulances.",
      contact: "We are just one call away - 90090 03022, 076977 44444"
    },
    {
      id: 2,
      type: "Pathology Lab",
      image: "/banners/pathology1.jpg",
      alt: "24x7 Pathology Lab",
      title: "24x7 Pathology Lab",
      subtitle: "Trusted Reports, Prompt Service",
      description: "Anytime Testing, Reliable Results\nExpert pathologists and advanced equipment ensure precise results, whenever you need them.",
      contact: "We are available 24 x 7 - 70890 33888"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % services.length);
    }, 500);
    
    return () => clearInterval(interval);
  }, [isPaused, services.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto overflow-hidden" style={{ height: '500px' }}>
      <div className="relative w-full h-full flex items-center justify-center" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
        {/* Slides */}
        <div className="absolute inset-0 w-full h-full flex transition-transform duration-50 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {services.map((service, index) => (
            <div key={service.id} className="w-full h-full flex-shrink-0 relative" style={{ width: '100%', height: '500px' }}>
              <img
                src={service.image}
                alt={service.alt}
                className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200"
                loading="lazy"
              />
              {/* Dark overlay to make text more readable while keeping image visible */}
              <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center px-8 z-10">
                <div className="text-center text-white max-w-2xl">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3 font-serif">{service.title}</h3>
                  <h4 className="text-xl md:text-2xl font-semibold mb-4 text-[#d4af37]">{service.subtitle}</h4>
                  <p className="text-sm md:text-base font-sans whitespace-pre-line mb-4">{service.description}</p>
                  <p className="text-2xl md:text-3xl font-bold text-[#d4af37]">{service.contact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 z-10 bg-white bg-opacity-70 shadow-md rounded-full p-2 hover:bg-opacity-90 transition-all duration-30 border border-gray-200"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#02d72]" fill="none" viewBox="0 0 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 z-10 bg-white bg-opacity-70 shadow-md rounded-full p-2 hover:bg-opacity-90 transition-all duration-300 border border-gray-200"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002d72]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 z-10 flex space-x-2">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-[#d4af37] w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyServicesCarousel;
