import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import './SeoEditor.css';

const SeoEditor = ({ pageUrl, initialSeoData, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    og_title: '',
    og_description: '',
    og_image: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    ...initialSeoData
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setSeoData({
      title: '',
      description: '',
      keywords: '',
      og_title: '',
      og_description: '',
      og_image: '',
      twitter_title: '',
      twitter_description: '',
      twitter_image: '',
      ...initialSeoData
    });
  }, [initialSeoData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Send SEO data to backend API
      const response = await fetch('/seo_backend/seo_api.php/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_url: pageUrl,
          ...seoData
        })
      });
      
      const result = await response.json();
      if (result.success) {
        alert('SEO data saved successfully!');
        setIsEditing(false);
        if (onUpdate) onUpdate(seoData);
      } else {
        alert('Error saving SEO data: ' + result.message);
      }
    } catch (error) {
      console.error('Error saving SEO data:', error);
      alert('Error saving SEO data: ' + error.message);
    }
  };

  const toggleEditor = () => {
    setIsOpen(!isOpen);
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setSeoData(initialSeoData || {});
    setIsEditing(false);
  };

  return (
    <div className="seo-editor-container">
      <button className="seo-toggle-btn" onClick={toggleEditor}>
        {isOpen ? 'Hide SEO Editor' : 'Edit SEO'}
      </button>
      
      {isOpen && (
        <div className="seo-editor-panel">
          <h3>SEO Settings for {pageUrl}</h3>
          
          {isEditing ? (
            <div className="seo-edit-form">
              <div className="form-group">
                <label htmlFor="title">Page Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={seoData.title}
                  onChange={handleChange}
                  placeholder="Enter page title"
                />
                <small>Recommended: Under 60 characters</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Meta Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={seoData.description}
                  onChange={handleChange}
                  placeholder="Enter meta description"
                  rows="3"
                ></textarea>
                <small>Recommended: Under 160 characters</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="keywords">Meta Keywords:</label>
                <input
                  type="text"
                  id="keywords"
                  name="keywords"
                  value={seoData.keywords}
                  onChange={handleChange}
                  placeholder="Enter keywords separated by commas"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="og_title">Open Graph Title:</label>
                <input
                  type="text"
                  id="og_title"
                  name="og_title"
                  value={seoData.og_title}
                  onChange={handleChange}
                  placeholder="Enter Open Graph title"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="og_description">Open Graph Description:</label>
                <textarea
                  id="og_description"
                  name="og_description"
                  value={seoData.og_description}
                  onChange={handleChange}
                  placeholder="Enter Open Graph description"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="og_image">Open Graph Image:</label>
                <input
                  type="text"
                  id="og_image"
                  name="og_image"
                  value={seoData.og_image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="twitter_title">Twitter Title:</label>
                <input
                  type="text"
                  id="twitter_title"
                  name="twitter_title"
                  value={seoData.twitter_title}
                  onChange={handleChange}
                  placeholder="Enter Twitter title"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="twitter_description">Twitter Description:</label>
                <textarea
                  id="twitter_description"
                  name="twitter_description"
                  value={seoData.twitter_description}
                  onChange={handleChange}
                  placeholder="Enter Twitter description"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="twitter_image">Twitter Image:</label>
                <input
                  type="text"
                  id="twitter_image"
                  name="twitter_image"
                  value={seoData.twitter_image}
                  onChange={handleChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>Save SEO</button>
                <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="seo-preview">
              <div className="seo-info">
                <p><strong>Title:</strong> {seoData.title || 'Not set'}</p>
                <p><strong>Description:</strong> {seoData.description || 'Not set'}</p>
                <p><strong>Keywords:</strong> {seoData.keywords || 'Not set'}</p>
              </div>
              <button className="edit-btn" onClick={enableEditing}>Edit</button>
            </div>
          )}
        </div>
      )}
      
      {/* Apply SEO settings to the page */}
      <Helmet>
        <title>{seoData.title || 'All Is Well Hospital - Best Healthcare Services'}</title>
        <meta name="description" content={seoData.description || 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.'} />
        <meta name="keywords" content={seoData.keywords || 'hospital, healthcare, medical services, emergency care, cardiology, orthopedics, neurology'} />
        <meta property="og:title" content={seoData.og_title || seoData.title || 'All Is Well Hospital - Best Healthcare Services'} />
        <meta property="og:description" content={seoData.og_description || seoData.description || 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.'} />
        {seoData.og_image && <meta property="og:image" content={seoData.og_image} />}
        <meta name="twitter:title" content={seoData.twitter_title || seoData.title || 'All Is Well Hospital - Best Healthcare Services'} />
        <meta name="twitter:description" content={seoData.twitter_description || seoData.description || 'All Is Well Hospital provides comprehensive healthcare services including cardiology, orthopedics, neurology, and emergency care. Quality healthcare you can trust.'} />
        {seoData.twitter_image && <meta name="twitter:image" content={seoData.twitter_image} />}
      </Helmet>
    </div>
  );
};

export default SeoEditor;
