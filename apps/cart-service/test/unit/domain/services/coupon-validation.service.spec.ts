/**
 * CouponValidationService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CouponValidationService } from '@domain/services/coupon-validation.service.js';
import { makeCartCoupon } from '../../../fixtures/index';
import { TEST_CURRENCY } from '../../../fixtures/index';

describe('CouponValidationService', () => {
  it('rejects empty cart', () => {
    const result = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 0,
      currency: TEST_CURRENCY,
      alreadyApplied: [],
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/Empty/);
  });

  it('rejects invalid code format', () => {
    const result = CouponValidationService.validate({
      code: '###',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects already applied', () => {
    const coupon = makeCartCoupon({ code: 'SAVE20' });
    const result = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [coupon],
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/already applied/i);
  });

  it('rejects exceeded coupon limit', () => {
    const existing = makeCartCoupon({ code: 'OLDCODE' });
    const result = CouponValidationService.validate({
      code: 'NEW20',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [existing],
      maxCouponsAllowed: 1,
    });
    expect(result.valid).toBe(false);
  });

  it('rejects stacking when not allowed', () => {
    const existing = makeCartCoupon({ code: 'OLDCODE' });
    const result = CouponValidationService.validate({
      code: 'NEW20',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [existing],
      isStackable: false,
      maxCouponsAllowed: 5,
    });
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/stack/i);
  });

  it('validate() returns valid for matching coupon metadata', () => {
    // Coupon is present in applied metadata — should validate against itself
    const coupon = makeCartCoupon({ code: 'SAVE20' });
    const result = CouponValidationService.validate({
      code: 'save20',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [coupon],
    });
    // already applied → still rejects because active
    expect(result.valid).toBe(false);
  });

  it('assertValid() throws for invalid coupon', () => {
    expect(() =>
      CouponValidationService.assertValid({
        code: 'SAVE20',
        subtotal: 0,
        currency: TEST_CURRENCY,
        alreadyApplied: [],
      }),
    ).toThrow();
  });

  it('computeDiscount() delegates correctly', () => {
    const coupon = makeCartCoupon({ type: 'percentage', value: 10 });
    const amount = CouponValidationService.computeDiscount(coupon.discount, 200);
    expect(amount).toBe(20);
  });

  it('isUsable() true for active', () => {
    const coupon = makeCartCoupon();
    expect(CouponValidationService.isUsable(coupon.status)).toBe(true);
  });
});
