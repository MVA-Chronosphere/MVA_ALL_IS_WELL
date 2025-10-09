// Footer.jsx
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Care Center", href: "/care-center" },
    { label: "Find a Doctor", href: "/find-doctor" },
    { label: "Academic", href: "/academic" },
    { label: "Our Branches", href: "/branches" },
    { label: "Professionals", href: "/professionals" },
    { label: "Certifications", href: "/certifications" },
  ];
  const services = [
    "Emergency Care",
    "Pediatrics",
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Maternity",
    "Diagnostics",
    "Telemedicine",
  ];
  const contactInfo = {
    address: "Near Macro Vision Academy, Burhanpur, Madhya Pradesh, 450331",
    phone: "+91 7089055888  +91 7089944888",
    email: "frontdesk@alliswellhospital.com",
    hours: "Mon - Fri: 8:00 AM - 8:00 PM | Sat - Sun: 9:00 AM - 6:00 PM",
  };

  return (
    <footer className="bg-gray-900 text-white mt-16">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="lg:col-span-1">
          <img
            src="/aiwlogo.png"
            alt="All Is WEll Hospital"
            className="h-12 mb-4 max-w-full"
            loading="lazy"
          />
          <p className="text-gray-300 text-sm leading-relaxed">
            Providing compassionate, cutting-edge healthcare services with integrity and innovation since 1998.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-yellow-400 transition-colors">
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
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  {link.label}
                </a>
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
                <a
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 transition-colors text-sm"
                >
                  {service}
                </a>
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
          © {currentYear} All Is WEll Hospital. All rights reserved. |{" "}
          <a href="/privacy" className="hover:text-yellow-400 transition-colors">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms" className="hover:text-yellow-400 transition-colors">
            Terms of Service
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
