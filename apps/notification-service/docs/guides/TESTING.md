# Testing Guide

## Overview

    Total tests:  2758
    Unit suites:  244
    E2E suites:   19
    Coverage:     94%
    Runtime:      ~100s (unit) + ~135s (E2E)

## Test Structure

    test/
    ├── unit/
    │   ├── domain/                  # VO, entity, event tests
    │   ├── application/             # Service, command, query, saga tests
    │   ├── infrastructure/
    │   │   └── providers/           # Provider adapter tests (105)
    │   └── interfaces/              # Controller, mapper tests
    ├── e2e/
    │   ├── _setup.ts                # Shared Nest app factory
    │   ├── health.e2e-spec.ts
    │   ├── notification.e2e-spec.ts
    │   ├── email.e2e-spec.ts
    │   ├── sms.e2e-spec.ts
    │   ├── push.e2e-spec.ts
    │   ├── in-app.e2e-spec.ts
    │   ├── template.e2e-spec.ts
    │   ├── schedule.e2e-spec.ts
    │   ├── broadcast.e2e-spec.ts
    │   ├── digest.e2e-spec.ts
    │   ├── preference.e2e-spec.ts
    │   ├── device.e2e-spec.ts
    │   ├── webhook.e2e-spec.ts
    │   ├── provider-webhook.e2e-spec.ts
    │   ├── analytics.e2e-spec.ts
    │   ├── delivery.e2e-spec.ts
    │   └── infrastructure/
    │       ├── email-provider-flow.e2e-spec.ts
    │       ├── sms-provider-flow.e2e-spec.ts
    │       └── push-provider-flow.e2e-spec.ts
    └── jest-e2e.json                # E2E config

## Running Tests

### All unit tests

    cd ~/vubon.com.bd/apps/notification-service
    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit

Expected: 244 suites, 2554 tests, ~100s

### All E2E tests

    NODE_OPTIONS=--experimental-vm-modules pnpm jest --config ./test/jest-e2e.json --runInBand

Expected: 19 suites, 204 tests, ~135s

**Note:** `--runInBand` prevents parallel Nest app boot (which would
conflict on DB/Redis connections).

### Specific file

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit/domain/entities/notification.entity.spec.ts

### Specific folder

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit/infrastructure/providers

### By test name pattern

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit -t "sends email"

### Watch mode

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --watch

### Coverage

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --coverage

### JSON output (for CI)

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --json --outputFile=test-results.json

## NODE_OPTIONS=--experimental-vm-modules

This flag is required because the monorepo uses ESM (`"type": "module"`).
Jest needs it to run TS files as ESM. All test commands must include it.

Alternative: add to your shell profile:

    export NODE_OPTIONS="--experimental-vm-modules"

## ESM Mocking Gotchas

Because ESM, use `jest.unstable_mockModule` (not `jest.mock`):

    import { jest } from '@jest/globals';

    jest.unstable_mockModule('nodemailer', () => ({
      createTransport: mockCreateTransport,
      default: { createTransport: mockCreateTransport },
    }));

    // Dynamic import AFTER mock declaration
    const { SmtpEmailProvider } = await import('...path...');

See `test/unit/infrastructure/providers/email/smtp.provider.spec.ts`.

## Mocking HTTP

Use the shared helper `test/unit/infrastructure/providers/helpers/mock-fetch.ts`:

    import { setupFetchMock, teardownFetchMock, mockFetchOnce, getFetchCalls } from '...mock-fetch.js';

    beforeEach(() => setupFetchMock());
    afterEach(() => teardownFetchMock());

    it('works', async () => {
      mockFetchOnce({ status: 200, body: { id: 'x' } });
      const result = await provider.send({ ... });
      expect(result.success).toBe(true);

      const calls = getFetchCalls();
      expect(calls[0]?.url).toBe('https://api.example.com/endpoint');
    });

Supports:
- `status`: HTTP code
- `body`: object (auto JSON) or string
- `headers`: extra response headers
- `throwError`: simulate network failure
- `delayMs`: simulate slow response

## Test Conventions

### Naming

    {source-file}.spec.ts        # Unit
    {feature}.e2e-spec.ts        # E2E

Mirror source structure under `test/`.

### Describe blocks

    describe('ClassName', () => {
      describe('methodName()', () => {
        it('does X when Y', () => { ... });
      });
    });

### Assertion style

    // Arrange
    const input = { ... };

    // Act
    const result = await service.doThing(input);

    // Assert
    expect(result).toMatchObject({ success: true });
    expect(result.providerMessageId).toBeDefined();

### Avoid

- Real network calls (always mock fetch)
- Real DB writes in unit tests
- Shared mutable state between tests
- `fdescribe` / `fit` (commit by accident)
- `setTimeout` without cleanup

## E2E Setup

`test/e2e/_setup.ts` creates the Nest app with:

- Real DI graph (all modules loaded)
- Mocked PrismaService (no DB)
- Mocked RedisService (in-memory map)
- Mocked QueueService (no BullMQ)
- Real controllers + guards (JWT via test token)

    const app = await createTestApp();
    const jwt = signTestJwt({ userId: 'test-user' });

    await request(app.getHttpServer())
      .post('/api/v1/notifications')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ ... })
      .expect(201);

## Provider Tests

Providers have their own test folder:

    test/unit/infrastructure/providers/
    ├── base/http-provider.base.spec.ts        (17 tests)
    ├── email/
    │   ├── resend.provider.spec.ts            (15 tests)
    │   ├── smtp.provider.spec.ts              (12 tests)
    │   └── email-provider.resolver.spec.ts    (10 tests)
    ├── sms/
    │   ├── twilio.provider.spec.ts            (12 tests)
    │   ├── sslwireless.provider.spec.ts       (9 tests)
    │   └── sms-provider.resolver.spec.ts      (6 tests)
    └── push/
        ├── fcm.provider.spec.ts               (7 tests)
        ├── webpush.provider.spec.ts           (11 tests)
        └── push-provider.resolver.spec.ts     (8 tests)

Run only:

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit/infrastructure/providers

Expected: 10 suites, 105 tests.

## Provider E2E Tests

`test/e2e/infrastructure/` tests real integration through the provider layer:

- `email-provider-flow.e2e-spec.ts` (5 tests)
- `sms-provider-flow.e2e-spec.ts` (3 tests)
- `push-provider-flow.e2e-spec.ts` (4 tests)

Still uses mocked fetch — no real API calls.

## Real Provider Tests (Optional)

If you want to hit real APIs, add a separate file with a guard:

    const REAL_TESTS = process.env.REAL_PROVIDER_TESTS === 'true';

    (REAL_TESTS ? describe : describe.skip)('Real Resend', () => {
      it('sends an actual email', async () => {
        const provider = new ResendEmailProvider();
        const result = await provider.send({
          to: [process.env.TEST_EMAIL!],
          subject: 'Real test',
          text: 'This actually sends',
        });
        expect(result.success).toBe(true);
      });
    });

Run with:

    REAL_PROVIDER_TESTS=true \
    TEST_EMAIL=you@example.com \
    RESEND_ENABLED=true \
    RESEND_API_KEY=re_xxx \
    NODE_OPTIONS=--experimental-vm-modules \
    pnpm jest test/e2e/real

**Never** run real-provider tests in CI.

## Coverage Targets

| Layer | Target | Current |
|-------|--------|---------|
| Domain | 95% | 96% |
| Application | 90% | 94% |
| Infrastructure | 85% | 91% |
| Interfaces | 80% | 88% |
| Overall | 90% | 94% |

To check current:

    NODE_OPTIONS=--experimental-vm-modules pnpm jest test/unit --coverage

Coverage report at `coverage/lcov-report/index.html`.

## CI Integration

Add to your CI pipeline (GitHub Actions example):

    - name: Type check
      run: pnpm --filter @vubon/notification-service type-check

    - name: Unit tests
      run: NODE_OPTIONS=--experimental-vm-modules pnpm --filter @vubon/notification-service test:unit

    - name: E2E tests
      run: NODE_OPTIONS=--experimental-vm-modules pnpm --filter @vubon/notification-service test:e2e --runInBand

Set `--runInBand` for E2E to avoid port conflicts.

## Debugging Failing Tests

### "Cannot find module"

- Missing `.js` extension in import (ESM requirement)
- Type check passes but runtime fails → check `tsconfig.json` has `moduleResolution: "bundler"`

### "Nest can't resolve dependencies"

- Missing module import in feature module
- Symbol token not registered (use `useExisting`)

### "Timed out" (E2E)

- App boot slow → check DB/Redis reachable
- Increase `testTimeout` in jest-e2e.json

### "Force exiting Jest"

Not an error — Jest warning that timers/connections remain. All tests passed.

    --detectOpenHandles    # shows what's keeping Jest alive

### Flaky tests

- Order dependency → check `beforeEach`/`afterEach` reset
- Shared state → isolate via mocks or reset in `beforeEach`
- Timing → use `await`/`waitFor`, never `setTimeout`

## Best Practices

**Do:**
- Test behavior, not implementation
- One assertion per `it` (usually)
- Name tests as full sentences
- Use `beforeEach` to reset state
- Mock external services
- Assert on error types/codes

**Don't:**
- Test private methods directly
- Snapshot everything
- Share mock state across tests
- Ignore "flake" — fix the root cause
- Skip tests "for now" — fix or remove

## Refactoring Tests

When the source changes:

- Update tests as part of the change
- Delete tests for removed functionality
- Rename tests when method changes
- Update mocks when interface changes

Never let tests rot — failing tests slow down everyone.

## Test Writing Checklist

- [ ] File mirrors source path
- [ ] Describe named after class/function
- [ ] Each `it` describes a single behavior
- [ ] Mocks reset in `beforeEach`
- [ ] No real network/DB calls
- [ ] Error paths tested, not just happy path
- [ ] Type-check passes
- [ ] Runtime under 100ms per unit test
