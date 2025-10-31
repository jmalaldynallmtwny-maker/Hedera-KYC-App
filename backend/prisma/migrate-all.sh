#!/bin/bash
echo "🔄 Running migrations for all databases..."

# Citizens database
echo "📊 Migrating Citizens database..."
npx prisma migrate deploy --schema prisma/schema/citizens/schema.prisma

# Bank databases
for bank in baybank oasisbank ZenBank ArcBank NexBank; do
    echo "🏦 Migrating $bank database..."
    npx prisma migrate deploy --schema prisma/schema/$bank/schema.prisma
done

echo "✅ All migrations completed!"
