import React from 'react';
import ReadMoreSection from '../components/ReadMoreSection';

const Academics = () => {
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
                To create a suitable & massive infrastructure to meet the demands & march ahead providing excellent education, adapting new developments in to profession and promote research in to nursing & paramedics by following whole heartedly the principle of our professions in transforming knowledge into practice through the most cost effective methods to achieve global health goals. 
              </p>
            </div>

            {/* Vision Column */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-3xl font-serif font-bold text-[#002d72] mb-4">Vision</h2>
              <h3 className="text-xl font-serif font-semibold text-[#444] mb-4">
                Transforming Lives Through World-Class Healthcare
              </h3>
              <p className="font-sans text-[#444] leading-relaxed">
                To recognize ourselves in the leadership position among the best nursing and paramedical institutions as a centre for excellence in professional education, training, practice & research to meet the challenges pertaining to the human health./</p>
            </div>
          </div>

          {/* Core Values Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-[#002d72] text-center mb-8">Core Values</h2>
            <div className="w-16 h-1 bg-[#d4af37] mx-auto mb-8 rounded"></div>
            <ReadMoreSection initialCollapsedHeight={500}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Autonomy</h3>
                  <p className="font-sans text-[#444]">
                    Autonomy is about power and control over nursing practice. Greater autonomy for nurses improves patients care, patient satisfaction and elevates the status of the profession.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Accountability</h3>
                  <p className="font-sans text-[#444]">
                    Accountability is an inherent confidence as a professional that allows taking pride in being transparent about the way he / she has carried out their practice. One must be personally accountable for his/ her actions and therefore place the emphasis on the development & demonstration of competence in practice.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Compassion</h3>
                  <p className="font-sans text-[#444]">
                    Compassion refers to being close to patients & seeing their situation as more than a medical scenario & routine procedure. In the profession like nursing & paramedical sciences it is the fundamental element of care & reflex the strength of the profession.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Discipline</h3>
                  <p className="font-sans text-[#444]">
                    Discipline is course of action leading to a greater goal than the satisfaction of the immediate. Discipline as whole imparting systematic and standardized care & to developed sense of honour leading to self-actualization and self-esteem.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Diversity</h3>
                  <p className="font-sans text-[#444]">
                    Diversity is being aware of similarities and differences among the diverse client care of population in the area of health and illness. In the practice of nursing and paramedics it is imperative that we should understand concepts such as culture & multiculturalism & their influence on health and health perceptions, while providing health care for the individual as well as the community.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Human Dignity</h3>
                  <p className="font-sans text-[#444]">
                    Human dignity is respect for the inherent worth & uniqueness of individuals & populations in the practice concern for human dignity is reflected when every patient is being valued as a person.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                  <h3 className="text-xl font-serif font-semibold text-[#002d72] mb-3">Integrity</h3>
                  <p className="font-sans text-[#444]">
                    Integrity is an understanding and knowing oneself entirely and completely (physically, mentally, spiritually & emotionally). Professionals need to know and relate to others in a holistic manner which will serve as the basis for providing quality care by being respectful, honest, ethical & morally justified.
                  </p>
                </div>
              </div>
            </ReadMoreSection>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Academics;