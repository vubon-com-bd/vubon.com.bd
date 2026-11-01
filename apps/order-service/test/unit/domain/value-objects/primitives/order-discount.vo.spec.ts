/**
 * OrderDiscountVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderDiscountVO } from '@domain/primitives/order-discount.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderDiscountVO', () => {
  describe('create', () => {
    it('creates without code', () => {
      const vo = OrderDiscountVO.create(100, 'BDT');
      expect(vo.amount).toBe(100);
      expect(vo.currency).toBe('BDT');
      expect(vo.code).toBeUndefined();
    });
    it('creates with code', () => {
      expect(OrderDiscountVO.create(100, 'BDT', 'SAVE10').code).toBe('SAVE10');
    });
    it('rounds to 2 decimals', () => {
      expect(OrderDiscountVO.create(10.999, 'BDT').amount).toBe(11);
    });
    it('accepts zero', () => {
      expect(OrderDiscountVO.create(0, 'BDT').amount).toBe(0);
    });
    it('throws for negative amount', () => {
      expect(() => OrderDiscountVO.create(-1, 'BDT')).toThrow(ValidationError);
    });
    it('throws for non-finite', () => {
      expect(() => OrderDiscountVO.create(NaN, 'BDT')).toThrow(ValidationError);
      expect(() => OrderDiscountVO.create(Infinity, 'BDT')).toThrow(ValidationError);
    });
    it('throws for invalid currency', () => {
      expect(() => OrderDiscountVO.create(100, 'XYZ')).toThrow(ValidationError);
    });
  });

  describe('none factory', () => {
    it('creates zero discount', () => {
      const vo = OrderDiscountVO.none('BDT');
      expect(vo.amount).toBe(0);
      expect(vo.isApplied()).toBe(false);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = OrderDiscountVO.reconstitute({ amount: 999, currency: 'BDT' });
      expect(vo.amount).toBe(999);
    });
  });

  describe('isApplied', () => {
    it('true when amount > 0', () => {
      expect(OrderDiscountVO.create(1, 'BDT').isApplied()).toBe(true);
    });
    it('false when amount is 0', () => {
      expect(OrderDiscountVO.none('BDT').isApplied()).toBe(false);
    });
  });
});
