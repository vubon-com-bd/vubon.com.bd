# DEVELOPMENT

PRODUCT SERVICE — DEVELOPMENT SETUP GUIDE
@module product-service/docs

══════════════════════════════════════════════════════════════════
 🛠️  PREREQUISITES
══════════════════════════════════════════════════════════════════

 Required:
   • Node.js         >= 22.0.0
   • pnpm            >= 9.0.0
   • PostgreSQL      >= 14 (via Supabase recommended)
   • Redis           >= 6.0
   • Meilisearch     >= 1.0 (optional — for search)
   • TypeScript      >= 5.0
   • Git             >= 2.30

 Optional:
   • Docker          — for containerized runs
   • Redis Insight   — GUI for Redis
   • Postman/Insomnia — API testing
   • Meilisearch Dashboard

 Termux (Android) Support:
   ✅ Works with caveats (Prisma engine ARM64)
   ✅ Recommended for dev + unit tests
   ❌ Not recommended for production

---

══════════════════════════════════════════════════════════════════
 🚀 INITIAL SETUP (Step by Step)
══════════════════════════════════════════════════════════════════

 Step 1 — Clone the repository
 ─────────────────────────────────────────────────────────────
   git clone <repo-url> vubon.com.bd
   cd vubon.com.bd

 Step 2 — Install dependencies
 ─────────────────────────────────────────────────────────────
   pnpm install

 Step 3 — Setup environment variables
 ─────────────────────────────────────────────────────────────
   cp apps/product-service/.env.example apps/product-service/.env
   # Edit .env with your values

 Step 4 — Generate Prisma client
 ─────────────────────────────────────────────────────────────
   cd packages/shared-kernel
   pnpm prisma generate

 Step 5 — Run migrations
 ─────────────────────────────────────────────────────────────
   pnpm prisma migrate dev

 Step 6 — Start Redis
 ─────────────────────────────────────────────────────────────
   redis-server
   # OR with custom config:
   redis-server --daemonize yes --port 6379

 Step 7 — Start Meilisearch (optional)
 ─────────────────────────────────────────────────────────────
   meilisearch --master-key=masterKey
   # OR via Docker:
   docker run -p 7700:7700 getmeili/meilisearch:latest

 Step 8 — Build shared packages
 ─────────────────────────────────────────────────────────────
   cd ~/vubon.com.bd
   pnpm --filter @vubon/shared-constants build
   pnpm --filter @vubon/shared-types build
   pnpm --filter @vubon/shared-schemas build
   pnpm --filter @vubon/shared-kernel build

 Step 9 — Start the service
 ─────────────────────────────────────────────────────────────
   cd apps/product-service
   pnpm start:dev

 Step 10 — Verify
 ─────────────────────────────────────────────────────────────
   Open: http://localhost:4002/api/v1/docs
   The Swagger UI should load with all endpoints.

---

══════════════════════════════════════════════════════════════════
 📁 PROJECT LAYOUT
══════════════════════════════════════════════════════════════════

 apps/product-service/
 ├── docs/                          ← .doc.ts sources + extractor
 ├── prisma/                        ← (empty — schema in shared-kernel)
 ├── src/
 │   ├── main.ts                    ← bootstrap
 │   └── module/
 │       ├── domain/                ← L1 — entities, VOs, repos
 │       ├── application/           ← L2 — CQRS, DTOs, mappers
 │       ├── infrastructure/        ← L3 — Prisma, Redis, search, workers
 │       ├── interfaces/            ← L4 — controllers, guards
 │       └── modules/               ← L5 — NestJS wiring
 ├── test/
 │   ├── domain/                    ← unit tests (VOs, entities)
 │   ├── application/               ← unit tests (services, handlers)
 │   ├── interfaces/                ← unit tests (controllers, guards)
 │   ├── e2e/                       ← E2E tests
 │   ├── mocks/                     ← typed mocks
 │   └── fixtures.ts                ← test fixtures
 ├── scripts/
 │   └── docker-entrypoint.sh       ← prisma migrate + start
 ├── Dockerfile
 ├── railway.toml
 ├── package.json
 ├── jest.config.cjs
 ├── tsconfig.json
 └── README.md

---

══════════════════════════════════════════════════════════════════
 🔧 COMMON COMMANDS
══════════════════════════════════════════════════════════════════

 From apps/product-service/:

   pnpm start:dev        — dev server with watch
   pnpm start:debug      — dev server with debugger
   pnpm build            — production build
   pnpm start:prod       — run production build

   pnpm type-check       — TypeScript check
   pnpm lint             — ESLint
   pnpm test             — unit tests (1090)
   pnpm test:cov         — coverage report
   pnpm test:watch       — watch mode
   pnpm test:unit        — all unit tests
   pnpm test:vo          — value object tests only
   pnpm test:entity      — entity tests only
   pnpm test:service     — service tests only
   pnpm test:e2e         — end-to-end tests

 From packages/shared-kernel/:

   pnpm prisma:generate  — regenerate Prisma client
   pnpm prisma:migrate   — create + apply dev migration
   pnpm prisma:studio    — open Prisma Studio
   pnpm prisma:format    — format schema

---

══════════════════════════════════════════════════════════════════
 🌍 ENVIRONMENT VARIABLES
══════════════════════════════════════════════════════════════════

 Load order (in main.ts):
   1. Root .env             ← ../../.env
   2. product-service .env  ← ./.env (overrides)

 Required variables:

   # Runtime
   NODE_ENV         = development
   PORT             = 4002
   APP_NAME         = product-service

   # Database
   DATABASE_URL     = postgresql://...
   DB_SSL           = false
   DB_LOGGING       = true

   # Redis
   REDIS_URL        = redis://localhost:6379
   REDIS_KEY_PREFIX = vubon:
   REDIS_DB         = 0
   REDIS_QUEUE_DB   = 1

   # JWT (must match auth-service)
   JWT_SECRET       = 32+ chars (dev only)
   JWT_ISSUER       = vubon-api
   JWT_AUDIENCE     = vubon-client

   # CORS
   CORS_ORIGINS     = http://localhost:3000,http://localhost:3001

 Search (optional in dev — graceful if missing):
   SEARCH_PROVIDER  = meilisearch
   SEARCH_HOST      = http://localhost:7700
   SEARCH_API_KEY   = masterKey

 Storage:
   STORAGE_PROVIDER = local
   STORAGE_LOCAL_BASE_PATH = ./storage/uploads

 Feature config (optional — defaults in config files):
   PRODUCT_CACHE_TTL        = 300
   PRODUCT_PAGE_SIZE        = 20
   PRODUCT_MAX_PAGE_SIZE    = 100
   VARIANT_CACHE_TTL        = 300
   INVENTORY_CACHE_TTL      = 60
   PRICING_CACHE_TTL        = 300
   REVIEW_CACHE_TTL         = 120
   BRAND_CACHE_TTL          = 600

 Feature flags:
   PRODUCT_SEARCH_INDEXING  = true
   VARIANT_AUTO_MATRIX      = true
   INVENTORY_LOW_STOCK_ALERTS = true

---

══════════════════════════════════════════════════════════════════
 🗄️  DATABASE WORKFLOW
══════════════════════════════════════════════════════════════════

 Schema location:
   packages/shared-kernel/prisma/schema.prisma

 Migrate (dev):
   cd packages/shared-kernel
   pnpm prisma migrate dev --name <description>

 Apply pending (production / CI):
   pnpm prisma migrate deploy

 Reset local DB:
   pnpm prisma migrate reset

 Studio:
   pnpm prisma studio

 Generate client only:
   pnpm prisma generate

 Safety rules:
   🔴 Never edit an applied migration file
   🔴 Never run `prisma db push` in production
   🔴 Always review generated SQL before committing
   🔴 Back up production before destructive migrations

---

══════════════════════════════════════════════════════════════════
 🔍 SEARCH INDEX WORKFLOW
══════════════════════════════════════════════════════════════════

 Meilisearch must be running for search features.

 Create index (auto on first reindex):
   POST /api/v1/products/:id → indexes automatically

 Bulk reindex all:
   From BullMQ: enqueue search.bulk.reindex job
   Or via CLI:
     pnpm ts-node scripts/reindex.ts

 Clear index:
   Enqueue job: search.clear.cache

 Inspect via Meilisearch dashboard:
   http://localhost:7700

 If Meilisearch is unavailable:
   • Search endpoints return empty results
   • Product CRUD works normally
   • Indexer logs a warning (not an error)

---

══════════════════════════════════════════════════════════════════
 🧪 TEST WORKFLOW
══════════════════════════════════════════════════════════════════

 Run all unit tests:
   cd apps/product-service
   pnpm test

 Run a single test file:
   pnpm jest test/domain/value-objects/price.vo.spec.ts

 Run a folder:
   pnpm jest test/domain/value-objects

 Run tests matching a pattern:
   pnpm jest test -t "should create a product"

 Run coverage:
   pnpm test:cov

 Run e2e:
   pnpm test:e2e

 Current status:
   • 83 unit test files
   • 2 e2e test files
   • 1090 tests passing
   • 88.81% statement coverage
   • 90.97% line coverage

---

══════════════════════════════════════════════════════════════════
 🐛 DEBUGGING
══════════════════════════════════════════════════════════════════

 Start with debugger:
   pnpm start:debug
   Then attach VS Code debugger on port 9229.

 Enable verbose logging:
   Set LOG_LEVEL=debug in .env

 Inspect logs at runtime:
   tail -f service.log          (if started via nohup)

 Inspect Prisma queries:
   Set DB_LOGGING=true in .env

 Health check:
   curl http://localhost:4002/api/v1/docs-json

 Redis inspect:
   redis-cli
   > KEYS vubon:*
   > GET vubon:product:...

 Meilisearch inspect:
   curl http://localhost:7700/indexes/products/stats

---

══════════════════════════════════════════════════════════════════
 📌 CODING CONVENTIONS
══════════════════════════════════════════════════════════════════

 TypeScript:
   • Strict mode enabled
   • No `any` types in production code
   • Prefer `unknown` over `any` when needed
   • Use `readonly` on immutable fields
   • Explicit return types on public methods

 Layer rules:
   • Domain: pure TypeScript, no imports from higher layers
   • Application: may import domain, no infra/HTTP
   • Infrastructure: implements domain contracts
   • Interfaces: HTTP only, dispatch commands/queries
   • Modules: wiring only, no business logic

 Testing:
   • Co-locate helper mocks under test/mocks/
   • One `.spec.ts` per source file (or grouped)
   • Use `describe` + `it` in BDD style
   • Prefer `jest.Mocked<T>` for typed mocks

 Naming:
   • Value objects:  <Name>VO (e.g. ProductIdVO)
   • Entities:       <Name>Entity (e.g. ProductEntity)
   • Commands:       <Action><Entity>Command
   • Queries:        <Action><Entity>Query
   • Handlers:       <Action><Entity>Handler
   • Repositories:   <Entity>Repository (interface)
                     <Entity>PrismaRepository (impl)
   • Events:         <Entity><Action>Event
   • Errors:         <Entity><Reason>Error

---

══════════════════════════════════════════════════════════════════
 📚 DOCUMENTATION WORKFLOW
══════════════════════════════════════════════════════════════════

 Source of truth:  docs/*.doc.ts   (JSDoc-style markdown)
 Generated:        *.md            (top-level, renderable)

 Regenerate:
   cd apps/product-service/docs
   node extract-docs.cjs

 Never edit generated .md files directly — they are overwritten
 on every extract.

 To update documentation:
   1. Edit docs/architecture.doc.ts (or api/deployment/...)
   2. Run node extract-docs.cjs
   3. Commit both source and generated files
