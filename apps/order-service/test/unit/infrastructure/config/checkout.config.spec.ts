import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('CHECKOUT_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { CHECKOUT_CONFIG } = await import(
      '@infrastructure/config/checkout.config.js'
    );
    expect(CHECKOUT_CONFIG.enabled).toBe(true);
    expect(CHECKOUT_CONFIG.sessionTtlMinutes).toBe(30);
    expect(CHECKOUT_CONFIG.autoAbandonMinutes).toBe(60);
    expect(CHECKOUT_CONFIG.requirePaymentMethod).toBe(true);
    expect(CHECKOUT_CONFIG.requireShippingMethod).toBe(true);
    expect(CHECKOUT_CONFIG.maxSessionsPerCustomer).toBe(5);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_CHECKOUT_ENABLED'] = 'false';
    process.env['ORDER_SERVICE_CHECKOUT_TTL_MIN'] = '45';
    const { CHECKOUT_CONFIG } = await import(
      '@infrastructure/config/checkout.config.js'
    );
    expect(CHECKOUT_CONFIG.enabled).toBe(false);
    expect(CHECKOUT_CONFIG.sessionTtlMinutes).toBe(45);
  });

  it('is frozen', async () => {
    const { CHECKOUT_CONFIG } = await import(
      '@infrastructure/config/checkout.config.js'
    );
    expect(Object.isFrozen(CHECKOUT_CONFIG)).toBe(true);
  });
});
