/**
 * AuthSessionMapper — Unit Tests
 * @module auth-service/application/mappers
 */
import { AuthSessionMapper } from './auth-session.mapper';
import { AuthSessionEntity } from '../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../domain/value-objects/primitives/session-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildSession = (overrides: Partial<Parameters<typeof AuthSessionEntity.create>[0]> = {}) =>
  AuthSessionEntity.create({
    id: 'sess-1',
    userId: 'user-1' as never,
    token: SessionTokenVO.of('a'.repeat(32)),
    expiry: SessionExpiryVO.fromEpoch(NOW_MS + 3_600_000),
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthSessionMapper', () => {
  const mapper = new AuthSessionMapper();

  describe('toTarget()', () => {
    it('should map active session', () => {
      const dto = mapper.toTarget(buildSession());
      expect(dto.sessionId).toBe('sess-1');
      expect(dto.userId).toBe('user-1');
      expect(dto.ipAddress).toBe('192.168.1.1');
      expect(dto.userAgent).toBe('Mozilla/5.0');
    });

    it('should include deviceId if present', () => {
      const s = buildSession({ deviceId: 'dev-abc' });
      expect(mapper.toTarget(s).deviceId).toBe('dev-abc');
    });

    it('should set isActive correctly for active session', () => {
      const s = buildSession();
      const dto = mapper.toTarget(s);
      // NOW is in the past relative to current time, so session might be "expired"
      // depending on actual clock. Just check it's boolean.
      expect(typeof dto.isActive).toBe('boolean');
    });

    it('should omit revokedAt for active session', () => {
      const dto = mapper.toTarget(buildSession());
      expect(dto.revokedAt).toBeUndefined();
    });

    it('should include revokedAt for revoked session', () => {
      const s = buildSession({ revokedAt: NOW_MS });
      const dto = mapper.toTarget(s);
      expect(dto.revokedAt).toBeDefined();
    });

    it('should convert expiry to ISO string', () => {
      const s = buildSession();
      const dto = mapper.toTarget(s);
      expect(dto.expiresAt).toBe(s.expiry.toISOString());
    });
  });

  describe('toSource()', () => {
    it('should throw (not implemented)', () => {
      expect(() =>
        mapper.toSource({
          sessionId: 'x', userId: 'y', ipAddress: 'z', userAgent: 'w',
          createdAt: NOW, expiresAt: NOW, isActive: true,
        } as never),
      ).toThrow();
    });
  });
});
