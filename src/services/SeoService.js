import seoConfig from '../config/seoConfig';

// Service to handle SEO data fetching from PHP backend
const API_BASE_URL = seoConfig.apiBaseUrl;

class SeoService {
   // Fetch SEO data for a specific URL/path
 static async getSeoData(path) {
    try {
      // Use the new API format with path parameter: /seo_api.php?path=/care-center/neuro-spine-surgery
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=${encodeURIComponent(path)}`);
      console.log('SEO API Response:', response); // Debug log
      const result = await response.json();
      console.log('SEO API Result:', result); // Debug log
      
      if (result.success && result.data) {
        // Check if the API returned parent page data for a specific child page
        // If so, and if we have specific frontend data for this child page, use that instead
        const apiPageUrl = result.data.page_url;
        const specificMockData = this.getSpecificMockSeoData(path);
        
        // If we're on a specific page (like /care-center/neuro-spine-surgery) 
        // but the API returned data for a parent page (like /care-center),
        // then use our specific frontend data instead
        if (path !== apiPageUrl && specificMockData) {
          console.log('API returned parent page data, using specific frontend data for path:', path);
          return specificMockData;
        }
        
        // Transform the API response to match our expected format
        return {
          title: result.data.title || result.data.og_title,
          description: result.data.description || result.data.og_description,
          keywords: result.data.keywords,
          image: result.data.og_image
        };
      } else {
        console.log('No SEO data found from API, using mock data for path:', path);
        // If API call fails, return mock data based on the path
        return this.getMockSeoData(path);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
      console.log('Using mock SEO data for path:', path);
      // Return mock data if there's an error - this is critical for ensuring SEO always works
      return this.getMockSeoData(path);
    }
  }

 // Mock SEO data based on path (will be replaced with API calls)
  static getMockSeoData(path) {
    const seoMap = {
      '/': {
        title: 'All Is Well Hospital - Best Healthcare Services in Khandwa',
        description: 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care in Khandwa. Quality healthcare you can trust.',
        keywords: 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology, khandwa hospital, best hospital khandwa',
        image: '/aiwlogo.webp'
      },
      '/about': {
        title: 'About Us - All Is Well Hospital',
        description: 'Learn about All Is Well Hospital, our mission, vision, and commitment to providing quality healthcare services to the community.',
        keywords: 'about hospital, hospital mission, healthcare vision, medical services, hospital history',
        image: '/aiwlogo.webp'
      },
      '/ambulance': {
        title: 'Ambulance Services - All Is Well Hospital',
        description: '24/7 ambulance services by All Is Well Hospital. Emergency medical transport with advanced life support and professional paramedics.',
        keywords: 'ambulance service, emergency transport, medical emergency, emergency services, 24/7 ambulance',
        image: '/banners/Ambulance.webp'
      },
      '/care-center': {
        title: 'Care Centers - All Is Well Hospital',
        description: 'Explore our specialized care centers at All Is Well Hospital. Comprehensive medical services across multiple specialties.',
        keywords: 'care center, medical specialties, healthcare services, specialized care, hospital departments',
        image: '/hero/fullhospital.webp'
      },
      '/find-doctor': {
        title: 'Find a Doctor - All Is Well Hospital',
        description: 'Find the right doctor at All Is Well Hospital. Search by specialty, department, or doctor name for your healthcare needs.',
        keywords: 'find doctor, doctor search, medical specialists, hospital doctors, doctor appointment',
        image: '/aiwlogo.webp'
      },
      '/academics': {
        title: 'Academics & Training - All Is Well Hospital',
        description: 'Academic programs and medical training at All Is Well Hospital. Advancing medical education and healthcare research.',
        keywords: 'medical education, healthcare training, medical research, hospital academics, medical programs',
        image: '/aiwlogo.webp'
      },
      '/community-services': {
        title: 'Community Services - All Is Well Hospital',
        description: 'Community health services by All Is Well Hospital. Outreach programs, health camps, and preventive care initiatives.',
        keywords: 'community health, health camps, preventive care, outreach programs, public health',
        image: '/communityservices/Camp1-1-1024x768.webp'
      },
      '/contact-us': {
        title: 'Contact Us - All Is Well Hospital',
        description: 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility.',
        keywords: 'hospital contact, hospital phone, hospital address, medical inquiry, hospital location',
        image: '/aiwlogo.webp'
      },
      '/certification': {
        title: 'Certifications - All Is Well Hospital',
        description: 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards.',
        keywords: 'hospital certification, healthcare quality, NABH, ISO certification, medical standards',
        image: '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp'
      },
      '/branches': {
        title: 'Hospital Branches - All Is Well Hospital',
        description: 'Locations of All Is Well Hospital branches. Quality healthcare services available across multiple locations.',
        keywords: 'hospital branches, medical locations, healthcare facilities, hospital locations, clinic locations',
        image: '/aiwlogo.webp'
      },
      '/privacy': {
        title: 'Privacy Policy - All Is Well Hospital',
        description: 'Privacy policy of All Is Well Hospital. How we collect, use, and protect your personal and medical information.',
        keywords: 'privacy policy, medical privacy, patient information, data protection, healthcare privacy',
        image: '/aiwlogo.webp'
      },
      '/terms': {
        title: 'Terms of Service - All Is Well Hospital',
        description: 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities.',
        keywords: 'terms of service, website terms, healthcare terms, medical services terms, hospital policies',
        image: '/aiwlogo.webp'
      },
      '/careers': {
        title: 'Careers - All Is Well Hospital',
        description: 'Career opportunities at All Is Well Hospital. Join our team of healthcare professionals committed to excellence.',
        keywords: 'hospital jobs, healthcare careers, medical jobs, nursing jobs, hospital employment',
        image: '/aiwlogo.webp'
      },
      '/branches/shahpur': {
        title: 'Shahpur Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Shahpur branch. Quality healthcare services at your location.',
        keywords: 'shahpur hospital, shahpur clinic, healthcare shahpur, medical services shahpur',
        image: '/aiwlogo.webp'
      },
      '/branches/khandwa': {
        title: 'Khandwa Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Khandwa branch. Quality healthcare services at your location.',
        keywords: 'khandwa hospital, khandwa clinic, healthcare khandwa, medical services khandwa',
        image: '/aiwlogo.webp'
      },
      '/branches/burhanpur-clinic': {
        title: 'Burhanpur Clinic - All Is Well Hospital',
        description: 'All Is Well Clinic Burhanpur. Quality healthcare services at your location.',
        keywords: 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
        image: '/aiwlogo.webp'
      },
      '/branches/sanawad': {
        title: 'Sanawad Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Sanawad branch. Quality healthcare services at your location.',
        keywords: 'sanawad hospital, sanawad clinic, healthcare sanawad, medical services sanawad',
        image: '/aiwlogo.webp'
      },
      '/branches/raver': {
        title: 'Raver Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Raver branch. Quality healthcare services at your location.',
        keywords: 'raver hospital, raver clinic, healthcare raver, medical services raver',
        image: '/aiwlogo.webp'
      },
      '/branches/khargone': {
        title: 'Khargone Branch - All Is Well Hospital',
        description: 'All Is Well Sahayata Kendra Khargone. Quality healthcare services at your location.',
        keywords: 'khargone hospital, khargone clinic, healthcare khargone, medical services khargone',
        image: '/aiwlogo.webp'
      },
      '/branches/burhanpur': {
        title: 'Burhanpur Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Burhanpur branch. Quality healthcare services at your location.',
        keywords: 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
        image: '/aiwlogo.webp'
      },
      '/branches/phopnar': {
        title: 'Phopnar Branch - All Is Well Hospital',
        description: 'All Is Well Collection Center Phopnar. Quality healthcare services at your location.',
        keywords: 'phopnar hospital, phopnar clinic, healthcare phopnar, medical services phopnar',
        image: '/aiwlogo.webp'
      },
      '/branches/dharni': {
        title: 'Dharni Branch - All Is Well Hospital',
        description: 'All Is Well Super Clinic Dharni. Quality healthcare services at your location.',
        keywords: 'dharni hospital, dharni clinic, healthcare dharni, medical services dharni',
        image: '/aiwlogo.webp'
      },
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
      return {
        title: 'Doctor Details - All Is Well Hospital',
        description: 'Doctor profile and appointment information at All Is Well Hospital. Meet our qualified healthcare professionals.',
        keywords: 'doctor profile, medical specialist, doctor appointment, healthcare professional, physician information',
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
 static getDefaultSeoData() {
    return {
      title: 'All Is Well Hospital - Best Healthcare Services',
      description: 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.',
      keywords: 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology',
      image: '/aiwlogo.webp'
    };
  }

  // Function to get image alt text (will be implemented with API call later)
  static async getImageAltText(imagePath) {
    try {
      // Use the new API format for image alt text
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/image-alt/${imagePath}`);
      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data.alt_text;
      } else {
        // If API call fails, return default alt text
        return this.getDefaultImageAlt(imagePath);
      }
    } catch (error) {
      console.error('Error fetching image alt text:', error);
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
