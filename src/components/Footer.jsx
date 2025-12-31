// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock, Youtube } from "lucide-react";
import SeoImage from "./SeoImage";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { label: "Home", path: "/" },
    { label: "About Us", path: "/about" },
    { label: "Find a Doctor", path: "/find-doctor" },
    { label: "Academics", path: "/academics" },
    { label: "Our Branches", path: "/branches" },
    { label: "Community Services", path: "/community-services" },
    { label: "Certifications", path: "/certification" },
    { label: "Contact Us", path: "/contact-us" },
  ];
  // Function to convert service name to URL slug
  const serviceNameToSlug = (serviceName) => {
    return serviceName
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/,/g, '')
      .replace(/\./g, '')
      .replace(/\(/g, '')
      .replace(/\)/g, '');
  };

  // All available services from CareCenterService component
  const allServices = [
    "Neuro and Spine Surgery",
    "Cardiology",
    "Cardio Thoracic Surgery",
    "Plastic Surgery",
    "Urology",
    "Oncology",
    "Gastroenterology",
    "Endocrinology",
    "Rheumatology",
    "Radiology",
    "Critical Care",
    "Anaesthesia and Pain",
    "General and Minimal Invasive Surgery",
    "General Medicine",
    "Internal Medicine",
    "Obstetrics and Gynaecology",
    "Orthopaedics",
    "Pathology",
    "Haematology",
    "Blood Bank",
    "ENT",
    "Ophthalmology",
    "Dermatology",
    "Psychiatry",
    "Dental",
    "Yoga",
    "Physiotherapy",
    "Nutrition and Diet",
  ];

  // Randomly select 6 services
  const shuffledServices = [...allServices].sort(() => 0.5 - Math.random());
  const services = shuffledServices.slice(0, 6);
  const contactInfo = {
    address: "Near Macro Vision Academy, Burhanpur, Madhya Pradesh, 450331",
    phone: "+91 7697744444  +91 7089099888",
    email: "digitalmarketing@mvaburhanpur.com",
    hours: "Mon - Fri: 8:00 AM - 8:00 PM | Sat - Sun: 9:00 AM - 6:00 PM",
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="lg:col-span-1">
          <SeoImage
            src="/aiwlogo.webp"
            alt="All Is Well Hospital Logo"
            className="h-12 mb-4 max-w-full"
            loading="lazy"
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Providing compassionate, cutting-edge healthcare services with integrity and innovation since 2019.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://www.facebook.com/alliswellhospital" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.youtube.com/channel/UC2cT5DGcklfeITPogxehADw" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/all.is.well.hospital/" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/company/alliswellhospital/" aria-label="LinkedIn" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.path}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            {services.map((service, index) => (
              <li key={index}>
                <Link
                  to={`/care-center/${serviceNameToSlug(service)}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                  aria-label={`Learn more about ${service}`}
                >
                  {service}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-yellow-400" />
              <span>{contactInfo.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-yellow-400" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-yellow-400" />
              <span>{contactInfo.email}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 text-yellow-400" />
              <span>{contactInfo.hours}</span>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
        <p>
          © {currentYear} All Is Well Hospital. All rights reserved. |{" "}
          <a href="/Privacypolicy.pdf" download className="hover:text-yellow-400 transition-colors cursor-pointer">
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
