/**
 * TokenExpiryVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { TokenExpiryVO } from './token-expiry.vo';

describe('TokenExpiryVO', () => {
  describe('forType()', () => {
    it('access token should expire in ~15 minutes', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('access', now);
      const expected = now + 15 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('refresh token should expire in 30 days', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('refresh', now);
      const expected = now + 30 * 24 * 60 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('password_reset should expire in ~15 minutes', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('password_reset', now);
      const expected = now + 15 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('email_verification should expire in 24 hours', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('email_verification', now);
      const expected = now + 24 * 60 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('invite should expire in 7 days', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('invite', now);
      const expected = now + 7 * 24 * 60 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('api_key should expire in 365 days', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('api_key', now);
      const expected = now + 365 * 24 * 60 * 60 * 1000;
      expect(vo.epochMs).toBe(expected);
    });

    it('should reject unknown type', () => {
      expect(() => TokenExpiryVO.forType('unknown' as never)).toThrow();
    });
  });

  describe('fromEpoch()', () => {
    it('should create from epoch', () => {
      const future = Date.now() + 3_600_000;
      const vo = TokenExpiryVO.fromEpoch(future);
      expect(vo.epochMs).toBe(future);
    });
  });

  describe('isExpired()', () => {
    it('should return false for future', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('access', now);
      expect(vo.isExpired(now)).toBe(false);
    });

    it('should return true for past', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('access', now);
      const later = now + 16 * 60 * 1000; // 16 minutes later
      expect(vo.isExpired(later)).toBe(true);
    });
  });

  describe('remainingMs()', () => {
    it('should return remaining time', () => {
      const now = Date.now();
      const vo = TokenExpiryVO.forType('access', now);
      expect(vo.remainingMs(now)).toBe(15 * 60 * 1000);
    });

    it('should return 0 for expired token', () => {
      const past = Date.now() - 1000;
      const vo = TokenExpiryVO.fromEpoch(past);
      expect(vo.remainingMs(Date.now())).toBe(0);
    });
  });
});
