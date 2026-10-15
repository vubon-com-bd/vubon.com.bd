import { describe, it, expect } from '@jest/globals';
import { CartSummaryVO } from '@domain/value-objects/composites/cart-summary.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { TEST_IDS, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartSummaryVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartSummaryVO.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      status: CartStatusVO.active(),
      itemCount: 3,
      total: 300,
      currency: TEST_CURRENCY,
    });

    expect(vo.id.value).toBe(TEST_IDS.CART_ID);
    expect(vo.status.value).toBe('active');
    expect(vo.itemCount).toBe(3);
    expect(vo.total).toBe(300);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.isEmpty()).toBe(false);
    expect(vo.isActive()).toBe(true);
  });

  it('isEmpty for zero items', () => {
    const vo = CartSummaryVO.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      status: CartStatusVO.active(),
      itemCount: 0,
      total: 0,
      currency: TEST_CURRENCY,
    });
    expect(vo.isEmpty()).toBe(true);
  });
});
