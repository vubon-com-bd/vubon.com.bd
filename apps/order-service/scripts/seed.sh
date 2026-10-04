#!/usr/bin/env bash
# Seed sample data (dev only)
set -euo pipefail

if [ "${NODE_ENV:-development}" = "production" ]; then
  echo "❌ seed.sh is disabled in production"
  exit 1
fi

cd "$(dirname "$0")/.."

echo "🌱 Seeding sample orders..."
# Add seed logic here (or reference prisma/seed.ts)
echo "✅ Seed complete"
