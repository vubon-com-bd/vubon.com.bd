# Testing — Cart Service

## 📊 Test Suite Overview

| Type | Files | Tests | Command | Status |
|------|-------|-------|---------|--------|
| **Unit** | 175 | 1,430 | `pnpm test:unit` | ✅ 100% |
| **E2E** | 30 | 176 | `pnpm test:e2e` | ✅ 100% |
| **Total** | **205** | **1,606** | `pnpm test` | ✅ 100% |

## 🎯 Test Commands

```bash
pnpm test              # Unit + E2E
pnpm test:unit         # Unit only
pnpm test:e2e          # E2E only
pnpm test:cov          # With coverage
pnpm test:watch        # Watch mode
```

## 📁 Test Structure

```
test/
├── unit/              # 175 specs
│   ├── domain/
│   │   ├── value-objects/
│   │   ├── entities/
│   │   ├── services/
│   │   └── specifications/
│   ├── application/
│   │   ├── services/
│   │   ├── commands/
│   │   └── mappers/
│   └── infrastructure/
├── e2e/               # 30 specs
│   ├── cart.e2e-spec.ts
│   ├── guest-cart.e2e-spec.ts
│   └── ...
├── fixtures/          # Test data
├── jest-env-setup.ts
├── jest-global-setup.ts
└── jest-after-env.ts
```

## 🎯 Unit Test Patterns

### VO Test

```typescript
describe('CartIdVO', () => {
  it('should create valid UUID', () => {
    const vo = CartIdVO.create('7c9e6679-7425-40de-944b-e07fc1f90ae7');
    expect(vo.value).toBe('7c9e6679-7425-40de-944b-e07fc1f90ae7');
  });
  
  it('should reject invalid UUID', () => {
    expect(() => CartIdVO.create('invalid')).toThrow(ValidationError);
  });
});
```

### Entity Test (State Machine)

```typescript
describe('CartEntity', () => {
  it('should transition active → abandoned', () => {
    const cart = CartEntity.create({...});
    cart.abandon();
    expect(cart.status.value).toBe('abandoned');
  });
  
  it('should reject invalid transition', () => {
    const cart = CartEntity.create({...});
    cart.clear();
    expect(() => cart.abandon()).toThrow(InvalidCartStatusTransitionError);
  });
});
```

## 🎯 E2E Test Patterns

### Degraded Mode (Termux)

```typescript
it('should handle DB unavailable', async () => {
  const res = await request(app).get('/health');
  expect([200, 503]).toContain(res.status);
});
```

## 📊 Coverage Report

**Target:** 96%+ statements, 85%+ branches

```bash
pnpm test:cov
# Statements   : 96.35% (1614/1675)
# Branches     : 85.99% (522/607)
# Functions    : 98.42% (689/700)
# Lines        : 96.38% (1571/1630)
```

## 🎯 Common Pitfalls

| ❌ Problem | ✅ Solution |
|-----------|-----------|
| Wrong path depth | Use `@domain/*` alias |
| Missing `.js` extension | Always add `.js` |
| Invalid UUID | Use patterned UUIDs |
| Missing env vars | Setup in `jest-env-setup.ts` |
| Async leaks | Use `--detectOpenHandles` |

## 🔧 Test Generators

```bash
pnpm generate:e2e        # Auto-generate E2E specs
pnpm generate:inmemory   # InMemory repos for tests
```

## 🎯 CI/CD Integration

```yaml
- name: Tests
  env:
    DB_MODE: memory
  run: pnpm test --coverage
```
