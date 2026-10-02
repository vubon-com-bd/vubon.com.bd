import { jest } from '@jest/globals';

import { CouponValidator, ApplyCouponHttpSchema } from '../../../../src/module/interfaces/validators/coupon.validator.js';

describe('CouponValidator (interfaces)', () => {
  describe('validateApply()', () => {
    it('accepts valid coupon', () => {
      expect(() => CouponValidator.validateApply({ code: 'SAVE10' })).not.toThrow();
    });

    it('normalizes lowercase', () => {
      const parsed = ApplyCouponHttpSchema.parse({ code: 'save10' });
      expect(parsed.code).toBe('SAVE10');
    });

    it('throws on too short code', () => {
      expect(() => CouponValidator.validateApply({ code: 'AB' })).toThrow();
    });

    it('throws on too long code', () => {
      expect(() => CouponValidator.validateApply({ code: 'A'.repeat(33) })).toThrow();
    });

    it('throws on empty code', () => {
      expect(() => CouponValidator.validateApply({ code: '' })).toThrow();
    });
  });

  describe('schema exported', () => {
    it('ApplyCouponHttpSchema', () => {
      expect(ApplyCouponHttpSchema).toBeDefined();
    });
  });
});
