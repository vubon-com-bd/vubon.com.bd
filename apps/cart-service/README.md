# 🛒 cart-service

Ephemeral Shopping Cart Microservice for **Vubon.com.bd**.

Part of the `@vubon/cart-service` workspace package.

---

## 🎯 Responsibilities

| Domain | Owns |
|--------|------|
| **Cart** | Cart lifecycle (active/abandoned/converted/expired/merged/cleared) |
| **Cart Item** | Items inside cart, quantity, discount, selection |
| **Coupon** | Applied coupon, discount calculation, usage limits |
| **Voucher** | Gift cards, store credit, redemption, partial balance |
| **Tax** | Cart-level tax rate, inclusive/exclusive calculation |
| **Shipping** | Shipping method, cost, free-shipping threshold |
| **Saved for Later** | Persistent user's saved items |
| **Abandoned Cart** | Detection, reminder scheduling, recovery tracking |
| **Guest Cart** | Anonymous cart with token, merge-on-login |
| **Cart Merger** | Guest → user merge with strategy + conflict tracking |

**Does NOT own:** user identity, product catalog, order placement, payment, inventory (owned by respective services).

---

## 🏛️ 5-Layer Architecture

    ┌─────────────────────────────────────────┐
    │ Layer 5: MODULES       (NestJS wiring)  │
    ├─────────────────────────────────────────┤
    │ Layer 4: INTERFACES    (HTTP + Swagger) │
    ├─────────────────────────────────────────┤
    │ Layer 3: INFRASTRUCTURE (Redis, Prisma) │
    ├─────────────────────────────────────────┤
    │ Layer 2: APPLICATION   (CQRS handlers)  │
    ├─────────────────────────────────────────┤
    │ Layer 1: DOMAIN        (Business rules) │
    └─────────────────────────────────────────┘

**Storage strategy:**
- **Redis** — primary store (Cart, Item, Coupon, Voucher, Guest, Tax, Shipping — ephemeral)
- **Prisma** — persistent only (SavedItem, AbandonedCart, CartMerger)
- **BullMQ** — background workers (expiry, abandonment, reminders, price-sync, analytics)

---

## 📁 Folder Structure

    apps/cart-service/
    ├── prisma/
    │   └── schema.prisma              # Saved/Abandoned/Merger models
    ├── src/
    │   ├── main.ts                    # Bootstrap entrypoint
    │   └── module/
    │       ├── domain/                # Layer 1 — pure business logic
    │       ├── application/           # Layer 2 — CQRS use cases
    │       ├── infrastructure/        # Layer 3 — adapters
    │       ├── interfaces/            # Layer 4 — HTTP transport
    │       └── modules/               # Layer 5 — NestJS wiring
    ├── test/
    │   ├── unit/                      # 165 unit test files
    │   └── e2e/                       # 5 E2E test suites
    ├── docs/                          # .doc.ts source + extractor
    ├── Dockerfile
    ├── .dockerignore
    ├── railway.toml
    ├── package.json
    └── README.md

---

## 🚀 Local Setup

### 1. Install dependencies (from monorepo root)

    cd ~/vubon.com.bd
    pnpm install

### 2. Configure environment

    cp apps/cart-service/.env.example apps/cart-service/.env
    # Edit apps/cart-service/.env

### 3. Start Redis

    redis-server --daemonize yes
    redis-cli ping   # expect: PONG

### 4. Generate Prisma client

    cd apps/cart-service
    pnpm prisma:generate

### 5. Run migrations

    pnpm prisma:migrate

### 6. Start server

    pnpm start:dev

Server runs at: **http://localhost:4003/api/v1**
Swagger UI: **http://localhost:4003/api/v1/docs**

---

## 🔌 REST Endpoints

Base path: `/api/v1`

### Carts

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/cart` | Create a new cart |
| `GET` | `/cart/me` | Get current user's cart |
| `GET` | `/cart/:cartId` | Get cart by ID |
| `GET` | `/cart/:cartId/summary` | Get cart summary |
| `PATCH` | `/cart/:cartId` | Update cart |
| `POST` | `/cart/:cartId/clear` | Clear all items |
| `POST` | `/cart/:cartId/recover` | Recover abandoned cart |
| `DELETE` | `/cart/:cartId` | Soft-delete (admin) |

### Cart Items

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/cart/:cartId/items` | Add item |
| `GET` | `/cart/:cartId/items` | List items |
| `GET` | `/cart/:cartId/items/:itemId` | Get single item |
| `PATCH` | `/cart/:cartId/items/:itemId` | Update item |
| `PATCH` | `/cart/:cartId/items/:itemId/quantity` | Update quantity |
| `PATCH` | `/cart/:cartId/items/:itemId/select` | Select/deselect |
| `DELETE` | `/cart/:cartId/items/:itemId` | Remove item |

### Coupon / Voucher

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/cart/:cartId/coupon` | Apply coupon |
| `POST` | `/cart/:cartId/coupon/validate` | Validate coupon |
| `DELETE` | `/cart/:cartId/coupon` | Remove coupon |
| `POST` | `/cart/:cartId/voucher` | Apply voucher |
| `DELETE` | `/cart/:cartId/voucher` | Remove voucher |

### Shipping / Totals

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/cart/:cartId/shipping` | Set shipping method |
| `POST` | `/cart/:cartId/shipping/calculate` | Calculate shipping |
| `GET` | `/cart/:cartId/totals` | Get cart totals |

### Saved for Later

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/saved/cart/:cartId/items/:itemId` | Save item for later |
| `POST` | `/saved/:savedItemId/move-to-cart` | Move back to cart |
| `DELETE` | `/saved/:savedItemId` | Remove saved item |
| `GET` | `/saved` | List saved items |

### Admin — Abandoned Carts

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/admin/abandoned-carts` | List abandoned carts |
| `GET` | `/admin/abandoned-carts/stats` | Abandonment stats |

### Guest Cart

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/guest-cart` | Create guest cart (public) |
| `POST` | `/guest-cart/merge` | Merge guest → user cart |

### Health

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/health` | Service health check (public) |

Full OpenAPI spec: `http://localhost:4003/api/v1/docs-json`

---

## 🧪 Testing

    pnpm test           # all unit tests (1217)
    pnpm test:cov       # coverage report
    pnpm test:e2e       # E2E integration tests (16)
    pnpm type-check     # TypeScript check

Current status:
- **165** unit test files
- **1,217** unit tests passing
- **5** E2E test suites (**16** tests passing)
- **~87%** statement coverage

---

## 🚂 Railway Deployment

Deployed as a **Docker container** on Railway. See [DEPLOYMENT.md](./DEPLOYMENT.md).

Key settings:
- **Root:** repository root (monorepo)
- **Dockerfile:** `apps/cart-service/Dockerfile`
- **Start command:** `node dist/main.js`
- **Health check:** `/api/v1/health`

Required environment variables — see `.env.production.example`.

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer architecture, domain model, storage strategy |
| [API.md](./API.md) | Complete REST API reference |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Local setup, scripts, troubleshooting |
| [TESTING.md](./TESTING.md) | Test strategy, patterns, coverage |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Docker, Railway, monitoring |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |

All `.md` files are **auto-generated** from `docs/*.doc.ts`:

    pnpm docs:build

---

## 🔗 Related Services

| Service | Purpose |
|---------|---------|
| `auth-service` | JWT issuance, session |
| `user-service` | Identity, profile |
| `product-service` | Product catalog, pricing, inventory |
| `order-service` | Order placement, tracking |
| `payment-service` | Payment, refund |
| `logistics-service` | Shipping calculation, delivery |
| `marketing-service` | Coupon validation, campaigns |

Cross-service communication: **Events + HTTP APIs only**.

---

## 📄 License

MIT © Vubon Team
