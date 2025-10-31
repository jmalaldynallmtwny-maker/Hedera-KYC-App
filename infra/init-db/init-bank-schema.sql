-- ===================================
-- Bank Database Schema Initialization
-- ===================================
-- This script creates the unified schema for all bank databases
-- Must be run after database creation (01-create-all-databases.sql)

-- ===================================
-- Enable Required Extensions
-- ===================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===================================
-- Admins Table
-- ===================================
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bank_id VARCHAR(100) NOT NULL,
    face_enrolled BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Admin Faces Table (Face Recognition)
-- ===================================
CREATE TABLE IF NOT EXISTS admin_faces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    enc_embedding TEXT NOT NULL,
    iv TEXT NOT NULL,
    tag TEXT NOT NULL,
    dims INTEGER NOT NULL,
    embedding_hash VARCHAR(255),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Sessions Table (Authentication)
-- ===================================
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    bank_id VARCHAR(100) NOT NULL,
    refresh_token TEXT,
    is_active BOOLEAN DEFAULT true,
    user_agent VARCHAR(500),
    ip_address VARCHAR(50),
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP
);

-- ===================================
-- Pending Requests Table (KYC Requests)
-- ===================================
CREATE TABLE IF NOT EXISTS pending_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_nni_hash VARCHAR(255) NOT NULL,
    masked_nni VARCHAR(255) NOT NULL,
    payload_summary JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'PENDING',
    summary_hash VARCHAR(255),
    salt_ref VARCHAR(255),
    voting_deadline TIMESTAMP NOT NULL,
    image_urls JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Votes Table
-- ===================================
CREATE TABLE IF NOT EXISTS votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID NOT NULL,
    bank_id VARCHAR(100) NOT NULL,
    admin_id UUID NOT NULL,
    vote VARCHAR(50) NOT NULL,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(request_id, bank_id, admin_id),
    FOREIGN KEY (admin_id) REFERENCES admins(id),
    FOREIGN KEY (request_id) REFERENCES pending_requests(id)
);

-- ===================================
-- Hedera Proofs Table (Blockchain Proofs)
-- ===================================
CREATE TABLE IF NOT EXISTS hedera_proofs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_id UUID UNIQUE NOT NULL,
    summary_hash VARCHAR(255) NOT NULL,
    topic_message_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (request_id) REFERENCES pending_requests(id)
);

-- ===================================
-- Audit Logs Table
-- ===================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(255) NOT NULL,
    meta_hash VARCHAR(255) NOT NULL,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Users Table (Bank Customers)
-- ===================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    citizen_ref VARCHAR(255),
    bank_id VARCHAR(100) NOT NULL,
    activated_at TIMESTAMP,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===================================
-- Create Indexes for Performance
-- ===================================

-- Admin Faces Indexes
CREATE INDEX IF NOT EXISTS idx_admin_faces_admin_id ON admin_faces(admin_id);

-- Sessions Indexes
CREATE INDEX IF NOT EXISTS idx_sessions_admin_id ON sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_sessions_is_active ON sessions(is_active);
CREATE INDEX IF NOT EXISTS idx_sessions_last_activity ON sessions(last_activity);
CREATE INDEX IF NOT EXISTS idx_sessions_bank_id ON sessions(bank_id);

-- Pending Requests Indexes
CREATE INDEX IF NOT EXISTS idx_pending_requests_status ON pending_requests(status);
CREATE INDEX IF NOT EXISTS idx_pending_requests_created_at ON pending_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_pending_requests_nni_hash ON pending_requests(citizen_nni_hash);
CREATE INDEX IF NOT EXISTS idx_pending_requests_voting_deadline ON pending_requests(voting_deadline);

-- Votes Indexes
CREATE INDEX IF NOT EXISTS idx_votes_request_id ON votes(request_id);
CREATE INDEX IF NOT EXISTS idx_votes_bank_id ON votes(bank_id);
CREATE INDEX IF NOT EXISTS idx_votes_admin_id ON votes(admin_id);

-- Audit Logs Indexes
CREATE INDEX IF NOT EXISTS idx_audit_logs_event_type ON audit_logs(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- Users Indexes
CREATE INDEX IF NOT EXISTS idx_users_bank_id ON users(bank_id);
CREATE INDEX IF NOT EXISTS idx_users_citizen_ref ON users(citizen_ref);
CREATE INDEX IF NOT EXISTS idx_users_activated_at ON users(activated_at);

-- ===================================
-- Create Triggers for Updated_At
-- ===================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for admins table
DROP TRIGGER IF EXISTS update_admins_updated_at ON admins;
CREATE TRIGGER update_admins_updated_at 
    BEFORE UPDATE ON admins
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for pending_requests table
DROP TRIGGER IF EXISTS update_pending_requests_updated_at ON pending_requests;
CREATE TRIGGER update_pending_requests_updated_at 
    BEFORE UPDATE ON pending_requests
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- Summary
-- ===================================
SELECT 'Bank database schema initialized successfully!' as status;
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
    AND table_type = 'BASE TABLE'
ORDER BY table_name;
