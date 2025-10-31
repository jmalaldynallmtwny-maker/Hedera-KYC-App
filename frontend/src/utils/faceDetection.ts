// frontend/src/utils/faceDetection.ts
import * as faceapi from 'face-api.js';
import { getErrorMessage } from './typeGuards';

// ===================================
// Configuration
// ===================================
const MODEL_URL = '/models';
let modelsLoaded = false;

export interface FaceDetectionResult {
  success: boolean;
  embedding?: Float32Array;
  quality: number;
  confidence: number;
  landmarks?: faceapi.FaceLandmarks68;
  expressions?: any;
  error?: string;
}

export interface LivenessCheckResult {
  passed: boolean;
  checks: {
    eyesOpen: boolean;
    headAngle: boolean;
    faceSize: boolean;
    brightness: boolean;
  };
  score: number;
}

// ===================================
// Model Loading
// ===================================
export async function loadFaceDetectionModels(): Promise<void> {
  if (modelsLoaded) {
    console.log('✅ Face detection models already loaded');
    return;
  }

  try {
    console.log('📦 Loading face detection models...');
    
    // Load all required models
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);

    modelsLoaded = true;
    console.log('✅ Face detection models loaded successfully');
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('❌ Failed to load face detection models:', message);
    throw new Error('Failed to load face detection models. Please check if model files exist in /public/models/');
  }
}

// ===================================
// Face Detection & Embedding
// ===================================
export async function detectFaceAndExtractEmbedding(
  imageElement: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement
): Promise<FaceDetectionResult> {
  try {
    // Ensure models are loaded
    if (!modelsLoaded) {
      await loadFaceDetectionModels();
    }

    // Detect face with landmarks and descriptors
    const detection = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.5
      }))
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      return {
        success: false,
        quality: 0,
        confidence: 0,
        error: 'No face detected in the image'
      };
    }

    // Calculate quality score
    const quality = calculateFaceQuality(detection);
    
    // Check if quality is acceptable
    if (quality < 0.7) {
      return {
        success: false,
        quality,
        confidence: detection.detection.score,
        error: 'Face quality too low. Please ensure good lighting and face visibility.'
      };
    }

    return {
      success: true,
      embedding: detection.descriptor,
      quality,
      confidence: detection.detection.score,
      landmarks: detection.landmarks,
      expressions: detection.expressions
    };

  } catch (error: any) {
    console.error('Face detection error:', error);
    return {
      success: false,
      quality: 0,
      confidence: 0,
      error: error.message || 'Face detection failed'
    };
  }
}

// ===================================
// Quality Assessment
// ===================================
function calculateFaceQuality(detection: faceapi.WithFaceLandmarks<faceapi.WithFaceDescriptor<{
  detection: faceapi.FaceDetection;
  descriptor: Float32Array;
}>, faceapi.FaceLandmarks68>): number {
  // Base score from detection confidence
  let score = detection.detection.score;

  // Check face size (should be reasonable)
  const faceBox = detection.detection.box;
  const faceArea = faceBox.width * faceBox.height;
  
  // Penalize if face is too small or too large
  if (faceArea < 10000) { // Too small
    score *= 0.7;
  } else if (faceArea > 200000) { // Too large (too close)
    score *= 0.8;
  }

  // Check if face is roughly frontal using landmarks
  const landmarks = detection.landmarks;
  const leftEye = landmarks.positions.slice(36, 42); // Instead of getLeftEye
  const rightEye = landmarks.positions.slice(42, 48); // Instead of getRightEye
  
  // Calculate eye centers
  const leftEyeCenter = leftEye.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  leftEyeCenter.x /= leftEye.length;
  leftEyeCenter.y /= leftEye.length;
  
  const rightEyeCenter = rightEye.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  rightEyeCenter.x /= rightEye.length;
  rightEyeCenter.y /= rightEye.length;
  
  // Check if face angle is acceptable (eyes should be roughly horizontal)
  const eyeAngle = Math.abs(Math.atan2(
    rightEyeCenter.y - leftEyeCenter.y,
    rightEyeCenter.x - leftEyeCenter.x
  ));
  
  // Penalize tilted heads (>17 degrees)
  if (eyeAngle > 0.3) {
    score *= 0.8;
  }

  // Ensure score is between 0 and 1
  return Math.max(0, Math.min(1, score));
}

// ===================================
// Liveness Detection
// ===================================
export async function performLivenessCheck(
  videoElement: HTMLVideoElement
): Promise<LivenessCheckResult> {
  try {
    // Ensure models are loaded
    if (!modelsLoaded) {
      await loadFaceDetectionModels();
    }

    const detection = await faceapi
      .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.5
      }))
      .withFaceLandmarks();

    if (!detection) {
      return {
        passed: false,
        checks: {
          eyesOpen: false,
          headAngle: false,
          faceSize: false,
          brightness: false
        },
        score: 0
      };
    }

    const checks = {
      eyesOpen: checkEyesOpen(detection.expressions),
      headAngle: checkHeadAngle(detection.landmarks),
      faceSize: checkFaceSize(detection.detection.box, videoElement),
      brightness: await checkBrightness(videoElement)
    };

    const passedCount = Object.values(checks).filter(Boolean).length;
    const score = passedCount / Object.keys(checks).length;
    const passed = score >= 0.75; // At least 3 out of 4 checks

    return {
      passed,
      checks,
      score
    };

  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error('Liveness check error:', message);
    return {
      passed: false,
      checks: {
        eyesOpen: false,
        headAngle: false,
        faceSize: false,
        brightness: false
      },
      score: 0
    };
  }
}

// ===================================
// Liveness Check Helpers
// ===================================
function checkEyesOpen(expressions: any): boolean {
  // Check if eyes are open (not surprised or with eyes closed)
  const neutral = expressions.neutral || 0;
  const happy = expressions.happy || 0;
  const sad = expressions.sad || 0;
  
  // If neutral, happy, or sad expressions are dominant, eyes are likely open
  return (neutral + happy + sad) > 0.3;
}

function checkHeadAngle(landmarks: faceapi.FaceLandmarks68): boolean {
  const nose = landmarks.positions.slice(27, 36); // Instead of getNose
  const leftEye = landmarks.positions.slice(36, 42); // Instead of getLeftEye
  const rightEye = landmarks.positions.slice(42, 48); // Instead of getRightEye
  
  // Calculate if face is roughly frontal
  const leftEyeCenter = leftEye.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  leftEyeCenter.x /= leftEye.length;
  
  const rightEyeCenter = rightEye.reduce((acc, p) => ({ x: acc.x + p.x, y: acc.y + p.y }), { x: 0, y: 0 });
  rightEyeCenter.x /= rightEye.length;
  
  const noseTip = nose[nose.length - 1];
  
  // Nose should be roughly centered between eyes
  const eyeMidpoint = (leftEyeCenter.x + rightEyeCenter.x) / 2;
  const noseOffset = Math.abs(noseTip.x - eyeMidpoint);
  const eyeDistance = Math.abs(rightEyeCenter.x - leftEyeCenter.x);
  
  // Nose should be within 30% of eye distance from center
  return (noseOffset / eyeDistance) < 0.3;
}

function checkFaceSize(box: any, videoElement: HTMLVideoElement): boolean {
  const faceArea = box.width * box.height;
  const videoArea = videoElement.videoWidth * videoElement.videoHeight;
  
  // Face should be 5-50% of video area
  const ratio = faceArea / videoArea;
  return ratio > 0.05 && ratio < 0.5;
}

async function checkBrightness(videoElement: HTMLVideoElement): Promise<boolean> {
  const canvas = document.createElement('canvas');
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  
  ctx.drawImage(videoElement, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Calculate average brightness
  let brightness = 0;
  for (let i = 0; i < imageData.data.length; i += 4) {
    const r = imageData.data[i];
    const g = imageData.data[i + 1];
    const b = imageData.data[i + 2];
    brightness += (r + g + b) / 3;
  }
  brightness /= (imageData.data.length / 4);
  
  // Brightness should be between 50 and 200 (not too dark, not too bright)
  return brightness > 50 && brightness < 200;
}

// ===================================
// Embedding Comparison
// ===================================
export function compareEmbeddings(
  embedding1: Float32Array,
  embedding2: Float32Array
): number {
  if (embedding1.length !== embedding2.length) {
    throw new Error('Embeddings must have the same dimensions');
  }

  // Calculate Euclidean distance
  let distance = 0;
  for (let i = 0; i < embedding1.length; i++) {
    const diff = embedding1[i] - embedding2[i];
    distance += diff * diff;
  }
  distance = Math.sqrt(distance);

  // Convert distance to similarity score (0-1)
  // Lower distance = higher similarity
  // Typical face-api.js threshold is 0.6
  const similarity = Math.max(0, 1 - (distance / 2));
  
  return similarity;
}

// ===================================
// Utility: Convert Float32Array to number[]
// ===================================
export function float32ToNumberArray(float32: Float32Array): number[] {
  return Array.from(float32);
}

export function numberArrayToFloat32(numbers: number[]): Float32Array {
  return new Float32Array(numbers);
}

