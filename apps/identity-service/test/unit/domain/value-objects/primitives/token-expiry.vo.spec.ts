/**
 * TokenExpiryVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenExpiryVO } from '@domain/value-objects/primitives/token-expiry.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('TokenExpiryVO', () => {
  describe('fromEpochSeconds()', () => {
    it('should create valid', () => {
      const epoch = Math.floor(Date.now() / 1000) + 3600;
      const vo = TokenExpiryVO.fromEpochSeconds(epoch);
      expect(vo.expiresAt).toBe(epoch);
    });

    it('should throw on non-positive', () => {
      expect(() => TokenExpiryVO.fromEpochSeconds(0)).toThrow(ValidationError);
      expect(() => TokenExpiryVO.fromEpochSeconds(-1)).toThrow(ValidationError);
    });
  });

  describe('fromIso()', () => {
    it('should parse ISO datetime', () => {
      const iso = new Date().toISOString();
      const vo = TokenExpiryVO.fromIso(iso);
      expect(vo.expiresAt).toBeGreaterThan(0);
    });

    it('should throw on invalid ISO', () => {
      expect(() => TokenExpiryVO.fromIso('not-a-date')).toThrow(ValidationError);
    });
  });

  describe('fromNow()', () => {
    it('should create future expiry', () => {
      const vo = TokenExpiryVO.fromNow(900);
      expect(vo.secondsUntil()).toBeLessThanOrEqual(900);
      expect(vo.secondsUntil()).toBeGreaterThan(890);
    });

    it('should throw on non-positive duration', () => {
      expect(() => TokenExpiryVO.fromNow(0)).toThrow(ValidationError);
      expect(() => TokenExpiryVO.fromNow(-1)).toThrow(ValidationError);
    });
  });

  describe('isExpired()', () => {
    it('should return false for future', () => {
      const vo = TokenExpiryVO.fromNow(900);
      expect(vo.isExpired()).toBe(false);
    });

    it('should return true for past', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(Math.floor(Date.now() / 1000) - 100);
      expect(vo.isExpired()).toBe(true);
    });

    it('should respect nowMs param', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1000);
      expect(vo.isExpired(1000000)).toBe(true);
      expect(vo.isExpired(500)).toBe(false);
    });
  });

  describe('toDate / toISOString', () => {
    it('should convert', () => {
      const epoch = 1700000000;
      const vo = TokenExpiryVO.fromEpochSeconds(epoch);
      expect(vo.toDate()).toBeInstanceOf(Date);
      expect(vo.toISOString()).toContain('T');
    });
  });

  describe('isWithin()', () => {
    it('should return true if within window', () => {
      const vo = TokenExpiryVO.fromNow(60);
      expect(vo.isWithin(120)).toBe(true);
      expect(vo.isWithin(30)).toBe(false);
    });
  });
});
