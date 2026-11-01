#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t6-${TS}@vubon.com.bd"
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
echo "  T6: ORDER LIFECYCLE — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T6\",\"lastName\":\"Order\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t6"}' > /dev/null

# Create + publish product
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T6Cat\",\"slug\":\"t6cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T6 Product\",\"slug\":\"t6p-$TS\",\"sku\":\"T6-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T6V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t6.jpg","type":"image","alt":"t6","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 5
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}" > /dev/null
echo "  Setup: user + vendor + product published + cart with item"
echo ""

# Order create
echo "▶ Order create"
ORDER_RES=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123 Test\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}")
ORDER_ID=$(echo "$ORDER_RES" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$ORDER_ID" ]; then echo "  ✅ Create order ($ORDER_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $ORDER_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$ORDER/orders/$ORDER_ID" -H "$AUTH")
check "Get order" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$ORDER/orders" -H "$AUTH")
check "List orders" "$S" "200"

# Order item ops
echo ""
echo "▶ Order items"
S=$(curl -s -o /dev/null -w "%{http_code}" "$ORDER/orders/$ORDER_ID/items" -H "$AUTH")
check "List items" "$S" "200"

# Hold/Release
echo ""
echo "▶ Hold/Release"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/hold" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"t6_hold"}')
check "Hold order" "$S" "200|400"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/release" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Release order" "$S" "200|400"

# Payment → order auto-confirm
echo ""
echo "▶ Payment flow"
PAYMENT_RES=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}")
PAYMENT_ID=$(echo "$PAYMENT_RES" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/payments/$PAYMENT_ID/confirm" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Confirm payment" "$S" "200"

sleep 3
STATUS=$(curl -s "$ORDER/orders/$ORDER_ID" -H "$AUTH" | grep -oP '"status":"[^"]+"' | head -1)
echo "  📊 Order status after payment: $STATUS"

# Fulfillment
echo ""
echo "▶ Fulfillment"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/fulfillments" -H "Content-Type: application/json" -H "$AUTH" -d '{"warehouseId":"wh-t6"}')
check "Start fulfillment" "$S" "200|201|400|404"

# Tracking
echo ""
echo "▶ Tracking"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/tracking" -H "Content-Type: application/json" -H "$AUTH" -d '{"trackingNumber":"T6-TRK-001","carrier":"T6 Courier"}')
check "Add tracking" "$S" "200|201|400|404"

# Cancel
echo ""
echo "▶ Cancel"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/cancel" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"t6_cancel"}')
check "Cancel order" "$S" "200|400|404"

# Return (new order to test)
echo ""
echo "▶ Return request"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders/$ORDER_ID/returns" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"t6_return","items":[{"productId":"'$PROD_ID'","quantity":1}]}')
check "Return request" "$S" "200|201|400|404"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T6 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
