/**
 * OrderSubtotalVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { OrderSubtotalVO } from '@domain/primitives/order-subtotal.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('OrderSubtotalVO', () => {
  describe('create', () => {
    it('creates with amount + currency', () => {
      expect(OrderSubtotalVO.create(200, 'BDT').amount).toBe(200);
    });
    it('rounds to 2 decimals', () => {
      expect(OrderSubtotalVO.create(50.999, 'BDT').amount).toBe(51);
    });
    it('accepts zero', () => {
      expect(OrderSubtotalVO.create(0, 'BDT').amount).toBe(0);
    });
    it('throws for negative', () => {
      expect(() => OrderSubtotalVO.create(-1, 'BDT')).toThrow(ValidationError);
    });
    it('throws for non-finite', () => {
      expect(() => OrderSubtotalVO.create(NaN, 'BDT')).toThrow(ValidationError);
    });
    it('throws for invalid currency', () => {
      expect(() => OrderSubtotalVO.create(100, 'XYZ')).toThrow(ValidationError);
    });
  });

  describe('zero factory', () => {
    it('creates zero', () => {
      expect(OrderSubtotalVO.zero('BDT').amount).toBe(0);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(OrderSubtotalVO.reconstitute({ amount: 999, currency: 'BDT' }).amount).toBe(999);
    });
  });

  describe('add', () => {
    it('adds same-currency subtotals', () => {
      const a = OrderSubtotalVO.create(100, 'BDT');
      const b = OrderSubtotalVO.create(50, 'BDT');
      expect(a.add(b).amount).toBe(150);
    });
    it('throws on currency mismatch', () => {
      const a = OrderSubtotalVO.create(100, 'BDT');
      const b = OrderSubtotalVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow(ValidationError);
    });
  });
});
