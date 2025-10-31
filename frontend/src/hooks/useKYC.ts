import { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { kycApi, adminApi } from '@/lib/api';
import { handleApiError } from '@/lib/api';
import { KYCFormData, VoteFormData } from '@/types';

export const useKYC = () => {
  const { state, addNotification } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupCitizen = useCallback(async (nni: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await kycApi.lookup(nni);
      return response.data;
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Lookup Failed',
        message: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [addNotification]);

  const createKYCRequest = useCallback(async (formData: KYCFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const payload = {
        masked_nni: formData.nni,
        payload_summary: {
          fullName: '', // Will be filled from lookup
          birthdate: '', // Will be filled from lookup
          phone: '', // Will be filled from lookup
          address: '', // Will be filled from lookup
          occupation: formData.occupation,
          employer_name: formData.employer_name,
          source_of_funds: formData.source_of_funds,
          estimated_monthly_income: formData.estimated_monthly_income,
          account_purpose: formData.account_purpose,
          is_pep: formData.is_pep,
          consent: formData.consent
        },
        images: [],
        bankId: state.bank?.id || 'baybank', // Default to first bank
      };

      const response = await kycApi.create(payload);
      
      if (response.data.success) {
        addNotification({
          type: 'success',
          title: 'KYC Submitted',
          message: 'Your KYC request has been submitted successfully!',
        });
        
        return response.data;
      } else {
        throw new Error(response.data.error || 'Failed to create KYC request');
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Submission Failed',
        message: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [state.bank, addNotification]);

  const getRequestStatus = useCallback(async (requestId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await kycApi.getStatus(requestId, state.bank?.id || 'baybank');
      return response.data;
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [state.bank]);

  const submitVote = useCallback(async (requestId: string, voteData: VoteFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminApi.vote(
        state.bank?.id || 'baybank',
        requestId,
        voteData
      );
      
      if (response.data.success) {
        addNotification({
          type: 'success',
          title: 'Vote Submitted',
          message: 'Your vote has been recorded successfully!',
        });
        
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to submit vote');
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      addNotification({
        type: 'error',
        title: 'Vote Failed',
        message: errorMessage,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [state.bank, addNotification]);

  const getPendingRequests = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await adminApi.getRequests(
        state.bank?.id || 'baybank',
        { status: 'PENDING', ...filters }
      );
      return response.data;
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [state.bank]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isLoading,
    error,
    
    // Actions
    lookupCitizen,
    createKYCRequest,
    getRequestStatus,
    submitVote,
    getPendingRequests,
    clearError,
  };
};
