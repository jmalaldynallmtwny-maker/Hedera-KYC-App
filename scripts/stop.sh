#!/bin/bash
# =============================================
# Interactive KYC - Stop Script
# =============================================

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Project directories
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INFRA_DIR="$PROJECT_DIR/infra"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}🛑 Stopping Interactive KYC Platform${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Stop Frontend
echo -e "${YELLOW}Stopping Frontend...${NC}"
if pkill -f "vite" 2>/dev/null; then
    echo -e "${GREEN}✓ Frontend stopped${NC}"
else
    echo -e "${GREEN}✓ Frontend was not running${NC}"
fi
sleep 1

# Stop Backend
echo -e "${YELLOW}Stopping Backend...${NC}"
if pkill -f "tsx watch src/index.ts" 2>/dev/null || pkill -f "node.*backend" 2>/dev/null; then
    echo -e "${GREEN}✓ Backend stopped${NC}"
else
    echo -e "${GREEN}✓ Backend was not running${NC}"
fi
sleep 1

# Stop Docker containers
echo -e "${YELLOW}Stopping Docker containers...${NC}"
if [ -d "$INFRA_DIR" ]; then
    cd "$INFRA_DIR"
    if docker-compose ps | grep -q "Up"; then
        docker-compose down 2>/dev/null || true
        echo -e "${GREEN}✓ Docker containers stopped${NC}"
    else
        echo -e "${GREEN}✓ No running Docker containers${NC}"
    fi
    cd "$PROJECT_DIR"
fi

# Stop ngrok if running
echo -e "${YELLOW}Checking for ngrok...${NC}"
if pkill -f "ngrok" 2>/dev/null; then
    echo -e "${GREEN}✓ ngrok stopped${NC}"
else
    echo -e "${GREEN}✓ ngrok was not running${NC}"
fi

# Clean up PID files
echo -e "${YELLOW}Cleaning up...${NC}"
rm -f /tmp/kyc_*.pid 2>/dev/null || true
rm -f /tmp/ngrok.pid 2>/dev/null || true
echo -e "${GREEN}✓ Cleanup completed${NC}"

sleep 1

echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ All services stopped successfully!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}💡 To start again, run:${NC} bash start.sh"
echo ""
