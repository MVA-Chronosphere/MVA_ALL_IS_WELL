import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const BurhanpurBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Super Clinic, Burhanpur"
      location="Shahpur, Madhya Pradesh"
      galleryImages={[
        '/branches/burhanpur/burhanpur1.webp',
        '/branches/burhanpur/burhanpur2.webp',
        '/branches/burhanpur/burhanpur3.webp',
        '/branches/burhanpur/burhanpur4.webp',
        '/branches/burhanpur/burhanpur5.webp',
        '/branches/burhanpur/burhanpur6.webp'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.8444753985164!2d76.3411357752713!3d21.82493915995757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd81b25e61c2ed3%3A0xf49178fe13d6f875!2sAll%20Is%20Well%20Super%20Clinic%2C%20Khandwa!5e0!3m2!1sen!2sin!4v1759130962506!5m2!1sen!2sin"
      contactInfo={{
        phone: "+91 85160 11722",
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
        contact: "Emergency: +91 70899 22888",
        serviceArea: "Burhanpur and surrounding areas"
      }}
    />
  );
};

export default BurhanpurBranch;
