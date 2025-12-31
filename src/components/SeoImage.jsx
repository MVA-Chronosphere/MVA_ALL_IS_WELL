import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SeoService from '../services/SeoService';

const SeoImage = ({ src, alt, className, loading = 'lazy', width, height, ...props }) => {
  const [imageAlt, setImageAlt] = useState(alt || 'All Is Well Hospital Image');
  const [loadingState, setLoadingState] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: width, height: height });
  const [aspectRatio, setAspectRatio] = useState(null);

  // Filter out framer-motion specific props to avoid React warnings
  const motionProps = [
    'whileHover', 'whileTap', 'whileFocus', 'whileInView', 'whileDrag', 'whileAnimate',
    'initial', 'animate', 'exit', 'transition', 'variants', 'transformTemplate',
    'transformValues', 'custom', 'style', 'onViewportEnter', 'onViewportLeave'
  ];
  
  const filteredProps = {};
  const motionPropsForMotionComponent = {};
  
 // Separate motion props from regular image props
  Object.keys(props).forEach(key => {
    if (motionProps.includes(key)) {
      motionPropsForMotionComponent[key] = props[key];
    } else {
      filteredProps[key] = props[key];
    }
 });

  // If there are motion props, we need to use a motion.img instead of regular img
 const hasMotionProps = Object.keys(motionPropsForMotionComponent).length > 0;

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
        setLoadingState(false);
      }
    };

    // If width and height are not provided, try to determine them based on the image
    if (!width || !height) {
      const img = new Image();
      img.onload = () => {
        setImageDimensions({
          width: width || img.naturalWidth,
          height: height || img.naturalHeight
        });
        
        // Calculate aspect ratio
        if (img.naturalWidth && img.naturalHeight) {
          setAspectRatio(img.naturalWidth / img.naturalHeight);
        }
      };
      img.src = src;
    }

    fetchAltText();
  }, [src, width, height]);

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

  // Calculate aspect ratio for responsive images
  const calculateAspectRatio = (naturalWidth, naturalHeight) => {
    if (naturalWidth && naturalHeight) {
      return naturalWidth / naturalHeight;
    }
    return null;
  };

  if (loadingState) {
    // Show a placeholder while loading the alt text
    if (hasMotionProps) {
      return React.createElement(motion.img, {
        src: src,
        alt: alt || 'Loading image...',
        className: className,
        loading: loading,
        width: imageDimensions.width,
        height: imageDimensions.height,
        ...filteredProps,
        ...motionPropsForMotionComponent,
        style: { ...props.style, opacity: 0.8 }
      });
    } else {
      return (
        <img
          src={src}
          alt={alt || 'Loading image...'}
          className={className}
          loading={loading}
          width={imageDimensions.width}
          height={imageDimensions.height}
          {...filteredProps}
          style={{ ...props.style, opacity: 0.8 }}
        />
      );
    }
  }

   if (hasMotionProps) {
    return React.createElement(motion.img, {
      src: src,
      alt: imageAlt,
      className: className,
      loading: loading,
      width: imageDimensions.width,
      height: imageDimensions.height,
      ...filteredProps,
      ...motionPropsForMotionComponent
    });
 } else {
    // For aiwlogo.webp specifically, ensure proper aspect ratio handling
    if (src.includes('/aiwlogo.webp')) {
      return (
        <div className="aspect-[428/138] w-full max-w-[428px]">
          <img
            src={src}
            alt={imageAlt}
            className={`${className || ''} w-full h-full object-contain`}
            loading={loading}
            {...filteredProps}
          />
        </div>
      );
    }
    
    return (
      <img
        src={src}
        alt={imageAlt}
        className={className}
        loading={loading}
        width={imageDimensions.width}
        height={imageDimensions.height}
        {...filteredProps}
      />
    );
 }
};

export default SeoImage;
