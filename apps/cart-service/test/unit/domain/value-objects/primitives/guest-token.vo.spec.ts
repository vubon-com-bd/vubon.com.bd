/**
 * GuestTokenVO — Unit Tests
 */
import { GuestTokenVO } from '../../../../../src/module/domain/value-objects/primitives/guest-token.vo.js';
import { GUEST_TOKEN_LIMIT } from '@vubon/shared-constants/business/cart';

describe('GuestTokenVO', () => {
  const validToken = 'a'.repeat(GUEST_TOKEN_LIMIT.MIN_LENGTH);

  describe('create()', () => {
    it('creates VO from valid base64-url safe string', () => {
      const vo = GuestTokenVO.create(validToken);
      expect(vo.value).toBe(validToken);
    });

    it('accepts dashes and underscores', () => {
      const token = 'abcd_efgh-ijkl_1234';
      const vo = GuestTokenVO.create(token);
      expect(vo.value).toBe(token);
    });

    it('accepts exactly min length', () => {
      const token = 'a'.repeat(GUEST_TOKEN_LIMIT.MIN_LENGTH);
      const vo = GuestTokenVO.create(token);
      expect(vo.value).toBe(token);
    });

    it('accepts exactly max length', () => {
      const token = 'a'.repeat(GUEST_TOKEN_LIMIT.MAX_LENGTH);
      const vo = GuestTokenVO.create(token);
      expect(vo.value).toBe(token);
    });

    it('throws when below min length', () => {
      const token = 'a'.repeat(GUEST_TOKEN_LIMIT.MIN_LENGTH - 1);
      expect(() => GuestTokenVO.create(token)).toThrow();
    });

    it('throws when above max length', () => {
      const token = 'a'.repeat(GUEST_TOKEN_LIMIT.MAX_LENGTH + 1);
      expect(() => GuestTokenVO.create(token)).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => GuestTokenVO.create('')).toThrow();
    });

    it('throws on invalid characters (space)', () => {
      expect(() => GuestTokenVO.create('abc def ghi jkl')).toThrow();
    });

    it('throws on invalid characters (+)', () => {
      const token = 'a'.repeat(15) + '+';
      expect(() => GuestTokenVO.create(token)).toThrow();
    });

    it('throws on invalid characters (/)', () => {
      const token = 'a'.repeat(15) + '/';
      expect(() => GuestTokenVO.create(token)).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => GuestTokenVO.create(null as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = GuestTokenVO.reconstitute('anything');
      expect(vo.value).toBe('anything');
    });
  });

  describe('mask()', () => {
    it('returns masked string for long tokens', () => {
      const token = 'a'.repeat(20);
      const masked = GuestTokenVO.create(token).mask();
      expect(masked).toMatch(/\*+.{4}$/);
      expect(masked).not.toBe(token);
    });

    it('returns all-stars for short tokens', () => {
      const token = 'abc123';
      expect(GuestTokenVO.reconstitute(token).mask()).toBe('****');
    });

    it('preserves last 4 characters', () => {
      const token = 'a'.repeat(20) + 'WXYZ';
      const masked = GuestTokenVO.create(token).mask();
      expect(masked.endsWith('WXYZ')).toBe(true);
    });
  });

  describe('length getter', () => {
    it('returns string length', () => {
      expect(GuestTokenVO.create(validToken).length).toBe(validToken.length);
    });
  });
});
