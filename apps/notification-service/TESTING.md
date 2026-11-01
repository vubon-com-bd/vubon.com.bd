# 🧪 Testing — Notification Service

Complete testing guide — unit + E2E + coverage.

## 📊 Test Suite Overview

| Type | Suites | Tests | Coverage | Command |
|------|--------|-------|----------|---------|
| **Domain** | 143 | 1,839 | 96.88% | `pnpm test:domain` |
| **Application** | 65 | 442 | 92.97% | `pnpm test:application` |
| **Infrastructure** | 24 | 1,443 | 93.59% | `pnpm test:infra` |
| **Interfaces** | 47 | 298 | 99.17% | `pnpm test:interfaces` |
| **Modules** | 28 | 140 | 100% | `pnpm test:modules` |
| **TOTAL** | **307** | **4,162** | **96.88%** | `pnpm test` |

## 🎯 Test Commands

```bash
# Run all unit tests
pnpm test

# Run all unit + coverage
pnpm test:cov

# Run E2E only
pnpm test:e2e

# Run everything
pnpm test:all

# Run specific layer
pnpm test:domain
pnpm test:application
pnpm test:infra
pnpm test:interfaces
pnpm test:modules

# Run specific file
pnpm test src/module/domain/entities/notification.entity.spec.ts

# Watch mode
pnpm test:watch
```

## 📁 Test Structure

```
test/
├── unit/
│   ├── domain/                   ← 143 suites
│   ├── application/              ← 65 suites
│   ├── infrastructure/           ← 24 suites
│   ├── interfaces/               ← 47 suites
│   ├── modules/                  ← 28 suites
│   ├── jest.config.domain.ts
│   ├── jest.config.application.ts
│   ├── jest.config.infra.ts
│   ├── jest.config.interfaces.ts
│   └── jest.config.modules.ts
├── e2e/
│   ├── domain/                   ← 6 suites · 15 tests
│   ├── application/              ← 5 suites · 35 tests
│   ├── infrastructure/           ← 5 suites · 16 tests
│   ├── interfaces/               ← 8 suites · 15 tests
│   ├── modules/                  ← 3 suites · 16 tests
│   └── jest-e2e-*.json
├── jest-env-setup.ts
├── jest-after-env.ts
└── jest-global-setup.ts
```

## 🎯 Unit Test Patterns

### Pattern 1 — Value Object Test

```typescript
describe('NotificationIdVO', () => {
  it('should create from valid UUID', () => {
    const vo = NotificationIdVO.create('00000000-0000-4000-8000-000000000001');
    expect(vo.value).toBe('00000000-0000-4000-8000-000000000001');
  });

  it('should throw on invalid UUID', () => {
    expect(() => NotificationIdVO.create('invalid')).toThrow(ValidationError);
  });

  it('should reconstitute without validation', () => {
    const vo = NotificationIdVO.reconstitute('anything');
    expect(vo.value).toBe('anything');
  });
});
```

### Pattern 2 — Entity State Machine Test

```typescript
describe('NotificationEntity', () => {
  it('should allow pending → sending transition', () => {
    const entity = makePendingEntity();
    entity.markSending();
    expect(entity.isSending()).toBe(true);
  });

  it('should reject sending → pending transition', () => {
    const entity = makeSendingEntity();
    expect(() => entity.markPending()).toThrow(BusinessRuleError);
  });

  it('should emit StatusChanged event on transition', () => {
    const entity = makePendingEntity();
    entity.markSending();
    const events = entity.pullDomainEvents();
    expect(events).toHaveLength(1);
    expect(events[0].type).toBe('notification.status_changed');
  });
});
```

### Pattern 3 — Service Business Logic Test

```typescript
describe('NotificationBuilderService', () => {
  it('should build notification from input', () => {
    const entity = NotificationBuilderService.build({
      id: 'uuid',
      userId: 'uuid',
      type: 'transactional',
      category: 'order',
      channel: 'email',
      subject: 'Test',
      body: 'Test body',
      recipients: [makeRecipient()],
      now: new Date().toISOString(),
    });
    expect(entity.isPending()).toBe(true);
  });

  it('should throw when no recipients', () => {
    expect(() =>
      NotificationBuilderService.build({ recipients: [], /* ... */ }),
    ).toThrow('at least one recipient');
  });
});
```

### Pattern 4 — Repository Test (InMemory)

```typescript
describe('InMemoryNotificationRepository', () => {
  let repo: InMemoryNotificationRepository;

  beforeEach(() => {
    repo = new InMemoryNotificationRepository();
  });

  it('should save and find entity', async () => {
    const entity = makeEntity();
    await repo.save(entity);
    const found = await repo.findById(entity.id);
    expect(found).toEqual(entity);
  });

  it('should return empty list when no matches', async () => {
    const results = await repo.findByStatus('pending');
    expect(results).toEqual([]);
  });
});
```

## 🎯 E2E Test Patterns

### Pattern 1 — Full Flow

```typescript
describe('Notification flow (E2E)', () => {
  it('send → getById → cancel', async () => {
    const app = await createTestingModule();
    const result = await app
      .post('/notifications')
      .send({ /* ... */ })
      .expect(201);

    await app
      .get(`/notifications/\${result.body.notificationIds[0]}`)
      .expect(200);

    await app
      .post(`/notifications/\${result.body.notificationIds[0]}/cancel`)
      .send({ reason: 'test' })
      .expect(200);
  });
});
```

### Pattern 2 — Degraded Mode

```typescript
describe('Degraded mode (E2E)', () => {
  beforeAll(() => {
    process.env.PERSISTENCE_DRIVER = 'memory';
    process.env.PRISMA_SKIP_ENGINE_BOOTSTRAP = 'true';
  });

  it('health returns degraded', async () => {
    const result = await app.get('/health').expect(200);
    expect(result.body.dependencies).toContainEqual(
      expect.objectContaining({ name: 'database', healthy: false }),
    );
  });
});
```

## 🔧 Test Configuration

### jest config per layer

Each layer has its own `jest.config.<layer>.ts`:

```typescript
// test/unit/jest.config.domain.ts
export default {
  displayName: 'domain',
  testMatch: ['<rootDir>/test/unit/domain/**/*.spec.ts'],
  transform: { '^.+\.ts$': ['ts-jest', { useESM: true }] },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: { '^(\.{1,2}/.*)\.js$': '$1' },
  testTimeout: 10000,
};
```

### env setup

`test/jest-env-setup.ts`:
```typescript
process.env.PERSISTENCE_DRIVER = 'memory';
process.env.PRISMA_SKIP_ENGINE_BOOTSTRAP = 'true';
process.env.DISABLE_AUTH = 'true';
process.env.NODE_ENV = 'test';
```

## 📊 Coverage Report

```bash
# Generate HTML coverage
pnpm test:cov

# Open (Termux)
termux-open coverage/lcov-report/index.html
```

### Targets

| Metric | Target | Actual |
|--------|--------|--------|
| Statements | ≥ 90% | 96.88% |
| Branches | ≥ 80% | 89.81% |
| Functions | ≥ 90% | 97.09% |
| Lines | ≥ 90% | 96.91% |

## 🎯 Common Pitfalls

| ❌ Wrong | ✅ Correct |
|----------|-----------|
| Relative imports `../../../domain` | Alias `@domain/...` |
| Missing `.js` extension | `from '@domain/foo.js'` (always `.js`) |
| Invalid UUID v4 (`00000000-0000-0000...`) | Valid v4: `00000000-0000-4000-8000-...` |
| Missing env in test | `jest-env-setup.ts` |
| Test with real DB | Use `PERSISTENCE_DRIVER=memory` |
| Sync event assertion | Use `entity.pullDomainEvents()` after action |
| Hardcoded dates | Use `new Date().toISOString()` or fixtures |

## 🔧 Test Generators

```bash
# Generate E2E test scaffold for a new endpoint
pnpm generate:e2e

# Generate InMemory repo
node scripts/generate-inmemory-repos.mjs
```

## 🎯 Test Data Conventions

| Type | Convention | Example |
|------|-----------|---------|
| UUID v4 | `00000000-0000-4000-8000-<12digit>` | `00000000-0000-4000-8000-000000000001` |
| Timestamp | ISO 8601 (via `new Date().toISOString()`) | `2026-10-26T10:00:00.000Z` |
| Email | `test+<random>@example.com` | `test+abc@example.com` |
| Phone | BD format `+8801XXXXXXXXX` | `+8801712345678` |

## 🎯 CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm --filter @vubon/shared-kernel build
      - run: pnpm --filter @vubon/notification-service test:all
```

## 📚 Related

- [README.md](./README.md) — overview
- [DEVELOPMENT.md](./DEVELOPMENT.md) — local dev
- [ARCHITECTURE.md](./ARCHITECTURE.md) — layer design
