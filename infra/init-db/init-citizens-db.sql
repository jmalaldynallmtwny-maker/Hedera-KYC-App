-- ===================================
-- Citizens Database Initialization
-- ===================================
-- This script initializes the citizens database with schema and demo data

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create citizens table
CREATE TABLE IF NOT EXISTS citizens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nni_index VARCHAR(255) UNIQUE NOT NULL,
    nni_masked VARCHAR(255),
    given_name VARCHAR(255),
    family_name VARCHAR(255),
    full_name VARCHAR(255),
    gender VARCHAR(50),
    birthdate DATE,
    place_of_birth VARCHAR(255),
    phone_number VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_citizens_nni_index ON citizens(nni_index);
CREATE INDEX IF NOT EXISTS idx_citizens_created_at ON citizens(created_at);
CREATE INDEX IF NOT EXISTS idx_citizens_full_name ON citizens(full_name);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_citizens_updated_at BEFORE UPDATE ON citizens
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert demo/test data
-- Note: In production, nni_index should be properly hashed
INSERT INTO citizens (nni_index, nni_masked, given_name, family_name, full_name, gender, birthdate, place_of_birth, phone_number, metadata)
VALUES 
    (
        'hashed_nni_20010001', 
        '2001****01', 
        'Ahmed', 
        'Ould Mohamed', 
        'Ahmed Ould Mohamed', 
        'Male', 
        '1990-01-15', 
        'Nouakchott', 
        '+22212345678',
        '{"occupation": "Teacher", "nationality": "Mauritanian"}'::jsonb
    ),
    (
        'hashed_nni_20020002', 
        '2002****02', 
        'Fatima', 
        'Mint Ali', 
        'Fatima Mint Ali', 
        'Female', 
        '1995-06-20', 
        'Nouadhibou', 
        '+22212345679',
        '{"occupation": "Doctor", "nationality": "Mauritanian"}'::jsonb
    ),
    (
        'hashed_nni_20030003', 
        '2003****03', 
        'Omar', 
        'Ould Hassan', 
        'Omar Ould Hassan', 
        'Male', 
        '1988-03-10', 
        'Rosso', 
        '+22212345680',
        '{"occupation": "Merchant", "nationality": "Mauritanian"}'::jsonb
    ),
    (
        'hashed_nni_20040004', 
        '2004****04', 
        'Khadija', 
        'Mint Sidi', 
        'Khadija Mint Sidi', 
        'Female', 
        '1992-08-25', 
        'Kaedi', 
        '+22212345681',
        '{"occupation": "Engineer", "nationality": "Mauritanian"}'::jsonb
    ),
    (
        'hashed_nni_20050005', 
        '2005****05', 
        'Mohameden', 
        'Ould Ahmed', 
        'Mohameden Ould Ahmed', 
        'Male', 
        '1985-12-05', 
        'Atar', 
        '+22212345682',
        '{"occupation": "Farmer", "nationality": "Mauritanian"}'::jsonb
    )
ON CONFLICT (nni_index) DO NOTHING;

-- Log initialization
SELECT 'Citizens database initialized successfully with ' || COUNT(*) || ' demo citizens' as status
FROM citizens;
