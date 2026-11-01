import { describe, it, expect } from '@jest/globals';
import { CartShippingVO } from '@domain/value-objects/composites/cart-shipping.vo.js';
import { CartShippingIdVO } from '@domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';
import { TEST_IDS, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartShippingVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartShippingVO.create({
      id: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
      method: CartShippingMethodVO.standard(),
      cost: 50,
      currency: TEST_CURRENCY,
      freeAbove: 500,
      estimatedDays: 3,
    });

    expect(vo.id.value).toBe(TEST_IDS.SHIPPING_ID);
    expect(vo.method.isStandard()).toBe(true);
    expect(vo.cost).toBe(50);
    expect(vo.currency).toBe(TEST_CURRENCY);
    expect(vo.freeAbove).toBe(500);
    expect(vo.estimatedDays).toBe(3);
    expect(vo.isFree(500)).toBe(true);
    expect(vo.effectiveCost(100)).toBe(50);
  });

  it('no freeAbove returns cost>0', () => {
    const vo = CartShippingVO.create({
      id: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
      method: CartShippingMethodVO.standard(),
      cost: 50,
      currency: TEST_CURRENCY,
    });
    expect(vo.freeAbove).toBeUndefined();
    expect(vo.estimatedDays).toBeUndefined();
    expect(vo.isFree(1000)).toBe(false);
  });

  it('zero cost → free always', () => {
    const vo = CartShippingVO.create({
      id: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
      method: CartShippingMethodVO.create('pickup'),
      cost: 0,
      currency: TEST_CURRENCY,
    });
    expect(vo.isFree(100)).toBe(true);
  });
});
