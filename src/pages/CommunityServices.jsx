import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SeoImage from '../components/SeoImage';

const communityImages = [
  '/communityservices/330934941_865962471367476_5018432288634109443_n-1024x1024.jpeg.webp',
  '/communityservices/330941103_1580887842428734_8903430292073243943_n-1024x1024.jpeg.webp',
  '/communityservices/330945369_1208522899858442_8304335926398024432_n-1024x1024.jpeg.webp',
  '/communityservices/331086183_919352345914820_2960017118414465069_n-1024x1024.jpeg.webp',
  '/communityservices/331261848_557581206123070_8843499313221369819_n-1024x1024.jpeg.webp',
  '/communityservices/331425071_2631357037007338_942055288915635013_n-1024x1024.jpeg.webp',
  '/communityservices/331483536_635750505054346_3983224724032833577_n-1024x1024.jpeg.webp',
  '/communityservices/331926111_6363931360293352_2698312750667445616_n.webp',
  '/communityservices/331965458_596584848982910_8765282251137080891_n-1024x1020.jpeg.webp',
  '/communityservices/331965844_606859374114554_2486436966221738891_n.webp',
  '/communityservices/331999496_3466378573640344_26163574321371211_n.webp',
  '/communityservices/332068602_164579709716282_7544786788462936726_n.webp',
  '/communityservices/332125403_1120667635438191_8542664816306706355_n.webp',
  '/communityservices/332127918_1337040323506156_3060006935016051152_n.webp',
  '/communityservices/332183766_1174784643400225_7373997800539611826_n.webp',
  '/communityservices/332240319_5952910854824635_1613501519464211319_n.webp',
  '/communityservices/332289275_6143262212400608_2064672885156677701_n.webp',
  '/communityservices/333025608_160952936767569_5041046787253676136_n.webp',
  '/communityservices/Camp1-1-1024x768.webp',
  '/communityservices/Camp2-1-1024x768.webp',
  '/communityservices/Camp5-1-1-1024x461.webp',
  '/communityservices/Camp5-2-1024x768.webp',
  '/communityservices/Camp6-1-1024x461.webp',
  '/communityservices/Camp7-1-1024x461.webp',
  '/communityservices/Camp8-1-1024x768.webp',
  '/communityservices/Camp9-1-1024x768.webp',
  '/communityservices/Camp10-1-1024x576.webp',
  '/communityservices/Camp11-1-1024x768.webp',
];

// ✅ Fix: hide default slick arrow pseudo-elements
const slickArrowFix = `
  .slick-prev:before,
  .slick-next:before {
    display: none !important;
  }
`;

// Custom Prev Arrow Component with SVG Icon
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 left-0 z-10 transform -translate-y-1/2 -ml-6 md:-ml-8 cursor-pointer`}
      style={{ 
        ...style, 
        display: 'flex', 
        background: '#d4af37', 
        borderRadius: '50%', 
        padding: '8px', 
        color: '#002d72', 
        fontSize: '24px', 
        width: '40px', 
        height: '40px', 
        justifyContent: 'center', 
        alignItems: 'center', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>
  );
};

// Custom Next Arrow Component with SVG Icon
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute top-1/2 right-0 z-10 transform -translate-y-1/2 -mr-6 md:-mr-8 cursor-pointer`}
      style={{ 
        ...style, 
        display: 'flex', 
        background: '#d4af37', 
        borderRadius: '50%', 
        padding: '8px', 
        color: '#002d72', 
        fontSize: '24px', 
        width: '40px', 
        height: '40px', 
        justifyContent: 'center', 
        alignItems: 'center', 
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease'
      }}
      onClick={onClick}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={2} 
        stroke="currentColor" 
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </div>
  );
};

const CommunityServices = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = communityImages.length;
  const progressBarWidth = totalSlides > 0 ? ((currentSlide + 1) / totalSlides) * 100 : 0;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Inject CSS fix to hide default slick arrows */}
      <style>{slickArrowFix}</style>
      
      <section id="community-intro" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Community Services
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              Caring and Sharing for a Healthier Society
            </p>
          </div>

          <p className="font-sans text-[#444] leading-relaxed text-center max-w-4xl mx-auto mb-12">
            We believe in caring and sharing. We also understand the need of people at large. Hence, to provide adequate healthcare facilities to the needy ones, All Is Well Multi Speciality Hospital, has spent more than Rs. 7.5 crores and provided free treatment and medical care to the people and made an attempt to empower them and help them live a healthy life.
          </p>

          <div className="w-full md:w-3/4 lg:w-2/3 mx-auto relative px-8">
            <Slider {...settings}>
              {communityImages.map((image, index) => (
                <div key={index} className="outline-none">
                  <SeoImage
                    src={image}
                    alt={`Community service ${index + 1}`}
                    className="w-full h-auto rounded-lg shadow-lg object-cover border-4 border-[#d4af37]"
                    style={{ maxHeight: '400px' }}
                  />
                </div>
              ))}
            </Slider>
            {/* Progress Bar */}
            <div className="mt-8">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-[#d4af37] h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressBarWidth}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">
                {currentSlide + 1} / {totalSlides}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Our Commitment - Light Gray Background */}
      <section id="our-commitment" className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Our Commitment
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Extending Healthcare Beyond Our Walls
          </h3>
          <p className="font-sans text-[#444] leading-relaxed text-center max-w-4xl mx-auto">
            Our community services are a cornerstone of our mission. We are dedicated to extending our healthcare expertise beyond our hospital walls, reaching out to underserved populations and contributing to a healthier society. Through various initiatives, we aim to provide accessible medical care, health education, and support to those who need it most.
          </p>
        </div>
      </section>
    </div>
  );
};

export default CommunityServices;
