import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const DepartmentsCarousel = () => {
  const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);
  const [departmentsPerView, setDepartmentsPerView] = useState(4); // Default to desktop view

  useEffect(() => {
    const updateDepartmentsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setDepartmentsPerView(1);
      } else if (width < 1024) { // Tablet
        setDepartmentsPerView(2);
      } else { // Desktop
        setDepartmentsPerView(4);
      }
    };

    updateDepartmentsPerView();
    window.addEventListener('resize', updateDepartmentsPerView);
    return () => window.removeEventListener('resize', updateDepartmentsPerView);
  }, []);

  const departments = {
    "neuro-spine-surgery": "Neuro and Spine Surgery",
    "cardiology": "Cardiology",
    "cardio-thoracic-surgery": "Cardiovascular Thoracic Surgery",
    "plastic-surgery": "Plastic and Reconstructive Surgery",
    "urology": "Urology",
    "oncology": "Oncology",
    "gastroenterology": "Gastroenterology",
    "endocrinology": "Endocrinology",
    "rheumatology": "Rheumatology",
    "radiology": "Radiology",
    "critical-care": "Critical Care Medicine",
    "anaesthesia": "Anaesthesia",
    "general-and-minimal-invasive-surgery": "General and Minimal Invasive Surgery",
    "general-medicine": "General Medicine",
    "internal-medicine": "Internal Medicine",
    "obstetrics-and-gynaecology": "Obstetrics and Gynaecology",
    "orthopaedics": "Orthopaedics",
    "pathology": "Pathology",
    "haematology": "Haematology",
    "blood-bank": "Blood Bank with Components",
    "ent": "Ear Nose Throat",
    "ophthalmology": "Ophthalmology",
    "dermatology": "Dermatology",
    "psychiatry": "Psychiatry",
    "dental": "Dental Services",
    "yoga": "Yoga",
    "physiotherapy": "Physiotherapy",
    "nutrition-and-diet": "Nutrition and Dietetics"
  };

  const totalDepartments = Object.keys(departments).length;
  const maxIndex = Math.max(0, Math.ceil(totalDepartments / departmentsPerView) - 1);

  return (
    <div className="relative overflow-hidden px-4 sm:px-8 md:px-10 lg:px-12 -mx-4 sm:-mx-6 lg:-mx-12">
      {/* Custom Navigation Arrows */}
      <button
        onClick={() => setCurrentDepartmentIndex(prev => Math.max(prev - 1, 0))}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-yellow-600 shadow-lg rounded-full p-2 sm:p-3 hover:bg-yellow-70 z-10 transition-all duration-300"
        aria-label="Previous department"
        disabled={currentDepartmentIndex === 0}
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
      <button
        onClick={() => setCurrentDepartmentIndex(prev => Math.min(prev + 1, maxIndex))}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-yellow-600 shadow-lg rounded-full p-2 sm:p-3 hover:bg-yellow-70 z-10 transition-all duration-300"
        aria-label="Next department"
        disabled={currentDepartmentIndex >= maxIndex}
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      {/* Custom Carousel */}
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentDepartmentIndex * (100 / departmentsPerView)}%)` }}>
          {Object.entries(departments).map(([key, title], index) => (
            <div 
              key={key} 
              className={`flex-shrink-0 px-1 sm:px-2 ${
                departmentsPerView === 1 ? 'w-full' : 
                departmentsPerView === 2 ? 'w-1/2' : 
                'w-1/4'
              }`}
            >
              <motion.div
                className="h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="h-full flex justify-center">
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 w-full max-w-xs mx-2 h-full flex flex-col">
                    <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                      <h3 className="font-serif font-bold text-lg sm:text-xl text-[#002d72] mb-3 text-center flex-grow flex items-center justify-center">
                        {title}
                      </h3>
                      <div className="flex justify-center mt-4">
                        <Link
                          to={`/care-center/${key}`}
                          className="bg-[#002d72] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-800 transition-colors flex items-center gap-2"
                          aria-label={`Learn more about ${title}`}
                        >
                          Learn More
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Seeker Bar */}
      <div className="mt-6 sm:mt-8 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-2 bg-yellow-600 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentDepartmentIndex + 1) / Math.max(1, Math.ceil(totalDepartments / departmentsPerView))) * 100}%` }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default DepartmentsCarousel;
