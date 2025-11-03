import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HealthPackageBookingFormModal from "./HealthPackageBookingFormModal";

const HealthPackages = () => {
  // Unique health packages from various branches
  const healthPackages = [
    {
      id: 1,
      name: "BASIC WELLNESS",
      price: "899",
      originalPrice: "1550",
      discount: "42% OFF",
      tests: [
        "CBC",
        "B. Sugar – R",
        "ECG",
        "SGPT",
        "S. Calcium",
        "S. Creatinine",
        "HbA1c",
        "Urine Analysis",
        "T. Cholesterol",
        "Physician Consultation"
      ]
    },
    {
      id: 2,
      name: "COMPREHENSIVE WELLNESS",
      price: "4999",
      originalPrice: "8540",
      discount: "41% OFF",
      tests: [
        "B. Sugar – F / PP",
        "TMT",
        "ECG",
        "2D Echo",
        "Liver Function Test (LFT)",
        "S. Creatinine",
        "HbA1c",
        "Renal Function Test (RFT)",
        "Thyroid Function Test (T3, T4, TSH)",
        "Urine Analysis",
        "Vitamin-D",
        "Vitamin-B12",
        "Blood Group",
        "Lipid Profile",
        "Serum Calcium",
        "Physician Consultation",
        "Dietitian Consultation"
      ]
    },
    {
      id: 3,
      name: "COMPREHENSIVE WOMEN WELLNESS",
      price: "3499",
      originalPrice: "7470",
      discount: "53% OFF",
      tests: [
        "CBC",
        "B. Sugar – F / PP",
        "Lipid Profile",
        "Renal Function Test (RFT)",
        "Liver Function Test (LFT)",
        "HbA1c",
        "Free Thyroid Function Test (FT3, FT4, TSH)",
        "Vitamin-D",
        "Vitamin-B12",
        "FSH",
        "LH",
        "Serum Iron Studies",
        "Blood Group",
        "Gynaecologist Consultation"
      ]
    },
    {
      id: 4,
      name: "DIABETIC WELLNESS",
      price: "4499",
      originalPrice: "7000",
      discount: "36% OFF",
      tests: [
        "CBC",
        "HbA1c",
        "B. Sugar – F / PP",
        "ECG",
        "2D Echo",
        "Urine Analysis",
        "Microalbumin Creatinine Ratio",
        "Renal Function Test (RFT)",
        "Liver Function Test (LFT)",
        "Lipid Profile",
        "Fundus Exam (Ophthalmologist)",
        "Dietitian Consultation",
        "Physician Consultation"
      ]
    },
    {
      id: 5,
      name: "HEALTHY CHILD WELLNESS",
      price: "2599",
      originalPrice: "4670",
      discount: "44% OFF",
      tests: [
        "CBC",
        "ESR",
        "ALP",
        "S. Calcium",
        "S. Creatinine",
        "S. Phosphorus",
        "Liver Function Test (LFT)",
        "Thyroid Function Test (T3, T4, TSH)",
        "Vitamin-D",
        "Serum Iron Studies",
        "Stool Routine",
        "Urine Analysis",
        "CRP",
        "Pediatrician Consultation"
      ]
    },
    {
      id: 6,
      name: "WOMEN FERTILITY WELLNESS",
      price: "4499",
      originalPrice: "8270",
      discount: "46% OFF",
      tests: [
        "CBC",
        "B. Sugar – F / PP",
        "Renal Function Test (RFT)",
        "Liver Function Test (LFT)",
        "Free Thyroid Function Test (FT3, FT4, TSH)",
        "HbA1c",
        "FSH",
        "LH",
        "Prolactin",
        "AMH",
        "Serum Iron Studies",
        "Blood Group",
        "Gynaecologist Consultation"
      ]
    },
    {
      id: 7,
      name: "PREGNANCY WELLNESS",
      price: "2999",
      originalPrice: "4010",
      discount: "25% OFF",
      tests: [
        "CBC",
        "Bleeding Time (BT)",
        "Clotting Time (CT)",
        "Blood Group",
        "B. Sugar – F / PP",
        "VDRL",
        "HIV",
        "HBsAg",
        "HCV",
        "T3, T4, TSH",
        "Urine Analysis",
        "ECG",
        "Serum Iron Studies",
        "Renal Function Test (RFT)",
        "Liver Function Test (LFT)",
        "Gynaecologist Consultation"
      ]
    },
    {
      id: 8,
      name: "BASIC WOMEN WELLNESS",
      price: "1111",
      originalPrice: "1800",
      discount: "38% OFF",
      tests: [
        "CBC",
        "B. Sugar – F / PP",
        "Lipid Profile",
        "S. Creatinine",
        "Liver Function Test (LFT)",
        "Free Thyroid Function Test (FT3, FT4, TSH)",
        "Urine Analysis",
        "Physician Consultation"
      ]
    }
  ];

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) { // Large screens (desktop)
        setItemsPerPage(3);
      } else if (window.innerWidth >= 768) { // Medium screens (tablet)
        setItemsPerPage(2);
      } else { // Small screens (mobile)
        setItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleBookNow = (pkg) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  const totalPages = Math.ceil(healthPackages.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Function to render package card
  const renderPackageCard = (pkg, index) => (
    <motion.div
      key={pkg.id}
      className="bg-white p-6 rounded-lg shadow-md border border-[#d4af37] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex-grow mb-4">
        <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">{pkg.name}</h3>
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-[#d4af37]">₹{pkg.price}</span>
          {pkg.originalPrice && (
            <span className="ml-3 text-sm text-gray-500 line-through">₹{pkg.originalPrice}</span>
          )}
          {pkg.discount && (
            <span className="ml-3 text-sm font-bold text-red-600">{pkg.discount}</span>
          )}
        </div>
        <div className="mb-4">
          <h4 className="font-semibold text-[#002d72] mb-2">Includes:</h4>
          <ul className="text-sm text-gray-600 grid grid-cols-1 gap-1 max-h-40 overflow-y-auto">
            {pkg.tests.map((test, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-[#d4af37] mr-2">•</span> {test}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button 
        onClick={() => handleBookNow(pkg)}
        className="bg-[#002d72] text-white px-6 py-2 rounded-md hover:bg-[#001d52] transition-colors duration-300 w-full mt-auto"
      >
        Book Now
      </button>
    </motion.div>
  );

  return (
    <motion.section
      className="py-16 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#002d72] leading-tight">
            Our Health Packages
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          <p className="text-lg text-[#444] mt-4 max-w-2xl mx-auto">
            Comprehensive health packages designed to meet your healthcare needs
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)` }}
            >
              {healthPackages.map((pkg, index) => (
                <div key={pkg.id} className="flex-shrink-0 p-2" style={{ width: `${100 / itemsPerPage}%` }}>
                  {renderPackageCard(pkg, index)}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-10 z-10 bg-white bg-opacity-70 shadow-md rounded-full p-2 hover:bg-opacity-90 transition-all duration-300 border border-gray-200 hidden md:block"
            aria-label="Previous package"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002d72]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-10 z-10 bg-white bg-opacity-70 shadow-md rounded-full p-2 hover:bg-opacity-90 transition-all duration-300 border border-gray-200 hidden md:block"
            aria-label="Next package"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#002d72]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-[#d4af37] w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {isModalOpen && selectedPackage && (
        <HealthPackageBookingFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          packageDetails={selectedPackage}
        />
      )}
    </motion.section>
  );
};

export default HealthPackages;
