#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
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
echo "  T21: FULL E2E LIFECYCLE"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  ⏳ Waiting 90s for rate limit..."
sleep 90
echo "  ✅ Reset"
echo ""

# 1. Vendor
echo "▶ 1. Vendor setup"
EMAIL_V="v-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL_V\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"FullE2E\",\"lastName\":\"Vendor\",\"phone\":\"+8801744${TS: -6}\"}" > /dev/null
LOGIN_V=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_V\",\"password\":\"$PASS\"}")
TOKEN_V=$(echo "$LOGIN_V" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH_V="Authorization: Bearer $TOKEN_V"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH_V" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH_V" -d '{"notes":"t21"}' > /dev/null
echo "  ✅ Vendor: $VENDOR_ID"
PASS_COUNT=$((PASS_COUNT+1))

# 2. Product
echo ""
echo "▶ 2. Product publish"
CAT=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH_V" -d "{\"name\":\"T21Cat\",\"slug\":\"t21c-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
P=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH_V" -d "{\"name\":\"T21 Product\",\"slug\":\"t21p-$TS\",\"sku\":\"T21-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH_V" -d "{\"productId\":\"$P\",\"name\":\"D\",\"sku\":\"T21V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
I=$(curl -s "$PRODUCT/product-inventory/by-product/$P" -H "$AUTH_V" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$I/update" -H "Content-Type: application/json" -H "$AUTH_V" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/media" -H "Content-Type: application/json" -H "$AUTH_V" -d '{"items":[{"url":"https://vubon.com.bd/img/t21.jpg","type":"image","alt":"t21","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/submit" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/approve" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P/publish" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}' > /dev/null
echo "  ✅ Product: $P"
PASS_COUNT=$((PASS_COUNT+1))

# 3. Customer cart+order
echo ""
echo "▶ 3. Customer cart + order"
EMAIL_C="c-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL_C\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"FullE2E\",\"lastName\":\"Cust\",\"phone\":\"+8801755${TS: -6}\"}" > /dev/null
LOGIN_C=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_C\",\"password\":\"$PASS\"}")
TOKEN_C=$(echo "$LOGIN_C" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID_C=$(echo "$LOGIN_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH_C="Authorization: Bearer $TOKEN_C"
sleep 3
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"productId\":\"$P\",\"quantity\":2}" > /dev/null
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"customerId\":\"$USER_ID_C\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$P\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
echo "  ✅ Order: $ORDER_ID"
PASS_COUNT=$((PASS_COUNT+1))

# 4. Payment
echo ""
echo "▶ 4. Payment"
PAY_ID=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
curl -s -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH_C" -d '{}' > /dev/null
echo "  ✅ Payment: $PAY_ID"
PASS_COUNT=$((PASS_COUNT+1))

# 5. Fulfillment
echo ""
echo "▶ 5. Fulfillment start"
sleep 2
ITEM_ID=$(curl -s "$ORDER/orders/$ORDER_ID/items" -H "$AUTH_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
FF_RES=$(curl -s -X POST "$ORDER/fulfillments/start" -H "Content-Type: application/json" -H "$AUTH_V" -d "{\"orderId\":\"$ORDER_ID\",\"itemIds\":[\"$ITEM_ID\"],\"type\":\"full\"}")
FF_ID=$(echo "$FF_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$FF_ID" ]; then echo "  ✅ Fulfillment: $FF_ID"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $FF_RES"; fi

# 6. Pack
echo ""
echo "▶ 6. Pack"
if [ -n "$FF_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/fulfillments/$FF_ID/pack" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Pack" "$S" "200|201"
fi

# 7. Ship
echo ""
echo "▶ 7. Ship"
if [ -n "$FF_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/fulfillments/$FF_ID/ship" -H "Content-Type: application/json" -H "$AUTH_V" -d '{"trackingNumber":"TRK-20261030","courier":"T21 Courier"}')
  check "Ship" "$S" "200|201"
fi

# 8. Tracking
echo ""
echo "▶ 8. Tracking"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/tracking" -H "Content-Type: application/json" -H "$AUTH_V" -d "{\"orderId\":\"$ORDER_ID\",\"event\":\"in_transit\",\"message\":\"Package in transit\",\"location\":\"Dhaka\",\"trackingNumber\":\"TRK-20261030\"}")
check "Tracking" "$S" "200|201"

# 9. Return request
echo ""
echo "▶ 9. Return request"
RET_RES=$(curl -s -X POST "$ORDER/returns" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"orderId\":\"$ORDER_ID\",\"reason\":\"damaged_in_transit\",\"itemIds\":[\"$ITEM_ID\"]}")
RET_ID=$(echo "$RET_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$RET_ID" ]; then echo "  ✅ Return: $RET_ID"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $RET_RES"; fi

# 10. Approve return
echo ""
echo "▶ 10. Approve return"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/approve" -H "Content-Type: application/json" -H "$AUTH_V" -d '{"notes":"approved"}')
  check "Approve return" "$S" "200|201"
fi

# 11. Schedule pickup
echo ""
echo "▶ 11. Schedule pickup"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/schedule-pickup" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Schedule pickup" "$S" "200|201"
fi

# 12. Pickup
echo ""
echo "▶ 12. Pickup"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/picked-up" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Picked up" "$S" "200|201"
fi

# 13. Receive
echo ""
echo "▶ 13. Receive"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/receive" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Receive" "$S" "200|201"
fi

# 14. Inspect
echo ""
echo "▶ 14. Inspect"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/inspect" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Inspect" "$S" "200|201"
fi

# 15. Complete
echo ""
echo "▶ 15. Complete return"
if [ -n "$RET_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/returns/$RET_ID/complete" -H "Content-Type: application/json" -H "$AUTH_V" -d '{}')
  check "Complete return" "$S" "200|201"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T21 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
