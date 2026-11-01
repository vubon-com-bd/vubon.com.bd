import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('DELIVERY_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { DELIVERY_CONFIG } = await import(
      '@infrastructure/config/delivery.config.js'
    );
    expect(DELIVERY_CONFIG.enabled).toBe(true);
    expect(DELIVERY_CONFIG.defaultProvider).toBe('internal');
    expect(DELIVERY_CONFIG.retryMaxAttempts).toBe(3);
    expect(DELIVERY_CONFIG.retryBackoffMs).toBe(5000);
    expect(DELIVERY_CONFIG.rescheduleWindowHours).toBe(24);
    expect(DELIVERY_CONFIG.trackingRefreshSeconds).toBe(300);
    expect(DELIVERY_CONFIG.notifOnUpdate).toBe(true);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_DELIVERY_PROVIDER'] = 'pathao';
    process.env['ORDER_SERVICE_DELIVERY_RETRY_ATTEMPTS'] = '5';
    const { DELIVERY_CONFIG } = await import(
      '@infrastructure/config/delivery.config.js'
    );
    expect(DELIVERY_CONFIG.defaultProvider).toBe('pathao');
    expect(DELIVERY_CONFIG.retryMaxAttempts).toBe(5);
  });

  it('is frozen', async () => {
    const { DELIVERY_CONFIG } = await import(
      '@infrastructure/config/delivery.config.js'
    );
    expect(Object.isFrozen(DELIVERY_CONFIG)).toBe(true);
  });
});
