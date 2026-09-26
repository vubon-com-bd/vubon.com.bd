/**
 * SessionValidationService — Unit Tests
 * @module auth-service/domain/services
 */
import { SessionValidationService } from './session-validation.service';
import { AuthSessionEntity } from '../entities/auth-session.entity';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo';
import { SessionExpiredError, SessionRevokedError } from '../errors/session.errors';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();
const ONE_HOUR = 3_600_000;

const buildSession = (overrides: Partial<Parameters<typeof AuthSessionEntity.create>[0]> = {}) =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + ONE_HOUR),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('SessionValidationService', () => {
  describe('assertUsable()', () => {
    it('should not throw for active session', () => {
      const s = buildSession();
      expect(() =>
        SessionValidationService.assertUsable(s, { now: NOW_MS }),
      ).not.toThrow();
    });

    it('should throw SessionExpiredError for expired session', () => {
      const s = buildSession();
      expect(() =>
        SessionValidationService.assertUsable(s, { now: NOW_MS + 2 * ONE_HOUR }),
      ).toThrow(SessionExpiredError);
    });

    it('should throw SessionRevokedError for revoked session', () => {
      const s = buildSession({ revokedAt: NOW_MS - 1000 });
      expect(() =>
        SessionValidationService.assertUsable(s, { now: NOW_MS }),
      ).toThrow(SessionRevokedError);
    });

    it('should throw SessionExpiredError on idle timeout', () => {
      const s = buildSession();
      expect(() =>
        SessionValidationService.assertUsable(s, {
          now: NOW_MS,
          maxIdleMs: 60_000,
          lastActivityAt: NOW_MS - 120_000,
        }),
      ).toThrow(SessionExpiredError);
    });

    it('should not throw when idle within threshold', () => {
      const s = buildSession();
      expect(() =>
        SessionValidationService.assertUsable(s, {
          now: NOW_MS,
          maxIdleMs: 60_000,
          lastActivityAt: NOW_MS - 30_000,
        }),
      ).not.toThrow();
    });
  });

  describe('isValid()', () => {
    it('should return true for active session', () => {
      const s = buildSession();
      expect(SessionValidationService.isValid(s, { now: NOW_MS })).toBe(true);
    });

    it('should return false for expired session', () => {
      const s = buildSession();
      expect(SessionValidationService.isValid(s, { now: NOW_MS + 2 * ONE_HOUR })).toBe(false);
    });

    it('should return false for revoked session', () => {
      const s = buildSession({ revokedAt: NOW_MS - 1000 });
      expect(SessionValidationService.isValid(s, { now: NOW_MS })).toBe(false);
    });
  });

  describe('shouldRefresh()', () => {
    it('should return true when remaining TTL < threshold', () => {
      const s = buildSession();
      expect(SessionValidationService.shouldRefresh(s, NOW_MS + ONE_HOUR - 60_000)).toBe(true);
    });

    it('should return false when TTL is plenty', () => {
      const s = buildSession();
      expect(SessionValidationService.shouldRefresh(s, NOW_MS)).toBe(false);
    });

    it('should respect custom threshold', () => {
      const s = buildSession();
      expect(
        SessionValidationService.shouldRefresh(s, NOW_MS, 2 * ONE_HOUR),
      ).toBe(true);
    });
  });
});
