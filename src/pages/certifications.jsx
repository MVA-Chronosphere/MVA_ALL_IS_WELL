import React from 'react';
import { motion } from 'framer-motion';

const certificationsData = [
  {
    id: 1,
    title: "NABH Accreditation",
    image: "/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.jpg",
    description: "National Accreditation Board for Hospitals & Healthcare Providers",
  },
  {
    id: 2,
    title: "ISO 9001 Certified",
    image: "/certifications/iso.webp",
    description: "Certified for Quality Management Systems",
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

const CertificationsPage = () => {
  return (
    <div className="overflow-x-hidden bg-gray-50">
      {/* HERO SECTION */}
      <section id="hero" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight text-center">
            Certifications
          </h1>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic text-center">
            Our Commitment to Quality and Excellence
          </p>
        </div>
      </section>

      {/* CERTIFICATIONS DISPLAY SECTION */}
      <motion.section
        className="py-20 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-6 md:px-12">
          {/* Flex container to always center cards */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border flex flex-col items-center justify-center w-full sm:w-[300px] md:w-[320px] lg:w-[340px]"
              >
                <div className="mb-4 flex items-center justify-center w-full">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto max-w-[250px] object-contain mx-auto"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-serif font-bold text-[#002d72] text-center mb-2 text-lg sm:text-xl">
                  {cert.title}
                </h3>
                <p className="font-sans text-[#444] text-center text-sm sm:text-base">
                  {cert.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default CertificationsPage;
