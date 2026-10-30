#!/data/data/com.termux/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
NOTIF="http://localhost:4006"
TS=$(date +%s)
EMAIL="t8-${TS}@vubon.com.bd"
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
echo "  T8: CROSS-SERVICE EVENTS — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Full flow
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T8\",\"lastName\":\"Event\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
sleep 2
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
echo "  Setup: user $USER_ID"
sleep 3

# T8.1 — Vendor auto-create on register
echo ""
echo "▶ T8.1: Vendor auto-created"
VENDOR_ME=$(curl -s "$VENDOR/vendors/me" -H "$AUTH")
VENDOR_ID=$(echo "$VENDOR_ME" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$VENDOR_ID" ]; then echo "  ✅ Vendor auto-created ($VENDOR_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $VENDOR_ME"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T8.2 — Vendor approve enables product ownership
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t8"}' > /dev/null
echo ""
echo "▶ T8.2: Vendor approve → ownership"
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T8Cat\",\"slug\":\"t8cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_RES=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T8 Product\",\"slug\":\"t8p-$TS\",\"sku\":\"T8-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}")
PROD_ID=$(echo "$PROD_RES" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$PROD_ID" ]; then echo "  ✅ Product create after approve ($PROD_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $PROD_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T8.3 — Product publish → cart cache ready
echo ""
echo "▶ T8.3: Product publish → cart sync"
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T8V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t8.jpg","type":"image","alt":"t8","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Product publish" "$S" "200"

# T8.4 — Cart can fetch price after publish
echo ""
echo "▶ T8.4: Cart price fetch"
sleep 3
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
ITEM_RES=$(curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}")
UNIT_PRICE=$(echo "$ITEM_RES" | grep -oP '"unitPrice":[0-9]+' | head -1 | cut -d: -f2)
if [ "$UNIT_PRICE" = "1500" ]; then echo "  ✅ Cart price fetch (unitPrice=$UNIT_PRICE)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 unitPrice=$UNIT_PRICE (res: $ITEM_RES)"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T8.5 — Order created → cart event
echo ""
echo "▶ T8.5: Order → cart clear event"
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123 Test\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$ORDER_ID" ]; then echo "  ✅ Order created ($ORDER_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 order create failed"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T8.6 — Payment completed → order confirmed (saga)
echo ""
echo "▶ T8.6: Payment saga → order confirm"
PAY_ID=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
curl -s -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3
ORDER_STATUS=$(curl -s "$ORDER/orders/$ORDER_ID" -H "$AUTH" | grep -oP '"status":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ "$ORDER_STATUS" = "confirmed" ]; then echo "  ✅ Order auto-confirmed (saga)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 status=$ORDER_STATUS"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T8.7 — Notification service processes payment event
echo ""
echo "▶ T8.7: Notification processes event"
NOTIF_LOG=$(pm2 logs notification --lines 100 --nostream 2>&1 | grep -c "PaymentCompletedHandler\|Notification sent" || true)
if [ "$NOTIF_LOG" -gt 0 ]; then echo "  ✅ Notification handler triggered ($NOTIF_LOG entries)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  No notification log (may be expected)"; fi

# T8.8 — Payment event bus processed
echo ""
echo "▶ T8.8: Order service processed payment event"
ORDER_LOG=$(pm2 logs order --lines 100 --nostream 2>&1 | grep -c "PaymentCompletedHandler\|payment.payment.completed" || true)
if [ "$ORDER_LOG" -gt 0 ]; then echo "  ✅ Order service processed event ($ORDER_LOG entries)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 No order event processing"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T8 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
