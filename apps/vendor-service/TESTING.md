# Testing — Vendor Service

## Commands
pnpm test              All tests
pnpm test:unit         Unit tests
pnpm test:e2e:custom   E2E tests
pnpm test:cov          Coverage

## Structure
test/
  unit/domain/value-objects/
  unit/domain/entities/
  unit/domain/services/
  unit/application/services/
  e2e/*.e2e-spec.ts

## Unit Patterns

VO:
  const vo = VendorIdVO.create('550e8400-e29b-41d4-a716-446655440000');
  expect(vo.value).toBe('...');
  expect(() => VendorIdVO.create('')).toThrow(ValidationError);

Entity:
  expect(() => entity.activate()).toThrow(BusinessRuleError);

Service:
  const result = VendorSlugService.generate({ name: 'Acme', existingSlugs: ['acme'] });
  expect(result.slug.value).toBe('acme-2');

## E2E Pattern
const res = await request(app.getHttpServer())
  .post('/vendors')
  .set('Authorization', 'Bearer ' + token)
  .send({...})
  .expect(201);

## Coverage Targets
Lines: 70%, Functions: 70%, Branches: 60%

## Common Pitfalls
- Wrong path depth (use ../../../../src/)
- Missing .js extension in ESM imports
- Invalid UUIDs (use fixed UUIDs)
- Missing env vars (test/jest-env-setup.ts)
