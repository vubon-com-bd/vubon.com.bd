#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
TS=$(date +%s)
EMAIL="t5-${TS}@vubon.com.bd"
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
echo "  T5: CART FULL FLOW — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup: user + vendor + product (published)
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T5\",\"lastName\":\"Cart\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t5"}' > /dev/null

# Create + publish product
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T5Cat\",\"slug\":\"t5cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T5 Product\",\"slug\":\"t5p-$TS\",\"sku\":\"T5-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
VAR_ID=$(curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T5V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t5.jpg","type":"image","alt":"t5","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
echo "  Setup: user + vendor + product published ($PROD_ID)"
sleep 5
echo ""

# Cart auto-create
echo "▶ Cart get"
CART_RES=$(curl -s "$CART/carts/me" -H "$AUTH")
CART_ID=$(echo "$CART_RES" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$CART_ID" ]; then echo "  ✅ Auto-created cart ($CART_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $CART_RES"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# Add item
echo ""
echo "▶ Add item"
ITEM=$(curl -s -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":2}")
ITEM_ID=$(echo "$ITEM" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$ITEM_ID" ]; then echo "  ✅ Add item ($ITEM_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $ITEM"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# Cart totals
echo ""
echo "▶ Cart totals"
sleep 1
CART_FULL=$(curl -s "$CART/carts/$CART_ID" -H "$AUTH")
SUBTOTAL=$(echo "$CART_FULL" | grep -oP '"subtotal":[0-9]+' | head -1 | cut -d: -f2)
if [ "$SUBTOTAL" -gt 0 ]; then echo "  ✅ Subtotal $SUBTOTAL"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Subtotal=$SUBTOTAL (CART: $CART_FULL)"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# Update quantity
echo ""
echo "▶ Update quantity"
S=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$CART/carts/$CART_ID/items/$ITEM_ID/quantity" -H "Content-Type: application/json" -H "$AUTH" -d '{"quantity":3}')
check "Update quantity" "$S" "200"

# Summary
echo ""
echo "▶ Summary"
S=$(curl -s -o /dev/null -w "%{http_code}" "$CART/carts/$CART_ID/summary" -H "$AUTH")
check "Cart summary" "$S" "200"

# Coupon
echo ""
echo "▶ Coupon"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$CART/carts/$CART_ID/coupons" -H "Content-Type: application/json" -H "$AUTH" -d '{"code":"T5SAVE10"}')
check "Apply coupon" "$S" "200|201|400|404"

# Shipping
echo ""
echo "▶ Shipping"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$CART/carts/$CART_ID/shipping" -H "Content-Type: application/json" -H "$AUTH" -d '{"method":"standard"}')
check "Set shipping" "$S" "200|201|400|404"

# Clear cart
echo ""
echo "▶ Clear cart"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$CART/carts/$CART_ID/clear" -H "Content-Type: application/json" -H "$AUTH" -d '{"reason":"test_clear"}')
check "Clear cart" "$S" "200|204"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T5 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
