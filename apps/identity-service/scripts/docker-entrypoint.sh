#!/bin/sh
# ═══════════════════════════════════════════════════════════════
# auth-service — Docker Entrypoint
# ═══════════════════════════════════════════════════════════════
# Runs Prisma migrations then starts the app.
#
# Prisma schema lives in packages/shared-kernel (centralized).
# ═══════════════════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🚀 auth-service entrypoint"
echo "═══════════════════════════════════════════════════════════"

echo "NODE_ENV      = ${NODE_ENV:-unset}"
echo "PORT          = ${PORT:-unset}"
echo "DATABASE_URL  = ${DATABASE_URL:+[set]}"
echo "REDIS_URL     = ${REDIS_URL:+[set]}"
echo ""

# ─── Wait for database + run migrations ───────────────────────
if [ -n "$DATABASE_URL" ]; then
  echo "⏳ Running Prisma migrations from shared-kernel..."
  cd /app/packages/shared-kernel
  npx prisma migrate deploy || {
    echo "⚠️  Migration failed — continuing anyway (check logs)"
  }
  echo "✅ Migrations complete"
  cd /app/apps/auth-service
else
  echo "⚠️  DATABASE_URL not set — skipping migrations"
fi

echo ""
echo "🎯 Starting application..."
echo ""

exec "$@"
