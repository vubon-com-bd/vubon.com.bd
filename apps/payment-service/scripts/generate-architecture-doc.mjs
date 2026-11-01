#!/usr/bin/env node
/**
 * ARCHITECTURE.md Generator — Payment Service
 */
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

const content = `# Architecture — Payment Service

## Overview

Payment Service follows **DDD (Domain-Driven Design)** with **CQRS** and **Event Sourcing** patterns, organized in 5 layers with strict dependency rules.

---

## The 5 Layers

### 1. Domain Layer
**Path:** \`src/module/domain/\`

\`\`\`
domain/
├── value-objects/primitives/   40 VOs (Payment, Refund, Transaction, etc.)
├── value-objects/composites/   12 composite VOs
├── entities/                   10 entities (AggregateRoot + BaseEntity)
├── repositories/               10 interfaces + DI tokens
├── events/                     8 event files + helpers
├── services/                   10 domain services
├── specifications/             6 specifications
└── errors/                     9 error files
\`\`\`

**Rules:**
- ❌ No framework (no \`@nestjs/*\`)
- ❌ No Prisma, Redis, HTTP
- ✅ Pure TypeScript + \`@vubon/shared-kernel\` base classes
- ✅ Domain logic + invariants only

**Aggregate Root:** \`PaymentEntity\`

**Key VOs:**
- Payment: \`payment-id\`, \`payment-status\`, \`payment-amount\`, \`payment-currency\`
- Method: \`payment-method-type\`, \`payment-method-provider\`
- Transaction: \`transaction-type\`, \`transaction-status\`
- Refund: \`refund-amount\`, \`refund-reason\`, \`refund-status\`
- Card: \`card-token\`, \`card-last4\`, \`card-brand\`, \`card-expiry\`
- Idempotency: \`idempotency-key\`, \`gateway-reference\`
- Cross-service: \`order-id\`, \`user-id\`

**Domain Services:**
- \`PaymentRoutingService\` — gateway selection
- \`PaymentValidationService\` — cross-VO validation
- \`RefundEligibilityService\` — refund rules (90-day window)
- \`SplitCalculationService\` — split reconciliation
- \`RecurringScheduleService\` — next-run computation
- \`SubscriptionLifecycleService\` — subscription state
- \`InvoiceNumberService\` — INV-YYYY-NNNNNN
- \`FeeCalculationService\` — VAT 15% + gateway fees
- \`IdempotencyService\` — idempotency validation
- \`CurrencyConversionService\` — rate-based conversion

---

### 2. Application Layer
**Path:** \`src/module/application/\`

\`\`\`
application/
├── commands/        36 commands + 36 handlers
├── queries/         18 queries + 18 handlers
├── dtos/requests/   40+ files
├── dtos/responses/  9 files
├── services/
│   ├── interfaces/  10 interfaces + DI tokens
│   └── impl/        10 implementations
├── sagas/           3 sagas + 6 helper commands
├── mappers/         7 mappers
├── validators/      4 validators
└── errors/          8 error files
\`\`\`

**Rules:**
- ❌ No direct controller or Prisma import
- ✅ Uses domain repository interfaces (DI tokens)
- ✅ Uses \`@CommandHandler\` / \`@QueryHandler\`
- ✅ Orchestrates domain + infrastructure via ports

**Services:**
- \`PaymentService\` — initiate, confirm, cancel, retry, verify
- \`RefundService\` — request, approve, reject, partial
- \`TransactionService\` — create, reverse
- \`SplitPaymentService\` — create splits
- \`RecurringPaymentService\` — schedule
- \`SubscriptionService\` — lifecycle
- \`InvoiceService\` — generate, send, void
- \`VerificationService\` — OTP/CVV
- \`PaymentMethodService\` — CRUD
- \`PaymentGatewayService\` — list, health

**Sagas:**
- \`PaymentProcessingSaga\` — payment lifecycle events
- \`RefundProcessingSaga\` — refund events
- \`SubscriptionRenewalSaga\` — subscription renewal

---

### 3. Infrastructure Layer
**Path:** \`src/module/infrastructure/\`

\`\`\`
infrastructure/
├── persistence/
│   ├── prisma/             11 mappers + 11 repos
│   ├── memory/             11 InMemory repos + module
│   └── cache/              3 cache repos
├── gateways/               8 gateway adapters
│   ├── base/               BaseGatewayAdapter
│   ├── bkash/ nagad/ rocket/
│   ├── stripe/ paypal/ sslcommerz/ aamarpay/ cod/
│   └── gateway-resolver.service.ts
├── queues/                 6 queue files
├── workers/                9 workers
├── services/
│   ├── internal/           9 internal services
│   └── external/           4 external services
└── config/                 16 config files
\`\`\`

**Rules:**
- ✅ Implements domain repository interfaces
- ✅ Dual mode via \`PERSISTENCE_DRIVER\` env
- ✅ NestJS \`@Injectable\` + \`@Module\`

**8 Payment Gateways:**
| Gateway | Type |
|---------|------|
| bKash | BD mobile banking |
| Nagad | BD mobile banking |
| Rocket | BD mobile banking |
| Stripe | International card |
| PayPal | International |
| SSLCommerz | BD gateway |
| aamarPay | BD gateway |
| COD | Cash on delivery |

**9 Internal Services:**
- \`crypto\`, \`signature\`, \`idempotency\`, \`currency-converter\`
- \`fee-calculator\`, \`retry\`, \`circuit-breaker\`
- \`invoice-generator\`, \`receipt-generator\`

**4 External Services:**
- \`email\`, \`sms\`, \`push\`, \`notification\`

**Workers:**
- \`payment-processor\`, \`payment-retry\`, \`payment-expiry\`
- \`refund-processor\`
- \`subscription-renewal\`
- \`invoice-generator\`
- \`webhook-processor\`
- \`reconciliation\`

---

### 4. Interfaces Layer
**Path:** \`src/module/interfaces/\`

\`\`\`
interfaces/
├── controllers/
│   ├── rest/          12 REST controllers
│   ├── webhooks/      8 webhook controllers
│   └── graphql/       2 GraphQL resolvers
├── dtos/
│   ├── requests/      7 request DTO classes (class-validator)
│   └── responses/     12 response DTO classes
├── mappers/           5 controller mappers
├── guards/            4 guards
├── interceptors/      4 interceptors
├── decorators/        4 decorators
├── middlewares/       2 middlewares
├── validators/        4 validators
├── errors/            1 HTTP error translator
└── swagger/           5 swagger bundles
\`\`\`

**Rules:**
- ✅ Extends \`BaseController\` from \`@vubon/shared-kernel\`
- ✅ Uses \`@UseGuards\`, \`@UseInterceptors\`
- ❌ No business logic

**12 REST Controllers:**
\`payment\`, \`payment-method\`, \`payment-gateway\`, \`transaction\`, \`refund\`, \`split-payment\`, \`recurring-payment\`, \`subscription\`, \`invoice\`, \`verification\`, \`analytics\`, \`health\`

**8 Webhook Controllers:**
\`bkash\`, \`nagad\`, \`rocket\`, \`stripe\`, \`paypal\`, \`sslcommerz\`, \`aamarpay\`, \`crypto\`

**4 Guards:**
\`OwnPaymentGuard\`, \`VerifiedPaymentGuard\`, \`WebhookSignatureGuard\`, \`IdempotencyGuard\`

**4 Interceptors:**
\`PaymentCacheInterceptor\`, \`WebhookRetryInterceptor\`, \`IdempotencyInterceptor\`, \`CorrelationIdInterceptor\`

---

### 5. Modules Layer
**Path:** \`src/module/modules/\`

\`\`\`
modules/
├── app.module.ts            Root module
├── common/                  Kernel + Infra aggregate
├── health/                  Health module
├── payment/                 Core payment feature
├── payment-method/          Saved methods
├── payment-gateway/         Gateway listing
├── transaction/             Transactions
├── refund/                  Refunds
├── split-payment/           Split payments
├── recurring-payment/       Recurring schedule
├── subscription/            Subscriptions
├── invoice/                 Invoices
├── webhook/                 Webhook handlers
└── gateway/                 Gateway adapters aggregate
\`\`\`

**Feature modules:** 13 + common + health

**Conditional import via DB_MODE:**
\`\`\`typescript
const REPO_MODULE = process.env.PERSISTENCE_DRIVER === 'memory'
  ? MemoryRepositoriesModule
  : PrismaRepositoriesModule;
\`\`\`

---

## Dependency Rules

| Layer | Can Import | Must NOT Import |
|-------|-----------|-----------------|
| **Domain** | shared-kernel, shared-types, shared-constants | NestJS, Prisma, other layers |
| **Application** | domain, shared-kernel, shared-types, shared-schemas | infrastructure, interfaces |
| **Infrastructure** | domain, application (DTOs), shared-kernel | interfaces |
| **Interfaces** | application, domain (types only), shared-kernel | infrastructure |
| **Modules** | all layers (imports only for wiring) | — |

---

## Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| VO (primitive) | \`<concept>-<property>.vo.ts\` | \`payment-id.vo.ts\` |
| VO (composite) | \`<concept>.vo.ts\` | \`payment.vo.ts\` |
| Entity | \`<concept>.entity.ts\` | \`payment.entity.ts\` |
| Repository interface | \`<concept>.repository.interface.ts\` | \`payment.repository.interface.ts\` |
| Repository impl (Prisma) | \`<concept>.prisma.repository.ts\` | \`payment.prisma.repository.ts\` |
| Repository impl (Memory) | \`<concept>.memory.repository.ts\` | \`payment.memory.repository.ts\` |
| Command | \`<action>-<concept>.command.ts\` | \`initiate-payment.command.ts\` |
| Handler | \`<action>-<concept>.handler.ts\` | \`initiate-payment.handler.ts\` |
| Controller | \`<concept>.controller.ts\` | \`payment.controller.ts\` |
| Webhook controller | \`<provider>.webhook.ts\` | \`bkash.webhook.ts\` |
| Gateway adapter | \`<provider>.gateway.ts\` | \`stripe.gateway.ts\` |
| Module | \`<concept>.module.ts\` | \`payment.module.ts\` |
| Error | \`<concept>.errors.ts\` | \`payment.errors.ts\` |
| DTO (request) | \`<action>-<concept>.dto.ts\` | \`initiate-payment.dto.ts\` |
| DTO (response) | \`<concept>-response.dto.ts\` | \`payment-response.dto.ts\` |

---

## 10 Core Pattern Rules

1. **Typed errors** everywhere (\`ValidationError\`, \`BusinessRuleError\`)
2. **\`reconstitute()\`** on every VO + Entity (trusted DB load)
3. **\`assertInvariants()\`** separate method
4. **\`assertTransitionTo()\`** for state machines
5. **\`emitStatusChange()\`** for audit
6. **Rich predicates** (\`isActive()\`, \`canBeActivated()\`)
7. **Business methods** (not just getters)
8. **DI tokens** for repositories (Symbol-based)
9. **Filter + Options + Pagination + Stats** types
10. **Dual-mode persistence** (memory + prisma)

---

## Data Flow

\`\`\`
HTTP Request
    ↓
Controller (interfaces)
    ↓
CommandBus / QueryBus (CQRS)
    ↓
Handler (application)
    ↓
Service (application)
    ↓
Entity / VO (domain)
    ↓
Repository Interface (domain)
    ↓
Prisma / Memory Repository (infrastructure)
    ↓
Database / In-Memory Map
    ↓
Domain Events → EventBridge → Sagas → Cross-Service
\`\`\`

---

## Payment State Machine

\`\`\`
                  ┌──────────────┐
                  │   pending    │
                  └──────┬───────┘
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │processing│    │  failed  │    │cancelled │
  └────┬─────┘    └──────────┘    └──────────┘
       │
       ↓
  ┌────────────┐
  │ authorized │
  └─────┬──────┘
        ↓
  ┌──────────┐
  │ captured │
  └────┬─────┘
       ↓
  ┌──────────┐
  │   paid   │
  └────┬─────┘
       ↓
  ┌────────────┐   ┌──────────────────┐
  │ refunded   │ ← │ partially_refunded│
  └────────────┘   └──────────────────┘
       ↑
       │
  ┌────────────┐
  │ chargeback │
  └────────────┘
\`\`\`

---

## Total Stats

| Layer | Files | Classes | Interfaces |
|-------|-------|---------|-----------|
| Domain | 122 | ~150 | ~80 |
| Application | 226 | ~150 | ~60 |
| Infrastructure | 165 | ~90 | ~20 |
| Interfaces | 82 | ~50 | ~40 |
| Modules | 61 | ~50 | ~5 |
| **Total** | **~656** | **~490** | **~205** |

---

## See Also

- [README.md](./README.md) — overview
- [API.md](./API.md) — endpoint reference
- [DEPLOYMENT.md](./DEPLOYMENT.md) — deploy guide
`;

const path = join(ROOT, 'ARCHITECTURE.md');
writeFileSync(path, content, 'utf8');
console.log('✅ ARCHITECTURE.md regenerated');
console.log(`   ${content.split('\n').length} lines`);
