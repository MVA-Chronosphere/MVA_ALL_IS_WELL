import React from 'react';
import { Link } from 'react-router-dom';

const BranchesPage = () => {
  const branches = [
    { name: "Burhanpur", path: "/branches/burhanpur", image: "/aiwlogo.webp" },
    { name: "Khandwa", path: "/branches/khandwa", image: "/aiwlogo.webp" },
    { name: "Shahpur", path: "/branches/shahpur", image: "/aiwlogo.webp" },
    { name: "Sanawad", path: "/branches/sanawad", image: "/aiwlogo.webp" },
    { name: "Raver", path: "/branches/raver", image: "/aiwlogo.webp" },
    { name: "Khargone", path: "/branches/khargone", image: "/aiwlogo.webp" },
    { name: "Burhanpur Clinic", path: "/branches/burhanpur-clinic", image: "/aiwlogo.webp" },
    { name: "Phopnar", path: "/branches/phopnar", image: "/aiwlogo.webp" },
    { name: "Dharni", path: "/branches/dharni", image: "/aiwlogo.webp" },
  ];

 return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Section 1: Branches Overview - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Our Branches
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              Explore our network of healthcare facilities across the region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
                <h2 className="text-xl font-serif font-bold text-[#002d72] mb-3">{branch.name}</h2>
                <p className="font-sans text-[#444] mb-4">Comprehensive healthcare services at your convenience.</p>
                <Link 
                  to={branch.path} 
                  className="inline-block bg-[#d4af37] text-white px-4 py-2 rounded-md hover:bg-[#b8942c] transition-colors duration-300"
                >
                  Visit Branch
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BranchesPage;
