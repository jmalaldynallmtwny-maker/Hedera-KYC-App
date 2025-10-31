import { useState } from 'react';
import { api } from '@/lib/api';
import { Admin, Bank } from '@/types';

interface LoginCredentials {
  username: string;
  password: string;
  bankId: string;
}

interface FaceLoginData {
  faceImage: string;
  bankId: string;
}

interface LoginResponse {
  admin: Admin;
  bank: Bank;
  message: string;
}

/**
 * Authentication API Hook
 * Handles all authentication-related API calls
 */
export const useAuthApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Login with username and password
   */
  const loginWithPassword = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/api/auth/${credentials.bankId}/login`, {
        username: credentials.username,
        password: credentials.password,
      });

      setLoading(false);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Login with face recognition
   */
  const loginWithFace = async (data: FaceLoginData): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.post(`/api/auth/${data.bankId}/face-login`, {
        faceImage: data.faceImage,
      });

      setLoading(false);
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Face login failed';
      setError(errorMessage);
      setLoading(false);
      throw new Error(errorMessage);
    }
  };

  /**
   * Logout
   */
  const logout = async (bankId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await api.post(`/api/auth/${bankId}/logout`);
      setLoading(false);
    } catch (err: any) {
      console.error('Logout error:', err);
      setLoading(false);
      // Don't throw - logout should always succeed on client side
    }
  };

  /**
   * Verify current session
   */
  const verifySession = async (): Promise<{ admin: Admin; bank: Bank } | null> => {
    try {
      const response = await api.get('/api/auth/verify');
      return response.data;
    } catch (err) {
      return null;
    }
  };

  /**
   * Refresh access token
   */
  const refreshToken = async (): Promise<boolean> => {
    try {
      await api.post('/api/auth/refresh');
      return true;
    } catch (err) {
      return false;
    }
  };

  /**
   * Check if user is authenticated
   */
  const checkAuth = async (): Promise<boolean> => {
    try {
      const session = await verifySession();
      return session !== null;
    } catch (err) {
      return false;
    }
  };

  return {
    loginWithPassword,
    loginWithFace,
    logout,
    verifySession,
    refreshToken,
    checkAuth,
    loading,
    error,
    clearError: () => setError(null),
  };
};







