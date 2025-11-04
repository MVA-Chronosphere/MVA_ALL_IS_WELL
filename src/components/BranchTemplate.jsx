import React, { useState } from 'react';
import HealthPackages from './HealthPackages';

const BranchTemplate = ({ 
  branchName, 
  location, 
  services = [], 
  contactInfo = {}, 
  healthPackages = [],
  opdInfo = [],
  ambulanceService = {},
  busService = {},
  galleryImages = [],
  mapLocation = ""
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (imageIndex) => {
    setSelectedImage(imageIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  const prevImage = () => {
    if (selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-serif text-[#002d72] mb-4">Trust, Quality and Care</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72] leading-tight mb-4">
              {branchName}
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <div className="text-xl font-bold text-[#002d72]">
              {contactInfo.phone && <p>{contactInfo.phone}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Health Packages Section */}
      {healthPackages.length > 0 && (
        <HealthPackages healthPackages={healthPackages} branchName={branchName} />
      )}

      {/* Services Available */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Services Available</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#d4af37]">
                    {IconComponent ? <IconComponent className="w-8 h-8 text-[#002d72]" /> : null}
                  </div>
                  <h3 className="text-lg font-semibold text-[#002d72]">{service.name}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Transport Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Transport Services Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bus Service */}
            {busService && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37]">
                <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Bus Service</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Timings: {busService.timing}</p>
                  <p className="text-gray-600">Starting Point: {busService.startPoint}</p>
                  <p className="text-gray-600">Contact: {busService.contact}</p>
                </div>
              </div>
            )}
            
            {/* Ambulance Service */}
            {ambulanceService && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37]">
                <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Ambulance Service</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">Availability: {ambulanceService.availability}</p>
                  <p className="text-gray-600">Contact: {ambulanceService.contact}</p>
                  <p className="text-gray-600">Service Area: {ambulanceService.serviceArea}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* OPD Information */}
      {opdInfo.length > 0 && (
        <section className="py-16 bg-[#f9f9f9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">OPD Information</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white border border-[#d4af37]">
                <thead className="bg-[#002d72] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Day</th>
                    <th className="px-6 py-3 text-left">Timing</th>
                    <th className="px-6 py-3 text-left">Doctor</th>
                    <th className="px-6 py-3 text-left">Specialization</th>
                  </tr>
                </thead>
                <tbody>
                  {opdInfo.map((opd, index) => (
                    <tr key={index} className="border-t border-[#d4af37]">
                      <td className="px-6 py-4">{opd.day}</td>
                      <td className="px-6 py-4">{opd.timing}</td>
                      <td className="px-6 py-4">{opd.doctor}</td>
                      <td className="px-6 py-4">{opd.specialization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Gallery and Map Section */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Our Facility</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gallery */}
            <div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Gallery</h3>
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index} 
                    className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                    onClick={() => openModal(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Facility Image ${index + 1}`} 
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map */}
            <div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Location</h3>
              <div className="relative overflow-hidden rounded-lg aspect-video">
                <iframe
                  src={mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Contact Information</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm border border-[#d4af37]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Address</h3>
                <p className="text-gray-600">{location}</p>
                {contactInfo.phone && (
                  <p className="text-gray-600 mt-2">
                    <span className="font-semibold">Phone:</span> {contactInfo.phone}
                  </p>
                )}
                {contactInfo.email && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {contactInfo.email}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Working Hours</h3>
                {contactInfo.hours && (
                  <p className="text-gray-600">{contactInfo.hours}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {isModalOpen && selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              ×
            </button>
            
            {/* Previous button */}
            {selectedImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ‹
              </button>
            )}
            
            {/* Next button */}
            {selectedImage < galleryImages.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center"
              >
                ›
              </button>
            )}
            
            {/* Image */}
            <img
              src={galleryImages[selectedImage]}
              alt={`Facility Image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full">
              {selectedImage + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchTemplate;
