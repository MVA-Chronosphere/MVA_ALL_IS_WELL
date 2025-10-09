import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import FindADoctorPage from './pages/FindADoctorPage';
import CareCenterService from './components/CareCenterService';
import Academics from './pages/Academics';
import CommunityServices from './pages/CommunityServices'; // Import the new page
import ContactUs from './pages/ContactUs';

// Import all branch pages
import ShahpurBranch from './pages/Branches/Shahpur';
import KhandwaBranch from './pages/Branches/Khandwa';
import BurhanpurClinic from './pages/Branches/BurhanpurClinic';
import SanawadBranch from './pages/Branches/Sanawad';
import RaverBranch from './pages/Branches/Raver';
import KhargoneBranch from './pages/Branches/Khargone';
import BurhanpurBranch from './pages/Branches/Burhanpur';
import PhopnarBranch from './pages/Branches/Phopnar';
import DharniBranch from './pages/Branches/Dharni';
import CertificationsPage from './pages/certifications';

// Scroll to hash component
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return null; // This component doesn't render anything
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Add the ScrollToHash component to handle scrolling */}
        <ScrollToHash />

        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* About Us with nested pages */}
          <Route path="/about/*" element={<AboutUs />} />

          {/* Dynamic Care Center pages - Single parameter route */}
          <Route path="/care-center/:service" element={<CareCenterService />} />
         
          <Route path="/find-doctor" element={<FindADoctorPage />} />
          <Route path="/academics" element={<Academics />} />
          
          {/* Branch Routes */}
          <Route path="/branches/shahpur" element={<ShahpurBranch />} />
          <Route path="/branches/khandwa" element={<KhandwaBranch />} />
          <Route path="/branches/burhanpur-clinic" element={<BurhanpurClinic />} />
          <Route path="/branches/sanawad" element={<SanawadBranch />} />
          <Route path="/branches/raver" element={<RaverBranch />} />
          <Route path="/branches/khargone" element={<KhargoneBranch />} />
          <Route path="/branches/burhanpur" element={<BurhanpurBranch />} />
          <Route path="/branches/phopnar" element={<PhopnarBranch />} />
          <Route path="/branches/dharni" element={<DharniBranch />} />


          {/* Community Services Route */}
          <Route path="/community-services" element={<CommunityServices />} />

          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/certification" element={<CertificationsPage />} />

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
