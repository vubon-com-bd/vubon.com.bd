#!/usr/bin/env bash
# Basic smoke test — hits public/health endpoints
set -euo pipefail

URL="${PAYMENT_SERVICE_URL:-http://localhost:4005/api/v1}"

echo "=== Liveness ==="
curl -sf "${URL}/health/live" | head -c 200
echo ""

echo "=== Health (full) ==="
curl -sf "${URL}/health" | head -c 400
echo ""

echo "=== Swagger ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${URL}/docs"

echo "=== Payment list (expect 401 without auth) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${URL}/payments"

echo "=== Webhook receiver (public, expect 200) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" \
  -X POST "${URL}/webhooks/bkash" \
  -H "Content-Type: application/json" \
  -d '{"id":"smoke_evt_1","type":"payment.succeeded"}'

echo "✅ Smoke test done"
