#!/bin/bash
echo "🔧 Generating Prisma clients..."

# Generate clients for all databases
npx prisma generate --schema prisma/schema/citizens/schema.prisma
npx prisma generate --schema prisma/schema/baybank/schema.prisma  
npx prisma generate --schema prisma/schema/oasisbank/schema.prisma
npx prisma generate --schema prisma/schema/zenbank/schema.prisma
npx prisma generate --schema prisma/schema/arcbank/schema.prisma
npx prisma generate --schema prisma/schema/nexbank/schema.prisma

echo "✅ All Prisma clients generated!"