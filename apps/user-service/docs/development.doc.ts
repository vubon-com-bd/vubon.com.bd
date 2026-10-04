/**
 * USER SERVICE — DEVELOPMENT SETUP GUIDE
 * @module user-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🛠️  PREREQUISITES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Required:
 *    • Node.js         >= 22.0.0
 *    • pnpm            >= 9.0.0
 *    • PostgreSQL      >= 14 (via Supabase recommended)
 *    • Redis           >= 6.0
 *    • TypeScript      >= 5.0
 *    • Git             >= 2.30
 *
 *  Optional:
 *    • Docker          — for containerized runs
 *    • Redis Insight   — GUI for Redis
 *    • Postman/Insomnia — API testing
 *
 *  Termux (Android) Support:
 *    ✅ Works with caveats (Prisma engine ARM64 issue)
 *    ✅ Recommended for dev + unit tests
 *    ❌ Not recommended for production
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 INITIAL SETUP (Step by Step)
 * ══════════════════════════════════════════════════════════════════
 *
 *  Step 1 — Clone the repository
 *  ─────────────────────────────────────────────────────────────
 *    git clone <repo-url> vubon.com.bd
 *    cd vubon.com.bd
 *
 *  Step 2 — Install dependencies
 *  ─────────────────────────────────────────────────────────────
 *    pnpm install
 *
 *  Step 3 — Setup environment variables
 *  ─────────────────────────────────────────────────────────────
 *    cp apps/user-service/.env.example apps/user-service/.env
 *    # Edit .env with your values
 *
 *  Step 4 — Generate Prisma client
 *  ─────────────────────────────────────────────────────────────
 *    cd packages/shared-kernel
 *    pnpm prisma generate
 *
 *  Step 5 — Run migrations
 *  ─────────────────────────────────────────────────────────────
 *    pnpm prisma migrate dev
 *
 *  Step 6 — Start Redis
 *  ─────────────────────────────────────────────────────────────
 *    redis-server
 *    # OR with custom config:
 *    redis-server --daemonize yes --port 6379
 *
 *  Step 7 — Start the service
 *  ─────────────────────────────────────────────────────────────
 *    cd apps/user-service
 *    pnpm start:dev
 *
 *  Step 8 — Verify
 *  ─────────────────────────────────────────────────────────────
 *    Open: http://localhost:4001/api/v1/docs
 *    The Swagger UI should load with all endpoints.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 PROJECT LAYOUT
 * ══════════════════════════════════════════════════════════════════
 *
 *  apps/user-service/
 *  ├── docs/                          ← .doc.ts sources + extractor
 *  ├── src/
 *  │   ├── main.ts                    ← bootstrap
 *  │   └── module/
 *  │       ├── domain/                ← L1 — entities, VOs, repos
 *  │       ├── application/           ← L2 — CQRS, DTOs, mappers
 *  │       ├── infrastructure/        ← L3 — Prisma, Redis, workers
 *  │       ├── interfaces/            ← L4 — controllers, guards
 *  │       └── modules/               ← L5 — NestJS wiring
 *  ├── test/
 *  │   ├── unit/                      ← 190 unit test files
 *  │   ├── e2e/                       ← 1 e2e test
 *  │   └── helpers/                   ← mocks
 *  ├── scripts/
 *  │   └── docker-entrypoint.sh       ← prisma migrate + start
 *  ├── Dockerfile
 *  ├── railway.toml
 *  ├── package.json
 *  └── README.md
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔧 COMMON COMMANDS
 * ══════════════════════════════════════════════════════════════════
 *
 *  From apps/user-service/:
 *
 *    pnpm start:dev        — dev server with watch
 *    pnpm start:debug      — dev server with debugger
 *    pnpm build            — production build
 *    pnpm start:prod       — run production build
 *
 *    pnpm type-check       — TypeScript check
 *    pnpm lint             — ESLint
 *    pnpm test             — unit tests (925)
 *    pnpm test:cov         — coverage report
 *    pnpm test:watch       — watch mode
 *    pnpm test:e2e         — end-to-end tests (7)
 *
 *  From packages/shared-kernel/:
 *
 *    pnpm prisma:generate  — regenerate Prisma client
 *    pnpm prisma:migrate   — create + apply dev migration
 *    pnpm prisma:studio    — open Prisma Studio
 *    pnpm prisma:format    — format schema
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🌍 ENVIRONMENT VARIABLES
 * ══════════════════════════════════════════════════════════════════
 *
 *  Load order (in main.ts):
 *    1. Root .env             ← ../../.env
 *    2. user-service .env     ← ./.env (overrides)
 *
 *  Required variables:
 *
 *    # Runtime
 *    NODE_ENV         = development
 *    PORT             = 4001
 *    APP_NAME         = user-service
 *
 *    # Database
 *    DATABASE_URL     = postgresql://...
 *    DB_SSL           = false
 *    DB_LOGGING       = true
 *
 *    # Redis
 *    REDIS_URL        = redis://localhost:6379
 *    REDIS_KEY_PREFIX = vubon:
 *    REDIS_DB         = 0
 *
 *    # JWT (must match auth-service)
 *    JWT_SECRET       = 32+ chars (dev only)
 *    JWT_ISSUER       = vubon-api
 *    JWT_AUDIENCE     = vubon-client
 *
 *    # CORS
 *    CORS_ORIGINS     = http://localhost:3000,http://localhost:3001
 *
 *  Feature config (optional — defaults in config files):
 *    USER_MAX_ADDRESSES                   = 20
 *    USER_MAX_CONTACTS                    = 10
 *    USER_PROFILE_COMPLETION_THRESHOLD    = 80
 *    USER_DEFAULT_TIMEZONE                = Asia/Dhaka
 *    USER_DEFAULT_LANGUAGE                = bn
 *    USER_DEFAULT_LOCALE                  = bn-BD
 *    ACTIVITY_RETENTION_DAYS              = 90
 *    KYC_EXPIRY_DAYS                      = 365
 *
 *  Dev/test only:
 *    USE_IN_MEMORY_REPOS = false         # set true on Termux
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🗄️  DATABASE WORKFLOW
 * ══════════════════════════════════════════════════════════════════
 *
 *  Schema location:
 *    packages/shared-kernel/prisma/schema.prisma
 *
 *  Migrate (dev):
 *    cd packages/shared-kernel
 *    pnpm prisma migrate dev --name <description>
 *
 *  Apply pending (production / CI):
 *    pnpm prisma migrate deploy
 *
 *  Reset local DB:
 *    pnpm prisma migrate reset
 *
 *  Studio:
 *    pnpm prisma studio
 *
 *  Safety rules:
 *    🔴 Never edit an applied migration file
 *    🔴 Never run `prisma db push` in production
 *    🔴 Always review generated SQL before committing
 *    🔴 Back up production before destructive migrations
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧪 TEST WORKFLOW
 * ══════════════════════════════════════════════════════════════════
 *
 *  Run all unit tests:
 *    cd apps/user-service
 *    pnpm test
 *
 *  Run a single test file:
 *    pnpm jest test/unit/domain/entities/user.entity.spec.ts
 *
 *  Run coverage:
 *    pnpm test:cov
 *
 *  Run e2e (uses in-memory repos on CI / Termux):
 *    USE_IN_MEMORY_REPOS=true pnpm test:e2e
 *
 *  Current status:
 *    • 190 unit test files
 *    • 1 e2e test file
 *    • 932 tests passing
 *    • 87.82% statement coverage
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐛 DEBUGGING
 * ══════════════════════════════════════════════════════════════════
 *
 *  Start with debugger:
 *    pnpm start:debug
 *    Then attach VS Code debugger on port 9229.
 *
 *  Enable verbose logging:
 *    Set LOG_LEVEL=debug in .env
 *
 *  Inspect logs at runtime:
 *    tail -f service.log          (if started via nohup)
 *
 *  Inspect Prisma queries:
 *    Set DB_LOGGING=true in .env
 *
 *  Health check:
 *    curl http://localhost:4001/api/v1/docs-json
 *
 *  Redis inspect:
 *    redis-cli
 *    > KEYS vubon:*
 *    > GET vubon:user:...
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📌 CODING CONVENTIONS
 * ══════════════════════════════════════════════════════════════════
 *
 *  TypeScript:
 *    • Strict mode enabled (tsconfig: "strict": true)
 *    • No `any` types in production code
 *    • Prefer `unknown` over `any` when needed
 *    • Use `readonly` on immutable fields
 *    • Explicit return types on public methods
 *
 *  Layer rules:
 *    • Domain: pure TypeScript, no imports from higher layers
 *    • Application: may import domain, no infra/HTTP
 *    • Infrastructure: implements domain contracts
 *    • Interfaces: HTTP only, dispatch commands/queries
 *    • Modules: wiring only, no business logic
 *
 *  Testing:
 *    • Co-locate helper mocks under test/helpers/
 *    • One `.spec.ts` per source file
 *    • Use `describe` + `it` in the BDD style
 *    • Prefer `jest.Mocked<T>` for typed mocks
 *
 *  Naming:
 *    • Value objects:  <Name>VO (e.g. UserIdVO)
 *    • Entities:       <Name>Entity (e.g. UserEntity)
 *    • Commands:       <Action><Entity>Command
 *    • Queries:        <Action><Entity>Query
 *    • Handlers:       <Action><Entity>Handler
 *    • Repositories:   <Entity>Repository (interface) / <Entity>PrismaRepository (impl)
 *    • Events:         <Entity><Action>Event
 *    • Errors:         <Entity><Reason>Error
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📚 DOCUMENTATION WORKFLOW
 * ══════════════════════════════════════════════════════════════════
 *
 *  Source of truth:  docs/*.doc.ts   (JSDoc-style markdown)
 *  Generated:        *.md            (top-level, renderable)
 *
 *  Regenerate:
 *    cd apps/user-service/docs
 *    node extract-docs.cjs
 *
 *  Never edit generated .md files directly — they are overwritten
 *  on every extract.
 *
 *  To update documentation:
 *    1. Edit docs/architecture.doc.ts (or api/deployment/...)
 *    2. Run node extract-docs.cjs
 *    3. Commit both source and generated files
 */
