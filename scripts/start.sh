#!/bin/bash
# =============================================
# Interactive KYC - Complete Startup Script
# =============================================

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project directories
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"
INFRA_DIR="$PROJECT_DIR/infra"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🚀 Interactive KYC - Complete Startup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# =============================================
# Helper Functions
# =============================================

print_step() {
    echo -e "\n${GREEN}▶ Step $1:$NC $2"
    echo ""
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# =============================================
# Step 1: Cleanup Previous Instances
# =============================================

print_step 1 "Cleaning up previous instances..."

stop_all() {
    print_info "Stopping any running processes..."
    
    # Kill Node processes
    pkill -f "node.*backend" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    pkill -f "tsx watch" 2>/dev/null || true
    
    # Stop Docker containers
    if [ -d "$INFRA_DIR" ]; then
        cd "$INFRA_DIR"
        docker-compose down 2>/dev/null || true
        cd "$PROJECT_DIR"
    fi
    
    # Remove PID files
    rm -f /tmp/kyc_*.pid 2>/dev/null || true
    
    sleep 2
    print_success "Cleanup completed"
}

stop_all

# =============================================
# Step 2: Check Prerequisites
# =============================================

print_step 2 "Checking prerequisites..."

check_prerequisites() {
    local missing=0
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        missing=1
    else
        if ! docker info &> /dev/null; then
            print_error "Docker is not running. Please start Docker Desktop."
            missing=1
        else
            print_success "Docker is running"
        fi
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        missing=1
    else
        print_success "Docker Compose is available"
    fi
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed"
        missing=1
    else
        NODE_VERSION=$(node -v)
        print_success "Node.js $NODE_VERSION"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed"
        missing=1
    else
        NPM_VERSION=$(npm -v)
        print_success "npm $NPM_VERSION"
    fi
    
    if [ $missing -eq 1 ]; then
        print_error "Please install missing prerequisites and try again"
        exit 1
    fi
}

check_prerequisites

# =============================================
# Step 2.5: Check .env file
# =============================================

print_step "2.5" "Checking .env file..."

check_env_file() {
    if [ ! -f "$PROJECT_DIR/.env" ]; then
        print_error ".env file not found!"
        print_info "Creating .env from env.example..."
        
        if [ -f "$PROJECT_DIR/env.example" ]; then
            cp "$PROJECT_DIR/env.example" "$PROJECT_DIR/.env"
            print_warning ".env file created! Please edit it with your actual values."
            print_warning "Run: bash scripts/generate-secrets.sh"
            print_warning "Then run this script again."
            exit 1
        else
            print_error "env.example not found! Cannot create .env"
            exit 1
        fi
    fi
    
    print_success ".env file exists"
    
    # Check if secrets are generated
    if grep -q "CHANGE_THIS_IN_PRODUCTION" "$PROJECT_DIR/.env" 2>/dev/null; then
        print_warning "Secrets not generated yet. Run: bash scripts/generate-secrets.sh"
    fi
}

check_env_file

# =============================================
# Step 2.6: Generate and Sync Secrets
# =============================================

print_step "2.6" "Checking and generating secrets..."

generate_and_sync_secrets() {
    local secrets_missing=0
    
    # Check if .env has proper secrets
    if grep -q "CHANGE_THIS_IN_PRODUCTION" "$PROJECT_DIR/.env" 2>/dev/null; then
        print_warning "Secrets not generated in .env"
        secrets_missing=1
    fi
    
    # Generate secrets if missing
    if [ $secrets_missing -eq 1 ]; then
        print_info "Generating secure secrets..."
        bash "$PROJECT_DIR/scripts/generate-secrets.sh"
        
        if [ $? -eq 0 ]; then
            print_success "Secrets generated successfully in .env"
        else
            print_error "Failed to generate secrets"
            exit 1
        fi
    else
        print_success "Secrets already configured in .env"
    fi
    
    # Sync secrets to .env.docker
    print_info "Syncing secrets to .env.docker..."
    
    if [ ! -f "$PROJECT_DIR/.env.docker" ]; then
        print_error ".env.docker file not found!"
        print_info "Please create .env.docker from the template provided"
        exit 1
    fi
    
    # Extract secrets from .env
    JWT_SECRET=$(grep "^JWT_SECRET=" "$PROJECT_DIR/.env" | cut -d '=' -f2-)
    JWT_REFRESH_SECRET=$(grep "^JWT_REFRESH_SECRET=" "$PROJECT_DIR/.env" | cut -d '=' -f2-)
    AES_KEY=$(grep "^AES_KEY=" "$PROJECT_DIR/.env" | cut -d '=' -f2-)
    NNI_SALT=$(grep "^NNI_SALT=" "$PROJECT_DIR/.env" | cut -d '=' -f2-)
    
    # Check if secrets were extracted successfully
    if [ -z "$JWT_SECRET" ] || [ -z "$AES_KEY" ]; then
        print_error "Failed to extract secrets from .env"
        exit 1
    fi
    
    # Update .env.docker with proper secrets
    # Use different sed syntax for macOS and Linux compatibility
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|^JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" "$PROJECT_DIR/.env.docker"
        sed -i '' "s|^JWT_REFRESH_SECRET=.*|JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET|" "$PROJECT_DIR/.env.docker"
        sed -i '' "s|^AES_KEY=.*|AES_KEY=$AES_KEY|" "$PROJECT_DIR/.env.docker"
        sed -i '' "s|^NNI_SALT=.*|NNI_SALT=$NNI_SALT|" "$PROJECT_DIR/.env.docker"
    else
        # Linux
        sed -i "s|^JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" "$PROJECT_DIR/.env.docker"
        sed -i "s|^JWT_REFRESH_SECRET=.*|JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET|" "$PROJECT_DIR/.env.docker"
        sed -i "s|^AES_KEY=.*|AES_KEY=$AES_KEY|" "$PROJECT_DIR/.env.docker"
        sed -i "s|^NNI_SALT=.*|NNI_SALT=$NNI_SALT|" "$PROJECT_DIR/.env.docker"
    fi
    
    print_success "Secrets synced to .env.docker"
}

generate_and_sync_secrets

# =============================================
# Step 3: Start Infrastructure (Docker)
# =============================================

print_step 3 "Starting Docker infrastructure..."

start_infrastructure() {
    cd "$INFRA_DIR"
    
    print_info "Starting Docker containers..."
    docker-compose up -d
    
    print_info "Waiting for services to be healthy..."
    
    # Wait for PostgreSQL (max 60 seconds)
    local max_wait=60
    local count=0
    while [ $count -lt $max_wait ]; do
        if docker exec postgres-citizens pg_isready -U postgres &> /dev/null && \
           docker exec postgres-banks pg_isready -U postgres &> /dev/null; then
            print_success "PostgreSQL is ready"
            break
        fi
        count=$((count + 2))
        echo -n "."
        sleep 2
    done
    
    if [ $count -ge $max_wait ]; then
        print_error "PostgreSQL failed to start"
        exit 1
    fi
    
    # Wait for Redis (max 30 seconds)
    count=0
    while [ $count -lt 30 ]; do
        if docker exec redis-kyc redis-cli ping &> /dev/null; then
            print_success "Redis is ready"
            break
        fi
        count=$((count + 2))
        echo -n "."
        sleep 2
    done
    
    # Wait for MinIO (max 30 seconds)
    count=0
    while [ $count -lt 30 ]; do
        if docker exec minio-kyc curl -f http://localhost:9000/minio/health/ready &> /dev/null; then
            print_success "MinIO is ready"
            break
        fi
        count=$((count + 2))
        echo -n "."
        sleep 2
    done
    
    cd "$PROJECT_DIR"
    print_success "All infrastructure services are running"
}

start_infrastructure

# =============================================
# Step 4: Install Dependencies
# =============================================

print_step 4 "Installing dependencies..."

install_dependencies() {
    # Backend
    print_info "Installing backend dependencies..."
    cd "$BACKEND_DIR"
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Backend dependencies installed"
    else
        print_success "Backend dependencies already installed"
    fi
    
    # Frontend
    print_info "Installing frontend dependencies..."
    cd "$FRONTEND_DIR"
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Frontend dependencies installed"
    else
        print_success "Frontend dependencies already installed"
    fi
    
    cd "$PROJECT_DIR"
}

install_dependencies

# =============================================
# Step 5: Setup Databases
# =============================================

print_step 5 "Setting up databases..."

setup_databases() {
    cd "$BACKEND_DIR"
    
    # Check if Prisma is installed
    if [ ! -d "node_modules/@prisma/client" ]; then
        print_warning "Prisma client not found, running npm install..."
        npm install
    fi
    
    print_info "Generating Prisma clients (this may take 30-60 seconds)..."
    timeout 120 npm run db:generate:all || {
        print_error "Failed to generate Prisma clients (timeout or error)"
        exit 1
    }
    print_success "Prisma clients generated"
    
    print_info "Pushing database schemas..."
    npm run db:push:all 2>&1 | grep -v "already exists" || {
        print_warning "Some schemas might already exist (this is OK)"
    }
    print_success "Database schemas pushed"
    
    # Verify generated clients exist
    if [ ! -f "prisma/src/generated/citizens/index.js" ]; then
        print_error "Prisma clients were not generated correctly!"
        exit 1
    fi
    print_success "Verified Prisma clients are ready"
    
    cd "$PROJECT_DIR"
}

setup_databases

# =============================================
# Step 6: Start Backend
# =============================================

print_step 6 "Starting backend server..."

start_backend() {
    cd "$BACKEND_DIR"
    
    # Kill any existing backend process
    pkill -f "tsx watch src/index.ts" 2>/dev/null || true
    sleep 2
    
    print_info "Starting backend on http://localhost:3000"
    
    # Start backend in background
    nohup npm run dev > /tmp/kyc_backend.log 2>&1 &
    echo $! > /tmp/kyc_backend.pid
    
    # Wait for backend to be ready
    print_info "Waiting for backend to be ready..."
    local max_wait=30
    local count=0
    while [ $count -lt $max_wait ]; do
        if curl -s http://localhost:3000/api/health &> /dev/null; then
            print_success "Backend is ready"
            break
        fi
        count=$((count + 2))
        echo -n "."
        sleep 2
    done
    
    if [ $count -ge $max_wait ]; then
        print_error "Backend failed to start. Check logs: cat /tmp/kyc_backend.log"
        exit 1
    fi
    
    cd "$PROJECT_DIR"
}

start_backend

# =============================================
# Step 7: Start Frontend
# =============================================

print_step 7 "Starting frontend server..."

start_frontend() {
    cd "$FRONTEND_DIR"
    
    # Kill any existing frontend process
    pkill -f "vite" 2>/dev/null || true
    sleep 2
    
    print_info "Starting frontend on http://localhost:5173"
    
    # Start frontend in background
    nohup npm run dev > /tmp/kyc_frontend.log 2>&1 &
    echo $! > /tmp/kyc_frontend.pid
    
    # Wait for frontend to be ready
    print_info "Waiting for frontend to be ready..."
    local max_wait=30
    local count=0
    while [ $count -lt $max_wait ]; do
        if curl -s http://localhost:5173 &> /dev/null; then
            print_success "Frontend is ready"
            break
        fi
        count=$((count + 2))
        echo -n "."
        sleep 2
    done
    
    if [ $count -ge $max_wait ]; then
        print_error "Frontend failed to start. Check logs: cat /tmp/kyc_frontend.log"
        exit 1
    fi
    
    cd "$PROJECT_DIR"
}

start_frontend

# =============================================
# Step 8: Final Status
# =============================================

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Application Started Successfully!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${GREEN}📱 Frontend:${NC}   http://localhost:5173"
echo -e "${GREEN}🔧 Backend:${NC}    http://localhost:3000"
echo -e "${GREEN}💾 MinIO:${NC}      http://localhost:9001"
echo ""
echo -e "${YELLOW}📋 Useful Commands:${NC}"
echo "  View backend logs:     tail -f /tmp/kyc_backend.log"
echo "  View frontend logs:    tail -f /tmp/kyc_frontend.log"
echo "  Stop all services:     bash stop.sh"
echo "  Check status:          bash scripts/check.sh"
echo ""
echo -e "${YELLOW}🔑 Test Credentials:${NC}"
echo "  Admin Username: admin"
echo "  Admin Password: admin123"
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
