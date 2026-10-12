<!-- AUTO-GENERATED from docs/testing.doc.ts. Do not edit directly. -->

Testing Guide

## Overview

Vendor-service has **two test tiers**:

| Tier | Location | Runner | Count |
|------|----------|--------|-------|
| Unit | `test/unit/**` | Jest | ~3100 tests, 214 suites |
| E2E | `test/e2e/**` | Jest + Supertest | ~135 tests, 5 suites |

**Coverage target:** 90% statements, 85% branches, 90% functions, 90% lines.

**Current coverage:** 90.72% statements | 73.27% branches | 91.42% functions | 91.30% lines.

## Unit Test Layout

    test/unit/
      domain/
        value-objects/primitives/   — one file per VO
        value-objects/composites/   — one file per composite
        entities/                   — one file per entity
        events/                     — one file per event family
        services/                   — one file per domain service
        specifications/             — one file per spec
        errors/                     — one file per error module
      application/
        errors/                     — one file per error module
        sagas/commands/             — saga commands
      infrastructure/
        persistence/prisma/repositories/   — one file per Prisma repo (mocked Prisma)
      interfaces/
        decorators/                 — one file per decorator
        mappers/                    — one file per controller mapper
      modules/
        health/                     — health controller

## E2E Layout

    test/e2e/
      _setup.ts              — creates a Nest app with Prisma + Redis mocked
      health.e2e-spec.ts     — /health endpoints
      vendor.e2e-spec.ts     — /vendors core CRUD + public
      onboarding.e2e-spec.ts — document, verification, approval, suspension
      finance.e2e-spec.ts    — team, payout, settlement, invoice, subscription, commission
      operational.e2e-spec.ts — rating, review, performance, shipping, warranty, return-policy, settings, stats, report

## Running Tests

    cd ~/vubon.com.bd

    # All unit
    pnpm --filter @vubon/vendor-service test

    # Watch
    pnpm --filter @vubon/vendor-service test:watch

    # Coverage
    pnpm --filter @vubon/vendor-service test:cov

    # Single file
    cd apps/vendor-service
    NODE_OPTIONS=--experimental-vm-modules npx jest test/unit/domain/services

    # E2E
    pnpm --filter @vubon/vendor-service test:e2e

## Prisma Test Harness

`test/helpers/prisma-test-harness.ts` exposes:

    import { createMockPrisma, makeVendorRow } from '@helpers/prisma-test-harness';

    const { prisma, mock } = createMockPrisma();
    // mock.vendor.findFirst, mock.vendor.create, ... all jest.fn()

All 23 delegates are mocked. Use `mock.<delegate>.<method>.mockResolvedValue(...)` to stage responses.

## E2E Test Setup

`test/e2e/_setup.ts` provides `createTestApp()` which:

1. Boots the real `AppModule`.
2. Overrides `PrismaService` and `RedisService` with jest mocks.
3. Registers a global `ValidationPipe`.
4. Sets global prefix `/api/v1`.

Sample:

    const ctx = await createTestApp();
    const res = await request(ctx.app.getHttpServer())
      .get('/api/v1/health/live')
      .expect(200);
    await ctx.app.close();

## Conventions

### File naming
- Unit: `<subject>.spec.ts`
- E2E: `<feature>.e2e-spec.ts`

### Structure
- Use `describe('ClassName', () => { ... })`.
- Nested `describe` per method.
- One assertion focus per test.
- Prefer **pure input/output** assertions where possible.
- Use **helper factories** (`makeVendorRow`, etc.) to build fixtures.

### Error testing

    expect(() => VendorNameVO.create('')).toThrow(ValidationError);

### Async

    await expect(repo.findById(UUID)).resolves.toBeNull();
    await expect(service.create(dto)).rejects.toThrow(BusinessRuleError);

### Coverage exclusions
- `*
