#!/usr/bin/env bash
# Block until order-service is healthy (max 60s)
set -euo pipefail

URL="${ORDER_SERVICE_URL:-http://localhost:4004/api/v1}"
MAX_ATTEMPTS=30
SLEEP=2

for i in $(seq 1 $MAX_ATTEMPTS); do
  if curl -s -o /dev/null -w "%{http_code}" "${URL}/health" | grep -q 200; then
    echo "✅ order-service ready after $((i * SLEEP))s"
    exit 0
  fi
  echo "⏳ waiting for order-service... (${i}/${MAX_ATTEMPTS})"
  sleep $SLEEP
done

echo "❌ order-service not ready after $((MAX_ATTEMPTS * SLEEP))s"
exit 1
