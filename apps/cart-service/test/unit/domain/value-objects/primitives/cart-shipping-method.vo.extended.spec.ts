/**
 * CartShippingMethodVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartShippingMethodVO — extended', () => {
  it.each(['standard', 'express', 'same_day', 'pickup', 'international'])(
    'accepts %s',
    (m) => expect(CartShippingMethodVO.create(m).value).toBe(m),
  );

  it('throws on invalid', () => {
    expect(() => CartShippingMethodVO.create('bogus')).toThrow(ValidationError);
  });

  it('standard() factory', () => {
    expect(CartShippingMethodVO.standard().value).toBe('standard');
  });

  it('all predicates', () => {
    expect(CartShippingMethodVO.standard().isStandard()).toBe(true);
    expect(CartShippingMethodVO.create('express').isExpress()).toBe(true);
    expect(CartShippingMethodVO.create('same_day').isSameDay()).toBe(true);
    expect(CartShippingMethodVO.create('pickup').isPickup()).toBe(true);
    expect(CartShippingMethodVO.create('international').isInternational()).toBe(true);
  });

  it('isFreeEligible() only for pickup', () => {
    expect(CartShippingMethodVO.create('pickup').isFreeEligible()).toBe(true);
    expect(CartShippingMethodVO.standard().isFreeEligible()).toBe(false);
  });
});
