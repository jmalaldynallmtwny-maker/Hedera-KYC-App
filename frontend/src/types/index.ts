// Core Types
export interface Bank {
  id: string;
  name: string;
  theme: BankTheme;
  logo: string;
  databaseUrl: string;
}

export interface BankTheme {
  primary: string;
  accent: string;
  name: string;
  logo: string;
  gradient: string;
  textColor: string;
  badgeColor: string;
}

export interface Citizen {
  id: string;
  nni_masked: string;
  given_name: string;
  family_name: string;
  full_name: string;
  birthdate: string;
  gender: string;
  place_of_birth: string;
  phone_number: string;
  created_at: string;
}

export interface KYCRequest {
  id: string;
  citizen_ref: string;
  masked_nni: string;
  payload_summary: KYCPayload;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  summaryHash?: string;
  salt_ref?: string;
  voting_deadline: string;
  created_at: string;
  updated_at: string;
  votes: Vote[];
  voteSummary?: {
    total: number;
    approved: number;
    rejected: number;
    pending: number;
  };
}

export interface KYCPayload {
  occupation: string;
  employer_name?: string;
  source_of_funds: string;
  estimated_monthly_income: string;
  account_purpose: string;
  is_pep: boolean;
  consent: boolean;
  audio_transcript?: string;
}

export interface Vote {
  id: string;
  requestId: string;
  bankId: string;
  adminId: string;
  vote: 'APPROVE' | 'REJECT';
  reason?: string;
  createdAt: string;
  admin?: {
    username: string;
  };
}

export interface Admin {
  id: string;
  username: string;
  bankId: string;
  faceEnrolled: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface FaceEmbedding {
  enc: string;
  iv: string;
  tag: string;
  dims: number;
}

export interface FaceMatchResult {
  match: boolean;
  score: number;
  bestMatch?: {
    score: number;
    embeddingId: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface LookupResponse {
  found: boolean;
  citizen?: Citizen;
}

export interface KYCRequestResponse {
  requestId: string;
  status: string;
  statusToken: string;
  votingDeadline: string;
  summaryHash: string;
}

export interface StatusResponse {
  requestId: string;
  status: string;
  counts: {
    approved: number;
    rejected: number;
    pending: number;
  };
  votes: Vote[];
  summaryHash?: string;
  createdAt: string;
  votingDeadline: string;
  payloadSummary?: KYCPayload;
}

export interface DashboardStats {
  pending: number;
  approved: number;
  rejected: number;
  totalUsers: number;
  totalRequests: number;
}

export interface VoteDistribution {
  vote: 'APPROVE' | 'REJECT';
  _count: {
    vote: number;
  };
}

// Form Types
export interface KYCFormData {
  nni: string;
  occupation: string;
  employer_name?: string;
  source_of_funds: string;
  estimated_monthly_income: string;
  account_purpose: string;
  is_pep: boolean;
  consent: boolean;
}

export interface LoginFormData {
  username: string;
  password: string;
  bankId: string;
}

export interface VoteFormData {
  vote: 'APPROVE' | 'REJECT';
  reason?: string;
}

// Component Props
export interface BankCardProps {
  bank: Bank;
  onClick: (bankId: string) => void;
  isSelected?: boolean;
}

export interface StatusBadgeProps {
  status: KYCRequest['status'];
  size?: 'sm' | 'md' | 'lg';
}

export interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onError: (error: string) => void;
  qualityThreshold?: number;
  maxCaptures?: number;
}

export interface FaceQualityIndicatorProps {
  quality: number;
  isActive: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscript: (transcript: string) => void;
  maxDuration?: number;
}

// Pagination Types
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Filter Types
export interface RequestFilters {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED';
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  bankId?: string;
}

// Export Types
export interface ExportOptions {
  format: 'csv' | 'pdf' | 'xlsx';
  filters: RequestFilters;
  includeSensitive: boolean;
}
