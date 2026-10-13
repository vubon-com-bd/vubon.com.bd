/**
 * TokenExpiryVO — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { TokenExpiryVO } from '../../../../src/module/domain/value-objects/primitives/token-expiry.vo.js';

describe('TokenExpiryVO', () => {
  describe('fromEpochSeconds()', () => {
    it('creates with valid epoch', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1700000000);
      expect(vo.expiresAt).toBe(1700000000);
    });

    it('floors fractional seconds', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1700000000.9);
      expect(vo.expiresAt).toBe(1700000000);
    });

    it('throws for zero', () => {
      expect(() => TokenExpiryVO.fromEpochSeconds(0)).toThrow();
    });

    it('throws for negative', () => {
      expect(() => TokenExpiryVO.fromEpochSeconds(-1)).toThrow();
    });

    it('throws for NaN', () => {
      expect(() => TokenExpiryVO.fromEpochSeconds(NaN)).toThrow();
    });
  });

  describe('fromNow()', () => {
    it('adds duration to now', () => {
      const now = 1700000000000;
      const vo = TokenExpiryVO.fromNow(900, now);
      expect(vo.expiresAt).toBe(1700000900);
    });

    it('throws for zero duration', () => {
      expect(() => TokenExpiryVO.fromNow(0)).toThrow();
    });

    it('throws for negative duration', () => {
      expect(() => TokenExpiryVO.fromNow(-1)).toThrow();
    });
  });

  describe('isExpired()', () => {
    it('true when past', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1000);
      expect(vo.isExpired(2000000)).toBe(true);
    });

    it('false when future', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(2000000);
      expect(vo.isExpired(1000000)).toBe(false);
    });
  });

  describe('secondsUntil()', () => {
    it('returns positive remaining', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(2000);
      expect(vo.secondsUntil(1000000)).toBe(1000);
    });

    it('returns 0 when expired', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1000);
      expect(vo.secondsUntil(2000000)).toBe(0);
    });
  });

  describe('isWithin()', () => {
    it('true when within threshold', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(1500);
      expect(vo.isWithin(1000, 1000000)).toBe(true);
    });

    it('false when not within', () => {
      const vo = TokenExpiryVO.fromEpochSeconds(3000);
      expect(vo.isWithin(1000, 1000000)).toBe(false);
    });
  });
});
