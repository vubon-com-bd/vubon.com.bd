#!/data/data/com.termux/files/usr/bin/bash
# ═══════════════════════════════════════════════════════════
# Vubon Health Check — all services + infra
# ═══════════════════════════════════════════════════════════

TS=$(date '+%Y-%m-%d %H:%M:%S')
FAIL=0

echo "═══════════════════════════════════════════════════════"
echo "  Health Check — $TS"
echo "═══════════════════════════════════════════════════════"
echo ""

# ─── Infrastructure ───
echo "🏗️  Infrastructure:"
if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
  echo "  ✅ PostgreSQL (5432)"
else
  echo "  🔴 PostgreSQL DOWN"
  FAIL=$((FAIL + 1))
fi

if redis-cli ping > /dev/null 2>&1; then
  echo "  ✅ Redis (6379)"
else
  echo "  🔴 Redis DOWN"
  FAIL=$((FAIL + 1))
fi

echo ""

# ─── Services ───
echo "🚀 Services:"
SERVICES="identity:3001:/api/v1/health product:3002:/health vendor:3003:/health cart:3004:/health order:3005:/health payment:3006:/health notification:4006:/health"
for entry in $SERVICES; do
  name="${entry%%:*}"
  rest="${entry#*:}"
  port="${rest%%:*}"
  path="${rest#*:}"
  status=$(curl -sf -o /dev/null -w "%{http_code}" --max-time 3 "http://localhost:$port$path" 2>/dev/null || echo "000")
  if [ "$status" = "200" ]; then
    echo "  ✅ $name (port $port)"
  else
    echo "  🔴 $name (port $port) — HTTP $status"
    FAIL=$((FAIL + 1))
  fi
done

echo ""

# ─── PM2 ───
echo "📊 PM2:"
PM2_ONLINE=$(pm2 list 2>/dev/null | grep -c "online")
PM2_ERR=$(pm2 list 2>/dev/null | grep -c "errored")
echo "  Online: $PM2_ONLINE"
if [ "$PM2_ERR" -gt 0 ]; then
  echo "  🔴 Errored: $PM2_ERR"
  FAIL=$((FAIL + PM2_ERR))
fi

echo ""

# ─── Disk ───
echo "💾 Disk:"
DISK_USAGE=$(df -h ~ 2>/dev/null | tail -1 | awk '{print $5}' | sed 's/%//')
echo "  Usage: ${DISK_USAGE}%"
if [ "$DISK_USAGE" -gt 90 ]; then
  echo "  🔴 Disk > 90%"
  FAIL=$((FAIL + 1))
fi

echo ""

# ─── Result ───
if [ "$FAIL" -eq 0 ]; then
  echo "═══════════════════════════════════════════════════════"
  echo "  ✅ ALL SYSTEMS HEALTHY"
  echo "═══════════════════════════════════════════════════════"
  exit 0
else
  echo "═══════════════════════════════════════════════════════"
  echo "  🔴 $FAIL ISSUE(S) DETECTED"
  echo "═══════════════════════════════════════════════════════"
  exit 1
fi
