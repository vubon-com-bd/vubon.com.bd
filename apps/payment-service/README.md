# Payment Service — vubon.com.bd

Production-grade **Payment microservice** — DDD-based 5-layer architecture with **dual persistence mode** (Memory / Prisma) and **8 payment gateway integrations**.

[![NestJS](https://img.shields.io/badge/NestJS-12.x-red)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 📋 Overview

| Attribute | Value |
|-----------|-------|
| Package | `@vubon/payment-service` |
| Port | `3006` |
| Framework | NestJS 12 |
| Architecture | DDD + CQRS + Event Sourcing |
| DB Mode | PostgreSQL (Prisma) / InMemory (dual-mode) |
| Total Source Files | **675** |
| Test Files | **301** unit + **24** e2e |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22+
- **pnpm** 9+
- **PostgreSQL** 14+ (only for `PERSISTENCE_DRIVER=prisma`)
- **Redis** 6+

### Installation

```bash
# Install dependencies
pnpm install

# Copy env template
cp .env.example .env

# Edit .env (default is memory mode — no DB needed)
```

### Environment

```bash
# .env — minimum required
NODE_ENV=development
PORT=3006
PERSISTENCE_DRIVER=memory           # or 'prisma'
PRISMA_SKIP_ENGINE_BOOTSTRAP=true   # Termux only
JWT_SECRET=<32+ chars>
REDIS_URL=redis://localhost:6379
```

### Running

```bash
# Development (memory mode — no DB)
PERSISTENCE_DRIVER=memory pnpm start:dev

# Development (Prisma mode — needs DB)
PERSISTENCE_DRIVER=prisma pnpm start:dev

# Production
pnpm build && node dist/main.js
```

### Health Check

```bash
curl http://localhost:3006/api/health
```

Expected:
```json
{ "service": "payment-service", "healthy": true, "dependencies": [...] }
```

---

## 🏗️ Architecture

```
src/module/
├── domain/           Business logic (framework-free)
├── application/      Use cases (CQRS handlers)
├── infrastructure/   Persistence, queues, external gateways
├── interfaces/       Controllers, guards, DTOs
└── modules/          DI wiring (NestJS modules)
```

### 5 Layers — Detailed Stats

| Layer | Files | Key Components |
|-------|-------|----------------|
| **Domain** | 122 | 40 primitives + 12 composites + 10 entities + 10 repos + 10 services + 6 specs |
| **Application** | 231 | 36 commands + 18 queries + 3 sagas + 10 services |
| **Infrastructure** | 179 | 11 Prisma + 11 InMemory + 8 gateways + 9 workers |
| **Interfaces** | 82 | 12 REST + 8 webhooks + 2 GraphQL |
| **Modules** | 61 | 23 feature modules |
| **Total** | **675** | |

---

## 💳 Payment Gateways (8 Integrations)

| Gateway | Type | Status |
|---------|------|--------|
| **bKash** | Mobile Banking | ✅ |
| **Nagad** | Mobile Banking | ✅ |
| **Rocket** | Mobile Banking | ✅ |
| **Stripe** | International Card | ✅ |
| **PayPal** | International | ✅ |
| **SSLCommerz** | BD Gateway | ✅ |
| **aamarPay** | BD Gateway | ✅ |
| **COD** | Cash on Delivery | ✅ |

Each gateway supports:
- `initiate()` — begin payment
- `verify()` — confirm webhook/callback
- `capture()` — capture authorized payment
- `refund()` — issue refund
- `cancel()` — cancel payment
- `verifyWebhook()` — validate webhook signature

---

## 🎯 Features

### Payment Lifecycle

```
pending → processing → authorized → captured → paid
                ↘ failed
                ↘ declined
                ↘ cancelled
paid → refunded | partially_refunded → chargeback
```

### Refund Flow

```
requested → approved → processing → completed
         ↘ rejected
         ↘ cancelled
```

### Subscription Lifecycle

```
trialing → active → past_due → active
              ↓
         cancelled → expired
```

### Other Features

- ✅ **Idempotency** — all mutations idempotent via `Idempotency-Key`
- ✅ **Split Payments** — percentage / fixed / equal / custom
- ✅ **Recurring Payments** — daily/weekly/monthly/yearly
- ✅ **Subscriptions** — trial, upgrade, downgrade, pause, cancel
- ✅ **Invoices** — auto-number, PDF-ready, tax calculation
- ✅ **Verification** — OTP, CVV, 3DS, biometric
- ✅ **Webhooks** — 8 gateways, signature verified
- ✅ **Analytics** — revenue, by-method, by-status aggregation
- ✅ **Fee Calculation** — VAT 15%, gateway-specific rates
- ✅ **Currency Conversion** — BDT + USD/EUR/GBP with rate map

---

## 🌐 API Endpoints

| Group | Count | Base Path | Auth |
|-------|-------|-----------|------|
| Health | 2 | `/api/health` | Public |
| Payments | 9 | `/api/payments` | JWT |
| Payment Methods | 6 | `/api/payment-methods` | JWT |
| Payment Gateways | 2 | `/api/payment-gateways` | JWT |
| Transactions | 4 | `/api/transactions` | JWT |
| Refunds | 6 | `/api/refunds` | JWT |
| Split Payments | 2 | `/api/split-payments` | JWT |
| Recurring Payments | 4 | `/api/recurring-payments` | JWT |
| Subscriptions | 7 | `/api/subscriptions` | JWT |
| Invoices | 5 | `/api/invoices` | JWT |
| Verifications | 3 | `/api/verifications` | JWT |
| Analytics | 2 | `/api/analytics` | JWT |
| **Webhooks** | **8** | `/api/webhooks/:provider` | **Signature** |

**Total: 60 endpoints (52 REST + 8 webhooks)**

### Webhook Endpoints

| Provider | Path |
|----------|------|
| bKash | `POST /api/webhooks/bkash` |
| Nagad | `POST /api/webhooks/nagad` |
| Rocket | `POST /api/webhooks/rocket` |
| Stripe | `POST /api/webhooks/stripe` |
| PayPal | `POST /api/webhooks/paypal` |
| SSLCommerz | `POST /api/webhooks/sslcommerz` |
| aamarPay | `POST /api/webhooks/aamarpay` |
| Crypto | `POST /api/webhooks/crypto` |

Full reference: [API.md](./API.md) · Swagger: `http://localhost:3006/api/docs`

---

## 💾 Database Modes

| Mode | Use Case | DB Required |
|------|----------|-------------|
| `memory` | Termux dev, CI, local testing | ❌ No |
| `prisma` | Staging, production | ✅ PostgreSQL |

**Switch is transparent to application code** — same DI tokens, swap implementation.

```bash
# Memory mode (default, no DB)
PERSISTENCE_DRIVER=memory pnpm start:dev

# Prisma mode (production)
PERSISTENCE_DRIVER=prisma pnpm start:dev
```

---

## 🧪 Testing

```bash
# Unit tests
pnpm test:unit

# Unit with coverage
pnpm test:unit:cov

# E2E tests
pnpm test:e2e:custom

# Full CI
pnpm test:ci
```

**Coverage:** 85%+ statements (target 85%)

Test files:
- Unit: **301** files
- E2E: **24** files

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `pnpm build` | Compile TypeScript |
| `pnpm start:dev` | Dev with watch |
| `pnpm start:prod` | Production |
| `pnpm test:unit` | Unit tests |
| `pnpm test:unit:cov` | Unit + coverage |
| `pnpm test:e2e:custom` | E2E tests |
| `pnpm type-check` | TypeScript check |
| `pnpm lint` | ESLint |
| `pnpm generate:postman` | Generate Postman collection |
| `pnpm generate:inmemory` | Generate InMemory repos |
| `pnpm prisma:generate` | Generate Prisma client |
| `pnpm prisma:migrate` | Apply DB migrations |

---

## 📁 Project Structure

```
apps/payment-service/
├── src/
│   ├── main.ts                    Bootstrap
│   └── module/
│       ├── domain/                Business logic
│       ├── application/           CQRS use cases
│       ├── infrastructure/        Persistence, gateways
│       ├── interfaces/            Controllers, guards
│       └── modules/               NestJS wiring
├── test/
│   ├── unit/                      301 unit test files
│   └── e2e/                       24 e2e test files
├── scripts/
│   ├── generate-postman-collection.mjs
│   ├── generate-inmemory-repos.mjs
│   └── generate-readme.mjs
├── postman/                       Collection + environments
├── prisma/                        Prisma schema
└── docs/                          Additional docs
```

---

## 🔐 Security

- **JWT Bearer Auth** — shared with identity-service
- **Rate Limiting** — via `@nestjs/throttler`
- **Idempotency Keys** — required for all financial mutations
- **Domain Invariants** — enforced at entity level
- **Input Validation** — class-validator + Zod
- **HTTPS-only** — in production
- **Webhook Signature** — verified per gateway

---

## 📚 Documentation

| Doc | Description |
|-----|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer DDD deep-dive |
| [API.md](./API.md) | Full endpoint reference |
| [TESTING.md](./TESTING.md) | Test suite + coverage |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Dev guide + troubleshooting |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Docker/Railway/Fly/VPS |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [postman/README.md](./postman/README.md) | Postman collection guide |

---

## 📊 Project Stats

```
┌─────────────────────────────────────────────────────────┐
│  Payment Service — Production-Grade                     │
├─────────────────────────────────────────────────────────┤
│  Source Files           675                         │
│  Domain Layer           122 files                    │
│  Application Layer      231 files                    │
│  Infrastructure         179 files                    │
│  Interfaces              82 files                    │
│  Modules                 61 files                    │
│  Test Files             301 (unit)                  │
│  Test Files              24 (e2e)                   │
│  Payment Gateways          8                        │
│  API Endpoints            60                        │
│  Webhooks                  8                        │
└─────────────────────────────────────────────────────────┘
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/xyz`)
3. Write tests + code
4. Verify: `pnpm type-check && pnpm test:unit`
5. Commit (`git commit -m 'feat: xyz'`)
6. Push + open PR

---

## 📄 License

**MIT** — see [LICENSE](./LICENSE)

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- **Docker** — containerized deploy
- **Railway** — one-click deploy
- **Fly.io** — global edge
- **VPS** — PM2 process manager
- **GitHub Actions** — CI/CD

**Production URLs:**
- Staging: `https://payments-staging.vubon.com.bd`
- Production: `https://payments.vubon.com.bd`

---

**Made with ❤️ by Vubon.com.bd**
