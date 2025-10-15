import React from 'react';
import ReadMoreSection from '../components/ReadMoreSection';

const Careers = () => {
 return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      {/* Section 1: Career Opportunities - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#002d72] leading-tight">
              Join Our Team
            </h1>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <p className="text-xl md:text-2xl font-serif text-[#44] mt-3 italic">
              Be Part of Our Healthcare Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Why Join Us Column */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">Why Join All Is Well?</h2>
              <h3 className="text-xl font-serif font-semibold text-[#444] mb-4">
                A Career That Makes a Difference
              </h3>
              <p className="font-sans text-[#444] leading-relaxed">
                At All Is Well Multispecialty Hospital, you'll be part of a team dedicated to delivering world-class healthcare with compassion, innovation, and excellence. We offer competitive compensation, comprehensive benefits, and opportunities for professional growth in a state-of-the-art facility.
              </p>
            </div>

            {/* Our Values Column */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">Our Values</h2>
              <h3 className="text-xl font-serif font-semibold text-[#444] mb-4">
                What We Stand For
              </h3>
              <p className="font-sans text-[#444] leading-relaxed">
                We believe in fostering an environment of compassion, integrity, and continuous learning. Our culture promotes teamwork, innovation, and excellence while maintaining the highest standards of patient care and professional ethics.
              </p>
            </div>
          </div>

          {/* Career Benefits Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Career Benefits</h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Competitive Compensation</h3>
                <p className="font-sans text-[#444]">
                  We offer competitive salaries and comprehensive benefits packages tailored to your role and experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Professional Development</h3>
                <p className="font-sans text-[#444]">
                  Access to continuous learning, training programs, and opportunities for career advancement.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Work-Life Balance</h3>
                <p className="font-sans text-[#444]">
                  We promote a healthy work-life balance with flexible scheduling and supportive policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Current Openings - Light Gray Background */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Current Openings
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Explore Opportunities in Healthcare Excellence
          </h3>

          <div className="space-y-8 mb-12">
            {/* Opening 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-serif font-bold text-[#002d72]">Senior Consultant - Cardiology</h3>
                <span className="text-[#d4af37] font-semibold">Full-time</span>
              </div>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Experience:</span> 8-15 years</p>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Location:</span> Burhanpur</p>
              <p className="font-sans text-[#444] mb-4">
                We are seeking an experienced Cardiologist to join our team. The candidate should have extensive experience in interventional cardiology procedures and a track record of excellence in patient care.
              </p>
              <button className="bg-[#002d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#001d52] transition duration-30">
                Apply Now
              </button>
            </div>

            {/* Opening 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-serif font-bold text-[#002d72]">Junior Consultant - Orthopedics</h3>
                <span className="text-[#d4af37] font-semibold">Full-time</span>
              </div>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Experience:</span> 3-7 years</p>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Location:</span> Burhanpur</p>
              <p className="font-sans text-[#444] mb-4">
                Looking for an Orthopedic Surgeon with experience in joint replacement surgeries and trauma management. The candidate should be skilled in both conventional and minimally invasive techniques.
              </p>
              <button className="bg-[#002d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#001d52] transition duration-300">
                Apply Now
              </button>
            </div>

            {/* Opening 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-serif font-bold text-[#002d72]">Nurse Manager - Critical Care</h3>
                <span className="text-[#d4af37] font-semibold">Full-time</span>
              </div>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Experience:</span> 5-10 years</p>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Location:</span> Burhanpur</p>
              <p className="font-sans text-[#444] mb-4">
                We are looking for an experienced Nurse Manager to lead our Critical Care Unit. The candidate should have experience managing a team of 50+ nurses and maintaining high standards of patient care in an ICU environment.
              </p>
              <button className="bg-[#002d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#001d52] transition duration-300">
                Apply Now
              </button>
            </div>

            {/* Opening 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-serif font-bold text-[#002d72]">Laboratory Technician</h3>
                <span className="text-[#d4af37] font-semibold">Full-time</span>
              </div>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Experience:</span> 2-5 years</p>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Location:</span> Burhanpur</p>
              <p className="font-sans text-[#444] mb-4">
                Seeking a qualified Laboratory Technician to work in our state-of-the-art Pathology Department. The candidate should have experience with automated analyzers and maintain quality standards in diagnostic testing.
              </p>
              <button className="bg-[#002d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#001d52] transition duration-300">
                Apply Now
              </button>
            </div>

            {/* Opening 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-3">
                <h3 className="text-xl font-serif font-bold text-[#002d72]">Radiology Technician</h3>
                <span className="text-[#d4af37] font-semibold">Full-time</span>
              </div>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Experience:</span> 2-6 years</p>
              <p className="font-sans text-[#444] mb-2"><span className="font-semibold">Location:</span> Burhanpur</p>
              <p className="font-sans text-[#444] mb-4">
                We need a skilled Radiology Technician to operate our advanced diagnostic equipment including 64-slice CT Scan, 1.5 Tesla MRI, and ultrasound machines with 3D and 4D imaging capabilities.
              </p>
              <button className="bg-[#002d72] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#001d52] transition duration-300">
                Apply Now
              </button>
            </div>
          </div>

          <ReadMoreSection title="" initialCollapsedHeight={280}>
            <>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                All Is Well Multispecialty Hospital is a NABH-accredited facility spread across 16 acres with a built-up area of over 2,50,000 sq. ft., situated in a pristine and pollution-free environment with futuristic infrastructure. Our hospital is equipped with 360 beds, including 100 critical care beds, 6 large modular and 3 conventional operation theatres, and 25 specialty-specific dedicated OPD blocks.
              </p>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                Our cutting-edge technology includes 64-slice 3D CT Scan, 1.5 Tesla MRI, Cath Lab with 3D Reconstruction, Ultrasound with 3D and 4D Imaging, and advanced ventilators. We offer comprehensive services across multiple specialties including Urology, Oncology, Plastic Surgery, Brain and Spine Procedures, Cardiac Procedures, Hip and Knee Replacements, Laparoscopic and Gynaecological Surgeries, Paediatric Surgeries, Physiotherapy Rehabilitation, and Transplantation, IUI, and Bariatric Procedures.
              </p>
              <p className="font-sans text-[#444] mb-4 leading-relaxed">
                Join our team of dedicated healthcare professionals who are committed to delivering the highest standard of medical care at affordable rates. Our patient-centric approach ensures a comfortable, compassionate, and stress-free experience for patients, their attendants, and their families.
              </p>
              <p className="font-sans text-[#444] leading-relaxed">
                We offer an environment where you can grow professionally while making a meaningful difference in people's lives. Our commitment to excellence extends to our employees with competitive compensation packages, comprehensive benefits, continuous learning opportunities, and a supportive work culture that values work-life balance.
              </p>
            </>
          </ReadMoreSection>
        </div>
      </section>

      {/* Section 3: Application Process - White Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72]">
              Application Process
            </h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-white text-2xl font-bold">1</div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">Submit Application</h3>
              <p className="text-[#44] font-sans">Send your resume and cover letter to careers@alliswellhospital.com</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-white text-2xl font-bold">2</div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">Initial Screening</h3>
              <p className="text-[#44] font-sans">Our HR team reviews applications and conducts initial interviews</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-white text-2xl font-bold">3</div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">Department Interview</h3>
              <p className="text-[#444] font-sans">Meet with department heads and senior staff members</p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37] hover:shadow-md transition duration-300 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4af37] flex items-center justify-center text-white text-2xl font-bold">4</div>
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-2">Final Selection</h3>
              <p className="text-[#444] font-sans">Receive offer letter and complete onboarding process</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Contact Information - Light Gray Background */}
      <section className="py-20 bg-[#f9f9f9]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#002d72] text-center mb-4">
            Contact Our HR Team
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-[#d4af37] text-center mb-12">
            Ready to Join Our Team?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-6">Get in Touch</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="text-[#d4af37] mr-4 mt-1">•</div>
                  <div>
                    <h4 className="font-bold text-[#002d72]">Email</h4>
                    <p className="text-[#444]">careers@alliswellhospital.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-[#d4af37] mr-4 mt-1">•</div>
                  <div>
                    <h4 className="font-bold text-[#002d72]">Phone</h4>
                    <p className="text-[#444]">+91 76977 44444</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-[#d4af37] mr-4 mt-1">•</div>
                  <div>
                    <h4 className="font-bold text-[#002d72]">Address</h4>
                    <p className="text-[#444]">All Is Well Multispecialty Hospital<br />Near Collectorate, Burhanpur<br />Madhya Pradesh - 450331</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-[#002d72] mb-6">Submit Your Resume</h3>
              <p className="text-[#444] mb-6">Send us your resume and cover letter, and our HR team will get back to you within 5-7 working days.</p>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-[#d4af37]">
                <p className="text-[#44] mb-4"><span className="font-bold text-[#d4af37]">Note:</span> Please ensure your application clearly states the position you are applying for in the subject line.</p>
                <p className="text-[#444]">We look forward to welcoming you to our team of healthcare professionals committed to excellence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
