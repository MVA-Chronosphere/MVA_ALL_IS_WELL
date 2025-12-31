import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const StructuredData = ({ type, data }) => {
  const location = useLocation();

  // Generate structured data based on type
  const getStructuredData = () => {
    switch (type) {
      case 'MedicalOrganization':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "All Is Well Hospital",
          "image": "https://www.alliswellhospital.in/aiwlogo.webp",
          "url": "https://www.alliswellhospital.in",
          "telephone": "+91-769774444",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hospital Address",
            "addressLocality": "Khandwa",
            "addressRegion": "MP",
            "postalCode": "450001",
            "addressCountry": "IN"
          },
          "logo": "https://www.alliswellhospital.in/aiwlogo.webp",
          "description": "All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care.",
          "foundingDate": "2020",
          "numberOfEmployees": "10",
          "areaServed": "Khandwa",
          "availableService": [
            {
              "@type": "MedicalService",
              "name": "Cardiology",
              "provider": {
                "@type": "MedicalOrganization",
                "name": "All Is Well Hospital"
              }
            },
            {
              "@type": "MedicalService",
              "name": "Neuro and Spine Surgery",
              "provider": {
                "@type": "MedicalOrganization",
                "name": "All Is Well Hospital"
              }
            },
            {
              "@type": "MedicalService",
              "name": "Oncology",
              "provider": {
                "@type": "MedicalOrganization",
                "name": "All Is Well Hospital"
              }
            }
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7697744444",
            "contactType": "emergency",
            "areaServed": "IN",
            "availableLanguage": "English, Hindi, Marathi"
          },
          "openingHours": "Mo,Tu,We,Th,Fr,Sa 10:00-18:00",
          "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Insurance"]
        };
      
      case 'LocalBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "All Is Well Hospital",
          "image": "https://www.alliswellhospital.in/aiwlogo.webp",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hospital Address",
            "addressLocality": "Khandwa",
            "addressRegion": "MP",
            "postalCode": "450001",
            "addressCountry": "IN"
          },
          "telephone": "+91-7697744444",
          "openingHours": "Mo,Tu,We,Th,Fr,Sa 10:00-18:00",
          "priceRange": "$$",
          "servesCurrencies": "INR",
          "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "Insurance"],
          "areaServed": {
            "@type": "City",
            "name": "Khandwa"
          },
          "availableService": [
            {
              "@type": "MedicalService",
              "name": "Emergency Services",
              "areaServed": {
                "@type": "City",
                "name": "Khandwa"
              },
              "provider": {
                "@type": "MedicalOrganization",
                "name": "All Is Well Hospital"
              }
            }
          ]
        };
      
      case 'Doctor':
        // Return null if data is not provided or incomplete
        if (!data || !data.name || !data.image || !data.id || !data.specialty) {
          return null;
        }
        return {
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": data.name,
          "image": data.image,
          "url": `https://www.alliswellhospital.in/doctor/${data.id}`,
          "telephone": "+91-769774444",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Hospital Address",
            "addressLocality": "Khandwa",
            "addressRegion": "MP",
            "postalCode": "45001",
            "addressCountry": "IN"
          },
          "hospitalAffiliation": {
            "@type": "Hospital",
            "name": "All Is Well Hospital"
          },
          "specialty": [
            {
              "@type": "MedicalSpecialty",
              "name": data.specialty
            }
          ],
          "availableService": [
            {
              "@type": "MedicalService",
              "name": data.specialty
            }
          ],
          "acceptsNewPatients": true,
          "description": `Dr. ${data.name} is a qualified ${data.specialty} specialist at All Is Well Hospital.`
        };
      
      case 'WebPage':
        return {
          "@context": "https://schema.org",
          "@type": "WebPage",
          "url": window.location.href,
          "name": data?.title || "All Is Well Hospital - Best Healthcare Services",
          "description": data?.description || "All Is Well Hospital provides comprehensive healthcare services.",
          "publisher": {
            "@type": "MedicalOrganization",
            "name": "All Is Well Hospital",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.alliswellhospital.in/aiwlogo.webp"
            }
          },
          "mainEntity": {
            "@type": "MedicalOrganization",
            "name": "All Is Well Hospital"
          }
        };
      
      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  useEffect(() => {
    if (structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
 }, [structuredData, location.pathname]);

  return null;
};

export default StructuredData;
