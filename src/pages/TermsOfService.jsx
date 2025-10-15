import React from 'react';
import Header from '../components/Header';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose max-w-none bg-white p-8 rounded-lg shadow-md">
          <p><strong>Last Updated:</strong> October 9, 2025</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Introduction</h2>
          <p>Welcome to All Is WEll Hospital. These terms and conditions outline the rules and regulations for the use of All Is WEll Hospital's Website, located at www.alliswellhospital.com.</p>
          <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use All Is WEll Hospital if you do not agree to all of the terms and conditions stated on this page.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Eligibility</h2>
          <p>By using our services, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms. If you are using our services on behalf of an entity, you represent that you have the authority to bind that entity to these Terms.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Healthcare Services</h2>
          <p>Our website provides information about healthcare services offered by All Is WEll Hospital. The information provided on this website is for general informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Online Appointments</h2>
          <p>When you schedule appointments through our website, you agree to provide accurate and complete information. You are responsible for ensuring that your contact information is up to date. We reserve the right to cancel appointments if we cannot verify your information.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Medical Information</h2>
          <p>Any medical information provided through our website is for educational purposes only. Always seek the advice of your physician or other qualified healthcare provider with any questions you may have regarding a medical condition or treatment.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">User Responsibilities</h2>
          <p>When using our website, you agree not to:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Use the website for any unlawful purpose</li>
            <li>Transmit any harmful code or viruses</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Use the website in any way that could damage or impair our services</li>
            <li>Provide false or misleading information</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Limitation of Liability</h2>
          <p>In no event shall All Is WEll Hospital, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Changes to Terms</h2>
          <p>We reserve the right to modify or replace these terms at any time. We will provide notice of any material changes through our website. Your continued use of the website after any changes constitutes acceptance of the new terms.</p>
          
          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
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

export default TermsOfService;
