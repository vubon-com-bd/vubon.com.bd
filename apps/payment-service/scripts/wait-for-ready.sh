#!/usr/bin/env bash
# Block until payment-service is healthy (max 60s)
set -euo pipefail

URL="${PAYMENT_SERVICE_URL:-http://localhost:4005/api/v1}"
MAX_ATTEMPTS=30
SLEEP=2

for i in $(seq 1 $MAX_ATTEMPTS); do
  if curl -s -o /dev/null -w "%{http_code}" "${URL}/health" | grep -q 200; then
    echo "✅ payment-service ready after $((i * SLEEP))s"
    exit 0
  fi
  echo "⏳ waiting for payment-service... (${i}/${MAX_ATTEMPTS})"
  sleep $SLEEP
done

echo "❌ payment-service not ready after $((MAX_ATTEMPTS * SLEEP))s"
exit 1
