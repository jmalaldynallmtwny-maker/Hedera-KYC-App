import axios from 'axios';
import { 
  LookupResponse, 
  StatusResponse,
  KYCRequest,
  DashboardStats,
  VoteDistribution,
  FaceMatchResult
} from '@/types';
import { API_CONFIG } from '@/constants/app';
import { getErrorMessage } from '@/utils/typeGuards';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
  timeout: API_CONFIG.timeout,
});

// Helper function to get CSRF token from cookie
function getCsrfTokenFromCookie(): string | null {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_csrf') {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Add CSRF token to state-changing requests
    if (
      config.method && 
      ['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())
    ) {
      try {
        // Try to get CSRF token from cookie first (faster)
        let csrfToken = getCsrfTokenFromCookie();
        
        // If not in cookie, fetch from server
        if (!csrfToken) {
          const response = await axios.get('/api/csrf-token', {
            baseURL: config.baseURL,
            withCredentials: true
          });
          csrfToken = response.data.csrfToken;
        }
        
        // Add CSRF token to headers
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }
      } catch (error: unknown) {
        const message = getErrorMessage(error);
        console.warn('Failed to get CSRF token:', message);
        // Continue anyway - server will reject if CSRF is required
      }
    }
    
    // Add timestamp to avoid caching
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Track if we're currently refreshing to avoid multiple simultaneous refresh requests
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

// Response interceptor with retry logic and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 errors (unauthorized) - try token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't try to refresh on auth endpoints
      if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/refresh')) {
        return Promise.reject(error);
      }
      
      if (isRefreshing) {
        // Wait for the current refresh to complete
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        await api.post('/api/auth/refresh');
        
        // Token refreshed successfully, retry original request
        isRefreshing = false;
        processQueue();
        return api(originalRequest);
      } catch (refreshError: unknown) {
        // Refresh failed, redirect to login
        isRefreshing = false;
        processQueue(refreshError);
        
        // Only redirect if not already on login page
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/admin-login')) {
          window.location.href = '/';
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle 500 errors with exponential backoff retry
    if (error.response?.status >= 500) {
      const retryCount = originalRequest._retryCount || 0;
      
      if (retryCount < 2) {
        originalRequest._retryCount = retryCount + 1;
        const delay = Math.min(1000 * Math.pow(2, retryCount), 3000);
        
        return new Promise((resolve) => {
          setTimeout(() => resolve(api(originalRequest)), delay);
        });
      }
    }
    
    return Promise.reject(error);
  }
);

// KYC API
export interface KYCPayload {
  fullName: string;
  birthdate: string;
  phone: string;
  address: string;
  [key: string]: unknown;
}

export interface KYCRequestResponse {
  success: boolean;
  requestId: string;
  status: string;
  statusToken: string;
  votingDeadline: string;
  summaryHash: string;
  error?: string;
}

export const kycApi = {
  lookup: (nni: string): Promise<{ data: LookupResponse }> => 
    api.post('/api/kyc/lookup', { nni }),

  create: (data: {
    masked_nni: string;
    payload_summary: KYCPayload;
    images: string[];
    bankId: string;
  }): Promise<{ data: { success: boolean; requestId: string; status: string; statusToken: string; votingDeadline: string; summaryHash: string; error?: string } }> => 
    api.post('/api/kyc', data),

  getStatus: (requestId: string, bankId: string): Promise<{ data: StatusResponse }> => 
    api.get(`/api/kyc/${requestId}?bankId=${bankId}`),
};

// Auth API
export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    admin: {
      adminId: string;
      username: string;
      bankId: string;
      faceEnrolled: boolean;
    };
    bank: any;
  };
  error?: string;
}

export interface AdminInfo {
  adminId: string;
  username: string;
  bankId: string;
  faceEnrolled: boolean;
}

export interface FaceEmbedding {
  enc_embedding: string;
  iv: string;
  tag: string;
  dims: number;
}

export const authApi = {
  login: (data: { username: string; password: string; bankId: string }): Promise<{ data: LoginResponse }> => 
    api.post('/auth/login', data),

  logout: (): Promise<{ data: { success: boolean } }> => 
    api.post('/auth/logout'),

  getMe: (): Promise<{ data: AdminInfo }> => 
    api.get('/auth/me'),

  enrollFace: (bankId: string, data: { adminId: string; embeddings: FaceEmbedding[] }): Promise<{ data: { success: boolean; message: string } }> =>
    api.post(`/auth/${bankId}/enroll-face`, data),

  verifyFace: (bankId: string, data: { adminId: string; probeEmbedding: FaceEmbedding }): Promise<{ data: FaceMatchResult }> =>
    api.post(`/auth/${bankId}/verify-face`, data),
};

// Admin API
export interface RequestFilters {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export const adminApi = {
  getDashboard: (bankId: string): Promise<{ data: { stats: DashboardStats; voteDistribution: VoteDistribution[]; recentActivity: RecentActivity[] } }> => 
    api.get(`/admin/${bankId}/dashboard`),

  getRequests: (bankId: string, params: RequestFilters): Promise<{ data: { requests: KYCRequest[]; pagination: PaginationInfo } }> => 
    api.get(`/admin/${bankId}/requests`, { params }),

  getRequestDetails: (bankId: string, requestId: string): Promise<{ data: { request: KYCRequest } }> =>
    api.get(`/admin/${bankId}/requests/${requestId}`),

  vote: (bankId: string, requestId: string, data: { vote: 'APPROVE' | 'REJECT'; reason?: string }): Promise<{ data: { success: boolean; message: string } }> =>
    api.post(`/admin/${bankId}/review/${requestId}/vote`, data),
};

// ASR API
export const asrApi = {
  transcribe: (audioFile: File): Promise<{ data: { jobId: string; status: string } }> => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    return api.post('/asr/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getTranscript: (jobId: string): Promise<{ data: { transcript: string; confidence: number; language: string } }> =>
    api.get(`/asr/transcribe/${jobId}`),
};

// LLM API
export interface LLMQueryParams {
  mode: 'nl2sql' | 'nav' | 'export';
  text: string;
  context?: Record<string, unknown>;
}

export interface LLMQueryResponse {
  result: string | Record<string, unknown>;
  confidence?: number;
  reasoning?: string;
}

export const llmApi = {
  query: (data: LLMQueryParams): Promise<{ data: LLMQueryResponse }> =>
    api.post('/llm/query', data),
};

// Health API
export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  services: Record<string, boolean>;
}

export const healthApi = {
  check: (): Promise<{ data: HealthCheckResponse }> => 
    api.get('/health'),
};

// Export function to handle API errors consistently
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.response?.data?.error || error.message;
    
    switch (error.response?.status) {
      case 400:
        return message || 'Invalid request. Please check your input.';
      case 401:
        return 'Your session has expired. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return message || 'An unexpected error occurred.';
    }
  }
  
  return 'Network error. Please check your connection and try again.';
};

export { api };
export default api;
