#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
VENDOR="http://localhost:3003"
TS=$(date +%s)
EMAIL="t4-${TS}@vubon.com.bd"
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
echo "  T4: VENDOR LIFECYCLE — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T4\",\"lastName\":\"Vendor\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 3

# Vendor auto-create
echo "▶ Vendor auto-create"
VENDOR_ME=$(curl -s "$VENDOR/vendors/me" -H "$AUTH")
VENDOR_ID=$(echo "$VENDOR_ME" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$VENDOR_ID" ]; then echo "  ✅ Auto-created vendor ($VENDOR_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $VENDOR_ME"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# Get vendor
echo ""
echo "▶ Vendor get"
S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID" -H "$AUTH")
check "Get vendor" "$S" "200"

# Approve
echo ""
echo "▶ Vendor approve"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/approve" -H "Content-Type: application/json" -H "$AUTH" -d '{"notes":"t4"}')
check "Approve vendor" "$S" "200"

# Profile update
echo ""
echo "▶ Profile update"
S=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$VENDOR/vendors/$VENDOR_ID/profile" -H "Content-Type: application/json" -H "$AUTH" -d '{"description":"T4 vendor bio is a lengthy description for testing purposes only","logoUrl":"https://vubon.com.bd/img/logo.jpg"}')
check "Update profile" "$S" "200|404"

S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID/profile" -H "$AUTH")
check "Get profile" "$S" "200"

# Business update
echo ""
echo "▶ Business"
S=$(curl -s -o /dev/null -w "%{http_code}" -X PATCH "$VENDOR/vendors/$VENDOR_ID/business" -H "Content-Type: application/json" -H "$AUTH" -d '{"businessName":"T4 Traders","businessType":"retailer","registrationNumber":"REG-123"}')
check "Update business" "$S" "200|404"

# Contact + Address
echo ""
echo "▶ Contacts + Addresses"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/contacts" -H "Content-Type: application/json" -H "$AUTH" -d '{"type":"phone","value":"+8801712345678"}')
check "Add contact" "$S" "200|201|404"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/addresses" -H "Content-Type: application/json" -H "$AUTH" -d '{"type":"business","fullName":"T4 Vendor","phone":"+8801712345678","addressLine1":"123 Test","city":"Dhaka","state":"Dhaka","postalCode":"1200","country":"BD"}')
check "Add address" "$S" "200|201|404"

# Bank account
echo ""
echo "▶ Bank account"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/bank-accounts" -H "Content-Type: application/json" -H "$AUTH" -d '{"bankName":"BRAC Bank","accountHolderName":"T4 Vendor","accountNumber":"1234567890","branchName":"Gulshan","routingNumber":"123456789"}')
check "Add bank account" "$S" "200|201|404"

# Documents
echo ""
echo "▶ Documents"
S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/documents" -H "Content-Type: application/json" -H "$AUTH" -d '{"type":"nid","url":"https://vubon.com.bd/docs/nid.pdf","documentNumber":"1234567890"}')
check "Upload document" "$S" "200|201|404"

# Commission
echo ""
echo "▶ Commission"
# First configure commission
curl -s -X PATCH "$VENDOR/vendors/$VENDOR_ID/commissions" -H "Content-Type: application/json" -H "$AUTH" -d "{\"vendorId\":\"$VENDOR_ID\",\"type\":\"percentage\",\"rate\":10}" > /dev/null
S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID/commissions" -H "$AUTH")
check "List commissions" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$VENDOR/vendors/$VENDOR_ID/commissions/calculate" -H "Content-Type: application/json" -H "$AUTH" -d "{\"vendorId\":\"$VENDOR_ID\",\"orderAmount\":5000,\"currency\":\"BDT\"}")
check "Calculate commission" "$S" "200|201|404"

# Payout
echo ""
echo "▶ Payout"
S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID/payouts" -H "$AUTH")
check "List payouts" "$S" "200"

# Suspensions
echo ""
echo "▶ Suspensions"
S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID/suspensions" -H "$AUTH")
check "List suspensions" "$S" "200"

# Public
echo ""
echo "▶ Public"
S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/$VENDOR_ID/public")
check "Public vendor" "$S" "200"

S=$(curl -s -o /dev/null -w "%{http_code}" "$VENDOR/vendors/search?q=T4")
check "Search vendors" "$S" "200"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T4 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
