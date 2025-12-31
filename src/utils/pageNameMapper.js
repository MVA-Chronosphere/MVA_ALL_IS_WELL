/**
 * Utility functions to map between user-friendly page names and internal paths
 */

/* ===============================
   NORMALIZE PATH (MATCH BACKEND)
================================ */
function normalizePath(path) {
  if (!path) return "/";

  let p = decodeURIComponent(path).trim();

  if (p === "" || p === "/") return "/";

  if (!p.startsWith("/")) p = "/" + p;

  if (p.length > 1) p = p.replace(/\/+$/, "");

  return p;
}

/* ===============================
   PATH → NAME MAP
================================ */
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

  "/branches/shahpur": "Shahpur Branch",
  "/branches/khandwa": "Khandwa Branch",
  "/branches/burhanpur-clinic": "Burhanpur Clinic",
  "/branches/sanawad": "Sanawad Branch",
  "/branches/raver": "Raver Branch",
  "/branches/khargone": "Khargone Branch",
  "/branches/burhanpur": "Burhanpur Branch",
  "/branches/phopnar": "Phopnar Branch",
  "/branches/dharni": "Dharni Branch",

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
  "/care-center/general-and-minimal-invasive-surgery":
    "General and Minimal Invasive Surgery"
};

/* ===============================
   NAME → PATH MAP (FAST LOOKUP)
================================ */
const nameToPathMap = Object.entries(pageNameMap).reduce(
  (acc, [path, name]) => {
    acc[name] = path;
    return acc;
  },
  {}
);

/* ===============================
   API FUNCTIONS
================================ */

/**
 * Get a user-friendly name for a page path
 */
export function getPageNameFromPath(path) {
  const normalized = normalizePath(path);

  return (
    pageNameMap[normalized] ||
    generateFriendlyName(normalized)
  );
}

/**
 * Get the internal path from a user-friendly name
 */
export function getPathFromPageName(name) {
  return nameToPathMap[name] || normalizePath(name);
}

/**
 * Get all available page names and paths
 */
export function getAllPageNamesAndPaths() {
  return Object.entries(pageNameMap).map(([path, name]) => ({
    name,
    path
  }));
}

/**
 * Generate a user-friendly name for unknown paths
 */
export function generateFriendlyName(path) {
  if (!path || path === "/") return "Home Page";

  const parts = path.replace(/^\//, "").split("/");

  return parts
    .map(part =>
      part
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
    .join(" / ");
}
