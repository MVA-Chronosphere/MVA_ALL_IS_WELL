import React from 'react';
import { Home, BarChart3, LogOut, FileText, Image } from 'lucide-react';
import SeoImage from './SeoImage';

const Sidebar = ({ isOpen, onClose, onLogout, activeTab, setActiveTab }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', key: 'dashboard', active: activeTab === 'dashboard' },
    { icon: FileText, label: 'Page SEO', key: 'pages', active: activeTab === 'pages' },
    { icon: Image, label: 'Image Alt Text', key: 'images', active: activeTab === 'images' },

  ];

  const handleItemClick = (key) => {
    if (setActiveTab) {
      setActiveTab(key);
    }
    // Close sidebar on mobile after clicking
    onClose();
  };

 return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:shadow-none lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <SeoImage src="/favicon.webp" alt="AIW Logo" className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-80">Admin</span>
            </div>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleItemClick(item.key)}
                    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      item.active
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
