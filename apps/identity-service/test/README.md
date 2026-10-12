# auth-service — Tests

## Structure

    test/
    ├── e2e/                  # End-to-end HTTP tests
    │   └── *.e2e-spec.ts
    ├── helpers/              # Test helpers (mocks, fixtures)
    └── jest-e2e.json         # E2E jest config

## Unit Tests

Unit tests are **co-located** with their source files:

    src/**/*.spec.ts

Run:

    pnpm test
    pnpm test:cov
    pnpm test:watch

## E2E Tests

End-to-end HTTP tests live under `test/e2e/`.

Run:

    pnpm test:e2e

## Coverage

Current: **2,293 tests across 309 suites**.

See `../TESTING.md` for full test strategy.
