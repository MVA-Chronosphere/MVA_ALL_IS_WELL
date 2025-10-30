import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Function to recursively get all image files
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
      fileList.push(filePath);
    }
 });
  
  return fileList;
}

// Function to convert images to WebP using sharp
async function convertToWebP() {
  console.log('Starting image conversion to WebP format using Sharp...');
  
  // Get all image files
  const imageFiles = getAllImageFiles('./public');
  console.log(`Found ${imageFiles.length} images to convert`);
  
  for (const imagePath of imageFiles) {
    try {
      const outputDir = path.dirname(imagePath);
      const fileName = path.basename(imagePath, path.extname(imagePath));
      const webpPath = path.join(outputDir, `${fileName}.webp`);
      
      // Convert image to WebP using sharp
      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(webpPath);
      
      console.log(`Converted: ${imagePath} -> ${webpPath}`);
    } catch (error) {
      console.error(`Error converting ${imagePath}:`, error.message);
    }
 }
  
  console.log('Image conversion completed!');
}

// Run the conversion
convertToWebP().catch(console.error);
