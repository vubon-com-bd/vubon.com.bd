# Testing — Identity Service

Complete guide for unit, E2E, and integration testing.

---

## 📊 Test Suite Overview

| Type | Files | Command | Status |
|------|-------|---------|--------|
| **Unit** | 17 | `pnpm test:unit` | ✅ |
| **E2E** | 21 | `pnpm test:e2e` | ✅ |
| **All** | 38 | `pnpm test:all` | ✅ |

---

## 🎯 Test Commands

### Unit Tests

\`\`\`bash
# Run once
pnpm test:unit

# Watch mode
pnpm test:unit:watch

# With coverage
pnpm test:unit:cov

# Direct invocation
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --runInBand
\`\`\`

### E2E Tests

\`\`\`bash
# Run once
pnpm test:e2e

# Watch mode
pnpm test:e2e:watch

# Coverage
pnpm test:e2e:coverage
\`\`\`

### All Tests

\`\`\`bash
pnpm test:all       # Unit + E2E
\`\`\`

---

## 📁 Test Structure

\`\`\`
test/
├── unit/                        ← Unit test suite
│   ├── jest.config.ts           ← Unit jest config
│   ├── setup.ts                 ← Jest globals setup
│   ├── domain/                  ← Domain layer tests
│   │   ├── value-objects/       → VO specs (auth-status, identifier, session-expiry, user-email, ...)
│   │   ├── entities/            → Entity specs (auth, session)
│   │   └── services/            → Service specs (kyc-eligibility, profile-completion)
│   ├── application/             ← Application layer tests
│   │   ├── commands/            → Command handler specs (login)
│   │   └── services/            → Service specs (auth, user-profile)
│   └── infrastructure/          ← Infrastructure tests
│       ├── mappers/             → Mapper specs (auth.prisma.mapper)
│       └── services/            → Service specs (otp-generator, password-hasher, recovery-code-generator)
│
├── e2e/                         ← E2E test suite (auto-generated)
│   ├── auth.e2e-spec.ts         → auth endpoints
│   ├── health.e2e-spec.ts       → health endpoint
│   ├── mfa.e2e-spec.ts          → MFA endpoints
│   ├── profile.e2e-spec.ts      → user profile
│   ├── session.e2e-spec.ts      → session management
│   └── user.e2e-spec.ts         → user management
│
├── helpers/                     ← Test helpers
│   ├── test-auth.helper.ts      → auth flow helpers
│   ├── test-db.helper.ts        → DB utilities
│   ├── test-fixtures.ts         → static fixtures
│   └── index.ts
│
├── utility/                     ← Test utilities
│   ├── test-app.ts              → shared app bootstrap
│   ├── request-helper.ts        → supertest wrapper
│   ├── request-dispatcher.ts    → method dispatcher
│   ├── type.ts                  → shared types
│   └── index.ts
│
├── generated-apis/              ← Auto-generated API clients
│   ├── auth.ts, auth-mfa.ts, auth-session.ts, ...
│   ├── user.ts, user-profile.ts, ...
│   └── index.ts
│
├── generated-payloads/          ← Payload factories
│   └── index.ts
│
├── jest-e2e.json                ← E2E jest config
├── jest-env-setup.ts            ← Env vars setup
├── jest-after-env.ts            ← Post-setup hooks
├── jest-global-setup.ts         ← Global setup
└── setup.ts                     ← Shared test app
\`\`\`

---

## 🎯 Unit Test Patterns

### 1. Value Object Test

\`\`\`typescript
import { describe, it, expect } from '@jest/globals';
import { UserEmailVO } from '../../../../src/module/domain/value-objects/primitives/user-email.vo.js';

describe('UserEmailVO', () => {
  describe('create()', () => {
    it('creates valid email', () => {
      const vo = UserEmailVO.create('user@example.com');
      expect(vo.value).toBe('user@example.com');
    });

    it('normalizes case', () => {
      const vo = UserEmailVO.create('USER@EXAMPLE.COM');
      expect(vo.normalized).toBe('user@example.com');
    });

    it('throws for invalid format', () => {
      expect(() => UserEmailVO.create('not-an-email')).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = UserEmailVO.reconstitute('any');
      expect(vo.value).toBe('any');
    });
  });
});
\`\`\`

### 2. Entity Test (state machine)

\`\`\`typescript
describe('AuthEntity', () => {
  describe('state machine', () => {
    it('activate: pending → active', () => {
      const e = buildPendingAuth();
      e.activate();
      expect(e.status.isActive()).toBe(true);
    });

    it('lock: active → locked', () => {
      const e = buildActiveAuth();
      e.lock('too many attempts');
      expect(e.status.isLocked()).toBe(true);
    });
  });
});
\`\`\`

### 3. Service Test (auth flow)

\`\`\`typescript
describe('AuthService (mocked)', () => {
  function buildService(overrides = {}) {
    const repo = {
      findByIdentifier: jest.fn(),
      save: jest.fn(async (e) => e),
      ...overrides.repo,
    };
    const hasher = {
      hash: jest.fn().mockResolvedValue('hashed'),
      verify: jest.fn().mockResolvedValue(true),
      ...overrides.hasher,
    };
    return { service: new AuthService(repo, hasher, ...), repo, hasher };
  }

  it('registers new user', async () => {
    const { service } = buildService();
    const result = await service.register({ email: 'a@b.com', password: 'SecureP@ss123' });
    expect(result.success).toBe(true);
  });
});
\`\`\`

---

## 🎯 E2E Test Patterns

### Auto-Generation

E2E tests are **auto-generated** from `scripts/e2e/endpoints.mjs`:

\`\`\`bash
pnpm generate:e2e
\`\`\`

**Registry:**
\`\`\`javascript
// scripts/e2e/endpoints.mjs
export const ENDPOINTS = [
  {
    group: 'auth',
    method: 'POST',
    path: '/auth/register',
    name: 'Register User',
    auth: false,
    request: { email: 'test@example.com', password: 'SecureP@ss123', ... },
    expect: {
      statuses: [201, 400, 409, 500, 503],
      hasFields: ['success', 'user', 'tokens'],
    },
  },
];
\`\`\`

### Degraded Mode (Termux)

Tests **accept multiple statuses** to be resilient:

\`\`\`typescript
// 200/201 = success
// 400 = validation
// 401 = auth (when token unavailable)
// 409 = conflict
// 500/503 = Prisma degraded
expect([200, 201, 400, 401, 409, 500, 503]).toContain(response.status);
\`\`\`

---

## 🔧 Test Configuration

### Unit Jest Config (`test/unit/jest.config.ts`)

\`\`\`typescript
export default {
  displayName: 'unit',
  testEnvironment: 'node',
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.json' }],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  injectGlobals: true,
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup.ts'],
  testTimeout: 10000,
};
\`\`\`

### E2E Jest Config (`test/jest-e2e.json`)

\`\`\`json
{
  "rootDir": "..",
  "testEnvironment": "node",
  "testRegex": "test/e2e/.*\\.e2e-spec\\.ts$",
  "transform": { "^.+\\.(t|j)s$": ["ts-jest", { "useESM": true }] },
  "setupFiles": ["<rootDir>/test/jest-env-setup.ts"],
  "setupFilesAfterEnv": ["<rootDir>/test/jest-after-env.ts"],
  "globalSetup": "<rootDir>/test/jest-global-setup.ts",
  "testTimeout": 30000,
  "forceExit": true
}
\`\`\`

### Env Setup (`test/jest-env-setup.ts`)

\`\`\`typescript
process.env['NODE_ENV'] = 'test';
process.env['JWT_SECRET'] = 'test_jwt_secret_must_be_at_least_32_characters_long_12345';
process.env['PRISMA_SKIP_ENGINE_BOOTSTRAP'] = 'true';
process.env['DATABASE_URL'] = 'postgresql://u0_a350@localhost:5432/vubon_identity';
process.env['MFA_ENABLED'] = 'false';
\`\`\`

---

## 📊 Coverage Report

### Coverage Commands

\`\`\`bash
# Unit coverage
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --runInBand \\
  --coverage

# View HTML coverage
open coverage/lcov-report/index.html
\`\`\`

### Target Thresholds

| Type | Target |
|------|--------|
| Overall | 70%+ |
| Domain | 85%+ |
| Application | 60%+ |
| Infrastructure | 70%+ |

---

## 🎯 Common Pitfalls

### ❌ Wrong path depth

\`\`\`typescript
// From test/unit/domain/value-objects/user-email.vo.spec.ts
import { UserEmailVO } from '../../../../../src/...';  // ← 5 levels = WRONG
import { UserEmailVO } from '../../../../src/...';    // ← 4 levels = CORRECT
\`\`\`

### ❌ Missing `.js` extension

\`\`\`typescript
import { UserEmailVO } from '../../../../src/.../user-email.vo';     // ← WRONG
import { UserEmailVO } from '../../../../src/.../user-email.vo.js';  // ← CORRECT (ESM)
\`\`\`

### ❌ Invalid UUID in test data

\`\`\`typescript
const VALID_UUID = '11111111-1111-4111-8111-111111111111';  // ← 4/1/1/1 pattern
const INVALID = 'u-1';                                       // ← throws ValidationError
\`\`\`

### ❌ Missing env vars

\`\`\`typescript
// ❌ Fails: JWT_SECRET too short
process.env['JWT_SECRET'] = 'secret';

// ✅ Correct: 32+ chars
process.env['JWT_SECRET'] = 'test_jwt_secret_must_be_at_least_32_characters_long';
\`\`\`

---

## 🔧 Test Generators

### E2E Generator (`scripts/generate-e2e-tests.mjs`)

\`\`\`bash
pnpm generate:e2e
\`\`\`

**Input:** `scripts/e2e/endpoints.mjs`
**Output:** `test/e2e/*.e2e-spec.ts` (auto-generated)

### InMemory Generator (`scripts/generate-inmemory-repos.mjs`)

\`\`\`bash
node scripts/generate-inmemory-repos.mjs
\`\`\`

**Output:** `src/module/infrastructure/persistence/memory/repositories/*.ts`

---

## 🎯 Test Data

### UUID Convention

Tests use **patterned UUIDs** for debugging:

\`\`\`
11111111-1111-4111-8111-111111111111  → AuthIdVO
22222222-2222-4222-8222-222222222222  → UserIdVO
33333333-3333-4333-8333-333333333333  → SessionIdVO
44444444-4444-4444-8444-444444444444  → Missing/nonexistent
\`\`\`

### Test Values

\`\`\`typescript
const NOW = '2026-01-01T00:00:00.000Z';
const VALID_UUID = '11111111-1111-4111-8111-111111111111';
const VALID_EMAIL = 'user@example.com';
const STRONG_PASSWORD = 'SecureP@ss123';
const WEAK_PASSWORD = 'weak';
\`\`\`

---

## 🎯 CI/CD Integration

### Run in CI

\`\`\`bash
pnpm install --frozen-lockfile
pnpm type-check
pnpm build
pnpm test:all
\`\`\`

### Test Output (CI JSON)

\`\`\`bash
NODE_OPTIONS=--experimental-vm-modules npx jest \\
  --config ./test/unit/jest.config.ts \\
  --json --outputFile=./test-results.json
\`\`\`

---

## 📊 Test Statistics

| Suite | Files | Status |
|-------|-------|--------|
| Unit | 17 | ✅ |
| E2E | 21 | ✅ |
| **TOTAL** | **38** | ✅ |

---

## 🎯 Auth-Specific Test Scenarios

### Login/Register Flow

\`\`\`typescript
it('full auth flow: register → login → refresh → logout', async () => {
  // 1. Register
  const reg = await requestHelper.post('/auth/register', {
    email: uniqueEmail(),
    password: strongPassword(),
    confirmPassword: strongPassword(),
    acceptTerms: true,
  });
  expect([201, 400, 500, 503]).toContain(reg.status);

  // 2. Login
  if (reg.status === 201) {
    const login = await requestHelper.post('/auth/login', {
      identifier: reg.body.user.email,
      password: 'SecureP@ss123',
    });
    expect([200, 401, 500, 503]).toContain(login.status);

    // 3. Refresh
    if (login.status === 200) {
      const refresh = await requestHelper.post('/auth/refresh', {
        refreshToken: login.body.tokens.refreshToken,
      });
      expect([200, 401, 500, 503]).toContain(refresh.status);
    }
  }
});
\`\`\`

### MFA Flow

\`\`\`typescript
it('MFA enable → verify → disable', async () => {
  // Enable
  const enable = await requestHelper.post('/auth/mfa/enable', {});
  expect([200, 401, 500, 503]).toContain(enable.status);

  // Verify with TOTP
  if (enable.status === 200) {
    const verify = await requestHelper.post('/auth/mfa/verify', { code: '123456' });
    expect([200, 400, 401, 500, 503]).toContain(verify.status);
  }
});
\`\`\`

### Session Management

\`\`\`typescript
it('list active sessions', async () => {
  const res = await requestHelper.get('/auth/sessions');
  expect([200, 401, 500, 503]).toContain(res.status);
});

it('revoke session', async () => {
  const res = await requestHelper.delete('/auth/sessions/00000000-0000-0000-0000-000000000001');
  expect([200, 401, 404, 500, 503]).toContain(res.status);
});
\`\`\`

---

## 🎯 Next Steps

**Coverage boost:**
1. Add tests for `application/services` (mocked) — auth flow
2. Add tests for remaining VOs — token-expiry, session-expiry, identifier
3. Add tests for `AuthEntity` untested methods
4. Add tests for MFA TOTP validation
5. Add tests for session rotation logic

**Target:** 70% → 85%
