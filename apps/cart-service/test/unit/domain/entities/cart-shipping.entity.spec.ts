/**
 * CartShippingEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartShippingEntity } from '@domain/entities/cart-shipping.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartShippingIdVO } from '@domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartShippingEntity', () => {
  function make() {
    return CartShippingEntity.create({
      id: 'ssssssss-ssss-4sss-8sss-ssssssssssss',
      props: {
        cartId: CartIdVO.create(TEST_IDS.CART_ID),
        shippingId: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
        method: CartShippingMethodVO.standard(),
        cost: 50,
        currency: TEST_CURRENCY,
        freeAbove: 500,
      },
      now: TEST_DATES.NOW,
    });
  }

  it('isFree() with subtotal above threshold', () => {
    const s = make();
    expect(s.isFree(500)).toBe(true);
    expect(s.isFree(100)).toBe(false);
  });

  it('effectiveCost() returns 0 when free', () => {
    const s = make();
    expect(s.effectiveCost(500)).toBe(0);
    expect(s.effectiveCost(100)).toBe(50);
  });

  it('changeMethod() updates method', () => {
    const s = make();
    s.changeMethod(CartShippingMethodVO.create('express'), TEST_DATES.NOW);
    expect(s.method.isExpress()).toBe(true);
  });

  it('setCost() rejects negative', () => {
    const s = make();
    expect(() => s.setCost(-1, TEST_DATES.NOW)).toThrow(ValidationError);
  });

  it('hasAddress() reflects state', () => {
    const s = make();
    expect(s.hasAddress()).toBe(false);
  });
});
