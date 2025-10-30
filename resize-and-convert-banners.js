import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Function to resize and convert large banner images to WebP
async function resizeAndConvertBanners() {
  console.log('Starting resize and conversion of large banner images to WebP format...');
  
  const bannerDir = 'public/banners/ALL IS WELL WEB SITE SLIDER';
  const imageFiles = fs.readdirSync(bannerDir);
  
  console.log(`Found ${imageFiles.length} banner images to process`);
  
  for (const file of imageFiles) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      try {
        const imagePath = path.join(bannerDir, file);
        const outputPath = path.join(bannerDir, `${path.parse(file).name}.webp`);
        
        // Get image metadata to check dimensions
        const metadata = await sharp(imagePath).metadata();
        
        console.log(`Processing ${file}: ${metadata.width}x${metadata.height}`);
        
        // Resize if image is too large (WebP has a limit of 16383x16383 pixels)
        // Let's resize to max 4000px in either dimension to be safe
        let resizeWidth = metadata.width;
        let resizeHeight = metadata.height;
        
        if (metadata.width > 4000 || metadata.height > 4000) {
          if (metadata.width > metadata.height) {
            resizeWidth = 4000;
            resizeHeight = Math.round((4000 / metadata.width) * metadata.height);
          } else {
            resizeHeight = 4000;
            resizeWidth = Math.round((4000 / metadata.height) * metadata.width);
          }
          console.log(`  Resizing to ${resizeWidth}x${resizeHeight}`);
        }
        
        // Convert image to WebP with resize if needed
        await sharp(imagePath)
          .resize(resizeWidth, resizeHeight, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`  Converted: ${file} -> ${path.parse(file).name}.webp`);
      } catch (error) {
        console.error(`  Error converting ${file}:`, error.message);
      }
    }
  }
  
  console.log('Banner image resize and conversion completed!');
}

// Run the conversion
resizeAndConvertBanners().catch(console.error);
