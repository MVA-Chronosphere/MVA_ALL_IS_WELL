import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Phone } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import FindADoctorPage from "./pages/FindADoctorPage";
import DoctorDetailsPage from "./pages/DoctorDetailsPage";
import CareCenterService from "./components/CareCenterService";
import CareCenter from "./pages/CareCenter";
import Academics from "./pages/Academics";
import CommunityServices from "./pages/CommunityServices";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import BranchesPage from "./pages/BranchesPage";
import BlogPage from "./pages/BlogPage";
import BlogLoginPage from "./pages/BlogLoginPage";
import ArticlePage from "./pages/ArticlePage";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AmbulancePage from "./pages/AmbulancePage";
import SeoManagementPage from "./pages/SeoManagementPage";
import SeoManager from "./components/SeoManager";
import { AdminProvider } from "./contexts/AdminContext";

import ShahpurBranch from "./pages/Branches/Shahpur";
import KhandwaBranch from "./pages/Branches/Khandwa";
import BurhanpurClinic from "./pages/Branches/BurhanpurClinic";
import SanawadBranch from "./pages/Branches/Sanawad";
import RaverBranch from "./pages/Branches/Raver";
import KhargoneBranch from "./pages/Branches/Khargone";
import BurhanpurBranch from "./pages/Branches/Burhanpur";
import PhopnarBranch from "./pages/Branches/Phopnar";
import DharniBranch from "./pages/Branches/Dharni";
import CertificationsPage from "./pages/certifications";
import Careers from "./pages/Careers";

// tawk.to widget style
const tawkToStyles = `
  [id*="tawk"] {
    transform: scale(1.3) !important;
    transform-origin: right bottom !important;
    width: 65px !important;
    height: 65px !important;
  }
`;

const ScrollToHash = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
};

function App() {
  const location = useLocation();
  const hideMainHeaderFooter = location.pathname.startsWith("/seo-management");

  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/68ea085e97f1e31950bda971/1j7931cki";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    const style = document.createElement("style");
    style.innerHTML = tawkToStyles;
    document.head.appendChild(style);

    return () => {
      if (s1.parentNode) s1.parentNode.removeChild(s1);
      if (style.parentNode) style.parentNode.removeChild(style);
    };
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white relative">
        {!hideMainHeaderFooter && <Header />}

        <ScrollToHash />

        <Routes>
          <Route path="/" element={<SeoManager><HomePage /></SeoManager>} />
          <Route path="/about/*" element={<SeoManager><AboutUs /></SeoManager>} />
          <Route path="/ambulance" element={<SeoManager><AmbulancePage /></SeoManager>} />
          <Route path="/care-center" element={<SeoManager><CareCenter /></SeoManager>} />
          <Route path="/care-center/:service" element={<SeoManager><CareCenterService /></SeoManager>} />
          <Route path="/find-doctor" element={<SeoManager><FindADoctorPage /></SeoManager>} />
          <Route path="/doctor/:doctorId" element={<SeoManager><DoctorDetailsPage /></SeoManager>} />
          <Route path="/academics" element={<SeoManager><Academics /></SeoManager>} />
          <Route path="/blog" element={<ProtectedRoute><SeoManager><BlogPage /></SeoManager></ProtectedRoute>} />
          <Route path="/blog/login" element={<SeoManager><BlogLoginPage /></SeoManager>} />
          <Route path="/articles" element={<SeoManager><ArticlePage /></SeoManager>} />

          {/* Branch routes */}
          <Route path="/branches/shahpur" element={<SeoManager><ShahpurBranch /></SeoManager>} />
          <Route path="/branches/khandwa" element={<SeoManager><KhandwaBranch /></SeoManager>} />
          <Route path="/branches/burhanpur-clinic" element={<SeoManager><BurhanpurClinic /></SeoManager>} />
          <Route path="/branches/sanawad" element={<SeoManager><SanawadBranch /></SeoManager>} />
          <Route path="/branches/raver" element={<SeoManager><RaverBranch /></SeoManager>} />
          <Route path="/branches/khargone" element={<SeoManager><KhargoneBranch /></SeoManager>} />
          <Route path="/branches/burhanpur" element={<SeoManager><BurhanpurBranch /></SeoManager>} />
          <Route path="/branches/phopnar" element={<SeoManager><PhopnarBranch /></SeoManager>} />
          <Route path="/branches/dharni" element={<SeoManager><DharniBranch /></SeoManager>} />

          <Route path="/community-services" element={<SeoManager><CommunityServices /></SeoManager>} />
          <Route path="/contact-us" element={<SeoManager><ContactUs /></SeoManager>} />
          <Route path="/certification" element={<SeoManager><CertificationsPage /></SeoManager>} />
          <Route path="/branches" element={<SeoManager><BranchesPage /></SeoManager>} />
          <Route path="/privacy" element={<SeoManager><PrivacyPolicy /></SeoManager>} />
          <Route path="/terms" element={<SeoManager><TermsOfService /></SeoManager>} />
          <Route path="/careers" element={<SeoManager><Careers /></SeoManager>} />

          {/* SEO MANAGEMENT DASHBOARD PAGE - NO GLOBAL HEADER/FOOTER */}
          <Route
            path="/seo-management"
            element={
              <AdminProvider>
                <SeoManager>
                  <SeoManagementPage />
                </SeoManager>
              </AdminProvider>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {!hideMainHeaderFooter && <Footer />}

        {!hideMainHeaderFooter && (
          <div className="fixed top-[200px] right-0 z-[9999] transform translate-x-1/2 rotate-90 mr-4">
            <a
              href="/ambulance"
              className="bg-red-600 text-white px-4 py-2 rounded-sm shadow-lg hover:bg-red-700 transition-colors duration-300 whitespace-nowrap text-sm font-bold"
            >
              EMERGENCY
            </a>
          </div>
        )}

        {!hideMainHeaderFooter && (
          <div className="fixed bottom-24 right-6 z-[9999]">
            <a
              href="https://wa.me/7697744444"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <Phone size={32} className="text-white" />
            </a>
          </div>
        )}
      </div>
    </AuthProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
