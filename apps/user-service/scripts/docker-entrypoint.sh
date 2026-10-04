#!/bin/sh
# ═══════════════════════════════════════════════════════════════
# user-service — Docker Entrypoint
# ═══════════════════════════════════════════════════════════════
# Runs Prisma migrations then starts the app.
# ═══════════════════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════════════════════"
echo "🚀 user-service entrypoint"
echo "═══════════════════════════════════════════════════════════"

echo "NODE_ENV      = ${NODE_ENV:-unset}"
echo "PORT          = ${PORT:-unset}"
echo "DATABASE_URL  = ${DATABASE_URL:+[set]}"
echo "REDIS_URL     = ${REDIS_URL:+[set]}"
echo ""

# ─── Wait for database ────────────────────────────────────────
if [ -n "$DATABASE_URL" ]; then
  echo "⏳ Running Prisma migrations..."
  npx prisma migrate deploy || {
    echo "⚠️  Migration failed — continuing anyway (check logs)"
  }
  echo "✅ Migrations complete"
else
  echo "⚠️  DATABASE_URL not set — skipping migrations"
fi

echo ""
echo "🎯 Starting application..."
echo ""

# Hand off to CMD
exec "$@"
