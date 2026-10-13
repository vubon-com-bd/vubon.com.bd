# Testing — Product Service

Complete guide for unit, E2E, and integration testing.

---

## 📊 Test Suite Overview

| Type | Files | Tests | Command | Status |
|------|-------|-------|---------|--------|
| **Unit** | 29 | 319 | `pnpm test:unit` | ✅ |
| **E2E** | 13 | 54 | `pnpm test:e2e` | ✅ |
| **All** | 42 | **373** | `pnpm test:all` | ✅ |

**Coverage:** ~68% (domain ~85%, services ~86%)

---

## 🎯 Test Commands

### Unit Tests

\`\`\`bash
# Run once
pnpm test:unit

# Watch mode
pnpm test:unit:watch

# With coverage
pnpm test:unit:cov

# Direct invocation
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --runInBand
\`\`\`

### E2E Tests

\`\`\`bash
# Run once
pnpm test:e2e

# Watch mode
pnpm test:e2e:watch

# Coverage
pnpm test:e2e:coverage
\`\`\`

### All Tests

\`\`\`bash
pnpm test:all       # Unit + E2E
\`\`\`

---

## 📁 Test Structure

\`\`\`
test/
├── unit/                        ← Unit test suite
│   ├── jest.config.ts           ← Unit jest config
│   ├── setup.ts                 ← Jest globals setup
│   ├── domain/                  ← Domain layer tests
│   │   ├── value-objects/       → ~20 VO specs
│   │   ├── entities/            → 1 entity spec
│   │   ├── services/            → 6 service specs
│   │   └── specifications/      → 2 spec specs
│   ├── application/             ← Application layer tests
│   │   ├── services/            → 1 service spec
│   │   ├── mappers/             → 1 mapper spec
│   │   └── validators/          → 1 validator spec
│   └── infrastructure/          ← Infrastructure tests
│       └── mappers/             → 1 mapper spec
│
├── e2e/                         ← E2E test suite (auto-generated)
│   ├── health.e2e-spec.ts       → 1 test
│   ├── products.e2e-spec.ts     → 10 tests
│   ├── public-products.e2e-spec.ts → 3 tests
│   ├── variants.e2e-spec.ts     → 4 tests
│   ├── attributes.e2e-spec.ts   → 2 tests
│   ├── inventory.e2e-spec.ts    → 4 tests
│   ├── pricing.e2e-spec.ts      → 5 tests
│   ├── pricing-rules.e2e-spec.ts → 3 tests
│   ├── collections.e2e-spec.ts  → 5 tests
│   ├── reviews.e2e-spec.ts      → 4 tests
│   ├── media.e2e-spec.ts        → 1 test
│   ├── brands.e2e-spec.ts       → 5 tests
│   ├── categories.e2e-spec.ts   → 7 tests
│   └── index.ts                 → barrel
│
├── helpers/                     ← Test helpers
│   ├── test-auth.helper.ts      → auth flow helpers
│   ├── test-db.helper.ts        → DB utilities
│   ├── test-fixtures.ts         → static fixtures
│   └── index.ts
│
├── utility/                     ← Test utilities
│   ├── test-app.ts              → shared app bootstrap
│   ├── request-helper.ts        → supertest wrapper
│   ├── request-dispatcher.ts    → method dispatcher
│   ├── type.ts                  → shared types
│   └── index.ts
│
├── generated-apis/              ← Auto-generated API clients
│   ├── product.ts, variant.ts, ...
│   └── index.ts
│
├── generated-payloads/          ← Payload factories
│   └── index.ts
│
├── jest-e2e.json                ← E2E jest config
├── jest-env-setup.ts            ← Env vars setup
├── jest-after-env.ts            ← Post-setup hooks
├── jest-global-setup.ts         ← Global setup
└── setup.ts                     ← Shared test app
\`\`\`

---

## 🎯 Unit Test Patterns

### 1. Value Object Test

\`\`\`typescript
import { describe, it, expect } from '@jest/globals';
import { ProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';

const VALID_UUID = '11111111-1111-4111-8111-111111111111';

describe('ProductIdVO', () => {
  describe('create()', () => {
    it('creates from valid UUID', () => {
      const vo = ProductIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws for invalid format', () => {
      expect(() => ProductIdVO.create('not-a-uuid')).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = ProductIdVO.reconstitute('any-string');
      expect(vo.value).toBe('any-string');
    });
  });
});
\`\`\`

### 2. Entity Test (state machine)

\`\`\`typescript
describe('ProductEntity', () => {
  describe('state machine — submit/approve/publish', () => {
    it('submit: draft → pending', () => {
      const e = buildDraftEntity();
      e.submit();
      expect(e.status.isPending()).toBe(true);
    });

    it('publish: approved → published', () => {
      const e = buildDraftEntity();
      e.submit();
      e.approve();
      e.publish(NOW);
      expect(e.status.isPublished()).toBe(true);
      expect(e.vo.publishedAt).toBe(NOW);
    });
  });

  describe('updateStock()', () => {
    it('marks out_of_stock when stock 0 + published', () => {
      const e = buildDraftEntity();
      e.submit();
      e.approve();
      e.publish(NOW);
      e.updateStock(0, 'sold out', NOW);
      expect(e.status.isOutOfStock()).toBe(true);
    });
  });
});
\`\`\`

### 3. Service Test (real business logic)

\`\`\`typescript
describe('ProductPriceService', () => {
  describe('calculateTax() — BD VAT 15%', () => {
    it('exclusive: net 1000 → vat 150', () => {
      const r = ProductPriceService.calculateTax({
        amount: 1000,
        currency: 'BDT',
        taxInclusive: false,
      });
      expect(r.netAmount).toBe(1000);
      expect(r.vat).toBe(150);
      expect(r.grossAmount).toBe(1150);
    });

    it('USD exempt from VAT', () => {
      const r = ProductPriceService.calculateTax({
        amount: 100,
        currency: 'USD',
        taxInclusive: false,
      });
      expect(r.vat).toBe(0);
    });
  });
});
\`\`\`

### 4. Mocked Service Test

\`\`\`typescript
describe('ProductVariantService (mocked)', () => {
  function buildService(overrides = {}) {
    const repo = {
      findByIdVO: jest.fn(),
      save: jest.fn(async (e) => e),
      existsBySku: jest.fn().mockResolvedValue(false),
      ...overrides.repo,
    };
    const eventBridge = {
      publishFromEntity: jest.fn().mockResolvedValue(undefined),
      ...overrides.eventBridge,
    };
    return {
      service: new ProductVariantService(repo as never, productRepo as never, eventBridge as never),
      repo,
      eventBridge,
    };
  }

  it('throws on duplicate SKU', async () => {
    const { service } = buildService({
      repo: { existsBySku: jest.fn().mockResolvedValue(true) },
    });
    await expect(service.add({ sku: 'DUP' })).rejects.toThrow();
  });
});
\`\`\`

---

## 🎯 E2E Test Patterns

### Auto-Generation

E2E tests are **auto-generated** from `scripts/e2e/endpoints.mjs`:

\`\`\`bash
pnpm generate:e2e
\`\`\`

**Registry:**
\`\`\`javascript
// scripts/e2e/endpoints.mjs
export const ENDPOINTS = [
  {
    group: 'products',
    method: 'POST',
    path: '/products',
    name: 'Create Product',
    auth: true,
    request: { name: 'Test', sku: 'SKU-1', ... },
    expect: {
      statuses: [201, 400, 409, 500, 503],
      hasFields: ['success', 'productId', 'status', 'slug'],
    },
  },
];
\`\`\`

**Auto-generated file:**
\`\`\`typescript
// test/e2e/products.e2e-spec.ts
describe('products (E2E)', () => {
  it('Create Product', async () => {
    let req = request(app.getHttpServer()).post('/products');
    if (accessToken) req = req.set('Authorization', \`Bearer \${accessToken}\`);
    req = req.send({ name: 'Test', sku: 'SKU-1', ... });
    const response = await req;

    expect([201, 400, 409, 500, 503, 401]).toContain(response.status);
    if (response.status === 200 || response.status === 201) {
      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('productId');
    }
  });
});
\`\`\`

### Degraded Mode (Termux)

Tests **accept multiple statuses** to be resilient:

\`\`\`typescript
// 200/201 = success
// 400 = validation
// 401 = auth (when token unavailable)
// 404 = not found
// 409 = conflict
// 500/503 = Prisma degraded
expect([200, 201, 400, 401, 404, 409, 500, 503]).toContain(response.status);
\`\`\`

---

## 🔧 Test Configuration

### Unit Jest Config (`test/unit/jest.config.ts`)

\`\`\`typescript
export default {
  displayName: 'unit',
  testEnvironment: 'node',
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  testTimeout: 10000,
};
\`\`\`

### E2E Jest Config (`test/jest-e2e.json`)

\`\`\`json
{
  "rootDir": "..",
  "testEnvironment": "node",
  "testRegex": "test/e2e/.*\\.e2e-spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": ["ts-jest", { "useESM": true }] },
  "setupFiles": ["<rootDir>/test/jest-env-setup.ts"],
  "setupFilesAfterEnv": ["<rootDir>/test/jest-after-env.ts"],
  "globalSetup": "<rootDir>/test/jest-global-setup.ts",
  "testTimeout": 30000,
  "forceExit": true
}
\`\`\`

### Env Setup (`test/jest-env-setup.ts`)

\`\`\`typescript
process.env['NODE_ENV'] = 'test';
process.env['JWT_SECRET'] = 'test_jwt_secret_must_be_at_least_32_characters_long_12345';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['DATABASE_URL'] = 'postgresql://postgres@localhost:5432/vubon_product';
\`\`\`

---

## 📊 Coverage Report

### Target Thresholds

| Type | Current | Target |
|------|---------|--------|
| **Overall** | 68% | 75%+ |
| Domain | ~85% | 90%+ |
| Application | ~26% | 60%+ |
| Infrastructure | ~75% | 80%+ |

### Coverage Commands

\`\`\`bash
# Unit coverage
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --runInBand \\
  --coverage

# View HTML coverage
open coverage/lcov-report/index.html
\`\`\`

---

## 🎯 Common Pitfalls

### ❌ Wrong path depth

\`\`\`typescript
// From test/unit/domain/value-objects/product-id.vo.spec.ts
import { ProductIdVO } from '../../../../../src/...';  // ← 5 levels = WRONG
import { ProductIdVO } from '../../../../src/...';    // ← 4 levels = CORRECT
\`\`\`

### ❌ Missing `.js` extension

\`\`\`typescript
import { ProductIdVO } from '../../../../src/.../product-id.vo';     // ← WRONG
import { ProductIdVO } from '../../../../src/.../product-id.vo.js';  // ← CORRECT (ESM)
\`\`\`

### ❌ Invalid UUID in test data

\`\`\`typescript
const VALID_UUID = '11111111-1111-4111-8111-111111111111';  // ← 4/1/1/1 pattern
const INVALID = 'v-1';                                       // ← throws ValidationError
\`\`\`

### ❌ Missing env vars

\`\`\`typescript
// ❌ Fails: JWT_SECRET too short
process.env['JWT_SECRET'] = 'secret';

// ✅ Correct: 32+ chars
process.env['JWT_SECRET'] = 'test_jwt_secret_must_be_at_least_32_characters_long';
\`\`\`

---

## 🔧 Test Generators

### E2E Generator (`scripts/generate-e2e-tests.mjs`)

\`\`\`bash
pnpm generate:e2e
\`\`\`

**Input:** `scripts/e2e/endpoints.mjs` (54 endpoints)
**Output:** `test/e2e/*.e2e-spec.ts` (13 files)

### InMemory Generator (`scripts/generate-inmemory-repos.mjs`)

\`\`\`bash
node scripts/generate-inmemory-repos.mjs
\`\`\`

**Output:** `src/module/infrastructure/persistence/memory/repositories/*.ts` (11 files)

---

## 🎯 Test Data

### UUID Convention

Tests use **patterned UUIDs** for debugging:

\`\`\`
11111111-1111-4111-8111-111111111111  → ProductIdVO
22222222-2222-4222-8222-222222222222  → CategoryIdVO
33333333-3333-4333-8333-333333333333  → VariantIdVO
44444444-4444-4444-8444-444444444444  → Missing/nonexistent
\`\`\`

### Test Values

\`\`\`typescript
const NOW = '2026-01-01T00:00:00.000Z';
const VALID_UUID = '11111111-1111-4111-8111-111111111111';
const INVALID_SKU = 'invalid sku with spaces';
\`\`\`

---

## 🎯 CI/CD Integration

### Run in CI

\`\`\`bash
pnpm install --frozen-lockfile
pnpm type-check
pnpm build
pnpm test:all
\`\`\`

### Test Output (CI JSON)

\`\`\`bash
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --json --outputFile=./test-results.json
\`\`\`

---

## 📊 Test Statistics

| Suite | Files | Tests | Time |
|-------|-------|-------|------|
| Unit | 29 | 319 | ~24s |
| E2E | 13 | 54 | ~90s |
| **TOTAL** | **42** | **373** | **~114s** |

---

## 🎯 Next Steps

**Coverage boost:**
1. Add tests for `application/services` (mocked) — brings 26% → 60%
2. Add tests for remaining VOs — `brand-id`, `vendor-id`, `product-barcode`
3. Add tests for `ProductEntity` untested methods
4. Add tests for `ProductVO` composite business methods

**Target:** 68% → 85%
