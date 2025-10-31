#!/bin/bash
# ===================================
# Regenerate All Prisma Clients
# ===================================
# This script regenerates all Prisma clients with the updated schema paths

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}=================================${NC}"
echo -e "${BLUE}🔄 Regenerating Prisma Clients${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/.."

echo -e "${YELLOW}⚠️  This will regenerate all Prisma clients...${NC}"
echo ""

# Remove old generated clients (lowercase names)
echo -e "${BLUE}Cleaning old generated clients...${NC}"
rm -rf prisma/src/generated/zenbank 2>/dev/null || true
rm -rf prisma/src/generated/arcbank 2>/dev/null || true
rm -rf prisma/src/generated/nexbank 2>/dev/null || true
rm -rf prisma/src/generated/ZenBank 2>/dev/null || true
rm -rf prisma/src/generated/ArcBank 2>/dev/null || true
rm -rf prisma/src/generated/NexBank 2>/dev/null || true
echo -e "${GREEN}✓${NC} Old clients cleaned"
echo ""

# Generate all Prisma clients
echo -e "${BLUE}Generating Prisma clients...${NC}"
echo ""

# Citizens database
echo -e "📊 Generating citizens client..."
npm run db:generate:citizens
echo -e "${GREEN}✓${NC} Citizens client generated"
echo ""

# BayBank database
echo -e "📊 Generating baybank client..."
npm run db:generate:baybank
echo -e "${GREEN}✓${NC} BayBank client generated"
echo ""

# OasisBank database
echo -e "📊 Generating oasisbank client..."
npm run db:generate:oasisbank
echo -e "${GREEN}✓${NC} OasisBank client generated"
echo ""

# ZenBank database
echo -e "📊 Generating zenbank client..."
npm run db:generate:zenbank
echo -e "${GREEN}✓${NC} ZenBank client generated"
echo ""

# ArcBank database
echo -e "📊 Generating arcbank client..."
npm run db:generate:arcbank
echo -e "${GREEN}✓${NC} ArcBank client generated"
echo ""

# NexBank database
echo -e "📊 Generating nexbank client..."
npm run db:generate:nexbank
echo -e "${GREEN}✓${NC} NexBank client generated"
echo ""

echo -e "${BLUE}=================================${NC}"
echo -e "${GREEN}✅ All Prisma clients regenerated successfully!${NC}"
echo -e "${BLUE}=================================${NC}"
echo ""

# Verify generated clients
echo -e "${BLUE}Verifying generated clients...${NC}"
for bank in citizens baybank oasisbank zenbank arcbank nexbank; do
  if [ -d "prisma/src/generated/${bank}" ]; then
    echo -e "${GREEN}✓${NC} ${bank} client exists"
  else
    echo -e "${RED}✗${NC} ${bank} client missing!"
  fi
done

echo ""
echo -e "${GREEN}Done! You can now start the backend server.${NC}"







