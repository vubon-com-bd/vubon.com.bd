# 🧪 Vubon.com.bd — Testing Guide

## Overview

- **Framework:** Jest
- **Strategy:** Unit + Integration + E2E
- **Coverage target:** 80%+

---

## Commands (per service)

    cd apps/identity-service

    pnpm test           # unit tests
    pnpm test:watch     # watch mode
    pnpm test:cov       # coverage report
    pnpm test:e2e       # end-to-end
    pnpm type-check     # TypeScript only

---

## Test Organization

    apps/<service>/test/
    ├── unit/
    │   ├── domain/
    │   │   ├── entities/
    │   │   ├── value-objects/
    │   │   └── services/
    │   ├── application/
    │   │   ├── commands/
    │   │   ├── queries/
    │   │   └── sagas/
    │   └── infrastructure/
    ├── integration/
    │   ├── repositories/
    │   └── controllers/
    └── e2e/
        └── <feature>.e2e-spec.ts

---

## Unit Tests

### Domain entity

    describe('Order', () => {
      it('cannot be cancelled after shipment', () => {
        const order = createOrder({ status: 'shipped' });
        expect(() => order.cancel()).toThrow(BusinessRuleError);
      });
    });

### Value object

    describe('PriceAmount', () => {
      it('rejects negative', () => {
        expect(() => PriceAmount.create(-1)).toThrow(ValidationError);
      });
    });

### Command handler

    describe('CreateOrderHandler', () => {
      it('creates order with items', async () => {
        const handler = new CreateOrderHandler(mockService);
        const result = await handler.execute(cmd);
        expect(result.orderNumber).toMatch(/^ORD-/);
      });
    });

---

## Integration Tests

### Repository (Prisma / Memory)

    describe('OrderRepository', () => {
      it('persists and retrieves', async () => {
        const saved = await repo.save(entity);
        const found = await repo.findById(saved.id);
        expect(found.id).toBe(saved.id);
      });
    });

---

## E2E Tests

### HTTP endpoints

    describe('POST /orders (e2e)', () => {
      it('creates order', async () => {
        const res = await request(app.getHttpServer())
          .post('/orders')
          .set('Authorization', `Bearer ${token}`)
          .send({ customerId, items: [...], shippingAddress: {...} })
          .expect(201);
        expect(res.body.orderId).toBeDefined();
      });
    });

---

## Mocking

### Domain

    const order = {
      id: 'ord-1',
      cancel: jest.fn(),
      addDomainEvent: jest.fn(),
    } as unknown as Order;

### Repository

    const repo = {
      save: jest.fn().mockResolvedValue(entity),
      findById: jest.fn().mockResolvedValue(entity),
    } as unknown as OrderRepository;

### External client

    const client = {
      getById: jest.fn().mockResolvedValue({ id: 'p-1', price: 1500 }),
    } as unknown as ProductClient;

---

## Coverage

    pnpm test:cov

    # Output
    PASS apps/identity-service/test/unit/...
    ----------|---------|----------|---------|---------|
    File      | % Stmts | % Branch | % Funcs | % Lines |
    ----------|---------|----------|---------|---------|
    All files |   87.82 |    82.14 |   89.20 |   87.82 |
    ----------|---------|----------|---------|---------|

---

## CI (GitHub Actions)

Workflows:
- `.github/workflows/ci.yml` — lint + build + unit tests
- `.github/workflows/test.yml` — full test suite
- `.github/workflows/e2e.yml` — E2E with services
- `.github/workflows/codeql.yml` — security scan

On every push:
1. Install deps
2. Type check
3. Lint
4. Unit tests
5. Build
6. E2E (on PR)
7. Coverage upload

---

## Load Testing

    npm install -g autocannon

    # Health (baseline)
    autocannon -c 20 -d 10 http://localhost:3001/api/v1/health

    # Login (POST)
    autocannon -c 20 -d 10 -m POST \
      -H "Content-Type: application/json" \
      -b '{"identifier":"test@x.com","password":"Test@12345"}' \
      http://localhost:3001/api/v1/auth/login

    # Product list (auth)
    autocannon -c 20 -d 10 \
      -H "Authorization: Bearer $TOKEN" \
      http://localhost:3002/products

### Termux results

| Endpoint | Concurrency | Req/sec | Avg | Status |
|----------|:-----------:|--------:|----:|:------:|
| Health | 20 | 544 | 36ms | ✅ |
| Login | 20 | 63 | 311ms | ✅ |
| Product List | 20 | 320 | 62ms | ✅ |
| Health | 100 | 591 | 1197ms | ⚠️ |

Termux bottleneck: ~600 req/sec @ 100 concurrent.
VPS projection: 2-5x faster.

---

## Test Philosophy

1. **Test behavior, not implementation**
2. **Domain = pure unit tests** (no mocks needed)
3. **Application = mocked repos**
4. **Infrastructure = integration tests**
5. **E2E = real services**
6. **Fail fast** — CI blocks merge on test fail
