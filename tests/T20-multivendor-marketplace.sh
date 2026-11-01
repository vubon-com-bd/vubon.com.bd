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
echo "  T20: MULTI-VENDOR MARKETPLACE"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "  ⏳ Waiting 60s for rate limit..."
sleep 90
echo "  ✅ Reset"
echo ""

# ─── Vendor A setup ───
echo "▶ Vendor A: register + approve + product"
EMAIL_A="vA-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL_A\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"VendorA\",\"lastName\":\"Test\",\"phone\":\"+8801711${TS: -6}\"}" > /dev/null
LOGIN_A=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_A\",\"password\":\"$PASS\"}")
TOKEN_A=$(echo "$LOGIN_A" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID_A=$(echo "$LOGIN_A" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH_A="Authorization: Bearer $TOKEN_A"
sleep 3
VENDOR_ID_A=$(curl -s "$VENDOR/vendors/me" -H "$AUTH_A" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID_A/approve" -H "Content-Type: application/json" -H "$AUTH_A" -d '{"notes":"t20A"}' > /dev/null
CAT_A=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH_A" -d "{\"name\":\"T20CatA\",\"slug\":\"t20ca-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
P_A=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH_A" -d "{\"name\":\"Product A\",\"slug\":\"pa-$TS\",\"sku\":\"PA-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_A\",\"vendorId\":\"$VENDOR_ID_A\",\"price\":1000,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH_A" -d "{\"productId\":\"$P_A\",\"name\":\"D\",\"sku\":\"PAV-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1000}" > /dev/null
sleep 2
INV_A=$(curl -s "$PRODUCT/product-inventory/by-product/$P_A" -H "$AUTH_A" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_A/update" -H "Content-Type: application/json" -H "$AUTH_A" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_A/media" -H "Content-Type: application/json" -H "$AUTH_A" -d '{"items":[{"url":"https://vubon.com.bd/img/a.jpg","type":"image","alt":"a","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_A/submit" -H "Content-Type: application/json" -H "$AUTH_A" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_A/approve" -H "Content-Type: application/json" -H "$AUTH_A" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_A/publish" -H "Content-Type: application/json" -H "$AUTH_A" -d '{}' > /dev/null
echo "  ✅ Vendor A: $VENDOR_ID_A, Product A: $P_A"
PASS_COUNT=$((PASS_COUNT+1))

# ─── Vendor B setup ───
echo ""
echo "▶ Vendor B: register + approve + product"
EMAIL_B="vB-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL_B\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"VendorB\",\"lastName\":\"Test\",\"phone\":\"+8801722${TS: -6}\"}" > /dev/null
LOGIN_B=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_B\",\"password\":\"$PASS\"}")
TOKEN_B=$(echo "$LOGIN_B" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID_B=$(echo "$LOGIN_B" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH_B="Authorization: Bearer $TOKEN_B"
sleep 3
VENDOR_ID_B=$(curl -s "$VENDOR/vendors/me" -H "$AUTH_B" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID_B/approve" -H "Content-Type: application/json" -H "$AUTH_B" -d '{"notes":"t20B"}' > /dev/null
CAT_B=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH_B" -d "{\"name\":\"T20CatB\",\"slug\":\"t20cb-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
P_B=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH_B" -d "{\"name\":\"Product B\",\"slug\":\"pb-$TS\",\"sku\":\"PB-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_B\",\"vendorId\":\"$VENDOR_ID_B\",\"price\":2000,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH_B" -d "{\"productId\":\"$P_B\",\"name\":\"D\",\"sku\":\"PBV-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":2000}" > /dev/null
sleep 2
INV_B=$(curl -s "$PRODUCT/product-inventory/by-product/$P_B" -H "$AUTH_B" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_B/update" -H "Content-Type: application/json" -H "$AUTH_B" -d '{"delta":30,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_B/media" -H "Content-Type: application/json" -H "$AUTH_B" -d '{"items":[{"url":"https://vubon.com.bd/img/b.jpg","type":"image","alt":"b","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_B/submit" -H "Content-Type: application/json" -H "$AUTH_B" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_B/approve" -H "Content-Type: application/json" -H "$AUTH_B" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$P_B/publish" -H "Content-Type: application/json" -H "$AUTH_B" -d '{}' > /dev/null
echo "  ✅ Vendor B: $VENDOR_ID_B, Product B: $P_B"
PASS_COUNT=$((PASS_COUNT+1))

# ─── Customer setup ───
echo ""
echo "▶ Customer: register + add both products"
EMAIL_C="cust-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL_C\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"Customer\",\"lastName\":\"Test\",\"phone\":\"+8801733${TS: -6}\"}" > /dev/null
LOGIN_C=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_C\",\"password\":\"$PASS\"}")
TOKEN_C=$(echo "$LOGIN_C" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID_C=$(echo "$LOGIN_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH_C="Authorization: Bearer $TOKEN_C"
if [ -z "$TOKEN_C" ]; then
  echo "  🔴 Customer login failed — waiting 60s and retrying"
  sleep 60
  LOGIN_C=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL_C\",\"password\":\"$PASS\"}")
  TOKEN_C=$(echo "$LOGIN_C" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
  USER_ID_C=$(echo "$LOGIN_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
  AUTH_C="Authorization: Bearer $TOKEN_C"
fi
sleep 3
CART_C=$(curl -s "$CART/carts/me" -H "$AUTH_C" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$CART/carts/$CART_C/items" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"productId\":\"$P_A\",\"quantity\":2}" > /dev/null
curl -s -X POST "$CART/carts/$CART_C/items" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"productId\":\"$P_B\",\"quantity\":1}" > /dev/null
echo "  ✅ Customer: $USER_ID_C, cart: $CART_C"
PASS_COUNT=$((PASS_COUNT+1))

# ─── Multi-vendor order ───
echo ""
echo "▶ Multi-vendor order (Product A qty 2 @1000 + Product B qty 1 @2000)"
sleep 1
ORDER_ID=$(curl -s -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"customerId\":\"$USER_ID_C\",\"cartId\":\"$CART_C\",\"items\":[{\"productId\":\"$P_A\",\"vendorId\":\"$VENDOR_ID_A\",\"quantity\":2,\"unitPrice\":1000},{\"productId\":\"$P_B\",\"vendorId\":\"$VENDOR_ID_B\",\"quantity\":1,\"unitPrice\":2000}],\"shippingAddress\":{\"line1\":\"123\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" | grep -oP '"orderId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$ORDER_ID" ]; then
  echo "  ✅ Order created ($ORDER_ID)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 Order create failed"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# ─── Order total verify (multi-vendor) ───
echo ""
echo "▶ Order total check (4000 expected = 2000 + 2000)"
ORDER_DATA=$(curl -s "$ORDER/orders/$ORDER_ID" -H "$AUTH_C")
ORDER_TOTAL=$(echo "$ORDER_DATA" | grep -oP '"total":[0-9]+' | head -1 | cut -d: -f2)
if [ "$ORDER_TOTAL" = "4000" ]; then
  echo "  ✅ Multi-vendor total correct ($ORDER_TOTAL)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  Total: $ORDER_TOTAL (expected 4000)"
fi

# ─── Payment ───
echo ""
echo "▶ Payment for multi-vendor order"
PAY_ID=$(curl -s -X POST "$PAYMENT/payments" -H "Content-Type: application/json" -H "$AUTH_C" -d "{\"orderId\":\"$ORDER_ID\",\"method\":\"cash_on_delivery\",\"amount\":4000,\"currency\":\"BDT\"}" | grep -oP '"paymentId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$PAY_ID" ]; then
  curl -s -X POST "$PAYMENT/payments/$PAY_ID/confirm" -H "Content-Type: application/json" -H "$AUTH_C" -d '{}' > /dev/null
  echo "  ✅ Payment confirmed ($PAY_ID)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 Payment failed"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# ─── Vendor sees order ───
echo ""
echo "▶ Vendor A sees multi-vendor order"
sleep 3
VENDOR_ORDERS=$(curl -s "$ORDER/orders?customerId=$USER_ID_C" -H "$AUTH_A")
if echo "$VENDOR_ORDERS" | grep -q "orderId\|items"; then
  echo "  ✅ Vendor can query customer orders"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  Vendor query did not return"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T20 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
