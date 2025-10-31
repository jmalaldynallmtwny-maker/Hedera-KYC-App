import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useKYC } from '@/hooks/useKYC';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { KYC_CONFIG } from '@/constants/app';
import { KYCFormData, Citizen } from '@/types';

const KycStart: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { createKYCRequest } = useKYC();
  const { addNotification } = useApp();
  
  const citizenData = location.state?.citizen as Citizen;
  const maskedNni = location.state?.maskedNni;

  const [formData, setFormData] = useState<KYCFormData>({
    nni: maskedNni || '',
    occupation: '',
    employer_name: '',
    source_of_funds: '',
    estimated_monthly_income: '',
    account_purpose: '',
    is_pep: false,
    consent: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleInputChange = (field: keyof KYCFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      addNotification({
        type: 'error',
        title: 'Consent Required',
        message: 'You must agree to the terms and conditions to proceed.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await createKYCRequest(formData);
      
      addNotification({
        type: 'success',
        title: 'KYC Submitted Successfully!',
        message: 'Your KYC request has been sent to all banks for review.'
      });

      // Navigate to waiting page with the request ID
      navigate(`/bank/${bankId}/kyc-wait`, { 
        state: { 
          requestId: result.requestId,
          statusToken: result.statusToken 
        } 
      });
    } catch (err: any) {
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: err.message || 'Failed to submit KYC request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step <= currentStep 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-500'
          }`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 ${
              step < currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={citizenData?.given_name || ''}
          disabled
          helperText="From your national record"
        />
        <Input
          label="Last Name"
          value={citizenData?.family_name || ''}
          disabled
          helperText="From your national record"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          value={citizenData?.birthdate ? new Date(citizenData.birthdate).toLocaleDateString() : ''}
          disabled
        />
        <Input
          label="Place of Birth"
          value={citizenData?.place_of_birth || ''}
          disabled
        />
      </div>

      <Input
        label="National ID Number"
        value={formData.nni}
        disabled
        helperText="Your NNI is securely masked"
      />
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Employment & Financial Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Occupation *
        </label>
        <select
          value={formData.occupation}
          onChange={(e) => handleInputChange('occupation', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select your occupation</option>
          {KYC_CONFIG.occupations.map(occupation => (
            <option key={occupation} value={occupation}>{occupation}</option>
          ))}
        </select>
      </div>

      <Input
        label="Employer Name (Optional)"
        placeholder="Enter your employer's name"
        value={formData.employer_name}
        onChange={(e) => handleInputChange('employer_name', e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Source of Funds *
        </label>
        <select
          value={formData.source_of_funds}
          onChange={(e) => handleInputChange('source_of_funds', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select source of funds</option>
          {KYC_CONFIG.sourcesOfFunds.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Estimated Monthly Income *
        </label>
        <select
          value={formData.estimated_monthly_income}
          onChange={(e) => handleInputChange('estimated_monthly_income', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select income range</option>
          {KYC_CONFIG.incomeRanges.map(income => (
            <option key={income} value={income}>{income}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Purpose of Account *
        </label>
        <select
          value={formData.account_purpose}
          onChange={(e) => handleInputChange('account_purpose', e.target.value)}
          className="input-field"
          required
        >
          <option value="">Select account purpose</option>
          {KYC_CONFIG.accountPurposes.map(purpose => (
            <option key={purpose} value={purpose}>{purpose}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg">
        <input
          type="checkbox"
          id="pep-check"
          checked={formData.is_pep}
          onChange={(e) => handleInputChange('is_pep', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="pep-check" className="text-sm text-gray-700">
          I am a Politically Exposed Person (PEP) or a family member/close associate of a PEP
        </label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-900">Review & Consent</h2>
      
      <Card className="bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-3">📋 Information Summary</h3>
        <div className="space-y-2 text-sm text-blue-800">
          <div className="flex justify-between">
            <span>Full Name:</span>
            <span className="font-medium">{citizenData?.full_name}</span>
          </div>
          <div className="flex justify-between">
            <span>Occupation:</span>
            <span className="font-medium">{formData.occupation}</span>
          </div>
          <div className="flex justify-between">
            <span>Source of Funds:</span>
            <span className="font-medium">{formData.source_of_funds}</span>
          </div>
          <div className="flex justify-between">
            <span>Monthly Income:</span>
            <span className="font-medium">{formData.estimated_monthly_income}</span>
          </div>
        </div>
      </Card>

      <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notice</h4>
        <p className="text-sm text-yellow-700">
          Your KYC information will be reviewed by 5 participating banks. 
          All banks must approve your application for it to be accepted. 
          A single rejection will cancel the request for all banks.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent-check"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-1"
            required
          />
          <label htmlFor="consent-check" className="text-sm text-gray-700">
            I consent to the processing and verification of my KYC information by the participating banks. 
            I understand that my data will be handled in accordance with privacy regulations and that 
            a privacy-preserving proof will be published on Hedera blockchain.
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                ← Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={nextStep}
                >
                  Next →
                </Button>
              ) : (
                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!formData.consent}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit KYC Application'}
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Progress Info */}
        <Card className="mt-4">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">🏦</div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Multi-Bank Review</h4>
              <p className="text-sm text-gray-600">
                Your application will be simultaneously reviewed by 5 banks: 
                BayBank, OasisBank, ZenBank, ArcBank, and NexBank (all lowercase ids).
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KycStart;
