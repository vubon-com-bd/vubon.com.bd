/**
 * AuthSessionEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { AuthSessionEntity } from './auth-session.entity';
import { SessionTokenVO } from '../value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../value-objects/primitives/session-expiry.vo';
import { SessionExpiredError } from '../errors/session.errors';

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

describe('AuthSessionEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('should create valid session', () => {
      const s = buildSession();
      expect(s.id).toBe('sess-1');
      expect(s.userId).toBe('user-1');
      expect(s.ipAddress).toBe('192.168.1.1');
    });

    it('should accept optional deviceId', () => {
      const s = buildSession({ deviceId: 'device-abc' });
      expect(s.deviceId).toBe('device-abc');
    });
  });

  describe('getters', () => {
    it('should expose token', () => {
      expect(buildSession().token.value.length).toBe(32);
    });

    it('should expose expiry', () => {
      expect(buildSession().expiry.epochMs).toBe(NOW_MS + ONE_HOUR);
    });

    it('should expose ipAddress', () => {
      expect(buildSession().ipAddress).toBe('192.168.1.1');
    });

    it('should expose userAgent', () => {
      expect(buildSession().userAgent).toBe('Mozilla/5.0');
    });

    it('should expose revokedAt as undefined when not revoked', () => {
      expect(buildSession().revokedAt).toBeUndefined();
    });
  });

  describe('isExpired()', () => {
    it('should return false before expiry', () => {
      const s = buildSession();
      expect(s.isExpired(NOW_MS)).toBe(false);
    });

    it('should return true after expiry', () => {
      const s = buildSession();
      expect(s.isExpired(NOW_MS + ONE_HOUR + 1000)).toBe(true);
    });
  });

  describe('isRevoked()', () => {
    it('should return false for non-revoked', () => {
      expect(buildSession().isRevoked()).toBe(false);
    });

    it('should return true after revoke()', () => {
      const s = buildSession();
      s.revoke(NOW_MS);
      expect(s.isRevoked()).toBe(true);
    });
  });

  describe('isActive()', () => {
    it('should return true for active session', () => {
      const s = buildSession();
      expect(s.isActive(NOW_MS)).toBe(true);
    });

    it('should return false for expired session', () => {
      const s = buildSession();
      expect(s.isActive(NOW_MS + ONE_HOUR + 1000)).toBe(false);
    });

    it('should return false for revoked session', () => {
      const s = buildSession();
      s.revoke(NOW_MS);
      expect(s.isActive(NOW_MS)).toBe(false);
    });
  });

  describe('assertActive()', () => {
    it('should not throw for active session', () => {
      const s = buildSession();
      expect(() => s.assertActive(NOW_MS)).not.toThrow();
    });

    it('should throw SessionExpiredError for expired session', () => {
      const s = buildSession();
      expect(() => s.assertActive(NOW_MS + ONE_HOUR + 1000))
        .toThrow(SessionExpiredError);
    });
  });

  describe('revoke()', () => {
    it('should set revokedAt', () => {
      const s = buildSession();
      s.revoke(NOW_MS);
      expect(s.revokedAt).toBe(NOW_MS);
    });

    it('should be idempotent', () => {
      const s = buildSession();
      s.revoke(NOW_MS);
      s.revoke(NOW_MS + 1000);
      expect(s.revokedAt).toBe(NOW_MS);
    });

    it('should accept reason', () => {
      const s = buildSession();
      s.revoke(NOW_MS, 'user_logout');
      expect(s.revokedAt).toBe(NOW_MS);
    });
  });

  describe('touch()', () => {
    it('should extend expiry', () => {
      const s = buildSession();
      const originalExpiry = s.expiry.epochMs;
      s.touch(NOW_MS, 60 * 60 * 1000);
      expect(s.expiry.epochMs).toBeGreaterThan(originalExpiry);
    });
  });

  describe('identity', () => {
    it('should expose createdAt', () => {
      expect(buildSession().createdAt).toBe(NOW);
    });

    it('should expose updatedAt', () => {
      expect(buildSession().updatedAt).toBe(NOW);
    });
  });
});
