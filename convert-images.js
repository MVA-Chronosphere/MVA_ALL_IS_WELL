import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
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

// Function to convert images to WebP
async function convertToWebP() {
  console.log('Starting image conversion to WebP format...');
  
  // Get all image files
  const imageFiles = getAllImageFiles('./public');
  console.log(`Found ${imageFiles.length} images to convert`);
  
  for (const imagePath of imageFiles) {
    try {
      const outputDir = path.dirname(imagePath);
      const fileName = path.basename(imagePath, path.extname(imagePath));
      const webpPath = path.join(outputDir, `${fileName}.webp`);
      
      // Read the image file
      const imageBuffer = fs.readFileSync(imagePath);
      
      // Convert image to WebP
      const [convertedImage] = await imagemin.buffer(
        imageBuffer,
        {
          plugins: [
            imageminWebp({
              quality: 80, // Adjust quality (0-100) - higher is better quality but larger file
              method: 6    // Compression method (0-6, 6 is slowest but best compression)
            })
          ]
        }
      );
      
      // Write the WebP image
      fs.writeFileSync(webpPath, convertedImage);
      console.log(`Converted: ${imagePath} -> ${webpPath}`);
      
      // Optionally, you can remove the original file after conversion
      // fs.unlinkSync(imagePath);
    } catch (error) {
      console.error(`Error converting ${imagePath}:`, error.message);
    }
  }
  
  console.log('Image conversion completed!');
}

// Run the conversion
convertToWebP().catch(console.error);
