#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
PRODUCT="http://localhost:3002"
CART="http://localhost:3004"
ORDER="http://localhost:3005"
TS=$(date +%s)
EMAIL="t9-${TS}@vubon.com.bd"

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
echo "  T9: ERROR HANDLING"
echo "═══════════════════════════════════════════════════════"
echo ""

# Invalid email
echo "▶ Register validation"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d '{"email":"not-an-email","password":"Test@123","confirmPassword":"Test@123","acceptTerms":true,"firstName":"T9","lastName":"Err","phone":"+8801712345678"}')
check "Invalid email" "$S" "400"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d '{"email":"weak@vubon.com.bd","password":"123","confirmPassword":"123","acceptTerms":true,"firstName":"T9","lastName":"Err","phone":"+8801712345678"}')
check "Weak password" "$S" "400"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d '{"email":"badphone@vubon.com.bd","password":"Test@123","confirmPassword":"Test@123","acceptTerms":true,"firstName":"T9","lastName":"Err","phone":"123"}')
check "Invalid phone" "$S" "400"

# Duplicate
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"Test@12345\",\"confirmPassword\":\"Test@12345\",\"acceptTerms\":true,\"firstName\":\"T9\",\"lastName\":\"Err\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"Test@12345\",\"confirmPassword\":\"Test@12345\",\"acceptTerms\":true,\"firstName\":\"T9\",\"lastName\":\"Err\",\"phone\":\"+8801700${TS: -6}\"}")
check "Duplicate email" "$S" "409"

# Auth errors
echo ""
echo "▶ Auth errors"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"WrongPass\"}")
check "Wrong password" "$S" "401"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"nonexistent-${TS}@vubon.com.bd\",\"password\":\"any\"}")
check "Nonexistent user" "$S" "404"

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/profile")
check "Missing JWT" "$S" "401"

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/profile" -H "Authorization: Bearer invalid.jwt.token")
check "Invalid JWT" "$S" "401"

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/profile" -H "Authorization: Bearer ")
check "Empty JWT" "$S" "401"

# Get valid token
TOKEN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"Test@12345\"}" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"

# Not found
echo ""
echo "▶ Not found"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/profile" -H "Authorization: Bearer invalid-token-here")
check "Invalid token + protected" "$S" "401"

S=$(curl -s -o /dev/null -w "%{http_code}" "$PRODUCT/products/00000000-0000-0000-0000-000000000000" -H "$AUTH")
check "Non-existent product" "$S" "404"

S=$(curl -s -o /dev/null -w "%{http_code}" "$ORDER/orders/00000000-0000-0000-0000-000000000000" -H "$AUTH")
check "Non-existent order (secure by 403)" "$S" "403|404"

# Validation
echo ""
echo "▶ Validation"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$PRODUCT/categories" -H "Content-Type: application/json" -H "$AUTH" -d '{"name":"","slug":""}')
check "Empty category" "$S" "400"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$CART/carts/not-a-uuid/items" -H "Content-Type: application/json" -H "$AUTH" -d '{"productId":"not-uuid","quantity":0}')
check "Invalid UUID + qty (secure)" "$S" "400|403|404"

# Rate limiting (rapid login attempts)
echo ""
echo "▶ Rate limiting"
RATE_FAIL=0
for i in 1 2 3 4 5 6 7 8 9 10; do
  S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"rate-${TS}@vubon.com.bd\",\"password\":\"wrong\"}")
  if [ "$S" = "429" ]; then
    RATE_FAIL=1
    echo "  ✅ Rate limited at attempt $i (HTTP $S)"; PASS_COUNT=$((PASS_COUNT+1))
    break
  fi
done
if [ "$RATE_FAIL" = "0" ]; then
  echo "  ⚠️  Rate limit not hit in 10 attempts (may be disabled for dev)"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T9 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
