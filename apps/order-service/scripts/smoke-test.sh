#!/usr/bin/env bash
# Basic smoke test — hits public/health endpoints
set -euo pipefail

URL="${ORDER_SERVICE_URL:-http://localhost:4004/api/v1}"

echo "=== Health ==="
curl -sf "${URL}/health" | head -c 200
echo ""

echo "=== Swagger ==="
curl -s -o /dev/null -w "status=%{http_code}\n" "${URL}/docs"

echo "=== Public tracking (expect 200 or 404) ==="
curl -s -o /dev/null -w "status=%{http_code}\n" \
  "${URL}/order-tracking/order/11111111-1111-4111-8111-111111111111/summary"

echo "✅ Smoke test done"
