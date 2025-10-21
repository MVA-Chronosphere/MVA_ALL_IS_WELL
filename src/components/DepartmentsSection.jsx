import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Brain,
  Baby,
  Eye,
  Ear,
  Activity,
  Stethoscope,
  Bone,
  Syringe,
  Heart,
  User,
} from "lucide-react";

const DepartmentsSection = () => {
  const [activeTab, setActiveTab] = useState("speciality");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width for responsive behavior
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Speciality Departments
  const specialityDepartments = [
    {
      id: 1,
      icon: Stethoscope,
      title: "Anesthesiology and Critical Care",
      description:
        "The department of Anesthesiology and Critical Care at All Is Well Hospital provides comprehensive perioperative care...",
    },
    {
      id: 2,
      icon: Heart,
      title: "Cardiac Sciences",
      description:
        "Clinical Cardiology and Cardiothoracic Surgery at All Is Well Hospital offers advanced diagnostic and treatment facilities...",
    },
    {
      id: 3,
      icon: Brain,
      title: "Neuro Sciences",
      description:
        "The department of Neuro Sciences at All Is Well Hospital provides advanced neurological care with state-of-the-art facilities...",
    },
    {
      id: 4,
      icon: User,
      title: "Dental Sciences",
      description:
        "The department of Dental Sciences at All Is Well Hospital offers comprehensive oral health care services...",
    },
    {
      id: 5,
      icon: Baby,
      title: "Obstetrics and Gynaecology",
      description:
        "The department of Obstetrics and Gynaecology at All Is Well Hospital provides comprehensive women's health care...",
    },
    {
      id: 6,
      icon: Eye,
      title: "Ophthalmology",
      description:
        "The department of Ophthalmology at All Is Well Hospital offers advanced eye care services with modern diagnostic equipment...",
    },
    {
      id: 7,
      icon: Ear,
      title: "ENT",
      description:
        "The department of ENT at All Is Well Hospital provides comprehensive care for ear, nose, and throat conditions...",
    },
    {
      id: 8,
      icon: Activity,
      title: "General Medicine",
      description:
        "The department of General Medicine at All Is Well Hospital offers primary and secondary medical care...",
    },
  ];

  // Centres of Excellence
  const centersOfExcellence = [
    {
      id: 1,
      icon: Heart,
      title: "Advanced Cardiac Care Center",
      description:
        "Our Advanced Cardiac Care Center offers cutting-edge treatments for complex heart conditions...",
    },
    {
      id: 2,
      icon: Syringe,
      title: "Cancer Care Center",
      description:
        "The Cancer Care Center at All Is Well Hospital provides comprehensive oncology services with multidisciplinary approach...",
    },
    {
      id: 3,
      icon: Bone,
      title: "Orthopaedic and Joint Replacement Center",
      description:
        "Our Orthopaedic Center offers advanced joint replacement surgeries and orthopaedic treatments...",
    },
    {
      id: 4,
      icon: Brain,
      title: "Neurosciences Center",
      description:
        "The Neurosciences Center provides advanced treatments for complex neurological disorders...",
    },
    {
      id: 5,
      icon: Baby,
      title: "Maternity and Child Care Center",
      description:
        "Our Maternity Center offers comprehensive care for expectant mothers and newborns...",
    },
    {
      id: 6,
      icon: User,
      title: "Dental Care Center",
      description:
        "The Dental Care Center provides advanced dental treatments with modern equipment and techniques...",
    },
    {
      id: 7,
      icon: Eye,
      title: "Eye Care Center",
      description:
        "Our Eye Care Center offers comprehensive ophthalmology services with advanced diagnostic and treatment facilities...",
    },
    {
      id: 8,
      icon: Ear,
      title: "ENT Care Center",
      description:
        "The ENT Care Center provides advanced treatments for complex ear, nose, and throat conditions...",
    },
  ];

  const departmentsToShow =
    activeTab === "speciality" ? specialityDepartments : centersOfExcellence;

  const itemsPerSlide = isMobile ? 1 : 4;
  const slidesCount = Math.ceil(departmentsToShow.length / itemsPerSlide);

  const goToPrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, slidesCount - 1));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002d72] leading-tight">
            Our Departments & Centers
          </h1>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          
        </div>

        {/* Tabs */}
        <div className="flex justify-center border-b border-[#d4af37] mb-10 pb-3 flex-wrap">
          <button
            className={`px-4 sm:px-6 py-2 font-serif text-lg sm:text-xl ${
              activeTab === "speciality"
                ? "text-[#002d72] border-b-2 border-[#d4af37]"
                : "text-[#444] hover:text-[#002d72]"
            }`}
            onClick={() => {
              setActiveTab("speciality");
              setCurrentSlideIndex(0);
            }}
          >
            Speciality Departments
          </button>
          <button
            className={`px-4 sm:px-6 py-2 font-serif text-lg sm:text-xl ${
              activeTab === "excellence"
                ? "text-[#002d72] border-b-2 border-[#d4af37]"
                : "text-[#444] hover:text-[#002d72]"
            }`}
            onClick={() => {
              setActiveTab("excellence");
              setCurrentSlideIndex(0);
            }}
          >
            Centres of Excellence
          </button>
        </div>

        {/* Carousel */}
        <div className="relative bg-[#f9f9f9] py-8 rounded-lg overflow-hidden">
          {/* Arrows */}
          <button
            onClick={goToPrevSlide}
            disabled={currentSlideIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37] text-white rounded-full p-3 shadow-lg hover:bg-[#002d72] disabled:opacity-50 transition-colors duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNextSlide}
            disabled={currentSlideIndex >= slidesCount - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[#d4af37] text-white rounded-full p-3 shadow-lg hover:bg-[#002d72] disabled:opacity-50 transition-colors duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden px-2 sm:px-6">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlideIndex * 100}%)`,
              }}
            >
              {[...Array(slidesCount)].map((_, slideIndex) => (
                <div key={slideIndex} className="flex-shrink-0 w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {departmentsToShow
                      .slice(
                        slideIndex * itemsPerSlide,
                        slideIndex * itemsPerSlide + itemsPerSlide
                      )
                      .map((dept) => (
                          <motion.div
                            key={dept.id}
                            className="bg-white rounded-xl shadow-md border border-[#d4af37]/60 hover:shadow-lg transition-transform duration-300 flex flex-col p-4 sm:p-6 min-h-[320px]"
                            whileHover={{ y: -5 }}
                          >
                            <div className="flex flex-col items-center text-center flex-grow">
                              <div className="mb-3 text-[#002d72]">
                                {React.createElement(dept.icon, { size: 36 })}
                              </div>
                              <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#002d72] mb-2 text-center break-words">
                                {dept.title}
                              </h3>
                              <p className="text-sm sm:text-base text-[#444] mb-4 flex-grow text-center overflow-hidden line-clamp-3 sm:line-clamp-4">
                                {dept.description}
                              </p>
                              <Link
                                to={`/department/${dept.id}`}
                                className="text-[#002d72] hover:text-[#d4af37] text-sm font-medium flex items-center justify-center gap-1 transition-colors duration-300 mt-auto"
                              >
                                Learn More
                                <ArrowRight size={12} />
                              </Link>
                            </div>
                          </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(slidesCount)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlideIndex ? "bg-[#d4af37]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
