import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Phone } from "lucide-react"; // Only WhatsApp icon now
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

// CSS to make tawk.to widget bigger
const tawkToStyles = `
  [id*="tawk"] {
    transform: scale(1.3) !important;
    transform-origin: right bottom !important;
    width: 65px !important;
    height: 65px !important;
  }
  [id*="tawk"] * {
    transform: scale(1.3) !important;
    transform-origin: right bottom !important;
    width: 65px !important;
    height: 65px !important;
  }
  .tawk-widget, .tawk-display-button, .tawk-opened {
    width: 65px !important;
    height: 65px !important;
    min-width: 65px !important;
    min-height: 65px !important;
  }
  .tawk-chat-circle, .tawk-circle {
    width: 65px !important;
    height: 65px !important;
  }
  .tawk-chat-icon {
    width: 40px !important;
    height: 40px !important;
    transform: scale(1.3) !important;
 }
  iframe[src*="tawk"] {
    transform: scale(1.3) !important;
    transform-origin: right bottom !important;
 }
`;

// Branch pages
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

// Scroll to hash (for smooth navigation)
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
};

function App() {
  useEffect(() => {
    // Load the Tawk.to script dynamically
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/68ea085e97f1e31950bda971/1j7931cki";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);

    // Apply CSS to make tawk.to widget bigger
    const style = document.createElement('style');
    style.innerHTML = tawkToStyles;
    document.head.appendChild(style);

    // Set up a MutationObserver to reapply styles if tawk.to changes DOM elements
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && (node.id || node.className)) {
              // Check if this is a tawk.to element and reapply styles
              if (node.id && node.id.includes('tawk')) {
                node.style.transform = 'scale(1.3)';
                node.style.transformOrigin = 'right bottom';
                node.style.width = '65px';
                node.style.height = '65px';
              }
              if (node.className && node.className.includes('tawk')) {
                node.style.transform = 'scale(1.3)';
                node.style.transformOrigin = 'right bottom';
                node.style.width = '65px';
                node.style.height = '65px';
              }
            }
          });
        }
      }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      // Cleanup if needed
      if (s1.parentNode) s1.parentNode.removeChild(s1);
      if (style.parentNode) style.parentNode.removeChild(style);
      observer.disconnect(); // Stop observing when component unmounts
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white relative">
          <Header />

          <ScrollToHash />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about/*" element={<AboutUs />} />
            <Route path="/care-center" element={<CareCenter />} />
            <Route path="/care-center/:service" element={<CareCenterService />} />
            <Route path="/find-doctor" element={<FindADoctorPage />} />
            <Route path="/doctor/:doctorId" element={<DoctorDetailsPage />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/blog" element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            } />
            <Route path="/blog/login" element={<BlogLoginPage />} />
            <Route path="/articles" element={<ArticlePage />} />

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

            <Route path="/community-services" element={<CommunityServices />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/certification" element={<CertificationsPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/careers" element={<Careers />} />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <Footer />

          {/* ✅ WhatsApp Icon (non-overlapping with Tawk.to widget) */}
          <div className="fixed bottom-24 right-6 z-[9999]">
            <a
              href="https://wa.me/769774444"
              target="_blank"
              rel="noopener noreferrer"
  className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-60 transition-colors duration-300 flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <Phone size={32} className="text-white" />
            </a>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
