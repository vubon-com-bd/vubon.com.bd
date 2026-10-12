#!/usr/bin/env bash
set -euo pipefail

URL="${VENDOR_SERVICE_URL:-http://localhost:4006/api/v1}"

echo "🔍 Smoke testing ${URL}..."

echo "── health/live ──"
curl -sf "${URL}/health/live" | head -c 200 && echo "" || { echo "❌ live failed"; exit 1; }

echo "── health/ready ──"
curl -sf "${URL}/health/ready" | head -c 200 && echo "" || { echo "❌ ready failed"; exit 1; }

echo "── public vendors/top-rated ──"
curl -sf "${URL}/public/vendors/top-rated?limit=1" | head -c 300 && echo "" || echo "⚠️ top-rated unavailable"

echo "✅ Smoke test complete"
