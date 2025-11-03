import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const HealthPackageBookingFormModal = ({
  isOpen,
  onClose,
  healthPackage = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    packageName: healthPackage?.name || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    if (healthPackage) {
      setFormData((prev) => ({ ...prev, packageName: healthPackage.name }));
    }
  }, [healthPackage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    const { firstName, lastName, mobile, packageName } = formData;
    if (!firstName || !lastName || !mobile || !packageName) {
      alert("Please fill all required fields: First Name, Last Name, Mobile, and ensure a Health Package is selected.");
      setIsSubmitting(false);
      return;
    }

    const fd = new FormData(e.currentTarget);
    fd.append('Form Source', 'Health Package Booking - All Is Well Hospital');
    fd.append('_subject', `Health Package Booking • All Is Well Hospital`);
    fd.append('_template', 'table');
    fd.append('_captcha', 'false');
    fd.append('_autoresponse', 'Thank you for choosing All Is Well Hospital. Our team will contact you shortly.');
    fd.append("package_name", formData.packageName || healthPackage?.name || "Not specified");
    fd.append("booking_date", formData.date || "Not specified");

    try {
      const response = await fetch("https://formsubmit.co/ajax/digitalmarketing@mvaburhanpur.com", {
        method: "POST",
        body: fd,
      });

      const result = await response.json();

      if (result.success === "true") {
        alert("Health package booking request sent successfully");
        onClose();
      } else {
        setStatus("❌ Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">

        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#002d72] border-2 border-[#002d72] hover:bg-[#002d72] hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72]">
            Book a Health Package
          </h2>
          <div className="w-16 h-1 bg-primary-gold mx-auto my-4 rounded"></div>

          {healthPackage && (
            <div className="text-lg font-semibold text-[#444]">
              Package: {healthPackage.name}
            </div>
          )}

          <p className="text-xl font-serif text-[#444] italic mt-2">
            Your Path to Better Health Starts Here
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="mb-8">
            <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-4 border-b border-[#d4af37] pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {healthPackage && (
            <input type="text" name="packageName" placeholder="Health Package Name" value={formData.packageName} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 cursor-not-allowed" />
          )}

          <input type="tel" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />

          <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />

          <textarea name="message" placeholder="Your Message (optional)" value={formData.message} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none" />

          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full bg-[#002d72] text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#002d72] border border-[#002d72] transition-all duration-300">
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>

          {status && <p className="text-center text-sm mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default HealthPackageBookingFormModal;
