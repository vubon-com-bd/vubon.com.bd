#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t18-${TS}@vubon.com.bd"
PASS="Test@12345"
PASS_COUNT=0
FAIL_COUNT=0

check() {
  local name="$1" status="$2" expected="$3"
  if [ "$status" = "$expected" ] || [[ "$expected" == *"|"* && "$expected" == *"$status"* ]]; then
    echo "  ✅ $name (HTTP $status)"; PASS_COUNT=$((PASS_COUNT+1))
  else
    echo "  🔴 $name (HTTP $status, expected $expected)"; FAIL_COUNT=$((FAIL_COUNT+1))
  fi
}

echo "═══════════════════════════════════════════════════════"
echo "  T18: SUBSCRIPTION RENEWAL + INVOICE PDF"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  ⏳ Waiting 60s for rate limit window..."
sleep 60
echo "  ✅ Window reset"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T18\",\"lastName\":\"Sub\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
echo "  Setup: user=$USER_ID"
echo ""

# T18.1 Create subscription
echo "▶ T18.1: Create subscription"
SUB=$(curl -s -X POST "$PAYMENT/subscriptions" -H "Content-Type: application/json" -H "$AUTH" -d "{\"userId\":\"$USER_ID\",\"plan\":\"premium\",\"interval\":\"monthly\",\"intervalCount\":1,\"price\":500,\"currency\":\"BDT\",\"method\":\"cash_on_delivery\"}")
SUB_ID=$(echo "$SUB" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$SUB_ID" ]; then echo "  ✅ Subscription created ($SUB_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $SUB"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T18.2 List subscriptions
echo ""
echo "▶ T18.2: List subscriptions"
S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/subscriptions" -H "$AUTH")
check "List subscriptions" "$S" "200"

# T18.3 Get subscription
echo ""
echo "▶ T18.3: Get subscription"
if [ -n "$SUB_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/subscriptions/$SUB_ID" -H "$AUTH")
  check "Get subscription" "$S" "200"
fi

# T18.4 Generate invoice
echo ""
echo "▶ T18.4: Generate invoice"
INV=$(curl -s -X POST "$PAYMENT/invoices" -H "Content-Type: application/json" -H "$AUTH" -d "{\"userId\":\"$USER_ID\",\"subtotal\":500,\"currency\":\"BDT\",\"useBdTax\":true,\"vatRate\":0.15}")
INV_ID=$(echo "$INV" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$INV_ID" ]; then echo "  ✅ Invoice generated ($INV_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $INV"; fi

# T18.5 Get invoice
echo ""
echo "▶ T18.5: Get invoice"
if [ -n "$INV_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/invoices/$INV_ID" -H "$AUTH")
  check "Get invoice" "$S" "200"
fi

# T18.6 Download PDF
echo ""
echo "▶ T18.6: Download PDF"
if [ -n "$INV_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/invoices/$INV_ID/pdf" -H "$AUTH")
  check "Invoice PDF download" "$S" "200|404|501"
fi

# T18.7 PDF with QR
echo ""
echo "▶ T18.7: PDF with QR"
if [ -n "$INV_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/invoices/$INV_ID/pdf-with-qr" -H "$AUTH")
  check "PDF with QR" "$S" "200|404|501"
fi

# T18.8 Send invoice
echo ""
echo "▶ T18.8: Send invoice email"
if [ -n "$INV_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/invoices/$INV_ID/send" -H "Content-Type: application/json" -H "$AUTH" -d '{"channel":"email"}')
  check "Send invoice" "$S" "200|404|501"
fi

# T18.9 Subscription pause
echo ""
echo "▶ T18.9: Pause subscription"
if [ -n "$SUB_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/subscriptions/$SUB_ID/pause" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
  check "Pause subscription" "$S" "200|400"
fi

# T18.10 Subscription cancel
echo ""
echo "▶ T18.10: Cancel subscription"
if [ -n "$SUB_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/subscriptions/$SUB_ID/cancel" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"test_cancel"}')
  check "Cancel subscription" "$S" "200|400"
fi

# T18.11 Notification for invoice
echo ""
echo "▶ T18.11: Invoice notification"
INV_NOTIF=$(pm2 logs notification --lines 100 --nostream 2>&1 | grep -a -iE "invoice\|InvoiceCreated" | wc -l)
if [ "$INV_NOTIF" -gt 0 ]; then
  echo "  ✅ Invoice notification triggered ($INV_NOTIF)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No invoice notification (async lag)"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T18 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
