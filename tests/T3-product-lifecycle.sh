#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
PRODUCT="http://localhost:3002"
VENDOR="http://localhost:3003"
TS=$(date +%s)
EMAIL="t3-${TS}@vubon.com.bd"
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
echo "  T3: PRODUCT LIFECYCLE — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T3\",\"lastName\":\"Test\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3

VENDOR_ID=$(curl -s "$VENDOR/vendors/me" -H "$AUTH" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
curl -s -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t3"}' > /dev/null
echo "  Setup: user + vendor=$VENDOR_ID"
echo ""

# Category
echo "▶ Category"
CAT=$(curl -s -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T3Cat\",\"slug\":\"t3cat-$TS\"}")
CAT_ID=$(echo "$CAT" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$CAT_ID" ]; then echo "  ✅ Create category ($CAT_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $CAT"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/categories" -H "$AUTH")
check "List categories" "$S" "200"

# Product
echo ""
echo "▶ Product"
PROD=$(curl -s -X POST "$PRODUCT/products" -H "Content-Type: application/json" -H "$AUTH" -d "{\"name\":\"T3 Product\",\"slug\":\"t3p-$TS\",\"sku\":\"T3-$TS\",\"type\":\"physical\",\"categoryId\":\"$CAT_ID\",\"vendorId\":\"$VENDOR_ID\",\"price\":1500,\"currency\":\"BDT\"}")
PROD_ID=$(echo "$PROD" | grep -oP '"productId":"[^"]+"' | cut -d'"' -f4)
if [ -n "$PROD_ID" ]; then echo "  ✅ Create product ($PROD_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $PROD"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/products" -H "$AUTH")
check "List products" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/products/$PROD_ID" -H "$AUTH")
check "Get product" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$PRODUCT/products/$PROD_ID" -H "Content-Type: application/json" -H "$AUTH" -d '{"name":"T3 Updated"}')
check "Update product" "$S" "200"

# Variant
echo ""
echo "▶ Variant"
VAR=$(curl -s -X POST "$PRODUCT/product-variants" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"name\":\"Default\",\"sku\":\"T3V-$TS\",\"type\":\"weight\",\"options\":[{\"name\":\"W\",\"value\":\"1kg\"}],\"price\":1500}")
VAR_ID=$(echo "$VAR" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$VAR_ID" ]; then echo "  ✅ Create variant ($VAR_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $VAR"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/product-variants/$VAR_ID" -H "$AUTH")
check "Get variant" "$S" "200"

# Inventory (auto-created)
echo ""
echo "▶ Inventory"
sleep 2
INV=$(curl -s "$PRODUCT/product-inventory/by-product/$PROD_ID" -H "$AUTH")
INV_ID=$(echo "$INV" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$INV_ID" ]; then echo "  ✅ Auto-created inventory ($INV_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $INV"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/product-inventory/$INV_ID/update" -H "Content-Type: application/json" -H "$AUTH" -d '{"delta":50,"reason":"init"}')
check "Update stock" "$S" "200"

# Media
echo ""
echo "▶ Media"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products/$PROD_ID/media" -H "Content-Type: application/json" -H "$AUTH" -d '{"items":[{"url":"https://vubon.com.bd/img/t3.jpg","type":"image","alt":"t3","order":0,"isPrimary":true}]}')
check "Add media" "$S" "201|200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/products/$PROD_ID/media" -H "$AUTH")
check "List media" "$S" "200"

# Publish workflow
echo ""
echo "▶ Publish workflow"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products/$PROD_ID/submit" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Submit" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products/$PROD_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Approve" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/products/$PROD_ID/publish" -H "Content-Type: application/json" -H "$AUTH" -d '{}')
check "Publish" "$S" "200"

# Review
echo ""
echo "▶ Review"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/product-reviews" -H "Content-Type: application/json" -H "$AUTH" -d "{\"productId\":\"$PROD_ID\",\"rating\":5,\"title\":\"Great\",\"content\":\"Excellent product\"}")
check "Submit review" "$S" "201|200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/product-reviews?productId=$PROD_ID" -H "$AUTH")
check "List reviews" "$S" "200"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T3 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
