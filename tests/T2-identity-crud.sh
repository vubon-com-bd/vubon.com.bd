#!/data/data/com.termux/files/usr/bin/bash
# T2: Identity CRUD — user, address, contact, preferences, KYC
set -e

API="http://localhost:3001/api/v1"
TS=$(date +%s)
EMAIL="t2-${TS}@vubon.com.bd"
PASS="Test@12345"

PASS_COUNT=0
FAIL_COUNT=0
FAIL_LIST=""

check() {
  local name="$1" status="$2" expected="$3"
  if [ "$status" = "$expected" ]; then
    echo "  ✅ $name (HTTP $status)"
    PASS_COUNT=$((PASS_COUNT+1))
  else
    echo "  🔴 $name (HTTP $status, expected $expected)"
    FAIL_COUNT=$((FAIL_COUNT+1))
    FAIL_LIST="$FAIL_LIST\n  - $name"
  fi
}

echo "═══════════════════════════════════════════════════════"
echo "  T2: IDENTITY CRUD — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup: register + login
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T2\",\"lastName\":\"Test\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"

if [ -z "$TOKEN" ]; then echo "🔴 Setup fail: no token"; exit 1; fi
echo "  Setup: user=$USER_ID"
echo ""

# ─── Profile ───
echo "▶ Profile CRUD"
S=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$API/users/me/profile" -H "Content-Type: application/json" -H "$AUTH" -d '{"bio":"Test bio","firstName":"Updated"}')
check "Update profile" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/profile" -H "$AUTH")
check "Get profile" "$S" "200"

# ─── Address ───
echo ""
echo "▶ Address CRUD"
ADDR=$(curl -s -X POST "$API/users/me/addresses" -H "Content-Type: application/json" -H "$AUTH" -d '{"type":"shipping","fullName":"T2 Test","phone":"+8801712345678","addressLine1":"123 Test Street","city":"Dhaka","state":"Dhaka","division":"Dhaka","district":"Dhaka","postalCode":"1200","country":"BD","label":"home","isDefault":true}')
ADDR_ID=$(echo "$ADDR" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$ADDR_ID" ]; then echo "  ✅ Create address ($ADDR_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Create address: $ADDR"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/addresses" -H "$AUTH")
check "List addresses" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$API/users/me/addresses/$ADDR_ID" -H "Content-Type: application/json" -H "$AUTH" -d '{"addressLine1":"456 Updated St"}')
check "Update address" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$API/users/me/addresses/$ADDR_ID" -H "$AUTH")
if [ "$S" = "200" ] || [ "$S" = "204" ]; then echo "  ✅ Delete address (HTTP $S)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Delete address (HTTP $S)"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# ─── Contact ───
echo ""
echo "▶ Contact CRUD"
CT=$(curl -s -X POST "$API/users/me/contacts" -H "Content-Type: application/json" -H "$AUTH" -d "{\"type\":\"email\",\"value\":\"alt-${TS}@vubon.com.bd\",\"isPrimary\":false}")
CT_ID=$(echo "$CT" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$CT_ID" ]; then echo "  ✅ Create contact ($CT_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 Create contact: $CT"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/contacts" -H "$AUTH")
check "List contacts" "$S" "200"

# ─── Preferences ───
echo ""
echo "▶ Preferences"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/preferences" -H "$AUTH")
check "Get preferences" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$API/users/me/preferences" -H "Content-Type: application/json" -H "$AUTH" -d '{"newsletter":true,"orderUpdates":true,"securityAlerts":true}')
check "Update preferences" "$S" "200"

# ─── Settings ───
echo ""
echo "▶ Settings"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/settings" -H "$AUTH")
check "Get settings" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$API/users/me/settings" -H "Content-Type: application/json" -H "$AUTH" -d '{"theme":"dark","language":"bn"}')
check "Update settings" "$S" "200"

# ─── KYC ───
echo ""
echo "▶ KYC"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/kyc/status" -H "$AUTH")
check "Get KYC status" "$S" "200"

# ─── Activity ───
echo ""
echo "▶ Activity"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/users/me/activity" -H "$AUTH")
check "List activity" "$S" "200"

# ─── Public Profile ───
echo ""
echo "▶ Public"
S=$(curl -s -o /dev/null -w "%{http_code}" "$API/public/profiles/$USER_ID")
check "Public profile" "$S" "200"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T2 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
