import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('ORDER_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values when env vars not set', async () => {
    delete process.env['ORDER_SERVICE_ORDER_ENABLED'];
    delete process.env['ORDER_SERVICE_AUTO_CONFIRM'];
    delete process.env['ORDER_SERVICE_MAX_ITEMS'];
    delete process.env['ORDER_SERVICE_DEFAULT_CURRENCY'];

    const { ORDER_CONFIG } = await import('@infrastructure/config/order.config');
    expect(ORDER_CONFIG.enabled).toBe(true);
    expect(ORDER_CONFIG.autoConfirm).toBe(false);
    expect(ORDER_CONFIG.autoCancelHours).toBe(48);
    expect(ORDER_CONFIG.maxItemsPerOrder).toBe(100);
    expect(ORDER_CONFIG.defaultCurrency).toBe('BDT');
    expect(ORDER_CONFIG.allowGuestOrder).toBe(true);
  });

  it('respects env var overrides', async () => {
    process.env['ORDER_SERVICE_ORDER_ENABLED'] = 'false';
    process.env['ORDER_SERVICE_AUTO_CONFIRM'] = 'true';
    process.env['ORDER_SERVICE_MAX_ITEMS'] = '50';
    process.env['ORDER_SERVICE_DEFAULT_CURRENCY'] = 'USD';

    const { ORDER_CONFIG } = await import('@infrastructure/config/order.config');
    expect(ORDER_CONFIG.enabled).toBe(false);
    expect(ORDER_CONFIG.autoConfirm).toBe(true);
    expect(ORDER_CONFIG.maxItemsPerOrder).toBe(50);
    expect(ORDER_CONFIG.defaultCurrency).toBe('USD');
  });

  it('is frozen (immutable)', async () => {
    const mod = await import('@infrastructure/config/order.config');
    expect(Object.isFrozen(mod.ORDER_CONFIG)).toBe(true);
  });
});
