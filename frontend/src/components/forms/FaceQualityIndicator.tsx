import React from 'react';
import { clsx } from 'clsx';

interface FaceQualityIndicatorProps {
  quality: number;
  isActive: boolean;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const FaceQualityIndicator: React.FC<FaceQualityIndicatorProps> = ({
  quality,
  isActive,
  size = 'md',
  showLabel = true
}) => {
  const getQualityLevel = (quality: number) => {
    if (quality >= 0.9) return 'excellent';
    if (quality >= 0.8) return 'good';
    if (quality >= 0.7) return 'fair';
    if (quality >= 0.6) return 'poor';
    return 'very-poor';
  };

  const getQualityColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-500 bg-green-100 border-green-300';
      case 'good': return 'text-blue-500 bg-blue-100 border-blue-300';
      case 'fair': return 'text-yellow-500 bg-yellow-100 border-yellow-300';
      case 'poor': return 'text-orange-500 bg-orange-100 border-orange-300';
      case 'very-poor': return 'text-red-500 bg-red-100 border-red-300';
      default: return 'text-gray-500 bg-gray-100 border-gray-300';
    }
  };

  const getQualityIcon = (level: string) => {
    switch (level) {
      case 'excellent': return '😄';
      case 'good': return '🙂';
      case 'fair': return '😐';
      case 'poor': return '😕';
      case 'very-poor': return '😞';
      default: return '❓';
    }
  };

  const getQualityText = (level: string) => {
    switch (level) {
      case 'excellent': return 'ممتاز';
      case 'good': return 'جيد';
      case 'fair': return 'متوسط';
      case 'poor': return 'ضعيف';
      case 'very-poor': return 'ضعيف جداً';
      default: return 'غير معروف';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'w-16 h-16 text-sm';
      case 'lg': return 'w-32 h-32 text-xl';
      default: return 'w-24 h-24 text-lg';
    }
  };

  const qualityLevel = getQualityLevel(quality);
  const qualityColor = getQualityColor(qualityLevel);
  const qualityIcon = getQualityIcon(qualityLevel);
  const qualityText = getQualityText(qualityLevel);
  const sizeClasses = getSizeClasses(size);

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* المؤشر الدائري */}
      <div className={clsx(
        'relative rounded-full border-4 flex flex-col items-center justify-center transition-all duration-300',
        sizeClasses,
        qualityColor,
        !isActive && 'opacity-50 grayscale'
      )}>
        {/* النسبة المئوية */}
        <div className="font-bold">
          {Math.round(quality * 100)}%
        </div>
        
        {/* الأيقونة */}
        <div className="text-2xl">
          {qualityIcon}
        </div>

        {/* دائرة التقدم (خلفية) */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* الخلفية */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            opacity="0.2"
          />
          
          {/* التقدم */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * quality)}
            className="transition-all duration-500 ease-out"
          />
        </svg>
      </div>

      {/* النص التوضيحي */}
      {showLabel && (
        <div className="text-center">
          <div className={clsx(
            'text-sm font-semibold capitalize transition-colors duration-300',
            qualityLevel === 'excellent' && 'text-green-700',
            qualityLevel === 'good' && 'text-blue-700',
            qualityLevel === 'fair' && 'text-yellow-700',
            qualityLevel === 'poor' && 'text-orange-700',
            qualityLevel === 'very-poor' && 'text-red-700'
          )}>
            {qualityText}
          </div>
          {!isActive && (
            <div className="text-xs text-gray-500 mt-1">
              الكاميرا غير نشطة
            </div>
          )}
        </div>
      )}

      {/* المؤشر التفصيلي (للمقاس الكبير فقط) */}
      {size === 'lg' && (
        <div className="w-full mt-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>الجودة</span>
            <span>{Math.round(quality * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={clsx(
                'h-2 rounded-full transition-all duration-500',
                qualityLevel === 'excellent' && 'bg-green-500',
                qualityLevel === 'good' && 'bg-blue-500',
                qualityLevel === 'fair' && 'bg-yellow-500',
                qualityLevel === 'poor' && 'bg-orange-500',
                qualityLevel === 'very-poor' && 'bg-red-500'
              )}
              style={{ width: `${quality * 100}%` }}
            ></div>
          </div>
          
          {/* النطاقات */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span className={clsx(quality >= 0.6 && 'font-bold text-green-600')}>60%</span>
            <span className={clsx(quality >= 0.7 && 'font-bold text-blue-600')}>70%</span>
            <span className={clsx(quality >= 0.8 && 'font-bold text-yellow-600')}>80%</span>
            <span className={clsx(quality >= 0.9 && 'font-bold text-purple-600')}>90%</span>
          </div>
        </div>
      )}
    </div>
  );
};

// مكون مساعد للمؤشر المصغر
interface MiniQualityIndicatorProps {
  quality: number;
  className?: string;
}

export const MiniQualityIndicator: React.FC<MiniQualityIndicatorProps> = ({ 
  quality, 
  className 
}) => {
  const getColor = (quality: number) => {
    if (quality >= 0.8) return 'bg-green-400';
    if (quality >= 0.6) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className={clsx('flex items-center space-x-1', className)}>
      <div className="w-12 bg-gray-200 rounded-full h-1.5">
        <div 
          className={clsx('h-1.5 rounded-full transition-all duration-300', getColor(quality))}
          style={{ width: `${Math.min(100, quality * 100)}%` }}
        ></div>
      </div>
      <span className="text-xs font-medium text-gray-600 w-8">
        {Math.round(quality * 100)}%
      </span>
    </div>
  );
};

export default FaceQualityIndicator;
