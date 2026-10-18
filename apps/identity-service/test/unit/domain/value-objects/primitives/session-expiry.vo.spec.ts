/**
 * SessionExpiryVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionExpiryVO } from '@domain/value-objects/primitives/session-expiry.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('SessionExpiryVO', () => {
  describe('create()', () => {
    it('should create valid', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.absoluteExpiresAt).toBeGreaterThan(0);
      expect(vo.idleTimeoutSeconds).toBe(1800);
    });

    it('should throw on non-positive absoluteExpiresAt', () => {
      expect(() =>
        SessionExpiryVO.create({ absoluteExpiresAt: 0, idleTimeoutSeconds: 1800 }),
      ).toThrow(ValidationError);
    });

    it('should throw on non-positive idleTimeoutSeconds', () => {
      expect(() =>
        SessionExpiryVO.create({
          absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
          idleTimeoutSeconds: 0,
        }),
      ).toThrow(ValidationError);
    });
  });

  describe('isAbsoluteExpired()', () => {
    it('should detect expiry', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) - 100,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isAbsoluteExpired()).toBe(true);
    });

    it('should return false if not expired', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isAbsoluteExpired()).toBe(false);
    });
  });

  describe('isIdleExpired()', () => {
    it('should detect idle timeout', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
        idleTimeoutSeconds: 60,
      });
      const longAgo = Date.now() - 120_000; // 2 min ago
      expect(vo.isIdleExpired(longAgo)).toBe(true);
    });

    it('should not expire recently active', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
        idleTimeoutSeconds: 1800,
      });
      const justNow = Date.now();
      expect(vo.isIdleExpired(justNow)).toBe(false);
    });
  });

  describe('isExpired()', () => {
    it('should combine both', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) - 1,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isExpired(Date.now())).toBe(true);
    });
  });

  describe('absoluteSecondsUntil()', () => {
    it('should return remaining time', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: Math.floor(Date.now() / 1000) + 3600,
        idleTimeoutSeconds: 1800,
      });
      const remaining = vo.absoluteSecondsUntil();
      expect(remaining).toBeGreaterThan(3500);
      expect(remaining).toBeLessThanOrEqual(3600);
    });
  });
});
