// src/components/FindDoctorCard.jsx
import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FindDoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#d4af37] overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col max-w-full">
      <div className="p-6 flex-col items-center text-center flex-grow">
        {/* Doctor Image */}
        <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-[#d4af37] shadow-md">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.webp";
            }}
          />
        </div>

        {/* Doctor Info */}
        <div className="text-center flex-grow w-full px-2 mt-4">
          {/* Name */}
          <Link
            to={`/doctor/${doctor.id}`}
            className="text-xl font-serif font-bold text-[#002d72] hover:underline block mb-2"
          >
            {doctor.name}
          </Link>

          {/* Specialty */}
          <p className="text-sm text-[#444] mb-2 line-clamp-2 font-sans">
            <span className="font-semibold">Speciality:</span>{" "}
            {doctor.specialty}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center text-sm text-[#444] mt-2 mb-4 font-sans">
            <MapPin className="w-4 h-4 mr-1 text-[#d4af37]" />
            <span className="line-clamp-2">{doctor.location}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto w-full px-4 pb-4">
              <button
                onClick={() => onBookAppointment(doctor)}
                className="w-full py-2 px-4 bg-[#002d72] hover:bg-[#001d4d] text-white font-medium rounded transition-colors flex items-center justify-center text-sm border border-[#002d72]"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorCard;
