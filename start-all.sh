#!/bin/bash
# start-all.sh — Start all 7 services
cd ~/vubon.com.bd

# Stop any existing
pkill -f "dist/main.js" 2>/dev/null
sleep 2

echo "═══ Starting all 7 services ═══"

services=("identity:3001" "product:3002" "order:3003" "cart:3004" "vendor:3005" "payment:3006" "notification:4006")

for entry in "${services[@]}"; do
  svc="${entry%%:*}"
  port="${entry##*:}"
  cd ~/vubon.com.bd/apps/${svc}-service
  setsid node dist/main.js > ~/${svc}-service.log 2>&1 < /dev/null &
  echo "  ▶ $svc (port $port) started"
  sleep 1
  cd ~/vubon.com.bd
done

echo ""
echo "⏳ Waiting 15s for services to boot..."
sleep 15

echo ""
echo "═══ Health Check ═══"
for entry in "${services[@]}"; do
  svc="${entry%%:*}"
  port="${entry##*:}"
  status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 "http://localhost:$port/health" 2>/dev/null)
  if [ "$status" = "200" ]; then
    echo "  ✅ $svc (port $port): OK"
  else
    echo "  ⚠️  $svc (port $port): $status"
  fi
done
