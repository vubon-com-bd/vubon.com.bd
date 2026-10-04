<!-- AUTO-GENERATED from docs/deployment.doc.ts. Do not edit directly. -->

PAYMENT SERVICE — DEPLOYMENT GUIDE
@module payment-service/docs

══════════════════════════════════════════════════════════════════
 🚂 RAILWAY DEPLOYMENT (PRIMARY)
══════════════════════════════════════════════════════════════════

 Deployed as Docker container on Railway.

 Configuration:
   • Root directory      — repository root (monorepo)
   • Dockerfile          — apps/payment-service/Dockerfile
   • Start command       — node dist/main.js
   • Health check path   — /api/v1/health
   • Restart policy      — on-failure (max 5)

 Build process:
   1. pnpm install (workspace)
   2. Build shared-* packages
   3. Build payment-service
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
   PORT           — 4005
   LOG_LEVEL      — info

 Gateway credentials (all from secrets manager):

   BKASH_*        — bKash tokenized checkout credentials
   NAGAD_*        — Nagad merchant credentials
   ROCKET_*       — Rocket (DBBL) credentials
   SSLCOMMERZ_*   — SSLCommerz store credentials
   STRIPE_*       — Stripe API + webhook secrets
   PAYPAL_*       — PayPal client + webhook secrets
   AAMARPAY_*     — aamarPay store credentials

 Payment policy (defaults from shared-config):
   PAYMENT_*      — Payment limits, capture window, idempotency
   REFUND_*       — Refund window, auto-approve, partial
   RECURRING_*    — Recurring/subscription policy
   INSTALLMENT_*  — Installment payment policy
   WEBHOOK_*      — Webhook retry + signature verification
   QUEUE_*        — BullMQ worker concurrency

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
   docker build -t payment-service:1.0.0 -f apps/payment-service/Dockerfile .

 Run:
   docker run -d \
     --name payment-service \
     -p 4005:4005 \
     -e DATABASE_URL=postgresql://... \
     -e REDIS_URL=redis://... \
     -e JWT_SECRET=... \
     -e BKASH_ENABLED=true \
     -e BKASH_APP_KEY=... \
     payment-service:1.0.0

 Health:
   curl http://localhost:4005/api/v1/health

---

══════════════════════════════════════════════════════════════════
 🗄️  DATABASE MIGRATIONS
══════════════════════════════════════════════════════════════════

 Schema lives in packages/shared-kernel/prisma/schema.prisma.
 Payment models: Payment, Transaction, Refund, WebhookEvent.

 Migrations:

   # On host / CI
   cd packages/shared-kernel
   pnpm prisma:generate
   pnpm prisma:migrate deploy

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
   • Idempotency keys survive restart
   • Sagas resume from event log after restart

---

══════════════════════════════════════════════════════════════════
 📊 MONITORING
══════════════════════════════════════════════════════════════════

 • Health endpoint   — GET /api/v1/health every 30s
 • Logs              — JSON structured (LOG_LEVEL=info)
 • Metrics           — Prometheus / OpenTelemetry
 • Errors            — Domain errors carry code + httpStatus
 • Webhook monitoring — countUnprocessed() + retryFailed()

---

══════════════════════════════════════════════════════════════════
 ⏪ ROLLBACK
══════════════════════════════════════════════════════════════════

 Railway:
   railway rollback

 Docker:
   docker stop payment-service
   docker run ... payment-service:0.9.9

---

══════════════════════════════════════════════════════════════════
 🌍 ENVIRONMENT MATRIX
══════════════════════════════════════════════════════════════════

 | Environment | DATABASE_URL                     | REDIS_URL              |
 |-------------|----------------------------------|------------------------|
 | Local       | postgresql://localhost:5432      | redis://localhost:6379 |
 | Staging     | Managed Postgres (pool=10)       | Managed Redis          |
 | Production  | Managed Postgres (pool=50, HA)   | Managed Redis cluster  |

 Gateways:
   Local/Staging → sandbox URLs + sandbox credentials
   Production    → live URLs + live credentials (from secrets manager)
