/**
 * SessionExpiryVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SessionExpiryVO } from './session-expiry.vo';

describe('SessionExpiryVO', () => {
  describe('fromEpoch()', () => {
    it('should create from valid epoch', () => {
      const future = Date.now() + 3_600_000;
      const vo = SessionExpiryVO.fromEpoch(future);
      expect(vo.epochMs).toBe(future);
    });

    it('should reject non-finite epoch', () => {
      expect(() => SessionExpiryVO.fromEpoch(NaN)).toThrow('finite epoch');
      expect(() => SessionExpiryVO.fromEpoch(Infinity)).toThrow('finite epoch');
    });
  });

  describe('fromNow()', () => {
    it('should create expiry in future', () => {
      const now = Date.now();
      const ttl = 3_600_000; // 1 hour
      const vo = SessionExpiryVO.fromNow(ttl, now);
      expect(vo.epochMs).toBe(now + ttl);
    });

    it('should reject zero TTL', () => {
      expect(() => SessionExpiryVO.fromNow(0)).toThrow('positive');
    });

    it('should reject negative TTL', () => {
      expect(() => SessionExpiryVO.fromNow(-1000)).toThrow('positive');
    });

    it('should reject TTL exceeding 30 days', () => {
      const thirtyOneDays = 31 * 24 * 60 * 60 * 1000;
      expect(() => SessionExpiryVO.fromNow(thirtyOneDays)).toThrow('max session lifetime');
    });

    it('should accept exactly 30 days', () => {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      expect(() => SessionExpiryVO.fromNow(thirtyDays)).not.toThrow();
    });
  });

  describe('isExpired()', () => {
    it('should return false for future expiry', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromNow(60_000, now);
      expect(vo.isExpired(now)).toBe(false);
    });

    it('should return true for past expiry', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromNow(60_000, now);
      const later = now + 120_000;
      expect(vo.isExpired(later)).toBe(true);
    });

    it('should return true for exactly-now expiry', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromEpoch(now);
      expect(vo.isExpired(now)).toBe(true);
    });
  });

  describe('remainingMs()', () => {
    it('should return remaining time', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromNow(60_000, now);
      expect(vo.remainingMs(now)).toBe(60_000);
    });

    it('should return 0 for expired', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromEpoch(now - 1000);
      expect(vo.remainingMs(now)).toBe(0);
    });
  });

  describe('extendBy()', () => {
    it('should extend expiry', () => {
      const now = Date.now();
      const vo = SessionExpiryVO.fromNow(60_000, now);
      const extended = vo.extendBy(60_000, now);
      expect(extended.epochMs).toBe(now + 120_000);
    });

    it('should not exceed 30-day cap', () => {
      const now = Date.now();
      const almostMax = SessionExpiryVO.fromNow(29 * 24 * 60 * 60 * 1000, now);
      const extended = almostMax.extendBy(10 * 24 * 60 * 60 * 1000, now);
      // Should cap at 30 days from now
      const maxAllowed = now + 30 * 24 * 60 * 60 * 1000;
      expect(extended.epochMs).toBeLessThanOrEqual(maxAllowed);
    });
  });
});
