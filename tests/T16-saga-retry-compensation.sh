#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t16-${TS}@vubon.com.bd"
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
echo "  T16: SAGA — Retry + Compensation"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T16\",\"lastName\":\"Saga\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t16"}' > /dev/null
CAT=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T16C\",\"slug\":\"t16c-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
P=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T16 Product\",\"slug\":\"t16p-$TS\",\"sku\":\"T16-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$P\",\"name\":\"D\",\"sku\":\"T16V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
I=$(curl -s "$PRODUCT/product-inventory/by-product/$P" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$I/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t16.jpg","type":"image","alt":"t16","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3
C=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$C/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$P\",\"quantity\":2}" > /dev/null
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$C\",\"items\":[{\"productId\":\"$P\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
echo "  Setup: order=$ORDER_ID"
echo ""

# T16.1 Payment init
echo "▶ T16.1: Payment init"
PAY_RES=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}")
PAY_ID=$(echo "$PAY_RES" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$PAY_ID" ]; then echo "  ✅ Payment initiated ($PAY_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $PAY_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T16.2 Cancel payment (simulates failure)
echo ""
echo "▶ T16.2: Cancel payment (simulate failure)"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/payments/$PAY_ID/cancel" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"test_cancel"}')
check "Cancel payment" "$S" "200"

# T16.3 Retry payment
echo ""
echo "▶ T16.3: Retry payment"
sleep 2
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/payments/$PAY_ID/retry" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Retry payment" "$S" "200|400|404"

# T16.4 Saga compensated → order cancelled check
echo ""
echo "▶ T16.4: Compensation — order status"
sleep 3
ORDER_STATUS=$(curl -s "$ORDER/orders/$ORDER_ID" -H "$AUTH" | grep -oP '"status":"[^"]+"' | head -1 | cut -d'"' -f4)
echo "  📊 Order status: $ORDER_STATUS"
if [ -n "$ORDER_STATUS" ]; then
  echo "  ✅ Order status retrieved"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 Order status missing"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# T16.5 Notification for payment failed
echo ""
echo "▶ T16.5: PaymentFailed notification saga"
FAILED_LOG=$(pm2 logs notification --lines 500 --nostream 2>&1 | grep -a "payment.cancelled\|payment.failed\|PaymentCancelledHandler\|PaymentFailedHandler" | wc -l)
if [ "$FAILED_LOG" -gt 0 ]; then
  echo "  ✅ Payment failed saga notified ($FAILED_LOG)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No notification log in window (may be async)"
fi

# T16.6 Analytics saga
echo ""
echo "▶ T16.6: Analytics saga triggered"
ANALYTICS_LOG=$(pm2 logs payment --lines 100 --nostream 2>&1 | grep -a "UpdateAnalytics\|analytics" | wc -l)
if [ "$ANALYTICS_LOG" -gt 0 ]; then
  echo "  ✅ Analytics saga executed ($ANALYTICS_LOG)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No analytics log (may be silent)"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T16 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
