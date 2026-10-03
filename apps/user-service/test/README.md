# Tests — Overview

Full guide: [../TESTING.md](../TESTING.md)

## Structure

    test/
    ├── unit/              # 190 test files
    │   ├── domain/
    │   ├── application/
    │   ├── interfaces/
    │   └── infrastructure/
    ├── e2e/               # 1 E2E test file
    │   └── user.e2e-spec.ts
    └── helpers/           # Shared mocks
        ├── user-repository.mock.ts
        └── prisma-mock.ts

## Run

    pnpm test              # all unit tests
    pnpm test:cov          # with coverage
    pnpm test:watch        # watch mode
    pnpm test:e2e          # E2E

## Coverage

| Metric | Value |
|--------|-------|
| Statements | 87.82% |
| Branches | 66.46% |
| Functions | 83.30% |
| Lines | 88.48% |

## Conventions

- One `.spec.ts` per source file
- Use `test/helpers/*.mock.ts` for repository/Prisma mocks
- Use supertest for E2E
- `USE_IN_MEMORY_REPOS=true` for E2E without a real DB
