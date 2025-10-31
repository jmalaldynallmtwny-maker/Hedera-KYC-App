import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { getBankTheme } from '@/constants/banks';

const BankLogin: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useApp();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const bankTheme = getBankTheme(bankId || 'baybank');

  const handleSubmit = async (e: React.FormEvent) => {
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
        false // isAdmin = false for bank user login
      );

      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Login Successful',
          message: `Welcome to ${bankId?.toUpperCase()} banking portal!`
        });
        
        // Navigate to bank app
        navigate(`/bank/${bankId}/app`);
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoType: 'user' | 'admin') => {
    if (demoType === 'user') {
      setUsername('user_demo');
      setPassword('demo123');
    } else {
      setUsername('admin');
      setPassword('admin123');
    }
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
          {/* Bank Header */}
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
              style={{ backgroundColor: bankTheme.primary }}
            >
              {bankId?.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: bankTheme.primary }}>
              {bankId ? `${bankId.charAt(0).toUpperCase() + bankId.slice(1)}` : 'Bank'} Portal
            </h1>
            <p className="text-gray-600">Sign in to your banking account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
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
              {isLoading ? 'Signing In...' : 'Sign In to Bank Account'}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">🧪 Demo Accounts</h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => handleDemoLogin('user')}
              >
                👤 Bank User: user_demo / demo123
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={() => handleDemoLogin('admin')}
              >
                🔐 Bank Admin: admin / admin123
              </Button>
            </div>
          </div>

          {/* Additional Options */}
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
                Don't have an account?{' '}
                <button 
                  type="button"
                  className="text-blue-600 hover:underline font-medium"
                  onClick={() => navigate('/register')}
                >
                  Start KYC Process
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
              <h4 className="font-semibold text-gray-900 mb-1">Secure Banking</h4>
              <p className="text-sm text-gray-600">
                Your banking information is protected with bank-level security and encryption.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BankLogin;
