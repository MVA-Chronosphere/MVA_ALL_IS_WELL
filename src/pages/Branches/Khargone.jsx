import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const KhargoneBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Sahayata, Khargone"
      location="Near Bus Stand, Khargone, Madhya Pradesh"
      galleryImages={[
        '/branches/khargone/khandwa.webp',
        '/branches/khargone/khandwa2.webp',
        '/branches/khargone/khandwa3.webp'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7407.404850470703!2d75.61760997770996!3d21.830425500000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8877d9866ce67%3A0x4bec69db02569136!2sAll%20is%20well%20hospital%20khargone!5e0!3m2!1sen!2sin!4v1759133660770!5m2!1sen!2sin" 
      contactInfo={{
        phone: "+91 85160 60123",
        email: "contact@alliswell.com",
        hours: "Monday - Saturday: 10:00 AM - 8:00 PM"
      }}
      healthPackages={[
        {
          name: "Basic Health Checkup",
          price: "999",
          description: "Basic health evaluation with essential tests"
        },
        {
          name: "Comprehensive Health Package",
          price: "1499",
          description: "Complete health assessment including specialized tests"
        },
        {
          name: "Senior Citizen Package",
          price: "1299",
          description: "Tailored checkup package for elderly care"
        }
      ]}
      services={[
              {
                name: "General Check-up",
                description: "Complete health evaluation",
                icon: Stethoscope
              },
              {
                name: "Dental Services",
                description: "Comprehensive dental care",
                icon: HeartPulse
              },
              {
                name: "Eye Care",
                description: "Complete eye examination",
                icon: Eye
              },
              {
                name: "Vaccination",
                description: "Immunization services",
                icon: Syringe
              }
            ]}
      opdInfo={[
        {
          day: "Monday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. S. Sharma",
          specialization: "General Physician"
        },
        {
          day: "Tuesday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. A. Gupta",
          specialization: "Cardiologist"
        },
        {
          day: "Wednesday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. R. Patel",
          specialization: "Dermatologist"
        },
        {
          day: "Thursday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. M. Kumar",
          specialization: "ENT Specialist"
        },
        {
          day: "Friday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. K. Shah",
          specialization: "Pediatrician"
        }
      ]}
      busService={{
        timing: "Every 30 minutes",
        startPoint: "Main Bus Stand",
        contact: "Contact for schedule"
      }}
      ambulanceService={{
        availability: "24/7 Emergency Service",
        contact: "Emergency: +91 85160 60123",
        serviceArea: "Khargone and surrounding areas"
      }}
    />
  );
};

export default KhargoneBranch;
