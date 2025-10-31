// ===================================
// Shared Database Types
// ===================================
// These types represent the common structure across all bank databases

/**
 * Generic Prisma operation types for bank databases
 */
export type PrismaFindUnique<T> = (args: any) => Promise<T | null>;
export type PrismaFindMany<T> = (args: any) => Promise<T[]>;
export type PrismaCreate<T> = (args: any) => Promise<T>;
export type PrismaUpdate<T> = (args: any) => Promise<T>;
export type PrismaDelete<T> = (args: any) => Promise<T>;

/**
 * Common Admin structure across all banks
 */
export interface Admin {
  id: string;
  username: string;
  password_hash: string;
  bank_id: string;
  face_enrolled: boolean;
  last_login: Date | null;
  created_at: Date;
  updated_at: Date;
}

/**
 * Common AdminFace structure
 */
export interface AdminFace {
  id: string;
  admin_id: string;
  enc_embedding: string;
  iv: string;
  tag: string;
  dims: number;
  embedding_hash: string | null;
  enrolled_at: Date;
}

/**
 * Common PendingRequest structure
 */
export interface PendingRequest {
  id: string;
  citizen_nni_hash: string;
  masked_nni: string;
  payload_summary: any; // JSON
  status: string;
  summary_hash: string | null;
  salt_ref: string | null;
  voting_deadline: Date;
  image_urls: any | null; // JSON
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  deleted_by?: string | null;
  votes?: Vote[];
  hedera_proofs?: HederaProof[];
}

/**
 * Common Vote structure
 */
export interface Vote {
  id: string;
  request_id: string;
  bank_id: string;
  admin_id: string;
  vote: string;
  reason: string | null;
  created_at: Date;
}

/**
 * Common HederaProof structure
 */
export interface HederaProof {
  id: string;
  request_id: string;
  summary_hash: string;
  topic_message_id: string;
  created_at: Date;
}

/**
 * Common AuditLog structure
 */
export interface AuditLog {
  id: string;
  event_type: string;
  meta_hash: string;
  details: any | null; // JSON
  created_at: Date;
}

/**
 * Common User structure
 */
export interface User {
  id: string;
  citizen_ref: string | null;
  bank_id: string;
  activated_at: Date | null;
  metadata: any | null; // JSON
  created_at: Date;
}

/**
 * Common Session structure
 */
export interface Session {
  id: string;
  admin_id: string;
  bank_id: string;
  refresh_token: string | null;
  is_active: boolean;
  user_agent: string | null;
  ip_address: string | null;
  last_activity: Date;
  created_at: Date;
  ended_at: Date | null;
}

/**
 * Generic Bank Database Interface
 * Represents the common interface all bank Prisma clients should have
 */
export interface BankDatabase {
  admin: {
    findUnique: PrismaFindUnique<Admin>;
    findMany: PrismaFindMany<Admin>;
    create: PrismaCreate<Admin>;
    update: PrismaUpdate<Admin>;
    delete: PrismaDelete<Admin>;
  };
  adminFace: {
    findMany: PrismaFindMany<AdminFace>;
    create: PrismaCreate<AdminFace>;
    deleteMany: (args: any) => Promise<{ count: number }>;
  };
  pendingRequest: {
    findUnique: PrismaFindUnique<PendingRequest>;
    findMany: PrismaFindMany<PendingRequest>;
    create: PrismaCreate<PendingRequest>;
    update: PrismaUpdate<PendingRequest>;
  };
  vote: {
    findMany: PrismaFindMany<Vote>;
    create: PrismaCreate<Vote>;
    count: (args: any) => Promise<number>;
  };
  hederaProof: {
    findFirst: PrismaFindUnique<HederaProof>;
    create: PrismaCreate<HederaProof>;
  };
  auditLog: {
    create: PrismaCreate<AuditLog>;
  };
  user: {
    create: PrismaCreate<User>;
    findMany: PrismaFindMany<User>;
  };
  session: {
    findMany: PrismaFindMany<Session>;
    create: PrismaCreate<Session>;
    update: PrismaUpdate<Session>;
    deleteMany: (args: any) => Promise<{ count: number }>;
  };
  $queryRaw: (query: any, ...args: any[]) => Promise<any>;
  $queryRawUnsafe: (query: string, ...args: any[]) => Promise<any>;
}

/**
 * Citizen Database Interface
 */
export interface Citizen {
  id: string;
  nni_index: string;
  nni_masked: string | null;
  given_name: string | null;
  family_name: string | null;
  full_name: string | null;
  gender: string | null;
  birthdate: Date | null;
  place_of_birth: string | null;
  phone_number: string | null;
  metadata: any | null;
  created_at: Date;
  updated_at: Date;
}

