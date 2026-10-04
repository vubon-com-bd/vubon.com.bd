/**
 * PAYMENT SERVICE — OVERVIEW
 * @module payment-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  💳 Payment gateway orchestration for Vubon.com.bd
 * ══════════════════════════════════════════════════════════════════
 *
 *  Handles: payment intent → authorize → capture → refund → chargeback.
 *  Built with DDD + CQRS + Hexagonal architecture.
 *
 *  Storage strategy:
 *    • PostgreSQL — primary store (Payment, Transaction, Refund, WebhookEvent)
 *    • Redis      — idempotency keys + hot-read payment cache
 *    • BullMQ     — background jobs (retry, expiry, refund, webhook, reconciliation)
 *
 *  Design principles:
 *    • Payment is immutable ledger entry (double-entry accounting)
 *    • Cross-service references by ID only (order, user)
 *    • Cross-service communication: Event-based
 *    • Idempotency everywhere (keys + locks)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 QUICK START
 * ══════════════════════════════════════════════════════════════════
 *
 *  Prerequisites:
 *    • Node.js >= 22
 *    • pnpm >= 9
 *    • PostgreSQL >= 15
 *    • Redis >= 7
 *
 *  Steps:
 *
 *    # 1. Install (from monorepo root)
 *    cd ~/vubon.com.bd
 *    pnpm install
 *
 *    # 2. Configure env
 *    cp apps/payment-service/.env.example apps/payment-service/.env
 *
 *    # 3. Prisma client (from shared-kernel)
 *    cd packages/shared-kernel && pnpm prisma:generate
 *
 *    # 4. Migrate
 *    pnpm --filter @vubon/payment-service prisma:migrate
 *
 *    # 5. Start dev server
 *    pnpm --filter @vubon/payment-service start:dev
 *
 *  Service:  http://localhost:4005/api/v1
 *  Swagger:  http://localhost:4005/api/v1/docs
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  ✨ FEATURES
 * ══════════════════════════════════════════════════════════════════
 *
 *  • Payment lifecycle       — 12-status state machine
 *  • Gateway routing         — currency × method × preferred auto-select
 *  • 7 gateway adapters      — bkash, nagad, rocket, sslcommerz, stripe, paypal, cod
 *  • Idempotency             — derived keys + Redis locks
 *  • Refund policy           — window + partial + auto-approve threshold
 *  • Fee + VAT               — BD 15% VAT on gateway fee
 *  • Double-entry ledger     — debit/credit classification
 *  • Webhook verification    — HMAC-SHA256 per gateway
 *  • Background workers      — retry, expiry, refund, webhook, reconciliation
 *  • CQRS                    — 20 commands + 17 queries
 *  • Event-driven sagas      — 3 sagas (payment, refund, webhook lifecycle)
 *  • Redis idempotency cache — 24h TTL
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🏛️  ARCHITECTURE (summary)
 * ══════════════════════════════════════════════════════════════════
 *
 *    src/module/
 *    ├── domain/           Pure business logic (VOs, entities, services)
 *    ├── application/      Use cases (CQRS, sagas, DTOs, mappers)
 *    ├── infrastructure/   Adapters (Prisma, Redis, BullMQ, gateways, workers)
 *    ├── interfaces/       HTTP layer (controllers, guards, DTOs)
 *    └── modules/          NestJS DI wiring
 *
 *  See ARCHITECTURE.md for full details.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📚 DOCUMENTATION INDEX
 * ══════════════════════════════════════════════════════════════════
 *
 *  | Document                | Content                          |
 *  |-------------------------|----------------------------------|
 *  | API.md                  | Full REST API reference          |
 *  | ARCHITECTURE.md         | Layer rules + DDD patterns       |
 *  | DEVELOPMENT.md          | Setup + workflow + conventions   |
 *  | TESTING.md              | Test patterns + coverage         |
 *  | DEPLOYMENT.md           | Railway / Docker guide           |
 *  | CHANGELOG.md            | Version history                  |
 *  | test/README.md          | Test suite overview              |
 *  | docs/                   | This folder (source .doc.ts)     |
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔧 COMMANDS
 * ══════════════════════════════════════════════════════════════════
 *
 *  pnpm start:dev        Dev server (watch mode)
 *  pnpm build            Compile TypeScript → dist/
 *  pnpm start:prod       Run compiled dist/main.js
 *  pnpm type-check       tsc --noEmit
 *  pnpm lint             ESLint --fix
 *  pnpm test             All unit tests (996)
 *  pnpm test:watch       Watch mode
 *  pnpm test:cov         Coverage report
 *  pnpm test:e2e         E2E tests (68)
 *  pnpm docs:build       Regenerate markdown from .doc.ts
 *  pnpm prisma:generate  Regenerate Prisma client
 *  pnpm prisma:migrate   Run migrations
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔗 CROSS-SERVICE COMMUNICATION
 * ══════════════════════════════════════════════════════════════════
 *
 *  Consumes (from other services):
 *    • OrderConfirmedEvent      → initiate payment
 *    • OrderCancelledEvent      → cancel/refund payment
 *    • OrderReturnedEvent       → refund payment
 *
 *  Emits (to other services):
 *    • PaymentInitiatedEvent    → order-service, analytics
 *    • PaymentCapturedEvent     → order-service
 *    • PaymentPaidEvent         → order-service, analytics
 *    • PaymentFailedEvent       → order-service
 *    • PaymentRefundedEvent     → order-service, notification
 *    • PaymentChargebackEvent   → order-service, notification
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📄 LICENSE
 * ══════════════════════════════════════════════════════════════════
 *
 *  MIT © 2026 Vubon.com.bd
 */
