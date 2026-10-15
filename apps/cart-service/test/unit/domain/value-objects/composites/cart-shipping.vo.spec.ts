import { describe, it, expect } from '@jest/globals';
import { CartShippingVO } from '@domain/value-objects/composites/cart-shipping.vo.js';
import { CartShippingIdVO } from '@domain/value-objects/primitives/cart-shipping-id.vo.js';
import { CartShippingMethodVO } from '@domain/value-objects/primitives/cart-shipping-method.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, TEST_CURRENCY } from '../../../../fixtures/index.js';

describe('CartShippingVO', () => {
  const makeProps = () => ({
    id: CartShippingIdVO.create(TEST_IDS.SHIPPING_ID),
    method: CartShippingMethodVO.standard(),
    cost: 50,
    currency: TEST_CURRENCY,
    freeAbove: 500,
    estimatedDays: 3,
  });

  it('create() works', () => {
    const vo = CartShippingVO.create(makeProps());
    expect(vo.cost).toBe(50);
    expect(vo.estimatedDays).toBe(3);
  });

  it('isFree() above threshold', () => {
    const vo = CartShippingVO.create(makeProps());
    expect(vo.isFree(500)).toBe(true);
    expect(vo.isFree(100)).toBe(false);
  });

  it('effectiveCost()', () => {
    const vo = CartShippingVO.create(makeProps());
    expect(vo.effectiveCost(500)).toBe(0);
    expect(vo.effectiveCost(100)).toBe(50);
  });

  it('throws on negative cost', () => {
    expect(() => CartShippingVO.create({ ...makeProps(), cost: -1 })).toThrow(ValidationError);
  });

  it('throws on negative freeAbove', () => {
    expect(() => CartShippingVO.create({ ...makeProps(), freeAbove: -1 })).toThrow(ValidationError);
  });

  it('throws on negative estimatedDays', () => {
    expect(() => CartShippingVO.create({ ...makeProps(), estimatedDays: -1 })).toThrow(ValidationError);
  });
});
