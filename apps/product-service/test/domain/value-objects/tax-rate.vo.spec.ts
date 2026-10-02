/**
 * TaxRateVO — unit tests
 */
import { TaxRateVO } from '../../../src/module/domain/value-objects/primitives/tax-rate.vo.js';

describe('TaxRateVO', () => {
  describe('create()', () => {
    it('should accept 0', () => {
      expect(TaxRateVO.create(0).value).toBe(0);
    });

    it('should accept 0.15 (15%)', () => {
      expect(TaxRateVO.create(0.15).value).toBe(0.15);
    });

    it('should accept 1 (100%)', () => {
      expect(TaxRateVO.create(1).value).toBe(1);
    });

    it('should reject negative', () => {
      expect(() => TaxRateVO.create(-0.1)).toThrow(Error);
    });

    it('should reject > 1', () => {
      expect(() => TaxRateVO.create(1.5)).toThrow(Error);
    });

    it('should reject NaN', () => {
      expect(() => TaxRateVO.create(NaN)).toThrow(Error);
    });
  });

  describe('zero()', () => {
    it('returns zero rate', () => {
      expect(TaxRateVO.zero().value).toBe(0);
    });
  });

  describe('percent', () => {
    it('returns percent value', () => {
      expect(TaxRateVO.create(0.15).percent).toBe(15);
      expect(TaxRateVO.create(0.05).percent).toBeCloseTo(5);
    });
  });

  describe('calculateTax()', () => {
    it('calculates 15% tax', () => {
      expect(TaxRateVO.create(0.15).calculateTax(1000)).toBe(150);
    });

    it('rounds to 2 decimals', () => {
      expect(TaxRateVO.create(0.075).calculateTax(999)).toBeCloseTo(74.93, 2);
    });

    it('zero rate returns 0', () => {
      expect(TaxRateVO.zero().calculateTax(1000)).toBe(0);
    });
  });
});
