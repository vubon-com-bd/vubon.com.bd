#!/usr/bin/env bash
# Seed sample notification data (dev only)
set -euo pipefail

if [ "${NODE_ENV:-development}" = "production" ]; then
  echo "❌ seed.sh is disabled in production"
  exit 1
fi

cd "$(dirname "$0")/.."

echo "🌱 Seeding sample notification templates..."
# Add seed logic here (or reference a seed script in prisma/seed.ts)
echo "✅ Seed complete"
