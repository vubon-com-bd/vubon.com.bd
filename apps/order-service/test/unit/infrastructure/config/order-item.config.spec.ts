import { ORDER_ITEM_CONFIG } from '../../../../src/module/infrastructure/config/order-item.config.js';
import { ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';

describe('ORDER_ITEM_CONFIG', () => {
  it('exposes MAX_QUANTITY', () => {
    expect(ORDER_ITEM_CONFIG.MAX_QUANTITY).toBe(ORDER_ITEM_LIMIT.MAX_QUANTITY);
  });

  it('exposes MIN_QUANTITY', () => {
    expect(ORDER_ITEM_CONFIG.MIN_QUANTITY).toBe(ORDER_ITEM_LIMIT.MIN_QUANTITY);
  });

  it('frozen', () => {
    expect(Object.isFrozen(ORDER_ITEM_CONFIG)).toBe(true);
  });
});
