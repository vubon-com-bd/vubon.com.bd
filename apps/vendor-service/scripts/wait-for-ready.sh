#!/usr/bin/env bash
set -euo pipefail

URL="${VENDOR_SERVICE_URL:-http://localhost:4006/api/v1}"
TIMEOUT="${WAIT_TIMEOUT_SECONDS:-60}"
INTERVAL=2

echo "⏳ Waiting for vendor-service at ${URL} (timeout: ${TIMEOUT}s)..."
ELAPSED=0
until curl -s -o /dev/null -w "%{http_code}" "${URL}/health" | grep -q "200"; do
  if [ "$ELAPSED" -ge "$TIMEOUT" ]; then
    echo "❌ Timed out after ${TIMEOUT}s"
    exit 1
  fi
  sleep "$INTERVAL"
  ELAPSED=$((ELAPSED + INTERVAL))
done
echo "✅ vendor-service ready after ${ELAPSED}s"
