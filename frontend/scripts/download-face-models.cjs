#!/usr/bin/env node
/**
 * Download face-api.js models
 * Run: node scripts/download-face-models.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const MODELS_DIR = path.join(__dirname, '../public/models');
const BASE_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const MODELS = [
  // Tiny Face Detector
  'tiny_face_detector_model-weights_manifest.json',
  'tiny_face_detector_model-shard1',
  
  // Face Landmark 68
  'face_landmark_68_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  
  // Face Recognition
  'face_recognition_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  
  // Face Expression
  'face_expression_model-weights_manifest.json',
  'face_expression_model-shard1',
];

// Ensure models directory exists
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
  console.log('✅ Created models directory');
}

console.log('📦 Downloading face-api.js models...');
console.log(`📁 Destination: ${MODELS_DIR}`);
console.log('');

let completed = 0;
let failed = 0;

function downloadFile(filename) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}/${filename}`;
    const dest = path.join(MODELS_DIR, filename);
    
    // Check if file already exists
    if (fs.existsSync(dest)) {
      console.log(`⏭️  ${filename} (already exists)`);
      completed++;
      return resolve();
    }
    
    const file = fs.createWriteStream(dest);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(`❌ ${filename} (HTTP ${response.statusCode})`);
        failed++;
        return reject(new Error(`HTTP ${response.statusCode}`));
      }
      
      const totalSize = parseInt(response.headers['content-length'] || '0');
      let downloaded = 0;
      
      response.on('data', (chunk) => {
        downloaded += chunk.length;
        const percent = totalSize > 0 ? ((downloaded / totalSize) * 100).toFixed(1) : '?';
        process.stdout.write(`\r⏳ ${filename} (${percent}%)`);
      });
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        process.stdout.write(`\r✅ ${filename} (${(totalSize / 1024 / 1024).toFixed(2)} MB)\n`);
        completed++;
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      console.error(`\n❌ ${filename} (${err.message})`);
      failed++;
      reject(err);
    });
  });
}

async function downloadAll() {
  for (const model of MODELS) {
    try {
      await downloadFile(model);
    } catch (error) {
      // Continue with next file
    }
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log(`✅ Completed: ${completed}/${MODELS.length}`);
  console.log(`❌ Failed: ${failed}/${MODELS.length}`);
  console.log('='.repeat(60));
  
  if (failed > 0) {
    console.log('');
    console.log('⚠️  Some models failed to download.');
    console.log('Please download them manually from:');
    console.log('https://github.com/justadudewhohacks/face-api.js/tree/master/weights');
    process.exit(1);
  }
  
  console.log('');
  console.log('🎉 All face-api.js models downloaded successfully!');
  console.log('Total size: ~30MB');
}

downloadAll().catch((error) => {
  console.error('Download failed:', error);
  process.exit(1);
});

