import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Trash2 } from 'lucide-react';
import sampleBlogs from '../data/sampleBlogs';

const BlogForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    department: '',
    title: '',
    description: '',
    doctorName: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [blogPosts, setBlogPosts] = useState([]);

  const departments = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Pediatrics',
    'Oncology',
    'Dermatology',
    'Psychiatry',
    'Gynecology',
    'Urology',
    'General Medicine',
    'Surgery',
    'Radiology',
    'Anesthesia',
    'ENT',
    'Ophthalmology',
    'Dental',
    'Physiotherapy',
    'Critical Care Medicine',
    'Endocrine',
    'Nutrition and Dietetics',
    'Plastic and Reconstructive',
    'Internal Medicine',
    'Pathology',
    'Hematology',
    'Rheumatology',
    'Minimally Invasive',
  ];

   // Load blog posts when component mounts
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
    // Check if we need to reset the blog data (e.g., if image paths are incorrect)
    const needsReset = storedBlogs.length > 0 && storedBlogs.some(blog => 
      blog.image && !blog.image.startsWith('/') && !blog.image.startsWith('data:image')
    );
    
    if (storedBlogs.length === 0 || needsReset) {
      // Initialize with sample blogs with correct image paths
      const formattedSampleBlogs = sampleBlogs.map(blog => ({
        ...blog,
        image: blog.image.startsWith('/') ? blog.image : `/${blog.image}`
      }));
      localStorage.setItem('blogPosts', JSON.stringify(formattedSampleBlogs));
      setBlogPosts(formattedSampleBlogs);
    } else {
      setBlogPosts(storedBlogs);
    }
  }, []);

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing blogs from localStorage or initialize with empty array
    const existingBlogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
    // Create new blog post with unique ID
    const newBlog = {
      id: Date.now(), // Use timestamp as unique ID
      title: formData.title,
      description: formData.description,
      image: formData.image,
      department: formData.department, // Keep as department
      date: formData.date,
      doctorName: formData.doctorName, // Keep as doctorName
      excerpt: formData.description.length > 150 
        ? formData.description.substring(0, 150) + '...' 
        : formData.description,
      readTime: `${Math.ceil(formData.description.split(' ').length / 200)} min read`
    };
    
    // Add new blog to existing blogs
    const updatedBlogs = [newBlog, ...existingBlogs];
    
    // Save to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
    
    // Update local state
    setBlogPosts(updatedBlogs);
    
    // Reset form
    setFormData({
      image: '',
      department: '',
      title: '',
      description: '',
      doctorName: '',
      date: new Date().toISOString().split('T')[0],
    });
    
    alert('Blog post created successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      const updatedBlogs = blogPosts.filter(blog => blog.id !== id);
      localStorage.setItem('blogPosts', JSON.stringify(updatedBlogs));
      setBlogPosts(updatedBlogs);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#02d72] mb-6 text-center">Create New Blog Post</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blog Image
            </label>
            <div className="flex items-center space-x-6">
              <div className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-30 rounded-lg overflow-hidden">
                {formData.image ? (
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No image</span>
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#002d72] file:text-white
                    hover:file:bg-[#001d52]"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Upload an image for your blog post
                </p>
              </div>
            </div>
          </div>

          {/* Department */}
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]"
            >
              <option value="">Select Department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]"
            />
          </div>

          {/* Title */}
          <div className="md:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]"
            />
          </div>

          {/* Doctor Name */}
          <div>
            <label htmlFor="doctorName" className="block text-sm font-medium text-gray-700 mb-2">
              Doctor Name
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleChange}
              required
              placeholder="Enter doctor's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37]"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Blog Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={8}
              placeholder="Write your blog content here... You can use paragraphs, lists, and other formatting by using Markdown or plain text."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#d4af37] focus:border-[#d4af37] font-sans text-gray-700 leading-relaxed"
              style={{ whiteSpace: 'pre-wrap' }}
            />
            <p className="mt-1 text-xs text-gray-500">Use line breaks and paragraphs to format your content. You can format text with Markdown-like syntax:</p>
            <ul className="mt-1 text-xs text-gray-500 list-disc list-inside ml-2">
              <li>For headings: Start a line with # (H1), ## (H2), or ### (H3)</li>
              <li>For bold text: Wrap text with ** (e.g., **bold text**)</li>
              <li>Use line breaks to separate paragraphs</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-[#002d72] text-white rounded-md hover:bg-[#001d52] transition-colors duration-300 font-medium"
          >
            Create Blog Post
          </button>
        </div>
      </form>

      {/* Display existing blog posts with delete option */}
      <div className="mt-12 border-t pt-8">
        <h3 className="text-xl font-bold text-[#02d72] mb-6">Manage Existing Blog Posts</h3>
        {blogPosts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No blog posts found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#02d72] text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Title</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-left">Doctor</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 max-w-xs truncate">{post.title}</td>
                    <td className="py-3 px-4">{post.department}</td>
                    <td className="py-3 px-4">{post.doctorName}</td>
                    <td className="py-3 px-4">{post.date}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        title="Delete blog post"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogForm;
