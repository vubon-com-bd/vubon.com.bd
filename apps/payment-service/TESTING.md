# Testing — Payment Service

## Test Suite Overview

| Type | Files | Tests | Command | Status |
|------|-------|-------|---------|--------|
| Unit | 314 | 1922 | pnpm test:unit | PASS |
| E2E | 31 | 173 | pnpm test:e2e:custom | PASS |
| Coverage | — | 86.74% | pnpm test:unit:cov | PASS |

## Test Commands

    # Unit tests
    pnpm test:unit

    # Unit with coverage
    pnpm test:unit:cov

    # E2E tests
    pnpm test:e2e:custom

    # Full CI
    pnpm test:ci

## Test Structure

    test/
      unit/
        domain/          100 files
        application/     95 files
        infrastructure/  74 files
        interfaces/      33 files
        modules/         12 files
        jest.config.ts
      e2e/
        application/     16 files
        infrastructure/  3 files
        interfaces/      9 files
        modules/         2 files
        health.e2e-spec.ts
      fixtures/
        application/
        domain/
        e2e/
      jest-e2e.json
      setup.ts
      setup-e2e.ts
      __mocks__/         Prisma mocks

## Coverage

Target thresholds (global):
- Branches: 70%
- Functions: 85%
- Lines: 85%
- Statements: 85%

Current coverage: 86.74% statements.

## Common Pitfalls

- Path depth: use aliases (@infrastructure/*, @domain/*)
- .js extension in imports (ESM mode)
- Prisma mocks in test/__mocks__/ required for Termux
- Valid UUID format required

## Test Generators

    # Regenerate E2E tests
    pnpm generate:e2e

    # Regenerate InMemory repos
    pnpm generate:inmemory
