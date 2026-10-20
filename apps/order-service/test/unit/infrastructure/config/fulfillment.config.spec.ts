import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('FULFILLMENT_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { FULFILLMENT_CONFIG } = await import(
      '@infrastructure/config/fulfillment.config.js'
    );
    expect(FULFILLMENT_CONFIG.enabled).toBe(true);
    expect(FULFILLMENT_CONFIG.autoFulfill).toBe(false);
    expect(FULFILLMENT_CONFIG.allowPartial).toBe(true);
    expect(FULFILLMENT_CONFIG.notifyCustomer).toBe(true);
    expect(FULFILLMENT_CONFIG.maxItemsPerShipment).toBe(50);
    expect(FULFILLMENT_CONFIG.slaHours).toBe(48);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_FULFILLMENT_AUTO'] = 'true';
    process.env['ORDER_SERVICE_FULFILLMENT_SLA_HOURS'] = '24';
    const { FULFILLMENT_CONFIG } = await import(
      '@infrastructure/config/fulfillment.config.js'
    );
    expect(FULFILLMENT_CONFIG.autoFulfill).toBe(true);
    expect(FULFILLMENT_CONFIG.slaHours).toBe(24);
  });

  it('is frozen', async () => {
    const { FULFILLMENT_CONFIG } = await import(
      '@infrastructure/config/fulfillment.config.js'
    );
    expect(Object.isFrozen(FULFILLMENT_CONFIG)).toBe(true);
  });
});
