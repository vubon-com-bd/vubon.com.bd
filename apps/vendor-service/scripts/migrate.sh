#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../../.."
echo "🗄️  Running Prisma migrations for vendor-service..."
pnpm --filter @vubon/shared-kernel exec prisma migrate deploy
echo "✅ Migrations complete"
