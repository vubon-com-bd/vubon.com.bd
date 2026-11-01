/**
 * CanApplyCouponSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanApplyCouponSpecification } from '@domain/specifications/can-apply-coupon.specification.js';
import { makeUserCart } from '../../../fixtures/index';

describe('CanApplyCouponSpecification', () => {
  it('satisfied with subtotal > 0', () => {
    const cart = makeUserCart();
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.isSatisfiedBy({
        cart,
        subtotal: 100,
        alreadyApplied: [],
        code: 'SAVE20',
      }),
    ).toBe(true);
  });

  it('rejects zero subtotal', () => {
    const cart = makeUserCart();
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.isSatisfiedBy({
        cart,
        subtotal: 0,
        alreadyApplied: [],
        code: 'SAVE20',
      }),
    ).toBe(false);
  });

  it('explain() gives reason', () => {
    const cart = makeUserCart();
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.explain({ cart, subtotal: 0, alreadyApplied: [], code: 'SAVE20' }),
    ).toMatch(/empty/i);
  });
});
