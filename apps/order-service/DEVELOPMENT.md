<!-- AUTO-GENERATED from docs/development.doc.ts. Do not edit directly. -->

ORDER SERVICE — DEVELOPMENT GUIDE
@module order-service/docs

══════════════════════════════════════════════════════════════════
 🚀 LOCAL SETUP
══════════════════════════════════════════════════════════════════

 Prerequisites:
   • Node.js >= 22
   • pnpm >= 9
   • PostgreSQL >= 15 (or Docker)
   • Redis >= 7 (or Docker)

 Steps:

   # 1. Install (from monorepo root)
   cd ~/vubon.com.bd
   pnpm install

   # 2. Configure env
   cp apps/order-service/.env.example apps/order-service/.env

   # 3. Generate Prisma client
   pnpm --filter @vubon/order-service prisma:generate

   # 4. Migrate database
   pnpm --filter @vubon/order-service prisma:migrate

   # 5. Start dev server
   pnpm --filter @vubon/order-service start:dev

 Service:  http://localhost:4004/api/v1
 Swagger:  http://localhost:4004/api/v1/docs

---

══════════════════════════════════════════════════════════════════
 📋 WORKFLOW
══════════════════════════════════════════════════════════════════

 1. Change code in src/module/<layer>/
 2. Run type-check:  pnpm type-check
 3. Run tests:       pnpm test
 4. Run e2e:         pnpm test:e2e
 5. Commit with conventional commit format

---

══════════════════════════════════════════════════════════════════
 🎨 CODING CONVENTIONS
══════════════════════════════════════════════════════════════════

 ESM only         — All imports use .js extension
 Strict types     — strictNullChecks: true, no `any`
 Naming           — kebab-case files, PascalCase classes
 Layer discipline — Never import upward
 Constants        — Use @vubon/shared-constants, never hardcode
 Errors           — Domain/app errors, never plain Error
 Logging          — NestJS Logger, no console.log

---

══════════════════════════════════════════════════════════════════
 ➕ ADDING A NEW FEATURE
══════════════════════════════════════════════════════════════════

 Example: Add OrderPriorityVO

 1. Domain VO
    src/module/domain/value-objects/primitives/order-priority.vo.ts

 2. Barrel export
    src/module/domain/value-objects/primitives/index.ts

 3. Unit test
    test/unit/domain/value-objects/primitives/order-priority.vo.spec.ts

 4. Constants (if needed)
    packages/shared-constants/src/business/order/order-priority.constants.ts

 5. Update entity (if used)
    src/module/domain/entities/order.entity.ts

 6. Run tests:  pnpm test
 7. Commit:     feat(order): add OrderPriority VO

---

══════════════════════════════════════════════════════════════════
 🧪 RUNNING SINGLE TESTS
══════════════════════════════════════════════════════════════════

   # Single file
   pnpm test -- test/unit/domain/services/order-total.service.spec.ts

   # By name pattern
   pnpm test -- -t "calculate"

   # Watch
   pnpm test:watch

---

══════════════════════════════════════════════════════════════════
 🐛 DEBUGGING
══════════════════════════════════════════════════════════════════

   # Enable verbose Prisma logging
   LOG_LEVEL=debug pnpm start:dev

   # Rebuild and inspect
   pnpm build
   node --inspect dist/main.js

---

══════════════════════════════════════════════════════════════════
 ⚠️  COMMON PITFALLS
══════════════════════════════════════════════════════════════════

 • require() in ESM   → Not available. Always use import.
 • Missing .js ext    → NodeNext resolution rejects it.
 • Test without jest  → import { jest } from '@jest/globals'
 • Circular deps      → Domain never imports upward.
 • Hardcoded currency → Use CURRENCY constant.
 • Plain throw Error  → Use ValidationError / NotFoundError / etc.
