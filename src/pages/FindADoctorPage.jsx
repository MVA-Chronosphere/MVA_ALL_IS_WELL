import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AppointmentFormModal from '../components/AppointmentFormModal';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import FindDoctorCard from '../components/FindDoctorCard';

const FindADoctorPage = () => {
   const [searchParams] = useSearchParams();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(searchParams.get('department') || '');
  const [selectedTreatment, setSelectedTreatment] = useState(searchParams.get('treatment') || '');
  const [selectedLocation, setSelectedLocation] = useState("All Is Well Super Clinic Burhanpur");
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isAlphabetExpanded, setIsAlphabetExpanded] = useState(false);
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);
  const [isSpecialtyExpanded, setIsSpecialtyExpanded] = useState(false);
  
  const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');

  const locations = [
    "All Is Well Super Clinic Shahpur",
    "All Is Well Super Clinic Khandwa",
    "All Is Well Clinic(Burhanpur)",
    "All Is Well Super Clinic Sanawad",
    "All Is Well Super Clinic Raver",
    "All Is Well Sahayata Kendra Khargone",
    "All Is Well Super Clinic Burhanpur",
    "All Is Well Collection Center, Phopnar",
    "All Is Well Super Clinic , Dharni"
  ];

  const specialties = [
    "Plastic and Reconstructive Surgery",
    "Urology",
    "Nephrology",
    "Cardiology",
    "Neuro and Spine Surgery",
    "Surgical Oncology",
    "Radiation Oncology",
    "General Medicine",
    "Internal Medicine",
    "ENT",
    "General and Minimal Access Surgery",
    "Orthopaedic and Joint Replacement",
    "Obstetrics and Gynaecology",
    "Dermatology",
    "Psychiatry",
    "Anaesthesia",
    "Radiology",
    "Blood Bank and Pathology",
    "Dental",
    "Physiotherapy and Rehabilitation"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-[#002d72] hover:text-[#d4af37] transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">Find a Doctor</span>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#002d72]">Our Medical Experts</h1>
          <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the right doctor who's perfect for your needs. Use our advanced search filters to find specialists by name, specialty, or location.
          </p>

        </div>

        {/* Filters and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search Box */}
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37]">
              <button 
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-serif font-bold text-[#002d72]">Search Doctor</h3>
                {isSearchExpanded ? (
                  <ChevronUp className="text-[#002d72]" size={20} />
                ) : (
                  <ChevronDown className="text-[#002d72]" size={20} />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? 'max-h-24 mt-4' : 'max-h-0'
                }`}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#002d72]" size={18} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Doctor's name & Specialization"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37] mt-6">
              <button 
                onClick={() => setIsAlphabetExpanded(!isAlphabetExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-serif font-bold text-[#002d72]">Browse by first name</h3>
                {isAlphabetExpanded ? (
                  <ChevronUp className="text-[#002d72]" size={20} />
                ) : (
                  <ChevronDown className="text-[#002d72]" size={20} />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isAlphabetExpanded ? 'max-h-48 mt-4' : 'max-h-0'
                }`}
              >
                <div className="grid grid-cols-6 gap-1">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                      className={`p-2 text-sm font-medium ${
                        selectedLetter === letter
                          ? 'bg-[#d4af37] text-white'
                          : 'text-[#002d72] hover:bg-gray-100'
                      } rounded transition-all duration-300 hover:shadow-sm`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37] mt-6">
              <button 
                onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-serif font-bold text-[#002d72]">Location</h3>
                {isLocationExpanded ? (
                  <ChevronUp className="text-[#002d72]" size={20} />
                ) : (
                  <ChevronDown className="text-[#002d72]" size={20} />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isLocationExpanded ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                    <input
                      type="radio"
                      name="location"
                      checked={!selectedLocation}
                      onChange={() => setSelectedLocation('')}
                      className="rounded text-[#d4af37] focus:ring-[#d4af37]"
                    />
                    <span className="text-sm font-medium text-gray-700">All Locations</span>
                  </label>
                  {locations.map((location) => (
                    <label key={location} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="radio"
                        name="location"
                        checked={selectedLocation === location}
                        onChange={() => setSelectedLocation(location)}
                        className="rounded text-[#d4af37] focus:ring-[#d4af37]"
                      />
                      <span className="text-sm font-medium text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#d4af37] mt-6">
              <button 
                onClick={() => setIsSpecialtyExpanded(!isSpecialtyExpanded)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="font-serif font-bold text-[#002d72]">Specialities</h3>
                {isSpecialtyExpanded ? (
                  <ChevronUp className="text-[#002d72]" size={20} />
                ) : (
                  <ChevronDown className="text-[#002d72]" size={20} />
                )}
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isSpecialtyExpanded ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                    <input
                      type="radio"
                      name="specialty"
                      checked={!selectedDepartment}
                      onChange={() => setSelectedDepartment('')}
                      className="rounded text-[#d4af37] focus:ring-[#d4af37]"
                    />
                    <span className="text-sm font-medium text-gray-700">All Specialities</span>
                  </label>
                  {specialties.map((specialty) => (
                    <label key={specialty} className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded transition-colors">
                      <input
                        type="radio"
                        name="specialty"
                        checked={selectedDepartment === specialty}
                        onChange={(e) => setSelectedDepartment(e.target.checked ? specialty : '')}
                        className="rounded text-[#d4af37] focus:ring-[#d4af37]"
                      />
                      <span className="text-sm font-medium text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedLetter('');
                  setSelectedDepartment('');
                  setSelectedTreatment('');
                  setSelectedLocation('');
                }}
                className="w-full py-3 px-6 bg-[#002d72] hover:bg-[#001d4d] text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Doctors Listing */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors
                .filter((doctor) => {
                  // Filter by search query
                  if (searchQuery) {
                    const searchLower = searchQuery.toLowerCase();
                    return (
                      doctor.name.toLowerCase().includes(searchLower) ||
                      doctor.specialty.toLowerCase().includes(searchLower)
                    );
                  }
                  return true;
                })
                .filter((doctor) => {
                  // Filter by first letter, ignoring "Dr." prefix
                  if (selectedLetter) {
                    const nameWithoutPrefix = doctor.name.replace(/^Dr\.\s+/, '');
                    return nameWithoutPrefix.charAt(0).toUpperCase() === selectedLetter;
                  }
                  return true;
                })
                .filter((doctor) => {
                  // Filter by location
                  if (selectedLocation) {
                    return doctor.location === selectedLocation;
                  }
                  return true;
                })
                .filter((doctor) => {
                  // Filter by department/specialty
                  if (selectedDepartment) {
                    // Check the full specialty string for the selected department
                    return doctor.specialty.toLowerCase().includes(selectedDepartment.toLowerCase());
                  }
                  return true;
                })
                .filter((doctor) => {
                  // Filter by treatment
                  if (selectedTreatment) {
                    const treatmentMap = {
                      'heart-disease': ['cardiology', 'cardiovascular'],
                      'cancer': ['oncology'],
                      'neurological': ['neuro', 'spine', 'brain'],
                      'orthopedics': ['orthopedic', 'joint', 'bone']
                    };
                    const relatedTerms = treatmentMap[selectedTreatment] || [];
                    return relatedTerms.some(term => 
                      doctor.specialty.toLowerCase().includes(term.toLowerCase())
                    );
                  }
                  return true;
                })
                .map((doctor) => (
                <FindDoctorCard
                  key={doctor.id}
                  doctor={doctor}
                  onBookAppointment={(selectedDoc) => {
                    setSelectedDoctor(selectedDoc);
                    setIsAppointmentModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentFormModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => {
          setIsAppointmentModalOpen(false);
          setSelectedDoctor(null);
        }}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export const doctors = [
    {
      id: 1,
      name: "Dr. Abhishek Sharma",
      specialty: "Consultant Cosmetic & Plastic Surgeon, Micro-Vascular Surgery (TMC MUMBAI), Specialized Training Cleft Lip/Palate Surgery (Smile Train Surgeon) From USA, Medical Superintendent",
      image: "/Doctorphotos/Dr_Abhishek_Sharma.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 2,
      name: "Dr. Prashant Khairnar",
      specialty: "Consultant Urologist & Andrologist, Deputy Medical Superintendent",
      image: "/Doctorphotos/Dr_Prashant_Khairnar.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 3,
      name: "Dr. Nikhil Tharkade",
      specialty: "Consultant Urologist",
      image: "/Doctorphotos/Nikhil Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 4,
      name: "Dr. Shweta Narwade",
      specialty: "Consultant Radiologist",
      image: "/Doctorphotos/Dr_Shweta_Narwade.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 5,
      name: "Dr. Lokendra Singh Thakur",
      specialty: "Consultant Interventional Cardiologist",
      image: "/Doctorphotos/Dr_Lokendra_Singh_Thakur.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 6,
      name: "Dr. Basheeruddin Ansari",
      specialty: "Consultant Interventional Cardiologist",
      image: "/Doctorphotos/Bashiruddin Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 7,
      name: "Dr. Pravin R. Borde",
      specialty: "Consultant Neuro and Spine Surgery",
      image: "/Doctorphotos/Dr_Pravin_R._Borde.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 8,
      name: "Dr. Ravnik R. Bansod",
      specialty: "Fellowship in Conventional & Robotics Assisted Joint Replacement Surgery (FRJRS)",
      image: "/Doctorphotos/Dr_Ravnik_R._Bansod.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 9,
      name: "Dr. Rahul Khandekar",
      specialty: "ENT Specialist",
      image: "/Doctorphotos/Dr_Rahul_Chandrakant_Khandekar.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 10,
      name: "Dr. Divyesh Lad",
      specialty: "Consultant General Medicine",
      image: "/Doctorphotos/Dr_Divyesh_Lad.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 11,
      name: "Dr. Jayesh Dubey",
      specialty: "Consultant General Medicine",
      image: "/Doctorphotos/Dr_Jayesh_Brijbhushan_Dubey.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 12,
      name: "Dr. Gaurav Singh Pardesi",
      specialty: "Consultant General & Minimal Access Surgery",
      image: "/Doctorphotos/Dr_Gaurav_Singh_Pardesi.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 13,
      name: "DR. KIMAYA SALI MEDSHIKAR",
      specialty: "Consultant Obstetrician & Gynaecologist",
      image: "/Doctorphotos/KIMAYA SALI MEDSHIKAR.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 14,
      name: "Dr. Monish Gupta",
      specialty: "Consultant Obstetrician, Gynaecologist & Genetics Specialist",
      image: "/Doctorphotos/Monish Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 15,
      name: "Dr. Rashi Gupta",
      specialty: "Consultant Pathologist",
      image: "/Doctorphotos/Rashi Gupta.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 16,
      name: "Dr. Harshada Bhangale",
      specialty: "Consultant Pathologist",
      image: "/Doctorphotos/Dr_Harshada_Bhangale.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 17,
      name: "Dr. Peeyush Suryawanshi",
      specialty: "Consultant Pediatrician & Neonatologist",
      image: "/Doctorphotos/Peeyush Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 18,
      name: "Dr. Apurva Yadav",
      specialty: "Consultant Ophthalmologist & Cataract Surgeon",
      image: "/Doctorphotos/Apurva Yadav.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 19,
      name: "Dr. Shubham Verma",
      specialty: "Pulmonary Medicine & Critical Care",
      image: "/Doctorphotos/Shubham Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 20,
      name: "Dr. Rakesh Mahawar",
      specialty: "Radiation Oncology",
      image: "/Doctorphotos/Rakesh Mahawar.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 21,
      name: "Dr. Deepak K. Bhojwani",
      specialty: "Consultant Oncologist",
      image: "/Doctorphotos/Dr_Deepak_Kumar_Bhojwani.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 22,
      name: "Dr. Bhushan Chopde",
      specialty: "Consultant Gastroenterology & Hepatology",
      image: "/Doctorphotos/Bhushan Sir.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 23,
      name: "Dr. Yash Mahajan",
      specialty: "Psychiatry",
      image: "/Doctorphotos/Dr_Yash_Mahajan.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 24,
      name: "Dr. Chimu Chinte Chopde",
      specialty: "Endocrinology",
      image: "/Doctorphotos/Dr_Chimu_chinte_chopde.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 25,
      name: "Dr. Nikita Andhalkar",
      specialty: "Dermatologist and Venereologist",
      image: "/Doctorphotos/Dr_Nikita_Andhalkar_Bagul.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 26,
      name: "Dr. Anita Chouksey",
      specialty: "Sr. Consultant Nephrologist (Shalby Hospital, Indore)",
      image: "/Doctorphotos/Anita Chouksey.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 27,
      name: "Dr. Abhey Joshi",
      specialty: "Sr. Consultant Nephrologist (Shalby Hospital, Indore)",
      image: "/placeholders/doctor-placeholder.jpg",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 28,
      name: "Dr. Hiteshi Bais",
      specialty: "Consultant - Anesthesiologist",
      image: "/Doctorphotos/Dr_Hiteshi.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 29,
      name: "Dr. Rupali Marathe",
      specialty: "MBBS, MD (Rheumatology), BPT, MPT (Orthopedics)",
      image: "/Doctorphotos/Dr_Rupali _Marathe.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 30,
      name: "Dr. Tanishk Shroff",
      specialty: "BDS, MDS (Orthodontics)",
      image: "/Doctorphotos/Dr_Tanishk_Shroff.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
    {
      id: 31,
      name: "DR. Nazma",
      specialty: "Certified Yoga Instructor, Certified Dietitian & Nutritionist",
      image: "/Doctorphotos/Nazma Maam.png",
      location: "All Is Well Super Clinic Burhanpur",
    },
  ];

export default FindADoctorPage;
