// Application constants
export const APP_CONFIG = {
  name: 'Interactive KYC',
  version: '1.0.0',
  description: 'Multi-Bank KYC Verification Platform',
  supportEmail: 'support@kyc-platform.com',
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxAudioDuration: 30, // 30 seconds
  pollingInterval: 10000, // 10 seconds
  sessionTimeout: 60 * 60 * 1000, // 1 hour
};

// KYC Constants
export const KYC_CONFIG = {
  occupations: [
    'Farmer',
    'Teacher',
    'Merchant',
    'Government Employee',
    'Fisherman',
    'Healthcare Worker',
    'Engineer',
    'Student',
    'Business Owner',
    'Other'
  ],
  sourcesOfFunds: [
    'Salary',
    'Business',
    'Agriculture',
    'Fishing',
    'Investments',
    'Inheritance',
    'Other'
  ],
  incomeRanges: [
    '< 50,000 MRU',
    '50,000 - 100,000 MRU',
    '100,000 - 200,000 MRU',
    '200,000 - 500,000 MRU',
    '> 500,000 MRU'
  ],
  accountPurposes: [
    'Personal Savings',
    'Business Transactions',
    'Salary Account',
    'Investment',
    'Emergency Funds',
    'Other'
  ]
};

// Face Recognition Constants
export const FACE_CONFIG = {
  similarityThreshold: 0.90,
  embeddingDims: 128, // face-api.js uses 128-dimensional embeddings
  minFaceDetectionConfidence: 0.5,
  minFacePresenceConfidence: 0.5,
  maxCaptures: 5,
  qualityThreshold: 0.7, // Lowered for better UX
  
  // Model settings
  modelPath: '/models',
  inputSize: 416,
  scoreThreshold: 0.5,
  
  // Liveness detection
  livenessRequired: true,
  livenessThreshold: 0.75,
  
  // Performance
  captureDelay: 500,
  maxRetries: 3,
};

// API Configuration
export const API_CONFIG = {
  baseURL: '/api',
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  CURRENT_BANK: 'current_bank',
  USER_TYPE: 'user_type',
  FACE_EMBEDDINGS: 'face_embeddings',
  RECENT_SEARCHES: 'recent_searches'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection and try again.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FACE_DETECTION_ERROR: 'Face detection failed. Please ensure good lighting and try again.',
  AUDIO_RECORDING_ERROR: 'Audio recording failed. Please check your microphone permissions.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  KYC_SUBMITTED: 'KYC request submitted successfully!',
  VOTE_SUBMITTED: 'Vote submitted successfully!',
  FACE_ENROLLED: 'Face enrolled successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  EXPORT_GENERATED: 'Export generated successfully!'
};
