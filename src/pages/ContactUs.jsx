import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock, FaRegEnvelope } from 'react-icons/fa'; // Assuming react-icons are available

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
    
      

      {/* Section 2: Get in Touch - White Background */}
      <section id="get-in-touch" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72] leading-tight">
              Get in Touch
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              We are ready to serve 24X7. Please feel free to contact us for all types of medical needs and emergency care services including Pre and Post Rehabilitation and Full Trauma Care and Recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information Column */}
            <div>
              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl sm:text-3xl mr-4 pt-2">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Address</h3>
                  <p className="font-sans text-[#444] leading-relaxed">
                    Near Macro Vision Academy, Burhanpur, Madhya Pradesh, 450331
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl sm:text-3xl mr-4 pt-2">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Contact</h3>
                  <p className="font-sans text-[#444] leading-relaxed">+917697744444</p>
                  <p className="font-sans text-[#444] leading-relaxed">+917089066888</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl sm:text-3xl mr-4 pt-2">
                  <FaRegClock />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Opening Hours</h3>
                  <p className="font-sans text-[#444] leading-relaxed">
                    24 X 7 including all Regional, National and International holidays.
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl sm:text-3xl mr-4 pt-2">
                  <FaRegEnvelope />
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Mail</h3>
                  <p className="font-sans text-[#444] leading-relaxed">frontdesk@alliswellhospital.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="bg-[#002d72] p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-serif font-bold text-white text-center mb-4">
                Need emergency?
              </h2>
              <h3 className="text-2xl font-serif font-bold text-[#d4af37] text-center mb-8">
                Drop us a Line
              </h3>

              <form>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>
                <div className="mb-6">
                  <textarea
                    placeholder="Write your message"
                    rows="4"
                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-[#d4af37] text-[#002d72] font-serif font-bold py-3 px-8 rounded-full shadow-md hover:bg-[#c4a035] transition duration-300"
                  >
                    SUBMIT NOW
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Map - Light Gray Background */}
      <section id="map" className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72] text-center mb-4">
            Find Us
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          {/* Google Map */}
          <div className="w-full rounded-lg shadow-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.627330738039!2d76.19960731165531!3d21.286214378802946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd83359d9be1d41%3A0x7b2e4ebc56afff4b!2sAll%20Is%20Well%20Hospital!5e0!3m2!1sen!2sin!4v1759205536921!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
