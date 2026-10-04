<!-- AUTO-GENERATED from docs/readme.doc.ts. Do not edit directly. -->

ORDER SERVICE — OVERVIEW
@module order-service/docs

══════════════════════════════════════════════════════════════════
 📦 Order lifecycle management for Vubon.com.bd
══════════════════════════════════════════════════════════════════

 Handles: cart → checkout → order → fulfillment → delivery.
 Built with DDD + CQRS + Hexagonal architecture.

 Storage strategy:
   • PostgreSQL — primary store (Order, OrderItem, Checkout, Delivery, ...)
   • Redis      — hot-read cache (order, checkout, delivery, tracking)
   • BullMQ     — background jobs (processing, cleanup, timeout, tracking)

 Design principles:
   • Order is immutable snapshot (price at purchase time)
   • Cross-service references by ID only (no embedding)
   • Cross-service communication: Event-based

---

══════════════════════════════════════════════════════════════════
 🚀 QUICK START
══════════════════════════════════════════════════════════════════

 Prerequisites:
   • Node.js >= 22
   • pnpm >= 9
   • PostgreSQL >= 15
   • Redis >= 7

 Steps:

   # 1. Install (from monorepo root)
   cd ~/vubon.com.bd
   pnpm install

   # 2. Configure env
   cp apps/order-service/.env.example apps/order-service/.env

   # 3. Prisma client
   pnpm --filter @vubon/order-service prisma:generate

   # 4. Migrate
   pnpm --filter @vubon/order-service prisma:migrate

   # 5. Start dev server
   pnpm --filter @vubon/order-service start:dev

 Service:  http://localhost:4004/api/v1
 Swagger:  http://localhost:4004/api/v1/docs

---

══════════════════════════════════════════════════════════════════
 ✨ FEATURES
══════════════════════════════════════════════════════════════════

 • Order lifecycle          — 13-status state machine
 • Checkout flow            — Start → Address → Shipping → Payment → Confirm
 • Multi-vendor orders      — Auto-allocation per vendor
 • Cancel & Return policies — Window-based, auto-approve, restock fee
 • Fulfillment              — Start → Pack → Ship → Complete
 • Tracking                 — Public + admin tracking events
 • Event-driven sagas       — 7 sagas (checkout, payment, fulfillment,
                               shipping, delivery, cancel, return)
 • CQRS                     — 32 commands + 22 queries
 • Redis cache              — Order, checkout, delivery, tracking
 • BullMQ queues            — 5 queues, 6 workers

---

══════════════════════════════════════════════════════════════════
 🏛️  ARCHITECTURE (summary)
══════════════════════════════════════════════════════════════════

   src/module/
   ├── domain/           Pure business logic (VOs, entities, services)
   ├── application/      Use cases (CQRS, sagas, DTOs, mappers)
   ├── infrastructure/   Adapters (Prisma, Redis, BullMQ, external)
   ├── interfaces/       HTTP layer (controllers, guards, DTOs)
   └── modules/          NestJS DI wiring

 See ARCHITECTURE.md for full details.

---

══════════════════════════════════════════════════════════════════
 📚 DOCUMENTATION INDEX
══════════════════════════════════════════════════════════════════

 | Document                       | Content                          |
 |--------------------------------|----------------------------------|
 | API.md                         | Full REST API reference (51)     |
 | ARCHITECTURE.md                | Layer rules + DDD patterns       |
 | DEVELOPMENT.md                 | Setup + workflow + conventions   |
 | TESTING.md                     | Test patterns + coverage         |
 | DEPLOYMENT.md                  | Railway / Docker guide           |
 | CHANGELOG.md                   | Version history                  |
 | test/README.md                 | Test suite overview              |
 | docs/                          | This folder (source .doc.ts)     |

---

══════════════════════════════════════════════════════════════════
 🔧 COMMANDS
══════════════════════════════════════════════════════════════════

 pnpm start:dev        Dev server (watch mode)
 pnpm build            Compile TypeScript → dist/
 pnpm start:prod       Run compiled dist/main.js
 pnpm type-check       tsc --noEmit
 pnpm lint             ESLint --fix
 pnpm test             All unit tests (1,149)
 pnpm test:watch       Watch mode
 pnpm test:cov         Coverage report
 pnpm test:e2e         E2E tests (40)
 pnpm docs:build       Regenerate markdown from .doc.ts
 pnpm prisma:generate  Regenerate Prisma client
 pnpm prisma:migrate   Run migrations

---

══════════════════════════════════════════════════════════════════
 🔗 CROSS-SERVICE COMMUNICATION
══════════════════════════════════════════════════════════════════

 Consumes (from other services):
   • CartCheckedOutEvent      → create order
   • PaymentCompletedEvent    → confirm order
   • PaymentFailedEvent       → cancel order
   • ShipmentCreatedEvent     → update delivery
   • ShipmentDeliveredEvent   → mark delivered

 Emits (to other services):
   • OrderCreatedEvent        → payment-service, analytics
   • OrderConfirmedEvent      → logistics-service
   • OrderShippedEvent        → notification-service
   • OrderDeliveredEvent      → analytics, notification
   • OrderCancelledEvent      → payment-service (refund)
   • OrderReturnedEvent       → payment-service, logistics

---

══════════════════════════════════════════════════════════════════
 📄 LICENSE
══════════════════════════════════════════════════════════════════

 MIT © 2026 Vubon.com.bd
