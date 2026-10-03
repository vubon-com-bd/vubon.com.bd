#!/bin/sh
# ═══════════════════════════════════════════════════════════════
# cart-service — Docker entrypoint
# ═══════════════════════════════════════════════════════════════

set -e

echo "🚀 cart-service starting..."
echo "   NODE_ENV: ${NODE_ENV:-development}"
echo "   PORT:     ${PORT:-4003}"

# Run Prisma migrations if DATABASE_URL is set
if [ -n "$DATABASE_URL" ]; then
  echo "📦 Running Prisma migrations..."
  npx prisma migrate deploy || echo "⚠️  Migration skipped (may be unsupported environment)"
else
  echo "⚠️  DATABASE_URL not set — skipping migrations"
fi

echo "✅ Executing: $@"
exec "$@"
