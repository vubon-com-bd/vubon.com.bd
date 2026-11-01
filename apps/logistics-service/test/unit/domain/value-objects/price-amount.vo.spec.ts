/**
 * PriceAmountVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { PriceAmountVO } from '../../../../src/module/domain/value-objects/primitives/price-amount.vo.js';

describe('PriceAmountVO', () => {
  describe('create()', () => {
    it('creates positive amount', () => {
      expect(PriceAmountVO.create(1000).value).toBe(1000);
    });
    it('creates zero', () => {
      expect(PriceAmountVO.create(0).value).toBe(0);
    });
    it('rounds to 2 decimals', () => {
      expect(PriceAmountVO.create(99.999).value).toBe(100);
    });
    it('throws for negative', () => {
      expect(() => PriceAmountVO.create(-1)).toThrow();
    });
    it('throws for NaN', () => {
      expect(() => PriceAmountVO.create(NaN)).toThrow();
    });
    it('throws for Infinity', () => {
      expect(() => PriceAmountVO.create(Infinity)).toThrow();
    });
  });

  describe('predicates', () => {
    it('isZero', () => expect(PriceAmountVO.create(0).isZero()).toBe(true));
    it('isPositive', () => expect(PriceAmountVO.create(100).isPositive()).toBe(true));
  });

  describe('arithmetic', () => {
    it('add', () => {
      const a = PriceAmountVO.create(100);
      const b = PriceAmountVO.create(50);
      expect(a.add(b).value).toBe(150);
    });
    it('subtract', () => {
      const a = PriceAmountVO.create(100);
      const b = PriceAmountVO.create(30);
      expect(a.subtract(b).value).toBe(70);
    });
    it('multiply', () => {
      const a = PriceAmountVO.create(100);
      expect(a.multiply(1.15).value).toBe(115);
    });
    it('throws on subtract resulting negative', () => {
      const a = PriceAmountVO.create(50);
      const b = PriceAmountVO.create(100);
      expect(() => a.subtract(b)).toThrow();
    });
  });

  describe('static factory', () => {
    it('zero()', () => expect(PriceAmountVO.zero().value).toBe(0));
  });
});
