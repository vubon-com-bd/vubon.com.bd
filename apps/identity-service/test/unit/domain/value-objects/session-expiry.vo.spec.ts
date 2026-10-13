/**
 * SessionExpiryVO — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { SessionExpiryVO } from '../../../../src/module/domain/value-objects/primitives/session-expiry.vo.js';

describe('SessionExpiryVO', () => {
  describe('create()', () => {
    it('creates with valid params', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: 1700000000,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.absoluteExpiresAt).toBe(1700000000);
      expect(vo.idleTimeoutSeconds).toBe(1800);
    });

    it('throws for zero absoluteExpiresAt', () => {
      expect(() =>
        SessionExpiryVO.create({ absoluteExpiresAt: 0, idleTimeoutSeconds: 1800 }),
      ).toThrow();
    });

    it('throws for negative idleTimeout', () => {
      expect(() =>
        SessionExpiryVO.create({
          absoluteExpiresAt: 1700000000,
          idleTimeoutSeconds: -1,
        }),
      ).toThrow();
    });
  });

  describe('isAbsoluteExpired()', () => {
    it('true when past', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: 1000,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isAbsoluteExpired(2000000)).toBe(true);
    });

    it('false when future', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: 2000000,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isAbsoluteExpired(1000000)).toBe(false);
    });
  });

  describe('isIdleExpired()', () => {
    it('true when idle beyond threshold', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: 9999999999,
        idleTimeoutSeconds: 1800,
      });
      const lastAccess = 1000000;
      const now = 1000000 + 2000 * 1000;
      expect(vo.isIdleExpired(lastAccess, now)).toBe(true);
    });
  });

  describe('isExpired()', () => {
    it('true when absolute expired', () => {
      const vo = SessionExpiryVO.create({
        absoluteExpiresAt: 1000,
        idleTimeoutSeconds: 1800,
      });
      expect(vo.isExpired(1000000, 2000000)).toBe(true);
    });
  });
});
