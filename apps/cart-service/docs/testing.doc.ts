/**
 * CART SERVICE — TESTING GUIDE
 * @module cart-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🧪 TEST STRATEGY
 * ══════════════════════════════════════════════════════════════════
 *
 *  Pyramid:
 *      ┌─────────────────────────┐
 *      │   E2E (5 suites)        │  15+ tests — real HTTP
 *      ├─────────────────────────┤
 *      │   Unit (165 files)      │  ~1217 tests — isolated
 *      └─────────────────────────┘
 *
 *  Coverage by layer:
 *    • Domain        — VO, Entity, Service, Spec (100%)
 *    • Application   — Service, Handler, DTO, Mapper
 *    • Infrastructure— Repo (Redis + Prisma mocks)
 *    • Interfaces    — Controller, Guard, Interceptor
 *    • Modules       — Smoke tests
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🚀 RUNNING TESTS
 * ══════════════════════════════════════════════════════════════════
 *
 *  All unit tests:
 *    pnpm test
 *
 *  Watch mode:
 *    pnpm test:watch
 *
 *  Coverage report:
 *    pnpm test:cov
 *    # Opens coverage-report/index.html
 *
 *  E2E tests:
 *    pnpm test:e2e
 *
 *  Single file:
 *    pnpm test test/unit/domain/entities/cart.entity.spec.ts
 *
 *  By pattern:
 *    pnpm test -- --testPathPattern="cart.entity"
 *
 *  By test name:
 *    pnpm test -- -t "addItem"
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 TEST FOLDER STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *  test/
 *  ├── unit/
 *  │   ├── domain/
 *  │   │   ├── value-objects/
 *  │   │   │   ├── primitives/      (33 spec files)
 *  │   │   │   └── composites/      (12 spec files)
 *  │   │   ├── entities/            (10 spec files)
 *  │   │   ├── services/            (10 spec files)
 *  │   │   └── specifications/      (6 spec files)
 *  │   ├── application/
 *  │   │   ├── services/            (10 spec files)
 *  │   │   ├── commands/            (24 spec files)
 *  │   │   ├── queries/             (12 spec files)
 *  │   │   ├── mappers/             (5 spec files)
 *  │   │   └── validators/          (4 spec files)
 *  │   ├── infrastructure/
 *  │   │   ├── repositories/
 *  │   │   │   ├── redis/           (7 spec files)
 *  │   │   │   └── prisma/          (3 spec files)
 *  │   │   └── services/
 *  │   │       ├── internal/        (6 spec files)
 *  │   │       └── external/        (5 spec files)
 *  │   ├── interfaces/
 *  │   │   ├── controllers/rest/    (9 spec files)
 *  │   │   ├── guards/              (3 spec files)
 *  │   │   ├── interceptors/        (2 spec files)
 *  │   │   └── validators/          (3 spec files)
 *  │   └── modules/                 (2 spec files)
 *  ├── e2e/
 *  │   ├── setup-e2e.ts             — app bootstrap helper
 *  │   ├── health.e2e-spec.ts
 *  │   ├── cart.e2e-spec.ts
 *  │   ├── cart-item.e2e-spec.ts
 *  │   ├── guest-cart.e2e-spec.ts
 *  │   └── totals.e2e-spec.ts
 *  ├── jest-e2e.json                — E2E Jest config
 *  └── fixtures/                    — shared test data
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🎯 TEST PATTERNS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Value Object test:
 *    describe('CartIdVO', () => {
 *      it('creates VO from valid UUID', () => {
 *        expect(CartIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
 *      });
 *      it('throws on empty string', () => {
 *        expect(() => CartIdVO.create('')).toThrow();
 *      });
 *      it('equals true for same values', () => {
 *        expect(CartIdVO.create(VALID_UUID).equals(CartIdVO.create(VALID_UUID))).toBe(true);
 *      });
 *    });
 *
 *  Entity test (with events):
 *    it('emits CartCreatedEvent on create', () => {
 *      const cart = CartEntity.create({ id: UUID, props: makeProps(), now: NOW });
 *      expect(cart.domainEvents.some((e) => e.type === 'cart.created')).toBe(true);
 *    });
 *
 *  Service test (with mock repository):
 *    let repo: jest.Mocked<CartRepository>;
 *    beforeEach(() => {
 *      repo = { findById: jest.fn(), save: jest.fn(async (c) => c), ... };
 *      svc = new CartService(repo);
 *    });
 *    it('returns cart when found', async () => {
 *      repo.findById.mockResolvedValue(makeCart());
 *      const r = await svc.getById(UUID);
 *      expect(r.id).toBe(UUID);
 *    });
 *
 *  Handler test (thin wrapper):
 *    it('delegates to service.create', async () => {
 *      service.create.mockResolvedValue({ id: UUID } as CartResponseDTO);
 *      await handler.execute(new CreateCartCommand(dto, USER));
 *      expect(service.create).toHaveBeenCalledWith(dto, USER);
 *    });
 *
 *  E2E test:
 *    beforeAll(async () => { app = await createTestApp(); });
 *    it('POST /api/v1/cart returns 201', async () => {
 *      const res = await request(app.getHttpServer())
 *        .post('/api/v1/cart')
 *        .send({ type: 'user', currency: 'BDT' })
 *        .expect(201);
 *      expect(res.body.id).toBeDefined();
 *    });
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🧰 KEY HELPERS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Every spec file MUST start with:
 *    import { jest } from '@jest/globals';
 *
 *  Why: ESM mode requires explicit jest import.
 *       Without it: "ReferenceError: jest is not defined"
 *
 *  Test UUIDs (use consistent constants):
 *    const UUID      = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
 *    const USER      = '00000000-0000-0000-0000-000000000001';
 *    const OTHER     = '00000000-0000-0000-0000-000000000002';
 *    const NOW       = '2026-01-01T00:00:00Z';
 *    const FUTURE    = '2099-12-31T23:59:59Z';
 *    const PAST      = '2020-01-01T00:00:00Z';
 *
 *  Time-sensitive tests:
 *    ❌ BAD:  abandonedAt: '2026-01-01T00:00:00Z'   (breaks in future)
 *    ✅ GOOD: abandonedAt: hoursAgo(24)              (always relative)
 *
 *    function hoursAgo(h: number): string {
 *      return new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
 *    }
 *
 *  Mock factories (avoid repetition):
 *    function makeRepo(): jest.Mocked<CartRepository> { ... }
 *    function makeCart(items = []): CartEntity { ... }
 *    function makeItem(id = 'i1'): CartItemEntity { ... }
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🐞 COMMON PITFALLS
 * ══════════════════════════════════════════════════════════════════
 *
 *  1. Missing `import { jest }`
 *     Fix: add at top of every spec file
 *
 *  2. Prisma engine crash on Termux ARM64
 *     Symptom: "is for EM_X86_64 instead of EM_AARCH64"
 *     Fix: jest.mock('@vubon/shared-kernel/prisma', () => ({...}))
 *     OR: instantiate repos with plain mock objects
 *
 *  3. Cart totals default to 0
 *     Fix: call cart.recalculateTotals({ now: NOW }) after adding items
 *
 *  4. Time-based test drift
 *     Fix: use hoursAgo() instead of hardcoded ISO dates
 *
 *  5. Jest worker didn't exit gracefully
 *     Status: expected — forceExit: true in config
 *     Cause: Prisma engine handle on Termux
 *
 *  6. whitelist: true in ValidationPipe strips un-decorated DTO fields
 *     Fix: use whitelist: false when DTO has only @ApiProperty
 *
 *  7. E2E app boot fails on missing env
 *     Fix: ensure test env vars set in test/setup
 *
 *  8. supertest import error
 *     Fix: use `import request from 'supertest'` (ESM)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 COVERAGE TARGETS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Global:
 *    Statements  : 85%+
 *    Branches    : 80%+
 *    Functions   : 85%+
 *    Lines       : 85%+
 *
 *  By layer:
 *    Domain        : 95%+  (pure logic, easy to test)
 *    Application   : 90%+  (thin orchestration)
 *    Infrastructure: 70%+  (mocks cover critical paths)
 *    Interfaces    : 85%+  (contract tests)
 *
 *  Excluded from coverage:
 *    • *.module.ts       (NestJS wiring)
 *    • *.interface.ts    (TS types only)
 *    • *.dto.ts          (data shapes, no logic)
 *    • index.ts          (barrel exports)
 *    • *.swagger.ts      (constants)
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔄 CI INTEGRATION (GitHub Actions)
 * ══════════════════════════════════════════════════════════════════
 *
 *  .github/workflows/cart-service-ci.yml:
 *
 *  name: cart-service CI
 *  on:
 *    push:
 *      paths: ['apps/cart-service/**', 'packages/**']
 *    pull_request:
 *      paths: ['apps/cart-service/**']
 *
 *  jobs:
 *    test:
 *      runs-on: ubuntu-latest
 *      steps:
 *        - uses: actions/checkout@v4
 *        - uses: pnpm/action-setup@v3
 *          with:
 *            version: 9
 *        - uses: actions/setup-node@v4
 *          with:
 *            node-version: 22
 *            cache: 'pnpm'
 *        - run: pnpm install --frozen-lockfile
 *        - run: pnpm --filter @vubon/shared-kernel build
 *        - run: pnpm --filter @vubon/shared-constants build
 *        - run: pnpm --filter @vubon/shared-types build
 *        - run: pnpm --filter @vubon/cart-service type-check
 *        - run: pnpm --filter @vubon/cart-service build
 *        - run: pnpm --filter @vubon/cart-service test -- --coverage
 *        - uses: codecov/codecov-action@v4
 *          with:
 *            files: apps/cart-service/coverage-report/coverage-final.json
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📈 CURRENT TEST STATS
 * ══════════════════════════════════════════════════════════════════
 *
 *  Unit test files:        165
 *  Unit test cases:        1,217
 *  Unit pass rate:         100%
 *
 *  E2E test suites:        5
 *  E2E test cases:         16
 *  E2E pass rate:          100%
 *
 *  Statement coverage:     87%+
 *  Branch coverage:        82%+
 *
 *  Execution time (Termux ARM64):  ~65s unit + ~40s E2E
 */
