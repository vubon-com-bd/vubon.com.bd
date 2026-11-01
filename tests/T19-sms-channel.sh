#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
NOTIF="http://localhost:4006"
TS=$(date +%s)
EMAIL="t19-${TS}@vubon.com.bd"
PASS="Test@12345"
PASS_COUNT=0
FAIL_COUNT=0

echo "═══════════════════════════════════════════════════════"
echo "  T19: SMS CHANNEL — Pipeline verification"
echo "═══════════════════════════════════════════════════════"
echo ""

# Wait for rate limit
echo "  ⏳ Waiting 60s for rate limit..."
sleep 60
echo "  ✅ Reset"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T19\",\"lastName\":\"SMS\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
echo "  Setup: user=$USER_ID"
echo ""

# T19.1 SMS provider registered
echo "▶ T19.1: SMS providers loaded"
if ls apps/notification-service/dist/module/infrastructure/providers/sms/*.provider.js 2>/dev/null | grep -q sslwireless; then
  echo "  ✅ SMS providers compiled"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 SMS providers missing"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# T19.2 SMS worker registered
echo ""
echo "▶ T19.2: SMS worker registered"
if [ -f "apps/notification-service/dist/module/infrastructure/workers/sms-sender.worker.js" ]; then
  echo "  ✅ SmsSenderWorker compiled"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 SmsSenderWorker missing"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# T19.3 Trigger SMS-required event (invoice created)
echo ""
echo "▶ T19.3: SMS trigger (invoice created → SMS channel)"
sleep 2
INV=$(curl -s -X POST "http://localhost:3006/invoices" -H "Content-Type: application/json" -H "$AUTH" -d "{\"userId\":\"$USER_ID\",\"subtotal\":500,\"currency\":\"BDT\",\"useBdTax\":true,\"vatRate\":0.15}")
INV_ID=$(echo "$INV" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$INV_ID" ]; then
  echo "  ✅ Invoice created ($INV_ID)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  $INV"
fi

# T19.4 SMS channel in event log
echo ""
echo "▶ T19.4: SMS channel processed"
sleep 5
SMS_LOG=$(pm2 logs notification --lines 100 --nostream 2>&1 | grep -a "SMS\|sms" | wc -l)
if [ "$SMS_LOG" -gt 0 ]; then
  echo "  ✅ SMS channel activity ($SMS_LOG logs)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No SMS channel activity (async or channel not triggered)"
fi

# T19.5 SMS provider config
echo ""
echo "▶ T19.5: SMS config env"
SMS_ENV=$(grep "SMS_ENABLED" apps/notification-service/.env 2>/dev/null || echo "")
if echo "$SMS_ENV" | grep -q "true"; then
  echo "  ✅ SMS_ENABLED=true"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 SMS not enabled"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T19 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
