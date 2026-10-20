import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

describe('TRACKING_CONFIG', () => {
  let originalEnv: NodeJS.ProcessEnv;
  beforeEach(() => {
    originalEnv = { ...process.env };
    jest.resetModules();
  });
  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads default values', async () => {
    const { TRACKING_CONFIG } = await import(
      '@infrastructure/config/tracking.config.js'
    );
    expect(TRACKING_CONFIG.enabled).toBe(true);
    expect(TRACKING_CONFIG.refreshIntervalSeconds).toBe(300);
    expect(TRACKING_CONFIG.historyRetentionDays).toBe(365);
    expect(TRACKING_CONFIG.notifyOnUpdate).toBe(true);
    expect(TRACKING_CONFIG.trackLocation).toBe(true);
    expect(TRACKING_CONFIG.trackByPhone).toBe(true);
  });

  it('respects env overrides', async () => {
    process.env['ORDER_SERVICE_TRACKING_REFRESH_SEC'] = '60';
    process.env['ORDER_SERVICE_TRACKING_NOTIFY'] = 'false';
    const { TRACKING_CONFIG } = await import(
      '@infrastructure/config/tracking.config.js'
    );
    expect(TRACKING_CONFIG.refreshIntervalSeconds).toBe(60);
    expect(TRACKING_CONFIG.notifyOnUpdate).toBe(false);
  });

  it('is frozen', async () => {
    const { TRACKING_CONFIG } = await import(
      '@infrastructure/config/tracking.config.js'
    );
    expect(Object.isFrozen(TRACKING_CONFIG)).toBe(true);
  });
});
