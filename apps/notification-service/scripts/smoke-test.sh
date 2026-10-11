#!/usr/bin/env bash
# Basic smoke test — hits public + health endpoints
set -euo pipefail

URL="${NOTIFICATION_SERVICE_URL:-http://localhost:4007/api/v1}"

echo "=== Liveness ==="
curl -sf "${URL}/health/live" | head -c 200
echo ""

echo "=== Health (full) ==="
curl -sf "${URL}/health" | head -c 400
echo ""

echo "=== Swagger ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${URL}/docs"

echo "=== Notifications list (expect 401 without auth) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${URL}/notifications"

echo "=== Provider webhook receiver (public) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" \
  -X POST "${URL}/provider-webhooks/twilio" \
  -H "Content-Type: application/json" \
  -d '{"MessageSid":"SM_smoke","MessageStatus":"delivered","To":"+8801","From":"+8801"}'

echo "✅ Smoke test done"
