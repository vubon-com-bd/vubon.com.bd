/**
 * DiscountPercentVO — unit tests
 */
import { DiscountPercentVO } from '../../../src/module/domain/value-objects/primitives/discount-vo.js';
import { DiscountExceededError } from '../../../src/module/domain/errors/pricing.errors.js';

describe('DiscountPercentVO', () => {
  describe('create()', () => {
    it('should accept 0%', () => {
      expect(DiscountPercentVO.create(0).value).toBe(0);
    });

    it('should accept 50%', () => {
      expect(DiscountPercentVO.create(50).value).toBe(50);
    });

    it('should accept 90% (max)', () => {
      expect(DiscountPercentVO.create(90).value).toBe(90);
    });

    it('should reject negative', () => {
      expect(() => DiscountPercentVO.create(-5)).toThrow(DiscountExceededError);
    });

    it('should reject above max', () => {
      expect(() => DiscountPercentVO.create(95)).toThrow(DiscountExceededError);
    });

    it('should reject NaN', () => {
      expect(() => DiscountPercentVO.create(NaN)).toThrow(Error);
    });
  });

  describe('none()', () => {
    it('returns zero discount', () => {
      expect(DiscountPercentVO.none().value).toBe(0);
    });
  });

  describe('applyTo()', () => {
    it('applies discount to amount', () => {
      expect(DiscountPercentVO.create(20).applyTo(1000)).toBe(200);
    });

    it('rounds to 2 decimals', () => {
      expect(DiscountPercentVO.create(33).applyTo(99.99)).toBe(33);
    });

    it('0% returns zero discount', () => {
      expect(DiscountPercentVO.create(0).applyTo(1000)).toBe(0);
    });
  });
});
