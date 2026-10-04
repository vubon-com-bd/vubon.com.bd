<!-- AUTO-GENERATED from docs/architecture.doc.ts. Do not edit directly. -->

PAYMENT SERVICE — ARCHITECTURE DOCUMENTATION
@module payment-service/docs

══════════════════════════════════════════════════════════════════
 🏛️  OVERVIEW
══════════════════════════════════════════════════════════════════

 Payment gateway orchestration microservice for Vubon.com.bd.
 Built with DDD + CQRS + Hexagonal architecture.

 Storage strategy:
   • PostgreSQL — primary store (Payment, Transaction, Refund, WebhookEvent)
   • Redis      — idempotency keys + hot-read cache
   • BullMQ     — background jobs (retry, expiry, refund, webhook, reconciliation)

 Design principles:
   • Payment is immutable ledger entry (double-entry accounting)
   • Cross-service references by ID only (order, user)
   • Cross-service communication: Event-based only
   • Business rules in domain, not in services/repos/controllers
   • Idempotency everywhere (keys + locks)

---

══════════════════════════════════════════════════════════════════
 📐 5-LAYER ARCHITECTURE
══════════════════════════════════════════════════════════════════

   ┌──────────────────────────────────────────────────────┐
   │  interfaces/   HTTP controllers, guards, DTOs        │  ← inbound
   ├──────────────────────────────────────────────────────┤
   │  application/  CQRS handlers, sagas, services        │  ← use cases
   ├──────────────────────────────────────────────────────┤
   │  domain/       VOs, entities, specs, services        │  ← pure
   ├──────────────────────────────────────────────────────┤
   │  infrastructure/ Prisma, Redis, BullMQ, gateways     │  ← outbound
   ├──────────────────────────────────────────────────────┤
   │  modules/      NestJS DI wiring                      │  ← composition
   └──────────────────────────────────────────────────────┘

---

══════════════════════════════════════════════════════════════════
 🔒 IMPORT RULES
══════════════════════════════════════════════════════════════════

 | From ↓ / To →  | kernel | domain | app | infra | interface | module |
 |----------------|:------:|:------:|:---:|:-----:|:---------:|:------:|
 | domain         |   ✅   |   ❌   |  ❌ |   ❌  |    ❌     |   ❌   |
 | application    |   ✅   |   ✅   |  ❌ |   ❌  |    ❌     |   ❌   |
 | infrastructure |   ✅   |   ✅   |  ✅ |   ❌  |    ❌     |   ❌   |
 | interfaces     |   ✅   |   ✅   |  ✅ |   ❌  |    ❌     |   ❌   |
 | modules        |   ✅   |   ✅   |  ✅ |   ✅  |    ✅     |   ❌   |

 Rule: higher layer may import lower; never the reverse.
 Exception: infrastructure/workers/ MAY import application/ services
 (worker = application driver, not pure adapter).

---

══════════════════════════════════════════════════════════════════
 🧩 DOMAIN LAYER (pure business)
══════════════════════════════════════════════════════════════════

 22 primitive VOs   — payment-id, payment-status, payment-method,
                      payment-gateway, payment-amount, currency,
                      idempotency-key, gateway-payment-id, ...
  3 composite VOs   — PaymentVO, RefundVO, TransactionVO
  4 entities        — PaymentEntity (aggregate root), Transaction,
                      Refund, WebhookEvent
  5 domain services — payment-fee, payment-gateway-router,
                      payment-idempotency, payment-refund-policy,
                      payment-transaction-ledger
  3 specifications  — can-capture, can-refund, can-retry
  4 error files     — payment, refund, transaction, webhook
  5 event files     — payment, transaction, refund, webhook

 Invariants live in entity constructors and business methods.

---

══════════════════════════════════════════════════════════════════
 🎯 APPLICATION LAYER (use cases)
══════════════════════════════════════════════════════════════════

 Commands    (20)   — Write operations, one handler per command
 Queries     (17)   — Read operations, cache-aware
 Services    (4)    — Orchestrate repository + domain
 Sagas       (3)    — Event-driven workflows (RxJS)
 Mappers     (4)    — Entity ↔ DTO boundary
 Validators  (2)    — Schema-based (Zod)
 Errors      (4)    — Application-level errors

---

══════════════════════════════════════════════════════════════════
 🔌 INFRASTRUCTURE LAYER
══════════════════════════════════════════════════════════════════

 4 Prisma repositories    — Implement domain repository interfaces
 4 Prisma mappers         — Row ↔ Entity conversion
 2 Redis cache repos      — Idempotency + payment read-through
 7 gateway adapters       — bkash, nagad, rocket, sslcommerz,
                            stripe, paypal, cod
 1 gateway resolver       — Resolve by ID, warn when disabled
 4 internal services      — Signature (HMAC), idempotency,
                            fee-calculator, retry-policy
 2 external services      — Notification, analytics
 3 queues                 — Payment, refund, webhook
 6 workers                — Retry, expiry, refund, webhook,
                            reconciliation
 2 config files           — Payment + gateway config re-exports

---

══════════════════════════════════════════════════════════════════
 🌐 INTERFACES LAYER
══════════════════════════════════════════════════════════════════

 5 REST controllers       — payment, refund, transaction, webhook, health
 2 guards                 — PaymentOwner, PaymentStatus
 2 middlewares            — Idempotency header, correlation-id
 1 interceptor            — PaymentCache (5 min TTL)
 3 validators             — Payment, refund, webhook HTTP wrappers
 4 mappers                — HTTP DTO ↔ Application DTO
 3 decorators             — @PaymentOwner, @PaymentStatus, @IdempotencyHeader
 2 swagger files          — Constants + reusable @ApiResponse helpers

---

══════════════════════════════════════════════════════════════════
 ⚙️  MODULES LAYER (DI)
══════════════════════════════════════════════════════════════════

 AppModule          — Root (Config + CqrsModule.forRoot + features)
 CommonModule       — Global (kernel + infrastructure modules)
 PaymentModule      — Payment feature
 RefundModule       — Refund feature
 TransactionModule  — Transaction feature
 WebhookModule      — Webhook feature (+ WebhookProcessorWorker)
 HealthModule       — Health endpoints

 InfrastructureModule (Global) aggregates:
   • PrismaRepositoriesModule (4 repos + Symbol tokens)
   • RedisRepositoriesModule (2 cache repos)
   • GatewaysModule (7 adapters + resolver)
   • QueuesWorkersModule (3 queues + 4 workers)
   • Services (external + internal)

---

══════════════════════════════════════════════════════════════════
 🔄 PAYMENT LIFECYCLE STATE MACHINE
══════════════════════════════════════════════════════════════════

   pending
     ├─→ processing ─→ authorized ─→ captured ─→ paid
     ├─→ authorized ─→ captured ─→ paid
     ├─→ failed      ─→ pending (retry)
     ├─→ declined    ─→ pending (retry)
     ├─→ cancelled
     └─→ expired

   captured / paid
     ├─→ partially_refunded ─→ partially_refunded (multiple) ─→ refunded
     └─→ chargeback

   Terminal states: cancelled, refunded, chargeback, expired

---

══════════════════════════════════════════════════════════════════
 💰 FEE + VAT CALCULATION
══════════════════════════════════════════════════════════════════

 bKash          1.85% (merchant rate)
 Nagad          1.5%
 Rocket         1.8%
 SSLCommerz     2.5% (BDT) / 3.5% (international)
 Stripe         2.9% + 0.30 USD fixed
 PayPal         3.49% + 0.49 USD fixed
 Manual / COD   0%

 VAT:
   • BDT gateway fees   → 15% VAT
   • USD / EUR / GBP    → 0% VAT (exempt)

---

══════════════════════════════════════════════════════════════════
 🎯 GATEWAY ROUTING MATRIX
══════════════════════════════════════════════════════════════════

 Method           Currency    Routed to
 ───────────────  ─────────   ──────────────────────────
 mobile_banking   BDT         bkash | nagad | rocket
 wallet           BDT         bkash | nagad | rocket
 card             BDT         sslcommerz | stripe | manual
 card             USD/EUR     stripe | paypal
 net_banking      BDT         sslcommerz | manual
 net_banking      USD/EUR     stripe | paypal
 cash_on_delivery any         manual (no gateway)
 bank_transfer    any         sslcommerz | stripe | manual

---

══════════════════════════════════════════════════════════════════
 📊 DOUBLE-ENTRY LEDGER
══════════════════════════════════════════════════════════════════

 Transaction type   Debit              Credit
 ─────────────────  ─────────────────  ─────────────────
 payment            customer           platform
 transfer           customer           platform
 refund             platform           customer
 payout             platform           vendor
 chargeback         platform           customer
 reversal           platform           customer
 adjustment         platform           platform

 Invariant: sum(debit) == sum(credit) for every transaction.
