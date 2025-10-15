import React from 'react';
import Header from '../components/Header';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose max-w-none bg-white p-8 rounded-lg shadow-md">
          <p><strong>Last Updated:</strong> October 9, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
          <p>All Is WEll Hospital ("we", "us", or "our") operates the website and provides healthcare services. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our services and the choices you have associated with that data.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
          <p>We collect several different types of information for various purposes to provide and improve our services to you.</p>
          
          <h3 className="text-xl font-medium mt-4 mb-2">Personal Data</h3>
          <p>While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Email address</li>
            <li>First name, last name</li>
            <li>Phone number</li>
            <li>Address, state, province, zip code</li>
            <li>Medical history and health information</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-4 mb-2">Usage Data</h3>
          <p>We may also collect information that your browser sends whenever you visit our website ("Usage Data"). This may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Use of Data</h2>
          <p>All Is WEll Hospital uses the collected data for various purposes:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information to improve our services</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide medical care and maintain medical records</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Security of Data</h2>
          <p>The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Service Providers</h2>
          <p>We may employ third-party companies and individuals to facilitate our services, provide the services on our behalf, perform service-related services, or assist us in analyzing how our services are used.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>By email: frontdesk@alliswellhospital.com</li>
            <li>By phone: +91 7089055888</li>
            <li>At: Near Macro Vision Academy, Burhanpur, Madhya Pradesh, 450331</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
