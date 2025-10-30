import fs from 'fs';
import path from 'path';

// Function to recursively get all files in a directory
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });

  return fileList;
}

// Main function to perform cleanup
function cleanupMediaFiles() {
  console.log('Starting media file cleanup...');

  const allFiles = getAllFiles('./public');
  const webpFiles = allFiles.filter(file => file.toLowerCase().endsWith('.webp'));
  const webmFiles = allFiles.filter(file => file.toLowerCase().endsWith('.webm'));

  // Process WebP files: delete corresponding JPG, JPEG, PNG
  webpFiles.forEach(webpFile => {
    const baseName = webpFile.slice(0, -5); // Remove '.webp'
    const possibleExtensions = ['.jpg', '.jpeg', '.png'];

    possibleExtensions.forEach(ext => {
      const correspondingFile = baseName + ext;
      if (fs.existsSync(correspondingFile)) {
        console.log(`Deleting image: ${correspondingFile} (WebP version exists: ${webpFile})`);
        fs.unlinkSync(correspondingFile);
      }
    });
  });

  // Process WebM files: delete corresponding MP4
  webmFiles.forEach(webmFile => {
    const baseName = webmFile.slice(0, -5); // Remove '.webm'
    const correspondingMp4 = baseName + '.mp4';

    if (fs.existsSync(correspondingMp4)) {
      console.log(`Deleting video: ${correspondingMp4} (WebM version exists: ${webmFile})`);
      fs.unlinkSync(correspondingMp4);
    }
  });

  console.log('Media file cleanup completed!');
}

// Run the cleanup process
cleanupMediaFiles();
