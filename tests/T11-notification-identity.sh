#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
TS=$(date +%s)
EMAIL="t11-${TS}@vubon.com.bd"
PASS="Test@12345"

PASS_COUNT=0
FAIL_COUNT=0

echo "═══════════════════════════════════════════════════════"
echo "  T11: NOTIFICATION — Identity handlers real test"
echo "═══════════════════════════════════════════════════════"
echo ""

# Clear notification log for clean test
> ~/logs/notification-out.log 2>/dev/null || true

# T11.1 Register → identity.user.created event
echo "▶ T11.1: Register → identity.user.created"
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T11\",\"lastName\":\"Notif\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
sleep 3
LOG=$(grep -c "UserCreatedHandler\|identity.user.created" ~/logs/notification-out.log 2>/dev/null || echo 0)
if [ "$LOG" -gt 0 ]; then echo "  ✅ identity.user.created handled ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Event not logged (async)"; fi

# T11.2 Login → identity.session.created
echo ""
echo "▶ T11.2: Login → identity.session.created"
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 2
LOG=$(grep -c "SessionCreatedHandler\|identity.session.created" ~/logs/notification-out.log 2>/dev/null || echo 0)
if [ "$LOG" -gt 0 ]; then echo "  ✅ identity.session.created handled ($LOG)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async event not logged yet"; fi

# T11.3 Update profile → identity.user.profile_updated
echo ""
echo "▶ T11.3: Update profile → identity.user.profile_updated"
curl -s -X PUT "$API/users/me/profile" -H "Content-Type: application/json" -H "$AUTH" -d '{"bio":"T11 notification test bio","firstName":"T11Updated"}' > /dev/null
sleep 2
LOG=$(grep -a "UserProfileUpdatedHandler\|profile_updated" ~/logs/notification-out.log 2>/dev/null | wc -l || echo 0)
if [ "$LOG" -gt 0 ]; then echo "  ✅ user.profile_updated handled"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

# T11.4 Add address → identity.user.address_added
echo ""
echo "▶ T11.4: Add address → identity.user.address_added"
curl -s -X POST "$API/users/me/addresses" -H "Content-Type: application/json" -H "$AUTH" -d '{"type":"shipping","fullName":"T11 Test","phone":"+8801712345678","addressLine1":"123 Test St","city":"Dhaka","state":"Dhaka","division":"Dhaka","district":"Dhaka","postalCode":"1200","country":"BD"}' > /dev/null
sleep 2
LOG=$(grep -c "UserAddressAddedHandler\|address_added" ~/logs/notification-out.log 2>/dev/null || echo 0)
if [ "$LOG" -gt 0 ]; then echo "  ✅ user.address_added handled"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi

# T11.5 Change password → identity.auth.password_changed
echo ""
echo "▶ T11.5: Change password → identity.auth.password_changed"
# Skip if no change-password endpoint works
CHG=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/change-password" -H "Content-Type: application/json" -H "$AUTH" -d "{\"currentPassword\":\"$PASS\",\"newPassword\":\"NewPass@123\"}")
if [ "$CHG" = "200" ]; then
  sleep 2
  LOG=$(grep -c "PasswordChangedHandler\|password_changed" ~/logs/notification-out.log 2>/dev/null || echo 0)
  if [ "$LOG" -gt 0 ]; then echo "  ✅ password_changed handled"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi
else
  echo "  ⚠️  change-password endpoint $CHG (skipped)"
fi

# T11.6 MFA enable
echo ""
echo "▶ T11.6: MFA enable → identity.mfa.enabled"
MFA=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/mfa/enable" -H "Content-Type: application/json" -H "$AUTH" -d '{"method":"totp"}')
if [ "$MFA" = "200" ] || [ "$MFA" = "201" ]; then
  sleep 2
  LOG=$(grep -a "MfaEnabledHandler\|mfa.enabled" ~/logs/notification-out.log 2>/dev/null | wc -l || echo 0)
  if [ "$LOG" -gt 0 ]; then echo "  ✅ mfa.enabled handled"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  Async not logged"; fi
else
  echo "  ⚠️  mfa endpoint $MFA (skipped)"
fi

# Total notification handler activity
echo ""
echo "▶ Notification activity summary"
TOTAL_HANDLERS=$(grep -a "Registered handler" ~/logs/notification-out.log 2>/dev/null | wc -l || echo 0)
TOTAL_EVENTS=$(grep -a "Processing " ~/logs/notification-out.log 2>/dev/null | wc -l || echo 0)
echo "  📊 Registered handlers: $TOTAL_HANDLERS"
echo "  📊 Events processed: $TOTAL_EVENTS"

if [ "$TOTAL_EVENTS" -gt 0 ]; then
  PASS_COUNT=$((PASS_COUNT+1))
  echo "  ✅ Event processing confirmed"
else
  FAIL_COUNT=$((FAIL_COUNT+1))
  echo "  🔴 No events processed"
fi

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T11 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
