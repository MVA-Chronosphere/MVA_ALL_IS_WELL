// src/components/FindDoctorCard.jsx
import React from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FindDoctorCard = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col max-w-full">
      <div className="p-4 sm:p-6 flex flex-col items-center text-center flex-grow">
        {/* Doctor Image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 overflow-hidden rounded-full border-2 border-gray-200">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
            }}
          />
        </div>

        {/* Doctor Info */}
        <div className="text-center flex-grow w-full px-2">
          {/* Name */}
          <Link
            to={`/doctor/${doctor.id}`}
            className="text-lg sm:text-xl font-semibold text-gray-900 hover:underline block mb-2"
          >
            {doctor.name}
          </Link>

          {/* Specialty */}
          <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
            <span className="font-semibold">Speciality:</span>{" "}
            {doctor.specialty}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center text-xs sm:text-sm text-gray-600 mt-2 mb-4">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="line-clamp-2">{doctor.location}</span>
          </div>
        </div>

        {/* Button */}
        <div className="mt-auto w-full px-4 pb-4">
              <button
                onClick={() => onBookAppointment(doctor)}
                className="w-full py-2 px-4 border border-gray-800 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center text-sm"
              >
                Book Appointment
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </button>
        </div>
      </div>
    </div>
  );
};

export default FindDoctorCard;
