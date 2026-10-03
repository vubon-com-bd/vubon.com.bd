import { DELIVERY_CONFIG } from '../../../../src/module/infrastructure/config/delivery.config.js';
import { DELIVERY } from '@vubon/shared-constants/logistics';

describe('DELIVERY_CONFIG', () => {
  it('exposes MAX_ATTEMPTS', () => {
    expect(DELIVERY_CONFIG.MAX_ATTEMPTS).toBe(DELIVERY.MAX_ATTEMPTS);
  });

  it('exposes ATTEMPT_INTERVAL_HOURS', () => {
    expect(DELIVERY_CONFIG.ATTEMPT_INTERVAL_HOURS).toBe(DELIVERY.ATTEMPT_INTERVAL_HOURS);
  });

  it('frozen', () => {
    expect(Object.isFrozen(DELIVERY_CONFIG)).toBe(true);
  });
});
