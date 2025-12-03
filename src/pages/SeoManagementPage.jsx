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
  LogOut,
  Home,
  BarChart3,
  Settings,
  Users,
  Shield
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('pages');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Load SEO data from API
  const loadSeoData = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/all`);
        const result = await response.json();
        if (result.success) {
          setSeoData(result.data);
        }
      } catch (error) {
        console.error('Error loading SEO data:', error);
      }
    }
  };

  // Load image alt data from API
 const loadImageAltData = async () => {
    if (isAuthenticated) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/image-alt`);
        const result = await response.json();
        if (result.success) {
          setImageAltData(result.data);
        }
      } catch (error) {
        console.error('Error loading image alt data:', error);
      }
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginForm)
      });
      const result = await response.json();
      if (result.success) {
        login({ username: loginForm.username });
        toast.success('Login successful!');
      } else {
        toast.error('Login failed: ' + result.message);
      }
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/seo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPageData)
      });
      const result = await response.json();
      if (result.success) {
        toast.success('SEO data saved successfully!');
        setIsEditing(false);
        loadSeoData(); // Refresh the data
      } else {
        toast.error('Error saving SEO data: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast.error('Error saving SEO data: ' + error.message);
    }
 };

  const handlePageDelete = async (pageUrl) => {
    if (window.confirm(`Are you sure you want to delete SEO data for ${pageUrl}?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/seo`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page_url: pageUrl })
        });
        const result = await response.json();
        if (result.success) {
          toast.success('SEO data deleted successfully!');
          loadSeoData(); // Refresh the data
        } else {
          toast.error('Error deleting SEO data: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting SEO data:', error);
        toast.error('Error deleting SEO data: ' + error.message);
      }
    }
 };

  const handleImageEdit = (imageData) => {
    setCurrentImageData(imageData);
    setNewImageData({ ...imageData });
    setIsImageEditing(true);
  };

  const handleImageSave = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/image-alt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newImageData)
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Image alt text saved successfully!');
        setIsImageEditing(false);
        loadImageAltData(); // Refresh the data
      } else {
        toast.error('Error saving image alt text: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving image alt text:', error);
      toast.error('Error saving image alt text: ' + error.message);
    }
 };

  const handleImageDelete = async (imagePath) => {
    if (window.confirm(`Are you sure you want to delete alt text for ${imagePath}?`)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/seo_api.php/image-alt`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image_path: imagePath })
        });
        const result = await response.json();
        if (result.success) {
          toast.success('Image alt text deleted successfully!');
          loadImageAltData(); // Refresh the data
        } else {
          toast.error('Error deleting image alt text: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting image alt text:', error);
        toast.error('Error deleting image alt text: ' + error.message);
      }
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

  // All possible page URLs = all configured routes + any URLs already in SEO data
  const allPageUrls = Array.from(
    new Set(
      [
        ...appRoutes,
        ...seoData.map((item) => item.page_url || '')
      ].filter(Boolean)
    )
  );

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
  const filteredSeoData = Array.isArray(seoData)
    ? seoData.filter(
        (item) =>
          item.page_url.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredImageAltData = Array.isArray(imageAltData)
    ? imageAltData.filter(
        (item) =>
          item.image_path.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.alt_text.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.page_url.toLowerCase().includes(searchTerm.toLowerCase())
      )
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

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('pages')}
                  className={`${
                    activeTab === 'pages'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-70 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Page SEO
                </button>
                <button
                  onClick={() => setActiveTab('images')}
                  className={`${
                    activeTab === 'images'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  <Image className="h-5 w-5 mr-2" />
                  Image Alt Text
                </button>
              </nav>
            </div>

            {activeTab === 'dashboard' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Dashboard
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Home className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      SEO Dashboard Overview
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Welcome to the SEO Management Dashboard. Use the
                      navigation to manage different aspects of your SEO
                      settings.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Analytics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <BarChart3 className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Analytics Dashboard
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Analytics functionality coming soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Settings
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Settings className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      SEO Settings
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Settings functionality coming soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Users</h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Users className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      User Management
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      User management functionality coming soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">
                    Security
                  </h2>
                </div>
                <div className="p-6">
                  <div className="text-center py-8">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Shield className="h-12 w-12 mx-auto" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Security Settings
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Security settings functionality coming soon.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                          Page URL
                        </label>
                        <select
                          id="page_url"
                          value={newPageData.page_url}
                          onChange={(e) =>
                            setNewPageData({
                              ...newPageData,
                              page_url: e.target.value,
                            })
                          }
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a page URL</option>
                          {allPageUrls.map((url) => (
                            <option key={url} value={url}>
                              {url}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-70 mb-1"
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
                              title: e.target.value,
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
                              description: e.target.value,
                            })
                          }
                          placeholder="Meta description"
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
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
                              keywords: e.target.value,
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
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Page URL
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSeoData.map((page, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {page.page_url}
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
                                className="text-blue-600 hover:text-blue-900 mr-3 flex items-center"
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
                          htmlFor="image_path"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Image Path
                        </label>
                        <input
                          type="text"
                          id="image_path"
                          value={newImageData.image_path}
                          onChange={(e) =>
                            setNewImageData({
                              ...newImageData,
                              image_path: e.target.value,
                            })
                          }
                          placeholder="/path/to/image.jpg"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
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
                              alt_text: e.target.value,
                            })
                          }
                          placeholder="Image description"
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="image_page_url"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Associated Page URL
                        </label>
                        <input
                          type="text"
                          id="image_page_url"
                          value={newImageData.page_url}
                          onChange={(e) =>
                            setNewImageData({
                              ...newImageData,
                              page_url: e.target.value,
                            })
                          }
                          placeholder="/page-url"
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
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Image Path
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Alt Text
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Associated Page
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredImageAltData.map((image, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {image.image_path}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {image.alt_text}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {image.page_url || 'N/A'}
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
                    {filteredImageAltData.length === 0 && (
                      <div className="text-center py-8">
                        <Image className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">
                          No image alt data found
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {searchTerm
                            ? 'No results match your search.'
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
