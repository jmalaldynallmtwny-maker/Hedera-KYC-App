// frontend/src/types/api.d.ts
// هذا الملف سيعالج الأخطاء في أنواع API
import { Bank, Citizen, KYCRequest, Admin, Vote, KYCPayload } from './index';

declare global {
  interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    error?: string;
  }

  interface LookupResponse {
    found: boolean;
    citizen?: Citizen;
  }

  interface KYCRequestResponse {
    requestId: string;
    status: string;
    statusToken: string;
    votingDeadline: string;
    summaryHash: string;
  }

  interface StatusResponse {
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

  interface DashboardStats {
    pending: number;
    approved: number;
    rejected: number;
    totalUsers: number;
    totalRequests: number;
  }
}
