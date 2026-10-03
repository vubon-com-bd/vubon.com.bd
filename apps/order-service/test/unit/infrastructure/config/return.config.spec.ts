import { RETURN_CONFIG } from '../../../../src/module/infrastructure/config/return.config.js';
import { ORDER_RETURN } from '@vubon/shared-constants/business/order';

describe('RETURN_CONFIG', () => {
  it('exposes WINDOW_DAYS', () => {
    expect(RETURN_CONFIG.WINDOW_DAYS).toBe(ORDER_RETURN.WINDOW_DAYS);
  });

  it('exposes MAX_IMAGES', () => {
    expect(RETURN_CONFIG.MAX_IMAGES).toBe(ORDER_RETURN.MAX_IMAGES);
  });

  it('frozen', () => {
    expect(Object.isFrozen(RETURN_CONFIG)).toBe(true);
  });
});
