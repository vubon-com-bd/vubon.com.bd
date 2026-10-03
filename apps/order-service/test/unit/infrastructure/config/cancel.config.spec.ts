import { CANCEL_CONFIG } from '../../../../src/module/infrastructure/config/cancel.config.js';
import { ORDER_CANCEL } from '@vubon/shared-constants/business/order';

describe('CANCEL_CONFIG', () => {
  it('exposes WINDOW_HOURS', () => {
    expect(CANCEL_CONFIG.WINDOW_HOURS).toBe(ORDER_CANCEL.WINDOW_HOURS);
  });

  it('exposes AUTO_APPROVE flag', () => {
    expect(typeof CANCEL_CONFIG.AUTO_APPROVE).toBe('boolean');
  });

  it('frozen', () => {
    expect(Object.isFrozen(CANCEL_CONFIG)).toBe(true);
  });
});
