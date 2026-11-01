import { describe, it, expect } from '@jest/globals';
import { CartVO } from '@domain/value-objects/composites/cart.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '@domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartVO.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      status: CartStatusVO.active(),
      type: CartTypeVO.user(),
      itemCount: 3,
      currency: TEST_CURRENCY,
      createdAt: TEST_DATES.YESTERDAY,
      updatedAt: TEST_DATES.NOW,
    });

    expect(vo.id.value).toBe(TEST_IDS.CART_ID);
    expect(vo.status.value).toBe('active');
    expect(vo.type.value).toBe('user');
    expect(vo.itemCount).toBe(3);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.createdAt).toBe(TEST_DATES.YESTERDAY);
    expect(vo.updatedAt).toBe(TEST_DATES.NOW);
    expect(vo.value.id).toBe(vo.id);
  });
});
