/**
 * CouponCodeVO — Unit Tests
 */
import { CouponCodeVO } from '../../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { COUPON_LIMIT } from '@vubon/shared-constants/business/cart';

describe('CouponCodeVO', () => {
  describe('create()', () => {
    it('creates VO from a valid uppercase code', () => {
      const vo = CouponCodeVO.create('SAVE10');
      expect(vo.value).toBe('SAVE10');
    });

    it('normalizes lowercase to uppercase', () => {
      const vo = CouponCodeVO.create('save10');
      expect(vo.value).toBe('SAVE10');
    });

    it('trims surrounding whitespace', () => {
      const vo = CouponCodeVO.create('  SAVE10  ');
      expect(vo.value).toBe('SAVE10');
    });

    it('accepts hyphens', () => {
      const vo = CouponCodeVO.create('SAVE-10-OFF');
      expect(vo.value).toBe('SAVE-10-OFF');
    });

    it('accepts digits only', () => {
      const vo = CouponCodeVO.create('1234');
      expect(vo.value).toBe('1234');
    });

    it('accepts minimum length code', () => {
      const minCode = 'A'.repeat(COUPON_LIMIT.CODE_MIN_LENGTH);
      const vo = CouponCodeVO.create(minCode);
      expect(vo.value).toBe(minCode);
    });

    it('accepts maximum length code', () => {
      const maxCode = 'A'.repeat(COUPON_LIMIT.CODE_MAX_LENGTH);
      const vo = CouponCodeVO.create(maxCode);
      expect(vo.value).toBe(maxCode);
    });

    it('throws when below min length', () => {
      const shortCode = 'A'.repeat(COUPON_LIMIT.CODE_MIN_LENGTH - 1);
      expect(() => CouponCodeVO.create(shortCode)).toThrow();
    });

    it('throws when above max length', () => {
      const longCode = 'A'.repeat(COUPON_LIMIT.CODE_MAX_LENGTH + 1);
      expect(() => CouponCodeVO.create(longCode)).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => CouponCodeVO.create('')).toThrow();
    });

    it('throws on invalid characters (space inside)', () => {
      expect(() => CouponCodeVO.create('SAVE 10')).toThrow();
    });

    it('throws on invalid characters (@)', () => {
      expect(() => CouponCodeVO.create('SAVE@10')).toThrow();
    });

    it('throws on leading dash', () => {
      expect(() => CouponCodeVO.create('-SAVE10')).toThrow();
    });

    it('throws on trailing dash', () => {
      expect(() => CouponCodeVO.create('SAVE10-')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CouponCodeVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CouponCodeVO.reconstitute('any-code');
      expect(vo.value).toBe('any-code');
    });
  });

  describe('isWellFormed()', () => {
    it('true for a valid code', () => {
      expect(CouponCodeVO.create('SAVE10').isWellFormed()).toBe(true);
    });
  });

  describe('hasPrefix()', () => {
    it('true when code starts with prefix (case-insensitive)', () => {
      expect(CouponCodeVO.create('SAVE10').hasPrefix('SAVE')).toBe(true);
      expect(CouponCodeVO.create('SAVE10').hasPrefix('save')).toBe(true);
    });

    it('false when code does not start with prefix', () => {
      expect(CouponCodeVO.create('SAVE10').hasPrefix('OFF')).toBe(false);
    });
  });

  describe('matches()', () => {
    it('true for same codes', () => {
      expect(CouponCodeVO.create('SAVE10').matches(CouponCodeVO.create('SAVE10'))).toBe(true);
    });

    it('false for different codes', () => {
      expect(CouponCodeVO.create('SAVE10').matches(CouponCodeVO.create('OFF20'))).toBe(false);
    });
  });

  describe('length getter', () => {
    it('returns string length', () => {
      expect(CouponCodeVO.create('SAVE10').length).toBe(6);
    });
  });
});
