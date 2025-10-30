import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, X } from "lucide-react";
import sampleBlogs from "../data/sampleBlogs";

const ArticlePage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogPosts')) || [];
    // If no blogs in localStorage, use sample blogs as fallback
    let blogsToUse = storedBlogs.length > 0 ? storedBlogs : sampleBlogs;
    // Ensure all blog posts have correct image paths (for sample blogs specifically)
    blogsToUse = blogsToUse.map(blog => ({
      ...blog,
      image: blog.image.startsWith('/') ? blog.image : `/${blog.image}`
    }));
    // Sort by date to show most recent first
    const sortedBlogs = blogsToUse.sort((a, b) => new Date(b.date) - new Date(a.date));
    setBlogPosts(sortedBlogs);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const closeModal = () => {
    setSelectedBlog(null);
  };

  return (
    <motion.section
      className="py-16 bg-gray-50 min-h-screen"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#02d72] leading-tight">
            All Health Awareness Articles
          </h2>
          <div className="w-16 h-1 bg-[#d4af37] mx-auto mt-4 rounded"></div>
          <p className="text-lg text-[#44] mt-4 max-w-2xl mx-auto">
            Explore our comprehensive collection of health tips, medical insights, and awareness articles
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#d4af37] text-[#002d72] text-xs font-medium px-2 py-1 rounded">
                      {post.department}
                    </span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#002d72] mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{post.doctorName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleReadMore(post)}
                    className="mt-4 text-[#002d72] hover:text-[#d4af37] font-medium flex items-center gap-1 transition-colors duration-300"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No articles available at the moment.</p>
          </div>
        )}

        {/* Back to Home Button */}
        <div className="text-center mt-12">
          <a 
            href="/"
            className="inline-block bg-[#01d52] text-white px-8 py-3 rounded-md hover:bg-[#001d52] transition-colors duration-300 font-medium"
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Modal for full blog view */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-10"
            >
              <X size={20} />
            </button>
            <div className="p-8 pt-12">
              <img 
                src={selectedBlog.image} 
                alt={selectedBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <div className="flex items-center gap-4 mb-4 text-gray-600">
                <span className="bg-[#d4af37] text-[#002d72] text-sm font-medium px-3 py-1 rounded">
                  {selectedBlog.department}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <Calendar size={16} />
                  <span>{selectedBlog.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock size={16} />
                  <span>{selectedBlog.readTime}</span>
                </div>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#002d72] mb-4">{selectedBlog.title}</h2>
              <div className="flex items-center gap-2 mb-6 text-gray-600">
                <User size={16} />
                <span>{selectedBlog.doctorName}</span>
              </div>
              <div className="text-gray-70 leading-relaxed blog-content">
                {selectedBlog.description && selectedBlog.description.split('\n').map((paragraph, index) => {
                  // Check if the paragraph is a heading (starts with #)
                  if (paragraph.trim().startsWith('#')) {
                    const headingLevel = paragraph.trim().match(/^#+/)[0].length;
                    const headingText = paragraph.trim().substring(headingLevel).trim();
                    
                    if (headingLevel === 1) {
                      return <h1 key={index} className="text-2xl font-bold text-[#002d72] mt-6 mb-4">{headingText}</h1>;
                    } else if (headingLevel === 2) {
                      return <h2 key={index} className="text-xl font-bold text-[#002d72] mt-5 mb-3">{headingText}</h2>;
                    } else if (headingLevel === 3) {
                      return <h3 key={index} className="text-lg font-bold text-[#002d72] mt-4 mb-2">{headingText}</h3>;
                    } else {
                      return <h4 key={index} className="text-base font-bold text-[#002d72] mt-3 mb-2">{headingText}</h4>;
                    }
                  } else {
                    // Process bold formatting (text between **)
                    const processedParagraph = paragraph.split('**').map((part, i) => {
                      if (i % 2 === 1) { // Odd indices are the bold parts
                        return <strong key={i}>{part}</strong>;
                      } else {
                        return part;
                      }
                    });
                    
                    // Only render paragraph if it's not empty after trimming
                    if (paragraph.trim() !== '') {
                      return <p key={index} className="mb-4">{processedParagraph}</p>;
                    } else {
                      return <br key={index} />;
                    }
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default ArticlePage;
