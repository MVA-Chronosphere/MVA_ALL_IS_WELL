// components/AppointmentFormModal.jsx
import React, { useState, useEffect } from "react";
import { X,ChevronDown } from "lucide-react";
import { indianStatesCities } from "../data/indianStatesCities";

const AppointmentFormModal = ({ isOpen, onClose, department: initialDepartment = "", doctor = null, selectedDate = "", selectedTime = "" }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mrdNo: "",
    age: "",
    gender: "",
    date: "",
    address: "",
    country: "India",
    state: "",
    district: "",
    pincode: "",
    mobile: "",
    email: "",
    department: initialDepartment,
    illnessDescription: "",
  });

  const [cities, setCities] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "state") {
      setCities(indianStatesCities[value] || []);
      setFormData((prev) => ({ ...prev, district: "" })); // Reset district when state changes
    }
  };

  // Update department when initialDepartment prop changes or when doctor prop changes
  useEffect(() => {
    if (doctor) {
      // Extract department/specialty from doctor's specialty string
      const specialty = doctor.specialty;
      const department = specialty.split(',')[0].split(' and ')[0].split(' & ')[0].trim();
      setFormData(prev => ({
        ...prev,
        department: department
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        department: initialDepartment
      }));
    }
  }, [initialDepartment, doctor]);

  // Set the selected date and time if they are provided
  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  }, [selectedDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you'd send data to backend or show success message
    alert("Appointment request submitted! We'll contact you soon.");
    onClose(); // Close modal after submit
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-[#002d72] border-2 border-[#002d72] hover:bg-[#002d72] hover:text-white"
            aria-label="Close form"
          >
            <X size={24} />
          </button>
        </div>
        {/* Header */}
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
              Date: {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedTime}
            </div>
          )}
          <p className="text-xl font-serif text-[#44] italic mt-2">
            Your Path to Better Health Starts Here
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-4 border-b border-[#d4af37] pb-2">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Row 2: MRD No & Age */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="mrdNo"
                placeholder="MRD No/No's (if any)"
                value={formData.mrdNo}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3: Gender & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <input
                type="date"
                name="date"
                placeholder="Select Date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 4: Address & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="India">India</option>
            
                {/* Add more countries as needed */}
              </select>
            </div>
          </div>

          {/* Row 5: State & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select State</option>
                {Object.keys(indianStatesCities).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select District</option>
                {cities.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 6: Pincode & Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center border border-gray-30 rounded-md">
              <div className="px-3 py-2 bg-gray-50 border-r border-gray-300 flex items-center gap-1">
                <img src="/flag.jpg" alt="India" className="w-5 h-5" /> {/* Replace with actual flag */}
                <span>+91</span>
                <ChevronDown size={14} className="ml-1 text-gray-500" />
              </div>
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                required
                className="flex-1 px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 7: Email & Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Oncology">Oncology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Plastic and Reconstructive Surgery">Plastic and Reconstructive Surgery</option>
                <option value="Urology">Urology</option>
                <option value="Nephrology">Nephrology</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Neuro and Spine Surgery">Neuro and Spine Surgery</option>
                <option value="Surgical Oncology">Surgical Oncology</option>
                <option value="Radiation Oncology">Radiation Oncology</option>
                <option value="Internal Medicine">Internal Medicine</option>
                <option value="ENT">ENT</option>
                <option value="General and Minimal Access Surgery">General and Minimal Access Surgery</option>
                <option value="Orthopaedic and Joint Replacement">Orthopaedic and Joint Replacement</option>
                <option value="Obstetrics and Gynaecology">Obstetrics and Gynaecology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="Anaesthesia">Anaesthesia</option>
                <option value="Radiology">Radiology</option>
                <option value="Blood Bank and Pathology">Blood Bank and Pathology</option>
                <option value="Dental">Dental</option>
                <option value="Physiotherapy and Rehabilitation">Physiotherapy and Rehabilitation</option>
              </select>
            </div>
          </div>

          {/* Illness Description */}
          <div>
            <textarea
              name="illnessDescription"
              placeholder="Describe any Present illness:"
              value={formData.illnessDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

        

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#002d72] text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-[#002d72] border border-[#002d72] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#002d72] focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentFormModal;111
