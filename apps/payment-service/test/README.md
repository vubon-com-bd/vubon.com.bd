# Test Suite — payment-service

Full test coverage for payment-service (unit + E2E).

---

## Structure

    test/
    ├── unit/                        # 100+ spec files, 996 tests
    │   ├── domain/                  # VOs, entities, services, specs, errors
    │   ├── application/             # services, handlers, mappers, validators, sagas
    │   ├── infrastructure/          # prisma repos, gateways, services, queues, workers
    │   └── interfaces/              # controllers, guards, interceptors, mappers, validators
    ├── e2e/                         # 5 suites, 68 tests
    │   ├── _setup.ts                # app bootstrap + Prisma/Redis mocks + auth stub
    │   ├── health.e2e-spec.ts
    │   ├── payment.e2e-spec.ts
    │   ├── refund.e2e-spec.ts
    │   ├── transaction.e2e-spec.ts
    │   └── webhook.e2e-spec.ts
    └── jest-e2e.json                # E2E Jest config

---

## Running

    pnpm test                    # all unit tests
    pnpm test:watch              # watch mode
    pnpm test:cov                # coverage report
    pnpm test:e2e                # E2E tests
    pnpm test test/unit/...      # single file
    pnpm test -- -t "pattern"    # by test name

---

## Required imports (ESM)

Every spec file MUST include:

    import { jest } from '@jest/globals';

Without it, Jest throws `ReferenceError: jest is not defined`.

---

## Test patterns

Key patterns used in payment-service:

- **State machine VOs** — transition matrix verified per status
  (pending → processing → authorized → captured → paid → refunded/chargeback)
- **Entities** — happy path + invalid transitions + invariant violations
- **Domain services** — gateway routing, fee + VAT, refund eligibility,
  idempotency derivation, double-entry ledger
- **Application services** — mock repositories, real domain entities
- **Command/Query handlers** — verify bus delegation with mocked service
- **Sagas** — RxJS `ofType()` + first emitted command verified
- **Prisma repositories** — structural `PrismaDelegate` mock, no real DB
- **Guards** — `ExecutionContext` stub with `req.user` + `req.params`
- **E2E** — `supertest` against full `AppModule` with
  `overrideProvider(PrismaService, RedisService)`

---

## Coverage

Current: **~90% line coverage** across all layers.

| Layer          | Stmts | Notes                                          |
|----------------|-------|------------------------------------------------|
| Domain         | ~95%  | VOs, entities, services, specifications        |
| Application    | ~92%  | Services, handlers, mappers, validators, sagas |
| Infrastructure | ~85%  | Repositories mocked; gateways + queues + workers |
| Interfaces     | ~90%  | Controllers, guards, middlewares, validators   |

Target: **90%+ global**, **95%+ domain**, **90%+ application**.

---

## Prisma on Termux

Prisma engine crashes on Termux ARM64 (`EM_X86_64`).

Repositories requiring Prisma are unit-tested with **mocked PrismaService**:

    jest.mock('@vubon/shared-kernel/prisma', () => ({
      PrismaService: class PrismaService {},
    }));

Or via `Test.createTestingModule({...})
  .overrideProvider(PrismaService)
  .useValue(mockPrisma)`.

E2E tests still work — `PrismaService` gracefully degrades, and repositories
are overridden with in-memory mocks.

---

## E2E Notes

- **BullMQ mocked** via `jest.setup.ts` (`jest.mock('@nestjs/bullmq', ...)`) —
  no Redis connection needed.
- **Auth stubbed** via `overrideGuard(JwtAuthGuard)`:
  - `Authorization: Bearer admin` → admin user
  - `Authorization: Bearer customer` → customer user
  - No header → `401 Unauthorized`
- **`@Public()` routes** — Webhook receiver and Health endpoints bypass auth
  via Reflector metadata.
- **Exception filter** — `E2EAllExceptionsFilter` translates both
  `HttpException` (NestJS) and domain errors (`code` + `httpStatus`) to
  correct HTTP status codes.
- **Validation** — HTTP DTOs use `class-validator`, so invalid input
  returns `400 Bad Request`.

---

## E2E Coverage by Suite

| Suite                | Endpoints Tested |
|----------------------|------------------|
| `health`             | /health, /health/live, /health/ready |
| `payment`            | POST/GET /payments, /:id, /detail, /public, verify, capture, fail, cancel, retry, chargeback, mark-paid, stats, by-order, by-user |
| `refund`             | POST/GET /refunds, /:id, /public, /payment/:paymentId, approve, process, complete, fail, cancel |
| `transaction`        | GET /transactions, /:id, /payment/:paymentId, /order/:orderId |
| `webhook`            | POST /webhooks/:gateway (public), GET /webhooks, /:webhookId |

---

## Test counts (snapshot)

| Layer                            | Files | Tests |
|----------------------------------|-------|-------|
| domain/value-objects/primitives  | 22    | ~180  |
| domain/value-objects/composites  |  4    | ~35   |
| domain/entities                  |  6    | ~150  |
| domain/services                  |  6    | ~90   |
| domain/specifications            |  4    | ~30   |
| domain/errors                    |  2    | ~50   |
| application/services             |  8    | ~150  |
| application/commands             |  3    | ~30   |
| application/queries              |  3    | ~25   |
| application/mappers              |  6    | ~50   |
| application/sagas                |  5    | ~30   |
| application/validators           |  4    | ~30   |
| infrastructure/gateways          |  3    | ~90   |
| infrastructure/persistence       |  5    | ~180  |
| infrastructure/queues            |  3    | ~30   |
| infrastructure/services          |  7    | ~90   |
| infrastructure/workers           |  8    | ~60   |
| interfaces/controllers           |  4    | ~60   |
| interfaces/guards                |  2    | ~25   |
| interfaces/interceptors          |  1    | ~10   |
| interfaces/mappers               |  3    | ~25   |
| interfaces/middlewares           |  1    | ~10   |
| interfaces/validators            |  4    | ~40   |
| interfaces/decorators            |  1    | ~6    |
| **unit total**                   | **~106** | **~996** |
| **e2e**                          | **5** | **68** |
| **GRAND TOTAL**                  | **~111** | **~1064** |
