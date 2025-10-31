import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { validateNNI } from '@/lib/cryptoClient';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { lookupCitizen } = useKYC();
  const { addNotification } = useApp();
  
  const [nni, setNni] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate NNI
    const validation = validateNNI(nni);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid NNI');
      return;
    }

    setIsLoading(true);

    try {
      const result = await lookupCitizen(nni);
      
      if (result.found && result.citizen) {
        addNotification({
          type: 'success',
          title: 'NNI Found',
          message: `Welcome ${result.citizen.full_name}! Redirecting to KYC form...`
        });
        
        // Navigate to KYC start with citizen data
        navigate('/bank/baybank/kyc-start', { 
          state: { 
            citizen: result.citizen,
            maskedNni: result.citizen.nni_masked
          } 
        });
      } else {
        setError('NNI not found. Please verify your number and try again.');
        addNotification({
          type: 'error',
          title: 'NNI Not Found',
          message: 'The provided NNI was not found in our system.'
        });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while looking up your NNI');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Start KYC Process</h1>
            <p className="text-gray-600">
              Enter your National Identification Number to begin the verification process
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                label="National Identification Number (NNI)"
                type="text"
                placeholder="Enter your 8-12 digit NNI"
                value={nni}
                onChange={(e) => setNni(e.target.value)}
                error={error}
                helperText="This is your unique national identification number"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              loading={isLoading}
              className="w-full"
            >
              {isLoading ? 'Checking NNI...' : 'Verify NNI & Start KYC'}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">🔒 Privacy Notice</h3>
            <p className="text-blue-700 text-sm">
              Your NNI is securely hashed and never stored in plain text. 
              We only use it to retrieve your basic information for KYC verification.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact support at{' '}
              <a href="mailto:support@kyc-platform.com" className="text-blue-600 hover:underline">
                support@kyc-platform.com
              </a>
            </p>
          </div>
        </Card>

        {/* Demo NNI Suggestions */}
        <Card className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Demo NNI Numbers</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span>2001123456</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setNni('2001123456')}
              >
                Use
              </Button>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span>2001987654</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setNni('2001987654')}
              >
                Use
              </Button>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <span>2001567890</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setNni('2001567890')}
              >
                Use
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
