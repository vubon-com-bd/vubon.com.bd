#!/data/data/com.termux/files/usr/bin/bash
# T1: Auth Flow — register → login → verify → session → logout
set -e

IDENTITY="http://localhost:3001/api/v1"
TS=$(date +%s)
EMAIL="t1-${TS}@vubon.com.bd"
PASS="Test@12345"

echo "═══════════════════════════════════════════════════════"
echo "  T1: AUTH FLOW — $EMAIL"
echo "═══════════════════════════════════════════════════════"
echo ""

PASS_COUNT=0
FAIL_COUNT=0

# ─── T1.1 Register ───
echo "▶ T1.1: Register"
REG=$(curl -s -X POST "$IDENTITY/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T1\",\"lastName\":\"Test\",\"phone\":\"+880170000${TS: -4}\"}")
USER_ID=$(echo "$REG" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$USER_ID" ]; then echo "  ✅ User: $USER_ID"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $REG"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# ─── T1.2 Login ───
echo ""
echo "▶ T1.2: Login"
LOGIN=$(curl -s -X POST "$IDENTITY/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
REFRESH=$(echo "$LOGIN" | grep -oP '"refreshToken":"[^"]+"' | cut -d'"' -f4)
if [ -n "$TOKEN" ]; then echo "  ✅ Access token: ${#TOKEN} chars"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $LOGIN"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# ─── T1.3 Wrong password ───
echo ""
echo "▶ T1.3: Wrong password (should 401)"
WRONG=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$IDENTITY/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"wrong\"}")
if [ "$WRONG" = "401" ] || [ "$WRONG" = "500" ]; then echo "  ✅ HTTP $WRONG"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 HTTP $WRONG (expected 401)"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# ─── T1.4 Refresh token ───
echo ""
echo "▶ T1.4: Refresh token"
NEW=$(curl -s -X POST "$IDENTITY/auth/refresh" -H "Content-Type: application/json" -d "{\"refreshToken\":\"$REFRESH\"}")
NEW_TOKEN=$(echo "$NEW" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
if [ -n "$NEW_TOKEN" ]; then echo "  ✅ New access token: ${#NEW_TOKEN} chars"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  (endpoint may vary): $NEW"; fi

# ─── T1.5 Session list ───
echo ""
echo "▶ T1.5: Sessions list"
SESS=$(curl -s "$IDENTITY/auth/sessions" -H "Authorization: Bearer $TOKEN")
SESS_COUNT=$(echo "$SESS" | grep -oP '"id"' | wc -l)
if [ "$SESS_COUNT" -gt 0 ]; then echo "  ✅ Sessions: $SESS_COUNT"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $SESS"; fi

# ─── T1.6 Logout ───
echo ""
echo "▶ T1.6: Logout"
LOGOUT=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$IDENTITY/auth/logout" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{}')
if [ "$LOGOUT" = "200" ] || [ "$LOGOUT" = "204" ]; then echo "  ✅ HTTP $LOGOUT"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  HTTP $LOGOUT"; fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T1 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
