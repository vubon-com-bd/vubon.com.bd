# Payment Service — Docker Setup

Production-grade Docker image for Payment Service.

---

## 📁 Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Active Dockerfile (Debian, Prisma-safe) |
| `Dockerfile.alpine` | Alpine variant (smaller, may break Prisma) |
| `Dockerfile.debian` | Debian variant (same as active) |
| `.dockerignore` | Build context exclusions |

---

## 🏗️ Multi-Stage Build

```
Stage 1: deps
  ├── Copy lockfile + workspace config
  ├── Copy shared packages package.json
  ├── Copy payment-service package.json
  └── pnpm install --frozen-lockfile

Stage 2: builder
  ├── Copy node_modules from deps
  ├── Copy source (packages/ + apps/)
  └── Build 8 packages in topological order:
       1. shared-constants
       2. shared-types
       3. shared-utils
       4. shared-config
       5. shared-schemas
       6. shared-api
       7. shared-kernel
       8. payment-service

Stage 3: runtime
  ├── node:22-slim base
  ├── Install wget + tini
  ├── Create non-root user (app)
  ├── Copy from builder (node_modules + packages + dist)
  ├── USER app
  ├── HEALTHCHECK (wget --spider /api/health)
  ├── EXPOSE 3006
  ├── ENTRYPOINT tini
  └── CMD node dist/main.js
```

---

## 🚀 Build & Run

### 1. Build image

```bash
cd ~/vubon.com.bd
docker build -f apps/payment-service/Dockerfile -t vubon/payment-service:latest .
```

### 2. Run container

```bash
docker run -d \
  --name payment-service \
  -p 3006:3006 \
  -e PERSISTENCE_DRIVER=prisma \
  -e DATABASE_URL=postgresql://user:pass@host:5432/vubon_payment \
  -e REDIS_URL=redis://host:6379 \
  -e JWT_SECRET=your-secret-min-32-chars \
  -e NODE_ENV=production \
  vubon/payment-service:latest
```

### 3. Health check

```bash
curl http://localhost:3006/api/health
```

### 4. Stop

```bash
docker stop payment-service
docker rm payment-service
```

---

## 🌍 Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NODE_ENV` | ✅ | `production` | Runtime environment |
| `PORT` | ✅ | `3006` | HTTP port |
| `PERSISTENCE_DRIVER` | ⚠️ | `prisma` | `prisma` or `memory` |
| `DATABASE_URL` | ✅ (prisma) | — | Postgres connection |
| `REDIS_URL` | ✅ | — | Redis connection |
| `JWT_SECRET` | ✅ | — | Min 32 chars |
| `PRISMA_SKIP_ENGINE_BOOTSTRAP` | ⚠️ | `false` | `true` for Termux/dev |
| `QUEUE_AUTO_START_WORKERS` | ⚠️ | `true` | Background workers |
| `BKASH_ENABLED` | ⚠️ | `false` | Enable bKash gateway |
| `STRIPE_ENABLED` | ⚠️ | `false` | Enable Stripe gateway |

---

## 🧪 Verify Image

```bash
# Health
curl http://localhost:3006/api/health

# Swagger
curl http://localhost:3006/api/docs

# Create test payment
curl -X POST http://localhost:3006/api/payments \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: test-$(date +%s)" \
  -d '{
    "orderId": "00000000-0000-4000-8000-000000000006",
    "method": "card",
    "gateway": "stripe",
    "amount": 100,
    "currency": "BDT"
  }'

# List payments
curl "http://localhost:3006/api/payments?page=1&limit=5"

# Stats
curl http://localhost:3006/api/payments/stats
```

---

## 📊 Image Details

| Property | Value |
|----------|-------|
| Base image | `node:22-slim` (Debian) |
| Multi-stage | ✅ 3 stages |
| Non-root user | ✅ `app` |
| Health check | ✅ `wget --spider /api/health` |
| Signal handling | ✅ `tini` (PID 1) |
| Estimated size | ~350-450MB |
| Build time | ~3-5 min (with cache) |

---

## 🎯 For Termux (no Docker)

Use simulation mode:

```bash
# Stage 1 — verify deps
pnpm install --frozen-lockfile --dry-run

# Stage 2 — build all packages
pnpm --filter @vubon/shared-constants build && \
pnpm --filter @vubon/shared-types build && \
pnpm --filter @vubon/shared-utils build && \
pnpm --filter @vubon/shared-config build && \
pnpm --filter @vubon/shared-schemas build && \
pnpm --filter @vubon/shared-api build && \
pnpm --filter @vubon/shared-kernel build && \
pnpm --filter @vubon/payment-service build

# Stage 3 — run
PERSISTENCE_DRIVER=memory node dist/main.js
```

---

## 🐛 Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| `Cannot find module` | Build order wrong | Check `Dockerfile` RUN block order |
| `shared-kernel build failed` | `shared-types` not built | Ensure `shared-types` before `shared-kernel` |
| `shared-schemas missing` | Not in COPY | Add `COPY packages/shared-schemas/package.json` |
| `EACCES` permission | Non-root user | Files owned by `app:app` |
| `Prisma engine fail` | Alpine musl | Use Debian slim (`node:22-slim`) |
| `Port in use` | Old container | `docker rm -f payment-service` |
| `Health check fail` | Wrong endpoint | Check `/api/health` (with `/api` prefix) |

---

## 🎉 Production Checklist

- [x] Multi-stage build (deps → builder → runtime)
- [x] Non-root user
- [x] Health check
- [x] Signal handling (tini)
- [x] Build order correct (8 packages topological)
- [x] .dockerignore configured
- [x] Environment variables documented
- [x] API smoke tests pass
- [x] Graceful shutdown (SIGTERM)

---

**Generated by:** `scripts/generate-docker.mjs`
**Service:** `@vubon/payment-service`
**Port:** `3006`
**Last updated:** 2026-10-21
