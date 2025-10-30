import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const PhopnarBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Collection Center, Phopnar"
      location="Main Road, Phopnar, Madhya Pradesh"
      galleryImages={[
        '/branches/khandwa/khandwa.webp',
        '/branches/khandwa/khandwa2.webp',
        '/branches/khandwa/khandwa3.webp'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14861.77339261938!2d76.6034238!3d21.4593328!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd83ed0b9149af1%3A0x90314bd5845d3f86!2sALL%20IS%20WELL%20COLLECTION%20CENTER%20PHOPNAR!5e0!3m2!1sen!2sin!4v1696005435284!5m2!1sen!2sin"
      contactInfo={{
        phone: "+91 99779 90704",
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
          doctor: "Dr. S. Kumar",
          specialization: "General Physician"
        },
        {
          day: "Tuesday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. A. Patel",
          specialization: "Pathologist"
        },
        {
          day: "Wednesday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. R. Singh",
          specialization: "Lab Specialist"
        },
        {
          day: "Thursday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. M. Shah",
          specialization: "Diagnostician"
        },
        {
          day: "Friday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. K. Gupta",
          specialization: "General Physician"
        }
      ]}
      busService={{
        timing: "Every 30 minutes",
        startPoint: "Main Bus Stand",
        contact: "Contact for schedule"
      }}
      ambulanceService={{
        availability: "24/7 Emergency Service",
        contact: "Emergency: +91 99779 90704",
        serviceArea: "Phopnar and surrounding areas"
      }}
    />
  );
};

export default PhopnarBranch;
