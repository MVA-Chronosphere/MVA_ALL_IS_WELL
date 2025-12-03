<?php
require_once 'config.php';

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Clear existing SEO data
    $pdo->exec("DELETE FROM seo_data");
    
    // Insert comprehensive SEO data for all routes
    $seoData = [
        [
            'page_url' => '/',
            'title' => 'All Is Well Hospital - Best Healthcare Services in Khandwa',
            'description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care in Khandwa. Quality healthcare you can trust.',
            'keywords' => 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology, khandwa hospital, best hospital khandwa',
            'og_title' => 'All Is Well Hospital - Best Healthcare Services in Khandwa',
            'og_description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care in Khandwa. Quality healthcare you can trust.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'All Is Well Hospital - Best Healthcare Services in Khandwa',
            'twitter_description' => 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care in Khandwa. Quality healthcare you can trust.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/about',
            'title' => 'About Us - All Is Well Hospital',
            'description' => 'Learn about All Is Well Hospital, our mission, vision, and commitment to providing quality healthcare services to the community.',
            'keywords' => 'about hospital, hospital mission, healthcare vision, medical services, hospital history',
            'og_title' => 'About Us - All Is Well Hospital',
            'og_description' => 'Learn about All Is Well Hospital, our mission, vision, and commitment to providing quality healthcare services to the community.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'About Us - All Is Well Hospital',
            'twitter_description' => 'Learn about All Is Well Hospital, our mission, vision, and commitment to providing quality healthcare services to the community.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/ambulance',
            'title' => 'Ambulance Services - All Is Well Hospital',
            'description' => '24/7 ambulance services by All Is Well Hospital. Emergency medical transport with advanced life support and professional paramedics.',
            'keywords' => 'ambulance service, emergency transport, medical emergency, emergency services, 24/7 ambulance',
            'og_title' => 'Ambulance Services - All Is Well Hospital',
            'og_description' => '24/7 ambulance services by All Is Well Hospital. Emergency medical transport with advanced life support and professional paramedics.',
            'og_image' => '/banners/Ambulance.webp',
            'twitter_title' => 'Ambulance Services - All Is Well Hospital',
            'twitter_description' => '24/7 ambulance services by All Is Well Hospital. Emergency medical transport with advanced life support and professional paramedics.',
            'twitter_image' => '/banners/Ambulance.webp'
        ],
        [
            'page_url' => '/care-center',
            'title' => 'Care Centers - All Is Well Hospital',
            'description' => 'Explore our specialized care centers at All Is Well Hospital. Comprehensive medical services across multiple specialties.',
            'keywords' => 'care center, medical specialties, healthcare services, specialized care, hospital departments',
            'og_title' => 'Care Centers - All Is Well Hospital',
            'og_description' => 'Explore our specialized care centers at All Is Well Hospital. Comprehensive medical services across multiple specialties.',
            'og_image' => '/hero/fullhospital.webp',
            'twitter_title' => 'Care Centers - All Is Well Hospital',
            'twitter_description' => 'Explore our specialized care centers at All Is Well Hospital. Comprehensive medical services across multiple specialties.',
            'twitter_image' => '/hero/fullhospital.webp'
        ],
        [
            'page_url' => '/find-doctor',
            'title' => 'Find a Doctor - All Is Well Hospital',
            'description' => 'Find the right doctor at All Is Well Hospital. Search by specialty, department, or doctor name for your healthcare needs.',
            'keywords' => 'find doctor, doctor search, medical specialists, hospital doctors, doctor appointment',
            'og_title' => 'Find a Doctor - All Is Well Hospital',
            'og_description' => 'Find the right doctor at All Is Well Hospital. Search by specialty, department, or doctor name for your healthcare needs.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Find a Doctor - All Is Well Hospital',
            'twitter_description' => 'Find the right doctor at All Is Well Hospital. Search by specialty, department, or doctor name for your healthcare needs.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/academics',
            'title' => 'Academics & Training - All Is Well Hospital',
            'description' => 'Academic programs and medical training at All Is Well Hospital. Advancing medical education and healthcare research.',
            'keywords' => 'medical education, healthcare training, medical research, hospital academics, medical programs',
            'og_title' => 'Academics & Training - All Is Well Hospital',
            'og_description' => 'Academic programs and medical training at All Is Well Hospital. Advancing medical education and healthcare research.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Academics & Training - All Is Well Hospital',
            'twitter_description' => 'Academic programs and medical training at All Is Well Hospital. Advancing medical education and healthcare research.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/community-services',
            'title' => 'Community Services - All Is Well Hospital',
            'description' => 'Community health services by All Is Well Hospital. Outreach programs, health camps, and preventive care initiatives.',
            'keywords' => 'community health, health camps, preventive care, outreach programs, public health',
            'og_title' => 'Community Services - All Is Well Hospital',
            'og_description' => 'Community health services by All Is Well Hospital. Outreach programs, health camps, and preventive care initiatives.',
            'og_image' => '/communityservices/Camp1-1-1024x768.webp',
            'twitter_title' => 'Community Services - All Is Well Hospital',
            'twitter_description' => 'Community health services by All Is Well Hospital. Outreach programs, health camps, and preventive care initiatives.',
            'twitter_image' => '/communityservices/Camp1-1-1024x768.webp'
        ],
        [
            'page_url' => '/contact-us',
            'title' => 'Contact Us - All Is Well Hospital',
            'description' => 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility.',
            'keywords' => 'hospital contact, hospital phone, hospital address, medical inquiry, hospital location',
            'og_title' => 'Contact Us - All Is Well Hospital',
            'og_description' => 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Contact Us - All Is Well Hospital',
            'twitter_description' => 'Contact All Is Well Hospital. Get directions, phone numbers, and information to reach our healthcare facility.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/certification',
            'title' => 'Certifications - All Is Well Hospital',
            'description' => 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards.',
            'keywords' => 'hospital certification, healthcare quality, NABH, ISO certification, medical standards',
            'og_title' => 'Certifications - All Is Well Hospital',
            'og_description' => 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards.',
            'og_image' => '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp',
            'twitter_title' => 'Certifications - All Is Well Hospital',
            'twitter_description' => 'Quality certifications and accreditations of All Is Well Hospital. Our commitment to healthcare excellence and safety standards.',
            'twitter_image' => '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp'
        ],
        [
            'page_url' => '/branches',
            'title' => 'Hospital Branches - All Is Well Hospital',
            'description' => 'Locations of All Is Well Hospital branches. Quality healthcare services available across multiple locations.',
            'keywords' => 'hospital branches, medical locations, healthcare facilities, hospital locations, clinic locations',
            'og_title' => 'Hospital Branches - All Is Well Hospital',
            'og_description' => 'Locations of All Is Well Hospital branches. Quality healthcare services available across multiple locations.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Hospital Branches - All Is Well Hospital',
            'twitter_description' => 'Locations of All Is Well Hospital branches. Quality healthcare services available across multiple locations.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/privacy',
            'title' => 'Privacy Policy - All Is Well Hospital',
            'description' => 'Privacy policy of All Is Well Hospital. How we collect, use, and protect your personal and medical information.',
            'keywords' => 'privacy policy, medical privacy, patient information, data protection, healthcare privacy',
            'og_title' => 'Privacy Policy - All Is Well Hospital',
            'og_description' => 'Privacy policy of All Is Well Hospital. How we collect, use, and protect your personal and medical information.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Privacy Policy - All Is Well Hospital',
            'twitter_description' => 'Privacy policy of All Is Well Hospital. How we collect, use, and protect your personal and medical information.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/terms',
            'title' => 'Terms of Service - All Is Well Hospital',
            'description' => 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities.',
            'keywords' => 'terms of service, website terms, healthcare terms, medical services terms, hospital policies',
            'og_title' => 'Terms of Service - All Is Well Hospital',
            'og_description' => 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Terms of Service - All Is Well Hospital',
            'twitter_description' => 'Terms of service for All Is Well Hospital website and services. Understanding your rights and responsibilities.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/careers',
            'title' => 'Careers - All Is Well Hospital',
            'description' => 'Career opportunities at All Is Well Hospital. Join our team of healthcare professionals committed to excellence.',
            'keywords' => 'hospital jobs, healthcare careers, medical jobs, nursing jobs, hospital employment',
            'og_title' => 'Careers - All Is Well Hospital',
            'og_description' => 'Career opportunities at All Is Well Hospital. Join our team of healthcare professionals committed to excellence.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Careers - All Is Well Hospital',
            'twitter_description' => 'Career opportunities at All Is Well Hospital. Join our team of healthcare professionals committed to excellence.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/shahpur',
            'title' => 'Shahpur Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Shahpur branch. Quality healthcare services at your location.',
            'keywords' => 'shahpur hospital, shahpur clinic, healthcare shahpur, medical services shahpur',
            'og_title' => 'Shahpur Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Shahpur branch. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Shahpur Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Shahpur branch. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/khandwa',
            'title' => 'Khandwa Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Khandwa branch. Quality healthcare services at your location.',
            'keywords' => 'khandwa hospital, khandwa clinic, healthcare khandwa, medical services khandwa',
            'og_title' => 'Khandwa Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Khandwa branch. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Khandwa Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Khandwa branch. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/burhanpur-clinic',
            'title' => 'Burhanpur Clinic - All Is Well Hospital',
            'description' => 'All Is Well Clinic Burhanpur. Quality healthcare services at your location.',
            'keywords' => 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
            'og_title' => 'Burhanpur Clinic - All Is Well Hospital',
            'og_description' => 'All Is Well Clinic Burhanpur. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Burhanpur Clinic - All Is Well Hospital',
            'twitter_description' => 'All Is Well Clinic Burhanpur. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/sanawad',
            'title' => 'Sanawad Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Sanawad branch. Quality healthcare services at your location.',
            'keywords' => 'sanawad hospital, sanawad clinic, healthcare sanawad, medical services sanawad',
            'og_title' => 'Sanawad Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Sanawad branch. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Sanawad Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Sanawad branch. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/raver',
            'title' => 'Raver Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Raver branch. Quality healthcare services at your location.',
            'keywords' => 'raver hospital, raver clinic, healthcare raver, medical services raver',
            'og_title' => 'Raver Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Raver branch. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Raver Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Raver branch. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/khargone',
            'title' => 'Khargone Branch - All Is Well Hospital',
            'description' => 'All Is Well Sahayata Kendra Khargone. Quality healthcare services at your location.',
            'keywords' => 'khargone hospital, khargone clinic, healthcare khargone, medical services khargone',
            'og_title' => 'Khargone Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Sahayata Kendra Khargone. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Khargone Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Sahayata Kendra Khargone. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/burhanpur',
            'title' => 'Burhanpur Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Burhanpur branch. Quality healthcare services at your location.',
            'keywords' => 'burhanpur hospital, burhanpur clinic, healthcare burhanpur, medical services burhanpur',
            'og_title' => 'Burhanpur Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Burhanpur branch. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Burhanpur Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Burhanpur branch. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/phopnar',
            'title' => 'Phopnar Branch - All Is Well Hospital',
            'description' => 'All Is Well Collection Center Phopnar. Quality healthcare services at your location.',
            'keywords' => 'phopnar hospital, phopnar clinic, healthcare phopnar, medical services phopnar',
            'og_title' => 'Phopnar Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Collection Center Phopnar. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Phopnar Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Collection Center Phopnar. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/branches/dharni',
            'title' => 'Dharni Branch - All Is Well Hospital',
            'description' => 'All Is Well Super Clinic Dharni. Quality healthcare services at your location.',
            'keywords' => 'dharni hospital, dharni clinic, healthcare dharni, medical services dharni',
            'og_title' => 'Dharni Branch - All Is Well Hospital',
            'og_description' => 'All Is Well Super Clinic Dharni. Quality healthcare services at your location.',
            'og_image' => '/aiwlogo.webp',
            'twitter_title' => 'Dharni Branch - All Is Well Hospital',
            'twitter_description' => 'All Is Well Super Clinic Dharni. Quality healthcare services at your location.',
            'twitter_image' => '/aiwlogo.webp'
        ],
        [
            'page_url' => '/care-center/neuro-spine-surgery',
            'title' => 'Neuro and Spine Surgery - All Is Well Hospital',
            'description' => 'Advanced neuro and spine surgery treatments at All Is Well Hospital. Expert care for brain and spinal conditions.',
            'keywords' => 'neuro surgery, spine surgery, brain surgery, spinal surgery, neurology, spine treatment',
            'og_title' => 'Neuro and Spine Surgery - All Is Well Hospital',
            'og_description' => 'Advanced neuro and spine surgery treatments at All Is Well Hospital. Expert care for brain and spinal conditions.',
            'og_image' => '/Serviceimages/Neuro and spine surgery.webp',
            'twitter_title' => 'Neuro and Spine Surgery - All Is Well Hospital',
            'twitter_description' => 'Advanced neuro and spine surgery treatments at All Is Well Hospital. Expert care for brain and spinal conditions.',
            'twitter_image' => '/Serviceimages/Neuro and spine surgery.webp'
        ],
        [
            'page_url' => '/care-center/cardiology',
            'title' => 'Cardiology - All Is Well Hospital',
            'description' => 'Comprehensive cardiology services at All Is Well Hospital. Advanced heart care and treatment options.',
            'keywords' => 'cardiology, heart care, cardiology treatment, heart surgery, cardiology services',
            'og_title' => 'Cardiology - All Is Well Hospital',
            'og_description' => 'Comprehensive cardiology services at All Is Well Hospital. Advanced heart care and treatment options.',
            'og_image' => '/Serviceimages/Cardiology.webp',
            'twitter_title' => 'Cardiology - All Is Well Hospital',
            'twitter_description' => 'Comprehensive cardiology services at All Is Well Hospital. Advanced heart care and treatment options.',
            'twitter_image' => '/Serviceimages/Cardiology.webp'
        ],
        [
            'page_url' => '/care-center/cardio-thoracic-surgery',
            'title' => 'Cardio Thoracic Surgery - All Is Well Hospital',
            'description' => 'Advanced cardio thoracic surgery at All Is Well Hospital. Expert care for heart and chest conditions.',
            'keywords' => 'cardio thoracic surgery, heart surgery, chest surgery, cardiac treatment, thoracic surgery',
            'og_title' => 'Cardio Thoracic Surgery - All Is Well Hospital',
            'og_description' => 'Advanced cardio thoracic surgery at All Is Well Hospital. Expert care for heart and chest conditions.',
            'og_image' => '/Serviceimages/Cardiovascular.webp',
            'twitter_title' => 'Cardio Thoracic Surgery - All Is Well Hospital',
            'twitter_description' => 'Advanced cardio thoracic surgery at All Is Well Hospital. Expert care for heart and chest conditions.',
            'twitter_image' => '/Serviceimages/Cardiovascular.webp'
        ],
        [
            'page_url' => '/care-center/plastic-surgery',
            'title' => 'Plastic and Reconstructive Surgery - All Is Well Hospital',
            'description' => 'Plastic and reconstructive surgery services at All Is Well Hospital. Expert care for cosmetic and reconstructive procedures.',
            'keywords' => 'plastic surgery, reconstructive surgery, cosmetic surgery, plastic surgery treatment',
            'og_title' => 'Plastic and Reconstructive Surgery - All Is Well Hospital',
            'og_description' => 'Plastic and reconstructive surgery services at All Is Well Hospital. Expert care for cosmetic and reconstructive procedures.',
            'og_image' => '/Serviceimages/plastic and reconstructive.webp',
            'twitter_title' => 'Plastic and Reconstructive Surgery - All Is Well Hospital',
            'twitter_description' => 'Plastic and reconstructive surgery services at All Is Well Hospital. Expert care for cosmetic and reconstructive procedures.',
            'twitter_image' => '/Serviceimages/plastic and reconstructive.webp'
        ],
        [
            'page_url' => '/care-center/urology',
            'title' => 'Urology - All Is Well Hospital',
            'description' => 'Comprehensive urology services at All Is Well Hospital. Advanced treatment for urinary and male reproductive system conditions.',
            'keywords' => 'urology, urology treatment, urinary system, male reproductive health, kidney stones',
            'og_title' => 'Urology - All Is Well Hospital',
            'og_description' => 'Comprehensive urology services at All Is Well Hospital. Advanced treatment for urinary and male reproductive system conditions.',
            'og_image' => '/Serviceimages/urology.webp',
            'twitter_title' => 'Urology - All Is Well Hospital',
            'twitter_description' => 'Comprehensive urology services at All Is Well Hospital. Advanced treatment for urinary and male reproductive system conditions.',
            'twitter_image' => '/Serviceimages/urology.webp'
        ],
        [
            'page_url' => '/care-center/oncology',
            'title' => 'Oncology - All Is Well Hospital',
            'description' => 'Advanced oncology services at All Is Well Hospital. Comprehensive cancer care and treatment options.',
            'keywords' => 'oncology, cancer treatment, oncology services, chemotherapy, radiation therapy',
            'og_title' => 'Oncology - All Is Well Hospital',
            'og_description' => 'Advanced oncology services at All Is Well Hospital. Comprehensive cancer care and treatment options.',
            'og_image' => '/Serviceimages/oncology.webp',
            'twitter_title' => 'Oncology - All Is Well Hospital',
            'twitter_description' => 'Advanced oncology services at All Is Well Hospital. Comprehensive cancer care and treatment options.',
            'twitter_image' => '/Serviceimages/oncology.webp'
        ]
    ];

    $stmt = $pdo->prepare("INSERT INTO seo_data (page_url, title, description, keywords, og_title, og_description, og_image, twitter_title, twitter_description, twitter_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    
    foreach ($seoData as $seoItem) {
        $stmt->execute([
            $seoItem['page_url'],
            $seoItem['title'],
            $seoItem['description'],
            $seoItem['keywords'],
            $seoItem['og_title'],
            $seoItem['og_description'],
            $seoItem['og_image'],
            $seoItem['twitter_title'],
            $seoItem['twitter_description'],
            $seoItem['twitter_image']
        ]);
    }
    
    echo "SEO data initialized successfully!\n";
    echo "Added " . count($seoData) . " SEO entries to the database.\n";
    
} catch(PDOException $e) {
    die("Error initializing SEO data: " . $e->getMessage());
}
