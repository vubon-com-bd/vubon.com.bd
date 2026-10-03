/**
 * PriceVO — unit tests
 */
import { PriceVO } from '../../../src/module/domain/value-objects/primitives/price.vo.js';
import { InvalidPriceError } from '../../../src/module/domain/errors/pricing.errors.js';
import { DEFAULT_CURRENCY } from '../../helpers.js';

describe('PriceVO', () => {
  describe('create()', () => {
    it('should create with valid amount', () => {
      const vo = PriceVO.create(1000, DEFAULT_CURRENCY);
      expect(vo.amount).toBe(1000);
      expect(vo.currency).toBe(DEFAULT_CURRENCY);
    });

    it('should round to 2 decimals', () => {
      const vo = PriceVO.create(1000.556, DEFAULT_CURRENCY);
      expect(vo.amount).toBe(1000.56);
    });

    it('should reject negative amount', () => {
      expect(() => PriceVO.create(-100, DEFAULT_CURRENCY)).toThrow(InvalidPriceError);
    });

    it('should reject NaN', () => {
      expect(() => PriceVO.create(NaN, DEFAULT_CURRENCY)).toThrow(InvalidPriceError);
    });

    it('should reject Infinity', () => {
      expect(() => PriceVO.create(Infinity, DEFAULT_CURRENCY)).toThrow(InvalidPriceError);
    });

    it('should allow zero', () => {
      const vo = PriceVO.create(0, DEFAULT_CURRENCY);
      expect(vo.amount).toBe(0);
      expect(vo.isZero()).toBe(true);
    });
  });

  describe('add()', () => {
    it('should add two prices of same currency', () => {
      const a = PriceVO.create(100, DEFAULT_CURRENCY);
      const b = PriceVO.create(50, DEFAULT_CURRENCY);
      expect(a.add(b).amount).toBe(150);
    });

    it('should reject different currencies', () => {
      const a = PriceVO.create(100, 'BDT');
      const b = PriceVO.create(50, 'USD');
      expect(() => a.add(b)).toThrow(/Currency mismatch/);
    });
  });

  describe('subtract()', () => {
    it('should subtract prices', () => {
      const a = PriceVO.create(100, DEFAULT_CURRENCY);
      const b = PriceVO.create(30, DEFAULT_CURRENCY);
      expect(a.subtract(b).amount).toBe(70);
    });

    it('should throw on negative result', () => {
      const a = PriceVO.create(30, DEFAULT_CURRENCY);
      const b = PriceVO.create(100, DEFAULT_CURRENCY);
      expect(() => a.subtract(b)).toThrow(InvalidPriceError);
    });
  });

  describe('multiply()', () => {
    it('should multiply by factor', () => {
      const vo = PriceVO.create(100, DEFAULT_CURRENCY);
      expect(vo.multiply(3).amount).toBe(300);
    });

    it('should reject negative multiplier', () => {
      const vo = PriceVO.create(100, DEFAULT_CURRENCY);
      expect(() => vo.multiply(-1)).toThrow(InvalidPriceError);
    });
  });

  describe('isZero() / isGreaterThan()', () => {
    it('isZero detects zero price', () => {
      expect(PriceVO.create(0, DEFAULT_CURRENCY).isZero()).toBe(true);
      expect(PriceVO.create(1, DEFAULT_CURRENCY).isZero()).toBe(false);
    });

    it('isGreaterThan compares amounts', () => {
      const a = PriceVO.create(100, DEFAULT_CURRENCY);
      const b = PriceVO.create(50, DEFAULT_CURRENCY);
      expect(a.isGreaterThan(b)).toBe(true);
      expect(b.isGreaterThan(a)).toBe(false);
    });
  });
});
