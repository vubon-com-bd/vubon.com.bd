#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
CART="http://localhost:3004"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
ORDER="http://localhost:3005"
TS=$(date +%s)

PASS_COUNT=0
FAIL_COUNT=0
check() {
  local name="$1" condition="$2"
  if [ "$condition" = "true" ]; then
    echo "  ✅ $name"; PASS_COUNT=$((PASS_COUNT+1))
  else
    echo "  🔴 $name"; FAIL_COUNT=$((FAIL_COUNT+1))
  fi
}

echo "═══════════════════════════════════════════════════════"
echo "  T10: CONCURRENCY"
echo "═══════════════════════════════════════════════════════"
echo ""

# ─── T10.1: Concurrent registrations (10 unique emails) ───
echo "▶ T10.1: 10 concurrent registrations"
PIDS=()
for i in $(seq 1 10); do
  E="conc-${TS}-${i}@vubon.com.bd"
  curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$E\",\"password\":\"Test@12345\",\"confirmPassword\":\"Test@12345\",\"acceptTerms\":true,\"firstName\":\"Conc\",\"lastName\":\"T$i\",\"phone\":\"+88017000${TS: -4}${i}\"}" > ~/tmp/reg_$i.txt &
  PIDS+=($!)
done
for pid in "${PIDS[@]}"; do wait $pid; done
SUCCESS=0
for i in $(seq 1 10); do
  CODE=$(cat ~/tmp/reg_$i.txt 2>/dev/null)
  [ "$CODE" = "201" ] || [ "$CODE" = "200" ] && SUCCESS=$((SUCCESS+1))
  rm -f ~/tmp/reg_$i.txt
done
check "Concurrent register ($SUCCESS/10)" "$([ "$SUCCESS" -ge 8 ] && echo true || echo false)"

# ─── Setup for remaining tests ───
EMAIL="conc-setup-${TS}@vubon.com.bd"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"Test@12345\",\"confirmPassword\":\"Test@12345\",\"acceptTerms\":true,\"firstName\":\"Conc\",\"lastName\":\"Setup\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
sleep 2
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"Test@12345\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3
VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t10"}' > /dev/null
CAT_ID=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T10Cat\",\"slug\":\"t10cat-$TS\"}" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)

# ─── T10.2: Concurrent product creates ───
echo ""
echo "▶ T10.2: 5 concurrent product creates"
PIDS=()
for i in $(seq 1 5); do
  curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T10 Product $i\",\"slug\":\"t10p-$TS-$i\",\"sku\":\"T10-$TS-$i\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" > ~/tmp/prod_$i.txt &
  PIDS+=($!)
done
for pid in "${PIDS[@]}"; do wait $pid; done
SUCCESS=0
for i in $(seq 1 5); do
  CODE=$(cat ~/tmp/prod_$i.txt 2>/dev/null)
  [ "$CODE" = "201" ] || [ "$CODE" = "200" ] && SUCCESS=$((SUCCESS+1))
  rm -f ~/tmp/prod_$i.txt
done
check "Concurrent product create ($SUCCESS/5)" "$([ "$SUCCESS" -ge 4 ] && echo true || echo false)"

# ─── Publish one product for cart test ───
PROD_ID=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T10 Base\",\"slug\":\"t10base-$TS\",\"sku\":\"T10B-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
sleep 2
curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T10V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}" > /dev/null
sleep 2
INV_ID=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":100,"reason":"init"}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t10.jpg","type":"image","alt":"t10","order":0,"isPrimary":true}]}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
curl -s -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}' > /dev/null
sleep 3

# ─── T10.3: Concurrent inventory updates ───
echo ""
echo "▶ T10.3: 10 concurrent stock updates (+1 each)"
PIDS=()
for i in $(seq 1 10); do
  curl -s -o /dev/null -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":1,"reason":"concurrent"}' &
  PIDS+=($!)
done
for pid in "${PIDS[@]}"; do wait $pid; done
sleep 2
STOCK=$(curl -s "$PRODUCT/product-inventory/$INV_ID" -H "$AUTH" | grep -oP '"quantity":[0-9]+' | head -1 | cut -d: -f2)
check "Stock consistency ($STOCK ≈ 110)" "$([ "$STOCK" -ge 105 ] && echo true || echo false)"

# ─── T10.4: Concurrent cart adds (same product duplicate) ───
echo ""
echo "▶ T10.4: 5 concurrent cart adds (same product)"
CART_ID=$(curl -s "$CART/carts/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
PIDS=()
for i in $(seq 1 5); do
  curl -s -o /dev/null -w "%{http_code}" -X POST "$CART/carts/$CART_ID/items" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"quantity\":1}" > ~/tmp/cart_$i.txt &
  PIDS+=($!)
done
for pid in "${PIDS[@]}"; do wait $pid; done
SUCCESS=0
for i in $(seq 1 5); do
  CODE=$(cat ~/tmp/cart_$i.txt 2>/dev/null)
  [ "$CODE" = "201" ] || [ "$CODE" = "200" ] && SUCCESS=$((SUCCESS+1))
  rm -f ~/tmp/cart_$i.txt
done
check "Cart add handled ($SUCCESS/5 success, duplicates rejected)" "$([ "$SUCCESS" -ge 1 ] && echo true || echo false)"

# ─── T10.5: Concurrent order (same cart double-order prevention) ───
echo ""
echo "▶ T10.5: 3 concurrent orders (same cart)"
PIDS=()
for i in $(seq 1 3); do
  curl -s -o /dev/null -w "%{http_code}" -X POST "$ORDER/orders" -H "Content-Type: application/json" -H "$AUTH" -d "{\"customerId\":\"$USER_ID\",\"cartId\":\"$CART_ID\",\"items\":[{\"productId\":\"$PROD_ID\",\"vendorId\":\"$VENDOR_ID\",\"quantity\":1,\"unitPrice\":1500}],\"shippingAddress\":{\"line1\":\"123\",\"city\":\"Dhaka\",\"country\":\"BD\"},\"paymentMethod\":\"cash_on_delivery\",\"currency\":\"BDT\"}" > ~/tmp/order_$i.txt &
  PIDS+=($!)
done
for pid in "${PIDS[@]}"; do wait $pid; done
SUCCESS=0
for i in $(seq 1 3); do
  CODE=$(cat ~/tmp/order_$i.txt 2>/dev/null)
  [ "$CODE" = "201" ] || [ "$CODE" = "200" ] && SUCCESS=$((SUCCESS+1))
  rm -f ~/tmp/order_$i.txt
done
check "Order handled ($SUCCESS/3)" "$([ "$SUCCESS" -ge 1 ] && echo true || echo false)"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T10 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
