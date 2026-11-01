#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
PAYMENT="http://localhost:3006"
TS=$(date +%s)
EMAIL="t7-${TS}@vubon.com.bd"
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
echo "  T7: PAYMENT FULL FLOW — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup: user + order
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T7\",\"lastName\":\"Payment\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t7"}' > /dev/null
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T7Cat\",\"slug\":\"t7cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T7 Product\",\"slug\":\"t7p-$TS\",\"sku\":\"T7-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T7V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t7.jpg","type":"image","alt":"t7","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}" > /dev/null
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":2,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123 Test\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
echo "  Setup: order=$ORDER_ID"
echo ""

# Payment COD
echo "▶ Payment COD"
PAY_RES=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":3000,\"currency\":\"BDT\"}")
PAY_ID=$(echo "$PAY_RES" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$PAY_ID" ]; then echo "  ✅ Initiate COD ($PAY_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $PAY_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payments/$PAY_ID" -H "$AUTH")
check "Get payment" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payments" -H "$AUTH")
check "List payments" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payments/order/$ORDER_ID" -H "$AUTH")
check "Get by order" "$S" "200"

# Confirm
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Confirm payment" "$S" "200"

# Payment stats
echo ""
echo "▶ Stats"
S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payments/stats" -H "$AUTH")
check "Payment stats" "$S" "200"

# Refund (full)
echo ""
echo "▶ Refund"
REF_RES=$(curl -s -X POST "$PAYMENT/refunds/payments/$PAY_ID" -H "Content-Type: application/json" -H "$AUTH" -d '{"amount":3000,"reason":"test_refund"}')
REF_ID=$(echo "$REF_RES" | grep -oP '"refundId":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$REF_ID" ]; then echo "  ✅ Request refund ($REF_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $REF_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# Invoice
echo ""
echo "▶ Invoice"
INV_RES=$(curl -s -X POST "$PAYMENT/invoices" -H "Content-Type: application/json" -H "$AUTH" -d "{\"orderId\":\"$ORDER_ID\",\"userId\":\"$USER_ID\",\"subtotal\":3000,\"currency\":\"BDT\"}")
INV_RES_ID=$(echo "$INV_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$INV_RES_ID" ]; then echo "  ✅ Generate invoice ($INV_RES_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $INV_RES"; fi

# Subscription
echo ""
echo "▶ Subscription"
SUB_RES=$(curl -s -X POST "$PAYMENT/subscriptions" -H "Content-Type: application/json" -H "$AUTH" -d "{\"plan\":\"premium\",\"interval\":\"monthly\",\"intervalCount\":1,\"price\":500,\"currency\":\"BDT\",\"method\":\"card\"}")
SUB_ID=$(echo "$SUB_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$SUB_ID" ]; then echo "  ✅ Create subscription ($SUB_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $SUB_RES"; fi

# Payment methods
echo ""
echo "▶ Methods"
S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payment-methods" -H "$AUTH")
check "List methods" "$S" "200"

# Gateways
echo ""
echo "▶ Gateways"
S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payment-gateways" -H "$AUTH")
check "List gateways" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PAYMENT/payment-gateways/health" -H "$AUTH")
check "Gateway health" "$S" "200"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T7 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
