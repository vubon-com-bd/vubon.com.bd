#!/usr/bin/env node
/**
 * README.md Generator — Payment Service
 * @module payment-service/scripts
 *
 * Auto-generates README.md with live stats from the codebase.
 */
import { writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// ─── Config ─────────────────────────────────
const SERVICE_NAME = 'Payment Service';
const SERVICE_SLUG = '@vubon/payment-service';
const SERVICE_PORT = 3006;
const STAGING_URL = 'https://payments-staging.vubon.com.bd';
const PROD_URL = 'https://payments.vubon.com.bd';

// ─── Live stats from codebase ───────────────
function countFiles(dir, pattern) {
  try {
    return execSync(`find ${dir} -name "${pattern}" 2>/dev/null | wc -l`, {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    return '0';
  }
}

function countAllFiles(dir) {
  try {
    return execSync(`find ${dir} -name "*.ts" 2>/dev/null | wc -l`, {
      cwd: ROOT,
      encoding: 'utf8',
    }).trim();
  } catch {
    return '0';
  }
}

const stats = {
  domain: {
    primitivesVO: countFiles('src/module/domain/value-objects/primitives', '*.vo.ts'),
    compositeVO: countFiles('src/module/domain/value-objects/composites', '*.vo.ts'),
    entities: countFiles('src/module/domain/entities', '*.entity.ts'),
    repositories: countFiles('src/module/domain/repositories', '*.interface.ts'),
    eventFiles: countFiles('src/module/domain/events', '*.events.ts'),
    services: countFiles('src/module/domain/services', '*.service.ts'),
    specifications: countFiles('src/module/domain/specifications', '*.specification.ts'),
    errorFiles: countFiles('src/module/domain/errors', '*.errors.ts'),
    total: countAllFiles('src/module/domain'),
  },
  application: {
    commandHandlers: countFiles('src/module/application/commands', '*.handler.ts'),
    queryHandlers: countFiles('src/module/application/queries', '*.handler.ts'),
    sagas: countFiles('src/module/application/sagas', '*.saga.ts'),
    servicesImpl: countFiles('src/module/application/services/impl', '*.service.ts'),
    servicesInterfaces: countFiles('src/module/application/services/interfaces', '*.interface.ts'),
    mappers: countFiles('src/module/application/mappers', '*.mapper.ts'),
    validators: countFiles('src/module/application/validators', '*.validator.ts'),
    total: countAllFiles('src/module/application'),
  },
  infrastructure: {
    prismaMappers: countFiles('src/module/infrastructure/persistence/prisma/mappers', '*.mapper.ts'),
    prismaRepos: countFiles('src/module/infrastructure/persistence/prisma/repositories', '*.repository.ts'),
    memoryRepos: countFiles('src/module/infrastructure/persistence/memory/repositories', '*.repository.ts'),
    cacheRepos: countFiles('src/module/infrastructure/persistence/cache/repositories', '*.repository.ts'),
    gateways: countFiles('src/module/infrastructure/gateways', '*.gateway.ts'),
    queues: countFiles('src/module/infrastructure/queues', '*.queue.ts'),
    workers: countFiles('src/module/infrastructure/workers', '*.worker.ts'),
    internalServices: countFiles('src/module/infrastructure/services/internal', '*.service.ts'),
    externalServices: countFiles('src/module/infrastructure/services/external', '*.service.ts'),
    configs: countFiles('src/module/infrastructure/config', '*.config.ts'),
    total: countAllFiles('src/module/infrastructure'),
  },
  interfaces: {
    restControllers: countFiles('src/module/interfaces/controllers/rest', '*.controller.ts'),
    webhookControllers: countFiles('src/module/interfaces/controllers/webhooks', '*.webhook.ts'),
    graphqlResolvers: countFiles('src/module/interfaces/controllers/graphql', '*.resolver.ts'),
    guards: countFiles('src/module/interfaces/guards', '*.guard.ts'),
    interceptors: countFiles('src/module/interfaces/interceptors', '*.interceptor.ts'),
    decorators: countFiles('src/module/interfaces/decorators', '*.decorator.ts'),
    middlewares: countFiles('src/module/interfaces/middlewares', '*.middleware.ts'),
    validators: countFiles('src/module/interfaces/validators', '*.validator.ts'),
    mappers: countFiles('src/module/interfaces/mappers', '*.mapper.ts'),
    total: countAllFiles('src/module/interfaces'),
  },
  modules: {
    featureModules: countFiles('src/module/modules', '*.module.ts'),
    total: countAllFiles('src/module/modules'),
  },
  tests: {
    unitFiles: countFiles('test/unit', '*.spec.ts'),
    e2eFiles: countFiles('test/e2e', '*.e2e-spec.ts'),
  },
  totalSourceFiles: countAllFiles('src/module'),
};

// ─── README template ────────────────────────
function buildReadme() {
  const totalLayerFiles = parseInt(stats.domain.total, 10) +
    parseInt(stats.application.total, 10) +
    parseInt(stats.infrastructure.total, 10) +
    parseInt(stats.interfaces.total, 10) +
    parseInt(stats.modules.total, 10);

  return `# ${SERVICE_NAME} — vubon.com.bd

Production-grade **Payment microservice** — DDD-based 5-layer architecture with **dual persistence mode** (Memory / Prisma) and **8 payment gateway integrations**.

[![NestJS](https://img.shields.io/badge/NestJS-12.x-red)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 📋 Overview

| Attribute | Value |
|-----------|-------|
| Package | \`${SERVICE_SLUG}\` |
| Port | \`${SERVICE_PORT}\` |
| Framework | NestJS 12 |
| Architecture | DDD + CQRS + Event Sourcing |
| DB Mode | PostgreSQL (Prisma) / InMemory (dual-mode) |
| Total Source Files | **${stats.totalSourceFiles}** |
| Test Files | **${stats.tests.unitFiles}** unit + **${stats.tests.e2eFiles}** e2e |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 22+
- **pnpm** 9+
- **PostgreSQL** 14+ (only for \`PERSISTENCE_DRIVER=prisma\`)
- **Redis** 6+

### Installation

\`\`\`bash
# Install dependencies
pnpm install

# Copy env template
cp .env.example .env

# Edit .env (default is memory mode — no DB needed)
\`\`\`

### Environment

\`\`\`bash
# .env — minimum required
NODE_ENV=development
PORT=${SERVICE_PORT}
PERSISTENCE_DRIVER=memory           # or 'prisma'
PRISMA_SKIP_ENGINE_BOOTSTRAP=true   # Termux only
JWT_SECRET=<32+ chars>
REDIS_URL=redis://localhost:6379
\`\`\`

### Running

\`\`\`bash
# Development (memory mode — no DB)
PERSISTENCE_DRIVER=memory pnpm start:dev

# Development (Prisma mode — needs DB)
PERSISTENCE_DRIVER=prisma pnpm start:dev

# Production
pnpm build && node dist/main.js
\`\`\`

### Health Check

\`\`\`bash
curl http://localhost:${SERVICE_PORT}/api/health
\`\`\`

Expected:
\`\`\`json
{ "service": "payment-service", "healthy": true, "dependencies": [...] }
\`\`\`

---

## 🏗️ Architecture

\`\`\`
src/module/
├── domain/           Business logic (framework-free)
├── application/      Use cases (CQRS handlers)
├── infrastructure/   Persistence, queues, external gateways
├── interfaces/       Controllers, guards, DTOs
└── modules/          DI wiring (NestJS modules)
\`\`\`

### 5 Layers — Detailed Stats

| Layer | Files | Key Components |
|-------|-------|----------------|
| **Domain** | ${stats.domain.total} | ${stats.domain.primitivesVO} primitives + ${stats.domain.compositeVO} composites + ${stats.domain.entities} entities + ${stats.domain.repositories} repos + ${stats.domain.services} services + ${stats.domain.specifications} specs |
| **Application** | ${stats.application.total} | ${stats.application.commandHandlers} commands + ${stats.application.queryHandlers} queries + ${stats.application.sagas} sagas + ${stats.application.servicesImpl} services |
| **Infrastructure** | ${stats.infrastructure.total} | ${stats.infrastructure.prismaRepos} Prisma + ${stats.infrastructure.memoryRepos} InMemory + ${stats.infrastructure.gateways} gateways + ${stats.infrastructure.workers} workers |
| **Interfaces** | ${stats.interfaces.total} | ${stats.interfaces.restControllers} REST + ${stats.interfaces.webhookControllers} webhooks + ${stats.interfaces.graphqlResolvers} GraphQL |
| **Modules** | ${stats.modules.total} | ${stats.modules.featureModules} feature modules |
| **Total** | **${totalLayerFiles}** | |

---

## 💳 Payment Gateways (8 Integrations)

| Gateway | Type | Status |
|---------|------|--------|
| **bKash** | Mobile Banking | ✅ |
| **Nagad** | Mobile Banking | ✅ |
| **Rocket** | Mobile Banking | ✅ |
| **Stripe** | International Card | ✅ |
| **PayPal** | International | ✅ |
| **SSLCommerz** | BD Gateway | ✅ |
| **aamarPay** | BD Gateway | ✅ |
| **COD** | Cash on Delivery | ✅ |

Each gateway supports:
- \`initiate()\` — begin payment
- \`verify()\` — confirm webhook/callback
- \`capture()\` — capture authorized payment
- \`refund()\` — issue refund
- \`cancel()\` — cancel payment
- \`verifyWebhook()\` — validate webhook signature

---

## 🎯 Features

### Payment Lifecycle

\`\`\`
pending → processing → authorized → captured → paid
                ↘ failed
                ↘ declined
                ↘ cancelled
paid → refunded | partially_refunded → chargeback
\`\`\`

### Refund Flow

\`\`\`
requested → approved → processing → completed
         ↘ rejected
         ↘ cancelled
\`\`\`

### Subscription Lifecycle

\`\`\`
trialing → active → past_due → active
              ↓
         cancelled → expired
\`\`\`

### Other Features

- ✅ **Idempotency** — all mutations idempotent via \`Idempotency-Key\`
- ✅ **Split Payments** — percentage / fixed / equal / custom
- ✅ **Recurring Payments** — daily/weekly/monthly/yearly
- ✅ **Subscriptions** — trial, upgrade, downgrade, pause, cancel
- ✅ **Invoices** — auto-number, PDF-ready, tax calculation
- ✅ **Verification** — OTP, CVV, 3DS, biometric
- ✅ **Webhooks** — 8 gateways, signature verified
- ✅ **Analytics** — revenue, by-method, by-status aggregation
- ✅ **Fee Calculation** — VAT 15%, gateway-specific rates
- ✅ **Currency Conversion** — BDT + USD/EUR/GBP with rate map

---

## 🌐 API Endpoints

| Group | Count | Base Path | Auth |
|-------|-------|-----------|------|
| Health | 2 | \`/api/health\` | Public |
| Payments | 9 | \`/api/payments\` | JWT |
| Payment Methods | 6 | \`/api/payment-methods\` | JWT |
| Payment Gateways | 2 | \`/api/payment-gateways\` | JWT |
| Transactions | 4 | \`/api/transactions\` | JWT |
| Refunds | 6 | \`/api/refunds\` | JWT |
| Split Payments | 2 | \`/api/split-payments\` | JWT |
| Recurring Payments | 4 | \`/api/recurring-payments\` | JWT |
| Subscriptions | 7 | \`/api/subscriptions\` | JWT |
| Invoices | 5 | \`/api/invoices\` | JWT |
| Verifications | 3 | \`/api/verifications\` | JWT |
| Analytics | 2 | \`/api/analytics\` | JWT |
| **Webhooks** | **8** | \`/api/webhooks/:provider\` | **Signature** |

**Total: 60 endpoints (52 REST + 8 webhooks)**

### Webhook Endpoints

| Provider | Path |
|----------|------|
| bKash | \`POST /api/webhooks/bkash\` |
| Nagad | \`POST /api/webhooks/nagad\` |
| Rocket | \`POST /api/webhooks/rocket\` |
| Stripe | \`POST /api/webhooks/stripe\` |
| PayPal | \`POST /api/webhooks/paypal\` |
| SSLCommerz | \`POST /api/webhooks/sslcommerz\` |
| aamarPay | \`POST /api/webhooks/aamarpay\` |
| Crypto | \`POST /api/webhooks/crypto\` |

Full reference: [API.md](./API.md) · Swagger: \`http://localhost:${SERVICE_PORT}/api/docs\`

---

## 💾 Database Modes

| Mode | Use Case | DB Required |
|------|----------|-------------|
| \`memory\` | Termux dev, CI, local testing | ❌ No |
| \`prisma\` | Staging, production | ✅ PostgreSQL |

**Switch is transparent to application code** — same DI tokens, swap implementation.

\`\`\`bash
# Memory mode (default, no DB)
PERSISTENCE_DRIVER=memory pnpm start:dev

# Prisma mode (production)
PERSISTENCE_DRIVER=prisma pnpm start:dev
\`\`\`

---

## 🧪 Testing

\`\`\`bash
# Unit tests
pnpm test:unit

# Unit with coverage
pnpm test:unit:cov

# E2E tests
pnpm test:e2e:custom

# Full CI
pnpm test:ci
\`\`\`

**Coverage:** 85%+ statements (target 85%)

Test files:
- Unit: **${stats.tests.unitFiles}** files
- E2E: **${stats.tests.e2eFiles}** files

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| \`pnpm build\` | Compile TypeScript |
| \`pnpm start:dev\` | Dev with watch |
| \`pnpm start:prod\` | Production |
| \`pnpm test:unit\` | Unit tests |
| \`pnpm test:unit:cov\` | Unit + coverage |
| \`pnpm test:e2e:custom\` | E2E tests |
| \`pnpm type-check\` | TypeScript check |
| \`pnpm lint\` | ESLint |
| \`pnpm generate:postman\` | Generate Postman collection |
| \`pnpm generate:inmemory\` | Generate InMemory repos |
| \`pnpm prisma:generate\` | Generate Prisma client |
| \`pnpm prisma:migrate\` | Apply DB migrations |

---

## 📁 Project Structure

\`\`\`
apps/payment-service/
├── src/
│   ├── main.ts                    Bootstrap
│   └── module/
│       ├── domain/                Business logic
│       ├── application/           CQRS use cases
│       ├── infrastructure/        Persistence, gateways
│       ├── interfaces/            Controllers, guards
│       └── modules/               NestJS wiring
├── test/
│   ├── unit/                      ${stats.tests.unitFiles} unit test files
│   └── e2e/                       ${stats.tests.e2eFiles} e2e test files
├── scripts/
│   ├── generate-postman-collection.mjs
│   ├── generate-inmemory-repos.mjs
│   └── generate-readme.mjs
├── postman/                       Collection + environments
├── prisma/                        Prisma schema
└── docs/                          Additional docs
\`\`\`

---

## 🔐 Security

- **JWT Bearer Auth** — shared with identity-service
- **Rate Limiting** — via \`@nestjs/throttler\`
- **Idempotency Keys** — required for all financial mutations
- **Domain Invariants** — enforced at entity level
- **Input Validation** — class-validator + Zod
- **HTTPS-only** — in production
- **Webhook Signature** — verified per gateway

---

## 📚 Documentation

| Doc | Description |
|-----|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 5-layer DDD deep-dive |
| [API.md](./API.md) | Full endpoint reference |
| [TESTING.md](./TESTING.md) | Test suite + coverage |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Dev guide + troubleshooting |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Docker/Railway/Fly/VPS |
| [CHANGELOG.md](./CHANGELOG.md) | Version history |
| [postman/README.md](./postman/README.md) | Postman collection guide |

---

## 📊 Project Stats

\`\`\`
┌─────────────────────────────────────────────────────────┐
│  Payment Service — Production-Grade                     │
├─────────────────────────────────────────────────────────┤
│  Source Files        ${String(stats.totalSourceFiles).padStart(6)}                         │
│  Domain Layer        ${String(stats.domain.total).padStart(6)} files                    │
│  Application Layer   ${String(stats.application.total).padStart(6)} files                    │
│  Infrastructure      ${String(stats.infrastructure.total).padStart(6)} files                    │
│  Interfaces          ${String(stats.interfaces.total).padStart(6)} files                    │
│  Modules             ${String(stats.modules.total).padStart(6)} files                    │
│  Test Files          ${String(stats.tests.unitFiles).padStart(6)} (unit)                  │
│  Test Files          ${String(stats.tests.e2eFiles).padStart(6)} (e2e)                   │
│  Payment Gateways          8                        │
│  API Endpoints            60                        │
│  Webhooks                  8                        │
└─────────────────────────────────────────────────────────┘
\`\`\`

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/xyz\`)
3. Write tests + code
4. Verify: \`pnpm type-check && pnpm test:unit\`
5. Commit (\`git commit -m 'feat: xyz'\`)
6. Push + open PR

---

## 📄 License

**MIT** — see [LICENSE](./LICENSE)

---

## 🚀 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for:

- **Docker** — containerized deploy
- **Railway** — one-click deploy
- **Fly.io** — global edge
- **VPS** — PM2 process manager
- **GitHub Actions** — CI/CD

**Production URLs:**
- Staging: \`${STAGING_URL}\`
- Production: \`${PROD_URL}\`

---

**Made with ❤️ by Vubon.com.bd**
`;
}

// ─── Main ───────────────────────────────────
const readme = buildReadme();
const readmePath = join(ROOT, 'README.md');
writeFileSync(readmePath, readme, 'utf8');

console.log('✅ README.md generated');
console.log(`   ${readme.split('\n').length} lines`);
console.log(`   ${readme.split(/\s+/).length} words`);
console.log('');
console.log('📊 Stats used:');
console.log(`   Domain:         ${stats.domain.total} files`);
console.log(`   Application:    ${stats.application.total} files`);
console.log(`   Infrastructure: ${stats.infrastructure.total} files`);
console.log(`   Interfaces:     ${stats.interfaces.total} files`);
console.log(`   Modules:        ${stats.modules.total} files`);
console.log(`   Total:          ${stats.totalSourceFiles} files`);
console.log(`   Tests:          ${stats.tests.unitFiles} unit + ${stats.tests.e2eFiles} e2e`);
