import React from 'react';
import { Link } from 'react-router-dom';
import CardComponent from '../components/CardComponent';

const AmbulancePage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center py-20" style={{ backgroundImage: "url('/public/banners/Ambulance.webp')" }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 text-white text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
            Swift. Safe. Reliable.
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mt-4">
            24x7 Ambulance & Emergency Care - All Is Well Hospital
          </h2>
          <p className="text-xl md:text-2xl font-serif mt-6 max-w-3xl mx-auto">
            When every second counts, trust All Is Well Hospital for immediate response, expert medical attention, and compassionate care - from your doorstep to our emergency unit.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="tel:+917697744444" className="bg-[#d4af37] text-[#002d72] font-bold py-3 px-8 rounded-full hover:bg-[#c0a030] transition duration-300 text-lg">
              Call Ambulance: +91 7697744444
            </a>
            <a href="tel:+917089099888" className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] font-bold py-3 px-8 rounded-full hover:bg-[#d4af37] hover:text-[#002d72] transition duration-300 text-lg">
              24x7 Emergency Help: Just One Call Away
            </a>
          </div>
        </div>
      </section>

      {/* About All Is Well */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            About All Is Well
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Compassion That Reaches You - Anytime, Anywhere.
          </h3>
          <p className="font-sans text-[#444] mb-6 leading-relaxed text-lg">
            All Is Well Hospital was established with a mission to make emergency healthcare accessible and immediate for everyone. Our 24x7 Ambulance Services ensure that expert care reaches patients when it’s needed most.
          </p>
          <p className="font-sans text-[#444] mb-6 leading-relaxed text-lg">
            With fully equipped vehicles, trained paramedics, and a seamless hospital coordination system, we make sure that every life receives timely, professional, and safe medical support. At All Is Well, we believe in holistic care - from emergency response to recovery, we stay with you every step of the way.
          </p>
          <CardComponent
            items={[
              { title: '24x7 Advanced Life Support (ALS) & Basic Life Support (BLS) Ambulances' },
              { title: 'GPS-enabled fleet for fast response times' },
              { title: 'Experienced emergency doctors and trauma specialists' },
              { title: 'On-call paramedics and nurses' },
              { title: 'Real-time coordination with ICU and Emergency Department' },
              { title: 'Affordable and accessible ambulance assistance' },
            ]}
          />
        </div>
      </section>

      {/* Our Emergency & Specialty Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Our Emergency & Specialty Services
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Ready for Every Emergency.
          </h3>
          <p className="font-sans text-[#444] mb-6 leading-relaxed text-lg">
            Comprehensive medical response for every situation - from accident trauma to cardiac distress.
          </p>
          <CardComponent
            items={[
              { title: 'Emergency & Trauma Care' },
              { title: 'Cardiac Emergencies (Heart Attack, Stroke)' },
              { title: 'Road Accident Support & On-Site Stabilization' },
              { title: 'Neonatal & Pediatric Transfers' },
              { title: 'Critical Care & Ventilator Support Ambulances' },
              { title: 'Inter-Hospital Transfers' },
              { title: 'On-Call Doctor & Nurse Support' },
            ]}
          />
        </div>
      </section>

      {/* Why Choose All Is Well Ambulance Services */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Why Choose All Is Well Ambulance Services
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Because Every Second Matters.
          </h3>
          <CardComponent
            items={[
              { title: <><span className="font-bold">Rapid Response:</span> GPS-tracked ambulances dispatched within minutes of your call.</> },
              { title: <><span className="font-bold">Expert Paramedics:</span> Trained professionals equipped to provide life-saving care on-site.</> },
              { title: <><span className="font-bold">Seamless Handover:</span> Direct hospital coordination ensures immediate admission and continued care.</> },
              { title: <><span className="font-bold">24x7 Availability:</span> Always ready - day or night, rain or shine.</> },
              { title: <><span className="font-bold">Wide Coverage:</span> Serving across city and rural routes with reliable medical support.</> },
            ]}
          />
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Our Facilities
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Advanced Medical Infrastructure for Emergency Care
          </h3>
          <p className="font-sans text-[#444] mb-6 leading-relaxed text-lg">
            Our hospital is designed to handle critical emergencies efficiently and compassionately.
          </p>
          <CardComponent
            items={[
              { title: 'Advanced Emergency Department with triage zone' },
              { title: 'Trauma & Resuscitation Rooms' },
              { title: 'Intensive Care Units (ICUs)' },
              { title: '24x7 Pharmacy and Diagnostics' },
              { title: 'Radiology & Imaging (CT, MRI, Ultrasound)' },
              { title: 'Blood Bank & Pathology Labs' },
              { title: 'Helpline & Patient Transport Desk' },
            ]}
          />
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Patient Testimonials
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#d4af37]">
              <p className="italic text-lg text-[#444]">
                “When my father suffered a heart attack, All Is Well Hospital’s ambulance reached within 8 minutes - paramedics started treatment instantly. Their speed and professionalism saved his life.”
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-[#d4af37]">
              <p className="italic text-lg text-[#444]">
                “Their ambulance service is well-coordinated and truly 24x7. The hospital team was waiting for us when we arrived. Exceptional care!”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Emergency Help */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-serif font-bold text-[#002d72] mb-4">
            Need Emergency Help Now? We’re Just a Call Away.
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <div className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a href="tel:+917697744444" className="bg-[#d4af37] text-[#002d72] font-bold py-3 px-8 rounded-full hover:bg-[#c0a030] transition duration-300 text-lg">
              Call Ambulance: +91 7697744444
            </a>
            <Link to="/contact-us" className="bg-transparent border-2 border-[#d4af37] text-[#d4af37] font-bold py-3 px-8 rounded-full hover:bg-[#d4af37] hover:text-[#002d72] transition duration-300 text-lg">
              Request Emergency Pickup
            </Link>
          </div>
          <p className="font-sans text-[#444] mt-12 leading-relaxed text-lg">
            Every second can save a life. Trust All Is Well Hospital - your partner in emergency medical care.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AmbulancePage;
