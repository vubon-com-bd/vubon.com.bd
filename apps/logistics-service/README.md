# Product Service — vubon.com.bd

Enterprise product catalog microservice with full DDD + CQRS + multi-persistence support.

## 📋 Overview

| Item | Value |
|------|-------|
| Package | `@vubon/product-service` |
| Port | `3002` |
| Framework | NestJS 12 |
| Architecture | Clean Architecture (5 layers) |
| Database | PostgreSQL (`vubon_product`) + InMemory fallback |
| Tests | 373 (319 unit + 54 e2e) |

## 🚀 Quick Start

### Prerequisites
- Node.js >= 22
- pnpm >= 9
- PostgreSQL (optional for Termux — InMemory mode available)

### Install
\`\`\`bash
pnpm install
\`\`\`

### Setup Environment
\`\`\`bash
cp .env.example .env
# Edit .env with your DB credentials
\`\`\`

### Database Setup (Manual — Termux-safe)
\`\`\`bash
# Create DB
createdb -h localhost -U $(whoami) vubon_product

# Apply tables
psql -h localhost -U $(whoami) -d vubon_product \\
  -f ~/.db-manual-migrations/product-service/20261013_create_all_product_tables.sql
\`\`\`

### Run
\`\`\`bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod
\`\`\`

Server: **http://localhost:3002**
Swagger: **http://localhost:3002/api/docs**

## 🏗️ Architecture

### 5 Layers (Clean Architecture)
\`\`\`
┌────────────────────────────────────────────┐
│  Interfaces   (REST + GraphQL + Guards)   │
├────────────────────────────────────────────┤
│  Application  (CQRS + Sagas + DTOs)       │
├────────────────────────────────────────────┤
│  Domain       (Entities + VOs + Services) │
├────────────────────────────────────────────┤
│  Infrastructure (Prisma + InMemory + Q)   │
├────────────────────────────────────────────┤
│  Modules      (NestJS feature modules)    │
└────────────────────────────────────────────┘
\`\`\`

See [ARCHITECTURE.md](./ARCHITECTURE.md) for details.

## 🎯 Key Features

### Domain Layer
- **41 primitive VOs** — ProductId, ProductName, PriceAmount, ...
- **12 composite VOs** — ProductVO, ProductVariantVO, ...
- **11 entities** — ProductEntity (aggregate root), ...
- **9 domain services** — ProductPriceService (VAT/AIT), ProductRatingService (Bayesian avg), ...
- **7 specifications** — CanPublish, CanDelete, ...

### Application Layer
- **36 Command Handlers** — CreateProduct, UpdateProduct, PublishProduct, ...
- **24 Query Handlers** — GetProduct, ListProducts, SearchProducts, ...
- **3 Sagas** — ProductPublish, ProductReview, InventoryAlert
- **Multi-shape DTOs** — Full, Public, Summary, List, Detail, Stats

### Infrastructure Layer
- **Prisma repositories** — 11 Prisma-based
- **InMemory repositories** — 11 InMemory-based (Termux fallback)
- **Cache** — 5 Redis-backed
- **Search** — Meilisearch adapter (optional)
- **Queues** — 5 BullMQ queues
- **Workers** — 5 background workers

### Interfaces Layer
- **13 REST controllers** — 59 endpoints
- **4 GraphQL resolvers**
- **3 Guards** — OwnProduct, VendorProduct, ProductPublished
- **3 Interceptors** — Cache, Timeout, Logging

## 🎯 Database Mode

Toggle via \`DB_MODE\` env var:
\`\`\`env
# Real database (PostgreSQL)
DB_MODE=prisma

# InMemory (Termux / dev / testing)
DB_MODE=memory
\`\`\`

## 🧪 Testing

### Unit Tests
\`\`\`bash
pnpm test:unit          # Run once
pnpm test:unit:watch    # Watch mode
pnpm test:unit:cov      # With coverage
\`\`\`

- **29 spec files · 319 tests**
- **Coverage: ~68%**

### E2E Tests
\`\`\`bash
pnpm test:e2e           # Run once
pnpm generate:e2e       # Auto-generate from endpoints
\`\`\`

- **13 spec files · 54 tests (auto-generated)**

### All Tests
\`\`\`bash
pnpm test:all           # Unit + E2E
\`\`\`

## 🔧 Generators

### E2E Tests
\`\`\`bash
pnpm generate:e2e
# → test/e2e/*.e2e-spec.ts (13 files, 54 tests)
\`\`\`

### InMemory Repositories
\`\`\`bash
pnpm generate:inmemory   # (or node scripts/generate-inmemory-repos.mjs)
# → src/module/infrastructure/persistence/memory/repositories/*.ts
\`\`\`

## 📊 Endpoints Overview

| Group | Count | URL Prefix |
|-------|-------|-----------|
| Health | 1 | /health |
| Products | 15 | /products |
| Public Products | 3 | /public/products |
| Variants | 5 | /product-variants |
| Attributes | 4 | /products/:productId/attributes |
| Inventory | 6 | /product-inventory |
| Pricing | 6 | /product-pricing |
| Pricing Rules | 6 | /product-pricing-rules |
| Collections | 9 | /product-collections |
| Reviews | 9 | /product-reviews |
| Media | 3 | /products/:productId/media |
| Brands | 7 | /brands |
| Categories | 10 | /categories |
| **TOTAL** | **59** | |

Full API: **http://localhost:3002/api/docs**

## 📁 Project Structure
\`\`\`
product-service/
├── src/
│   ├── main.ts
│   └── module/
│       ├── domain/
│       ├── application/
│       ├── infrastructure/
│       ├── interfaces/
│       └── modules/
├── test/
│   ├── unit/
│   ├── e2e/
│   └── helpers/
├── scripts/
│   ├── generate-e2e-tests.mjs
│   └── generate-inmemory-repos.mjs
└── prisma/
    └── schema.prisma
\`\`\`

## 🔐 Security

- **JWT auth** — via `JwtAuthGuard`
- **Ownership guard** — `OwnProductGuard`, `VendorProductGuard`
- **Visibility guard** — `ProductPublishedGuard`
- **Rate limiting** — via NestJS Throttler
- **Idempotency** — via `IdempotencyHeader` decorator

## 📝 License

Private — vubon.com.bd

## 🤝 Contributing

See [ARCHITECTURE.md](./ARCHITECTURE.md) for layer rules and patterns.
