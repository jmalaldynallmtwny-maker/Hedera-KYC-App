import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const AdminEnrollFace: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const { enrollFace } = useAuth();
  
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [captures, setCaptures] = useState<Array<{ data: string; quality: number }>>([]);
  const [enrollmentComplete, setEnrollmentComplete] = useState(false);

  const handleCapture = async () => {
    // محاكاة عملية التقاط الوجه
    const newCapture = {
      data: `data:image/jpeg;base64,mock_image_data_${Date.now()}`,
      quality: 0.85 + Math.random() * 0.14
    };
    
    setCaptures(prev => [...prev, newCapture].slice(-5));
  };

  const handleEnroll = async () => {
    if (captures.length < 3) {
      alert('Please capture at least 3 face images for enrollment.');
      return;
    }

    setIsEnrolling(true);
    
    try {
      // محاكاة عملية التسجيل
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const result = await enrollFace(bankId!, captures);
      
      if (result.success) {
        setEnrollmentComplete(true);
        setTimeout(() => {
          navigate(`/admin/${bankId}/dashboard`);
        }, 2000);
      }
    } catch (err) {
      console.error('Enrollment failed:', err);
      alert('Face enrollment failed. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  if (enrollmentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Face Enrollment Complete!</h2>
          <p className="text-gray-600 mb-6">
            Your face has been successfully enrolled. You can now use face recognition for login.
          </p>
          <Button onClick={() => navigate(`/admin/${bankId}/dashboard`)}>
            Continue to Dashboard
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Face Enrollment</h1>
            <p className="text-gray-600">
              Capture multiple face images to enable face recognition login
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Camera Section */}
            <div className="text-center">
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="w-48 h-48 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-500 mb-4">
                  Camera Preview
                </div>
                <Button onClick={handleCapture} disabled={captures.length >= 5}>
                  📸 Capture Face
                </Button>
              </div>
              
              <p className="text-sm text-gray-600">
                Position your face in the frame and ensure good lighting
              </p>
            </div>

            {/* Captures Preview */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">
                Captured Images ({captures.length}/5)
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {captures.map((capture, index) => (
                  <div key={index} className="relative">
                    <div className="w-full h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Face {index + 1}</span>
                    </div>
                    <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 rounded">
                      {Math.round(capture.quality * 100)}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">📸 Enrollment Tips</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Ensure good, even lighting</li>
                  <li>• Look directly at the camera</li>
                  <li>• Keep a neutral expression</li>
                  <li>• Capture from different angles</li>
                  <li>• Remove glasses if possible</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={() => setCaptures([])}
              disabled={captures.length === 0}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={handleEnroll}
              loading={isEnrolling}
              disabled={captures.length < 3}
              className="flex-1"
            >
              {isEnrolling ? 'Enrolling...' : `Enroll Face (${captures.length}/3)`}
            </Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🔒</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Security & Privacy</h4>
              <p className="text-sm text-gray-600">
                Your face data is encrypted and stored securely. It will only be used for authentication purposes and never shared with third parties.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminEnrollFace;
