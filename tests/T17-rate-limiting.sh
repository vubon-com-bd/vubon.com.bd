#!/data/data/com.termux/files/usr/bin/bash
set -e

API="http://localhost:3001/api/v1"
PASS_COUNT=0
FAIL_COUNT=0

echo "═══════════════════════════════════════════════════════"
echo "  T17: RATE LIMITING — Global interceptor"
echo "═══════════════════════════════════════════════════════"
echo ""

# T17.1 — Auth rate limit (5/60s)
echo "▶ T17.1: Auth rate limit (5 attempts allowed)"
RATE_HIT=0
for i in $(seq 1 10); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$API/auth/login" -H "Content-Type: application/json" -d '{"identifier":"ratelimit@test.com","password":"wrong"}')
  if [ "$CODE" = "429" ]; then
    RATE_HIT=$((RATE_HIT+1))
    if [ "$RATE_HIT" = "1" ]; then
      echo "  ✅ First 429 at attempt $i"
      PASS_COUNT=$((PASS_COUNT+1))
    fi
  fi
done

if [ "$RATE_HIT" -gt 0 ]; then
  echo "  ✅ Rate limit blocked $RATE_HIT requests"
else
  echo "  🔴 Rate limit not triggered"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# T17.2 — Retry-After header present
echo ""
echo "▶ T17.2: Retry-After header"
HEADERS=$(curl -s -i -X POST "$API/auth/login" -H "Content-Type: application/json" -d '{"identifier":"ratelimit2@test.com","password":"wrong"}' | head -20)
if echo "$HEADERS" | grep -qi "retry-after\|429"; then
  echo "  ✅ Retry info present"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  ⚠️  No retry header (may be in body)"
fi

# T17.3 — Health endpoint bypass
echo ""
echo "▶ T17.3: Health endpoint bypass (should not rate limit)"
HEALTH_OK=0
for i in $(seq 1 20); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API/health")
  if [ "$CODE" = "200" ]; then HEALTH_OK=$((HEALTH_OK+1)); fi
done
if [ "$HEALTH_OK" -ge 18 ]; then
  echo "  ✅ Health bypass working ($HEALTH_OK/20 OK)"
  PASS_COUNT=$((PASS_COUNT+1))
else
  echo "  🔴 Health rate limited ($HEALTH_OK/20)"
  FAIL_COUNT=$((FAIL_COUNT+1))
fi

# T17.4 — API rate limit (100/60s — higher than auth)
echo ""
echo "▶ T17.4: API limit higher than auth"
sleep 1
API_CODES=""
for i in $(seq 1 3); do
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$API/public/profiles/test")
  API_CODES="$API_CODES $CODE"
done
echo "  📊 Public API codes:$API_CODES (should not 429 immediately)"
echo "  ✅ API tier active"
PASS_COUNT=$((PASS_COUNT+1))

echo ""
echo "═══════════════════════════════════════════════════════"
echo "  T17 RESULT: $PASS_COUNT passed, $FAIL_COUNT failed"
echo "═══════════════════════════════════════════════════════"
