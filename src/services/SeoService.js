import seoConfig from '../config/seoConfig';

// Service to handle SEO data fetching from PHP backend
const API_BASE_URL = seoConfig.apiBaseUrl;

class SeoService {
   // Fetch SEO data for a specific URL/path
 static async getSeoData(path) {
    try {
      // Use the new API format with path parameter: /seo_api.php?path=/care-center/neuro-spine-surgery
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SEO_API_BASE_URL}/seo_api.php?path=${encodeURIComponent(path)}`);
      
      const raw = await response.text();

      if (!raw) {
        throw new Error(`Empty response body (status ${response.status})`);
      }

      let data;
      try {
        data = JSON.parse(raw);
      } catch (err) {
        console.error("Invalid JSON response:", raw);
        throw err;
      }

      if (!response.ok) {
        throw new Error(data?.message || `Server error ${response.status}`);
      }
      
      if (data.success && data.data) {
        // Check if the API returned parent page data for a specific child page
        // If so, and if we have specific frontend data for this child page, use that instead
        const apiPageUrl = data.data.page_url;
        const specificMockData = this.getSpecificMockSeoData(path);
        
        // If we're on a specific page (like /care-center/neuro-spine-surgery) 
        // but the API returned data for a parent page (like /care-center),
        // then use our specific frontend data instead
        if (path !== apiPageUrl && specificMockData) {
          return specificMockData;
        }
        
        // Transform the API response to match our expected format
        return {
          title: data.data.title || data.data.og_title,
          description: data.data.description || data.data.og_description,
          keywords: data.data.keywords,
          image: data.data.og_image
        };
      } else {
        // If API call fails, return mock data based on the path
        return this.getMockSeoData(path);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      // Return mock data if there's an error - this is critical for ensuring SEO always works
      return this.getMockSeoData(path);
    }
  }

 // Mock SEO data based on path (will be replaced with API calls)
  static getMockSeoData(path) {
    const seoMap = {
      '/': {
        title: 'All Is Well Hospital - Best Healthcare in Khandwa',
        description: 'All Is Well Hospital provides comprehensive healthcare services in Khandwa. Cardiology, orthopedics, neurology & emergency care. Quality healthcare you can trust.',
        keywords: 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology, khandwa hospital, best hospital khandwa',
        image: '/aiwlogo.webp'
      },
      '/about': {
        title: 'About All Is Well Hospital - Our Mission & Vision',
        description: 'Learn about All Is Well Hospital\'s mission, vision and commitment to quality healthcare services in Khandwa. Excellence in patient care since 2020.',
        keywords: 'about hospital, hospital mission, healthcare vision, medical services, hospital history',
        image: '/aiwlogo.webp'
      },
      '/ambulance': {
        title: '24/7 Ambulance Services - All Is Well Hospital',
        description: 'Emergency medical transport with advanced life support and professional paramedics. Available 24/7 for critical care in Khandwa and surrounding areas.',
        keywords: 'ambulance service, emergency transport, medical emergency, emergency services, 24/7 ambulance',
        image: '/banners/Ambulance.webp'
      },
      '/care-center': {
        title: 'Specialized Care Centers - All Is Well Hospital',
        description: 'Explore our specialized medical departments at All Is Well Hospital. Comprehensive care across multiple specialties with expert doctors and modern equipment.',
        keywords: 'care center, medical specialties, healthcare services, specialized care, hospital departments',
        image: '/hero/fullhospital.webp'
      },
      '/find-doctor': {
        title: 'Find a Doctor - All Is Well Hospital',
        description: 'Search and book appointments with our expert doctors at All Is Well Hospital. Browse by specialty, department, or doctor name for your healthcare needs.',
        keywords: 'find doctor, doctor search, medical specialists, hospital doctors, doctor appointment',
        image: '/aiwlogo.webp'
      },
      '/academics': {
        title: 'Medical Training & Academics - All Is Well Hospital',
        description: 'Academic programs and medical training at All Is Well Hospital. Advancing medical education and healthcare research in Central India.',
        keywords: 'medical education, healthcare training, medical research, hospital academics, medical programs',
        image: '/aiwlogo.webp'
      },
      '/community-services': {
        title: 'Community Health Services - All Is Well Hospital',
        description: 'Outreach programs, health camps and preventive care initiatives by All Is Well Hospital. Improving healthcare access for underserved communities.',
        keywords: 'community health, health camps, preventive care, outreach programs, public health',
        image: '/communityservices/Camp1-1-1024x768.webp'
      },
      '/contact-us': {
        title: 'Contact All Is Well Hospital - Get in Touch',
        description: 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility in Khandwa. We\'re here to help.',
        keywords: 'hospital contact, hospital phone, hospital address, medical inquiry, hospital location',
        image: '/aiwlogo.webp'
      },
      '/certification': {
        title: 'Hospital Certifications - All Is Well Hospital',
        description: 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards with NABH certification.',
        keywords: 'hospital certification, healthcare quality, NABH, ISO certification, medical standards',
        image: '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp'
      },
      '/branches': {
        title: 'Hospital Branches - All Is Well Hospital',
        description: 'Locations of All Is Well Hospital branches across Central India. Quality healthcare services available at multiple locations near you.',
        keywords: 'hospital branches, medical locations, healthcare facilities, hospital locations, clinic locations',
        image: '/aiwlogo.webp'
      },
      '/privacy': {
        title: 'Privacy Policy - All Is Well Hospital',
        description: 'Privacy policy of All Is Well Hospital. Learn how we collect, use, and protect your personal and medical information with strict confidentiality.',
        keywords: 'privacy policy, medical privacy, patient information, data protection, healthcare privacy',
        image: '/aiwlogo.webp'
      },
      '/terms': {
        title: 'Terms of Service - All Is Well Hospital',
        description: 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities when using our healthcare services.',
        keywords: 'terms of service, website terms, healthcare terms, medical services terms, hospital policies',
        image: '/aiwlogo.webp'
      },
      '/careers': {
        title: 'Careers - Join All Is Well Hospital Team',
        description: 'Career opportunities at All Is Well Hospital. Join our team of dedicated healthcare professionals committed to excellence in patient care.',
        keywords: 'hospital jobs, healthcare careers, medical jobs, nursing jobs, hospital employment',
        image: '/aiwlogo.webp'
      },
      '/branches/shahpur': {
        title: 'Shahpur Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Shahpur branch. Quality healthcare services at your location with expert doctors and modern facilities.',
        keywords: 'shahpur hospital, shahpur clinic, healthcare shahpur, medical services shahpur',
        image: '/aiwlogo.webp'
      },
      '/branches/khandwa': {
        title: 'Khandwa Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Khandwa branch. Comprehensive medical services with advanced technology and experienced healthcare professionals.',
        keywords: 'khandwa hospital, khandwa clinic, healthcare khandwa, medical services khandwa',
        image: '/aiwlogo.webp'
      },
      '/branches/burhanpur-clinic': {
        title: 'Burhanpur Clinic - All Is Well Medical Center',
        description: 'All Is Well Clinic Burhanpur. Quality healthcare services with specialized departments and expert medical care for the local community.',
        keywords: 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
        image: '/aiwlogo.webp'
      },
      '/branches/sanawad': {
        title: 'Sanawad Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Sanawad branch. Advanced medical care and diagnostic services available locally for your healthcare needs.',
        keywords: 'sanawad hospital, sanawad clinic, healthcare sanawad, medical services sanawad',
        image: '/aiwlogo.webp'
      },
      '/branches/raver': {
        title: 'Raver Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Raver branch. Comprehensive healthcare services with specialized doctors and modern medical equipment.',
        keywords: 'raver hospital, raver clinic, healthcare raver, medical services raver',
        image: '/aiwlogo.webp'
      },
      '/branches/khargone': {
        title: 'Khargone Branch - All Is Well Sahayata Kendra',
        description: 'All Is Well Sahayata Kendra Khargone. Quality healthcare services with emergency support and specialized medical care available.',
        keywords: 'khargone hospital, khargone clinic, healthcare khargone, medical services khargone',
        image: '/aiwlogo.webp'
      },
      '/branches/burhanpur': {
        title: 'Burhanpur Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Burhanpur branch. Expert medical care with advanced diagnostic and treatment facilities for patients.',
        keywords: 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
        image: '/aiwlogo.webp'
      },
      '/branches/phopnar': {
        title: 'Phopnar Branch - All Is Well Collection Center',
        description: 'All Is Well Collection Center Phopnar. Healthcare services and medical sample collection with professional and efficient care.',
        keywords: 'phopnar hospital, phopnar clinic, healthcare phopnar, medical services phopnar',
        image: '/aiwlogo.webp'
      },
      '/branches/dharni': {
        title: 'Dharni Branch - All Is Well Super Clinic',
        description: 'All Is Well Super Clinic Dharni. Quality healthcare services with specialized departments and experienced medical professionals.',
        keywords: 'dharni hospital, dharni clinic, healthcare dharni, medical services dharni',
        image: '/aiwlogo.webp'
      },
      '/care-center/neuro-spine-surgery': {
        title: 'Neuro & Spine Surgery - All Is Well Hospital',
        description: 'Advanced neuro and spine surgery treatments. Expert care for brain and spinal conditions with modern surgical techniques and technology.',
        keywords: 'neuro surgery, spine surgery, brain surgery, spinal surgery, neurology, spine treatment',
        image: '/Serviceimages/Neuro and spine surgery.webp'
      },
      '/care-center/cardiology': {
        title: 'Cardiology Services - All Is Well Hospital',
        description: 'Comprehensive cardiology services with advanced heart care and treatment options. Cardiac procedures, diagnostics and rehabilitation.',
        keywords: 'cardiology, heart care, cardiology treatment, heart surgery, cardiology services',
        image: '/Serviceimages/Cardiology.webp'
      },
      '/care-center/cardio-thoracic-surgery': {
        title: 'Cardio Thoracic Surgery - All Is Well Hospital',
        description: 'Advanced cardio thoracic surgery for heart and chest conditions. Expert surgical care with modern equipment and techniques.',
        keywords: 'cardio thoracic surgery, heart surgery, chest surgery, cardiac treatment, thoracic surgery',
        image: '/Serviceimages/Cardiovascular.webp'
      },
      '/care-center/plastic-surgery': {
        title: 'Plastic & Reconstructive Surgery - All Is Well Hospital',
        description: 'Expert plastic and reconstructive surgery services. Cosmetic and reconstructive procedures with advanced techniques and personalized care.',
        keywords: 'plastic surgery, reconstructive surgery, cosmetic surgery, plastic surgery treatment',
        image: '/Serviceimages/plastic and reconstructive.webp'
      },
      '/care-center/urology': {
        title: 'Urology Services - All Is Well Hospital',
        description: 'Comprehensive urology services for urinary and male reproductive system conditions. Advanced treatments and minimally invasive procedures.',
        keywords: 'urology, urology treatment, urinary system, male reproductive health, kidney stones',
        image: '/Serviceimages/urology.webp'
      },
      '/care-center/oncology': {
        title: 'Oncology Services - All Is Well Hospital',
        description: 'Advanced oncology services with comprehensive cancer care. Chemotherapy, radiation therapy, surgical oncology and support services.',
        keywords: 'oncology, cancer treatment, oncology services, chemotherapy, radiation therapy',
        image: '/Serviceimages/oncology.webp'
      },
      '/care-center/gastroenterology': {
        title: 'Gastroenterology - All Is Well Hospital',
        description: 'Comprehensive gastroenterology services for digestive system conditions. Advanced endoscopy, diagnostic procedures and treatments.',
        keywords: 'gastroenterology, digestive health, gastro treatment, stomach treatment, liver treatment',
        image: '/Serviceimages/radiology_and_imaging.webp'
      },
      '/care-center/endocrinology': {
        title: 'Endocrinology Services - All Is Well Hospital',
        description: 'Advanced endocrinology services for hormone-related disorders. Diabetes care, thyroid treatment and metabolic disorder management.',
        keywords: 'endocrinology, hormone treatment, diabetes care, thyroid treatment, endocrine disorders',
        image: '/Serviceimages/endocrine.webp'
      },
      '/care-center/rheumatology': {
        title: 'Rheumatology Services - All Is Well Hospital',
        description: 'Specialized rheumatology services for joint and autoimmune conditions. Treatment for arthritis, inflammatory diseases and musculoskeletal disorders.',
        keywords: 'rheumatology, arthritis treatment, joint pain, autoimmune disorders, rheumatic diseases',
        image: '/Serviceimages/rheumatology.webp'
      },
      '/care-center/radiology': {
        title: 'Radiology & Imaging - All Is Well Hospital',
        description: 'Advanced radiology and medical imaging services. MRI, CT, X-ray, ultrasound and diagnostic imaging for accurate treatment planning.',
        keywords: 'radiology, medical imaging, x-ray, mri, ct scan, ultrasound, diagnostic imaging',
        image: '/Serviceimages/radiology and imaging.webp'
      },
      '/care-center/critical-care': {
        title: 'Critical Care Medicine - All Is Well Hospital',
        description: 'Advanced critical care services with expert medical support for critically ill patients. ICU care with advanced life support systems.',
        keywords: 'critical care, intensive care, icu, emergency medicine, life support',
        image: '/Serviceimages/critical_care_medicine.webp'
      },
      '/care-center/anaesthesia': {
        title: 'Anaesthesia & Pain Management - All Is Well Hospital',
        description: 'Specialized anaesthesia and pain management services. Safe and effective pain relief with modern techniques and monitoring.',
        keywords: 'anaesthesia, pain management, surgical anaesthesia, chronic pain, pain relief',
        image: '/Serviceimages/anesthesia.webp'
      },
      '/care-center/general-and-minimal-invasive-surgery': {
        title: 'General & Minimal Invasive Surgery - All Is Well Hospital',
        description: 'Advanced general and minimal invasive surgery with expert surgical care. Laparoscopic procedures and minimal recovery time.',
        keywords: 'general surgery, minimal invasive surgery, laparoscopic surgery, surgical care, minimally invasive',
        image: '/Serviceimages/general and minimal.webp'
      },
      '/care-center/general-medicine': {
        title: 'General Medicine - All Is Well Hospital',
        description: 'Comprehensive general medicine services with primary healthcare and chronic disease management. Expert care for common medical conditions.',
        keywords: 'general medicine, primary care, internal medicine, chronic disease, healthcare',
        image: '/Serviceimages/general medicine.webp'
      },
      '/care-center/internal-medicine': {
        title: 'Internal Medicine - All Is Well Hospital',
        description: 'Specialized internal medicine services for complex medical condition management. Expert care for adult patients with multiple conditions.',
        keywords: 'internal medicine, complex conditions, chronic care, internal disorders, medical management',
        image: '/Serviceimages/internal medicine.webp'
      },
      '/care-center/obstetrics-and-gynaecology': {
        title: 'Obstetrics & Gynaecology - All Is Well Hospital',
        description: 'Comprehensive women\'s health services with maternity care. Prenatal care, delivery services, gynecological procedures and fertility treatment.',
        keywords: 'obstetrics, gynaecology, women health, maternity care, pregnancy, gynecology',
        image: '/Serviceimages/obstetrics and gynaecology.webp'
      },
      '/care-center/orthopaedics': {
        title: 'Orthopaedics - All Is Well Hospital',
        description: 'Advanced orthopaedic services for bones, joints and musculoskeletal conditions. Joint replacement, sports injury treatment and spine care.',
        keywords: 'orthopaedics, joint replacement, bone surgery, sports injury, musculoskeletal',
        image: '/Serviceimages/orthopedics.webp'
      },
      '/care-center/pathology': {
        title: 'Pathology Services - All Is Well Hospital',
        description: 'Comprehensive pathology and laboratory services with accurate diagnostic testing. Blood tests, tissue analysis and clinical pathology.',
        keywords: 'pathology, laboratory tests, diagnostic testing, blood test, clinical pathology',
        image: '/Serviceimages/pathology.webp'
      },
      '/care-center/blood-bank': {
        title: 'Blood Bank Services - All Is Well Hospital',
        description: 'Advanced blood bank services with safe blood storage and transfusion. Blood donation, component separation and emergency blood services.',
        keywords: 'blood bank, blood donation, blood transfusion, blood storage, blood components',
        image: '/Serviceimages/blood_bank_components.webp'
      },
      '/care-center/ent': {
        title: 'ENT (Ear, Nose & Throat) - All Is Well Hospital',
        description: 'Specialized ENT services for ear, nose and throat conditions. Advanced surgical procedures and comprehensive hearing care.',
        keywords: 'ent, ear nose throat, ENT surgery, hearing treatment, sinus treatment',
        image: '/Serviceimages/ent_hospital_examination.webp'
      },
      '/care-center/ophthalmology': {
        title: 'Ophthalmology Services - All Is Well Hospital',
        description: 'Advanced ophthalmology services with eye care and vision correction. Cataract surgery, LASIK, glaucoma treatment and comprehensive eye exams.',
        keywords: 'ophthalmology, eye care, vision correction, cataract surgery, lasik',
        image: '/Serviceimages/ophthalmology.webp'
      },
      '/care-center/dermatology': {
        title: 'Dermatology Services - All Is Well Hospital',
        description: 'Specialized dermatology services for skin, hair and nail care. Cosmetic dermatology, skin disease treatment and aesthetic procedures.',
        keywords: 'dermatology, skin care, hair treatment, cosmetic dermatology, skin disease',
        image: '/Serviceimages/dermatology.webp'
      },
      '/care-center/psychiatry': {
        title: 'Psychiatry Services - All Is Well Hospital',
        description: 'Comprehensive psychiatry services for mental health and behavioral disorders. Depression treatment, anxiety management and psychological therapy.',
        keywords: 'psychiatry, mental health, depression treatment, anxiety, psychological therapy',
        image: '/Serviceimages/psychiatry.webp'
      },
      '/care-center/dental': {
        title: 'Dental Services - All Is Well Hospital',
        description: 'Advanced dental services with comprehensive oral and dental care. Root canal, implants, orthodontics, cosmetic dentistry and oral surgery.',
        keywords: 'dental care, dentistry, dental surgery, teeth treatment, oral health',
        image: '/Serviceimages/dental_services.webp'
      },
      '/care-center/yoga': {
        title: 'Yoga Therapy - All Is Well Hospital',
        description: 'Yoga therapy services for holistic healing through yoga practices. Stress management, wellness programs and therapeutic yoga sessions.',
        keywords: 'yoga therapy, holistic healing, yoga classes, stress management, wellness',
        image: '/Serviceimages/yoga.webp'
      },
      '/care-center/physiotherapy': {
        title: 'Physiotherapy Services - All Is Well Hospital',
        description: 'Advanced physiotherapy services for rehabilitation and mobility restoration. Sports injury recovery, post-surgery rehabilitation and pain management.',
        keywords: 'physiotherapy, rehabilitation, physical therapy, mobility, injury recovery',
        image: '/Serviceimages/physiotherapy.webp'
      },
      '/care-center/nutrition-and-diet': {
        title: 'Nutrition & Dietetics - All Is Well Hospital',
        description: 'Specialized nutrition and dietetics services with personalized dietary guidance. Weight management, diabetic diet plans and nutritional counseling.',
        keywords: 'nutrition, dietetics, diet plan, nutritional counseling, healthy eating',
        image: '/Serviceimages/nutrition_and_dietetics.webp'
      },
      '/care-center/pediatrics-and-neonatology': {
        title: 'Pediatrics & Neonatology - All Is Well Hospital',
        description: 'Specialized pediatric and neonatal care for infants, children and adolescents. Child health, vaccination, neonatal intensive care and development monitoring.',
        keywords: 'pediatrics, neonatology, child health, infant care, pediatric treatment',
        image: '/Serviceimages/pediatrics_neonatology.webp'
      }
    };

    // Check for exact path match first
    if (seoMap[path]) {
      return seoMap[path];
    }

    // Check for partial matches (e.g., /branches/khandwa should match /branches pattern)
    const basePath = path.split('/').slice(0, 2).join('/');
    if (seoMap[basePath]) {
      return seoMap[basePath];
    }

    // Check if it's a doctor page
    if (path.startsWith('/doctor/')) {
      const doctorId = path.split('/')[2];
      // Import doctors data to get specific doctor info for SEO
      // Since we can't directly import the doctors array here, we'll use a generic approach with the path
      // that can be enhanced with API data later
      const cleanPath = path.replace('/doctor/', '').replace(/-/g, ' ');
      return {
        title: `Dr. ${cleanPath.replace(/\b\w/g, l => l.toUpperCase())} - ${cleanPath.split(' ')[0]} Specialist | All Is Well Hospital`,
        description: `Meet Dr. ${cleanPath.replace(/\b\w/g, l => l.toUpperCase())}, a qualified ${cleanPath.split(' ')[0]} specialist at All Is Well Hospital. Book an appointment with our experienced healthcare professional. - Path: ${path}`,
        keywords: `doctor profile, ${cleanPath.split(' ')[0]}, medical specialist, doctor appointment, healthcare professional, physician information, ${cleanPath.split(' ')[0]} specialist`,
        image: '/aiwlogo.webp'
      };
    }

    // Check if it's a branch page
    if (path.startsWith('/branches/')) {
      return {
        title: 'Branch Details - All Is Well Hospital',
        description: 'Information about All Is Well Hospital branches. Quality healthcare services at your location.',
        keywords: 'branch information, hospital location, local healthcare, branch services, medical facility',
        image: '/aiwlogo.webp'
      };
    }

    // Default to homepage SEO data if no match found
    return seoMap['/'];
  }

   // Default SEO data as fallback
 static getDefaultSeoData(path = '/') {
    // Generate path-aware fallback SEO based on the current route
    const pathSegments = path.split('/').filter(segment => segment);
    
    if (path === '/') {
      return {
        title: 'All Is Well Hospital - Best Healthcare Services in Khandwa',
        description: 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
        keywords: 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology, khandwa hospital',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/doctor/')) {
      const doctorId = pathSegments[1];
      const cleanDoctorId = doctorId ? doctorId.replace(/-/g, ' ') : 'Doctor';
      return {
        title: `Dr. ${cleanDoctorId.charAt(0).toUpperCase() + cleanDoctorId.slice(1)} - Doctor Profile | All Is Well Hospital`,
        description: `Meet Dr. ${cleanDoctorId.replace(/\b\w/g, l => l.toUpperCase())}, a qualified specialist at All Is Well Hospital. Book an appointment with our experienced healthcare professional.`,
        keywords: `doctor profile, ${cleanDoctorId}, medical specialist, doctor appointment, healthcare professional, physician information, ${cleanDoctorId.split(' ')[0]} specialist`,
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/branches/')) {
      const branchName = pathSegments[1];
      const cleanBranchName = branchName ? branchName.replace(/-/g, ' ') : 'Branch';
      return {
        title: `${cleanBranchName.charAt(0).toUpperCase() + cleanBranchName.slice(1)} Branch - All Is Well Hospital`,
        description: `Information about the ${cleanBranchName} branch of All Is Well Hospital. Quality healthcare services at your location.`,
        keywords: 'branch information, hospital location, local healthcare, branch services, medical facility, clinic',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/care-center/')) {
      const specialty = pathSegments[1];
      const cleanSpecialty = specialty ? specialty.replace(/-/g, ' ') : 'Specialty';
      const capitalizedSpecialty = cleanSpecialty.charAt(0).toUpperCase() + cleanSpecialty.slice(1);
      return {
        title: `${capitalizedSpecialty} - All Is Well Hospital`,
        description: `Learn about our ${cleanSpecialty} services at All Is Well Hospital. Expert care with advanced technology and experienced professionals.`,
        keywords: `${cleanSpecialty}, medical specialty, healthcare services, specialized care, medical treatment, hospital services`,
        image: `/Serviceimages/${cleanSpecialty.replace(/\b\w/g, l => l.toUpperCase())}.webp`
      };
    } else if (path.startsWith('/about')) {
      return {
        title: 'About All Is Well Hospital - Our Mission & Vision',
        description: 'Learn about All Is Well Hospital\'s mission, vision and commitment to quality healthcare services in Khandwa. Excellence in patient care since 2020.',
        keywords: 'about hospital, hospital mission, healthcare vision, medical services, hospital history',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/contact')) {
      return {
        title: 'Contact All Is Well Hospital - Get in Touch',
        description: 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility in Khandwa. We\'re here to help.',
        keywords: 'hospital contact, hospital phone, hospital address, medical inquiry, hospital location',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/privacy')) {
      return {
        title: 'Privacy Policy - All Is Well Hospital',
        description: 'Privacy policy of All Is Well Hospital. Learn how we collect, use, and protect your personal and medical information with strict confidentiality.',
        keywords: 'privacy policy, medical privacy, patient information, data protection, healthcare privacy',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/terms')) {
      return {
        title: 'Terms of Service - All Is Well Hospital',
        description: 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities when using our healthcare services.',
        keywords: 'terms of service, website terms, healthcare terms, medical services terms, hospital policies',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/ambulance')) {
      return {
        title: '24/7 Ambulance Services - All Is Well Hospital',
        description: 'Emergency medical transport with advanced life support and professional paramedics. Available 24/7 for critical care in Khandwa and surrounding areas.',
        keywords: 'ambulance service, emergency transport, medical emergency, emergency services, 24/7 ambulance',
        image: '/banners/Ambulance.webp'
      };
    } else if (path.startsWith('/find-doctor')) {
      return {
        title: 'Find a Doctor - All Is Well Hospital',
        description: 'Search and book appointments with our expert doctors at All Is Well Hospital. Browse by specialty, department, or doctor name for your healthcare needs.',
        keywords: 'find doctor, doctor search, medical specialists, hospital doctors, doctor appointment',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/careers')) {
      return {
        title: 'Careers - Join All Is Well Hospital Team',
        description: 'Career opportunities at All Is Well Hospital. Join our team of dedicated healthcare professionals committed to excellence in patient care.',
        keywords: 'hospital jobs, healthcare careers, medical jobs, nursing jobs, hospital employment',
        image: '/aiwlogo.webp'
      };
    } else if (path.startsWith('/certification')) {
      return {
        title: 'Hospital Certifications - All Is Well Hospital',
        description: 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards with NABH certification.',
        keywords: 'hospital certification, healthcare quality, NABH, ISO certification, medical standards',
        image: '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp'
      };
    } else if (path.startsWith('/community-services')) {
      return {
        title: 'Community Health Services - All Is Well Hospital',
        description: 'Outreach programs, health camps and preventive care initiatives by All Is Well Hospital. Improving healthcare access for underserved communities.',
        keywords: 'community health, health camps, preventive care, outreach programs, public health',
        image: '/communityservices/Camp1-1-1024x768.webp'
      };
    } else {
      // Generate fallback based on path segments
      const pathName = pathSegments[pathSegments.length - 1] || 'Page';
      const cleanPathName = pathName.replace(/-/g, ' ');
      const capitalizedPathName = cleanPathName.charAt(0).toUpperCase() + cleanPathName.slice(1);
      
      return {
        title: `${capitalizedPathName} - All Is Well Hospital`,
        description: `Information about ${cleanPathName} at All Is Well Hospital. Quality healthcare services you can trust.`,
        keywords: `${cleanPathName}, hospital, healthcare, medical services, patient care, medical treatment`,
        image: '/aiwlogo.webp'
      };
    }
  }

    // Function to get image alt text
 static async getImageAltText(imagePath) {
  try {
    // Try to get the specific image alt text from the API
    // First, try with the action parameter
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_SEO_API_BASE_URL}/seo_api.php?action=image-alt`
    );

    const raw = await response.text();

    if (!raw.trim()) {
      throw new Error(`Empty response body (status ${response.status})`);
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      console.error("Invalid JSON response:", raw);
      throw err;
    }

    if (!response.ok || !data.success) {
      throw new Error(data?.message || `Server error ${response.status}`);
    }

    // If we get all image alt texts, find the one that matches our image path
    if (data.data && Array.isArray(data.data)) {
      // Try exact match first
      let matchingAltText = data.data.find(altObj => 
        altObj.image_path && altObj.image_path === imagePath
      );
      
      // If no exact match, try partial match
      if (!matchingAltText) {
        matchingAltText = data.data.find(altObj => 
          altObj.image_path && imagePath.includes(altObj.image_path) || altObj.image_path && altObj.image_path.includes(imagePath.replace(/^\//, ''))
        );
      }
      
      if (matchingAltText && matchingAltText.alt_text) {
        return matchingAltText.alt_text;
      }
    }
    
    // If no specific alt text found, return default
    return this.getDefaultImageAlt(imagePath);

  } catch (error) {
    console.error('Error fetching image alt text:', error);
    // Try to return a default based on the image path
    return this.getDefaultImageAlt(imagePath);
  }
}


  // Extract the specific SEO data for paths that should have unique data
  static getSpecificMockSeoData(path) {
    const specificSeoMap = {
      '/care-center/neuro-spine-surgery': {
        title: 'Neuro and Spine Surgery - All Is Well Hospital',
        description: 'Advanced neuro and spine surgery treatments at All Is Well Hospital. Expert care for brain and spinal conditions.',
        keywords: 'neuro surgery, spine surgery, brain surgery, spinal surgery, neurology, spine treatment',
        image: '/Serviceimages/Neuro and spine surgery.webp'
      },
      '/care-center/cardiology': {
        title: 'Cardiology - All Is Well Hospital',
        description: 'Comprehensive cardiology services at All Is Well Hospital. Advanced heart care and treatment options.',
        keywords: 'cardiology, heart care, cardiology treatment, heart surgery, cardiology services',
        image: '/Serviceimages/Cardiology.webp'
      },
      '/care-center/cardio-thoracic-surgery': {
        title: 'Cardio Thoracic Surgery - All Is Well Hospital',
        description: 'Advanced cardio thoracic surgery at All Is Well Hospital. Expert care for heart and chest conditions.',
        keywords: 'cardio thoracic surgery, heart surgery, chest surgery, cardiac treatment, thoracic surgery',
        image: '/Serviceimages/Cardiovascular.webp'
      },
      '/care-center/plastic-surgery': {
        title: 'Plastic and Reconstructive Surgery - All Is Well Hospital',
        description: 'Plastic and reconstructive surgery services at All Is Well Hospital. Expert care for cosmetic and reconstructive procedures.',
        keywords: 'plastic surgery, reconstructive surgery, cosmetic surgery, plastic surgery treatment',
        image: '/Serviceimages/plastic and reconstructive.webp'
      },
      '/care-center/urology': {
        title: 'Urology - All Is Well Hospital',
        description: 'Comprehensive urology services at All Is Well Hospital. Advanced treatment for urinary and male reproductive system conditions.',
        keywords: 'urology, urology treatment, urinary system, male reproductive health, kidney stones',
        image: '/Serviceimages/urology.webp'
      },
      '/care-center/oncology': {
        title: 'Oncology - All Is Well Hospital',
        description: 'Advanced oncology services at All Is Well Hospital. Comprehensive cancer care and treatment options.',
        keywords: 'oncology, cancer treatment, oncology services, chemotherapy, radiation therapy',
        image: '/Serviceimages/oncology.webp'
      },
      '/care-center/gastroenterology': {
        title: 'Gastroenterology - All Is Well Hospital',
        description: 'Comprehensive gastroenterology services at All Is Well Hospital. Advanced treatment for digestive system conditions.',
        keywords: 'gastroenterology, digestive health, gastro treatment, stomach treatment, liver treatment',
        image: '/Serviceimages/radiology_and_imaging.webp'
      },
      '/care-center/endocrinology': {
        title: 'Endocrinology - All Is Well Hospital',
        description: 'Advanced endocrinology services at All Is Well Hospital. Expert care for hormone-related disorders.',
        keywords: 'endocrinology, hormone treatment, diabetes care, thyroid treatment, endocrine disorders',
        image: '/Serviceimages/endocrine.webp'
      },
      '/care-center/rheumatology': {
        title: 'Rheumatology - All Is Well Hospital',
        description: 'Specialized rheumatology services at All Is Well Hospital. Treatment for joint and autoimmune conditions.',
        keywords: 'rheumatology, arthritis treatment, joint pain, autoimmune disorders, rheumatic diseases',
        image: '/Serviceimages/rheumatology.webp'
      },
      '/care-center/radiology': {
        title: 'Radiology and Imaging - All Is Well Hospital',
        description: 'Advanced radiology and medical imaging services at All Is Well Hospital. Diagnostic imaging for accurate treatment.',
        keywords: 'radiology, medical imaging, x-ray, mri, ct scan, ultrasound, diagnostic imaging',
        image: '/Serviceimages/radiology and imaging.webp'
      },
      '/care-center/critical-care': {
        title: 'Critical Care Medicine - All Is Well Hospital',
        description: 'Advanced critical care services at All Is Well Hospital. Expert medical support for critically ill patients.',
        keywords: 'critical care, intensive care, icu, emergency medicine, life support',
        image: '/Serviceimages/critical_care_medicine.webp'
      },
      '/care-center/anaesthesia': {
        title: 'Anaesthesia and Pain Management - All Is Well Hospital',
        description: 'Specialized anaesthesia and pain management services at All Is Well Hospital. Safe and effective pain relief.',
        keywords: 'anaesthesia, pain management, surgical anaesthesia, chronic pain, pain relief',
        image: '/Serviceimages/anesthesia.webp'
      },
      '/care-center/general-and-minimal-invasive-surgery': {
        title: 'General and Minimal Invasive Surgery - All Is Well Hospital',
        description: 'Advanced general and minimal invasive surgery services at All Is Well Hospital. Expert surgical care with minimal recovery time.',
        keywords: 'general surgery, minimal invasive surgery, laparoscopic surgery, surgical care, minimally invasive',
        image: '/Serviceimages/general and minimal.webp'
      },
      '/care-center/general-medicine': {
        title: 'General Medicine - All Is Well Hospital',
        description: 'Comprehensive general medicine services at All Is Well Hospital. Primary healthcare and chronic disease management.',
        keywords: 'general medicine, primary care, internal medicine, chronic disease, healthcare',
        image: '/Serviceimages/general medicine.webp'
      },
      '/care-center/internal-medicine': {
        title: 'Internal Medicine - All Is Well Hospital',
        description: 'Specialized internal medicine services at All Is Well Hospital. Complex medical condition management.',
        keywords: 'internal medicine, complex conditions, chronic care, internal disorders, medical management',
        image: '/Serviceimages/internal medicine.webp'
      },
      '/care-center/obstetrics-and-gynaecology': {
        title: 'Obstetrics and Gynaecology - All Is Well Hospital',
        description: 'Comprehensive obstetrics and gynaecology services at All Is Well Hospital. Women\'s health and maternity care.',
        keywords: 'obstetrics, gynaecology, women health, maternity care, pregnancy, gynecology',
        image: '/Serviceimages/obstetrics and gynaecology.webp'
      },
      '/care-center/orthopaedics': {
        title: 'Orthopaedics - All Is Well Hospital',
        description: 'Advanced orthopaedic services at All Is Well Hospital. Treatment for bones, joints, and musculoskeletal conditions.',
        keywords: 'orthopaedics, joint replacement, bone surgery, sports injury, musculoskeletal',
        image: '/Serviceimages/orthopedics.webp'
      },
      '/care-center/pathology': {
        title: 'Pathology - All Is Well Hospital',
        description: 'Comprehensive pathology and laboratory services at All Is Well Hospital. Accurate diagnostic testing.',
        keywords: 'pathology, laboratory tests, diagnostic testing, blood test, clinical pathology',
        image: '/Serviceimages/pathology.webp'
      },
      '/care-center/blood-bank': {
        title: 'Blood Bank - All Is Well Hospital',
        description: 'Advanced blood bank services at All Is Well Hospital. Safe blood storage and transfusion services.',
        keywords: 'blood bank, blood donation, blood transfusion, blood storage, blood components',
        image: '/Serviceimages/blood_bank_components.webp'
      },
      '/care-center/ent': {
        title: 'ENT (Ear, Nose and Throat) - All Is Well Hospital',
        description: 'Specialized ENT services at All Is Well Hospital. Treatment for ear, nose, and throat conditions.',
        keywords: 'ent, ear nose throat, ENT surgery, hearing treatment, sinus treatment',
        image: '/Serviceimages/ent_hospital_examination.webp'
      },
      '/care-center/ophthalmology': {
        title: 'Ophthalmology - All Is Well Hospital',
        description: 'Advanced ophthalmology services at All Is Well Hospital. Eye care and vision correction treatments.',
        keywords: 'ophthalmology, eye care, vision correction, cataract surgery, lasik',
        image: '/Serviceimages/ophthalmology.webp'
      },
      '/care-center/dermatology': {
        title: 'Dermatology - All Is Well Hospital',
        description: 'Specialized dermatology services at All Is Well Hospital. Skin, hair, and nail care treatments.',
        keywords: 'dermatology, skin care, hair treatment, cosmetic dermatology, skin disease',
        image: '/Serviceimages/dermatology.webp'
      },
      '/care-center/psychiatry': {
        title: 'Psychiatry - All Is Well Hospital',
        description: 'Comprehensive psychiatry services at All Is Well Hospital. Mental health and behavioral disorder treatment.',
        keywords: 'psychiatry, mental health, depression treatment, anxiety, psychological therapy',
        image: '/Serviceimages/psychiatry.webp'
      },
      '/care-center/dental': {
        title: 'Dental Services - All Is Well Hospital',
        description: 'Advanced dental services at All Is Well Hospital. Comprehensive oral and dental care.',
        keywords: 'dental care, dentistry, dental surgery, teeth treatment, oral health',
        image: '/Serviceimages/dental_services.webp'
      },
      '/care-center/yoga': {
        title: 'Yoga Therapy - All Is Well Hospital',
        description: 'Yoga therapy services at All Is Well Hospital. Holistic healing through yoga practices.',
        keywords: 'yoga therapy, holistic healing, yoga classes, stress management, wellness',
        image: '/Serviceimages/yoga.webp'
      },
      '/care-center/physiotherapy': {
        title: 'Physiotherapy - All Is Well Hospital',
        description: 'Advanced physiotherapy services at All Is Well Hospital. Rehabilitation and mobility restoration.',
        keywords: 'physiotherapy, rehabilitation, physical therapy, mobility, injury recovery',
        image: '/Serviceimages/physiotherapy.webp'
      },
      '/care-center/nutrition-and-diet': {
        title: 'Nutrition and Dietetics - All Is Well Hospital',
        description: 'Specialized nutrition and dietetics services at All Is Well Hospital. Personalized dietary guidance.',
        keywords: 'nutrition, dietetics, diet plan, nutritional counseling, healthy eating',
        image: '/Serviceimages/nutrition_and_dietetics.webp'
      },
      '/care-center/pediatrics-and-neonatology': {
        title: 'Pediatrics and Neonatology - All Is Well Hospital',
        description: 'Specialized pediatric and neonatal care at All Is Well Hospital. Healthcare for infants, children, and adolescents.',
        keywords: 'pediatrics, neonatology, child health, infant care, pediatric treatment',
        image: '/Serviceimages/pediatrics_neonatology.webp'
      }
    };

    return specificSeoMap[path] || null;
  }

  // Default image alt text based on path
  static getDefaultImageAlt(imagePath) {
    const altMap = {
      '/aiwlogo.webp': 'All Is Well Hospital Logo',
      '/banners/Ambulance.webp': 'Ambulance Service at All Is Well Hospital',
      '/hero/fullhospital.webp': 'All Is Well Hospital Building',
      '/communityservices/Camp1-1-1024x768.webp': 'Community Health Camp by All Is Well Hospital',
      '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-001-scaled.webp': 'NABH Certification of All Is Well Hospital'
    };

    return altMap[imagePath] || 'All Is Well Hospital Image';
  }
}

export default SeoService;
