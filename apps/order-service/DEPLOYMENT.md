<!-- AUTO-GENERATED from docs/deployment.doc.ts. Do not edit directly. -->

ORDER SERVICE — DEPLOYMENT GUIDE
@module order-service/docs

══════════════════════════════════════════════════════════════════
 🚂 RAILWAY DEPLOYMENT (PRIMARY)
══════════════════════════════════════════════════════════════════

 Deployed as Docker container on Railway.

 Configuration:
   • Root directory      — repository root (monorepo)
   • Dockerfile          — apps/order-service/Dockerfile
   • Start command       — node dist/main.js
   • Health check path   — /api/v1/health
   • Restart policy      — on-failure (max 5)

 Build process:
   1. pnpm install (workspace)
   2. Build shared-* packages
   3. Build order-service
   4. Run migrations (Prisma)
   5. Start Node server

---

══════════════════════════════════════════════════════════════════
 🔧 ENVIRONMENT VARIABLES
══════════════════════════════════════════════════════════════════

 Required in production:

   DATABASE_URL   — PostgreSQL connection string (sslmode=require)
   REDIS_URL      — Redis URL (rediss:// for TLS)
   JWT_SECRET     — Min 32 chars (from secrets manager)
   NODE_ENV       — production
   PORT           — 4004
   LOG_LEVEL      — info

 Optional (defaults from shared-constants):
   ORDER_*        — Order limits
   CHECKOUT_*     — Checkout window
   DELIVERY_*     — Delivery policy

---

══════════════════════════════════════════════════════════════════
 🐳 DOCKER BUILD
══════════════════════════════════════════════════════════════════

 Multi-stage Dockerfile:

   # Stage 1: base       — Node 22 Alpine + pnpm
   # Stage 2: deps       — Install workspace deps
   # Stage 3: build      — Compile TS
   # Stage 4: runtime    — Non-root app user, dist only

 Build:
   docker build -t order-service:1.0.0 -f apps/order-service/Dockerfile .

 Run:
   docker run -d \
     --name order-service \
     -p 4004:4004 \
     -e DATABASE_URL=postgresql://... \
     -e REDIS_URL=redis://... \
     -e JWT_SECRET=... \
     order-service:1.0.0

 Health:
   curl http://localhost:4004/api/v1/health

---

══════════════════════════════════════════════════════════════════
 🗄️  DATABASE MIGRATIONS
══════════════════════════════════════════════════════════════════

 Migrations run before service starts on first deploy.

   # On host / CI
   pnpm --filter @vubon/order-service prisma:generate
   pnpm --filter @vubon/order-service prisma:migrate deploy

   # Or via release command (Railway)
   pnpm prisma migrate deploy

---

══════════════════════════════════════════════════════════════════
 🔄 ROLLING UPDATES
══════════════════════════════════════════════════════════════════

 1. New container starts → health check passes
 2. Old version drains  → in-flight requests complete (30s)
 3. Traffic switches    → Railway load balancer handles

 Zero-downtime achieved because:
   • Health check gates traffic
   • Migrations are additive (no destructive schema changes)
   • Sagas resume from event log after restart

---

══════════════════════════════════════════════════════════════════
 📊 MONITORING
══════════════════════════════════════════════════════════════════

 • Health endpoint   — GET /api/v1/health every 30s
 • Logs              — JSON structured (LOG_LEVEL=info)
 • Metrics           — Prometheus / OpenTelemetry
 • Errors            — Domain errors carry code + httpStatus

---

══════════════════════════════════════════════════════════════════
 ⏪ ROLLBACK
══════════════════════════════════════════════════════════════════

 Railway:
   railway rollback

 Docker:
   docker stop order-service
   docker run ... order-service:0.9.9

---

══════════════════════════════════════════════════════════════════
 🌍 ENVIRONMENT MATRIX
══════════════════════════════════════════════════════════════════

 | Environment | DATABASE_URL                     | REDIS_URL              |
 |-------------|----------------------------------|------------------------|
 | Local       | postgresql://localhost:5432      | redis://localhost:6379 |
 | Staging     | Managed Postgres (pool=10)       | Managed Redis          |
 | Production  | Managed Postgres (pool=50, HA)   | Managed Redis cluster  |
