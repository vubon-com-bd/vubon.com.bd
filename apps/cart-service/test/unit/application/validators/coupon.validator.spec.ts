import { describe, it, expect } from '@jest/globals';
import { CouponValidator } from '../../../../src/module/application/validators/coupon.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const UUID = '123e4567-e89b-12d3-a456-426614174000';

describe('CouponValidator', () => {
  describe('validateApply', () => {
    it('should parse valid coupon apply', () => {
      const result = CouponValidator.validateApply({
        cartId: UUID,
        code: 'save20',
      });
      expect(result.code).toBe('SAVE20');
    });

    it('should uppercase the code', () => {
      const result = CouponValidator.validateApply({
        cartId: UUID,
        code: 'save20',
      });
      expect(result.code).toBe('SAVE20');
    });

    it('should trim whitespace', () => {
      const result = CouponValidator.validateApply({
        cartId: UUID,
        code: '  SAVE20  ',
      });
      expect(result.code).toBe('SAVE20');
    });

    it('should throw on code too short', () => {
      expect(() =>
        CouponValidator.validateApply({ cartId: UUID, code: 'ABC' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on code too long', () => {
      expect(() =>
        CouponValidator.validateApply({
          cartId: UUID,
          code: 'X'.repeat(33),
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRemove', () => {
    it('should parse valid remove', () => {
      const result = CouponValidator.validateRemove({
        cartId: UUID,
        code: 'SAVE20',
      });
      expect(result.code).toBe('SAVE20');
    });

    it('should throw on invalid cartId', () => {
      expect(() =>
        CouponValidator.validateRemove({ cartId: 'bad', code: 'SAVE20' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateValidate', () => {
    it('should parse valid validate input', () => {
      const result = CouponValidator.validateValidate({
        cartId: UUID,
        code: 'save20',
      });
      expect(result.code).toBe('SAVE20');
    });
  });
});
