#!/usr/bin/env bash
set -euo pipefail

if [ "${NODE_ENV:-development}" = "production" ]; then
  echo "❌ Cannot seed in production"
  exit 1
fi

cd "$(dirname "$0")/../../.."
echo "🌱 Seeding vendor data (placeholder)..."
# Add seed logic here later
echo "✅ Seed complete"
