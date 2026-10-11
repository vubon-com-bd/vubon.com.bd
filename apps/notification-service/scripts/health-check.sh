#!/usr/bin/env bash
# Health check for notification-service
set -euo pipefail

URL="${NOTIFICATION_SERVICE_URL:-http://localhost:4007/api/v1}"
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${URL}/health")

if [ "$STATUS" = "200" ]; then
  echo "✅ notification-service healthy (${URL})"
  exit 0
else
  echo "❌ notification-service unhealthy (status=${STATUS})"
  exit 1
fi
