#!/data/data/com.termux/files/usr/bin/bash
set -e
API="http://localhost:3001/api/v1"
NOTIF="http://localhost:4006"
TS=$(date +%s)
EMAIL="t14-${TS}@vubon.com.bd"
PASS="Test@12345"
PASS_COUNT=0
FAIL_COUNT=0

echo "═══════════════════════════════════════════════════════"
echo "  T14: WEBHOOK DELIVERY — External systems"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup admin
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T14\",\"lastName\":\"Hook\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 2
curl -s -X POST "$API/auth/roles/assign" -H "Content-Type: application/json" -H "$AUTH" -d "{\"userId\":\"$USER_ID\",\"role\":\"admin\"}" > /dev/null
sleep 1
TOKEN2=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH2="Authorization: Bearer $TOKEN2"

# T14.1 Register webhook (HTTPS only)
echo "▶ T14.1: Register webhook"
WH_RES=$(curl -s -X POST "$NOTIF/webhooks" -H "Content-Type: application/json" -H "$AUTH2" -d "{\"name\":\"T14 Hook\",\"url\":\"https://httpbin.org/post?ts=$TS\",\"events\":[\"order.created\"],\"secret\":\"test-secret-1234567890abcdef\"}")
WH_ID=$(echo "$WH_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$WH_ID" ]; then echo "  ✅ Webhook registered ($WH_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $WH_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T14.2 Dispatcher subscribed
echo ""
echo "▶ T14.2: Dispatcher subscription"
sleep 2
DISPATCHER=$(pm2 logs notification --lines 1000 --nostream 2>&1 | grep "WebhookDispatcher subscribed" | wc -l)
if [ "$DISPATCHER" -gt 0 ]; then echo "  ✅ Dispatcher active"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Not subscribed"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T14.3 List webhooks
echo ""
echo "▶ T14.3: List webhooks"
LIST=$(curl -s "$NOTIF/webhooks" -H "$AUTH2")
if echo "$LIST" | grep -q "$WH_ID"; then echo "  ✅ Webhook in list"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Not in list"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T14 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
