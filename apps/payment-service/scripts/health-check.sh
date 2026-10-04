#!/usr/bin/env bash
# Health check for payment-service
set -euo pipefail

URL="${PAYMENT_SERVICE_URL:-http://localhost:4005/api/v1}"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/health")

if [ "$STATUS" = "200" ]; then
  echo "✅ payment-service healthy (${URL})"
  exit 0
else
  echo "❌ payment-service unhealthy (status=${STATUS})"
  exit 1
fi
