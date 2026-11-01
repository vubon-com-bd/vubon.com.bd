# Cart Service — vubon.com.bd

Enterprise-grade shopping cart microservice with DDD + CQRS architecture.

## 📋 Overview

| Aspect | Value |
|--------|-------|
| **Package** | `@vubon/cart-service` |
| **Port** | `3003` |
| **Framework** | NestJS 12 |
| **Architecture** | DDD + CQRS + Hexagonal |
| **Database** | PostgreSQL (Prisma) + Redis |
| **Modes** | `prisma` / `memory` / `redis` |
| **Tests** | 1,606 (96.35% coverage) |
| **API Endpoints** | 33 (Swagger documented) |

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- pnpm 9+
- PostgreSQL 15+ (for `DB_MODE=prisma`)
- Redis 7+ (for `DB_MODE=prisma`)

### Install

```bash
cd ~/vubon.com.bd
pnpm install
```

### Env Setup

```bash
cd apps/cart-service
cp .env.example .env
```

### Database Setup

**Option A — No DB needed (memory mode):**

```bash
DB_MODE=memory node dist/main.js
# ✅ No PostgreSQL or Redis required
```

**Option B — Full Prisma mode:**

```bash
createdb -h localhost -U $(whoami) vubon_cart
psql -h localhost -U $(whoami) -d vubon_cart \
  -f ~/.db-manual-migrations/cart-service/20261101_create_cart_tables.sql
cd ~/vubon.com.bd/packages/shared-kernel && npx prisma generate
DB_MODE=prisma node dist/main.js
```

### Run

```bash
pnpm build              # Build
node dist/main.js       # Production
pnpm start:dev          # Dev watch
```

Server: http://localhost:3003
Swagger: http://localhost:3003/api/docs
Health: http://localhost:3003/health

## 🏗️ Architecture

```
src/module/
├── domain/              # Business logic (114 files)
│   ├── value-objects/   # 46 VOs (34 primitives + 12 composites)
│   ├── entities/        # 10 entities (1 aggregate root)
│   ├── events/          # Domain events
│   ├── repositories/    # 10 repo interfaces
│   ├── services/        # 10 domain services
│   └── specifications/  # 6 specifications
│
├── application/         # Use cases (187 files)
│   ├── commands/        # 52 CQRS commands
│   ├── queries/         # 30 CQRS queries
│   ├── sagas/           # 4 orchestrators
│   ├── dtos/            # Multi-shape DTOs
│   └── mappers/         # Entity → DTO
│
├── infrastructure/      # Persistence + workers (102 files)
│   ├── persistence/     # Prisma + Redis + InMemory
│   ├── queues/          # 6 BullMQ queues
│   ├── workers/         # 7 background workers
│   ├── external/        # Email + SMS + Push
│   └── services/        # HTTP clients
│
├── interfaces/          # HTTP/GraphQL layer (65 files)
│   ├── controllers/     # 9 REST + 1 GraphQL
│   ├── guards/          # 4 guards
│   ├── interceptors/    # 3 interceptors
│   └── dtos/            # class-validator + Swagger
│
└── modules/             # NestJS wiring (48 files)
    └── <feature>/       # 12 feature modules
```

## 🎯 Database Mode

Switch repositories at runtime:

```bash
DB_MODE=memory  # In-memory (no DB) — dev/test
DB_MODE=prisma  # Prisma + Redis — production
DB_MODE=redis   # Redis-only — hot path
```

## 🧪 Testing

```bash
pnpm test              # Unit + E2E
pnpm test:unit         # Unit only (175 specs)
pnpm test:e2e          # E2E only (30 specs)
pnpm test:cov          # With coverage
```

## 🔧 Generators

```bash
pnpm generate:postman    # Postman collection
pnpm generate:inmemory   # InMemory repos
pnpm generate:docs       # This documentation
```

## 📊 Endpoints Overview

| Group | Count | Base Path |
|-------|-------|-----------|
| Health | 1 | `/health` |
| Carts | 12 | `/carts` |
| Cart Items | 8 | `/carts/:cartId/items` |
| Coupons | 3 | `/carts/:cartId/coupon` |
| Vouchers | 2 | `/carts/:cartId/voucher` |
| Shipping | 4 | `/carts/:cartId/shipping` |
| Saved | 4 | `/saved` |
| Abandoned | 4 | `/abandoned-carts` |
| Guest Carts | 4 | `/guest-carts` |
| **Total** | **42** | — |

## 🔐 Security

- JWT authentication (`JwtAuthGuard`)
- Owner authorization (`CartOwnerGuard`)
- Guest token validation (`GuestCartGuard`)
- Idempotency keys on mutations
- Rate limiting

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Layer details
- [API.md](./API.md) — Endpoint reference
- [TESTING.md](./TESTING.md) — Test guide
- [DEVELOPMENT.md](./DEVELOPMENT.md) — Dev setup
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deploy guide

## 📝 License

[MIT](./LICENSE) © 2026 Vubon.com.bd
