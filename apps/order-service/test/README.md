# Test Suite — order-service

Full test coverage for order-service (unit + E2E).

---

## Structure

    test/
    ├── unit/                        # 115 spec files, 1,149 tests
    │   ├── domain/                  # 33 files (VO, entity, service, spec, error, event)
    │   ├── application/             # 33 files (service, handler, mapper, validator, saga, error)
    │   ├── infrastructure/          # 20 files (prisma repo, config, internal/external service, queue, worker)
    │   └── interfaces/              # 8 files (controller, guard, interceptor, decorator, mapper, validator)
    ├── e2e/                         # 5 suites, 40 tests
    │   ├── _setup.ts                # app bootstrap + Prisma/Redis mocks + auth stub
    │   ├── order.e2e-spec.ts
    │   ├── checkout.e2e-spec.ts
    │   ├── delivery.e2e-spec.ts
    │   ├── cancel-return.e2e-spec.ts
    │   └── fulfillment-tracking.e2e-spec.ts
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

See [TESTING.md](../TESTING.md) for full patterns.

Key patterns used in order-service:

- **State machine VOs** — transition matrix verified per status (pending → confirmed → ... → refunded)
- **Entities** — happy path + invalid transitions + invariant violations
- **Domain services** — pure calculation, policy, allocation
- **Application services** — mock repositories, real domain entities
- **Command/Query handlers** — verify bus delegation with mocked service
- **Sagas** — RxJS `ofType()` + first emitted command verified
- **Prisma repositories** — structural `PrismaDelegate` mock, no real DB
- **Guards** — `ExecutionContext` stub with `req.user` + `req.params`
- **E2E** — `supertest` against full `AppModule` with `overrideProvider(PrismaService, RedisService)`

---

## Coverage

Current: **~78.9% statement coverage** across all layers.

| Layer | Stmts | Notes |
|-------|-------|-------|
| Domain | ~95% | VOs, entities, services, specs |
| Application | ~93% | Services, handlers, mappers, validators, sagas, errors |
| Infrastructure | ~75% | Prisma repos mocked; queues/workers smoke-tested |
| Interfaces | ~90% | Controllers smoke-tested; guards/validators full |

Target: **85%+ global**, **95%+ domain**, **90%+ application**.

---

## Prisma on Termux

Prisma engine crashes on Termux ARM64 (`EM_X86_64`).

Repositories requiring Prisma are unit-tested with **mocked PrismaService**:

    jest.mock('@vubon/shared-kernel/prisma', () => ({
      PrismaService: class PrismaService {},
    }));

Or via `Test.createTestingModule({...}).overrideProvider(PrismaService).useValue(mockPrisma)`.

E2E tests still work — `PrismaService` gracefully degrades (Redis-only), and repositories are overridden with in-memory mocks.

---

## E2E Notes

- **BullMQ mocked** via `jest.setup.ts` (`jest.mock('@nestjs/bullmq', ...)`) — no Redis connection needed.
- **Auth stubbed** via `overrideGuard(JwtAuthGuard)` — Bearer token conveys role:
  - `Authorization: Bearer admin` → admin user
  - `Authorization: Bearer customer` → customer user
  - `Authorization: Bearer vendor` → vendor user
- **Exception filter** — `E2EAllExceptionsFilter` translates both `HttpException` (NestJS) and domain errors (`code` + `httpStatus`) to correct HTTP status codes.
- **Schema validation** — invalid input yields `422 Unprocessable Entity` (not 400) — matching shared-schemas Zod refine behavior.

---

## Test counts (snapshot)

| Layer | Files | Tests |
|-------|-------|-------|
| domain/value-objects | 12 | ~150 |
| domain/entities | 7 | ~85 |
| domain/services | 9 | ~118 |
| domain/specifications | 6 | ~34 |
| domain/errors | 1 | ~45 |
| domain/events | 1 | ~50 |
| application/services | 10 | ~145 |
| application/validators | 6 | ~75 |
| application/commands | 8 | ~39 |
| application/queries | 8 | ~34 |
| application/sagas | 1 | ~12 |
| application/errors | 1 | ~36 |
| infrastructure/prisma repos | 10 | ~196 |
| infrastructure/config | 8 | ~24 |
| infrastructure/services | 10 | ~43 |
| infrastructure/queues+workers | 2 | ~20 |
| interfaces/controllers | 1 | ~44 |
| interfaces/guards | 3 | ~23 |
| interfaces/interceptors | 2 | ~8 |
| interfaces/validators | 4 | ~30 |
| interfaces/mappers | 1 | ~7 |
| interfaces/decorators | 1 | ~6 |
| **unit total** | **115** | **1,149** |
| e2e | 5 | 40 |
| **GRAND TOTAL** | **120** | **1,189** |
