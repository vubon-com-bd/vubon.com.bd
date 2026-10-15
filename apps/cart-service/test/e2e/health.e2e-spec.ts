/**
 * E2E — Bootstrap smoke test
 * No NestJS app — domain-layer E2E.
 */
import { describe, it, expect } from '@jest/globals';

describe('E2E — Bootstrap smoke', () => {
  it('test environment is set', () => {
    expect(process.env.NODE_ENV).toBe('test');
  });

  it('cart service module is reachable', async () => {
    const mod = await import('@domain/entities/cart.entity.js');
    expect(mod.CartEntity).toBeDefined();
  });

  it('all core services are importable', async () => {
    const services = await Promise.all([
      import('@domain/services/cart-calculation.service.js'),
      import('@domain/services/cart-validation.service.js'),
      import('@domain/services/coupon-validation.service.js'),
      import('@domain/services/voucher-validation.service.js'),
      import('@domain/services/cart-eligibility.service.js'),
      import('@domain/services/cart-merge.service.js'),
      import('@domain/services/abandoned-cart-detector.service.js'),
      import('@domain/services/cart-limits.service.js'),
      import('@domain/services/price-sync.service.js'),
      import('@domain/services/stock-check.service.js'),
    ]);
    expect(services).toHaveLength(10);
  });
});
