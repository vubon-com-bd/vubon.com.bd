import { describe, it, expect } from '@jest/globals';

describe('ORDER_INFRA_CONFIG (aggregate)', () => {
  it('includes all 8 sub-configs', async () => {
    const mod = await import(
      '@infrastructure/config/index.js'
    );
    const config = mod.ORDER_INFRA_CONFIG;

    expect(config).toHaveProperty('order');
    expect(config).toHaveProperty('orderItem');
    expect(config).toHaveProperty('checkout');
    expect(config).toHaveProperty('delivery');
    expect(config).toHaveProperty('cancel');
    expect(config).toHaveProperty('return');
    expect(config).toHaveProperty('fulfillment');
    expect(config).toHaveProperty('tracking');
  });

  it('is frozen (immutable)', async () => {
    const { ORDER_INFRA_CONFIG } = await import(
      '@infrastructure/config/index.js'
    );
    expect(Object.isFrozen(ORDER_INFRA_CONFIG)).toBe(true);
  });

  it('re-exports individual configs', async () => {
    const mod = await import(
      '@infrastructure/config/index.js'
    );
    expect(mod.ORDER_CONFIG).toBeDefined();
    expect(mod.ORDER_ITEM_CONFIG).toBeDefined();
    expect(mod.CHECKOUT_CONFIG).toBeDefined();
    expect(mod.DELIVERY_CONFIG).toBeDefined();
    expect(mod.CANCEL_CONFIG).toBeDefined();
    expect(mod.RETURN_CONFIG).toBeDefined();
    expect(mod.FULFILLMENT_CONFIG).toBeDefined();
    expect(mod.TRACKING_CONFIG).toBeDefined();
  });
});
