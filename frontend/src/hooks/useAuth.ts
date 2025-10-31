import { useState, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import { authApi } from '@/lib/api';
import { handleApiError } from '@/lib/api';
import { LoginFormData } from '@/types';

export const useAuth = () => {
  const { state, loginUser, loginAdmin, logout } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (formData: LoginFormData, isAdmin: boolean = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.login(formData);
      
      if (response.data.success) {
        if (isAdmin) {
          loginAdmin({
            id: response.data.admin.adminId,
            username: response.data.admin.username,
            bankId: response.data.admin.bankId,
            faceEnrolled: response.data.admin.faceEnrolled,
            createdAt: new Date().toISOString()
          }, response.data.bank);
        } else {
          // For user login, you would typically get user data from a different endpoint
          // This is simplified for the demo
          console.log('User login successful', response.data);
        }
        
        return { success: true };
      } else {
        setError(response.data.error || 'Login failed');
        return { success: false, error: response.data.error };
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [loginUser, loginAdmin]);

  const faceLogin = useCallback(async (bankId: string, probeEmbedding: any) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.verifyFace(bankId, {
        adminId: state.admin?.id || '',
        probeEmbedding,
      });
      
      if (response.data.success && response.data.match) {
        // Face verification successful
        return { success: true, score: response.data.score };
      } else {
        setError('Face verification failed');
        return { success: false, error: 'Face not recognized' };
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [state.admin]);

  const enrollFace = useCallback(async (bankId: string, embeddings: any[]) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await authApi.enrollFace(bankId, {
        adminId: state.admin?.id || '',
        embeddings,
      });
      
      if (response.data.success) {
        return { success: true };
      } else {
        setError('Face enrollment failed');
        return { success: false, error: 'Failed to enroll face' };
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [state.admin]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    isLoading,
    error,
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    admin: state.admin,
    bank: state.bank,
    
    // Actions
    login,
    faceLogin,
    enrollFace,
    logout,
    clearError,
  };
};
