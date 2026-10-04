# Test Suite — cart-service

Full test coverage for cart-service (unit + E2E).

---

## Structure

    test/
    ├── unit/                        # 165 spec files, 1,217 tests
    │   ├── domain/                  # 70 files (VO, entity, service, spec)
    │   ├── application/             # 55 files (service, handler, mapper, validator)
    │   ├── infrastructure/          # 21 files (repos, clients, internal services)
    │   ├── interfaces/              # 17 files (controller, guard, interceptor, validator)
    │   └── modules/                 # 2 files (smoke tests)
    ├── e2e/                         # 5 suites, 16 tests
    │   ├── setup-e2e.ts             # app bootstrap + auth stub
    │   ├── health.e2e-spec.ts
    │   ├── cart.e2e-spec.ts
    │   ├── cart-item.e2e-spec.ts
    │   ├── guest-cart.e2e-spec.ts
    │   └── totals.e2e-spec.ts
    ├── fixtures/                    # shared test data
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

---

## Coverage

Current: **~87% statement coverage** across all layers.

Target: **85%+ global**, **95%+ domain**, **90%+ application**.

---

## Prisma on Termux

Prisma engine crashes on Termux ARM64 (`EM_X86_64`).

Repositories requiring Prisma are unit-tested with **mocked PrismaClient**:

    jest.mock('@vubon/shared-kernel/prisma', () => ({
      PrismaService: class PrismaService {},
    }));

E2E tests still work — `PrismaService` gracefully degrades (Redis-only).
