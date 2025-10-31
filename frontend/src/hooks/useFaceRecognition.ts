import { useState, useCallback, useRef } from 'react';
import { CryptoClient } from '@/lib/cryptoClient';
import { FACE_CONFIG } from '@/constants/app';

export const useFaceRecognition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(0);
  const [captures, setCaptures] = useState<any[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      return true;
    } catch (err: any) {
      const errorMessage = err.name === 'NotAllowedError' 
        ? 'Camera access denied. Please allow camera permissions.'
        : 'Failed to access camera. Please ensure your camera is working.';
      
      setError(errorMessage);
      return false;
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const captureFace = useCallback(async (): Promise<{ success: boolean; embedding?: any; quality?: number }> => {
    if (!videoRef.current) {
      setError('Camera not initialized');
      return { success: false };
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create canvas to capture image from video
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Failed to create canvas context');
      }

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // ===================================
      // REAL Face Detection using face-api.js
      // ===================================
      const { detectFaceAndExtractEmbedding, float32ToNumberArray } = await import('@/utils/faceDetection');
      
      const result = await detectFaceAndExtractEmbedding(canvas);
      
      if (!result.success) {
        setError(result.error || 'Failed to detect face');
        setQuality(result.quality);
        return { success: false, quality: result.quality };
      }
      
      // Update quality from real detection
      setQuality(result.quality);
      
      if (result.quality < FACE_CONFIG.qualityThreshold) {
        setError('Face quality too low. Please ensure good lighting and face visibility.');
        return { success: false, quality: result.quality };
      }
      
      // Convert Float32Array embedding to regular array for encryption
      const embeddingArray = float32ToNumberArray(result.embedding!);
      
      // Encrypt the embedding
      const encryptedEmbedding = await CryptoClient.encryptEmbedding(embeddingArray);
      
      const newCapture = {
        id: Date.now().toString(),
        embedding: encryptedEmbedding,
        quality: result.quality,
        confidence: result.confidence,
        timestamp: new Date(),
      };
      
      setCaptures(prev => [...prev, newCapture].slice(-FACE_CONFIG.maxCaptures));
      
      console.log(`✅ Face captured - Quality: ${result.quality.toFixed(2)}, Confidence: ${result.confidence.toFixed(2)}`);
      
      return { 
        success: true, 
        embedding: encryptedEmbedding,
        quality: result.quality,
        confidence: result.confidence
      };
      
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to capture face';
      setError(errorMessage);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCaptures = useCallback(() => {
    setCaptures([]);
    setQuality(0);
  }, []);

  const getCaptureQuality = useCallback((): 'poor' | 'fair' | 'good' | 'excellent' => {
    if (quality < 0.6) return 'poor';
    if (quality < 0.75) return 'fair';
    if (quality < 0.9) return 'good';
    return 'excellent';
  }, [quality]);

  return {
    // State
    isLoading,
    error,
    quality,
    captures,
    videoRef,
    
    // Actions
    startCamera,
    stopCamera,
    captureFace,
    clearCaptures,
    getCaptureQuality,
  };
};
