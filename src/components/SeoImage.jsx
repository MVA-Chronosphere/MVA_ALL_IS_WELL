import React, { useState, useEffect } from 'react';
import SeoService from '../services/SeoService';

const SeoImage = ({ src, alt, className, ...props }) => {
 const [imageAlt, setImageAlt] = useState(alt || 'All Is Well Hospital Image');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAltText = async () => {
      try {
        // First try to get alt text from the backend
        const altText = await SeoService.getImageAltText(src);
        if (altText) {
          setImageAlt(altText);
        } else {
          // If no specific alt text found in backend, use the provided alt or a default
          setImageAlt(alt || getDefaultAltText(src));
        }
      } catch (error) {
        console.error('Error fetching image alt text:', error);
        // Fallback to provided alt or default
        setImageAlt(alt || getDefaultAltText(src));
      } finally {
        setLoading(false);
      }
    };

    fetchAltText();
  }, [src]);

  // Function to generate default alt text based on image path
  const getDefaultAltText = (imagePath) => {
    if (!imagePath) return 'All Is Well Hospital Image';
    
    const imageMap = {
      '/aiwlogo.webp': 'All Is Well Hospital Logo',
      '/banners/Ambulance.webp': 'Ambulance Service at All Is Well Hospital',
      '/hero/fullhospital.webp': 'All Is Well Hospital Building',
      '/communityservices/Camp1-1-1024x768.webp': 'Community Health Camp by All Is Well Hospital',
      '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp': 'NABH Certification of All Is Well Hospital',
      '/whysection/Mri.png': 'Advanced MRI Technology at All Is Well Hospital',
      '/whysection/team.jpg': 'Medical Team at All Is Well Hospital',
      '/whysection/patient.webp': 'Patient Care at All Is Well Hospital',
      '/Serviceimages/Neuro and spine surgery.webp': 'Neuro and Spine Surgery Department',
      '/Serviceimages/Cardiology.webp': 'Cardiology Department',
      '/Serviceimages/Cardiovascular.webp': 'Cardiovascular Surgery Department',
      '/Serviceimages/plastic and reconstructive.webp': 'Plastic and Reconstructive Surgery Department',
      '/Serviceimages/urology.webp': 'Urology Department',
      '/Serviceimages/oncology.webp': 'Oncology Department',
      '/Serviceimages/endocrine.webp': 'Endocrinology Department',
      '/Serviceimages/rheumatology.webp': 'Rheumatology Department',
      '/Serviceimages/radiology and imaging.webp': 'Radiology and Imaging Department',
      '/Serviceimages/critical_care_medicine.webp': 'Critical Care Medicine Department',
      '/Serviceimages/anesthesia.webp': 'Anesthesia Department',
      '/Serviceimages/general and minimal.webp': 'General and Minimal Invasive Surgery Department',
      '/Serviceimages/general medicine.webp': 'General Medicine Department',
      '/Serviceimages/internal medicine.webp': 'Internal Medicine Department',
      '/Serviceimages/obstetrics and gynaecology.webp': 'Obstetrics and Gynaecology Department',
      '/Serviceimages/orthopedics.webp': 'Orthopedics Department',
      '/Serviceimages/pathology.webp': 'Pathology Department',
      '/Serviceimages/blood_bank_components.webp': 'Blood Bank Services',
      '/Serviceimages/ent_hospital_examination.webp': 'ENT Department',
      '/Serviceimages/ophthalmology.webp': 'Ophthalmology Department',
      '/Serviceimages/dermatology.webp': 'Dermatology Department',
      '/Serviceimages/psychiatry.webp': 'Psychiatry Department',
      '/Serviceimages/dental_services.webp': 'Dental Services Department',
      '/Serviceimages/yoga.webp': 'Yoga Therapy Services',
      '/Serviceimages/physiotherapy.webp': 'Physiotherapy Department',
      '/Serviceimages/nutrition_and_dietetics.webp': 'Nutrition and Dietetics Department',
      '/Serviceimages/pediatrics_neonatology.webp': 'Pediatrics and Neonatology Department',
      '/Doctorphotos/': 'Doctor Photo at All Is Well Hospital',
      '/board/': 'Board Member Photo at All Is Well Hospital',
      '/hero/': 'Hospital Image at All Is Well Hospital',
      '/banners/': 'Hospital Banner Image',
      '/blogpictures/': 'Health Blog Image',
      '/certifications/': 'Hospital Certification',
      '/communityservices/': 'Community Service Image',
    };

    // Check for specific matches first
    for (const [path, defaultAlt] of Object.entries(imageMap)) {
      if (imagePath.includes(path)) {
        return defaultAlt;
      }
    }

    // If no specific match, return a generic alt text
    return 'All Is Well Hospital Image';
  };

  if (loading) {
    // Show a placeholder while loading the alt text
    return (
      <img
        src={src}
        alt={alt || 'Loading image...'}
        className={className}
        {...props}
        style={{ ...props.style, opacity: 0.8 }}
      />
    );
  }

  return (
    <img
      src={src}
      alt={imageAlt}
      className={className}
      {...props}
    />
  );
};

export default SeoImage;
