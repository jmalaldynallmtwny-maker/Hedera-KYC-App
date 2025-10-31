import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FaceQualityIndicator } from './FaceQualityIndicator';

interface CameraCaptureProps {
  onCapture: (imageData: string, quality: number) => void;
  onError: (error: string) => void;
  qualityThreshold?: number;
  maxCaptures?: number;
  mode?: 'photo' | 'video';
  requiredQuality?: number;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  onCapture,
  onError,
  qualityThreshold = 0.7,
  maxCaptures = 5,
  mode = 'photo',
  requiredQuality = 0.8
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [captures, setCaptures] = useState<Array<{ data: string; quality: number }>>([]);
  const [currentQuality, setCurrentQuality] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  // تحليل جودة الصورة
  const analyzeImageQuality = useCallback((imageData: ImageData): number => {
    try {
      const data = imageData.data;
      let brightness = 0;
      let contrast = 0;
      let edgeCount = 0;

      // حساب السطوع
      for (let i = 0; i < data.length; i += 4) {
        brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
      }
      brightness /= (data.length / 4);

      // حساب التباين والحواف (مبسط)
      for (let i = 4; i < data.length - 4; i += 4) {
        const current = (data[i] + data[i + 1] + data[i + 2]) / 3;
        const previous = (data[i - 4] + data[i - 3] + data[i - 2]) / 3;
        const difference = Math.abs(current - previous);
        if (difference > 30) edgeCount++;
      }

      // حساب الجودة بناء على السطوع والتباين والحواف
      const brightnessScore = Math.max(0, 1 - Math.abs(brightness - 128) / 128);
      const edgeScore = Math.min(1, edgeCount / 10000);
      
      return (brightnessScore * 0.6 + edgeScore * 0.4);
    } catch (error) {
      console.error('Error analyzing image quality:', error);
      return 0.5;
    }
  }, []);

  // بدء الكاميرا
  const startCamera = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        },
        audio: false
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraActive(true);
      }

      // بدء مراقبة الجودة
      startQualityMonitoring();
    } catch (error: any) {
      const errorMessage = getCameraErrorMessage(error);
      onError(errorMessage);
      console.error('Camera error:', error);
    }
  }, [facingMode, onError]);

  // إيقاف الكاميرا
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  }, []);

  // رسائل خطأ الكاميرا
  const getCameraErrorMessage = (error: any): string => {
    switch (error.name) {
      case 'NotAllowedError':
        return 'تم رفض الإذن بالوصول إلى الكاميرا. يرجى السماح بالوصول إلى الكاميرا في إعدادات المتصفح.';
      case 'NotFoundError':
        return 'لم يتم العثور على كاميرا. يرجى التأكد من توصيل الكاميرا.';
      case 'NotSupportedError':
        return 'المتصفح لا يدعم الوصول إلى الكاميرا.';
      case 'NotReadableError':
        return 'الكاميرا قيد الاستخدام من قبل تطبيق آخر.';
      default:
        return `خطأ في الكاميرا: ${error.message}`;
    }
  };

  // مراقبة الجودة المستمرة
  const startQualityMonitoring = useCallback(() => {
    const monitorQuality = () => {
      if (!videoRef.current || !canvasRef.current || !isCameraActive) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context || video.videoWidth === 0) {
        requestAnimationFrame(monitorQuality);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const quality = analyzeImageQuality(imageData);

      setCurrentQuality(quality);
      requestAnimationFrame(monitorQuality);
    };

    monitorQuality();
  }, [isCameraActive, analyzeImageQuality]);

  // التقاط صورة
  const captureImage = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || isAnalyzing) return;

    setIsAnalyzing(true);
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('لا يمكن الوصول إلى سياق الرسم');
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const quality = analyzeImageQuality(imageData);

      if (quality < qualityThreshold) {
        onError(`جودة الصورة منخفضة (${Math.round(quality * 100)}%). يرجى تحسين الإضاءة ووضعية الوجه.`);
        return;
      }

      const imageBase64 = canvas.toDataURL('image/jpeg', 0.8);
      const newCapture = { data: imageBase64, quality };

      setCaptures(prev => {
        const updated = [...prev, newCapture].slice(-maxCaptures);
        return updated;
      });

      onCapture(imageBase64, quality);

    } catch (error: any) {
      onError(`خطأ في التقاط الصورة: ${error.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, qualityThreshold, maxCaptures, onCapture, onError, analyzeImageQuality]);

  // تبديل الكاميرا
  const switchCamera = useCallback(async () => {
    stopCamera();
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
    setTimeout(startCamera, 100);
  }, [stopCamera, startCamera]);

  // إعادة التقاط الصورة
  const retakeCapture = useCallback((index: number) => {
    setCaptures(prev => prev.filter((_, i) => i !== index));
  }, []);

  // تأثير التنظيف
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* عنوان المكون */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">التقاط الصورة</h3>
          <p className="text-sm text-gray-600">قم بمحاذاة وجهك داخل الإطار</p>
        </div>

        {/* منطقة العرض */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden">
          {!isCameraActive ? (
            <div className="aspect-video flex items-center justify-center bg-gray-800">
              <div className="text-center text-white">
                <div className="text-4xl mb-2">📷</div>
                <p>جاري تحميل الكاميرا...</p>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-video object-cover"
              />
              
              {/* شبكة الإرشاد */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 border-2 border-green-400 border-dashed rounded-full flex items-center justify-center">
                  <div className="w-40 h-40 border border-green-300 border-dashed rounded-full"></div>
                </div>
              </div>

              {/* مؤشر الجودة */}
              <div className="absolute top-4 right-4">
                <FaceQualityIndicator 
                  quality={currentQuality} 
                  isActive={isCameraActive}
                  size="md"
                />
              </div>
            </>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* عناصر التحكم */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          {!isCameraActive ? (
            <Button
              onClick={startCamera}
              className="flex-1 max-w-xs"
            >
              تشغيل الكاميرا
            </Button>
          ) : (
            <>
              <Button
                onClick={captureImage}
                loading={isAnalyzing}
                disabled={currentQuality < qualityThreshold}
                className="flex-1"
              >
                {isAnalyzing ? 'جاري التحليل...' : 'التقاط الصورة'}
              </Button>
              
              <Button
                variant="outline"
                onClick={switchCamera}
                className="flex-1"
              >
                تبديل الكاميرا
              </Button>

              <Button
                variant="outline"
                onClick={stopCamera}
                className="flex-1"
              >
                إيقاف الكاميرا
              </Button>
            </>
          )}
        </div>

        {/* الصور الملتقطة */}
        {captures.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              الصور الملتقطة ({captures.length}/{maxCaptures})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {captures.map((capture, index) => (
                <div key={index} className="relative group">
                  <img
                    src={capture.data}
                    alt={`Capture ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border-2 border-green-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => retakeCapture(index)}
                    >
                      إعادة
                    </Button>
                  </div>
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                    {Math.round(capture.quality * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* نصائح للجودة */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <h4 className="text-sm font-medium text-blue-900 mb-1">نصائح لتحسين الجودة:</h4>
          <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
            <li>تأكد من إضاءة جيدة ومنتظمة</li>
            <li>حافظ على مسافة مناسبة من الكاميرا</li>
            <li>تجنب الظلال على وجهك</li>
            <li>انظر مباشرة towards الكاميرا</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CameraCapture;
