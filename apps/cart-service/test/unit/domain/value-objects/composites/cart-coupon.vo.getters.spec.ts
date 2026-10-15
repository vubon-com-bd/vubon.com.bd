import { describe, it, expect } from '@jest/globals';
import { CartCouponVO } from '@domain/value-objects/composites/cart-coupon.vo.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { TEST_DATES } from '../../../../fixtures/index.js';

describe('CartCouponVO — getters', () => {
  it('accesses all getters', () => {
    const vo = CartCouponVO.create({
      code: CouponCodeVO.create('SAVE20'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
      minOrderAmount: 100,
      appliedAt: TEST_DATES.NOW,
      expiresAt: TEST_DATES.NEXT_MONTH,
    });

    expect(vo.code.value).toBe('SAVE20');
    expect(vo.status.value).toBe('active');
    expect(vo.discount.isPercentage()).toBe(true);
    expect(vo.minOrderAmount).toBe(100);
    expect(vo.appliedAt).toBe(TEST_DATES.NOW);
    expect(vo.expiresAt).toBe(TEST_DATES.NEXT_MONTH);
  });

  it('minOrderAmount undefined works', () => {
    const vo = CartCouponVO.create({
      code: CouponCodeVO.create('SAVE20'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
      appliedAt: TEST_DATES.NOW,
      expiresAt: TEST_DATES.NEXT_MONTH,
    });
    expect(vo.minOrderAmount).toBeUndefined();
    expect(vo.meetsMinOrder(50)).toBe(true);
  });

  it('isExpired returns true for past expiry', () => {
    const vo = CartCouponVO.create({
      code: CouponCodeVO.create('SAVE20'),
      status: CouponStatusVO.active(),
      discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
      appliedAt: TEST_DATES.NOW,
      expiresAt: TEST_DATES.YESTERDAY,
    });
    expect(vo.isExpired()).toBe(true);
  });
});
