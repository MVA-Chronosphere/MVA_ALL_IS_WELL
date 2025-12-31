import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to generate sitemap
async function generateSitemap() {
  try {
    // Get the current date for lastmod
    const today = new Date().toISOString().split('T')[0];
    
    // Define the static URLs for the hospital website
    const urls = [
      { path: '/', priority: '1.0', changefreq: 'daily' },
      { path: '/about', priority: '0.9', changefreq: 'weekly' },
      { path: '/find-doctor', priority: '0.9', changefreq: 'weekly' },
      { path: '/care-center', priority: '0.9', changefreq: 'weekly' },
      { path: '/care-center/neuro-spine-surgery', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/cardiology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/cardio-thoracic-surgery', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/plastic-surgery', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/urology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/oncology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/gastroenterology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/endocrinology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/rheumatology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/radiology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/critical-care', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/anaesthesia', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/general-and-minimal-invasive-surgery', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/general-medicine', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/internal-medicine', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/obstetrics-and-gynaecology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/orthopaedics', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/pathology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/blood-bank', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/ent', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/ophthalmology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/dermatology', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/psychiatry', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/dental', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/yoga', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/physiotherapy', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/nutrition-and-diet', priority: '0.8', changefreq: 'weekly' },
      { path: '/care-center/pediatrics-and-neonatology', priority: '0.8', changefreq: 'weekly' },
      { path: '/academics', priority: '0.7', changefreq: 'monthly' },
      { path: '/community-services', priority: '0.7', changefreq: 'monthly' },
      { path: '/contact-us', priority: '0.8', changefreq: 'monthly' },
      { path: '/certification', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches', priority: '0.8', changefreq: 'weekly' },
      { path: '/branches/shahpur', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/khandwa', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/burhanpur-clinic', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/sanawad', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/raver', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/khargone', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/burhanpur', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/phopnar', priority: '0.7', changefreq: 'monthly' },
      { path: '/branches/dharni', priority: '0.7', changefreq: 'monthly' },
      { path: '/privacy', priority: '0.6', changefreq: 'yearly' },
      { path: '/terms', priority: '0.6', changefreq: 'yearly' },
      { path: '/careers', priority: '0.7', changefreq: 'monthly' },
      { path: '/ambulance', priority: '0.9', changefreq: 'weekly' },
    ];

    // Generate the sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

    urls.forEach(url => {
      sitemap += `  <url>
    <loc>https://www.alliswellhospital.in${url.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
  </url>
`;
    });

    sitemap += '</urlset>';

    // Write the sitemap to the public directory
    const publicDir = path.join(__dirname, '../public');
    await fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap);
    
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Run the function
generateSitemap();
