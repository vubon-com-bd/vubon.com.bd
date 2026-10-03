/**
 * CouponValidator — Unit Tests
 */
import { CouponValidator } from '../../../../src/module/application/validators/coupon.validator.js';

describe('CouponValidator', () => {
  describe('validateApply()', () => {
    it('accepts valid uppercase code', () => {
      expect(() => CouponValidator.validateApply({ code: 'SAVE10' })).not.toThrow();
    });

    it('accepts lowercase (will be normalized)', () => {
      expect(() => CouponValidator.validateApply({ code: 'save10' })).not.toThrow();
    });

    it('accepts hyphens', () => {
      expect(() => CouponValidator.validateApply({ code: 'SAVE-10-OFF' })).not.toThrow();
    });

    it('throws on empty code', () => {
      expect(() => CouponValidator.validateApply({ code: '' })).toThrow();
    });

    it('throws on whitespace-only code', () => {
      expect(() => CouponValidator.validateApply({ code: '   ' })).toThrow();
    });

    it('throws on too short code', () => {
      expect(() => CouponValidator.validateApply({ code: 'AB' })).toThrow();
    });

    it('throws on too long code', () => {
      const long = 'A'.repeat(33);
      expect(() => CouponValidator.validateApply({ code: long })).toThrow();
    });

    it('throws on invalid characters', () => {
      expect(() => CouponValidator.validateApply({ code: 'SAVE@10' })).toThrow();
    });
  });
});
