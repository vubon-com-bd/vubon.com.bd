/**
 * CouponDiscountVO — Unit Tests
 */
import { CouponDiscountVO } from '../../../../../src/module/domain/value-objects/primitives/coupon-discount.vo.js';

describe('CouponDiscountVO', () => {
  describe('create()', () => {
    it('creates VO with amount and currency', () => {
      const vo = CouponDiscountVO.create(100, 'BDT');
      expect(vo.amount).toBe(100);
      expect(vo.currency).toBe('BDT');
    });

    it('rounds to 2 decimals', () => {
      const vo = CouponDiscountVO.create(99.999, 'BDT');
      expect(vo.amount).toBe(100);
    });

    it('accepts zero amount', () => {
      const vo = CouponDiscountVO.create(0, 'BDT');
      expect(vo.amount).toBe(0);
    });

    it('throws on negative amount', () => {
      expect(() => CouponDiscountVO.create(-1, 'BDT')).toThrow();
    });

    it('throws on NaN', () => {
      expect(() => CouponDiscountVO.create(NaN, 'BDT')).toThrow();
    });

    it('throws on Infinity', () => {
      expect(() => CouponDiscountVO.create(Infinity, 'BDT')).toThrow();
    });

    it('throws on empty currency', () => {
      expect(() => CouponDiscountVO.create(100, '' as never)).toThrow();
    });

    it('throws on non-string currency', () => {
      expect(() => CouponDiscountVO.create(100, null as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CouponDiscountVO.reconstitute({ amount: -5, currency: 'BDT' });
      expect(vo.amount).toBe(-5);
    });
  });

  describe('zero()', () => {
    it('creates zero-amount VO', () => {
      const vo = CouponDiscountVO.zero('USD');
      expect(vo.amount).toBe(0);
      expect(vo.currency).toBe('USD');
    });
  });

  describe('isZero()', () => {
    it('true for zero amount', () => {
      expect(CouponDiscountVO.zero('BDT').isZero()).toBe(true);
    });

    it('false for positive amount', () => {
      expect(CouponDiscountVO.create(100, 'BDT').isZero()).toBe(false);
    });
  });

  describe('capAt()', () => {
    it('caps discount to max amount', () => {
      const vo = CouponDiscountVO.create(500, 'BDT');
      const capped = vo.capAt(200);
      expect(capped.amount).toBe(200);
    });

    it('keeps amount when below cap', () => {
      const vo = CouponDiscountVO.create(100, 'BDT');
      const capped = vo.capAt(200);
      expect(capped.amount).toBe(100);
    });

    it('throws on negative cap', () => {
      const vo = CouponDiscountVO.create(100, 'BDT');
      expect(() => vo.capAt(-1)).toThrow();
    });
  });

  describe('validateAgainst()', () => {
    it('passes when discount <= subtotal', () => {
      const vo = CouponDiscountVO.create(100, 'BDT');
      expect(() => vo.validateAgainst(200)).not.toThrow();
    });

    it('passes when discount == subtotal', () => {
      const vo = CouponDiscountVO.create(100, 'BDT');
      expect(() => vo.validateAgainst(100)).not.toThrow();
    });

    it('throws when discount > subtotal', () => {
      const vo = CouponDiscountVO.create(300, 'BDT');
      expect(() => vo.validateAgainst(200)).toThrow();
    });
  });

  describe('add()', () => {
    it('adds two discounts of same currency', () => {
      const a = CouponDiscountVO.create(100, 'BDT');
      const b = CouponDiscountVO.create(50, 'BDT');
      expect(a.add(b).amount).toBe(150);
    });

    it('throws when currencies differ', () => {
      const a = CouponDiscountVO.create(100, 'BDT');
      const b = CouponDiscountVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow();
    });
  });

  describe('subtract()', () => {
    it('subtracts two discounts of same currency', () => {
      const a = CouponDiscountVO.create(100, 'BDT');
      const b = CouponDiscountVO.create(30, 'BDT');
      expect(a.subtract(b).amount).toBe(70);
    });

    it('throws when currencies differ', () => {
      const a = CouponDiscountVO.create(100, 'BDT');
      const b = CouponDiscountVO.create(50, 'USD');
      expect(() => a.subtract(b)).toThrow();
    });
  });
});
