import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const RaverBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Super Clinic, Raver"
      location="Raver"
      contactInfo={{
        phone: "+91 85168 20123",
        email: "contact@alliswell.com",
        hours: "Monday - Saturday: 10:00 AM - 8:00 PM"
      }}
      galleryImages={[
        '/branches/raver/Raver-branch-1.jpg',
        '/branches/raver/Raver-branch-2.jpg',
        '/branches/raver/Raver-branch-3.jpg',
        '/branches/raver/Raver-branch-4.jpg'
      ]}
      
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.7934901374347!2d76.0308135750057!3d21.240036080488924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9b57f56986d3f%3A0x43f5940f09d67931!2sAll%20is%20Well%20Super%20Clinic%20Raver!5e0!3m2!1sen!2sin!4v1729516111725!5m2!1sen!2sin"
      
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
          doctor: "Dr. S. Shah",
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
        contact: "Emergency: +91 85168 20123",
        serviceArea: "Raver and surrounding areas"
      }}
    />
  );
};

export default RaverBranch;
