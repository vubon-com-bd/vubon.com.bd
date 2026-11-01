#!/bin/bash
# ═══════════════════════════════════════════════════════════
# Vubon.com.bd — VPS Deploy Script
# ═══════════════════════════════════════════════════════════
set -e

echo "🚀 Vubon Deploy — $(date '+%Y-%m-%d %H:%M:%S')"

# Check prerequisites
command -v docker >/dev/null 2>&1 || { echo "❌ Docker required"; exit 1; }
docker compose version >/dev/null 2>&1 || { echo "❌ Docker Compose v2 required"; exit 1; }

# Check env
if [ ! -f .env.production ]; then
  echo "❌ .env.production missing — copy from .env.example"
  exit 1
fi

# Pull/build
echo "📦 Building images..."
docker compose build --parallel

# Start
echo "🎬 Starting services..."
docker compose up -d

# Wait
echo "⏳ Waiting 60s for services to be healthy..."
sleep 60

# Status
echo "📊 Service status:"
docker compose ps

# Health checks
echo "🩺 Health checks:"
for port in 3001 3002 3003 3004 3005 3006; do
  path="/health"
  [ "$port" = "3001" ] && path="/api/v1/health"
  if curl -sf -o /dev/null --max-time 3 "http://localhost:8080$path" 2>/dev/null; then
    echo "  ✅ Port $port"
  else
    echo "  ⚠️  Port $port (may need more time)"
  fi
done

echo ""
echo "✅ Deploy complete"
echo "   Logs: docker compose logs -f"
echo "   Stop: docker compose down"
