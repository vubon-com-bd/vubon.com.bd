<!-- AUTO-GENERATED from docs/development.doc.ts. Do not edit directly. -->

CART SERVICE — DEVELOPMENT GUIDE
@module cart-service/docs

══════════════════════════════════════════════════════════════════
 🚀 LOCAL SETUP
══════════════════════════════════════════════════════════════════

 Prerequisites:
   • Node.js >= 22
   • pnpm >= 9
   • Redis >= 6 (running locally)
   • PostgreSQL (optional — for persistent features)

 Steps:

 # 1. Install (from monorepo root)
 cd ~/vubon.com.bd
 pnpm install

 # 2. Configure env
 cp apps/cart-service/.env.example apps/cart-service/.env
 # Edit for local Redis / Postgres

 # 3. Start Redis (Termux)
 redis-server --daemonize yes
 redis-cli ping   # should output: PONG

 # 4. Generate Prisma client (optional)
 cd apps/cart-service
 pnpm prisma:generate

 # 5. Build shared packages (first time only)
 cd ~/vubon.com.bd
 pnpm --filter @vubon/shared-kernel build
 pnpm --filter @vubon/shared-constants build
 pnpm --filter @vubon/shared-types build

 # 6. Start service
 cd apps/cart-service
 pnpm start:dev     # watch mode
 # OR
 pnpm build && node dist/main.js    # production

---

══════════════════════════════════════════════════════════════════
 🔧 AVAILABLE SCRIPTS
══════════════════════════════════════════════════════════════════

 Build & Run:
   pnpm build              — compile TypeScript → dist/
   pnpm start              — run from src/ (compiled on-the-fly)
   pnpm start:dev          — watch mode with auto-restart
   pnpm start:debug        — debug mode with inspector
   pnpm start:prod         — run from dist/main.js
   pnpm type-check         — TypeScript validation only

 Testing:
   pnpm test               — run all unit tests
   pnpm test:watch         — unit tests in watch mode
   pnpm test:cov           — unit tests with coverage report
   pnpm test:e2e           — E2E integration tests

 Linting:
   pnpm lint               — ESLint auto-fix

 Prisma:
   pnpm prisma:generate    — generate Prisma client
   pnpm prisma:migrate     — run migrations

 Documentation:
   pnpm docs:build         — generate markdown from docs/*.doc.ts

---

══════════════════════════════════════════════════════════════════
 📂 FOLDER CONVENTIONS
══════════════════════════════════════════════════════════════════

 Naming:
   • Files       — kebab-case (cart-item.entity.ts)
   • Classes     — PascalCase (CartItemEntity)
   • Functions   — camelCase (createCart)
   • Constants   — SCREAMING_SNAKE_CASE (MAX_ITEMS)
   • DTOs        — *.dto.ts
   • Entities    — *.entity.ts
   • Value Obj   — *.vo.ts
   • Repos       — *.repository.ts / *.repository.interface.ts
   • Services    — *.service.ts / *.service.interface.ts
   • Handlers    — *.handler.ts
   • Commands    — *.command.ts
   • Queries     — *.query.ts
   • Guards      — *.guard.ts
   • Interceptors— *.interceptor.ts
   • Tests       — *.spec.ts / *.e2e-spec.ts

 Import rules:
   • Always use .js extension (ESM)
   • Path aliases (@domain, @application, etc.)
   • Never reach outside cart-service

---

══════════════════════════════════════════════════════════════════
 🧩 ADDING A NEW FEATURE (checklist)
══════════════════════════════════════════════════════════════════

 Domain Layer:
   ☐ Create VO(s) if needed          — domain/value-objects/primitives/
   ☐ Create composite VO if needed   — domain/value-objects/composites/
   ☐ Update / add Entity             — domain/entities/*.entity.ts
   ☐ Add Domain Event                — domain/events/*.events.ts
   ☐ Add Repo interface + token      — domain/repositories/
   ☐ Add Domain Service (if logic)   — domain/services/
   ☐ Add Specification (if rule)     — domain/specifications/
   ☐ Add Domain Error                — domain/errors/

 Application Layer:
   ☐ Create request DTO              — application/dtos/requests/
   ☐ Create response DTO             — application/dtos/responses/
   ☐ Add command + handler           — application/commands/{feature}/
   ☐ Add query + handler (if read)   — application/queries/{feature}/
   ☐ Add / update service interface  — application/services/interfaces/
   ☐ Add / update service impl       — application/services/impl/
   ☐ Add mapper if needed            — application/mappers/
   ☐ Add validator if needed         — application/validators/
   ☐ Add saga if multi-step          — application/sagas/

 Infrastructure Layer:
   ☐ Implement repo (Redis / Prisma)— infrastructure/persistence/
   ☐ Bind token in module            — {persistence}-repositories.module.ts
   ☐ Add external client if needed   — infrastructure/services/external/
   ☐ Add worker / queue if async     — infrastructure/workers/ + queues/
   ☐ Add config if new env var       — infrastructure/config/

 Interfaces Layer:
   ☐ Add controller endpoint         — interfaces/controllers/rest/
   ☐ Add guard / interceptor         — interfaces/guards/ or /interceptors/
   ☐ Add HTTP DTO                    — interfaces/dtos/requests/
   ☐ Add response DTO                — interfaces/dtos/responses/
   ☐ Add mapper (App → HTTP)         — interfaces/mappers/
   ☐ Add Zod validator               — interfaces/validators/

 Modules Layer:
   ☐ Register handlers + controllers in feature module
   ☐ Export public services

 Tests:
   ☐ Unit test for each new VO / Entity / Service / Handler
   ☐ E2E test for each new endpoint

---

══════════════════════════════════════════════════════════════════
 🐛 TROUBLESHOOTING
══════════════════════════════════════════════════════════════════

 Issue: Redis connection refused
   Fix: redis-server --daemonize yes
        redis-cli ping  # expect PONG

 Issue: Prisma engine fails on Termux ARM64
   Symptom: "libquery_engine-...so.node is for EM_X86_64"
   Status: Expected — PrismaService gracefully degrades.
           Cart works via Redis. Persistent features (SavedItem,
           AbandonedCart) unavailable on Termux.
   Fix on production: use linux-arm64 or Docker build.

 Issue: Cannot find module '@vubon/shared-kernel'
   Fix: pnpm --filter @vubon/shared-kernel build
        pnpm install    # relink workspace

 Issue: Port 4003 already in use
   Fix: pkill -f "node.*cart-service"
        OR change PORT env var

 Issue: Jest "ReferenceError: jest is not defined"
   Fix: add `import { jest } from '@jest/globals';` at top
        (ESM mode requires explicit jest import)

 Issue: Jest worker didn't exit gracefully
   Fix: already configured with forceExit: true
        If persists, check for unclosed Redis / Prisma handles

 Issue: Module resolution fails in Jest
   Fix: check jest.config.cjs moduleNameMapper for the subpath
        (e.g. @vubon/shared-kernel/prisma needs explicit mapping)

---

══════════════════════════════════════════════════════════════════
 🎨 CODE STYLE
══════════════════════════════════════════════════════════════════

 TypeScript:
   • strictNullChecks ON
   • noImplicitAny ON
   • No `any` type — use `unknown` + type guard
   • Prefer `readonly` for immutability
   • Prefer `interface` for shapes, `type` for unions

 Naming:
   • Boolean: isActive, hasItems, canCheckout
   • Arrays: items, events (plural)
   • Factories: createXxx(), reconstituteXxx()
   • Getters: get value(): T

 Logging:
   • Use NestJS Logger (not console.log)
   • Include context: `new Logger(CartService.name)`
   • Levels: debug → log → warn → error

 Comments:
   • JSDoc for public APIs only
   • Explain "why", not "what"
   • No commented-out code
   • TODO must reference an issue

---

══════════════════════════════════════════════════════════════════
 🔗 USEFUL COMMANDS (Termux)
══════════════════════════════════════════════════════════════════

 # Check running server
 ps aux | grep node

 # Kill server
 pkill -f "node.*cart-service"

 # Redis inspection
 redis-cli keys "cart:*"
 redis-cli get "cart:<uuid>"
 redis-cli ttl "cart:<uuid>"

 # File structure
 find src/module -maxdepth 2 -type d | sort

 # Line counts per layer
 for d in domain application infrastructure interfaces modules; do
   echo "$d: $(find src/module/$d -name '*.ts' | wc -l) files"
 done

 # Run single test
 pnpm test test/unit/domain/entities/cart.entity.spec.ts
