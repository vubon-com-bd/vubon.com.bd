/**
 * ORDER SERVICE — TESTING GUIDE
 * @module order-service/docs
 *
 * ══════════════════════════════════════════════════════════════════
 *  🧪 TEST STRATEGY
 * ══════════════════════════════════════════════════════════════════
 *
 *  Pyramid:
 *      ┌─────────────────────────┐
 *      │   E2E (5 suites)        │  40 tests — real HTTP
 *      ├─────────────────────────┤
 *      │   Unit (115 files)      │  1,149 tests — isolated
 *      └─────────────────────────┘
 *
 *  Coverage by layer:
 *    • Domain         — VO, Entity, Service, Spec, Error, Event (~95%)
 *    • Application    — Service, Handler, Mapper, Validator, Saga (~93%)
 *    • Infrastructure — Repo (Prisma mocks), Config, Services, Workers (~75%)
 *    • Interfaces     — Controller, Guard, Interceptor, Validator (~90%)
 *    • Modules        — Smoke tests
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
 *  Coverage:
 *    pnpm test:cov
 *
 *  E2E tests:
 *    pnpm test:e2e
 *
 *  Single file:
 *    pnpm test -- test/unit/domain/services/order-total.service.spec.ts
 *
 *  By name pattern:
 *    pnpm test -- -t "calculate"
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  ⚙️  ESM REQUIREMENT
 * ══════════════════════════════════════════════════════════════════
 *
 *  Every spec file MUST include:
 *
 *    import { jest } from '@jest/globals';
 *
 *  Otherwise: ReferenceError: jest is not defined.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📋 TEST PATTERNS
 * ══════════════════════════════════════════════════════════════════
 *
 *  State machine VO:
 *    it('pending → confirmed allowed', () => {
 *      expect(OrderStatusVO.pending().canTransitionTo('confirmed')).toBe(true);
 *    });
 *
 *  Entity — happy path + invariants:
 *    it('creates order and emits OrderCreatedEvent', () => {
 *      const order = makeOrder();
 *      expect(order.status.isPending()).toBe(true);
 *      expect(order.domainEvents.some(e => e.type === 'order.created')).toBe(true);
 *    });
 *
 *  Domain service — pure:
 *    it('15% tax on 100 = 15', () => {
 *      expect(OrderTotalService.calculateTax(100, 0.15)).toBe(15);
 *    });
 *
 *  Application service — mock repo:
 *    const repo = {
 *      findById: jest.fn().mockResolvedValue(null),
 *      save: jest.fn().mockImplementation(async (o) => o),
 *    };
 *    const service = new OrderService(repo as never);
 *    await service.create(dto as never);
 *    expect(repo.save).toHaveBeenCalledTimes(1);
 *
 *  Prisma repo — mock delegate:
 *    const prisma = { order: { findUnique: jest.fn() } };
 *    (prisma.order.findUnique as jest.Mock).mockResolvedValue(orderRow());
 *    const repo = new OrderPrismaRepository(prisma as never);
 *    expect((await repo.findById(UUID)).id).toBe(UUID);
 *
 *  Guard — ExecutionContext stub:
 *    const ctx = {
 *      switchToHttp: () => ({ getRequest: () => ({ params: { orderId }, user }) }),
 *    } as unknown as ExecutionContext;
 *    expect(await guard.canActivate(ctx)).toBe(true);
 *
 *  Saga — event → command:
 *    const subject = new Subject<unknown>();
 *    const obs = saga.onOrderCreated(subject.asObservable());
 *    const next = firstValueFrom(obs);
 *    subject.next(new OrderCreatedEvent({...}));
 *    const cmd = await next;
 *    expect(cmd.constructor.name).toBe('NotifyCustomerCommand');
 *
 *  E2E — supertest:
 *    const { app, prisma } = await createTestApp();
 *    const res = await request(app.getHttpServer())
 *      .post('/api/v1/orders')
 *      .set({ Authorization: 'Bearer customer' })
 *      .send(body)
 *      .expect(201);
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📊 COVERAGE TARGETS
 * ══════════════════════════════════════════════════════════════════
 *
 *  | Layer           | Target  | Current |
 *  |-----------------|---------|---------|
 *  | Domain          | 95%+    | ~95%    |
 *  | Application     | 90%+    | ~93%    |
 *  | Infrastructure  | 75%+    | ~75%    |
 *  | Interfaces      | 90%+    | ~90%    |
 *  | Global          | 85%+    | ~78.9%  |
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  🔧 TERMUX WORKAROUND
 * ══════════════════════════════════════════════════════════════════
 *
 *  Prisma engine crashes on Termux ARM64 (EM_X86_64).
 *  Repositories are unit-tested with mocked PrismaService:
 *
 *    jest.mock('@vubon/shared-kernel/prisma', () => ({
 *      PrismaService: class PrismaService {},
 *    }));
 *
 *  Or via Test.createTestingModule(...).overrideProvider(PrismaService).
 *
 *  E2E tests still work — PrismaService gracefully degrades
 *  (Redis-only), and repositories are overridden with in-memory mocks.
 */

/**
 * ══════════════════════════════════════════════════════════════════
 *  📁 TEST STRUCTURE
 * ══════════════════════════════════════════════════════════════════
 *
 *    test/
 *    ├── unit/                        (115 files, 1,149 tests)
 *    │   ├── domain/                  (VO, entity, service, spec, error, event)
 *    │   ├── application/             (service, handler, mapper, validator, saga)
 *    │   ├── infrastructure/          (prisma repo, config, service, queue, worker)
 *    │   └── interfaces/              (controller, guard, interceptor, validator)
 *    ├── e2e/                         (5 files, 40 tests)
 *    │   ├── _setup.ts                (app + Prisma/Redis mock + auth stub)
 *    │   ├── order.e2e-spec.ts
 *    │   ├── checkout.e2e-spec.ts
 *    │   ├── delivery.e2e-spec.ts
 *    │   ├── cancel-return.e2e-spec.ts
 *    │   └── fulfillment-tracking.e2e-spec.ts
 *    └── jest-e2e.json
 */
