import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentFormModal from "./AppointmentFormModal";

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSubOpen, setIsMobileSubOpen] = useState(null);
  const closeTimeoutRef = useRef(null);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { label: "Care Center", href: "/care-center", hasDropdown: true },
    { label: "Find a Doctor", href: "/find-doctor" },
    { label: "About Us", href: "#", hasDropdown: true },
    { label: "Our Branches", href: "/branches", hasDropdown: true },
    { label: "Academics", href: "/academics"},
    { label: "More", href: "#", hasDropdown: true },
  ];

  const careCenterData = {
    "SUPER SPECIALITY": [
      { label: "Neuro and Spine Surgery", href: "/care-center/neuro-spine-surgery" },
      { label: "Cardiology", href: "/care-center/cardiology" },
      { label: "Cardiovascular Thoracic Surgery", href: "/care-center/cardio-thoracic-surgery" },
      { label: "Plastic and Reconstructive Surgery", href: "/care-center/plastic-surgery" },
      { label: "Urology", href: "/care-center/urology" },
      { label: "Oncology (Medical & Surgical Both)", href: "/care-center/oncology" },
      { label: "Gastroenterology", href: "/care-center/gastroenterology" },
      { label: "Endocrinology", href: "/care-center/endocrinology" },
      { label: "Rheumatology", href: "/care-center/rheumatology" },
      { label: "Psychiatry", href: "/care-center/psychiatry" },
      { label: "Dermatology", href: "/care-center/dermatology" },
    ],
    "DIAGNOSTIC SERVICES": [
      { label: "Radiology and Imaging", href: "/care-center/radiology" },
      { label: "Pathology", href: "/care-center/pathology" },
      { label: "Blood Bank with Components", href: "/care-center/blood-bank" },
    ],
    "SUPPORT SERVICES": [
      { label: "Physiotherapy", href: "/care-center/physiotherapy" },
      { label: "Yoga", href: "/care-center/yoga" },
      { label: "Nutrition and Dietetics", href: "/care-center/nutrition-and-diet" },
    ],
    "PRIMARY CARE": [
      { label: "General Medicine", href: "/care-center/general-medicine" },
      { label: "Internal Medicine", href: "/care-center/internal-medicine" },
  
    ],
    "SPECIALITY": [
      { label: "Ear Nose Throat", href: "/care-center/ent" },
      { label: "Ophthalmology", href: "/care-center/ophthalmology" },
      { label: "Dental Services", href: "/care-center/dental" },
      { label: "Obstetrics and Gynaecology", href: "/care-center/obstetrics-and-gynaecology" },
      { label: "Pediatrics and Neonatology", href: "/care-center/pediatrics-and-neonatology" },
      { label: "Orthopedics", href: "/care-center/orthopaedics" },
      { label: "Anaesthesia", href: "/care-center/anaesthesia" },
      { label: "Critical Care Medicine", href: "/care-center/critical-care" },
      { label: "General and Minimal Invasive Surgery", href: "/care-center/general-and-minimal-invasive-surgery" },
    ]
  };

  const dropdownContent = {
    "About Us": [
      { label: "Mission and Vision", href: "/about#mission" },
      { label: "Hospital Overview", href: "/about#hospital" },
      { label: "Board Members", href: "/about#board-members" },
      { label: "Managing Society", href: "/about#managing-society" },
    ],
    "Care Center": Object.keys(careCenterData).map(title => ({
      type: "section",
      title,
      items: careCenterData[title]
    })),
    "More": [
      { label: "Community Services", href: "/community-services" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Certifications", href: "/certification" },
      
    ],
    "Our Branches": [
      { label: "All Is Well Super Clinic Shahpur", href: "/branches/shahpur" },
      { label: "All Is Well Super Clinic Khandwa", href: "/branches/khandwa" },
      { label: "All Is Well Clinic (Burhanpur)", href: "/branches/burhanpur-clinic" },
      { label: "All Is Well Super Clinic Sanawad", href: "/branches/sanawad" },
      { label: "All Is Well Super Clinic Raver", href: "/branches/raver" },
      { label: "All Is Well Sahayata Kendra Khargone", href: "/branches/khargone" },
      { label: "All Is Well Super Clinic Burhanpur", href: "/branches/burhanpur" },
      { label: "All Is Well Collection Center, Phopnar", href: "/branches/phopnar" },
      { label: "All Is Well Super Clinic, Dharni", href: "/branches/dharni" }
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setOpenDropdown(null);
        setOpenSubDropdown(null);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
        setOpenSubDropdown(null);
        setIsMobileSubOpen(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setTimeout(() => {
        const firstElement = mobileMenuRef.current?.querySelector('button, a');
        firstElement?.focus();
      }, 100);
    }
  };

  const renderCareCenterDesktop = () => {
    const categories = Object.keys(careCenterData);

    return (
      <div className="flex">
        <div className="w-48 bg-white py-2 border-r border-gray-200">
          {categories.map((category) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => {
                clearTimeout(closeTimeoutRef.current);
                setOpenSubDropdown(category);
              }}
              onMouseLeave={() => {
                closeTimeoutRef.current = setTimeout(() => {
                  setOpenSubDropdown(null);
                }, 400);
              }}
            >
              <button
                className={`w-full px-4 py-2 text-sm text-[#003366] hover:bg-blue-50 text-left transition-all duration-200 ${
                  openSubDropdown === category ? "bg-blue-50 font-medium" : ""
                }`}
              >
                {category}
              </button>

              {openSubDropdown === category && (
                <div
                  className="absolute left-full top-0 w-64 bg-white shadow-lg rounded-md border border-gray-200 z-50 transition-all duration-200 ease-in-out"
                  onMouseEnter={() => clearTimeout(closeTimeoutRef.current)}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = setTimeout(() => {
                      setOpenSubDropdown(null);
                    }, 400);
                  }}
                >
                  <ul className="py-1">
                    {careCenterData[category].map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-[#003366] hover:bg-blue-50 transition-all duration-200"
                          onClick={() => {
                            setOpenDropdown(null);
                            setOpenSubDropdown(null);
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCareCenterMobile = () => {
    return (
      <div className="pl-4 space-y-2">
        {Object.entries(careCenterData).map(([category, items]) => (
          <div key={category} className="border-b border-gray-200 pb-3">
            <button
              className="flex justify-between items-center w-full text-left text-base font-medium text-[#003366] py-2"
              onClick={() => {
                setIsMobileSubOpen(isMobileSubOpen === category ? null : category);
              }}
            >
              {category}
              <ChevronDown 
                size={18} 
                className={`transform transition-transform ${isMobileSubOpen === category ? 'rotate-180' : ''}`} 
              />
            </button>
            
            {isMobileSubOpen === category && (
              <div className="mt-2 pl-2 space-y-1">
                {items.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.href}
                    className="block py-2 text-sm text-[#003366] hover:text-[#003366] hover:underline"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setOpenDropdown(null);
                      setIsMobileSubOpen(null);
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <header 
      ref={headerRef}
      className="w-full bg-white text-[#003366] sticky top-0 z-50 transition-all duration-300 shadow-sm"
    >
      {/* Desktop Navigation (md and up) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 hidden md:flex items-center justify-between h-24">
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="flex-shrink-0">
            <img
              src="/aiwlogo.webp"
              alt="All is well"
              className="h-12 md:h-16 object-contain cursor-pointer max-w-full"
              loading="lazy"
            />
          </Link>
        </div>

        <nav className="flex items-center space-x-2 lg:space-x-4 xl:space-x-6 mx-8 flex-grow justify-center">
          {navItems.map((item, index) => {
            if (!item.hasDropdown) {
              return (
                <Link
                  key={index}
                  to={item.href}
                  className="text-xs sm:text-sm font-medium hover:text-[#003366] hover:underline transition-all duration-200 text-[#003366] whitespace-nowrap px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className="relative flex-shrink-0"
                onMouseEnter={() => {
                  if (item.hasDropdown) {
                    setOpenDropdown(item.label);
                    clearTimeout(closeTimeoutRef.current);
                  }
                }}
                onMouseLeave={() => {
                  if (item.hasDropdown) {
                    closeTimeoutRef.current = setTimeout(() => {
                      setOpenDropdown(null);
                      setOpenSubDropdown(null);
                    }, 200);
                  }
                }}
              >
                <Link
                  to={item.href}
                  className={`flex items-center text-xs sm:text-sm font-medium py-2 transition-all duration-200 whitespace-nowrap ${
                    openDropdown === item.label ? 'font-bold' : ''
                  }`}
                  onClick={(e) => {
                    // For "Care Center" and "Our Branches", allow navigation to main page
                    if (item.label === "Care Center" || item.label === "Our Branches") {
                      // If dropdown is already open, prevent navigation and just close the dropdown
                      if (openDropdown === item.label) {
                        e.preventDefault();
                        setOpenDropdown(null);
                      }
                      // Otherwise, allow navigation to the page
                    } else if (item.label === "About Us" || item.label === "More") {
                      e.preventDefault(); // Prevent navigation when dropdown is clicked for these items
                      setOpenDropdown(item.label === openDropdown ? null : item.label);
                    }
                  }}
                  aria-expanded={openDropdown === item.label}
                  aria-haspopup="true"
                >
                  {item.label} <ChevronDown size={14} className="ml-1" />
                </Link>

                {openDropdown === item.label && (
                  <div
                    className={`absolute left-0 mt-2 bg-white shadow-xl rounded-lg z-50 border border-gray-200 transition-all duration-300 hover:shadow-2xl origin-top-left ${
                      item.label === "Care Center" 
                        ? "w-auto min-w-[200px] px-0 py-2"
                        : "w-fit min-w-[280px] max-w-[400px] py-2"
                    }`}
                  >
                    {item.label === "Care Center" ? (
                      renderCareCenterDesktop()
                    ) : (
                      <div className="py-1">
                        {dropdownContent[item.label].map((section, index) => (
                          <Link
                            key={index}
                            to={section.href}
                            className="block px-4 py-2 text-sm text-[#003366] hover:bg-blue-50 transition-all duration-200 whitespace-nowrap"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {section.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex-shrink-0 ml-1">
          <button
            onClick={() => setIsAppointmentModalOpen(true)}
            className="bg-[#003366] text-white px-3 py-1 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium hover:bg-white hover:text-[#003366] border-[#003366] transition whitespace-nowrap blink"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Navigation (md:hidden) */}
      <div className="md:hidden max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex-shrink-0">
              <img
              src="/aiwlogo.webp"
              alt="All is well"
              className="h-10 object-contain cursor-pointer max-w-full"
              loading="lazy"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-[#003366] text-white px-2.5 py-1 rounded-full text-xs font-medium hover:bg-white hover:text-[#003366] border-[#003366] transition whitespace-nowrap blink"
            >
              Book
            </button>
            <button 
              onClick={toggleMobileMenu}
              className="text-[#003366] p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
          >
            <div 
              ref={mobileMenuRef}
              className="absolute right-0 top-0 h-full w-full sm:w-4/5 bg-white shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <img
                    src="/aiwlogo.webp"
                    alt="All is well"
                    className="h-8 object-contain cursor-pointer max-w-full"
                    loading="lazy"
                    />
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#003366] p-2"
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto p-4">
                  {navItems.map((item, index) => {
                    if (!item.hasDropdown) {
                      return (
                        <Link
                          key={index}
                          to={item.href}
                          className="block py-3 text-base font-medium text-[#003366] hover:text-[#003366] hover:underline"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    }

                    return (
                      <div key={item.label} className="border-b border-gray-200 py-3">
                        <Link
                          to={item.href}
                          className="flex justify-between items-center w-full text-left text-base font-medium text-[#003366]"
                          onClick={(e) => {
                            if (item.label === "Care Center" || item.label === "Our Branches") {
                              // For Care Center and Our Branches, allow navigation to main page but also toggle dropdown
                              if (openDropdown === item.label) {
                                e.preventDefault();
                                setOpenDropdown(null);
                                setIsMobileSubOpen(null);
                              } else {
                                e.preventDefault();
                                const currentOpen = openDropdown === item.label ? null : item.label;
                                setOpenDropdown(currentOpen);
                                if (item.label === "Care Center") {
                                  setIsMobileSubOpen(null);
                                }
                              }
                            } else if (item.label === "About Us" || item.label === "More") {
                              e.preventDefault(); // Prevent navigation when dropdown is clicked for these items
                              const currentOpen = openDropdown === item.label ? null : item.label;
                              setOpenDropdown(currentOpen);
                              if (item.label === "Care Center") {
                                setIsMobileSubOpen(null);
                              }
                            } else {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          aria-expanded={openDropdown === item.label}
                        >
                          {item.label}
                          <ChevronDown size={18} className={`transform transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} />
                        </Link>
                        
                        {openDropdown === item.label && (
                          <div className="mt-2">
                            {item.label === "Care Center" ? (
                              renderCareCenterMobile()
                            ) : (
                              <div className="pl-4 space-y-2">
                                {dropdownContent[item.label].map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    to={subItem.href}
                                    className="block py-2 text-sm text-[#003366] hover:text-[#003366] hover:underline"
                                    onClick={() => {
                                      setIsMobileMenuOpen(false);
                                      setOpenDropdown(null);
                                    }}
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
                <div className="p-4 border-t">
                  <button 
                    onClick={() => {
                      setIsAppointmentModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#003366] text-white px-4 py-2.5 rounded-full text-base font-medium hover:bg-white hover:text-[#003366] border border-[#003366] transition blink"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <AppointmentFormModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
