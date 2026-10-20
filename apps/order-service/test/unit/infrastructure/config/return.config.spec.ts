import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('RETURN_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { RETURN_CONFIG } = await import(
      '@infrastructure/config/return.config.js'
    );
    expect(RETURN_CONFIG.enabled).toBe(true);
    expect(RETURN_CONFIG.windowDays).toBe(7);
    expect(RETURN_CONFIG.maxDaysAfterDelivery).toBe(30);
    expect(RETURN_CONFIG.pickupWindowDays).toBe(3);
    expect(RETURN_CONFIG.inspectionDays).toBe(2);
    expect(RETURN_CONFIG.refundProcessingDays).toBe(7);
    expect(RETURN_CONFIG.restockFeePercent).toBe(0);
    expect(RETURN_CONFIG.freeReturn).toBe(true);
    expect(RETURN_CONFIG.maxImages).toBe(5);
    expect(RETURN_CONFIG.maxReasonLength).toBe(1000);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_RETURN_WINDOW_DAYS'] = '14';
    process.env['ORDER_SERVICE_RETURN_FREE'] = 'false';
    const { RETURN_CONFIG } = await import(
      '@infrastructure/config/return.config.js'
    );
    expect(RETURN_CONFIG.windowDays).toBe(14);
    expect(RETURN_CONFIG.freeReturn).toBe(false);
  });

  it('is frozen', async () => {
    const { RETURN_CONFIG } = await import(
      '@infrastructure/config/return.config.js'
    );
    expect(Object.isFrozen(RETURN_CONFIG)).toBe(true);
  });
});
