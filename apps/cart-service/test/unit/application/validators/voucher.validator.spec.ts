import { describe, it, expect } from '@jest/globals';
import { VoucherValidator } from '../../../../src/module/application/validators/voucher.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const UUID = '123e4567-e89b-12d3-a456-426614174000';

describe('VoucherValidator', () => {
  describe('validateApply', () => {
    it('should parse valid voucher apply', () => {
      const result = VoucherValidator.validateApply({
        cartId: UUID,
        code: 'GIFT12345678',
      });
      expect(result.code).toBe('GIFT12345678');
    });

    it('should throw on code shorter than 8 chars', () => {
      expect(() =>
        VoucherValidator.validateApply({ cartId: UUID, code: 'GIFT12' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid cartId', () => {
      expect(() =>
        VoucherValidator.validateApply({
          cartId: 'bad',
          code: 'GIFT12345678',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRemove', () => {
    it('should parse valid remove', () => {
      const result = VoucherValidator.validateRemove({
        cartId: UUID,
        code: 'GIFT12345678',
      });
      expect(result.code).toBe('GIFT12345678');
    });

    it('should throw on code below min length', () => {
      expect(() =>
        VoucherValidator.validateRemove({ cartId: UUID, code: 'SHORT' }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
