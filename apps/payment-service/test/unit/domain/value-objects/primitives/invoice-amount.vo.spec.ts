/**
 * InvoiceAmountVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('InvoiceAmountVO', () => {
  describe('create()', () => {
    it('creates subtotal + tax + total', () => {
      const vo = InvoiceAmountVO.create(100, 15, 'BDT');
      expect(vo.subtotal).toBe(100);
      expect(vo.taxAmount).toBe(15);
      expect(vo.total).toBe(115);
      expect(vo.currency).toBe('BDT');
    });
    it('uppercases currency', () => {
      expect(InvoiceAmountVO.create(100, 15, 'bdt').currency).toBe('BDT');
    });
    it('rounds to 2 decimals', () => {
      const vo = InvoiceAmountVO.create(100.126, 15.004, 'BDT');
      expect(vo.subtotal).toBe(100.13);
      expect(vo.taxAmount).toBe(15);
    });
    it('throws on negative subtotal', () => {
      expect(() => InvoiceAmountVO.create(-1, 0, 'BDT')).toThrow(ValidationError);
    });
    it('throws on negative tax', () => {
      expect(() => InvoiceAmountVO.create(100, -1, 'BDT')).toThrow(ValidationError);
    });
    it('throws on empty currency', () => {
      expect(() => InvoiceAmountVO.create(100, 15, '')).toThrow(ValidationError);
    });
    it('throws on NaN subtotal', () => {
      expect(() => InvoiceAmountVO.create(NaN, 0, 'BDT')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves all values', () => {
      const vo = InvoiceAmountVO.reconstitute(100, 15, 115, 'BDT');
      expect(vo.total).toBe(115);
    });
  });

  describe('hasTax()', () => {
    it('true when tax > 0', () => {
      expect(InvoiceAmountVO.create(100, 15, 'BDT').hasTax()).toBe(true);
    });
    it('false when tax = 0', () => {
      expect(InvoiceAmountVO.create(100, 0, 'BDT').hasTax()).toBe(false);
    });
  });
});
