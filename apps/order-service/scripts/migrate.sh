#!/usr/bin/env bash
# Run Prisma migrations (safe for prod)
set -euo pipefail

cd "$(dirname "$0")/.."

echo "🔄 Generating Prisma client..."
pnpm prisma:generate

echo "🔄 Applying migrations..."
pnpm prisma:migrate

echo "✅ Migrations complete"
