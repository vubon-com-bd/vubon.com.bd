import { describe, it, expect } from '@jest/globals';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';

describe('CouponDiscountVO — extended', () => {
  it('accesses all getters', () => {
    const vo = CouponDiscountVO.create({
      type: 'percentage',
      value: 20,
      maxAmount: 50,
    });
    expect(vo.type).toBe('percentage');
    expect(vo.value_).toBe(20);
    expect(vo.maxAmount).toBe(50);
    expect(vo.isPercentage()).toBe(true);
    expect(vo.isFixed()).toBe(false);
  });

  it('fixed type getters', () => {
    const vo = CouponDiscountVO.create({ type: 'fixed', value: 100 });
    expect(vo.type).toBe('fixed');
    expect(vo.maxAmount).toBeUndefined();
    expect(vo.isFixed()).toBe(true);
  });
});
