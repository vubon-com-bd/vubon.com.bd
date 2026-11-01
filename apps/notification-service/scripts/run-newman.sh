#!/data/data/com.termux/files/usr/bin/bash
# Notification Service — Newman Test Runner
# Usage: ./scripts/run-newman.sh [health|providers|templates|notifications|full]

set -e
MODE="${1:-health}"
COLL="postman/Notification Service.postman_collection.json"
ENV="postman/environments/dev.postman_environment.json"
BASE_URL="http://localhost:3003"

echo "═══════════ NEWMAN TEST — MODE: $MODE ═══════════"
echo ""

# 1. Check service
echo "▶ Checking service..."
if ! curl -s -m 3 "${BASE_URL}/health" > /dev/null 2>&1; then
  echo "❌ Service NOT running at ${BASE_URL}"
  echo "   Start it with: npm run start:dev"
  exit 1
fi
echo "✅ Service responding"

# 2. Check newman
echo "▶ Checking newman..."
if ! command -v newman &> /dev/null; then
  echo "❌ newman not installed. Run:"
  echo "   npm install -g newman"
  exit 1
fi
echo "✅ newman $(newman --version)"

echo ""
echo "▶ Running collection (mode: $MODE)..."

case "$MODE" in
  health)
    echo "─── Health Check Only ───"
    newman run "$COLL" -e "$ENV" \
      --folder "🏥 Health" \
      --reporters=cli \
      --timeout-request 5000
    ;;
  providers)
    echo "─── Health + Provider Webhooks (no DB) ───"
    newman run "$COLL" -e "$ENV" \
      --folder "🏥 Health" \
      --folder "🔗 Provider Webhooks (inbound)" \
      --reporters=cli \
      --timeout-request 5000
    ;;
  templates)
    echo "─── Templates ───"
    newman run "$COLL" -e "$ENV" \
      --folder "📝 Templates" \
      --reporters=cli \
      --timeout-request 10000 \
      --delay-request 100
    ;;
  notifications)
    echo "─── Notifications ───"
    newman run "$COLL" -e "$ENV" \
      --folder "🔔 Notifications" \
      --reporters=cli \
      --timeout-request 10000 \
      --delay-request 100
    ;;
  full)
    echo "─── Full Collection ───"
    newman run "$COLL" -e "$ENV" \
      --reporters=cli \
      --timeout-request 10000 \
      --delay-request 100 \
      --ignore-redirects
    ;;
  *)
    echo "❌ Unknown mode: $MODE"
    echo "   Valid modes: health | providers | templates | notifications | full"
    exit 1
    ;;
esac
