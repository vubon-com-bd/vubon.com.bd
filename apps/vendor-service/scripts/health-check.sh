#!/usr/bin/env bash
set -euo pipefail

URL="${VENDOR_SERVICE_URL:-http://localhost:4006/api/v1}"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/health")

if [ "$STATUS" = "200" ]; then
  echo "✅ vendor-service is healthy (${STATUS})"
  exit 0
else
  echo "❌ vendor-service is unhealthy (${STATUS})"
  exit 1
fi
