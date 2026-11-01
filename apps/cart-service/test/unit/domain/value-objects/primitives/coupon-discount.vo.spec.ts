/**
 * CouponDiscountVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CouponDiscountVO', () => {
  describe('create()', () => {
    it('accepts percentage', () => {
      const vo = CouponDiscountVO.create({ type: 'percentage', value: 20 });
      expect(vo.isPercentage()).toBe(true);
    });

    it('accepts fixed', () => {
      const vo = CouponDiscountVO.create({ type: 'fixed', value: 50 });
      expect(vo.isFixed()).toBe(true);
    });

    it('rejects percentage > 100', () => {
      expect(() =>
        CouponDiscountVO.create({ type: 'percentage', value: 150 }),
      ).toThrow(ValidationError);
    });

    it('rejects negative value', () => {
      expect(() =>
        CouponDiscountVO.create({ type: 'fixed', value: -10 }),
      ).toThrow(ValidationError);
    });

    it('rejects invalid type', () => {
      expect(() =>
        CouponDiscountVO.create({ type: 'bogus' as 'fixed', value: 10 }),
      ).toThrow(ValidationError);
    });

    it('rejects negative maxAmount', () => {
      expect(() =>
        CouponDiscountVO.create({ type: 'fixed', value: 10, maxAmount: -5 }),
      ).toThrow(ValidationError);
    });
  });

  describe('calculate()', () => {
    it('percentage on subtotal', () => {
      const vo = CouponDiscountVO.create({ type: 'percentage', value: 10 });
      expect(vo.calculate(200)).toBe(20);
    });

    it('percentage clamps to maxAmount', () => {
      const vo = CouponDiscountVO.create({
        type: 'percentage',
        value: 50,
        maxAmount: 30,
      });
      expect(vo.calculate(200)).toBe(30);
    });

    it('fixed returns value', () => {
      const vo = CouponDiscountVO.create({ type: 'fixed', value: 40 });
      expect(vo.calculate(200)).toBe(40);
    });

    it('fixed clamps to subtotal', () => {
      const vo = CouponDiscountVO.create({ type: 'fixed', value: 500 });
      expect(vo.calculate(100)).toBe(100);
    });

    it('returns 0 for zero/negative subtotal', () => {
      const vo = CouponDiscountVO.create({ type: 'percentage', value: 10 });
      expect(vo.calculate(0)).toBe(0);
      expect(vo.calculate(-5)).toBe(0);
    });

    it('rounds to 2 decimals', () => {
      const vo = CouponDiscountVO.create({ type: 'percentage', value: 33 });
      expect(vo.calculate(99.99)).toBe(33);
    });
  });
});
