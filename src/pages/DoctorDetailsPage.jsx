import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Calendar, ArrowLeft, GraduationCap, Award, Stethoscope } from 'lucide-react';
import { doctors } from './FindADoctorPage';
import AppointmentFormModal from '../components/AppointmentFormModal';
import SeoImage from '../components/SeoImage';

const DoctorDetailsPage = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
 const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
 const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    // Find the doctor by ID from the doctors array
    const foundDoctor = doctors.find(d => d.id === parseInt(doctorId));
    setDoctor(foundDoctor || null);
  }, [doctorId]);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Doctor not found</h2>
          <button 
            onClick={() => navigate('/find-doctor')}
            className="mt-4 px-4 py-2 bg-[#002d72] text-white rounded hover:bg-[#001d4d] transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

 // Sample availability times
  const availabilityTimes = [
    "9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  // Generate next 7 days for scheduling
  const generateNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
 };

  const nextDays = generateNextDays();

  // Get detailed doctor info based on doctor's name
  const getDoctorDetails = () => {
    if (doctor.name.includes("Abhishek Sharma")) {
      return {
        about: "Fellowship: Cosmetic Surgery and specialized training in microsurgery from prestigious institutes, Mumbai. International Training: Specialized training in Cleft Lip and Cleft Palate Surgery from the USA.",
        experience: "Currently serving at All Is Well Multispecialty Hospital, Burhanpur. 18+ years of experience in Cosmetic and Plastic Surgery. Holder of MCh (Plastic Surgery). Trained across top Indian institutions. Performed thousands of procedures with over 6000 hours of continued aesthetic surgery education.",
        specializations: [
          "Cosmetic & Plastic Surgery",
          "Laser Surgery, Botox, Fillers, Mesotherapy",
          "Breast Augmentation, Liposuction, Rhinoplasty",
          "Facelift, Thread Lifts, Sex Reassignment",
          "Brain Surgery - Traumatic Brain Injuries, Brain Tumors, Hydrocephalus, Stroke (Ischemic/Hemorrhagic), Endoscopic Brain Surgery",
          "Spine Surgery - Traumatic Spine (Cervical–Lumbar), Disc Disease, Spinal Tumors, Endoscopic & Minimally Invasive Spine Surgery"
        ],
        expertise: [
          "Expert in Lasers, Botox, Fillers, Facial Rejuvenation",
          "Specialist in Breast Surgery, Liposuction, Abdominoplasty, Rhinoplasty, Facelift",
          "Performs advanced surgeries including Sex Reassignment & Thread Lifts",
          "Uses computer imaging for precision in Facial Contouring",
          "Trained in Aptos Thread Lift, Vertical Scar Mammoplasty, and Sub-Fascial Breast Augmentation"
        ],
        accreditations: [
          "Accredited Smile Train Surgeon (Smile Train – World Craniofacial Foundation, USA)",
          "Senior life member of major medical and surgical associations",
          "Recipient of professorships in Cosmetic and Plastic Surgery"
        ],
        otherExperience: "Former Medical Casualty Officer & Unit Head with expertise in ICCU and cardiac recovery management."
      };
    } else if (doctor.name.includes("Prashant Khairnar")) {
      return {
        about: "Dr. Prashant Khairnar is a Consultant Urologist at All Is Well Multispecialty Hospital, Burhanpur. He has more than 15 years of experience as a Urosurgeon and Andrologist, treating patients with precision and compassion. He completed his Senior Residency in the Department of UroOncology at the prestigious TATA Memorial Hospital, Mumbai, and has served in renowned hospitals across Maharashtra.",
        experience: "Expert in URSL, Bipolar (Plasma) TURP, TURBT, PCNL, Mini-PCNL, and Laser Endourological procedures. Skilled in use of Olympus Bipolar System and Electrohydraulic ESWL for Renal Calculi. Treats sexual health issues including erectile dysfunction, premature ejaculation, and male infertility. Experience in Extra Corporeal Shock Wave Lithotripsy (ESWL). Fluent in advanced Urological technologies and protocols.",
        specializations: [
          "Endourology & Stone Management: URSL, TURP, TURBT",
          "PCNL, Mini-PCNL",
          "Laser stone surgery & Lithotripsy (ESWL)",
          "Andrology & Male Health: Erectile Dysfunction",
          "Premature Ejaculation",
          "Male Infertility",
          "Uro-Oncology: Bladder Cancer Management",
          "Prostate & Kidney Tumor Surgeries",
          "Post-cancer urinary reconstruction"
        ],
        expertise: [
          "Expert in URSL, Bipolar (Plasma) TURP, TURBT, PCNL, Mini-PCNL, and Laser Endourological procedures",
          "Skilled in use of Olympus Bipolar System and Electrohydraulic ESWL for Renal Calculi",
          "Treats sexual health issues including erectile dysfunction, premature ejaculation, and male infertility",
          "Experience in Extra Corporeal Shock Wave Lithotripsy (ESWL)",
          "Fluent in advanced Urological technologies and protocols"
        ],
        accreditations: [
          "Former Senior Resident – UroOncology, TATA Memorial Hospital, Mumbai",
          "Member of Urological Society of India (USI)",
          "Recognized for excellence in Andrology & Endourology procedures"
        ],
        otherExperience: "Known for his clinical excellence and compassionate care, Dr. Khairnar has contributed to the advancement of Urology services in tier-2 and tier-3 cities. He continues to stay updated with the latest advancements in minimally invasive and laser-based urological care."
      };
    } else if (doctor.name.includes("Anita Chowksey")) {
      return {
        about: "Dr. Anita Chowksey is a Visiting Senior Consultant Nephrologist at All Is Well Multispecialty Hospital, Burhanpur. With 33+ years of experience in Nephrology, she has been offering dedicated care since 1991, having served in reputed institutions like P.D. Hinduja National Hospital, Mumbai, and leading hospitals in Indore. She is recognized for her integrity, precision, and compassionate approach in the field of kidney care.",
        experience: "33+ years of experience in Nephrology since 1991. Served in reputed institutions like P.D. Hinduja National Hospital, Mumbai, and leading hospitals in Indore. Has been offering dedicated kidney care with integrity, precision, and compassion throughout her career.",
        specializations: [
          "Dialysis Therapies - Hemodialysis (Conventional & High-Flux)",
          "Peritoneal Dialysis",
          "Plasmapheresis",
          "Diabetic Nephropathy",
          "Hypertensive Nephrosclerosis",
          "Glomerulonephritis & CKD",
          "Pre- & Post-Kidney Transplant Management",
          "Acute and Chronic Rejection Treatment",
          "Immunosuppression Monitoring"
        ],
        expertise: [
          "Management of Kidney Transplants and Post-transplant care",
          "Kidney Biopsy and diagnostic nephrology",
          "Peritoneal Dialysis and Hemodialysis across all modalities",
          "Plasmapheresis and treatment of complex autoimmune renal conditions",
          "Management of Diabetic Kidney Disease and Chronic Kidney Disease (CKD)"
        ],
        accreditations: [
          "Secured Honours in Physiology and Merit in Ophthalmology during academics",
          "Awarded prestigious scholarships for academic excellence",
          "Published multiple research papers in national and international journals",
          "Active participant and presenter at nephrology conferences across India"
        ],
        otherExperience: "Dr. Chowksey is celebrated not just for her clinical acumen but also for her commitment to patient education and ethical medical practice. She continues to shape the future of kidney care with evidence-based medicine and mentorship to young nephrologists."
      };
    } else if (doctor.name.includes("Lokendra Singh Thakur")) {
      return {
        about: "Dr. Lokendra Singh Thakur is a Consultant Interventional Cardiologist at All Is Well Multispecialty Hospital, Burhanpur. He brings with him a wealth of experience in diagnosing, treating, and managing a broad spectrum of cardiovascular conditions with clinical precision and care.",
        experience: "Extensive experience in diagnosing, treating, and managing a broad spectrum of cardiovascular conditions with clinical precision and care. Known for compassionate approach, timely interventions, and dedication to improving patient outcomes.",
        specializations: [
          "Angiography & Angioplasty",
          "Balloon Mitral Valvuloplasty (BMV)",
          "Pacemaker Implantations (Permanent & Temporary)",
          "Pericardiocentesis & Echocardiography",
          "2D Echocardiography",
          "Stress Tests & Holter Monitoring",
          "Comprehensive Cardiac Assessments"
        ],
        expertise: [
          "Coronary Angiography & Angioplasty",
          "Permanent Pacemaker Implantation (PPI)",
          "Balloon Mitral Valvuloplasty (BMV)",
          "Temporary Pacemaker Insertion (TPI)",
          "Pericardiocentesis & Echocardiography",
          "Management of Acute Coronary Syndrome and Complex Cardiac Cases"
        ],
        accreditations: [
          "Presented research at national and international cardiology conferences",
          "Published papers in leading international medical journals",
          "Contributions recognized for advancing evidence-based cardiac care"
        ],
        otherExperience: "Dr. Thakur is known for his compassionate approach, timely interventions, and dedication to improving patient outcomes. His deep understanding of interventional techniques ensures top-notch cardiac care, even in complex and critical scenarios."
      };
    } else if (doctor.name.includes("Pravin R. Borde")) {
      return {
        about: "Dr. Pravin R. Borde is a Consultant in Neuro and Spine Surgery at All Is Well Multispecialty Hospital, Burhanpur. He brings over 7 years of experience in managing complex Neuro and Spine cases with a focus on precision, innovation, and minimally invasive techniques.",
        experience: "Over 7 years of experience in managing complex Neuro and Spine cases with a focus on precision, innovation, and minimally invasive techniques. Served as Assistant Professor in Neurosurgery for 2.5 years at Government Medical College and DKS Superspeciality Hospital, Raipur.",
        specializations: [
          "Endoscopic Brain Tumor Removal",
          "Microsurgical Hematoma Evacuation",
          "Traumatic Brain Injury Management",
          "Minimally Invasive Disc Surgery",
          "Spinal Decompression & Fixation",
          "Lumbar and Cervical Spine Disorders",
          "Navigation-Guided Neurosurgery",
          "Endovascular Neurointervention",
          "Nerve Repair & Reconstructive Surgeries"
        ],
        expertise: [
          "Endoscopic and Microscopic Brain Surgeries",
          "Minimally Invasive Spine Surgeries",
          "Spinal Instrumentation and Fixation",
          "Nerve Surgeries and Neurotrauma Management",
          "Navigation-Guided and Endovascular Neurointerventions"
        ],
        accreditations: [
          "Published articles in reputed National and International Indexed Journals",
          "Recipient of awards at various medical conferences and quiz competitions",
          "Active contributor to innovations in Neurosurgical research and development"
        ],
        otherExperience: "Served as Assistant Professor in Neurosurgery for 2.5 years at Government Medical College and DKS Superspeciality Hospital, Raipur. Passionate educator committed to training future neurosurgeons."
      };
    } else if (doctor.name.includes("Deepak Kumar Bhojwani")) {
      return {
        about: "Dr. Deepak Kumar Bhojwani is a Consultant in Surgical Oncology at All Is Well Multispecialty Hospital, Burhanpur. He has significant experience in managing a wide range of cancer surgeries, providing evidence-based, patient-focused oncological care with precision and compassion.",
        experience: "Significant experience in managing a wide range of cancer surgeries, providing evidence-based, patient-focused oncological care with precision and compassion. Completed fellowships at Jawaharlal Nehru Cancer Hospital & Research Centre, Bhopal, Tata Memorial Hospital, Mumbai, Nizam Institute of Medical Sciences & MNJ Cancer Hospital, Hyderabad.",
        specializations: [
          "Head & Neck Cancer Surgeries",
          "Breast and GI Oncosurgeries",
          "Urological and Gynaecological Oncology Procedures",
          "Thoracic and Soft Tissue Tumor Management",
          "Laparoscopic and Minimally Invasive Cancer Surgeries",
          "Multidisciplinary Tumor Board Participation",
          "Comprehensive Cancer Staging & Planning"
        ],
        expertise: [
          "Head & Neck Cancer Surgeries",
          "Breast and GI Oncosurgeries",
          "Urological and Gynaecological Oncology Procedures",
          "Thoracic and Soft Tissue Tumor Management",
          "Laparoscopic and Minimally Invasive Cancer Surgeries"
        ],
        accreditations: [
          "Fellowships at Jawaharlal Nehru Cancer Hospital & Research Centre, Bhopal",
          "Tata Memorial Hospital, Mumbai",
          "Nizam Institute of Medical Sciences & MNJ Cancer Hospital, Hyderabad",
          "Actively participates in national-level oncology workshops",
          "Regularly involved in CME sessions and academic seminars"
        ],
        otherExperience: "Dr. Bhojwani is committed to enhancing cancer care through constant learning, collaboration, and patient education. He believes in a holistic approach that blends surgical excellence with emotional support for cancer patients and their families. Has conducted and organized cancer awareness and screening programs."
      };
    } else if (doctor.name.includes("Rakesh Mahawar")) {
      return {
        about: "Dr. Rakesh Mahawar is a Visiting Consultant Oncologist at All Is Well Multispecialty Hospital, Burhanpur. With more than 15 years of experience, he is recognized for his clinical expertise in managing cancer patients through both Chemotherapy and Radiotherapy. He is known for his compassionate care and evidence-based treatment approach.",
        experience: "More than 15 years of experience in Oncology Practice. Recognized for clinical expertise in managing cancer patients through both Chemotherapy and Radiotherapy. Expertise across solid and hematologic cancers. Collaborative Tumor Board Member.",
        specializations: [
          "Comprehensive Cancer Diagnosis & Treatment",
          "Medical Oncology (Chemotherapy Planning & Delivery)",
          "Radiation Therapy Supervision & Strategy",
          "Multidisciplinary Cancer Management",
          "Patient-Centered Oncology Consultation",
          "Solid and Hematologic Cancers"
        ],
        expertise: [
          "Comprehensive Cancer Diagnosis & Treatment",
          "Medical Oncology (Chemotherapy Planning & Delivery)",
          "Radiation Therapy Supervision & Strategy",
          "Multidisciplinary Cancer Management",
          "Patient-Centered Oncology Consultation"
        ],
        accreditations: [
          "Major institutional associations: HCG Cancer Centre, Ahmedabad and Jawaharlal Nehru Cancer Hospital, Bhopal",
          "Actively attends national and regional oncology conferences",
          "Involved in organizing CMEs and medical training programs"
        ],
        otherExperience: "Dr. Mahawar strongly believes in delivering personalized cancer care with empathy. He emphasizes multidisciplinary coordination to provide holistic treatment that supports both medical and emotional needs of patients. Keen interest in patient awareness and screening initiatives."
      };
    } else if (doctor.name.includes("Jayesh Brijbhushan Dubey")) {
      return {
        about: "Dr. Jayesh Brijbhushan Dubey is a Consultant in Medicine and Intensivist at All Is Well Multispecialty Hospital, Burhanpur. He brings strong clinical acumen and deep medical knowledge in internal medicine, critical care, and cardiology, backed by training and experience at some of India's leading healthcare institutions.",
        experience: "Senior Resident – Cardiology, AIIMS Bhopal. Consultant at Bansal Hospital, Bhopal. Resident Doctor at Shatabdi Municipal Hospital, Mumbai. Multi-organ support and critical interventions. Advanced cardiac emergency response. Meticulous diagnostic reasoning and therapeutic planning.",
        specializations: [
          "Internal Medicine and Chronic Disease Management",
          "Cardiac and Medical Intensive Care",
          "Evidence-Based Emergency Treatment Protocols",
          "Critical Care Monitoring and Ventilator Management",
          "Management of Infectious and Autoimmune Disorders"
        ],
        expertise: [
          "Internal Medicine and Chronic Disease Management",
          "Cardiac and Medical Intensive Care",
          "Evidence-Based Emergency Treatment Protocols",
          "Critical Care Monitoring and Ventilator Management",
          "Management of Infectious and Autoimmune Disorders"
        ],
        accreditations: [
          "Senior Resident – Cardiology, AIIMS Bhopal",
          "Consultant at Bansal Hospital, Bhopal",
          "Resident Doctor at Shatabdi Municipal Hospital, Mumbai"
        ],
        otherExperience: "Dr. Dubey is committed to clinical excellence and life-saving intervention in both routine and complex medical cases. He is deeply focused on continuous learning and the application of best practices to improve patient outcomes in critical care and general medicine. Emphasizes precise diagnosis and timely intervention, advocates for a holistic and patient-centric treatment model, and integrates advanced protocols with compassionate care."
      };
    } else if (doctor.name.includes("Divyesh Lad")) {
      return {
        about: "Dr. Divyesh Lad is a Consultant in Internal Medicine & Diabetologist at All Is Well Multispecialty Hospital, Burhanpur. He has extensive experience in managing complex medical cases and has served in government and private hospitals as a medical specialist and intensivist, offering evidence-based care across a wide range of medical conditions.",
        experience: "Extensive experience in managing complex medical cases. Served in government and private hospitals as a medical specialist and intensivist. Non-Invasive Cardiology & 2D Echo. ICU and CCU Monitoring & Emergency Care. Evidence-Based Internal Medicine Protocols.",
        specializations: [
          "Family Medicine & General Internal Medicine",
          "Diabetes & Thyroid Disorder Management",
          "Cardiology and 2D Echo Diagnostics",
          "Intensive and Critical Care",
          "Renal Failure and Dialysis Management",
          "Therapeutic & Diagnostic Procedures"
        ],
        expertise: [
          "Family Medicine & General Internal Medicine",
          "Diabetes & Thyroid Disorder Management",
          "Cardiology and 2D Echo Diagnostics",
          "Intensive and Critical Care",
          "Renal Failure and Dialysis Management"
        ],
        accreditations: [
          "District Government Hospital, Ujjain (HOD – General Medicine)",
          "MGM Superspeciality Hospital, Indore (SR – Cardiology & Intensive Care)",
          "Extensive clinical rounds and emergency response leadership",
          "Regular contributor in diabetes and critical care workshops",
          "Trained in emergency response and acute medicine"
        ],
        otherExperience: "Dr. Lad's approach combines clinical precision with patient education and compassionate care. His aim is to create a strong doctor-patient partnership for long-term health outcomes, particularly in chronic illness management and critical care. Active participant in public health and screening initiatives."
      };
    } else if (doctor.name.includes("Rahul Chandrakant Khandekar")) {
      return {
        about: "Dr. Rahul Chandrakant Khandekar is a Senior Consultant (ENT Surgeon) at All Is Well Multispecialty Hospital, Burhanpur. With over 21 years of clinical experience, Dr. Khandekar has been associated with several reputed hospitals and has a proven track record in ENT surgery and medical education.",
        experience: "21+ years of clinical experience. Proven track record in ENT surgery and medical education. Merit-holder in Graduation and Post-Graduation. Leadership in Departmental Development & Medical Training.",
        specializations: [
          "Comprehensive ENT Surgeries",
          "Endoscopic Sinus & Ear Procedures",
          "Head & Neck Surgical Interventions",
          "Voice & Hearing Disorders",
          "ENT Emergency & Trauma Management"
        ],
        expertise: [
          "Comprehensive ENT Surgeries",
          "Endoscopic Sinus & Ear Procedures",
          "Head & Neck Surgical Interventions",
          "Voice & Hearing Disorders",
          "ENT Emergency & Trauma Management"
        ],
        accreditations: [
          "Professor of General Surgery – Pandit Dindayal Upadhyay Dental College",
          "Honorary ENT Professor – Seth Govindji Raoji Ayurvedic Mahavidyalaya, Solapur",
          "Approved Ph.D. Thesis Guide – Zoroastrian College",
          "Regularly involved in CME programs and surgical workshops",
          "Mentor and guide for young ENT specialists and medical students"
        ],
        otherExperience: "Dr. Khandekar is passionate about advancing ENT care through a combination of precise surgical skills and patient-focused consultation. His teaching background adds depth to his clinical decision-making and promotes holistic healing. Active in community ENT health initiatives and screening camps."
      };
    } else if (doctor.name.includes("Gaurav Singh Pardesi")) {
      return {
        about: "Dr. Gaurav Singh Pardesi is a General and Minimal Access Surgeon at All Is Well Multispecialty Hospital, Burhanpur. He has performed more than a hundred lap Cholecystectomy and appendectomy procedures. He aims at utilizing his experience to work towards the benefit of the community.",
        experience: "Fellowship in Surgical Laparoscopy. Practiced as a consultant general surgeon in Nashik. Department of general surgery at Civil Hospital Nashik. Trained surgical laparoscopy. Has performed more than a hundred lap Cholecystectomy and appendectomy procedures.",
        specializations: [
          "General Surgery",
          "Minimal Access Surgery / Laparoscopic Surgery",
          "Laparoscopic Cholecystectomy",
          "Laparoscopic Appendectomy",
          "Laparoscopic TAPP (Totally Extraperitoneal)",
          "Laparoscopic TEP (Transabdominal Preperitoneal)",
          "Laparoscopic Pyelolithotomy",
          "Laparoscopic Ureterolithotomy"
        ],
        expertise: [
          "General and Minimal Access Surgery",
          "Laparoscopic Procedures",
          "Assisted lap procedures like Lap. TAPP, TEP, Lap. Pyelolithotomy, Lap. Ureterolithotomy",
          "Experience of assisting difficult procedures like Lap. IPOM, Lap. Distal Pancreatectomy, Lap. Diaphragmatic hernia repair, CBD exploration & Lap. Adrenalectomy"
        ],
        accreditations: [
          "Fellowship in Surgical Laparoscopy",
          "Consultant General Surgeon in Nashik",
          "Department of general surgery at Civil Hospital Nashik"
        ],
        otherExperience: "Dr. Pardesi has experience assisting difficult procedures like Lap. IPOM, Lap. Distal Pancreatectomy, Lap. Diaphragmatic hernia repair, CBD exploration & Lap. Adrenalectomy. He aims to utilize his experience for the benefit of the community through quality surgical care."
      };
    } else if (doctor.name.includes("Ravnik R. Bansod")) {
      return {
        about: "Dr. Ravnik R. Bansod is a Consultant Orthopedic Surgeon at All Is Well Multispecialty Hospital, Burhanpur. He has over 7 years of surgical expertise with leading hospitals in Maharashtra, working as a Registrar, Senior Resident, and Consultant. His clinical excellence lies in treating complex trauma cases and joint replacements with precision and care.",
        experience: "Over 7 years of surgical expertise with leading hospitals in Maharashtra. Worked as Registrar, Senior Resident, and Consultant. Extensive exposure in emergency and trauma units. Advanced courses in Joint Replacement and Spine Surgery.",
        specializations: [
          "Complex Trauma – Peri & Intra Articular Fractures",
          "Total Joint Replacement (Knee & Hip)",
          "Limb Reconstruction – ILIZAROV Techniques",
          "Sports Injuries – Arthroscopy Procedures",
          "Spine Care and Degenerative Spine Disorders",
          "Robotics & Navigation-Assisted Arthroplasty"
        ],
        expertise: [
          "Complex Trauma – Peri & Intra Articular Fractures",
          "Total Joint Replacement (Knee & Hip)",
          "Limb Reconstruction – ILIZAROV Techniques",
          "Sports Injuries – Arthroscopy Procedures",
          "Spine Care and Degenerative Spine Disorders"
        ],
        accreditations: [
          "Advanced courses in Joint Replacement and Spine Surgery",
          "Paper presentations in CMEs and Orthopedic Conferences",
          "Hands-on workshops in Arthroscopy & Robotic Surgery",
          "Consultant Orthopedics – Multiple reputed hospitals in Maharashtra",
          "Senior Resident and Registrar roles in Orthopedic Departments"
        ],
        otherExperience: "Dr. Bansod combines innovation with experience, prioritizing patient mobility, recovery, and function. He believes in continued education and research to enhance his skills and provide cutting-edge orthopedic care with compassion and precision. Extensive experience in emergency and trauma units."
      };
    } else if (doctor.name.includes("Harshita Purwar")) {
      return {
        about: "Dr. Harshita Purwar is a Consultant Obstetrician & Gynaecologist at All Is Well Multispecialty Hospital, Burhanpur. She is known for her expertise in managing high-risk pregnancies, complex vaginal deliveries, and advanced gynaecological surgeries, with a strong commitment to patient-centered care.",
        experience: "Successfully managed vaginal delivery of a 5.25 kg baby in a severe pre-eclampsia case. Extensive experience with abdominal hysterectomy for fibroids and AUB. Proficient in vaginal hysterectomy for prolapse. Expert in advanced obstetric and gynecological ultrasound imaging. Diagnosis and management planning for complex pregnancies.",
        specializations: [
          "High-Risk Obstetrics & Emergency Deliveries",
          "Normal and Complicated Vaginal Deliveries",
          "Caesarean Sections & Emergency Laparotomy",
          "Abdominal & Vaginal Hysterectomy",
          "Advanced Gynaecological Ultrasound",
          "Management of Ectopic Pregnancies"
        ],
        expertise: [
          "High-Risk Obstetrics & Emergency Deliveries",
          "Normal and Complicated Vaginal Deliveries",
          "Caesarean Sections & Emergency Laparotomy",
          "Abdominal & Vaginal Hysterectomy",
          "Advanced Gynaecological Ultrasound"
        ],
        accreditations: [
          "Published case report on a rare cardiac twin condition",
          "Thesis: Arterial blood gas analysis in pre-eclampsia and eclampsia patients",
          "Active in national and international medical publications",
          "Regular participant in CMEs and conferences"
        ],
        otherExperience: "Dr. Purwar's care philosophy focuses on empowering women with knowledge, ensuring comfort through all stages of pregnancy and surgery, and staying at the forefront of women's healthcare through research and technology."
      };
    } else if (doctor.name.includes("Monish Gupta")) {
      return {
        about: "Dr. Monish Gupta is a Consultant in Obstetrics and Gynaecology at All Is Well Multispecialty Hospital, Burhanpur. With over 8 years of experience, he specializes in managing high-risk pregnancies and providing advanced fetal medicine care. Dr. Gupta is also an experienced Infertility Specialist, committed to offering comprehensive support to couples on their fertility journey.",
        experience: "8+ years of experience in both urban and rural maternity care settings. Specialized in managing emergencies in obstetric and fetal care. Breech Vaginal Delivery, Episiotomy Repair, Endometrial & Cervical Biopsy, Diagnostic Laparoscopy. Management of Cardiac Disorders, Rh Isoimmunisation, and Recurrent Pregnancy Loss.",
        specializations: [
          "High-Risk Pregnancy Management",
          "Fetal Medicine and Prenatal Care",
          "Infertility Diagnosis and Treatment",
          "All Types of Obstetric Procedures",
          "Breech Vaginal Deliveries",
          "Surgical Management of Pregnancy Complications"
        ],
        expertise: [
          "High-Risk Pregnancy Management",
          "Fetal Medicine and Prenatal Care",
          "Infertility Diagnosis and Treatment",
          "All Types of Obstetric Procedures",
          "Breech Vaginal Deliveries"
        ],
        accreditations: [
          "Consultant Obstetrician & Gynaecologist – All Is Well Multispecialty Hospital, Burhanpur",
          "8+ years of experience in both urban and rural maternity care settings",
          "Specialized in managing emergencies in obstetric and fetal care"
        ],
        otherExperience: "Dr. Gupta combines empathy with evidence-based care to ensure the safety and well-being of both mother and baby. His patient-first approach focuses on personalized treatment plans, clear communication, and emotional support throughout the reproductive journey."
      };
    } else if (doctor.name.includes("Ajinkya Murudkar")) {
      return {
        about: "Dr. Ajinkya Murudkar is a Consultant Intensivist at All Is Well Multispecialty Hospital, Burhanpur. He is a dedicated medicine specialist with extensive experience in critical care management and teaching. He is proficient in managing acute and chronic medical conditions, mentoring medical students and advancing clinical outcomes in a multidisciplinary healthcare environment.",
        experience: "Senior-level roles at various reputed healthcare institutions. Lead responsibilities in critical and emergency departments. Clinical research and case evaluations in medicine and ICU care. Training and mentoring of medical students and junior doctors. Presentations and knowledge-sharing in academic forums.",
        specializations: [
          "Critical Care and ICU Management",
          "Acute and Chronic Disease Management",
          "Emergency Medicine",
          "Clinical Teaching and Medical Mentorship",
          "Interdisciplinary Care Coordination",
          "Evidence-based Patient Care"
        ],
        expertise: [
          "Critical Care and ICU Management",
          "Acute and Chronic Disease Management",
          "Emergency Medicine",
          "Clinical Teaching and Medical Mentorship",
          "Interdisciplinary Care Coordination"
        ],
        accreditations: [
          "Consultant Intensivist – All Is Well Multispecialty Hospital, Burhanpur",
          "Senior-level roles at various reputed healthcare institutions",
          "Lead responsibilities in critical and emergency departments",
          "Clinical research and case evaluations in medicine and ICU care"
        ],
        otherExperience: "Dr. Murudkar emphasizes holistic care, blending clinical precision with compassion. He believes in continuous learning, multidisciplinary teamwork, and patient-centric strategies to improve health outcomes in complex and life-threatening medical situations."
      };
    } else if (doctor.name.includes("Nikita Andhalkar Bagul")) {
      return {
        about: "Dr. Nikita Andhalkar Bagul is a Consultant Dermatologist at All Is Well Multispecialty Hospital, Burhanpur. She is an expert Dermatologist and Hair Transplant Surgeon, having consulted numerous skin and hair patients and performed over 150 successful hair transplants. She has also served as a Medical Officer at reputed hospitals in Pune and Solapur.",
        experience: "Performed over 150 successful hair transplants. Medical Officer at leading hospitals in Pune and Solapur. Hands-on experience in outpatient procedures and cosmetic dermatology. Biopsy, Pulse Therapies, and RITUXIMAB Infusions. Indoor admissions and emergency dermatological case management. Exposure to a wide range of clinical and cosmetic dermatology procedures.",
        specializations: [
          "Chemical Peels and Vampire Facials",
          "Hair PRP, GFC, Biotin PRP, Grofactor, QR678 Neo",
          "Dermaprasion and HydraFacial",
          "IPL Lasers and Phototherapy",
          "Skin Tag and Mole Removal",
          "Melasma, Acne & Scar Treatment, Carbon Peel, Party Peel"
        ],
        expertise: [
          "Chemical Peels and Vampire Facials",
          "Hair PRP, GFC, Biotin PRP, Grofactor, QR678 Neo",
          "Dermaprasion and HydraFacial",
          "IPL Lasers and Phototherapy",
          "Skin Tag and Mole Removal"
        ],
        accreditations: [
          "Consultant Dermatologist – All Is Well Multispecialty Hospital, Burhanpur",
          "Medical Officer at leading hospitals in Pune and Solapur",
          "Hands-on experience in outpatient procedures and cosmetic dermatology",
          "Exposure to a wide range of clinical and cosmetic dermatology procedures"
        ],
        otherExperience: "Dr. Nikita focuses on individualized skin and hair care, combining modern medical techniques with aesthetic sensibility. Her approach is rooted in patient education, safety, and achieving natural, healthy results through customized treatment plans."
      };
    } else if (doctor.name.includes("Yash Mahajan")) {
      return {
        about: "Dr. Yash Mahajan is a Consultant Psychiatrist at All Is Well Multispecialty Hospital, Burhanpur. He is deeply committed to his profession and applies his knowledge and experience to follow best clinical practices.",
        experience: "More than 4 years of clinical experience at GB Pant Hospital, New Delhi. Also served at Government Medical College and General Hospital, Jalgaon. Successfully handled numerous psychiatric emergencies. Skilled in conducting Bilateral Modified ECTs. Awarded and recognized in multiple academic and clinical competitions.",
        specializations: [
          "Management of a wide range of psychiatric disorders",
          "Emergency psychiatry and crisis intervention",
          "Electroconvulsive Therapy (Bilateral Modified ECTs)",
          "Adult & Adolescent Psychiatry",
          "Patient counseling and psychotherapy guidance",
          "Preventive mental healthcare and follow-ups"
        ],
        expertise: [
          "Management of a wide range of psychiatric disorders",
          "Emergency psychiatry and crisis intervention",
          "Electroconvulsive Therapy (Bilateral Modified ECTs)",
          "Adult & Adolescent Psychiatry",
          "Patient counseling and psychotherapy guidance"
        ],
        accreditations: [
          "Consultant Psychiatrist – All Is Well Multispecialty Hospital, Burhanpur",
          "More than 4 years of clinical experience at GB Pant Hospital, New Delhi",
          "Also served at Government Medical College and General Hospital, Jalgaon",
          "Awarded and recognized in multiple academic and clinical competitions"
        ],
        otherExperience: "Dr. Mahajan believes in empathetic and patient-centric psychiatric care, with an emphasis on early diagnosis and long-term management. He combines his clinical skills with strong interpersonal communication to support patients through their healing journey."
      };
    } else if (doctor.name.includes("Hiteshi")) {
      return {
        about: "Dr. Hiteshi is a Consultant Anesthesiologist at All Is Well Multispecialty Hospital, Burhanpur. She is responsible for ensuring safe and effective anesthesia care before, during, and after surgical procedures. With a focus on patient safety and pain management, she plays a vital role in the multidisciplinary team.",
        experience: "Consultant Anesthesiologist – All Is Well Multispecialty Hospital, Burhanpur. Handled anesthesia services in multidisciplinary surgeries. Critical involvement in ICU, OT, and trauma units. Thorough preoperative assessment and counseling. Focus on pain-free recovery and patient comfort.",
        specializations: [
          "Preoperative Patient Evaluation",
          "General, Regional & Local Anesthesia Administration",
          "Pain Management and Postoperative Care",
          "Monitoring and Managing Vital Signs During Surgery",
          "Emergency Airway & Critical Care Support"
        ],
        expertise: [
          "Preoperative Patient Evaluation",
          "General, Regional & Local Anesthesia Administration",
          "Pain Management and Postoperative Care",
          "Monitoring and Managing Vital Signs During Surgery",
          "Emergency Airway & Critical Care Support"
        ],
        accreditations: [
          "Consultant Anesthesiologist – All Is Well Multispecialty Hospital, Burhanpur",
          "Handled anesthesia services in multidisciplinary surgeries",
          "Critical involvement in ICU, OT, and trauma units"
        ],
        otherExperience: "Dr. Hiteshi believes in a compassionate, calm, and vigilant approach to anesthetic care. She prioritizes patient well-being, safety, and precision throughout perioperative management while staying up to date with the latest techniques and protocols in anesthesiology. Team-oriented care in collaboration with surgeons and physicians."
      };
    } else if (doctor.name.includes("Arpit Daulal Mahajan")) {
      return {
        about: "Dr. Arpit Daulal Mahajan is a qualified Radiologist with comprehensive training and clinical experience in diagnostic imaging, including MRI, CT, Ultrasonography, X-ray, and Doppler studies. He has been trained at a tertiary care institute and has worked as a Senior Resident as well as a Consultant Radiologist in private practice. He is committed to delivering accurate, timely, and patient-focused diagnostic services, with additional expertise in image-guided procedures and academic involvement.",
        experience: [
          "Consultant Radiologist at a Private Hospital, Khargone, Madhya Pradesh (January 2025 – Present), providing routine and emergency radiology services.",
          "Senior Resident – Radiodiagnosis at Hind Institute of Medical Sciences, Safedabad, Barabanki (U.P.) (August 2023 – December 2024), involved in MRI, CT, USG, and X-ray reporting along with academic activities.",
          "Junior Resident (MD Radiodiagnosis) at Hind Institute of Medical Sciences, Safedabad, Barabanki (U.P.) (July 2020 – July 2023); completed MD Radiodiagnosis and passed final examination in September 2023.",
          "Rotational postings during residency included CT (6 months), MRI (6 months), X-ray (6 months), and Ultrasonography (1 year).",
          "Actively participated in departmental seminars and assisted in organizing CMEs."
        ],
        specializations: [
          "MRI and CT reporting, including angiographic studies",
          "Ultrasonography and Doppler studies (routine and emergency)",
          "Conventional radiology procedures (X-ray, RGU, MCU, IVP, HSG, Barium studies)",
          "Image-guided interventions – USG/CT-guided biopsies, pigtail catheterization, pleural aspiration"
        ],
        expertise: [
          "MRI and CT reporting, including angiographic studies",
          "Ultrasonography and Doppler studies (routine and emergency)",
          "Conventional radiology procedures (X-ray, RGU, MCU, IVP, HSG, Barium studies)",
          "Image-guided interventions – USG/CT-guided biopsies, pigtail catheterization, pleural aspiration"
        ],
        accreditations: [
          "MD Radiodiagnosis – Hind Institute of Medical Sciences, Safedabad, Barabanki (U.P.)",
          "Best Student Award – Department of Radiodiagnosis",
          "Active participation in academic seminars and Continuing Medical Education (CME) programs"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Harshada Bhangle")) {
      return {
        about: "Dr. Harshada Bhangle is a Consultant Blood Bank Medical Officer & Pathologist at All Is Well Multispecialty Hospital, Burhanpur. She brings extensive experience in clinical diagnostics and blood bank operations, and is known for her meticulous approach in pathology and laboratory medicine.",
        experience: "Resident Doctor – Dr. R. N. Cooper Hospital, Mumbai. Experience in handling laboratory diagnostics and blood bank management. Proficient in advanced pathological analysis and process optimization.",
        specializations: [
          "Cytopathology",
          "Clinical Pathology",
          "Haematology",
          "Histopathology"
        ],
        expertise: [
          "Cytopathology",
          "Clinical Pathology",
          "Haematology",
          "Histopathology"
        ],
        accreditations: [
          "Resident Doctor – Dr. R. N. Cooper Hospital, Mumbai",
          "Experience in handling laboratory diagnostics and blood bank management",
          "Proficient in advanced pathological analysis and process optimization"
        ],
        otherExperience: "Dr. Bhangle leverages technology to enhance diagnostic accuracy and efficiency. She is committed to continuous improvement and ensures high-quality lab practices through attention to detail and technical excellence."
      };
    } else if (doctor.name.includes("Tanishk Shroff")) {
      return {
        about: "Dr. Tanishk Shroff is a Consultant Dentist at All Is Well Multispecialty Hospital, Burhanpur. He has fair clinical experience in the field of Dentistry and has demonstrated practical expertise in handling a variety of dental procedures with precision and care.",
        experience: "Secured hands-on experience through extensive dental practice. Awarded certificates for participation in Dental Camps. Clinical experience in handling a variety of dental procedures with precision and care.",
        specializations: [
          "Root Canal Treatment with Endoratory",
          "Post and Core Procedures",
          "Fixed Partial Denture (FPD)",
          "Complete Denture Fabrication",
          "Crown Preparation",
          "Scaling and Oral Prophylaxis"
        ],
        expertise: [
          "Root Canal Treatment with Endoratory",
          "Post and Core Procedures",
          "Fixed Partial Denture (FPD)",
          "Complete Denture Fabrication",
          "Crown Preparation"
        ],
        accreditations: [
          "Awarded certificates for participation in Dental Camps",
          "Extensive dental practice experience"
        ],
        otherExperience: "Dr. Shroff has fair clinical experience in the field of Dentistry and has demonstrated practical expertise in handling a variety of dental procedures with precision and care. He continues to enhance his skills through continuous learning and practical application."
      };
    } else if (doctor.name.includes("Ankit Atneriya")) {
      return {
        about: "Dr. Ankit Atneriya is a Consultant Sr. Physiotherapist at All Is Well Multispecialty Hospital, Burhanpur. He specialises in managing musculoskeletal conditions and injuries affecting muscles, bones, joints, ligaments, tendons, and other connective tissues. He emphasizes patient-centric rehabilitation and functional recovery.",
        experience: "Neuro-Rehabilitation from Swami Vivekanand Regional Spine Centre, Bhopal. Manual Therapy Techniques (Cyriax, McKenzie, Maitland, Kaltenborn, Mulligan). Certification in Therapeutic Tapping. Basic and Advanced Neuro-Myoskeletal Dry Needling (Levels 1 & 2).",
        specializations: [
          "Neuro-Rehabilitation",
          "Manual Therapy Techniques (Cyriax, McKenzie, Maitland, Kaltenborn, Mulligan)",
          "Neurodevelopmental Techniques (NDT) and Bobath in Hemiplegics",
          "Therapeutic Tapping",
          "Neuro-Myoskeletal Dry Needling (Levels 1 & 2)",
          "Use of 'Cybex' machine for muscle force evaluation and diagnosis",
          "Static standing balance training with 'Cybex balance' modality",
          "Burn Rehabilitation and Hemophilia Management",
          "Motor Re-education Program (MRP)",
          "Muscle Energy Techniques and Cerebral Palsy Management",
          "Orthotics and Prosthetics",
          "Publication of Systematic Reviews"
        ],
        expertise: [
          "Neuro-Rehabilitation",
          "Manual Therapy Techniques (Cyriax, McKenzie, Maitland, Kaltenborn, Mulligan)",
          "Neurodevelopmental Techniques (NDT) and Bobath in Hemiplegics",
          "Therapeutic Tapping",
          "Neuro-Myoskeletal Dry Needling (Levels 1 & 2)"
        ],
        accreditations: [
          "Neuro-Rehabilitation from Swami Vivekanand Regional Spine Centre, Bhopal",
          "Manual Therapy Techniques (Cyriax, McKenzie, Maitland, Kaltenborn, Mulligan)",
          "Neurodevelopmental Techniques (NDT) and Bobath in Hemiplegics",
          "Basic and Advanced Neuro-Myoskeletal Dry Needling (Levels 1 & 2)",
          "Certification in Therapeutic Tapping"
        ],
        otherExperience: "Dr. Atneriya has attended various seminars and workshops including use of 'Cybex' machine for muscle force evaluation and diagnosis, static standing balance training with 'Cybex balance' modality, burn rehabilitation and hemophilia management, motor re-education program (MRP), muscle energy techniques and cerebral palsy management, orthotics and prosthetics, and publication of systematic reviews. He specializes in managing musculoskeletal conditions and injuries affecting muscles, bones, joints, ligaments, tendons, and other connective tissues with a patient-centric approach to rehabilitation and functional recovery."
      };
    } else if (doctor.name.includes("Rupali Marathe")) {
      return {
        about: "Dr. Rupali Marathe is a Consultant Physiotherapist at All Is Well Multispecialty Hospital, Burhanpur. She has over two years of clinical experience, providing physiotherapy care to patients with physical injuries, neurological conditions, disabilities, and chronic pain. Dr. Marathe focuses on personalized rehabilitation plans that restore mobility, strength, and quality of life.",
        experience: "Consultant Physiotherapist – All Is Well Multispecialty Hospital, Burhanpur. Experience in rehabilitation departments and outpatient therapy units. Management of acute and chronic musculoskeletal cases. Over two years of clinical experience providing physiotherapy care to patients with physical injuries, neurological conditions, disabilities, and chronic pain.",
        specializations: [
          "Rehabilitation for Neurological and Orthopedic Conditions",
          "Post-surgical Physiotherapy and Pain Management",
          "Therapeutic Exercises and Manual Therapy",
          "Musculoskeletal and Sports Injury Rehabilitation",
          "Balance, Posture, and Gait Training",
          "Yoga-based Physiotherapy Techniques"
        ],
        expertise: [
          "Rehabilitation for Neurological and Orthopedic Conditions",
          "Post-surgical Physiotherapy and Pain Management",
          "Therapeutic Exercises and Manual Therapy",
          "Musculoskeletal and Sports Injury Rehabilitation",
          "Balance, Posture, and Gait Training"
        ],
        accreditations: [
          "Certified in Myobalance Therapy",
          "Assistant Yoga Teacher's Training Certificate",
          "International Webinar on 'Arthritis in Physiotherapy'"
        ],
        otherExperience: "Dr. Marathe believes in a patient-centered approach that integrates hands-on techniques with exercise science and holistic wellness. Her goal is to empower patients to regain independence, manage pain effectively, and prevent future injuries through education and guided therapy. She focuses on personalized rehabilitation plans that restore mobility, strength, and quality of life."
      };
    } else if (doctor.name.includes("Peeyush Suryawanshi")) {
      return {
        about: "Dr. Peeyush Suryawanshi is a highly skilled pediatrician with extensive experience in both general and advanced pediatric care. He has demonstrated expertise in newborn and infant care, critical pediatric procedures, and has contributed to the development of special newborn care units in collaboration with UNICEF and NRHM. Recognized for clinical excellence and academic achievements, he combines procedural proficiency with compassionate child healthcare.",
        experience: "Dr. Peeyush Suryawanshi is a Consultant Pediatrician at All Is Well Multispecialty Hospital, Burhanpur. He is a specialized healthcare professional with excellent clinical expertise and has served in reputed hospitals across Madhya Pradesh. He has completed a Diploma in Child Health and Pediatrics from SSMC and GMH, Rewa. He is an expert in fundamental and advanced pediatric procedures such as arterial and venous line insertions, intraosseous access, central line insertions, intubations, and lumbar punctures. He has extensive experience in newborn care, having worked with UNICEF and NRHM to develop special newborn care units. During his academic career, he was awarded first position in oral paper presentation competitions in Madhya Pradesh.",
        specializations: [
          "Newborn and Infant Care",
          "General Pediatrics",
          "Advanced Pediatric Procedures"
        ],
        expertise: [
          "Expert in fundamental and advanced pediatric procedures such as arterial and venous line insertions, intraosseous access, central line insertions, intubations, and lumbar punctures"
        ],
        accreditations: [
          "Diploma in Child Health (DCh)",
          "Member of Pediatric Society of India",
          "Recognized for excellence in newborn and pediatric care"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Apurva Yadav")) {
      return {
        about: "Dr. Apurva Yadav is a leading ophthalmologist specializing in cataract, corneal, and oculoplastic surgeries. She has extensive surgical and diagnostic expertise in managing corneal disorders, ocular surface diseases, and ophthalmic emergencies. She combines advanced surgical skills with innovative treatment approaches, emphasizing high-quality patient outcomes and active clinical research participation.",
        experience: "Dr. Apurva Yadav is a Consultant Ophthalmologist and Cataract Surgeon at All Is Well Multispecialty Hospital, Burhanpur. She has performed numerous cataract surgeries, including phacoemulsification, with excellent outcomes. Her key areas of expertise include advanced surgical techniques for corneal transplantation, corneal tear repair, scleral tear repair, and pterygium surgeries. She specializes in the diagnosis and management of corneal diseases and ocular surface disorders. She is skilled in innovative treatments such as corneal collagen cross-linking and lamellar keratoplasty. She has hands-on experience in intravitreal anti-VEGF therapy and oculoplasty procedures including cyst excision, DCT, evisceration, and enucleation. She has conducted and assisted various diagnostic procedures, including gonioscopy, Schiotz and applanation tonometry, direct and indirect ophthalmoscopy, 78D and 90D slit lamp examination, ROP screening and laser assistance, corneal topography, OCT anterior segment imaging, automated perimetry, and fundus fluorescein angiography. She has managed ophthalmic emergencies such as chemical and thermal injuries, lid tear repairs, and other urgent ocular conditions. She has a keen interest in clinical research and actively participates in interdisciplinary collaboration.",
        specializations: [
          "Cataract Surgery & Phacoemulsification",
          "Corneal Surgery - Corneal Transplantation, Tear Repair, Lamellar Keratoplasty, Pterygium Surgery",
          "Oculoplasty - Cyst Excision, DCT, Evisceration, Enucleation",
          "Diagnosis & Management of Corneal & Ocular Surface Disorders",
          "Intravitreal Therapy & Ophthalmic Emergencies"
        ],
        expertise: [
          "Advanced surgical techniques for corneal transplantation, corneal tear repair, scleral tear repair, and pterygium surgeries",
          "Skilled in innovative treatments such as corneal collagen cross-linking and lamellar keratoplasty",
          "Hands-on experience intravitreal anti-VEGF therapy and oculoplasty procedures including cyst excision, DCT, evisceration, and enucleation"
        ],
        accreditations: [
          "DOMS (Diploma in Ophthalmology & Microsurgery)",
          "Member of All India Ophthalmological Society (AIOS)",
          "Recognized for excellence in cataract, corneal, and oculoplasty procedures"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Shubham Verma")) {
      return {
        about: "Dr. Shubham Verma is an expert pulmonologist and critical care specialist with comprehensive experience in respiratory medicine. He excels in managing acute and chronic respiratory conditions, performing advanced interventional procedures, and overseeing respiratory ICU care. He combines clinical acumen with ongoing academic involvement, ensuring up-to-date, evidence-based patient management.",
        experience: "Dr. Shubham Verma is a Pulmonologist and Critical Care Specialist with extensive experience in managing acute and chronic respiratory illnesses. He completed his MD in Pulmonary Medicine from Sri Aurobindo Medical College and Post Graduate Institute (SAMC & PGI), Indore, and his MBBS from Gajra Raja Medical College. He has trained in bronchoscopy, thoracoscopy, and critical care at SAIMS Hospital, Indore, gaining exposure to a wide range of respiratory cases. He is skilled in managing patients with asthma, COPD, tuberculosis, interstitial lung disease, and acute respiratory failure. He performs pulmonary function tests, sleep studies, and other diagnostic procedures to assess the severity of lung diseases. He is experienced in performing complex procedures such as intercostal tube insertion, pleurodesis, bronchoscopy interventions (TBLB, TBNA, removal of secretions, polyps, or growths), and invasive and non-invasive mechanical ventilation. He has hands-on expertise in managing respiratory ICU patients and has worked for three years in a dedicated 10-bedded respiratory ICU during his residency. He actively participates in academic activities, clinical discussions, and attends continuing medical education to stay updated on advances in pulmonary medicine.",
        specializations: [
          "Respiratory Diseases Management - Asthma, COPD, TB, Interstitial Lung Disease",
          "Critical Care & Respiratory ICU Management",
          "Bronchoscopy, Thoracoscopy & Interventional Pulmonology",
          "Pulmonary Function Tests & Sleep Disorder Management",
          "Emergency Airway Management & Complex Intubations"
        ],
        expertise: [
          "Managing patients with asthma, COPD, tuberculosis, interstitial lung disease, and acute respiratory failure",
          "Performing complex procedures such as intercostal tube insertion, pleurodesis, bronchoscopy interventions (TBLB, TBNA, removal of secretions, polyps, or growths), and invasive and non-invasive mechanical ventilation"
        ],
        accreditations: [
          "ACLS and BLS Certified",
          "BCBR Certificate Course - ICMR Certified (September 2023)",
          "Presented oral and poster papers in TESCON 2024, BRONCHOCON 2023, and other conferences",
          "Two publications in the European Journal of Cardiovascular Medicine",
          "Third prize in postgraduate quiz competitions on respiratory diseases conducted under the National College of Chest Physicians",
          "Regular participant in national and international conferences and workshops on pulmonary medicine and critical care"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Abhay Bhanudas Joshi")) {
      return {
        about: "Dr. Abhay Bhanudas Joshi is a distinguished nephrologist and transplant specialist, recognized for his pioneering role in kidney care in Jalgaon. He possesses expertise in chronic kidney disease management, dialysis, kidney transplantation, and interventional nephrology. Dr. Joshi combines clinical excellence with community outreach, academic contributions, and leadership in critical care nephrology.",
        experience: "Dr. Abhay Bhanudas Joshi is the first full-time nephrologist in Jalgaon district and has been providing specialized kidney care since 2012. He is the founder and lead consultant at Nephron Kidney & Dialysis Center, Jalgaon. He has conducted numerous social initiatives, health camps, and visiting OPDs for kidney patients. He served as Assistant Professor of Nephrology at UP Medical College, Jalgaon. He has extensive experience performing interventional nephrology procedures including native and graft kidney biopsies, temporary and permanent tunneled cuffed catheters, live and cadaveric kidney transplants, plasmapheresis, and peritoneal dialysis. He was a member of the COVID Task Force of Jalgaon district. He actively participates in national and international conferences, presenting papers at the Indian Society of Nephrology Annual Conference and the International Society of Hemodialysis Annual Conference.",
        specializations: [
          "Kidney Disease Management - Chronic Kidney Disease, Acute Kidney Injury, Dialysis",
          "Interventional Nephrology - Kidney Biopsies, Catheter Insertions, Plasmapheresis",
          "Kidney Transplantation - Live & Cadaveric Transplants",
          "Peritoneal Dialysis & Hemodialysis",
          "Critical Care Nephrology"
        ],
        expertise: [
          "Extensive experience performing interventional nephrology procedures including native and graft kidney biopsies, temporary and permanent tunneled cuffed catheters, live and cadaveric kidney transplants, plasmapheresis, and peritoneal dialysis"
        ],
        accreditations: [
          "MNAMS - Member, National Academy of Medical Sciences",
          "FASN - Fellow, American Society of Nephrology (2015)",
          "Member, Indian Society of Nephrology",
          "Member, Indian Society of Organ Transplantation",
          "Member, Indian Society of Nephrology - West Zone",
          "Member, Indian Society of Critical Care Medicine",
          "Member, Association of Physicians of India",
          "Member, Indian Medical Association",
          "Member, American Society of Nephrology"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Rashi Gupta")) {
      return {
        about: "Dr. Rashi Gupta is an accomplished pathologist specializing in hematology, histopathology, and cytopathology. She has significant expertise in diagnostic evaluation of blood disorders, tissue specimens, and cytological samples. Her academic contributions and research focus on evidence-based pathology, while she actively engages in teaching, clinical studies, and quality laboratory management.",
        experience: "Dr. Rashi Gupta is a Pathologist with expertise in hematology, cytopathology, and histopathology. She completed her MD in Pathology from Mahatma Gandhi Memorial Medical College, Indore, and her MBBS from Gajra Raja Medical College, Gwalior. She has extensive experience in preliminary evaluation, slide screening, and reporting of hematological disorders including leukemia, lymphoma, and benign conditions. She is trained in gross examination and histopathology of surgically resected specimens, as well as fine needle aspiration cytology and cytopathology. She is proficient in laboratory operations, quality control, blood banking, and various serologic and microbiologic techniques. She actively participates in academic discussions, CMEs, and workshops to stay updated with advances in pathology. Her research work includes a thesis on the significance of serum markers (AFP, beta HCG, LDH) in reporting testicular tumors, in accordance with CAP guidelines. She has also contributed to teaching and volunteering, including work with the organization “Make a Difference,” Gwalior.",
        specializations: [
          "Hematology - Diagnosis and management of blood disorders",
          "Histopathology - Grossing and microscopic evaluation of specimens",
          "Cytopathology - Fine needle aspiration and cytology of various tissues",
          "Laboratory Operations - Quality control, blood banking, and serologic/microbiologic testing",
          "Clinical Research & Academic Contribution"
        ],
        expertise: [
          "Extensive experience in preliminary evaluation, slide screening, and reporting of hematological disorders including leukemia, lymphoma, and benign conditions",
          "Trained in gross examination and histopathology of surgically resected specimens, as well as fine needle aspiration cytology and cytopathology"
        ],
        accreditations: [
          "BCBR Certificate Course - ICMR Certified (September 2023)",
          "Second prize in oral paper presentation at 14th MP-PATHCON 2024",
          "Publications in European Journal of Cardiovascular Medicine, International Journal of Pharmaceutical and Clinical Research, and Indian Journal of Basic and Applied Medical Research",
          "Participant and awardee in various pathology workshops, CMEs, and hematology summits",
          "Active contributor in academic, cultural, and voluntary initiatives"
        ],
        otherExperience: ""
      };
    } else if (doctor.name.includes("Kimaya Sali")) {
      return {
        about: "Dr. Kimaya Sali is a dedicated and compassionate Obstetrician, Gynaecologist, and Laparoscopic Surgeon with a strong foundation in obstetric care, gynaecological surgery, and endoscopic procedures. She is committed to providing patient-centred, evidence-based medical care with an emphasis on accurate diagnosis, effective counselling, and comprehensive treatment. Known for her empathetic approach and surgical precision, she focuses on ensuring safe maternal outcomes and advanced gynaecological management.",
        experience: "Post Graduate Medical Officer (PGMO) at District Hospital, Burhanpur (Feb 2025 - Aug 2025), managing obstetric and gynaecological emergencies, conducting normal vaginal deliveries and LSCS, and performing minor and major gynaecological surgeries. Assisted in infertility counselling and patient follow-up care with focus on evidence-based management. ICU Intensivist (2021-2022), providing critical care management to multi-specialty cases, including ventilated patients and emergency resuscitations. Certified Laparoscopic Surgeon with experience in minimal access gynaecological procedures at Gajanan Hospital, Jalgaon.",
        specializations: [
          "Obstetric Care - Normal Vaginal Delivery, LSCS",
          "Gynaecological Surgery - TAH, TLH, Tubal Ligation",
          "Endoscopic & Laparoscopic Procedures - Diagnostic Hysteroscopy, HSG, Laparoscopic Tubal Ligation",
          "Infertility Counselling and Management",
          "Emergency and Critical Care in Obstetrics & Gynaecology"
        ],
        expertise: [
          "Post Graduate Medical Officer (PGMO) at District Hospital, Burhanpur (Feb 2025 - Aug 2025), managing obstetric and gynaecological emergencies, conducting normal vaginal deliveries and LSCS, and performing minor and major gynaecological surgeries.",
          "Assisted in infertility counselling and patient follow-up care with focus on evidence-based management.",
          "ICU Intensivist (2021-2022), providing critical care management to multi-specialty cases, including ventilated patients and emergency resuscitations.",
          "Certified Laparoscopic Surgeon with experience in minimal access gynaecological procedures at Gajanan Hospital, Jalgaon."
        ],
        accreditations: [
          "DGO - Kamat Hospital, Pune (MUHS Nashik, 2022)",
          "MBBS - Pravara Institute of Medical Sciences (PIMS), Loni",
          "Certified Laparoscopic Surgeon - Gajanan Hospital, Jalgaon",
          "ICU Experience (2021-2022)"
        ],
        otherExperience: ""
      };
    } else {
      // Default content for other doctors
      return {
        about: `Dr. ${doctor.name.replace("Dr. ", "")} is a highly experienced specialist in ${doctor.specialty.toLowerCase()}. With years of dedicated practice, Dr. ${doctor.name.replace("Dr. ", "")} has been providing exceptional medical care to patients, focusing on personalized treatment plans and patient satisfaction.`,
        experience: `Dr. ${doctor.name.replace("Dr. ", "")} has extensive experience in the field of ${doctor.specialty.toLowerCase()}, with over 10 years of practice. Throughout their career, they have treated numerous patients with various conditions and have been recognized for their expertise and compassionate care.`,
        specializations: [],
        expertise: [],
        accreditations: [],
        otherExperience: ""
      };
    }
  };

  const doctorDetails = getDoctorDetails() || {
    about: '',
    experience: '',
    specializations: [],
    expertise: [],
    accreditations: [],
    otherExperience: ''
  };

  return (
    <div className="min-h-screen bg-white text-gray-700 font-sans">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 bg-white">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/find-doctor')}
          className="flex items-center text-[#002d72] hover:text-[#d4af37] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </button>

        {/* Doctor Header */}
        <div className="bg-white rounded-lg shadow-sm border border-[#d4af37] mb-8 overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row items-center">
            {/* Doctor Image */}
            <div className="w-40 h-40 mx-auto md:mx-0 md:mr-8 mb-6 md:mb-0 overflow-hidden rounded-lg border border-[#d4af37] shadow-md">
              <SeoImage
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.webp";
                }}
              />
            </div>

            {/* Doctor Info */}
            <div className="text-center md:text-left flex-grow">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">Dr. {doctor.name}</h1>
              <p className="text-base md:text-lg text-[#002d72] font-semibold mb-3">{doctor.specialty}</p>
              
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-6 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-[#002d72]" />
                  <span>{doctor.location}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="py-3 px-8 bg-[#002d72] hover:bg-[#001d4d] text-white rounded font-medium transition-colors flex items-center justify-center"
                >
                  Book Appointment
                  <Calendar className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">About & Training</h2>
              <p className="font-sans text-[#444] leading-relaxed text-justify">
                {doctorDetails.about}
              </p>
            </div>

            {/* Experience */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">Professional Experience</h2>
              {Array.isArray(doctorDetails.experience) ? (
                <ul className="space-y-2">
                  {doctorDetails.experience.map((exp, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d4af37] mr-2">•</span>
                      <span className="font-sans text-[#444]">{exp}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-sans text-[#444] leading-relaxed text-justify">
                  {doctorDetails.experience}
                </p>
              )}
            </div>

            {/* Specializations */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">Specializations</h2>
              <ul className="space-y-2">
                {doctorDetails.specializations.length > 0 ? (
                  doctorDetails.specializations.map((specialization, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d4af37] mr-2">•</span>
                      <span className="font-sans text-[#444]">{specialization}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start">
                    <span className="text-[#d4af37] mr-2">•</span>
                    <span className="font-sans text-[#444]">{doctor.specialty}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Expertise */}
            {doctorDetails.expertise.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">Expertise</h2>
                <ul className="space-y-2">
                  {doctorDetails.expertise.map((expertise, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d4af37] mr-2">•</span>
                      <span className="font-sans text-[#444]">{expertise}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Accreditation & Memberships */}
            {doctorDetails.accreditations.length > 0 && (
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">Accreditation & Memberships</h2>
                <ul className="space-y-2">
                  {doctorDetails.accreditations.map((accreditation, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#d4af37] mr-2">•</span>
                      <span className="font-sans text-[#444]">{accreditation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            

            {/* Additional Info */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Contact Info</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#002d72] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#002d72]">Location</p>
                    <p className="font-sans text-[#444]">{doctor.location}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-[#002d72] mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#002d72]">Working Hours</p>
                    <p className="font-sans text-[#444]">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="font-sans text-[#444]">Sat: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
              <h3 className="text-xl font-serif font-bold text-[#002d72] mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 text-[#444] rounded-full text-sm font-sans">English</span>
                <span className="px-3 py-1 bg-gray-100 text-[#444] rounded-full text-sm font-sans">Hindi</span>
                <span className="px-3 py-1 bg-gray-100 text-[#444] rounded-full text-sm font-sans">Marathi</span>
              </div>
            </div>

            {/* Other Experience */}
            {doctorDetails.otherExperience && (
              <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#d4af37] border border-[#d4af37]">
                <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">Other Experience</h2>
                <p className="font-sans text-[#444] leading-relaxed text-justify">
                  {doctorDetails.otherExperience}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentFormModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)} 
        doctor={doctor}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />
    </div>
  );
};

export default DoctorDetailsPage;
