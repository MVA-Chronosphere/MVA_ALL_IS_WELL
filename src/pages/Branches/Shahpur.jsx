import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const ShahpurBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Super Clinic, Shahpur"
      location="Shahpur, Madhya Pradesh"
      galleryImages={[
        '/branches/shahpur/shahpur1.jpeg',
        '/branches/shahpur/shahpur2.jpeg',
        '/branches/shahpur/shahpur3.jpeg',
        '/branches/shahpur/shahpur4.jpeg',
        '/branches/shahpur/shahpur5.jpeg'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.4026905270194!2d76.22174457497583!3d21.240151478887406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9cd628a8e0aa7%3A0xf197b30211d90022!2sAll%20is%20Well%20Super%20Clinic%20Shahpur!5e0!3m2!1sen!2sin!4v1695977424086!5m2!1sen!2sin"
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
          timing: "3:00 PM - 7:00 PM",
          doctor: "Dr. A. Patel",
          specialization: "Cardiologist"
        },
        {
          day: "Thursday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. R. Singh",
          specialization: "ENT Specialist"
        },
        {
          day: "Friday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. M. Kumar",
          specialization: "Pediatrician"
        },
        {
          day: "Saturday",
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
        contact: "Emergency: +91 85160 11722",
        serviceArea: "Shahpur and surrounding areas"
      }}
    />
  );
};

export default ShahpurBranch;
