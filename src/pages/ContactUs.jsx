import React, { useRef, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaRegClock, FaRegEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = formRef.current;
    const formData = new FormData(form);

    const templateParams = {
      // Common appointment fields (set others to N/A)
      firstName: formData.get("name") || "N/A",
      lastName: "N/A",
      age: "N/A",
      gender: "N/A",
      date: new Date().toLocaleDateString("en-IN"),
      address: "N/A",
      country: "India",
      state: "N/A",
      district: "N/A",
      pincode: "N/A",
      mobile: formData.get("phone") || "N/A",
      email: formData.get("email") || "N/A",
      department: "General Inquiry",
      illnessDescription: formData.get("message") || "N/A",
      Pid: "N/A",
      doctor: "N/A",
      appointment_time: "N/A",
    };

    try {
      const serviceId = "service_ey9to09";
      const templateId = "template_db6hm5p"; // same as AppointmentFormModal
      const publicKey = "rEaE0gSCgvgy2DSpy";

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert("✅ Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      <section id="get-in-touch" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72] leading-tight">
              Get in Touch
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              We are ready to serve 24X7. Please feel free to contact us for all medical needs and emergency care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl mr-4 pt-2"><FaMapMarkerAlt /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Address</h3>
                  <p className="text-[#444]">Near Macro Vision Academy, Burhanpur, MP 450331</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl mr-4 pt-2"><FaPhoneAlt /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Contact</h3>
                  <p className="text-[#444]">+91 76977 44444</p>
                  <p className="text-[#444]">+91 70890 66888</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl mr-4 pt-2"><FaRegClock /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Opening Hours</h3>
                  <p className="text-[#444]">24 X 7 including all holidays</p>
                </div>
              </div>

              <div className="flex items-start mb-8">
                <div className="text-[#d4af37] text-4xl mr-4 pt-2"><FaRegEnvelope /></div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-2">Mail</h3>
                  <p className="text-[#444]">frontdesk@alliswellhospital.com</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-[#002d72] p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-serif font-bold text-white text-center mb-4">
                Need Emergency?
              </h2>
              <h3 className="text-2xl font-serif font-bold text-[#d4af37] text-center mb-8">
                Drop us a Line
              </h3>

              <form ref={formRef} onSubmit={sendEmail}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
                  />
                </div>

                <div className="mb-6">
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="Write your message"
                    className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#d4af37]"
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#d4af37] text-[#002d72] font-serif font-bold py-3 px-8 rounded-full shadow-md hover:bg-[#c4a035] transition"
                  >
                    {loading ? "Sending..." : "SUBMIT NOW"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
