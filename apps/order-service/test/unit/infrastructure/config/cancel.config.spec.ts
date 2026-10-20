import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('CANCEL_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { CANCEL_CONFIG } = await import(
      '@infrastructure/config/cancel.config.js'
    );
    expect(CANCEL_CONFIG.enabled).toBe(true);
    expect(CANCEL_CONFIG.windowHours).toBe(24);
    expect(CANCEL_CONFIG.allowAfterShipment).toBe(false);
    expect(CANCEL_CONFIG.autoApprove).toBe(true);
    expect(CANCEL_CONFIG.refundAuto).toBe(true);
    expect(CANCEL_CONFIG.restockInventory).toBe(true);
    expect(CANCEL_CONFIG.maxReasonLength).toBe(500);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_CANCEL_WINDOW_HOURS'] = '48';
    process.env['ORDER_SERVICE_CANCEL_ALLOW_AFTER_SHIP'] = 'true';
    const { CANCEL_CONFIG } = await import(
      '@infrastructure/config/cancel.config.js'
    );
    expect(CANCEL_CONFIG.windowHours).toBe(48);
    expect(CANCEL_CONFIG.allowAfterShipment).toBe(true);
  });

  it('is frozen', async () => {
    const { CANCEL_CONFIG } = await import(
      '@infrastructure/config/cancel.config.js'
    );
    expect(Object.isFrozen(CANCEL_CONFIG)).toBe(true);
  });
});
