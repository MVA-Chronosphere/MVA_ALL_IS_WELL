async function safeJsonFetch(url, options = {}) {
  const res = await fetch(url, options);

  const text = await res.text();

  if (!text.trim()) {
    throw new Error(`Empty JSON response (status ${res.status})`);
  }

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    console.error("Invalid JSON received:", text);
    throw new Error("Server returned invalid JSON");
  }

  if (!res.ok || !data.success) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAdmin } from '../contexts/AdminContext';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import appRoutes from "../routesConfig";
import {
  Save,
 X,
  Edit3,
  Trash2,
  Plus,
  Search,
  FileText,
  Image,
  // LogOut,
  // Home,
  // BarChart3,
  // Settings,
  // Users,
  // Shield
} from 'lucide-react';
import { getPageNameFromPath, getPathFromPageName, getAllPageNamesAndPaths } from '../utils/pageNameMapper';

const SeoManagementPage = () => {
  const { isAuthenticated, login, logout } = useAdmin();
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [seoData, setSeoData] = useState([]);
  const [currentPageData, setCurrentPageData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPageData, setNewPageData] = useState({
    page_url: '',
    title: '',
    description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: ''
  });

  const [imageAltData, setImageAltData] = useState([]);
  const [currentImageData, setCurrentImageData] = useState(null);
  const [isImageEditing, setIsImageEditing] = useState(false);
  const [newImageData, setNewImageData] = useState({
    image_path: '',
    alt_text: '',
    page_url: ''
  });
 const [selectedPageForImages, setSelectedPageForImages] = useState(''); // For filtering images by page

  const [activeTab, setActiveTab] = useState('pages');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to get all images from public folder
  const getAllImages = () => {
    const images = [
      // Hero images
      '/aiwlogo.webp', '/favicon.webp', '/hero/ctscan.webp', '/hero/fullhospital.webp',
      '/hero/hero1.webp', '/hero/hospital2.webp', '/hero/hospitaldesign.webp',
      '/hero/images (2).webp', '/hero/images (3).webp', '/hero/Untitled-design-2-1.webp',
      '/hero/ward.webp',

      // Banner images
      '/banners/Ambulance.webp', '/banners/pathology1.webp', '/banners/poster 06.jpg',
      '/banners/ALL IS WELL WEB SITE SLIDER/anaesthesia.webp', '/banners/ALL IS WELL WEB SITE SLIDER/bloodbank.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/Cardiology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/cardiovascular thoracic surgery.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/criticalcaremedicine.webp', '/banners/ALL IS WELL WEB SITE SLIDER/dental.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/dermatology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/ear nose throat.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/endocrionology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/gastroenterology.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/general and minimal invasive surgery.webp', '/banners/ALL IS WELL WEB SITE SLIDER/general medicine.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/hematology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/internal medicine.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/neuro and spine surgery.webp', '/banners/ALL IS WELL WEB SITE SLIDER/nutrition and dietetics.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/obstetrics and gynaecology .webp', '/banners/ALL IS WELL WEB SITE SLIDER/oncology.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/ophthalmology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/orthopedics treatment.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/pathology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/pediatrics and neonatology.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/Physiotherapy.webp', '/banners/ALL IS WELL WEB SITE SLIDER/plastic and reconstructive surgery.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/psychiatry.webp', '/banners/ALL IS WELL WEB SITE SLIDER/radiology.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/rheumatology.webp', '/banners/ALL IS WELL WEB SITE SLIDER/urology treatment.webp',
      '/banners/ALL IS WELL WEB SITE SLIDER/yoga.webp',

      // Blog pictures
      '/blogpictures/Diabetics.webp', '/blogpictures/heart-attack.webp', '/blogpictures/hearthealth.webp',
      '/blogpictures/lung-cancer.webp', '/blogpictures/Mentalhealth.webp', '/blogpictures/rirs-surgery.webp',

      // Board photos
      '/board/Anand.webp', '/board/antra.webp', '/board/devanshi.webp', '/board/kabir.webp',
      '/board/Manjusha.webp', '/board/sudhir.webp', '/board/vandana.webp',

      // Branch images
      '/branches/burhanpur1.webp', '/branches/burhanpur/burhanpur2.webp', '/branches/burhanpur/burhanpur3.webp',
      '/branches/burhanpur/burhanpur4.webp', '/branches/burhanpur5.webp', '/branches/burhanpur/burhanpur6.webp',
      '/branches/khandwa/khandwa.webp', '/branches/khandwa/khandwa2.webp', '/branches/khandwa/khandwa3.webp',
      '/branches/khandwa/khandwa4.webp', '/branches/khandwa/khandwa5.webp', '/branches/khandwa/khandwa6.webp',
      '/branches/khargone/khandwa.webp', '/branches/khargone/khandwa2.webp', '/branches/khargone/khandwa3.webp',
      '/branches/raver/Raver-branch-1.webp', '/branches/raver/Raver-branch-2.webp',

      // Certifications
      '/certifications/All_Is_Well_NABH_Accreditation_Certificate_page-0001-scaled.webp', '/certifications/iso.webp',

      // Community services
      '/communityservices/330934941_865962471367476_5018432288634109443_n-1024x1024.jpeg.webp',
      '/communityservices/330941103_1580887842428734_8903430292073243943_n-1024x1024.jpeg.webp',
      '/communityservices/330945369_1208522899858442_8304335926398024432_n-1024x1024.jpeg.webp',
      '/communityservices/331086183_919352345914820_2960017118414465069_n-1024x1024.jpeg.webp',
      '/communityservices/331261848_557581206123070_8843499313221369819_n-1024x1024.jpeg.webp',
      '/communityservices/331425071_2631357037007338_942055288915635013_n-1024x1024.jpeg.webp',
      '/communityservices/331483536_6357505054346_3983224724032833577_n-1024x1024.jpeg.webp',
      '/communityservices/33192611_6363931360293352_2698312750667445616_n.webp',
      '/communityservices/331965458_596584848982910_8765282251137080891_n-1024x1020.jpeg.webp',
      '/communityservices/331965844_606859374114554_2486436966221738891_n.webp',
      '/communityservices/331999496_3466378573640344_26163574321371211_n.webp',
      '/communityservices/332068602_164579709716282_754478678462936726_n.webp',
      '/communityservices/332125403_1120667635438191_8542664816306706355_n.webp',
      '/communityservices/332127918_1337040323506156_3060006935016051152_n.webp',
      '/communityservices/332183766_1174784643400225_7373997800539611826_n.webp',
      '/communityservices/332240319_5952910854824635_1613501519464211319_n.webp',
      '/communityservices/332289275_6143262212400608_2064672885156677701_n.webp',
      '/communityservices/333025608_160952936767569_5041046787253676136_n.webp',
      '/communityservices/Camp1-1-1024x768.webp', '/communityservices/Camp2-1-1024x768.webp',
      '/communityservices/Camp5-1-1-1024x461.webp', '/communityservices/Camp5-2-1024x768.webp',
      '/communityservices/Camp6-1-1024x461.webp', '/communityservices/Camp7-1-1024x461.webp',
      '/communityservices/Camp8-1-1024x768.webp', '/communityservices/Camp9-1-1024x768.webp',
      '/communityservices/Camp10-1-1024x576.webp', '/communityservices/Camp11-1-1024x768.webp',

      // Doctor photos
      '/Doctorphotos/26.webp', '/Doctorphotos/27.webp', '/Doctorphotos/28.webp',
      '/Doctorphotos/Amruta.webp', '/Doctorphotos/Anita Chouksey.webp', '/Doctorphotos/Apurva Yadav.webp',
      '/Doctorphotos/Bashiruddin Sir.webp', '/Doctorphotos/Bhushan Sir.webp', '/Doctorphotos/Dr_Abhishek_Sharma.webp',
      '/Doctorphotos/Dr_Ankit_Atneriya.webp', '/Doctorphotos/Dr_Chimu_chinte_chopde.webp',
      '/Doctorphotos/Dr_Deepak_Kumar_Bhojwani.webp', '/Doctorphotos/Dr_Divyesh_Lad.webp',
      '/Doctorphotos/Dr_Gaurav_Singh_Pardesi.webp', '/Doctorphotos/Dr_Harshada_Bhangale.webp',
      '/Doctorphotos/Dr_Hiteshi.webp', '/Doctorphotos/Dr_Jayesh_Brijbhushan_Dubey.webp',
      '/Doctorphotos/Dr_Lokendra_Singh_Thakur.webp', '/Doctorphotos/Dr_Nikita_Andhalkar_Bagul.webp',
      '/Doctorphotos/Dr_Prashant_Khairnar.webp', '/Doctorphotos/Dr_Pravin_R._Borde.webp',
      '/Doctorphotos/Dr_Rahul_Chandrakant_Khandekar.webp', '/Doctorphotos/Dr_Ravnik_R._Bansod.webp',
      '/Doctorphotos/Dr_Rupali _Marathe.webp', '/Doctorphotos/Dr_Shweta_Narwade.webp',
      '/Doctorphotos/Dr_Tanishk_Shroff.webp', '/Doctorphotos/Dr_Yash_Mahajan.webp',
      '/Doctorphotos/Dr. Abhey Joshi .png', '/Doctorphotos/KIMAYA SALI MEDSHIKAR.webp',
      '/Doctorphotos/Monish Sir.webp', '/Doctorphotos/Nazma Maam.webp', '/Doctorphotos/Nikhil Sir.webp',
      '/Doctorphotos/Peeyush Sir.webp', '/Doctorphotos/Rakesh Mahawar.webp', '/Doctorphotos/Rashi Gupta.webp',
      '/Doctorphotos/Shubham Sir.webp',

      // Service images
      '/Serviceimages/anesthesia.webp', '/Serviceimages/blood_bank_components.webp',
      '/Serviceimages/Cardiology.webp', '/Serviceimages/Cardiovascular.webp',
      '/Serviceimages/critical_care_medicine.webp', '/Serviceimages/dental_services.webp',
      '/Serviceimages/dermatology.webp', '/Serviceimages/endocrine.webp',
      '/Serviceimages/ent_hospital_examination.webp', '/Serviceimages/gas.webp',
      '/Serviceimages/general and minimal.webp', '/Serviceimages/general medicine.webp',
      '/Serviceimages/hematology.webp', '/Serviceimages/internal medicine.webp',
      '/Serviceimages/Neuro and spine surgery.webp', '/Serviceimages/nutrition_and_dietetics.webp',
      '/Serviceimages/obstetrics and gynaecology.webp', '/Serviceimages/oncology.webp',
      '/Serviceimages/ophthalmology.webp', '/Serviceimages/orthopedics.webp',
      '/Serviceimages/pathology.webp', '/Serviceimages/pediatrics_neonatology.webp',
      '/Serviceimages/physiotherapy.webp', '/Serviceimages/plastic and reconstructive.webp',
      '/Serviceimages/psychiatry.webp', '/Serviceimages/radiology and imaging.webp',
      '/Serviceimages/radiology_and_imaging.webp', '/Serviceimages/rheumatology.webp',
      '/Serviceimages/urology.webp', '/Serviceimages/yoga.webp',

      // Why section
      '/whysection/Mri.png', '/whysection/pathology.webp', '/whysection/patient.webp',
      '/whysection/team.jpg',

      // Placeholders
      '/placeholders/doctor-placeholder.webp'
    ];

    return images;
  };

  // Load SEO data from API
 const loadSeoData = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php?action=all`);
      
      const responseText = await response.text();
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Invalid JSON received:", responseText);
        throw new Error("Server returned invalid JSON");
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.message || `Request failed (${response.status})`);
      }

      setSeoData(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error loading SEO data:", error);
      toast.error(error.message || error.toString());
    }
 };


  // Load image alt data from API
  const loadImageAltData = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php?action=image-alt`);
      
      const responseText = await response.text();
      
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Invalid JSON received:", responseText);
        throw new Error("Server returned invalid JSON");
      }

      if (!response.ok || !data.success) {
        throw new Error(data?.message || `Request failed (${response.status})`);
      }

      setImageAltData(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Error loading image alt data:", error);
      toast.error(error.message || error.toString());
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      loadSeoData();
      loadImageAltData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await safeJsonFetch(
        `${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginForm),
        }
      );

      login({ username: loginForm.username });
      toast.success('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed: ' + error.message);
    }
 };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
  };

  const handlePageEdit = (pageData) => {
    setCurrentPageData(pageData);
    setNewPageData({ ...pageData });
    setIsEditing(true);
  };

  const handlePageSave = async () => {
    try {
      const data = await safeJsonFetch(
        `${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=seo`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPageData),
        }
      );

      toast.success(data.message || "SEO saved!");
      setIsEditing(false);
      loadSeoData();
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast.error('Error saving SEO data: ' + error.message);
    }
 };

  const handlePageDelete = async (pageUrl) => {
    if (!window.confirm(`Are you sure you want to delete SEO data for ${pageUrl}?`)) return;

    try {
      const data = await safeJsonFetch(
        `${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=seo`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page_url: pageUrl }),
        }
      );

      toast.success(data.message || "Deleted!");
      loadSeoData();
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      toast.error('Error deleting SEO data: ' + error.message);
    }
 };

  const handleImageEdit = (imageData) => {
    setCurrentImageData(imageData);
    setNewImageData({ ...imageData });
    setIsImageEditing(true);
  };

  const handleImageSave = async () => {
    try {
      const data = await safeJsonFetch(
        `${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=image-alt`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newImageData),
        }
      );

      toast.success(data.message || "Image alt updated!");
      setIsImageEditing(false);
      loadImageAltData();
    } catch (error) {
      console.error('Error saving image alt text:', error);
      toast.error('Error saving image alt text: ' + error.message);
    }
 };

  const handleImageDelete = async (imagePath) => {
    if (!window.confirm(`Are you sure you want to delete alt text for ${imagePath}?`)) return;

    try {
      const data = await safeJsonFetch(
        `${import.meta.env.VITE_API_BASE_URL}/seo_api.php?path=image-alt`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_path: imagePath }),
        }
      );

      toast.success(data.message || "Deleted!");
      loadImageAltData();
    } catch (error) {
      console.error('Error deleting image alt text:', error);
      toast.error('Error deleting image alt text: ' + error.message);
    }
 };

  const handleAddNewPage = () => {
    setCurrentPageData(null);
    setNewPageData({
      page_url: '',
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      twitter_title: '',
      twitter_description: '',
      twitter_image: ''
    });
    setIsEditing(true);
  };

  const handleAddNewImage = () => {
    setCurrentImageData(null);
    setNewImageData({
      image_path: '',
      alt_text: '',
      page_url: ''
    });
    setIsImageEditing(true);
  };

  // All possible page URLs = all configured routes + existing SEO URLs
  const allPageUrls = Array.from(
    new Set(
      [
        ...appRoutes,
        ...seoData.map((item) => item.page_url || '')
      ].filter(Boolean)
    )
  );

  // Get all page names and paths for the dropdown
 const pageNamesAndPaths = getAllPageNamesAndPaths();
  // Add any additional paths that aren't in our predefined map
  const additionalPaths = allPageUrls.filter(path => 
    !pageNamesAndPaths.some(item => item.path === path)
  ).map(path => ({
    name: getPageNameFromPath(path),
    path: path
  }));
  const allPagesForDropdown = [...pageNamesAndPaths, ...additionalPaths];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Helmet>
          <title>SEO Management Login - All Is Well Hospital</title>
          <meta
            name="description"
            content="Login to the SEO management dashboard for All Is Well Hospital."
          />
        </Helmet>
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AIW</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              SEO Management Login
            </h2>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={loginForm.username}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, username: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-50"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-50"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filter data based on search term
  const lowerSearch = searchTerm.toLowerCase();

  const filteredSeoData = Array.isArray(seoData)
    ? seoData.filter((item) => {
        const pageUrl = (item.page_url || '').toLowerCase();
        const title = (item.title || '').toLowerCase();
        const description = (item.description || '').toLowerCase();
        return (
          pageUrl.includes(lowerSearch) ||
          title.includes(lowerSearch) ||
          description.includes(lowerSearch)
        );
      })
    : [];

  const filteredImageAltData = Array.isArray(imageAltData)
    ? imageAltData.filter((item) => {
        const imagePath = (item.image_path || '').toLowerCase();
        const altText = (item.alt_text || '').toLowerCase();
        const pageUrl = (item.page_url || '').toLowerCase();
        return (
          imagePath.includes(lowerSearch) ||
          altText.includes(lowerSearch) ||
          pageUrl.includes(lowerSearch)
        );
      })
    : [];

  return (
    <div className="flex h-screen bg-gray-50">
      <Helmet>
        <title>SEO Management Dashboard - All Is Well Hospital</title>
        <meta
          name="description"
          content="Manage SEO settings for All Is Well Hospital website."
        />
      </Helmet>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex-col overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          title="SEO Management Dashboard"
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search SEO data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>


            {/* DASHBOARD TAB (if you use it from Sidebar) */}
            {activeTab === 'dashboard' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Dashboard
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-blue-800">
                        Total Pages
                      </h3>
                      <p className="text-3xl font-bold text-blue-600">
                        {seoData.length}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-green-800">
                        Images with Alt Text
                      </h3>
                      <p className="text-3xl font-bold text-green-600">
                        {imageAltData.length}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-yellow-800">
                        SEO Optimized Pages
                      </h3>
                      <p className="text-3xl font-bold text-yellow-600">
                        {seoData.filter(
                          (page) => page.title && page.description
                        ).length}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium text-purple-800">
                        Total Images
                      </h3>
                      <p className="text-3xl font-bold text-purple-600">
                        {getAllImages().length}
                      </p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Recent Activity
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span>Page SEO updated: Home Page</span>
                          <span className="text-gray-500 text-sm">
                            2 hours ago
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Image alt text added: hero1.webp</span>
                          <span className="text-gray-500 text-sm">
                            5 hours ago
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>Page SEO updated: Services Page</span>
                          <span className="text-gray-500 text-sm">
                            1 day ago
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Quick Actions
                    </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => {
                        setActiveTab('pages');
                        setTimeout(() => handleAddNewPage(), 100);
                      }}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Add New Page SEO
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('images');
                        setTimeout(() => handleAddNewImage(), 100);
                      }}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Add Image Alt Text
                    </button>
                    <button
                      onClick={() => setActiveTab('pages')}
                      className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200"
                    >
                      Manage All SEO
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            )}

            {/* ANALYTICS TAB (dummy layout) */}
            {activeTab === 'analytics' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Analytics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 border rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Page Views
                      </h3>
                      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                        <p className="text-gray-500">
                          Analytics chart would appear here
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-4 border rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        SEO Performance
                      </h3>
                      <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
                        <p className="text-gray-500">
                          SEO performance chart would appear here
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Top Performing Pages
                    </h3>
                    <div className="bg-white border rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Page
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Views
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Ranking
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Home Page
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              1,234
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              1st
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              Services
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              987
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              2nd
                            </td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              About Us
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              765
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              3rd
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}




            {/* PAGES TAB */}
            {activeTab === 'pages' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Page SEO Management
                  </h2>
                  <button
                    onClick={handleAddNewPage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </button>
                </div>

                {isEditing ? (
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {currentPageData ? 'Edit Page SEO' : 'Add New Page SEO'}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="page_url"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Page Name
                        </label>
                        <select
                          id="page_url"
                          value={newPageData.page_url}
                          onChange={(e) =>
                            setNewPageData({
                              ...newPageData,
                              page_url: e.target.value
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a page</option>
                          {allPagesForDropdown.map((item) => (
                            <option key={item.path} value={item.path}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Page Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={newPageData.title}
                          onChange={(e) =>
                            setNewPageData({
                              ...newPageData,
                              title: e.target.value
                            })
                          }
                          placeholder="Page title"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Meta Description
                        </label>
                        <textarea
                          id="description"
                          value={newPageData.description}
                          onChange={(e) =>
                            setNewPageData({
                              ...newPageData,
                              description: e.target.value
                            })
                          }
                          placeholder="Meta description"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="keywords"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Meta Keywords
                        </label>
                        <input
                          type="text"
                          id="keywords"
                          value={newPageData.keywords}
                          onChange={(e) =>
                            setNewPageData({
                              ...newPageData,
                              keywords: e.target.value
                            })
                          }
                          placeholder="Comma-separated keywords"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        onClick={handlePageSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Page Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Title
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSeoData.map((page, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {getPageNameFromPath(page.page_url)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {page.title}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                              {page.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handlePageEdit(page)}
                                className="text-blue-600 hover:text-blue-90 mr-3 flex items-center"
                              >
                                <Edit3 className="h-4 w-4 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handlePageDelete(page.page_url)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredSeoData.length === 0 && (
                      <div className="text-center py-8">
                        <FileText className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No SEO data found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm
                            ? 'No results match your search.'
                            : 'Get started by adding a new page SEO.'}
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleAddNewPage}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Page SEO
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* IMAGES TAB */}
            {activeTab === 'images' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900">
                    Image Alt Text Management
                  </h2>
                  <button
                    onClick={handleAddNewImage}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </button>
                </div>

                {isImageEditing ? (
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      {currentImageData
                        ? 'Edit Image Alt Text'
                        : 'Add New Image Alt Text'}
                    </h3>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="image_page_url"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Associated Page URL
                        </label>
                        <select
                          id="image_page_url"
                          value={newImageData.page_url}
                          onChange={(e) =>
                            setNewImageData({
                              ...newImageData,
                              page_url: e.target.value
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a page (optional)</option>
                          {allPagesForDropdown.map((item) => (
                            <option key={item.path} value={item.path}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="image_path"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Image Path
                        </label>
                        <select
                          id="image_path"
                          value={newImageData.image_path}
                          onChange={(e) =>
                            setNewImageData({
                              ...newImageData,
                              image_path: e.target.value
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select an image</option>
                          {getAllImages().map((image, index) => (
                            <option key={index} value={image}>
                              {image}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="alt_text"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Alt Text
                        </label>
                        <input
                          type="text"
                          id="alt_text"
                          value={newImageData.alt_text}
                          onChange={(e) =>
                            setNewImageData({
                              ...newImageData,
                              alt_text: e.target.value
                            })
                          }
                          placeholder="Image description"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        onClick={handleImageSave}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setIsImageEditing(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <div className="mb-4">
                      <label
                        htmlFor="page_filter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Filter by Page
                      </label>
                      <select
                        id="page_filter"
                        value={selectedPageForImages}
                        onChange={(e) => setSelectedPageForImages(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">All Pages</option>
                        {allPagesForDropdown.map((item) => (
                          <option key={item.path} value={item.path}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Image Path
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Alt Text
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Associated Page
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredImageAltData
                          .filter(image => 
                            !selectedPageForImages || image.page_url === selectedPageForImages
                          )
                          .map((image, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {image.image_path}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {image.alt_text}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {image.page_url ? getPageNameFromPath(image.page_url) : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleImageEdit(image)}
                                className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
                              >
                                <Edit3 className="h-4 w-4 mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleImageDelete(image.image_path)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredImageAltData.filter(image => 
                      !selectedPageForImages || image.page_url === selectedPageForImages
                    ).length === 0 && (
                      <div className="text-center py-8">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No image alt data found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm
                            ? 'No results match your search.'
                            : selectedPageForImages
                              ? `No images found for ${getPageNameFromPath(selectedPageForImages)}`
                              : 'Get started by adding a new image alt text.'}
                        </p>
                        <div className="mt-6">
                          <button
                            onClick={handleAddNewImage}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Image Alt Text
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SeoManagementPage;
