import React from 'react';
import BranchTemplate from '../../components/BranchTemplate';
import { Stethoscope, HeartPulse, Eye, Syringe } from 'lucide-react';

const KhandwaBranch = () => {
  return (
    <BranchTemplate 
      branchName="All Is Well Super Clinic, Khandwa"
      location="Khandwa, Madhya Pradesh"
      galleryImages={[
        '/branches/khandwa/khandwa.jpeg',
        '/branches/khandwa/khandwa2.jpeg',
        '/branches/khandwa/khandwa3.jpeg',
        '/branches/khandwa/khandwa4.jpeg',
        '/branches/khandwa/khandwa5.jpeg',
        '/branches/khandwa/khandwa6.jpeg'
      ]}
      mapLocation="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3703.8444753985164!2d76.3411357752713!3d21.82493915995757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd81b25e61c2ed3%3A0xf49178fe13d6f875!2sAll%20Is%20Well%20Super%20Clinic%2C%20Khandwa!5e0!3m2!1sen!2sin!4v1759130962506!5m2!1sen!2sin"
      contactInfo={{
        phone: "+91 85160 70123",
        email: "contact@alliswell.com",
        hours: "Monday - Saturday: 10:00 AM - 8:00 PM"
      }}
      healthPackages={[
        {
          name: "Basic Health Checkup",
          price: "1499",
          description: "Blood pressure, blood sugar, cholesterol screening, and BMI calculation."
        },
        {
          name: "Comprehensive Health Checkup",
          price: "3999",
          description: "Basic tests plus ECG, liver & kidney function, and thyroid screening."
        },
        {
          name: "Senior Citizen Package",
          price: "4499",
          description: "Heart screening, bone density test, and detailed metabolic panel."
        }
      ]}
      services={[
        {
          name: "General Check-up",
          description: "Comprehensive health evaluations for all age groups.",
          icon: Stethoscope
        },
        {
          name: "Dental Services",
          description: "Quality dental care and regular oral check-ups.",
          icon: HeartPulse
        },
        {
          name: "Eye Care",
          description: "Eye testing, vision correction, and specialized care.",
          icon: Eye
        },
        {
          name: "Vaccination",
          description: "Immunization services for all age groups.",
          icon: Syringe
        }
      ]}
      opdInfo={[
        {
          day: "Monday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. A. Sharma",
          specialization: "General Physician"
        },
        {
          day: "Tuesday",
          timing: "11:00 AM - 3:00 PM",
          doctor: "Dr. R. Gupta",
          specialization: "Cardiologist"
        },
        {
          day: "Wednesday",
          timing: "09:00 AM - 1:00 PM",
          doctor: "Dr. S. Patel",
          specialization: "Dermatologist"
        },
        {
          day: "Thursday",
          timing: "10:00 AM - 2:00 PM",
          doctor: "Dr. N. Mehta",
          specialization: "ENT Specialist"
        },
        {
          day: "Friday",
          timing: "11:00 AM - 4:00 PM",
          doctor: "Dr. K. Joshi",
          specialization: "Pediatrician"
        }
      ]}
      busService={{
        timing: "Every 30 minutes from 7:00 AM to 8:00 PM",
        startPoint: "City Center to Super Clinic",
        contact: "+91-9876543210"
      }}
      ambulanceService={{
        availability: "24x7 Emergency Support",
        contact: "+91-9123456789",
        serviceArea: "All nearby locations within 15 km radius"
      }}
    />
  );
};

export default KhandwaBranch;
