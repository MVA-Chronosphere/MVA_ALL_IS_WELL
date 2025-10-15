import React from "react";
import { motion } from "framer-motion";

const HealthPackages = () => {
  // Unique health packages from various branches
  const healthPackages = [
    {
      id: 1,
      name: "Basic Health Checkup",
      price: "1,499",
      description: "Blood pressure, blood sugar, cholesterol screening, and BMI calculation."
    },
    {
      id: 2,
      name: "Comprehensive Health Package", 
      price: "3,999",
      description: "Basic tests plus ECG, liver & kidney function, and thyroid screening."
    },
    {
      id: 3,
      name: "Senior Citizen Package",
      price: "4,499", 
      description: "Heart screening, bone density test, and detailed metabolic panel."
    },
    
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="bg-white p-6 rounded-lg shadow-md border border-[#d4af37] hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">{pkg.name}</h3>
                <div className="text-2xl font-bold text-[#d4af37] mb-3">₹{pkg.price}</div>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
              </div>
              <button className="bg-[#002d72] text-white px-6 py-2 rounded-md hover:bg-[#001d52] transition-colors duration-300 w-full">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
 );
};

export default HealthPackages;
