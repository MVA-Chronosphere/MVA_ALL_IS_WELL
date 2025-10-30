import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

// Define paths to the video files
const videoFiles = [
  'public/Anandprakashchokseyexplanation.mp4',
  'public/Explainervide.mp4',
  'public/kidtestimonial.mp4'
];

// Define the path to the ffmpeg binary if it's not in your system PATH
// Update this path if your ffmpeg installation is elsewhere
// For example: 'C:/ffmpeg/bin/ffmpeg.exe' or 'C:/Program Files/ffmpeg/bin/ffmpeg.exe'
const ffmpegPath = 'C:/ffmpeg/bin/ffmpeg.exe'; // Assumes it's in PATH, otherwise provide full path like 'C:/path/to/ffmpeg/bin/ffmpeg.exe'

// If the path is not in PATH, uncomment the following line and adjust the path accordingly:
// ffmpeg.setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe'); // Example path, adjust as needed

// Function to convert a video to WebM
function convertToWebM(inputPath) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace('.mp4', '.webm');

    console.log(`Converting ${inputPath} to WebM...`);

    // Use the specified ffmpeg path if not in PATH
    const ffmpegInstance = ffmpeg(inputPath);
    if (ffmpegPath !== 'ffmpeg') { // Only set if a specific path was provided
      ffmpegInstance.setFfmpegPath(ffmpegPath);
    }

    ffmpegInstance
      .output(outputPath)
      .videoCodec('libvpx-vp9') // Use VP9 codec for WebM
      .audioCodec('libopus')    // Use Opus codec for audio
      .outputOption('-crf', '30') // Constant Rate Factor (lower = higher quality, larger file)
      .outputOption('-b:v', '0')  // Bitrate (0 means automatic)
      .on('end', () => {
        console.log(`Successfully converted: ${outputPath}`);
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
