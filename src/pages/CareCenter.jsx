import React from 'react';
import { Link } from 'react-router-dom';

const CareCenter = () => {
  // Care center services data organized by category
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
      { label: "Microbiology", href: "/care-center/microbiology" },
      { label: "Blood Bank with Components", href: "/care-center/blood-bank" },
    ],
    "SUPPORT SERVICES": [
      { label: "Physiotherapy", href: "/care-center/physiotherapy" },
      { label: "Yoga", href: "/care-center/yoga" },
      { label: "Nutrition and Dietetics", href: "/care-center/nutrition-and-diet" },
      { label: "Pharmacy", href: "/care-center/pharmacy" },
    ],
    "PRIMARY CARE": [
      { label: "General Medicine", href: "/care-center/general-medicine" },
      { label: "Internal Medicine", href: "/care-center/internal-medicine" },
      { label: "Family Medicine", href: "/care-center/family-medicine" },
      { label: "General Practice", href: "/care-center/general-practice" },
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

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Section 1: Care Center Overview - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Care Center
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              Comprehensive healthcare services across multiple specialties
            </p>
          </div>

          {/* Care Center Categories */}
          <div className="space-y-16">
            {Object.entries(careCenterData).map(([category, services], categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-sm border border-[#d4af37] p-8">
                <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-8 text-center">{category}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service, serviceIndex) => (
                    <div 
                      key={serviceIndex} 
                      className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37] hover:shadow-md transition duration-300"
                    >
                      <h3 className="text-xl font-serif font-bold text-[#002d72] mb-3">{service.label}</h3>
                      <Link 
                        to={service.href} 
                        className="inline-block bg-[#d4af37] text-white px-4 py-2 rounded-md hover:bg-[#b8942c] transition-colors duration-300"
                      >
                        Learn More
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareCenter;
