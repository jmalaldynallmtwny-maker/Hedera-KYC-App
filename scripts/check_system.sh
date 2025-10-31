#!/bin/bash
# System Check Script for Interactive KYC Platform

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Interactive KYC - System Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track if all checks pass
ALL_PASSED=true

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $2"
    else
        echo -e "${RED}✗${NC} $2"
        ALL_PASSED=false
    fi
}

echo "▶ Step 1: Checking Docker Containers..."
echo "──────────────────────────────────────────────────"

# Check if containers are running
POSTGRES_CITIZENS=$(docker ps | grep postgres-citizens | wc -l)
POSTGRES_BANKS=$(docker ps | grep postgres-banks | wc -l)
REDIS_RUNNING=$(docker ps | grep redis-kyc | wc -l)
MINIO_RUNNING=$(docker ps | grep minio-kyc | wc -l)
BACKEND_RUNNING=$(docker ps | grep backend-kyc | wc -l)

print_status $([ "$POSTGRES_CITIZENS" -eq 1 ] && echo 0 || echo 1) "PostgreSQL (Citizens) container"
print_status $([ "$POSTGRES_BANKS" -eq 1 ] && echo 0 || echo 1) "PostgreSQL (Banks) container"
print_status $([ "$REDIS_RUNNING" -eq 1 ] && echo 0 || echo 1) "Redis container"
print_status $([ "$MINIO_RUNNING" -eq 1 ] && echo 0 || echo 1) "MinIO container"
print_status $([ "$BACKEND_RUNNING" -eq 1 ] && echo 0 || echo 1) "Backend container"

echo ""
echo "▶ Step 2: Checking Backend Logs (Last 30 lines)..."
echo "──────────────────────────────────────────────────"

if [ "$BACKEND_RUNNING" -eq 1 ]; then
    echo "📋 Backend logs:"
    docker logs backend-kyc --tail 30
    echo ""
    
    # Check for errors
    ERRORS=$(docker logs backend-kyc 2>&1 | grep -i "error\|failed\|fatal" | tail -5)
    if [ -n "$ERRORS" ]; then
        echo -e "${RED}Errors found in backend logs:${NC}"
        echo "$ERRORS"
        ALL_PASSED=false
    else
        echo -e "${GREEN}No errors in backend logs${NC}"
    fi
else
    echo -e "${RED}Backend container not running!${NC}"
    ALL_PASSED=false
fi

echo ""
echo "▶ Step 3: Testing Service Health..."
echo "──────────────────────────────────────────────────"

# Test backend health endpoint
echo "Testing backend health..."
HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3000/api/health 2>/dev/null)
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
BODY=$(echo "$HEALTH_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "${GREEN}✓${NC} Backend health check: OK"
    echo "Response: $BODY"
else
    echo -e "${RED}✗${NC} Backend health check: FAILED (HTTP $HTTP_CODE)"
    if [ -n "$BODY" ]; then
        echo "Error: $BODY"
    fi
    ALL_PASSED=false
fi

echo ""
echo "▶ Step 4: Testing Backend Routes..."
echo "──────────────────────────────────────────────────"

# Test GET /api/health
echo "Testing GET /api/health..."
HEALTH_TEST=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)
print_status $([ "$HEALTH_TEST" -eq 200 ] && echo 0 || echo 1) "GET /api/health"

# Test database connections through backend
echo ""
echo "▶ Step 5: Checking Database Connections..."
echo "──────────────────────────────────────────────────"

# Check Citizens DB
CITIZENS_DB=$(docker exec postgres-citizens psql -U postgres -d citizens_db -c "SELECT 1;" 2>/dev/null | grep -c "1 row")
print_status $([ "$CITIZENS_DB" -ge 1 ] && echo 0 || echo 1) "Citizens Database"

# Check Banks DB
BANKS_DB=$(docker exec postgres-banks psql -U postgres -d postgres -c "SELECT 1;" 2>/dev/null | grep -c "1 row")
print_status $([ "$BANKS_DB" -ge 1 ] && echo 0 || echo 1) "Banks Database"

echo ""
echo "▶ Step 6: Checking Redis..."
echo "──────────────────────────────────────────────────"

REDIS_PING=$(docker exec redis-kyc redis-cli ping 2>/dev/null)
if [ "$REDIS_PING" = "PONG" ]; then
    print_status 0 "Redis connection"
else
    print_status 1 "Redis connection"
fi

echo ""
echo "▶ Step 7: Checking MinIO..."
echo "──────────────────────────────────────────────────"

MINIO_CHECK=$(curl -s http://localhost:9000/minio/health/live)
print_status $([ "$?" -eq 0 ] && echo 0 || echo 1) "MinIO health"

echo ""
echo "▶ Step 8: Frontend Status..."
echo "──────────────────────────────────────────────────"

FRONTEND_RUNNING=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5173)
if [ "$FRONTEND_RUNNING" -eq 200 ]; then
    echo -e "${GREEN}✓${NC} Frontend is running on http://localhost:5173"
else
    echo -e "${YELLOW}⚠${NC}  Frontend not running or not accessible"
fi

echo ""
echo "▶ Step 9: Environment Variables Check..."
echo "──────────────────────────────────────────────────"

if [ -f "../backend/.env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    
    # Check critical variables
    HAS_AES_KEY=$(grep -c "AES_KEY=" ../backend/.env 2>/dev/null)
    HAS_JWT_SECRET=$(grep -c "JWT_SECRET=" ../backend/.env 2>/dev/null)
    HAS_DATABASE_URL=$(grep -c "DATABASE_URL_CITIZENS=" ../backend/.env 2>/dev/null)
    
    print_status "$HAS_AES_KEY" "AES_KEY configured"
    print_status "$HAS_JWT_SECRET" "JWT_SECRET configured"
    print_status "$HAS_DATABASE_URL" "Database URLs configured"
else
    echo -e "${RED}✗${NC} .env file not found in backend/"
    ALL_PASSED=false
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$ALL_PASSED" = true ]; then
    echo -e "${GREEN}✅ All checks passed! System is ready.${NC}"
else
    echo -e "${RED}❌ Some checks failed. Please review the issues above.${NC}"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Show backend container status in detail
if [ "$BACKEND_RUNNING" -eq 1 ]; then
    echo "📊 Backend Container Details:"
    docker ps --filter "name=backend-kyc" --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
    echo ""
    
    echo "📝 Last 10 lines of backend logs:"
    docker logs backend-kyc --tail 10
fi

echo ""
echo "💡 To view full backend logs: docker logs backend-kyc"
echo "💡 To restart backend: docker-compose restart backend"



