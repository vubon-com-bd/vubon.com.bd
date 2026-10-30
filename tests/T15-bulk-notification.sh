#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
NOTIF="http://localhost:4006"
TS=$(date +%s)
EMAIL="t15-${TS}@vubon.com.bd"
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
echo "  T15: BULK NOTIFICATION — Schedule/Broadcast/Digest"
echo "═══════════════════════════════════════════════════════"
echo ""

# Setup admin
curl -s -X POST "$API/auth/register" -H "Content-Type: application/json" -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\",\"confirmPassword\":\"$PASS\",\"acceptTerms\":true,\"firstName\":\"T15\",\"lastName\":\"Bulk\",\"phone\":\"+8801700${TS: -6}\"}" > /dev/null
LOGIN=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$LOGIN" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
USER_ID=$(echo "$LOGIN" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
AUTH="Authorization: Bearer $TOKEN"
sleep 2
curl -s -X POST "$API/auth/roles/assign" -H "Content-Type: application/json" -H "$AUTH" -d "{\"userId\":\"$USER_ID\",\"role\":\"admin\"}" > /dev/null
sleep 1
TOKEN2=$(curl -s -X POST "$API/auth/login" -H "Content-Type: application/json" -d "{\"identifier\":\"$EMAIL\",\"password\":\"$PASS\"}" | grep -oP '"accessToken":"[^"]+"' | cut -d'"' -f4)
AUTH2="Authorization: Bearer $TOKEN2"
sleep 2

# T15.1 Schedule create
echo "▶ T15.1: Create schedule"
SCHED=$(curl -s -X POST "$NOTIF/schedules" -H "Content-Type: application/json" -H "$AUTH2" -d "{\"name\":\"T15 Schedule\",\"type\":\"scheduled\",\"recurrence\":\"none\",\"scheduledAt\":\"2026-12-01T10:00:00Z\",\"timezone\":\"Asia/Dhaka\",\"templateId\":\"00000000-0000-0000-0000-000000000000\",\"recipientIds\":[\"$USER_ID\"],\"data\":{\"message\":\"test\"}}")
SCHED_ID=$(echo "$SCHED" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$SCHED_ID" ]; then echo "  ✅ Schedule created ($SCHED_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  🔴 $SCHED"; FAIL_COUNT=$((FAIL_COUNT+1)); fi

# T15.2 List schedules
echo ""
echo "▶ T15.2: List schedules"
S=$(curl -s -o /dev/null -w "%{http_code}" "$NOTIF/schedules" -H "$AUTH2")
check "List schedules" "$S" "200"

# T15.3 Get schedule
echo ""
echo "▶ T15.3: Get schedule"
if [ -n "$SCHED_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" "$NOTIF/schedules/$SCHED_ID" -H "$AUTH2")
  check "Get schedule" "$S" "200"
fi

# T15.4 Update schedule
echo ""
echo "▶ T15.4: Update schedule"
if [ -n "$SCHED_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X PUT "$NOTIF/schedules/$SCHED_ID" -H "Content-Type: application/json" -H "$AUTH2" -d '{"name":"T15 Schedule Updated"}')
  check "Update schedule" "$S" "200"
fi

# T15.5 Delete schedule
echo ""
echo "▶ T15.5: Delete schedule"
if [ -n "$SCHED_ID" ]; then
  S=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$NOTIF/schedules/$SCHED_ID" -H "$AUTH2")
  check "Delete schedule" "$S" "200|204"
fi

# T15.6 Broadcast create
echo ""
echo "▶ T15.6: Create broadcast"
BC=$(curl -s -X POST "$NOTIF/broadcasts" -H "Content-Type: application/json" -H "$AUTH2" -d "{\"name\":\"T15 Broadcast\",\"type\":\"all_users\",\"target\":\"all\",\"channels\":[\"email\"],\"templateId\":\"00000000-0000-0000-0000-000000000000\",\"content\":\"Test broadcast\",\"recipientIds\":[\"$USER_ID\"]}")
BC_ID=$(echo "$BC" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$BC_ID" ]; then echo "  ✅ Broadcast created ($BC_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $BC"; fi

# T15.7 List broadcasts
echo ""
echo "▶ T15.7: List broadcasts"
S=$(curl -s -o /dev/null -w "%{http_code}" "$NOTIF/broadcasts" -H "$AUTH2")
check "List broadcasts" "$S" "200"

# T15.8 Digest create
echo ""
echo "▶ T15.8: Create digest"
DG=$(curl -s -X POST "$NOTIF/digests" -H "Content-Type: application/json" -H "$AUTH2" -d "{\"userId\":\"$USER_ID\",\"frequency\":\"daily\",\"type\":\"summary\",\"categories\":[\"order\"],\"sendHour\":10,\"timezone\":\"Asia/Dhaka\"}")
DG_ID=$(echo "$DG" | grep -oP '"id":"[^"]+"' | head -1 | cut -d'"' -f4)
if [ -n "$DG_ID" ]; then echo "  ✅ Digest created ($DG_ID)"; PASS_COUNT=$((PASS_COUNT+1)); else echo "  ⚠️  $DG"; fi

# T15.9 List digests
echo ""
echo "▶ T15.9: List digests"
S=$(curl -s -o /dev/null -w "%{http_code}" "$NOTIF/digests" -H "$AUTH2")
check "List digests" "$S" "200"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T15 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
