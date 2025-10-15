import React from 'react';
import ReadMoreSection from '../components/ReadMoreSection';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Section 1: Mission & Vision - White Background */}
      <section id="mission" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Mission & Vision
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#444] mt-3 italic">
              Guiding Principles for Healthcare Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Mission Column */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">Mission</h2>
              <h3 className="text-xl font-serif font-semibold text-[#444] mb-4">
                Delivering Comprehensive Care with Compassion
              </h3>
              <p className="font-sans text-[#444] leading-relaxed">
                Our mission is to provide comprehensive and advanced medical care across all specialties, combining cutting-edge technology, internationally benchmarked practices, and highly skilled professionals — delivered with compassion, integrity, and a spirit of service.
              </p>
            </div>

            {/* Vision Column */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">Vision</h2>
              <h3 className="text-xl font-serif font-semibold text-[#444] mb-4">
                Transforming Lives Through World-Class Healthcare
              </h3>
              <p className="font-sans text-[#444] leading-relaxed">
                To be a globally recognized multi-specialty hospital, delivering world-class healthcare with compassion, innovation, and excellence — transforming lives across communities.
              </p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Core Values</h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Compassionate Care</h3>
                <p className="font-sans text-[#444]">
                  We treat every patient with empathy, dignity, and respect.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Clinical Excellence</h3>
                <p className="font-sans text-[#444]">
                  We uphold the highest standards of medical practice and outcomes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Innovation</h3>
                <p className="font-sans text-[#444]">
                  We embrace technology and research to improve patient care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Hospital Overview - Light Gray Background */}
      <section id="hospital" className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            A Look Inside All Is Well Multispecialty Hospital
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Empowering Lives with Advanced Healthcare
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 rounded bg-white shadow-sm border border-[#d4af37]">
              <p className="text-3xl font-bold text-[#d4af37]">360+</p>
              <p className="text-[#002d72]">Beds</p>
            </div>
            <div className="text-center p-6 rounded bg-white shadow-sm border border-[#d4af37]">
              <p className="text-3xl font-bold text-[#d4af37]">100</p>
              <p className="text-[#002d72]">Critical Care Beds</p>
            </div>
            <div className="text-center p-6 rounded bg-white shadow-sm border border-[#d4af37]">
              <p className="text-3xl font-bold text-[#d4af37]">16</p>
              <p className="text-[#002d72]">Acres</p>
            </div>
            <div className="text-center p-6 rounded bg-white shadow-sm border border-[#d4af37]">
              <p className="text-3xl font-bold text-[#d4af37]">6</p>
              <p className="text-[#002d72]">Modular OTs</p>
            </div>
          </div>

          <ReadMoreSection title="" initialCollapsedHeight={280}>
            <>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                All Is Well Multispecialty is a division of Anand Educational, Technical, and Vocational Society established in 1998 with a strong focus on education. In May 2019, the society expanded its wings into healthcare and established the All Is Well Hospital, a state-of-the-art medical facility in Burhanpur.
              </p>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                All Is Well Multispecialty Hospital is accredited by NABH and spreads across <span className="font-bold text-[#d4af37]">16</span> <span className="text-[#002d72]">acres</span> of land, with a built-up area of over <span className="font-bold text-[#d4af37]">2,50,000</span> <span className="text-[#002d72]">sq. ft.</span>, situated in a pristine and pollution-free environment with futuristic infrastructure. Our hospital is equipped with <span className="font-bold text-[#d4af37]">360</span> <span className="text-[#002d72]">beds</span>, including <span className="font-bold text-[#d4af37]">100</span> <span className="text-[#002d72]">critical care beds</span>, <span className="font-bold text-[#d4af37]">6</span> <span className="text-[#002d72]">large modular</span> and <span className="font-bold text-[#d4af37]">3</span> <span className="text-[#002d72]">conventional operation theatres</span>, and <span className="font-bold text-[#d4af37]">25</span> <span className="text-[#002d72]">specialty-specific dedicated OPD blocks</span>. Our oxygen-generating plant, with a capacity of <span className="font-bold text-[#d4af37]">325</span> <span className="text-[#002d72]">jumbo cylinders per day</span>, ensures that all our patients receive the necessary oxygen supply at all times.
              </p>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                Our cutting-edge technology and facilities are designed to match international standards, which makes us one of the leading and largest hospitals in Central India.
              </p>

              {/* Comprehensive Facilities and Services */}
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mt-8 mb-4">Comprehensive Facilities and Services</h3>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                The hospital provides a wide range of in-house services, including:
              </p>
              
              <div className="mb-6">
                <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Pathology Lab and Radiology Services</h4>
                <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Critical Care Unit</h4>
                <p className="mb-2 ml-4 font-sans text-[#444] leading-relaxed"><span className="font-bold text-[#d4af37]">100</span> <span className="text-[#002d72]">beds</span> with cubicle partitions to minimize bacterial transmission.</p>
                
                <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Blood Bank</h4>
                <p className="mb-2 ml-4 font-sans text-[#444] leading-relaxed">Fully operational in-house facility.</p>
                
                <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Pneumatic Tube System</h4>
                <p className="mb-2 ml-4 font-sans text-[#444] leading-relaxed">Ensures rapid delivery of medicines and blood across the hospital.</p>
                
                <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Modular Operation Theatres</h4>
                <p className="mb-2 ml-4 font-sans text-[#444] leading-relaxed"><span className="font-bold text-[#d4af37]">6</span> <span className="text-[#002d72]">Corian-modular theatres</span> that maintain a sterile environment for zero bacterial growth.</p>
              </div>

              {/* Advanced Diagnostic and Therapeutic Technologies */}
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mt-8 mb-4">Advanced Diagnostic and Therapeutic Technologies</h3>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                Our cutting-edge diagnostic and treatment facilities include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 ml-4">
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">64</span><span className="text-[#002d72]">-Slice 3D CT Scan</span> and <span className="font-bold text-[#d4af37]">1.5</span> <span className="text-[#002d72]">Tesla MRI</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Cath Lab</span> <span className="text-[#002d72]">with 3D Reconstruction</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Ultrasound</span> <span className="text-[#002d72]">with 3D and 4D Imaging</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">SERVOi, SERVOs, SERVOairMaquet & GER860</span> <span className="text-[#002d72]">Ventilators</span></p>
              </div>

              {/* Specialty Departments */}
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mt-8 mb-4">Specialty Departments</h3>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                We cater to a wide range of medical needs, including:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 ml-4">
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Urology</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Oncology</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Plastic Surgery</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Brain and Spine</span> <span className="text-[#002d72]">Procedures</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Cardiac</span> <span className="text-[#002d72]">Procedures</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Hip and Knee</span> <span className="text-[#002d72]">Replacements</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Laparoscopic and Gynaecological</span> <span className="text-[#002d72]">Surgeries</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Paediatric</span> <span className="text-[#002d72]">Surgeries</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Physiotherapy</span> <span className="text-[#002d72]">Rehabilitation</span></p>
                <p className="mb-2 font-sans text-[#444] leading-relaxed">• <span className="font-bold text-[#d4af37]">Transplantation, IUI, and Bariatric</span> <span className="text-[#002d72]">Procedures</span></p>
              </div>

              {/* Our Commitment to Excellence */}
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mt-8 mb-4">Our Commitment to Excellence</h3>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                At All Is Well Multispecialty Hospital, we are dedicated to delivering the highest standard of medical care at affordable rates. Our patient-centric approach ensures a comfortable, compassionate, and stress-free experience for patients, their attendants, and their families.
              </p>
              
              <p className="font-sans text-[#444] leading-relaxed">
                We invite you to visit us and experience the difference in medical care at All Is Well Multispecialty Hospital.
              </p>
            </>
          </ReadMoreSection>
        </div>
      </section>

      {/* Section 3: Board Members - White Background */}
      <section id="board-members" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72]">
              Board Members
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Board Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/Manjusha.jpg" 
                  alt="Manjusha Chouksey"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Manjusha Chouksey</h3>
              <p className="text-[#444] font-sans">President</p>
            </div>

            {/* Board Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/sudhir.jpg" 
                  alt="Sudhir Mahajan"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Sudhir Mahajan</h3>
              <p className="text-[#444] font-sans">Vice President</p>
            </div>

            {/* Board Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/Anand.webp" 
                  alt="Anand Prakash Chouksey"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Anand Prakash Chouksey</h3>
              <p className="text-[#444] font-sans">Secretary</p>
            </div>

            {/* Board Member 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/vandana.jpg" 
                  alt="Vandana Patel"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Vandana Patel</h3>
              <p className="text-[#444] font-sans">Joint Secretary</p>
            </div>

            {/* Board Member 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/kabir.jpg" 
                  alt="Kabir Chouksey"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Kabir Chouksey</h3>
              <p className="text-[#44] font-sans">Treasurer</p>
            </div>

            {/* Board Member 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/antra.jpg" 
                  alt="Antra Chouksey"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Antra Chouksey</h3>
              <p className="text-[#444] font-sans">Member</p>
            </div>

            {/* Board Member 7 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-40 h-40 mx-auto mb-4 rounded-lg overflow-hidden shadow-md">
                <img 
                  src="board/devanshi.jpg" 
                  alt="Devanshi Chouksey"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-1">Devanshi Chouksey</h3>
              <p className="text-[#444] font-sans">Member</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Managing Society - Light Gray Background */}
      <section id="managing-society" className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            ANAND EDUCATIONAL, TECHNICAL & VOCATIONAL SOCIETY
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Reg. No. 3450/98/IND
          </h3>

          <ReadMoreSection title="" initialCollapsedHeight={280}>
            <>
              <div className="space-y-6 mb-12">
                <p className="font-sans text-[#444] leading-relaxed">
                  Our society, started functioning since 1998 with the aim of imparting quality education, to develop educational awareness, to train the students for various competitive exams, skill oriented courses and to shape the future citizens of India.
                </p>

                <p className="font-sans text-[#444] leading-relaxed">
                  Our initial step was with the inception of New Vision Hr. Sec. School [Affiliate to M.P. Board, Bhopal]. The efficient and devoted staff members have been successful in setting high standards and new trends in the field of education. The untiring efforts of our scholars resulted in unimaginable and first-rate outcomes, which we have proved with our excellent results.
                </p>

                <p className="font-sans text-[#444] leading-relaxed">
                  With the core objective to impart metropolitan standard of education, Macro Vision Academy was started in 2002-2003 session [Affiliated to C.B.S.E., New Delhi].
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-6">
                  Entrance to healthcare arena
                </h3>
                <p className="font-sans text-[#444] leading-relaxed">
                  With the objective of providing cost-effective universal healthcare services to the people, Society decided to build a Multispecialty Hospital and was named All is Well. The foundation of All is Well was laid on Wednesday, 05 April 2017.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-6">
                  Infrastructural Developments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Educational Facilities</h4>
                    <ul className="space-y-4">
                      <li className="font-sans text-[#444] leading-relaxed">
                        Society came up with <span className="font-bold text-[#d4af37]">"Harsh-Deep Hostel"</span> in the session 2006-2007, followed by <span className="font-bold text-[#d4af37]">Petals Hostel</span> and <span className="font-bold text-[#d4af37]">Paradise Hostel</span> in 2015 and 2017.
                      </li>
                      <li className="font-sans text-[#444] leading-relaxed">
                        Built a <span className="font-bold text-[#d4af37]">hi-tech computer lab</span> with latest configured iMacs from Apple and enriched school library resources.
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-semibold text-[#d4af37] mb-3">Infrastructure Development</h4>
                    <ul className="space-y-4">
                      <li className="font-sans text-[#444] leading-relaxed">
                        Construction of a <span className="font-bold text-[#d4af37]">trend-setting auditorium</span> with <span className="text-[#002d72]">2200</span> seating capacity - set to be India's biggest closed auditorium.
                      </li>
                      <li className="font-sans text-[#444] leading-relaxed">
                        Development of <span className="font-bold text-[#d4af37]">world-class sports facilities</span> through a new sports complex.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-6">
                  Future Plans
                </h3>
                <p className="font-sans text-[#444] leading-relaxed">
                  Society further wishes to build a <span className="font-bold text-[#d4af37]">separate block for Oncology</span> (Cancer Department) by 2025.
                </p>
              </div>
            </>
          </ReadMoreSection>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
