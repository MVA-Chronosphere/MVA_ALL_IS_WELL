import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const DharniBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Super Clinic, Dharni"
      location="Main Market, Dharni, Madhya Pradesh"
      galleryImages={[
        '/branches/khandwa/khandwa.webp',
        '/branches/khandwa/khandwa2.webp',
        '/branches/khandwa/khandwa3.webp'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1234567890123!2d77.07126!3d21.8256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd838a4e54c4567%3A0x90314bd5845d3f86!2sALL%20IS%20WELL%20SUPER%20CLINIC%20DHARNI!5e0!3m2!1sen!2sin!4v1696005435284!5m2!1sen!2sin"
      contactInfo={{
        phone: "+91 70890 22888",
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
          doctor: "Dr. A. Patel",
          specialization: "Cardiologist"
        },
        {
          day: "Wednesday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. R. Singh",
          specialization: "ENT Specialist"
        },
        {
          day: "Thursday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. M. Kumar",
          specialization: "Pediatrician"
        },
        {
          day: "Friday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. K. Shah",
          specialization: "Dermatologist"
        }
      ]}
      busService={{
        timing: "Every 30 minutes",
        startPoint: "Main Bus Stand",
        contact: "Contact for schedule"
      }}
      ambulanceService={{
        availability: "24/7 Emergency Service",
        contact: "Emergency: +91 70890 22888",
        serviceArea: "Dharni and surrounding areas"
      }}
    />
  );
};

export default DharniBranch;
