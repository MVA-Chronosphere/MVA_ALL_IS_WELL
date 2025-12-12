/**
 * Utility functions to map between user-friendly page names and internal paths
 */

// Define a mapping between route paths and user-friendly names
const pageNameMap = {
  "/": "Home Page",
  "/about": "About Us",
  "/ambulance": "Ambulance Service",
  "/care-center": "Care Center",
  "/find-doctor": "Find a Doctor",
  "/academics": "Academics",
  "/blog": "Blog",
  "/blog/login": "Blog Login",
  "/articles": "Articles",
  "/community-services": "Community Services",
  "/contact-us": "Contact Us",
  "/certification": "Certification",
  "/branches": "Branches",
  "/privacy": "Privacy Policy",
  "/terms": "Terms of Service",
  "/careers": "Careers",
  "/seo-management": "SEO Management",
  // Branch routes
  "/branches/shahpur": "Shahpur Branch",
  "/branches/khandwa": "Khandwa Branch",
  "/branches/burhanpur-clinic": "Burhanpur Clinic",
  "/branches/sanawad": "Sanawad Branch",
  "/branches/raver": "Raver Branch",
  "/branches/khargone": "Khargone Branch",
  "/branches/burhanpur": "Burhanpur Branch",
  "/branches/phopnar": "Phopnar Branch",
  "/branches/dharni": "Dharni Branch",
  // Care center service routes
  "/care-center/neuro-spine-surgery": "Neuro Spine Surgery",
  "/care-center/cardiology": "Cardiology",
  "/care-center/cardio-thoracic-surgery": "Cardio Thoracic Surgery",
  "/care-center/plastic-surgery": "Plastic Surgery",
  "/care-center/urology": "Urology",
  "/care-center/oncology": "Oncology",
  "/care-center/gastroenterology": "Gastroenterology",
  "/care-center/endocrinology": "Endocrinology",
  "/care-center/rheumatology": "Rheumatology",
  "/care-center/radiology": "Radiology",
  "/care-center/blood-bank": "Blood Bank",
  "/care-center/physiotherapy": "Physiotherapy",
  "/care-center/yoga": "Yoga",
  "/care-center/nutrition-and-diet": "Nutrition and Diet",
  "/care-center/general-medicine": "General Medicine",
  "/care-center/internal-medicine": "Internal Medicine",
  "/care-center/ent": "ENT",
  "/care-center/ophthalmology": "Ophthalmology",
  "/care-center/dental": "Dental",
  "/care-center/obstetrics-and-gynaecology": "Obstetrics and Gynaecology",
  "/care-center/pediatrics-and-neonatology": "Pediatrics and Neonatology",
  "/care-center/orthopaedics": "Orthopaedics",
  "/care-center/anaesthesia": "Anaesthesia",
  "/care-center/critical-care": "Critical Care",
  "/care-center/general-and-minimal-invasive-surgery": "General and Minimal Invasive Surgery"
};

/**
 * Get a user-friendly name for a page path
 * @param {string} path - The internal page path
 * @returns {string} - The user-friendly page name
 */
export function getPageNameFromPath(path) {
  if (!path) return "Unknown Page";
  return pageNameMap[path] || path; // Return the mapped name or the path itself if not found
}

/**
 * Get the internal path from a user-friendly name
 * @param {string} name - The user-friendly page name
 * @returns {string} - The internal page path
 */
export function getPathFromPageName(name) {
  // Find the path that corresponds to this name
  for (const [path, pageName] of Object.entries(pageNameMap)) {
    if (pageName === name) {
      return path;
    }
  }
  // If we can't find an exact match, return the name as is (assuming it's already a path)
  return name;
}

/**
 * Get all available page names and paths
 * @returns {Array} - Array of objects with name and path properties
 */
export function getAllPageNamesAndPaths() {
  return Object.entries(pageNameMap).map(([path, name]) => ({
    name,
    path
  }));
}

/**
 * Generate a user-friendly name for paths that aren't in our predefined map
 * @param {string} path - The internal page path
 * @returns {string} - A generated user-friendly name
 */
export function generateFriendlyName(path) {
  if (!path) return "Unknown Page";
  
  // Remove leading slash and split by slashes
  const parts = path.replace(/^\//, '').split('/');
  
  // Convert kebab-case to title case
  const processedParts = parts.map(part => {
    return part
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  });
  
  // Join with spaces or " / " for nested paths
  return processedParts.join(' / ');
}
