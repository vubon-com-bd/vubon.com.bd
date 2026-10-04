<!-- AUTO-GENERATED from docs/development.doc.ts. Do not edit directly. -->

PAYMENT SERVICE — DEVELOPMENT GUIDE
@module payment-service/docs

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
   cp apps/payment-service/.env.example apps/payment-service/.env

   # 3. Generate Prisma client
   cd packages/shared-kernel && pnpm prisma:generate

   # 4. Migrate database
   pnpm --filter @vubon/payment-service prisma:migrate

   # 5. Start dev server
   pnpm --filter @vubon/payment-service start:dev

 Service:  http://localhost:4005/api/v1
 Swagger:  http://localhost:4005/api/v1/docs

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
 Layer discipline — Never import upward (except workers)
 Constants        — Use @vubon/shared-constants, never hardcode
 Errors           — Domain/app errors, never plain Error
 Logging          — NestJS Logger, no console.log
 Idempotency      — Every write endpoint needs a key

---

══════════════════════════════════════════════════════════════════
 ➕ ADDING A NEW GATEWAY
══════════════════════════════════════════════════════════════════

 1. Shared constants
    packages/shared-constants/src/business/payment/
      payment-gateway.constants.ts  (add constant)

 2. Shared config
    packages/shared-config/src/business/payment/
      <gateway>.config.ts            (env-driven config)

 3. Adapter
    src/module/infrastructure/gateways/
      <gateway>.gateway.adapter.ts   (extend BaseGatewayAdapter)

 4. Register
    src/module/infrastructure/gateways/gateways.module.ts
      (providers + ADAPTERS array)

 5. Barrel
    src/module/infrastructure/gateways/index.ts

 6. Router
    src/module/domain/services/payment-gateway-router.service.ts
      (recommend() + methodSupportsGateway())

 7. Fee
    src/module/domain/services/payment-fee.service.ts
      (gatewayFee switch)

 8. Test
    test/unit/infrastructure/gateways/<gateway>.gateway.adapter.spec.ts

 9. Run tests:  pnpm test

---

══════════════════════════════════════════════════════════════════
 🧪 RUNNING SINGLE TESTS
══════════════════════════════════════════════════════════════════

 # Single file
 pnpm test -- test/unit/domain/services/payment-fee.service.spec.ts

 # By name pattern
 pnpm test -- -t "bkash fee"

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
 • Plain throw Error  → Use ValidationError / BusinessRuleError / etc.
 • Non-idempotent     → Every write must accept an idempotency key.
