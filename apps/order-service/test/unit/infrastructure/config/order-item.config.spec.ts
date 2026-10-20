import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('ORDER_ITEM_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { ORDER_ITEM_CONFIG } = await import(
      '@infrastructure/config/order-item.config.js'
    );
    expect(ORDER_ITEM_CONFIG.enabled).toBe(true);
    expect(ORDER_ITEM_CONFIG.minQuantity).toBe(1);
    expect(ORDER_ITEM_CONFIG.maxQuantity).toBe(999);
    expect(ORDER_ITEM_CONFIG.maxNotesLength).toBe(500);
    expect(ORDER_ITEM_CONFIG.maxSkuLength).toBe(64);
    expect(ORDER_ITEM_CONFIG.allowOutOfStock).toBe(false);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_ORDER_ITEM_ENABLED'] = 'false';
    process.env['ORDER_SERVICE_ITEM_MAX_QTY'] = '500';
    const { ORDER_ITEM_CONFIG } = await import(
      '@infrastructure/config/order-item.config.js'
    );
    expect(ORDER_ITEM_CONFIG.enabled).toBe(false);
    expect(ORDER_ITEM_CONFIG.maxQuantity).toBe(500);
  });

  it('is frozen', async () => {
    const { ORDER_ITEM_CONFIG } = await import(
      '@infrastructure/config/order-item.config.js'
    );
    expect(Object.isFrozen(ORDER_ITEM_CONFIG)).toBe(true);
  });
});
