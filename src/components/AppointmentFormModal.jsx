// components/AppointmentFormModal.jsx
import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { indianStatesCities } from "../data/indianStatesCities";
import emailjs from "@emailjs/browser";

const AppointmentFormModal = ({
  isOpen,
  onClose,
  department: initialDepartment = "",
  doctor = null,
  selectedDate = "",
  selectedTime = "",
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    date: selectedDate || "",
    address: "",
    country: "India",
    state: "",
    district: "",
    pincode: "",
    mobile: "",
    email: "",
    department: initialDepartment,
    illnessDescription: "",
    Pid: "",
  });

  const [cities, setCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setCities(indianStatesCities[value] || []);
      setFormData((prev) => ({ ...prev, district: "" }));
    }
  };

  useEffect(() => {
    if (doctor) {
      const specialty = doctor.specialty;
      const department = specialty
        .split(",")[0]
        .split(" and ")[0]
        .split(" & ")[0]
        .trim();

      setFormData((prev) => ({ ...prev, department }));
    } else {
      setFormData((prev) => ({ ...prev, department: initialDepartment }));
    }
  }, [initialDepartment, doctor]);

  useEffect(() => {
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, mobile, age, gender } = formData;
    if (!firstName || !lastName || !mobile || !age || !gender) {
      alert("Please fill all required fields: First Name, Last Name, Mobile, Age, Gender.");
      return;
    }

    try {
      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        gender: formData.gender,
        date: formData.date || "Not specified",
        address: formData.address || "Not specified",
        country: formData.country,
        state: formData.state || "Not specified",
        district: formData.district || "Not specified",
        pincode: formData.pincode || "Not specified",
        mobile: formData.mobile,
        email: formData.email || "Not provided",
        department: formData.department || "Not specified",
        illnessDescription: formData.illnessDescription || "Not specified",
        Pid: formData.Pid || "N/A",
        doctor: doctor?.name || "Not specified",
        appointment_time: selectedTime || "Not specified",
      };

      // 📨 Replace these IDs with your actual EmailJS credentials
      const serviceId = "service_ey9to09";
      const templateId = "template_db6hm5p";
      const publicKey = "rEaE0gSCgvgy2DSpy";

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      alert("Appointment request sent successfully!");
      onClose();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again later.");
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
            Book an Appointment
          </h2>
          <div className="w-16 h-1 bg-primary-gold mx-auto my-4 rounded"></div>

          {doctor && (
            <div className="text-lg font-semibold text-[#444]">
              With Dr. {doctor.name.replace("Dr. ", "")}
            </div>
          )}

          {selectedTime && (
            <div className="text-md font-medium text-[#666] mt-1">
              Date:{" "}
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {selectedTime}
            </div>
          )}

          <p className="text-xl font-serif text-[#444] italic mt-2">
            Your Path to Better Health Starts Here
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Info */}
          <div className="mb-8">
            <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-4 border-b border-[#d4af37] pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              <input type="text" name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Age and PID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="Pid" placeholder="Patient Id (optional)" value={formData.Pid} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Gender & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <select name="gender" value={formData.gender} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select Gender *</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" name="address" placeholder="Address (optional)" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            <select name="country" value={formData.country} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="India">India</option>
            </select>
          </div>

          {/* Mobile */}
          <div className="flex items-center border border-gray-300 rounded-md">
            <div className="px-3 py-2 bg-gray-50 border-r border-gray-300 flex items-center gap=1">
              <img src="/flag.webp" alt="India" className="w-5 h-5" />
              <span>+91</span>
              <ChevronDown size={14} className="ml-1 text-gray-500" />
            </div>
            <input type="tel" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleInputChange} required className="flex-1 px-3 py-2 focus:outline-none" />
          </div>

          {/* Email & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="email" name="email" placeholder="Email (optional)" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
            <select name="department" value={formData.department} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
              <option value="">Select Department (optional)</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Oncology">Oncology</option>
              <option value="Neurology">Neurology</option>
              <option value="Urology">Urology</option>
            </select>
          </div>

          <textarea name="illnessDescription" placeholder="Describe any illness (optional)" value={formData.illnessDescription} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none" />

          <div className="pt-4">
            <button type="submit" className="w-full bg-[#002d72] text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#002d72] border border-[#002d72] transition-all duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormModal;
