/**
 * ORDER_CONFIG — env-default behavior
 */
import { ORDER_CONFIG } from '../../../../src/module/infrastructure/config/order.config.js';
import { ORDER_LIMIT } from '@vubon/shared-constants/business/order';

describe('ORDER_CONFIG', () => {
  it('exposes numeric limits', () => {
    expect(typeof ORDER_CONFIG.MAX_ITEMS).toBe('number');
    expect(typeof ORDER_CONFIG.MIN_AMOUNT).toBe('number');
    expect(typeof ORDER_CONFIG.MAX_AMOUNT).toBe('number');
  });

  it('falls back to ORDER_LIMIT defaults', () => {
    expect(ORDER_CONFIG.MAX_ITEMS).toBe(ORDER_LIMIT.MAX_ITEMS);
    expect(ORDER_CONFIG.MIN_AMOUNT).toBe(ORDER_LIMIT.MIN_AMOUNT);
    expect(ORDER_CONFIG.MAX_AMOUNT).toBe(ORDER_LIMIT.MAX_AMOUNT);
  });

  it('exposes boolean flags', () => {
    expect(typeof ORDER_CONFIG.ALLOW_GUEST_ORDER).toBe('boolean');
  });

  it('is frozen (immutable)', () => {
    expect(Object.isFrozen(ORDER_CONFIG)).toBe(true);
  });
});
