/**
 * CartTaxRateVO — Unit Tests
 */
import { CartTaxRateVO } from '../../../../../src/module/domain/value-objects/primitives/cart-tax-rate.vo.js';

describe('CartTaxRateVO', () => {
  describe('create()', () => {
    it('creates VO from valid rate', () => {
      expect(CartTaxRateVO.create(15).percent).toBe(15);
    });

    it('accepts zero rate', () => {
      expect(CartTaxRateVO.create(0).percent).toBe(0);
    });

    it('accepts max rate 100', () => {
      expect(CartTaxRateVO.create(100).percent).toBe(100);
    });

    it('rounds to 2 decimal places', () => {
      expect(CartTaxRateVO.create(12.345678).percent).toBe(12.35);
    });

    it('throws on negative rate', () => {
      expect(() => CartTaxRateVO.create(-1)).toThrow();
    });

    it('throws on rate above 100', () => {
      expect(() => CartTaxRateVO.create(101)).toThrow();
    });

    it('throws on NaN', () => {
      expect(() => CartTaxRateVO.create(NaN)).toThrow();
    });

    it('throws on Infinity', () => {
      expect(() => CartTaxRateVO.create(Infinity)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartTaxRateVO.reconstitute(500).percent).toBe(500);
    });
  });

  describe('zero()', () => {
    it('creates zero tax rate', () => {
      expect(CartTaxRateVO.zero().percent).toBe(0);
    });
  });

  describe('isZero()', () => {
    it('true for zero rate', () => {
      expect(CartTaxRateVO.zero().isZero()).toBe(true);
    });

    it('false for non-zero rate', () => {
      expect(CartTaxRateVO.create(15).isZero()).toBe(false);
    });
  });

  describe('applyOn()', () => {
    it('computes 15% of 100 = 15', () => {
      expect(CartTaxRateVO.create(15).applyOn(100)).toBe(15);
    });

    it('rounds result to 2 decimals', () => {
      expect(CartTaxRateVO.create(15).applyOn(99.99)).toBe(15);
    });

    it('handles zero subtotal', () => {
      expect(CartTaxRateVO.create(15).applyOn(0)).toBe(0);
    });

    it('throws on negative subtotal', () => {
      expect(() => CartTaxRateVO.create(15).applyOn(-1)).toThrow();
    });

    it('throws on non-finite subtotal', () => {
      expect(() => CartTaxRateVO.create(15).applyOn(NaN)).toThrow();
    });
  });

  describe('extractFromInclusive()', () => {
    it('extracts tax portion from inclusive total', () => {
      // For 15% inclusive on 115: tax = 15, base = 100
      const tax = CartTaxRateVO.create(15).extractFromInclusive(115);
      expect(tax).toBe(15);
    });

    it('returns 0 when rate is zero', () => {
      expect(CartTaxRateVO.zero().extractFromInclusive(100)).toBe(0);
    });

    it('throws on negative total', () => {
      expect(() => CartTaxRateVO.create(15).extractFromInclusive(-1)).toThrow();
    });

    it('throws on non-finite', () => {
      expect(() => CartTaxRateVO.create(15).extractFromInclusive(NaN)).toThrow();
    });
  });
});
