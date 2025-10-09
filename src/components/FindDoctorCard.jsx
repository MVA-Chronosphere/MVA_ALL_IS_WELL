// src/components/FindDoctorCard.jsx
import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

const FindDoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="w-full border-b border-gray-300 py-6">
      <div className="flex flex-col md:flex-row items-start md:space-x-6">
        
        {/* Doctor Image */}
        <div className="w-40 h-40 overflow-hidden rounded-md border flex-shrink-0 mb-4 md:mb-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover max-w-full"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
            }}
          />
        </div>

        {/* Doctor Info */}
        <div className="flex-1">
          {/* Name */}
          <a
            href="#"
            className="text-xl font-semibold text-gray-900 hover:underline"
          >
            {doctor.name}
          </a>

          {/* Designation */}
          <p className="text-sm text-gray-700">{doctor.designation}</p>

          {/* Qualifications */}
          <p className="text-sm text-gray-800 mt-1">{doctor.qualifications}</p>

          {/* Specialty */}
          <p className="text-sm mt-1">
            <span className="font-semibold">Speciality:</span>{" "}
            {doctor.specialty}
          </p>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mt-2">
            <MapPin className="w-4 h-4 mr-1" />
            {doctor.location}
          </div>

          {/* Button */}
          <div className="mt-4">
            <button
              onClick={() => onBookAppointment(doctor)}
              className="inline-flex items-center px-5 py-2 border border-gray-800 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorCard;
