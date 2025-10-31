import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (transcript: string) => void;
  maxDuration?: number;
  language?: string;
  title?: string;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export const VoiceSearchModal: React.FC<VoiceSearchModalProps> = ({
  isOpen,
  onClose,
  onTranscript,
  maxDuration = 30000, // 30 ثانية
  language = 'ar-SA',
  title = 'البحث الصوتي'
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // التحقق من دعم API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);
    
    if (!SpeechRecognition) {
      setError('المتصفح لا يدعم التعرف على الصوت. يرجى استخدام Chrome أو Edge.');
    }
  }, []);

  // تهيئة التعرف على الصوت
  const initializeRecognition = useCallback(() => {
    if (!isSupported) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition() as SpeechRecognition;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = '';
      let interim = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interim += transcript;
        }
      }

      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript);
        setInterimTranscript('');
      } else {
        setInterimTranscript(interim);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      
      switch (event.error) {
        case 'not-allowed':
          setError('تم رفض الإذن باستخدام الميكروفون. يرجى السماح بالوصول إلى الميكروفون.');
          break;
        case 'audio-capture':
          setError('لم يتم العثور على ميكروفون. يرجى التأكد من توصيل الميكروفون.');
          break;
        case 'network':
          setError('خطأ في الشبكة. يرجى التحقق من اتصال الإنترنت.');
          break;
        default:
          setError(`خطأ في التعرف على الصوت: ${event.error}`);
      }
      
      stopListening();
    };

    recognition.onend = () => {
      if (isListening) {
        // إعادة التشغيل التلقائي إذا انتهى بشكل غير متوقع
        setTimeout(() => {
          if (isListening && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (error) {
              console.error('Error restarting recognition:', error);
              stopListening();
            }
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;
  }, [isSupported, language, isListening]);

  // بدء الاستماع
  const startListening = useCallback(async () => {
    if (!isSupported || !recognitionRef.current) {
      initializeRecognition();
    }

    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setIsListening(true);
    startTimeRef.current = Date.now();

    try {
      // طلب إذن الميكروفون
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }

      // بدء عداد الوقت
      timerRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        setRecordingTime(elapsed);

        if (elapsed >= maxDuration) {
          stopListening();
        }
      }, 1000);

    } catch (error: any) {
      setError('فشل في الوصول إلى الميكروفون. يرجى التحقق من الأذونات.');
      setIsListening(false);
    }
  }, [isSupported, initializeRecognition, maxDuration]);

  // إيقاف الاستماع
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsListening(false);
  }, []);

  // إرسال النص
  const handleSubmit = useCallback(() => {
    const finalText = transcript || interimTranscript;
    if (finalText.trim()) {
      onTranscript(finalText.trim());
    }
    onClose();
  }, [transcript, interimTranscript, onTranscript, onClose]);

  // إلغاء
  const handleCancel = useCallback(() => {
    stopListening();
    onClose();
  }, [stopListening, onClose]);

  // تأثير التنظيف
  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      setRecordingTime(0);
    }
  }, [isOpen, stopListening]);

  // تأثير التدمير
  useEffect(() => {
    return () => {
      stopListening();
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stopListening]);

  if (!isOpen) return null;

  const progressPercentage = (recordingTime / maxDuration) * 100;
  const remainingTime = Math.ceil((maxDuration - recordingTime) / 1000);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full max-h-[90vh] overflow-hidden animate-slide-in">
        {/* الهيدر */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* المحتوى */}
        <div className="p-6 space-y-6">
          {error ? (
            // رسالة الخطأ
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">خطأ في الميكروفون</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={handleCancel}>
                إغلاق
              </Button>
            </div>
          ) : !isSupported ? (
            // عدم الدعم
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🚫</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">غير مدعوم</h3>
              <p className="text-gray-600 mb-4">
                المتصفح لا يدعم البحث الصوتي. يرجى استخدام Chrome أو Edge.
              </p>
              <Button onClick={handleCancel}>
                إغلاق
              </Button>
            </div>
          ) : (
            // واجهة البحث الصوتي
            <>
              {/* مؤشر التسجيل */}
              <div className="text-center">
                <div className={clsx(
                  'w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300',
                  isListening 
                    ? 'bg-red-100 border-4 border-red-500 animate-pulse' 
                    : 'bg-gray-100 border-4 border-gray-300'
                )}>
                  <div className="text-2xl">
                    {isListening ? '🎤' : '🎯'}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {isListening ? 'جاري الاستماع...' : 'انقر لبدء التحدث'}
                </h3>

                {isListening && (
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      الوقت المتبقي: {remainingTime} ثانية
                    </p>
                  </div>
                )}
              </div>

              {/* النص المعترف به */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  النص المعترف عليه:
                </label>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-32 overflow-y-auto">
                  {transcript && (
                    <div className="text-gray-800 text-sm mb-2">
                      {transcript}
                    </div>
                  )}
                  
                  {interimTranscript && (
                    <div className="text-gray-500 text-sm italic">
                      {interimTranscript}
                    </div>
                  )}
                  
                  {!transcript && !interimTranscript && (
                    <div className="text-gray-400 text-sm text-center py-4">
                      {isListening ? 'تحدث الآن...' : 'سيظهر النص المعترف عليه هنا'}
                    </div>
                  )}
                </div>
              </div>

              {/* مؤشر الموجة الصوتية */}
              {isListening && (
                <div className="flex justify-center space-x-1 h-8 items-end">
                  {[1, 2, 3, 4, 5, 4, 3, 2, 1].map((height, index) => (
                    <div
                      key={index}
                      className="w-1 bg-red-500 rounded-full animate-pulse"
                      style={{
                        height: `${height * 6}px`,
                        animationDelay: `${index * 0.1}s`,
                        animationDuration: '0.5s'
                      }}
                    ></div>
                  ))}
                </div>
              )}

              {/* أزرار التحكم */}
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  إلغاء
                </Button>

                {!isListening ? (
                  <Button
                    onClick={startListening}
                    className="flex-1"
                  >
                    بدء التحدث
                  </Button>
                ) : (
                  <Button
                    onClick={stopListening}
                    variant="danger"
                    className="flex-1"
                  >
                    إيقاف
                  </Button>
                )}

                {(transcript || interimTranscript) && !isListening && (
                  <Button
                    onClick={handleSubmit}
                    className="flex-1"
                  >
                    استخدام النص
                  </Button>
                )}
              </div>

              {/* نصائح الاستخدام */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="text-sm font-medium text-blue-900 mb-1">نصائح للاستخدام:</h4>
                <ul className="text-xs text-blue-700 list-disc list-inside space-y-1">
                  <li>تحدث بوضوح وبطء معتدل</li>
                  <li>استخدم في مكان هادئ بعيد عن الضوضاء</li>
                  <li>حافظ على مسافة ثابتة من الميكروفون</li>
                  <li>تجنب الكلمات العامية واللهجات الصعبة</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

// دالة مساعدة للـ className
function clsx(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}

export default VoiceSearchModal;
