import { describe, it, expect } from '@jest/globals';
import { CartCouponVO } from '@domain/value-objects/composites/cart-coupon.vo.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_DATES } from '../../../../fixtures/index.js';

describe('CartCouponVO', () => {
  const makeProps = () => ({
    code: CouponCodeVO.create('SAVE20'),
    status: CouponStatusVO.active(),
    discount: CouponDiscountVO.create({ type: 'percentage', value: 20 }),
    minOrderAmount: 100,
    appliedAt: TEST_DATES.NOW,
    expiresAt: TEST_DATES.NEXT_MONTH,
  });

  it('create() works', () => {
    const vo = CartCouponVO.create(makeProps());
    expect(vo.isUsable()).toBe(true);
    expect(vo.meetsMinOrder(150)).toBe(true);
    expect(vo.meetsMinOrder(50)).toBe(false);
  });

  it('isExpired()', () => {
    const vo = CartCouponVO.create(makeProps());
    expect(vo.isExpired()).toBe(false);
  });

  it('throws on negative minOrderAmount', () => {
    expect(() => CartCouponVO.create({ ...makeProps(), minOrderAmount: -1 })).toThrow(ValidationError);
  });
});
