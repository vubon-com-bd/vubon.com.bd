/**
 * VoucherValidator — Unit Tests
 */
import { VoucherValidator } from '../../../../src/module/application/validators/voucher.validator.js';

describe('VoucherValidator', () => {
  describe('validateApply()', () => {
    it('accepts valid voucher code', () => {
      expect(() => VoucherValidator.validateApply({ code: 'GC-ABCD1234' })).not.toThrow();
    });

    it('accepts lowercase (normalized)', () => {
      expect(() => VoucherValidator.validateApply({ code: 'gc-abcd1234' })).not.toThrow();
    });

    it('throws on empty code', () => {
      expect(() => VoucherValidator.validateApply({ code: '' })).toThrow();
    });

    it('throws on whitespace-only', () => {
      expect(() => VoucherValidator.validateApply({ code: '   ' })).toThrow();
    });

    it('throws on too short code', () => {
      expect(() => VoucherValidator.validateApply({ code: 'GC-1234' })).toThrow();
    });

    it('throws on too long code', () => {
      const long = 'A'.repeat(33);
      expect(() => VoucherValidator.validateApply({ code: long })).toThrow();
    });

    it('throws on invalid characters', () => {
      expect(() => VoucherValidator.validateApply({ code: 'GC@ABCD1234' })).toThrow();
    });
  });
});
