/**
 * AuthSessionVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthSessionVO } from './auth-session.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SessionTokenVO } from '../primitives/session-token.vo';

describe('AuthSessionVO', () => {
  const userId = UserIdVO.of('user-1');
  const token = SessionTokenVO.of('a'.repeat(32));
  const now = Date.now();

  const valid = {
    sessionId: 'sess-1',
    userId,
    token,
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: now,
    expiresAt: now + 3_600_000,
  };

  describe('of()', () => {
    it('should create valid session', () => {
      const vo = AuthSessionVO.of(valid);
      expect(vo.sessionId).toBe('sess-1');
      expect(vo.userId.value).toBe('user-1');
    });

    it('should reject expiresAt <= createdAt', () => {
      expect(() => AuthSessionVO.of({ ...valid, expiresAt: now })).toThrow('after creation');
      expect(() => AuthSessionVO.of({ ...valid, expiresAt: now - 1000 })).toThrow('after creation');
    });
  });

  describe('isExpired()', () => {
    it('should return false before expiry', () => {
      const vo = AuthSessionVO.of(valid);
      expect(vo.isExpired(now)).toBe(false);
    });

    it('should return true after expiry', () => {
      const vo = AuthSessionVO.of(valid);
      expect(vo.isExpired(now + 3_700_000)).toBe(true);
    });
  });

  describe('isRevoked()', () => {
    it('should return false when not revoked', () => {
      expect(AuthSessionVO.of(valid).isRevoked()).toBe(false);
    });

    it('should return true when revoked', () => {
      const vo = AuthSessionVO.of({ ...valid, revokedAt: now });
      expect(vo.isRevoked()).toBe(true);
    });
  });

  describe('isActive()', () => {
    it('should return true for active session', () => {
      const vo = AuthSessionVO.of(valid);
      expect(vo.isActive(now)).toBe(true);
    });

    it('should return false for expired', () => {
      const vo = AuthSessionVO.of(valid);
      expect(vo.isActive(now + 3_700_000)).toBe(false);
    });

    it('should return false for revoked', () => {
      const vo = AuthSessionVO.of({ ...valid, revokedAt: now });
      expect(vo.isActive(now)).toBe(false);
    });
  });
});
