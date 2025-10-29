// HomePage.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import AppointmentFormModal from '../components/AppointmentFormModal';
import DoctorInfoCard from '../components/DoctorInfoCard';
import DepartmentsSection from '../components/DepartmentsSection';
import EmergencyServicesCarousel from '../components/EmergencyServicesCarousel';
import HealthPackages from '../components/HealthPackages';
import BlogSection from '../components/BlogSection';
import { doctors } from './FindADoctorPage'; // Import doctors from FindADoctorPage
import {
  ArrowRight,
  Search,
  ChevronDown,
  User,
  MapPin,
  Calendar,
  Phone,
  Globe,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { VolumeX, Volume2 } from "lucide-react";
import CardComponent from '../components/CardComponent';

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const HomePage = () => {
  const heroSliderRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [shouldPauseSlider, setShouldPauseSlider] = useState(false);
  const videoRefs = useRef([]);
  const [loadedVideos, setLoadedVideos] = useState(new Set()); // Track loaded video sources
  const [heroSectionInView, setHeroSectionInView] = useState(false);
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // If unmuting, pause the slider until video ends
    if (isMuted) {
      setShouldPauseSlider(true);
    }
  };
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showTreatmentDropdown, setShowTreatmentDropdown] = useState(false);
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  // Mobile detection state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.treatment-dropdown')) {
        setShowTreatmentDropdown(false);
      }
      if (!event.target.closest('.department-dropdown')) {
        setShowDepartmentDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const departments = [
    "Plastic and Reconstructive Surgery",
    "Urology",
    "Nephrology",
    "Cardiology",
    "Neuro and Spine Surgery",
    "Surgical Oncology",
    "Radiation Oncology",
    "General Medicine",
    "Internal Medicine",
    "ENT",
    "General and Minimal Access Surgery",
    "Orthopaedic and Joint Replacement",
    "Obstetrics and Gynaecology",
    "Dermatology",
    "Psychiatry",
    "Anaesthesia",
    "Radiology",
    "Blood Bank and Pathology",
    "Dental",
    "Physiotherapy and Rehabilitation"
  ];

  const treatments = [
    {
      id: 'neuro-spine',
      label: 'Brain & Spine',
      departments: ['Neuro and Spine Surgery'],
      procedures: [
        'Brain Tumor Surgery',
        'Spine Decompression Surgery',
        'Disc Replacement',
        'Spinal Fusion',
        'Peripheral Nerve Surgery',
        'Microvascular Decompression'
      ]
    },
    {
      id: 'heart',
      label: 'Heart Care',
      departments: ['Cardiology'],
      procedures: [
        'Angioplasty',
        'Pacemaker Implantation',
        'Bypass Surgery',
        'Heart Valve Surgery',
        'Cardiac Rehabilitation',
        'ECG and Stress Tests'
      ]
    },
    {
      id: 'thoracic',
      label: 'Thoracic Surgery',
      departments: ['Cardio Thoracic Surgery'],
      procedures: [
        'Lobectomy',
        'Video-Assisted Thoracoscopic Surgery (VATS)',
        'Esophagectomy',
        'Pleurodesis',
        'Mediastinal Tumor Resection',
        'Chest Wall Reconstruction'
      ]
    },
    {
      id: 'plastic-reconstructive',
      label: 'Plastic & Reconstructive',
      departments: ['Plastic and Reconstructive Surgery'],
      procedures: [
        'Rhinoplasty',
        'Breast Reconstruction',
        'Facelift (Rhytidectomy)',
        'Liposuction',
        'Reconstructive Microsurgery',
        'Burn and Scar Revision'
      ]
    },
    {
      id: 'cancer',
      label: 'Cancer Care',
      departments: ['Surgical Oncology', 'Radiation Oncology'],
      procedures: [
        'Chemotherapy',
        'Radiation Therapy',
        'Surgical Oncology',
        'Cancer Screening',
        'Targeted Therapy'
      ]
    },
    {
      id: 'kidney',
      label: 'Kidney Care',
      departments: ['Nephrology', 'Urology'],
      procedures: [
        'Dialysis',
        'Kidney Transplant',
        'Lithotripsy',
        'Urological Surgery'
      ]
    },
    {
      id: 'orthopedics',
      label: 'Bone & Joint',
      departments: ['Orthopaedic and Joint Replacement'],
      procedures: [
        'Joint Replacement',
        'Arthroscopy',
        'Spine Surgery',
        'Sports Medicine',
        'Trauma Care'
      ]
    },
    {
      id: 'women-health',
      label: "Women's Health",
      departments: ['Obstetrics and Gynaecology'],
      procedures: [
        'Pregnancy Care',
        'Gynecological Surgery',
        'Fertility Treatment',
        'Menopause Management',
        'Regular Check-ups'
      ]
    },
    {
      id: 'dental',
      label: 'Dental Care',
      departments: ['Dental'],
      procedures: [
        'Root Canal',
        'Dental Implants',
        'Orthodontics',
        'Cosmetic Dentistry',
        'Oral Surgery'
      ]
    },
    {
      id: 'mental-health',
      label: 'Mental Health',
      departments: ['Psychiatry'],
      procedures: [
        'Counseling',
        'Psychotherapy',
        'Medication Management',
        'Behavioral Therapy',
        'Addiction Treatment'
      ]
    },
    {
      id: 'skin',
      label: 'Skin Care',
      departments: ['Dermatology'],
      procedures: [
        'Skin Disease Treatment',
        'Cosmetic Dermatology',
        'Hair Treatment',
        'Laser Therapy',
        'Skin Cancer Screening'
      ]
    },
    {
      id: 'general',
      label: 'General Medicine',
      departments: ['General Medicine', 'Internal Medicine'],
      procedures: [
        'Health Check-ups',
        'Preventive Care',
        'Disease Management',
        'Vaccination',
        'Lifestyle Medicine'
      ]
    },
    {
      id: 'rehabilitation',
      label: 'Rehabilitation',
      departments: ['Physiotherapy and Rehabilitation'],
      procedures: [
        'Physical Therapy',
        'Occupational Therapy',
        'Speech Therapy',
        'Post-Surgery Rehabilitation',
        'Sports Rehabilitation'
      ]
    }
  ];

  const heroSettings = {
    dots: false,
    infinite: true,
    beforeChange: (current, next) => setCurrentIndex(next),
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    afterChange: (current) => setCurrentSlide(current),
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const slides = [
  {
    type: 'video',
    video: "/Anandprakashchokseyexplanation.mp4",
    title: "Trustworthy Medical Expertise",
    buttonLabel: "Book Appointment",
    buttonIcon: <Calendar size={18} />,
    buttonStyle: "primary",
    buttonLink: "#",
    overlay: true,
  },
  {
    type: 'video',
    video: "/Explainervide.mp4",
    title: "Quality Healthcare in Central India",
    buttonLabel: "Explore Services",
    buttonIcon: <Play size={18} />,
    buttonStyle: "primary",
    buttonLink: "/care-center",
    overlay: true,
  },
  {
    type: 'video',
    video: "/kidtestimonial.mp4",
    title: "The Start of Your Healing Journey",
    buttonLabel: "Watch Testimonials",
    buttonIcon: <Play size={18} />,
    buttonStyle: "primary",
    buttonLink: "#",
    overlay: true,
  },
];


  const doctorSliderRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [currentDepartmentIndex, setCurrentDepartmentIndex] = useState(0);
  const [doctorsPerView, setDoctorsPerView] = useState(4); // Default to desktop view

  useEffect(() => {
    const updateDoctorsPerView = () => {
      const width = window.innerWidth;
      if (width < 640) { // Mobile
        setDoctorsPerView(1);
      } else if (width < 1024) { // Tablet
        setDoctorsPerView(2);
      } else { // Desktop
        setDoctorsPerView(4); // Changed back to 4 cards as requested
      }
    };

    updateDoctorsPerView();
    window.addEventListener('resize', updateDoctorsPerView);
    return () => window.removeEventListener('resize', updateDoctorsPerView);
  }, []);

  const handleAfterChange = (current) => {
    const total = doctors.length;
    // Determine visible slides based on the responsive settings
    let visible = doctorsPerView; // Use the state variable for visible doctors

    const maxIndex = Math.max(0, total - visible);
    const progressValue = maxIndex > 0 ? (current / maxIndex) * 100 : 0;
    setProgress(progressValue);
  };


  const patientFeedbacks = [
    {
      id: 1,
      title: "Testimonial for Gestational Hypertension and successful delivery",
      doctor: "Patient",
      specialty: "Gestational Hypertension",
      videoUrl: "https://www.youtube.com/embed/Tfkhkn5hW6M",
    },
    {
      id: 2,
      title: "Testimonial for Minimal Invasive Laparoscopic Cystectomy",
      doctor: "Patient",
      specialty: "Minimal Invasive Laparoscopic Cystectomy",
      videoUrl: "https://www.youtube.com/embed/ZzVg22GxkmE",
    },
    {
      id: 3,
      title: "Exceptional Healthcare Journey: Mrs. Sara Mohammed Bhattiwala's Testimonial",
      doctor: "Mrs. Sara Mohammed Bhattiwala",
      specialty: "General",
      videoUrl: "https://www.youtube.com/embed/Gwa3CwxUQb4",
    },
  ].map(testimonial => {
    const videoId = getYouTubeVideoId(testimonial.videoUrl);
    return {
      ...testimonial,
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '/placeholders/video-placeholder.jpg',
    };
  });

  const opdTimings = [
    { day: "Monday", time: "10:00 AM to 6:00 PM" },
    { day: "Tuesday", time: "10:00 AM to 6:00 PM" },
    { day: "Wednesday", time: "10:00 AM to 6:00 PM" },
    { day: "Thursday", time: "10:00 AM to 6:00 PM" },
    { day: "Friday", time: "10:00 AM to 6:00 PM" },
    { day: "Saturday", time: "10:00 AM to 6:00 PM" },
    { day: "Pathology", time: "(24x7) Open", special: true },
  ];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0% { opacity: 0.2; }
        100% { opacity: 0.4; }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
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

  // Effect to handle video playback based on current slide and mute state
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;

      if (idx === currentIndex) {
        // Load video source if not already loaded for current slide
        if (!loadedVideos.has(idx)) {
          const source = video.querySelector('source[data-src]');
          if (source) {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            video.load(); // Load the video with the new source
          }
        }

        // Only attempt to play if the video source has been loaded
        if (loadedVideos.has(idx)) {
          video.muted = isMuted;
          video.play().catch(e => {
            console.warn(`Autoplay blocked for video ${idx}:`, e);
          });
        }
      } else {
        // Pause and reset inactive videos
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isMuted, loadedVideos]);

  // Intersection Observer for lazy loading video sources
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoIndex = parseInt(entry.target.dataset.videoIndex, 10);
          if (entry.isIntersecting) {
            // If video enters viewport, mark it as loaded
            setLoadedVideos(prev => {
              if (!prev.has(videoIndex)) {
                const newSet = new Set(prev);
                newSet.add(videoIndex);
                return newSet;
              }
              return prev;
            });
          } else {
            // If video leaves viewport, pause and reset it
            const video = videoRefs.current[videoIndex];
            if (video) {
              video.pause();
              video.currentTime = 0;
            }
          }
        });
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the video is visible
      }
    );

    // Observe all video elements
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        video.dataset.videoIndex = idx; // Store index for observer callback
        observer.observe(video);
      }
    });

    return () => {
      videoRefs.current.forEach(video => {
        if (video) {
          observer.unobserve(video);
        }
      });
    };
  }, [loadedVideos]); // Re-run if loadedVideos changes to observe new elements if any

  // Intersection Observer for the entire hero section to play video when hero is viewed
  useEffect(() => {
    if (!heroSectionRef.current) return;

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroSectionInView(true);
            // When hero section comes into view, ensure the current video plays
            const currentVideo = videoRefs.current[currentIndex];
            if (currentVideo && loadedVideos.has(currentIndex)) {
              currentVideo.muted = isMuted;
              currentVideo.play().catch(e => {
                console.warn(`Autoplay blocked for current video:`, e);
              });
            }
          } else {
            setHeroSectionInView(false);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // Trigger when 10% of hero section is visible
      }
    );

    heroObserver.observe(heroSectionRef.current);

    return () => {
      if (heroSectionRef.current) {
        heroObserver.unobserve(heroSectionRef.current);
      }
    };
  }, [currentIndex, isMuted, loadedVideos]);


      return (
    <>
      {/* HERO SECTION */}
<div ref={heroSectionRef} className="w-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px] overflow-x-hidden">
  <Slider
    {...{
      dots: false,
      infinite: true,
      speed: 800,
      autoplay: !shouldPauseSlider,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      arrows: false,
      pauseOnHover: true,
      beforeChange: (oldIndex, newIndex) => {
        const oldVideo = videoRefs.current[oldIndex];
        if (oldVideo) {
          oldVideo.pause();
          oldVideo.currentTime = 0;
        }
      },
      afterChange: (index) => setCurrentIndex(index),
    }}
    className="h-full relative z-0"
    ref={heroSliderRef}
  >
    {slides.map((slide, index) => (
      <div key={index} className="relative h-full">
        {slide.type === "video" ? (
          <>
            {/* Video element with optimized loading */}
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay={index === currentIndex} // Autoplay only if it's the current slide
              loop
              playsInline
              muted={isMuted}
              preload={index === currentIndex ? "auto" : "none"} // Only preload current and adjacent slides
              className="w-full h-full object-cover min-h-full"
              style={{
                objectPosition:
                  isMobile && index === 2 ? "right center" : "center",
              }}
              onLoadedData={(e) => {
                // Once metadata is loaded, if it's the current slide, try to play
                if (index === currentIndex) {
                  e.target.play().catch(err => console.warn(`Autoplay prevented for video ${index}:`, err));
                }
              }}
              onEnded={() => {
                // When video ends, resume the slider if it was paused due to unmuted video
                if (shouldPauseSlider) {
                  setShouldPauseSlider(false);
                }
              }}
              // Add loading optimization attributes
              loading="lazy"
            >
              {/* Conditionally load video source based on visibility - account for slider loop */}
              {index === currentIndex || 
               index === (currentIndex - 1 + slides.length) % slides.length || 
               index === (currentIndex + 1) % slides.length ? (
                <source src={slide.video} type="video/mp4" />
              ) : (
                <source data-src={slide.video} type="video/mp4" />
              )}
              Your browser does not support the video tag.
            </video>

            {/* Mute/Unmute button only on active slide */}
            {index === currentIndex && (
              <button
                onClick={toggleMute}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity duration-30"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            )}
          </>
        ) : (
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover min-h-full"
            loading="lazy"
          />
        )}

        {/* Gradient Overlay - hidden on mobile, visible on desktop */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: slide.overlay
              ? "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)"
              : "none",
          }}
        ></div>

        {/* Text Content - overlay on desktop, below video on mobile */}
        <div className="absolute inset-0 flex items-center px-4 sm:px-6 md:px-12 hidden sm:flex">
          <div className="text-left text-white max-w-md">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight font-serif mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {slide.title}
            </motion.h1>
            {slide.buttonLabel && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (slide.buttonLabel === "Book Appointment") {
                    setIsAppointmentModalOpen(true);
                  } else if (slide.buttonLabel === "Watch Testimonials") {
                    document.getElementById('patient-feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (slide.buttonLink) {
                    window.location.href = slide.buttonLink;
                  }
                }}
                className={`mt-4 sm:mt-6 flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 text-base sm:text-lg ${
                  slide.buttonStyle === "primary"
                    ? "bg-yellow-600 text-white hover:bg-yellow-500"
                    : slide.buttonStyle === "secondary"
                    ? "bg-blue-700 text-white hover:bg-blue-60"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {slide.buttonIcon}
                {slide.buttonLabel}
              </motion.button>
            )}
          </div>
        </div>

        {/* Navigation Buttons - visible on desktop - only show on active slide */}
        {index === currentIndex && (
          <>
            <button
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 hidden sm:block"
              onClick={() => heroSliderRef.current?.slickPrev()}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 hidden sm:block"
              onClick={() => heroSliderRef.current?.slickNext()}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation Buttons - visible on mobile */}
            <button
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 sm:hidden"
              onClick={() => heroSliderRef.current?.slickPrev()}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded-full hover:bg-opacity-70 transition-all duration-300 sm:hidden"
              onClick={() => heroSliderRef.current?.slickNext()}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>
    ))}
  </Slider>

  {/* Text Content - below video on mobile */}
  <div className="container mx-auto px-4 sm:px-6 md:px-12 py-6 sm:py-8 md:py-10 sm:hidden">
    {slides.map((slide, index) => (
      index === currentIndex && (
        <motion.div
          key={index}
          className="text-center text-[#02d72]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight font-serif mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {slide.title}
          </motion.h1>
          {slide.buttonLabel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (slide.buttonLabel === "Book Appointment") {
                  setIsAppointmentModalOpen(true);
                } else if (slide.buttonLabel === "Watch Testimonials") {
                  document.getElementById('patient-feedback-section')?.scrollIntoView({ behavior: 'smooth' });
                } else if (slide.buttonLink) {
                  window.location.href = slide.buttonLink;
                }
              }}
              className={`mt-3 sm:mt-4 flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-30 text-sm sm:text-base mx-auto ${
                slide.buttonStyle === "primary"
                  ? "bg-yellow-60 text-[#002d72] hover:bg-yellow-50"
                  : slide.buttonStyle === "secondary"
                  ? "bg-blue-70 text-[#002d72] hover:bg-blue-60"
                  : "bg-white text-[#002d72] hover:bg-gray-10"
              }`}
            >
              {slide.buttonIcon}
              {slide.buttonLabel}
            </motion.button>
          )}
        </motion.div>
      )
    ))}
  </div>
</div>


      {/* SEARCH SECTION */}
      <motion.section
        className="py-1 sm:py-2 border-b border-gray-100 bg-white"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 sm:mb-8">
            <div className="flex-1 text-center border-b-2 border-yellow-600 pb-2 font-serif text-base sm:text-lg text-gray-80">
              Find Department & Doctors
            </div>
            <div 
              className="flex-1 text-center border-b pb-2 font-sans text-base sm:text-lg text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              Booking Assistance
            </div>
          </div>

          {/* Search Form */}
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6 items-center">
            <div className="w-full sm:w-64">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 font-sans">
                Treatment
              </label>
              <div className="relative treatment-dropdown">
                <input
                  type="text"
                  placeholder="Search treatments, procedures..."
                  value={selectedTreatment}
                  onChange={(e) => {
                    setSelectedTreatment(e.target.value);
                    setShowTreatmentDropdown(true);
                  }}
                  onFocus={() => setShowTreatmentDropdown(true)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 font-sans"
                />
                {showTreatmentDropdown && (
                  <div 
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 sm:max-h-96 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => {
                        setSelectedTreatment('');
                        setShowTreatmentDropdown(false);
                      }}
                    >
                      All Treatments
                    </div>
                    {treatments
                      .filter(treatment => {
                        if (!selectedTreatment) return true;
                        const searchLower = selectedTreatment.toLowerCase();
                        return (
                          treatment.label.toLowerCase().includes(searchLower) ||
                          treatment.procedures.some(proc => 
                            proc.toLowerCase().includes(searchLower)
                          )
                        );
                      })
                      .map((treatment) => (
                        <div key={treatment.id} className="p-2 hover:bg-gray-100">
                          <div 
                            className="font-medium cursor-pointer text-sm sm:text-base"
                            onClick={() => {
                              setSelectedTreatment(treatment.id);
                              setShowTreatmentDropdown(false);
                            }}
                          >
                            {treatment.label}
                          </div>
                          <div className="pl-4 text-xs sm:text-sm text-gray-600">
                            {treatment.procedures.map((proc, idx) => (
                              <div 
                                key={idx}
                                className="py-1 cursor-pointer hover:text-blue-60"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedTreatment(treatment.id);
                                  setShowTreatmentDropdown(false);
                                }}
                              >
                                {proc}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full sm:w-64">
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1 sm:mb-2 font-sans">
                Department
              </label>
              <div className="relative department-dropdown">
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={selectedDepartment}
                  onChange={(e) => {
                    setSelectedDepartment(e.target.value);
                    setShowDepartmentDropdown(true);
                  }}
                  onFocus={() => setShowDepartmentDropdown(true)}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500 font-sans"
                />
                {showDepartmentDropdown && (
                  <div 
                    className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 sm:max-h-96 overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                      onClick={() => {
                        setSelectedDepartment('');
                        setShowDepartmentDropdown(false);
                      }}
                    >
                      All Departments
                    </div>
                    {departments
                      .filter(department => {
                        if (!selectedDepartment) return true;
                        return department.toLowerCase().includes(selectedDepartment.toLowerCase());
                      })
                      .map((department) => (
                        <div 
                          key={department}
                          className="p-2 hover:bg-gray-100 cursor-pointer text-sm sm:text-base"
                          onClick={() => {
                            setSelectedDepartment(department.toLowerCase());
                            setShowDepartmentDropdown(false);
                          }}
                        >
                          {department}
                          <div className="pl-4 text-xs sm:text-sm text-gray-600">
                            {treatments
                              .filter(t => t.departments.includes(department))
                              .map(t => t.label)
                              .map((label, idx) => (
                                <div key={idx} className="py-1">
                                  {label}
                                </div>
                              ))
                            }
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>

            <Link
              to={`/find-doctor?department=${selectedDepartment}&treatment=${selectedTreatment}`}
              className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-60 transition-colors font-medium flex items-center gap-2 font-sans text-base sm:text-lg"
            >
              <Search size={18} />
              Search
            </Link>
            <Link
              to="/find-doctor"
              className="text-gray-700 hover:text-yellow-600 font-medium flex items-center gap-2 font-sans text-base sm:text-lg"
            >
              View all Specialists
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Appointment Modal */}
      {isAppointmentModalOpen && (
        <AppointmentFormModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
        />
      )}

      {/* WHY SECTION */}
      <motion.section
        className="py-4 sm:py-6 bg-[#f9f9f9]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#002d72] leading-tight">
            Welcome to All Is Well Hospital
          </h1>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          
        </div>

          <motion.div
            className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="lg:w-1/2">
              <motion.img
                src="/whysection/pathology.jpg"
                alt="Advanced Medical Technology"
                className="w-full h-auto object-cover rounded-lg shadow-md"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-600 mb-3 sm:mb-4 font-serif">
                Advanced Medical Technology
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 font-sans">
                Our use of advanced medical technology and dedicated diagnostic
                services ensures timely and accurate diagnoses for a range of
                diseases. We are dedicated to providing cost-effective,
                high-quality care in a safe and secure environment, while
                maintaining a compassionate and patient-centered approach to
                medical treatment.
              </p>
              <div className="mt-6 sm:mt-8 w-8 h-8 sm:w-10 sm:h-10 bg-blue-800 rounded-full flex items-center justify-center">
                <ChevronDown size={18} className="text-white rotate-180" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row-reverse gap-8 sm:gap-12 items-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="lg:w-1/2">
              <motion.img
                src="/whysection/ctscan.jpg"
                alt="Experienced Medical Team"
                className="w-full h-auto object-cover rounded-lg shadow-md"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-600 mb-3 sm:mb-4 font-serif">
                Experienced Medical Team
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 font-sans">
                Our team of experienced and qualified doctors is here to provide
                you with the highest quality healthcare and medical services.
                Our knowledgeable medical professionals and caring support staff
                make us stand out in the field. With their expertise and
                dedication, you can be sure to receive the best care possible.
              </p>
              <div className="mt-6 sm:mt-8 w-8 h-8 sm:w-10 sm:h-10 bg-blue-800 rounded-full flex items-center justify-center">
                <ChevronDown size={18} className="text-white rotate-180" />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="lg:w-1/2">
              <motion.img
                src="/whysection/patient.jpg"
                alt="Timely Emergency Services"
                className="w-full h-auto object-cover rounded-lg shadow-md"
                loading="lazy"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-600 mb-3 sm:mb-4 font-serif">
                Timely Emergency Services
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 font-sans">
                At All Is Well Hospital, our commitment to providing timely and
                effective emergency services is unwavering. Our advanced
                emergency and critical care unit is equipped with the latest
                technology, ensuring quick and comprehensive care for those who
                require intensive monitoring and life support. Trust us to be
                there for you in times of need.
              </p>
              <div className="mt-6 sm:mt-8 w-8 h-8 sm:w-10 sm:h-10 bg-blue-800 rounded-full flex items-center justify-center">
                <ChevronDown size={18} className="text-white rotate-180" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* OUR DEPARTMENTS SECTION */}
      <DepartmentsSection />

      {/* MEET OUR SPECIALISTS SECTION */}
      <motion.section
        className="py-4 bg-[#f9f9f9] overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 font-serif text-gray-800"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#002d72] leading-tight">
            Meet Our Specialists
          </h1>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          
        </div>
          </motion.h2>

          {/* Doctor Carousel Wrapper */}
          <div className="relative overflow-hidden px-4 sm:px-8 md:px-10 lg:px-12 -mx-4 sm:-mx-6 lg:-mx-12">
            {/* Custom Navigation Arrows */}
            <button
              onClick={() => setCurrentDoctorIndex(prev => Math.max(prev - 1, 0))}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-100 z-10 transition-all duration-300 border border-gray-200"
              aria-label="Previous doctor"
              disabled={currentDoctorIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#002d72]" />
            </button>
            <button
              onClick={() => setCurrentDoctorIndex(prev => Math.min(prev + 1, Math.max(0, doctors.length - doctorsPerView)))}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-1.5 sm:p-2 hover:bg-gray-10 z-10 transition-all duration-300 border border-gray-200"
              aria-label="Next doctor"
              disabled={currentDoctorIndex >= Math.max(0, doctors.length - doctorsPerView)}
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#002d72]" />
            </button>

            {/* Custom Carousel */}
            <div className="relative overflow-hidden rounded-lg bg-white p-3 shadow-sm border border-gray-100">
              <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentDoctorIndex * (100 / doctorsPerView)}%)` }}>
                {doctors.map((doctor, index) => (
                  <div 
                    key={doctor.id} 
                    className={`flex-shrink-0 px-1 sm:px-1.5 ${
                      doctorsPerView === 1 ? 'w-full' : 
                      doctorsPerView === 2 ? 'w-1/2' : 
                      doctorsPerView === 4 ? 'w-1/4' : // Show 4 cards when doctorsPerView is 4
                      'w-1/3'
                    }`}
                  >
                    <motion.div
                      className="h-full"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        ease: "easeOut",
                        delay: index * 0.05 
                      }}
                    >
                      <div className="h-full flex justify-center">
                        <DoctorInfoCard
                          image={doctor.image}
                          title={doctor.name}
                          description={doctor.specialty}
                          onBookClick={() => alert(`Booking with ${doctor.name}`)}
                        />
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Seeker Bar */}
            <div className="mt-4 sm:mt-6 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-1 bg-[#02d72] rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${doctors.length > doctorsPerView ? (currentDoctorIndex / (doctors.length - doctorsPerView)) * 100 : 100}%` }}
                transition={{ ease: "easeOut", duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      <section
        className="py-4 sm:py-6 bg-[#f9f9f9]"
      >
        

        {/* PATIENT FEEDBACK SECTION */}
        <section id="patient-feedback-section" className="py-12 bg-[#f9f9f9]">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
                Patient Feedback
              </h1>
              <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
              <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic max-w-2xl mx-auto">
                Hear from our patients about their healing journey with us
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {patientFeedbacks.map((feedback, index) => (
                <motion.div
                  key={`feedback-${feedback.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative rounded-lg overflow-hidden shadow-sm border border-[#d4af37] bg-white p-6"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-gray-200 mb-4 rounded">
                    <img
                      src={feedback.thumbnail}
                      alt={feedback.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-opacity rounded">
                      <button
                        onClick={() => window.open(feedback.videoUrl, "_blank")}
                        className="bg-red-600 hover:bg-red-70 text-white p-3 rounded-full transition transform group-hover:scale-110"
                        aria-label={`Watch video: ${feedback.title}`}
                      >
                        <Play size={24} />
                      </button>
                    </div>
                  </div>
                  {/* Video Info */}
                  <div>
                    <h3 className="font-serif font-bold text-[#002d72] mb-3 text-lg leading-tight line-clamp-2 sm:line-clamp-3">
                      {feedback.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#44] mb-2 font-sans">
                      <Calendar size={14} />
                      Admitted Under
                    </div>
                    <div className="font-sans font-medium text-[#02d72] mb-2 text-base">
                      {feedback.doctor}
                    </div>
                    <div className="font-sans text-[#444] text-sm leading-tight mb-3">
                      {feedback.specialty}
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < 5 ? "text-[#d4af37] fill-[#d4af37]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </section>

    
      
      {/* EMERGENCY SERVICES SECTION */}
      <motion.section
        className="py-4 sm:py-6 bg-[#f9f9f9]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#002d72] leading-tight">
              Emergency & Diagnostic Services
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          </div>
          
          <div className="flex justify-center items-center">
            <EmergencyServicesCarousel />
          </div>
        </div>
      </motion.section>

      {/* RECENT BLOG SECTION */}
      <div className="py-8 sm:py-10 bg-[#f9f9f9]">
        <BlogSection maxBlogs={3} />
      </div>
    </>
  );
};

export default HomePage;
