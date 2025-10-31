// frontend/src/components/FaceModelLoader.tsx
import { useEffect, useState } from 'react';
import { loadFaceDetectionModels } from '@/utils/faceDetection';

interface FaceModelLoaderProps {
  children: React.ReactNode;
}

export const FaceModelLoader: React.FC<FaceModelLoaderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log('⏳ Loading face detection models...');
        await loadFaceDetectionModels();
        console.log('✅ Face detection models loaded');
        setLoading(false);
      } catch (err: any) {
        console.error('❌ Failed to load face models:', err);
        setError(err.message || 'Failed to load face detection models');
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Face Recognition Models
          </h2>
          <p className="text-gray-600">
            This may take a moment on first load (~7MB)
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Models will be cached for future use
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Failed to Load Face Recognition
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500 mb-4">
            Please ensure that face-api.js model files are present in /public/models/
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
            <p className="text-xs text-gray-400">
              To download models, run: npm run download-models
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};





