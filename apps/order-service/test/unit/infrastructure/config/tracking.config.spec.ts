import { TRACKING_CONFIG } from '../../../../src/module/infrastructure/config/tracking.config.js';
import { ORDER_TRACKING } from '@vubon/shared-constants/business/order';

describe('TRACKING_CONFIG', () => {
  it('exposes REFRESH_INTERVAL_SECONDS', () => {
    expect(TRACKING_CONFIG.REFRESH_INTERVAL_SECONDS).toBe(
      ORDER_TRACKING.REFRESH_INTERVAL_SECONDS,
    );
  });

  it('frozen', () => {
    expect(Object.isFrozen(TRACKING_CONFIG)).toBe(true);
  });
});
