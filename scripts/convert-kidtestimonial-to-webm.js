import ffmpeg from 'fluent-ffmpeg';

const inputPath = 'public/kidtestimonial.mp4';
const outputPath = 'public/kidtestimonial.webm';

console.log(`Converting ${inputPath} to WebM...`);

// Use the specified ffmpeg path
ffmpeg(inputPath)
  .setFfmpegPath('C:/ffmpeg/bin/ffmpeg.exe') // Use the same path as before
  .output(outputPath)
  .videoCodec('libvpx-vp9') // Use VP9 codec for WebM
  .audioCodec('libopus')    // Use Opus codec for audio
  .outputOption('-crf', '30') // Constant Rate Factor (lower = higher quality, larger file)
  .outputOption('-b:v', '0')  // Bitrate (0 means automatic)
  .on('end', () => {
    console.log(`Successfully converted: ${outputPath}`);
  })
  .on('error', (err) => {
    console.error(`Error converting ${inputPath}:`, err.message);
  })
  .run();
