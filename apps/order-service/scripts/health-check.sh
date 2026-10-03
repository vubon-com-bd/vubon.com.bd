#!/usr/bin/env bash
# Health check for order-service
set -euo pipefail

URL="${ORDER_SERVICE_URL:-http://localhost:4004/api/v1}"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/health")

if [ "$STATUS" = "200" ]; then
  echo "✅ order-service healthy (${URL})"
  exit 0
else
  echo "❌ order-service unhealthy (status=${STATUS})"
  exit 1
fi
