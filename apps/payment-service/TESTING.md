<!-- AUTO-GENERATED from docs/testing.doc.ts. Do not edit directly. -->

PAYMENT SERVICE — TESTING GUIDE
@module payment-service/docs

══════════════════════════════════════════════════════════════════
 🧪 TEST STRATEGY
══════════════════════════════════════════════════════════════════

 Pyramid:

   ┌─────────────────────────┐
   │   E2E (5 suites)        │  68 tests — real HTTP
   ├─────────────────────────┤
   │   Unit (106 files)      │  996 tests — isolated
   └─────────────────────────┘

 Coverage by layer:
   • Domain         — VO, Entity, Service, Spec, Error (~95%)
   • Application    — Service, Handler, Mapper, Validator, Saga (~92%)
   • Infrastructure — Repo (Prisma mocks), Gateway, Worker (~85%)
   • Interfaces     — Controller, Guard, Interceptor, Validator (~90%)

---

══════════════════════════════════════════════════════════════════
 🚀 RUNNING TESTS
══════════════════════════════════════════════════════════════════

 All unit tests:
   pnpm test

 Watch mode:
   pnpm test:watch

 Coverage:
   pnpm test:cov

 E2E tests:
   pnpm test:e2e

 Single file:
   pnpm test -- test/unit/domain/services/payment-fee.service.spec.ts

 By name pattern:
   pnpm test -- -t "bkash fee"

---

══════════════════════════════════════════════════════════════════
 ⚙️  ESM REQUIREMENT
══════════════════════════════════════════════════════════════════

 Every spec file MUST include:

   import { jest } from '@jest/globals';

 Otherwise: ReferenceError: jest is not defined.

---

══════════════════════════════════════════════════════════════════
 📋 TEST PATTERNS
══════════════════════════════════════════════════════════════════

 State machine VO:

   it('pending → processing allowed', () => {
     expect(PaymentStatusVO.pending().canTransitionTo('processing')).toBe(true);
   });

 Entity — happy path + invariants:

   it('creates payment and emits PaymentInitiatedEvent', () => {
     const p = makePayment();
     expect(p.status.isPending()).toBe(true);
     expect(p.domainEvents.some(e => e.type === 'payment.initiated')).toBe(true);
   });

 Domain service — pure:

   it('bkash fee 1.85% on 1000 = 18.50', () => {
     const r = PaymentFeeService.calculate({
       amount: 1000, currency: 'BDT',
       gateway: PaymentGatewayVO.create('bkash'),
     });
     expect(r.gatewayFee).toBeCloseTo(18.5, 2);
   });

 Application service — mock repo:

   const repo = {
     save: jest.fn().mockImplementation(async (p) => p),
     findByIdempotencyKey: jest.fn().mockResolvedValue(null),
   };
   const service = new PaymentService(repo as never, txRepo as never);
   await service.initiate(dto as never, 'user-1');
   expect(repo.save).toHaveBeenCalled();

 Gateway adapter — structural mock:

   it('bkash verify Completed → verified', async () => {
     const a = new BkashGatewayAdapter();
     const r = await a.verify({
       payment: makePayment(),
       callbackPayload: { transactionStatus: 'Completed' },
     });
     expect(r.verified).toBe(true);
   });

 Guard — ExecutionContext stub:

   const ctx = {
     switchToHttp: () => ({ getRequest: () => ({ params: { paymentId }, user }) }),
   } as unknown as ExecutionContext;
   expect(await guard.canActivate(ctx)).toBe(true);

 Saga — event → command:

   const obs = saga.onPaymentInitiated(of(event));
   const cmd = await firstValueFrom(obs);
   expect((cmd as { type: string }).type).toBe('saga.notify_customer');

 E2E — supertest:

   const { app, prisma } = await createTestApp();
   const res = await request(app.getHttpServer())
     .post('/api/v1/payments')
     .set({ Authorization: 'Bearer customer' })
     .send(body)
     .expect(201);

---

══════════════════════════════════════════════════════════════════
 📊 COVERAGE TARGETS
══════════════════════════════════════════════════════════════════

 | Layer           | Target  | Current |
 |-----------------|---------|---------|
 | Domain          | 95%+    | ~95%    |
 | Application     | 90%+    | ~92%    |
 | Infrastructure  | 85%+    | ~85%    |
 | Interfaces      | 90%+    | ~90%    |
 | Global (Lines)  | 90%+    | 90.11%  |

---

══════════════════════════════════════════════════════════════════
 🔧 TERMUX WORKAROUND
══════════════════════════════════════════════════════════════════

 Prisma engine crashes on Termux ARM64 (EM_X86_64).
 Repositories are unit-tested with mocked PrismaService:

   jest.mock('@vubon/shared-kernel/prisma', () => ({
     PrismaService: class PrismaService {},
   }));

 Or via Test.createTestingModule(...).overrideProvider(PrismaService).

 E2E tests still work — PrismaService gracefully degrades
 (Redis-only), and repositories are overridden with in-memory mocks.

---

══════════════════════════════════════════════════════════════════
 📁 TEST STRUCTURE
══════════════════════════════════════════════════════════════════

   test/
   ├── unit/                        (106 files, 996 tests)
   │   ├── domain/                  (VO, entity, service, spec, error)
   │   ├── application/             (service, handler, mapper, validator, saga)
   │   ├── infrastructure/          (prisma repo, gateway, service, queue, worker)
   │   └── interfaces/              (controller, guard, interceptor, validator)
   ├── e2e/                         (5 files, 68 tests)
   │   ├── _setup.ts                (app + Prisma/Redis mock + auth stub)
   │   ├── health.e2e-spec.ts
   │   ├── payment.e2e-spec.ts
   │   ├── refund.e2e-spec.ts
   │   ├── transaction.e2e-spec.ts
   │   └── webhook.e2e-spec.ts
   └── jest-e2e.json
