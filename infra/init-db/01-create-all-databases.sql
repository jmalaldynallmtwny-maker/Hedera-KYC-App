-- ===================================
-- Create All Databases - Idempotent Version
-- ===================================
-- This script creates all required databases for the KYC platform
-- Compatible with Docker init scripts and can be run multiple times safely

-- Note: We use a simpler approach compatible with PostgreSQL 15
-- The script will only create databases if they don't exist

\set ON_ERROR_STOP off

-- Create citizens database
SELECT 'CREATE DATABASE citizens_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'citizens_db')\gexec

-- Create bank databases
SELECT 'CREATE DATABASE baybank_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'baybank_db')\gexec

SELECT 'CREATE DATABASE oasisbank_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'oasisbank_db')\gexec

SELECT 'CREATE DATABASE zenbank_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'zenbank_db')\gexec

SELECT 'CREATE DATABASE arcbank_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'arcbank_db')\gexec

SELECT 'CREATE DATABASE nexbank_db'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'nexbank_db')\gexec

\set ON_ERROR_STOP on

-- Report created databases
\echo '================================='
\echo 'Database initialization complete'
\echo '================================='
\echo 'Available databases:'
SELECT datname FROM pg_database WHERE datname LIKE '%bank%' OR datname = 'citizens_db' ORDER BY datname;
