/**
 * SessionManagerService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { SessionManagerService } from './session-manager.service';
import { AuthSessionEntity } from '../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../domain/value-objects/primitives/session-expiry.vo';

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
    userAgent: 'agent',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('SessionManagerService', () => {
  let service: SessionManagerService;

  beforeEach(() => {
    service = new SessionManagerService();
  });

  it('should have name', () => {
    expect(service.name).toBe('SessionManagerService');
  });

  it('should expose defaultTtlMs', () => {
    expect(service.defaultTtlMs).toBe(7 * 24 * 60 * 60 * 1000);
  });

  describe('shouldRefresh()', () => {
    it('should return true when remaining < threshold', () => {
      const s = buildSession();
      const nearExpiry = NOW_MS + ONE_HOUR - 60_000;
      expect(service.shouldRefresh(s, nearExpiry)).toBe(true);
    });

    it('should return false when plenty of time left', () => {
      const s = buildSession();
      expect(service.shouldRefresh(s, NOW_MS)).toBe(false);
    });
  });

  describe('touch()', () => {
    it('should extend session expiry', () => {
      const s = buildSession();
      const originalExpiry = s.expiry.epochMs;
      service.touch(s, NOW_MS);
      expect(s.expiry.epochMs).toBeGreaterThan(originalExpiry);
    });
  });

  describe('assertActive()', () => {
    it('should not throw for active session', () => {
      const s = buildSession();
      expect(() => service.assertActive(s, NOW_MS)).not.toThrow();
    });

    it('should throw for expired session', () => {
      const s = buildSession();
      expect(() => service.assertActive(s, NOW_MS + 2 * ONE_HOUR)).toThrow();
    });
  });
});
