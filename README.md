# 🚀 Vubon.com.bd — Enterprise E-Commerce Platform

Production-grade e-commerce platform built on **NestJS 12**, **Prisma 5**, **PostgreSQL**, **Redis**, and **event-driven microservices** with DDD + CQRS + Hexagonal Architecture.

**7 microservices | 6,000+ TypeScript files | 410 notification handlers | 477 email templates | 9 payment gateways**

---

## 📦 Services Overview

| Service | Port | Files | Responsibility |
|---------|:----:|:-----:|----------------|
| **identity** | 3001 | 1,218 | Auth, users, KYC, MFA, sessions, roles |
| **product** | 3002 | 659 | Catalog, variants, inventory, pricing, reviews |
| **vendor** | 3003 | 943 | Onboarding, approval, commission, payouts, tiers |
| **cart** | 3004 | 562 | Cart, items, coupons, shipping, abandoned cart |
| **order** | 3005 | 638 | Checkout, fulfillment, delivery, returns, tracking |
| **payment** | 3006 | 688 | Payments, refunds, subscriptions, 9 gateways |
| **notification** | 4006 | 1,303 | Email/SMS/Push/In-App, 410 handlers, 477 templates |

---

## 🏛️ Architecture — 5 Layers (per service)

    ┌─────────────────────────────────────────┐
    │  Layer 5: MODULES       (NestJS wiring) │
    ├─────────────────────────────────────────┤
    │  Layer 4: INTERFACES    (HTTP/GraphQL)  │
    ├─────────────────────────────────────────┤
    │  Layer 3: INFRASTRUCTURE (DB, Cache)    │
    ├─────────────────────────────────────────┤
    │  Layer 2: APPLICATION   (CQRS use cases)│
    ├─────────────────────────────────────────┤
    │  Layer 1: DOMAIN        (Business rules)│
    └─────────────────────────────────────────┘

See [ARCHITECTURE.md](./ARCHITECTURE.md) for deep dive.

---

## 🧩 Core Patterns

- **DDD** — Entities, Value Objects, Aggregates, Domain Events, Specifications
- **CQRS** — Commands (write) / Queries (read) with separate handlers
- **Event-Driven** — Domain events → EventBridge → cross-service handlers
- **Sagas** — 38+ orchestration workflows
- **Multi-Provider** — 6 email + 6 SMS + 5 push + 9 payment gateways

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 22+, TypeScript 5.9
- **Framework:** NestJS 12 (REST + GraphQL)
- **Database:** PostgreSQL 16 (Prisma ORM) — 7 databases
- **Cache:** Redis 7
- **Queue:** BullMQ
- **Events:** EventBridge (in-process + Redis pub/sub)
- **Auth:** JWT + Passport + MFA + Biometric
- **Email:** Nodemailer + SendGrid + Resend + Mailgun + Postmark + SES
- **Payment:** bKash + Nagad + Rocket + SSLCommerz + aamarPay + Stripe + PayPal + COD + Crypto
- **Testing:** Jest
- **CI/CD:** GitHub Actions
- **Deploy:** Docker Compose + Nginx + PM2 (Termux)

---

## 🚀 Quick Start (Termux / Local Dev)

### Prerequisites

- Node.js >= 22
- pnpm >= 9
- PostgreSQL >= 14
- Redis >= 7

### 1. Clone

    git clone https://github.com/vubon-com-bd/vubon.com.bd.git
    cd vubon.com.bd
    pnpm install

### 2. Setup infrastructure

    pkg install postgresql redis -y
    initdb ~/.postgres-data
    pg_ctl -D ~/.postgres-data -l ~/.postgres-data/logfile start
    redis-server --daemonize yes

### 3. Create databases

    for db in vubon_identity vubon_product vubon_vendors vubon_cart vubon_order vubon_payment vubon_notification; do
      createdb -h localhost $db
    done

### 4. Configure env (per service)

    cp apps/identity-service/.env.example apps/identity-service/.env
    # edit DATABASE_URL, JWT_SECRET, etc.
    # repeat for all 7 services

### 5. Build all services

    for svc in identity product vendor cart order payment notification; do
      cd apps/${svc}-service && pnpm build && cd ../..
    done

### 6. Run all (PM2)

    pm2 start ecosystem.config.cjs
    pm2 list

### 7. Health check

    bash scripts/health-check.sh

All services should respond 200 OK on their health endpoints.

---

## 🐳 Production Deployment (VPS)

### Prerequisites

- Ubuntu 22.04+ / Debian 12+
- 4GB RAM, 2 vCPU, 40GB SSD
- Docker 24+, Docker Compose v2
- Domain: vubon.com.bd

### Deploy

    git clone https://github.com/vubon-com-bd/vubon.com.bd.git
    cd vubon.com.bd
    cp .env.production.example .env.production
    # Fill in real values

    # SSL (optional but recommended)
    apt install certbot -y
    certbot certonly --standalone -d vubon.com.bd -d www.vubon.com.bd
    cp /etc/letsencrypt/live/vubon.com.bd/fullchain.pem nginx/ssl/
    cp /etc/letsencrypt/live/vubon.com.bd/privkey.pem nginx/ssl/

    # Deploy
    bash scripts/deploy.sh

### Verify

    docker compose ps
    curl https://vubon.com.bd/health

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full guide.

---

## 📊 Current Status

    ✅ 7/7 services running (PM2 + Docker ready)
    ✅ PostgreSQL 7 databases
    ✅ Redis cache
    ✅ SMTP email (Gmail dev, SendGrid/Resend production ready)
    ✅ Full E2E: register → product → cart → order → payment → email
    ✅ Backup automation (3 AM daily)
    ✅ Health monitoring (every 15 min)
    ✅ 410 notification handlers verified
    ✅ Load tested (500+ req/sec @ 20 concurrent on Termux)
    ⚠️  DB_MODE=memory for dev (Prisma for production)

---

## 📁 Repository Structure

    vubon.com.bd/
    ├── apps/                          # 7 microservices
    │   ├── identity-service/
    │   ├── product-service/
    │   ├── vendor-service/
    │   ├── cart-service/
    │   ├── order-service/
    │   ├── payment-service/
    │   └── notification-service/
    │
    ├── packages/                      # Shared libraries
    │   ├── shared-kernel/            # DDD base, event bus, repos
    │   ├── shared-constants/
    │   ├── shared-types/
    │   ├── shared-schemas/
    │   ├── shared-utils/
    │   ├── shared-config/
    │   └── shared-api/
    │
    ├── nginx/                        # Reverse proxy config
    ├── scripts/                      # deploy, backup, health-check
    ├── docker-compose.yml            # Production stack
    ├── ecosystem.config.cjs          # PM2 (Termux)
    ├── .env.production.example
    ├── README.md
    ├── ARCHITECTURE.md
    ├── DEPLOYMENT.md
    └── TESTING.md

---

## 🧪 Testing

    # Per service
    cd apps/identity-service
    pnpm test
    pnpm test:cov
    pnpm test:e2e
    pnpm type-check

See [TESTING.md](./TESTING.md).

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer + DDD + CQRS + Events |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Termux + VPS + Docker |
| [TESTING.md](./TESTING.md) | Test strategy |

Per-service Swagger:
- identity:    http://localhost:3001/api/v1/docs
- product:     http://localhost:3002/api/docs
- vendor:      http://localhost:3003/api/docs
- cart:        http://localhost:3004/api/docs
- order:       http://localhost:3005/api/docs
- payment:     http://localhost:3006/api/docs
- notification: http://localhost:4006/api/docs

---

## 🔐 Security

- JWT (15min access, 7d refresh)
- MFA (TOTP + backup codes)
- Biometric auth
- Account lock (5 failed attempts)
- KYC verification
- Rate limiting (per endpoint)
- CORS strict origin
- Idempotency keys
- Webhook signatures
- SQL injection protection (Prisma)
- XSS/CSRF headers (Nginx)

See [SECURITY.md](./SECURITY.md).

---

## 📄 License

MIT © Vubon Team
