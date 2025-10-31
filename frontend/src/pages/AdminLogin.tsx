import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getBankTheme } from '@/constants/banks';

const AdminLogin: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useApp();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFaceLogin, setShowFaceLogin] = useState(false);

  const bankTheme = getBankTheme(bankId || 'baybank');

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(
        { username, password, bankId: bankId || 'baybank' }, 
        true // isAdmin = true for admin login
      );

      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Admin Login Successful',
          message: `Welcome to ${bankId?.toUpperCase()} admin dashboard!`
        });
        
        // Navigate to admin dashboard
        navigate(`/admin/${bankId}/dashboard`);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFaceLogin = async () => {
    // This would integrate with face recognition
    addNotification({
      type: 'info',
      title: 'Face Recognition',
      message: 'Face login would be implemented here with camera integration.'
    });
  };

  const handleDemoLogin = () => {
    setUsername('admin');
    setPassword('admin123');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ 
        background: `linear-gradient(135deg, ${bankTheme.primary}20 0%, ${bankTheme.accent}20 100%)` 
      }}
    >
      <div className="max-w-md w-full">
        <Card className="animate-fade-in">
          {/* Bank Admin Header */}
          <div className="text-center mb-8">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
              style={{ backgroundColor: bankTheme.primary }}
            >
              {bankId?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: bankTheme.primary }}>
              {bankId ? `${bankId.charAt(0).toUpperCase() + bankId.slice(1)}` : 'Bank'} Admin
            </h1>
            <p className="text-gray-600">Secure administrator access</p>
          </div>

          {!showFaceLogin ? (
            /* Password Login Form */
            <>
              <form onSubmit={handlePasswordLogin} className="space-y-6">
                <Input
                  label="Admin Username"
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                />

                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={error}
                  required
                  disabled={isLoading}
                />

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full"
                  style={{ backgroundColor: bankTheme.primary }}
                >
                  {isLoading ? 'Signing In...' : 'Sign In as Admin'}
                </Button>
              </form>

              {/* Alternative Login Options */}
              <div className="mt-6 space-y-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowFaceLogin(true)}
                >
                  👤 Login with Face Recognition
                </Button>

                <div className="text-center">
                  <button 
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={handleDemoLogin}
                  >
                    Use Demo Admin Credentials
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Face Recognition Login */
            <div className="text-center space-y-6">
              <div className="text-6xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-gray-900">Face Recognition Login</h3>
              <p className="text-gray-600">
                Position your face in the frame for authentication
              </p>
              
              <div className="bg-gray-100 rounded-lg p-8 mb-4">
                <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  Camera Feed
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowFaceLogin(false)}
                >
                  ← Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleFaceLogin}
                  style={{ backgroundColor: bankTheme.primary }}
                >
                  Start Face Scan
                </Button>
              </div>
            </div>
          )}

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">🧪 Demo Information</h3>
            <p className="text-sm text-blue-700">
              <strong>Username:</strong> admin<br />
              <strong>Password:</strong> admin123<br />
              <strong>Access:</strong> Full admin privileges for KYC review
            </p>
          </div>

          {/* Navigation */}
          <div className="mt-6 text-center space-y-3">
            <button 
              type="button"
              className="text-sm text-blue-600 hover:underline"
              onClick={() => navigate('/')}
            >
              ← Back to Home
            </button>
            
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500">
                Not an admin?{' '}
                <button 
                  type="button"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => navigate(`/bank/${bankId}/login`)}
                >
                  Bank User Login
                </button>
              </p>
            </div>
          </div>
        </Card>

        {/* Security Notice */}
        <Card className="mt-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🔒</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Enhanced Security</h4>
              <p className="text-sm text-gray-600">
                Admin access requires multi-factor authentication and is monitored for security purposes.
                All activities are logged for audit compliance.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
