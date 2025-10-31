import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

// Define paths to the video files
const videoFiles = [
  'public/Anandprakashchokseyexplanation.mp4',
  'public/Explainervide.mp4',
  'public/kidtestimonial.mp4',
  'public/whysection/Explainervide.mp4'
];

// Function to convert a video to WebM with better compression for web delivery
function convertToWebM(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace('.mp4', '.webm');

    console.log(`Converting ${inputPath} to WebM with optimized settings for web...`);

    // Use ffmpeg with optimized settings for web delivery
    ffmpeg(inputPath)
      .output(outputPath)
      .videoCodec('libvpx-vp9') // Use VP9 codec for WebM
      .audioCodec('libopus')    // Use Opus codec for audio
      .outputOption('-crf', '35') // Higher CRF for smaller file size (35 is a good balance)
      .outputOption('-b:v', '1M')  // Limit video bitrate to 1 Mbps for web delivery
      .outputOption('-cpu-used', '4') // Faster encoding
      .outputOption('-deadline', 'good') // Good quality-speed balance
      .outputOption('-quality', 'good') // Good quality setting
      .outputOption('-row-mt', '1') // Enable row-based multithreading
      .on('end', () => {
        console.log(`Successfully converted: ${outputPath}`);
        // Log the file size for comparison
        const stats = fs.statSync(outputPath);
        const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`Optimized file size: ${fileSizeInMB} MB`);
        resolve(outputPath);
      })
      .on('error', (err) => {
        console.error(`Error converting ${inputPath}:`, err.message);
        reject(err);
      })
      .run();
  });
}

// Main function to process all videos
async function processVideos() {
  console.log('Starting video conversion to WebM...');

  try {
    for (const videoFile of videoFiles) {
      if (!fs.existsSync(videoFile)) {
        console.warn(`Video file does not exist: ${videoFile}`);
        continue;
      }

      await convertToWebM(videoFile);
    }

    console.log('All videos converted successfully!');
  } catch (error) {
    console.error('An error occurred during video conversion:', error);
  }
}

// Run the conversion process
processVideos().catch(console.error);
