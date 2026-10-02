/**
 * VoucherCodeVO — Unit Tests
 */
import { VoucherCodeVO } from '../../../../../src/module/domain/value-objects/primitives/voucher-code.vo.js';
import { VOUCHER_LIMIT } from '@vubon/shared-constants/business/cart';

describe('VoucherCodeVO', () => {
  describe('create()', () => {
    it('creates VO from a valid uppercase code', () => {
      const vo = VoucherCodeVO.create('GC-ABCD1234');
      expect(vo.value).toBe('GC-ABCD1234');
    });

    it('normalizes lowercase to uppercase', () => {
      const vo = VoucherCodeVO.create('gc-abcd1234');
      expect(vo.value).toBe('GC-ABCD1234');
    });

    it('trims surrounding whitespace', () => {
      const vo = VoucherCodeVO.create('  GC-ABCD1234  ');
      expect(vo.value).toBe('GC-ABCD1234');
    });

    it('accepts minimum length code', () => {
      const minCode = 'A'.repeat(VOUCHER_LIMIT.CODE_MIN_LENGTH);
      const vo = VoucherCodeVO.create(minCode);
      expect(vo.value).toBe(minCode);
    });

    it('accepts maximum length code', () => {
      const maxCode = 'A'.repeat(VOUCHER_LIMIT.CODE_MAX_LENGTH);
      const vo = VoucherCodeVO.create(maxCode);
      expect(vo.value).toBe(maxCode);
    });

    it('throws when below min length', () => {
      const short = 'A'.repeat(VOUCHER_LIMIT.CODE_MIN_LENGTH - 1);
      expect(() => VoucherCodeVO.create(short)).toThrow();
    });

    it('throws when above max length', () => {
      const long = 'A'.repeat(VOUCHER_LIMIT.CODE_MAX_LENGTH + 1);
      expect(() => VoucherCodeVO.create(long)).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => VoucherCodeVO.create('')).toThrow();
    });

    it('throws on invalid characters (space)', () => {
      expect(() => VoucherCodeVO.create('GC ABCD1234')).toThrow();
    });

    it('throws on invalid characters (@)', () => {
      expect(() => VoucherCodeVO.create('GC@ABCD1234')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => VoucherCodeVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = VoucherCodeVO.reconstitute('anything');
      expect(vo.value).toBe('anything');
    });
  });

  describe('isGiftCardFormat()', () => {
    it('true when code starts with GC-', () => {
      expect(VoucherCodeVO.create('GC-ABCD1234').isGiftCardFormat()).toBe(true);
    });

    it('false for non-GC codes', () => {
      expect(VoucherCodeVO.create('SC-ABCD1234').isGiftCardFormat()).toBe(false);
    });
  });

  describe('isStoreCreditFormat()', () => {
    it('true when code starts with SC-', () => {
      expect(VoucherCodeVO.create('SC-ABCD1234').isStoreCreditFormat()).toBe(true);
    });

    it('false for non-SC codes', () => {
      expect(VoucherCodeVO.create('GC-ABCD1234').isStoreCreditFormat()).toBe(false);
    });
  });

  describe('isLoyaltyFormat()', () => {
    it('true when code starts with LY-', () => {
      expect(VoucherCodeVO.create('LY-ABCD1234').isLoyaltyFormat()).toBe(true);
    });

    it('false for non-LY codes', () => {
      expect(VoucherCodeVO.create('GC-ABCD1234').isLoyaltyFormat()).toBe(false);
    });
  });

  describe('length getter', () => {
    it('returns string length', () => {
      expect(VoucherCodeVO.create('GC-ABCD1234').length).toBe(11);
    });
  });
});
