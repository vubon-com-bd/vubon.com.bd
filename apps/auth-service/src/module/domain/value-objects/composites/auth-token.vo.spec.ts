/**
 * AuthTokenVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthTokenVO } from './auth-token.vo';
import { TokenValueVO } from '../primitives/token-value.vo';
import { TokenTypeVO } from '../primitives/token-type.vo';

describe('AuthTokenVO', () => {
  const value = TokenValueVO.of('a'.repeat(64));
  const type = TokenTypeVO.of('access');
  const now = Date.now();

  const valid = {
    tokenId: 'tok-1',
    value,
    type,
    subjectId: 'user-1',
    issuedAt: now,
    expiresAt: now + 900_000,
  };

  describe('of()', () => {
    it('should create valid token', () => {
      const vo = AuthTokenVO.of(valid);
      expect(vo.tokenId).toBe('tok-1');
      expect(vo.type.value).toBe('access');
    });

    it('should reject expiresAt <= issuedAt', () => {
      expect(() => AuthTokenVO.of({ ...valid, expiresAt: now })).toThrow('after issuance');
    });
  });

  describe('isExpired()', () => {
    it('should return false before expiry', () => {
      expect(AuthTokenVO.of(valid).isExpired(now)).toBe(false);
    });

    it('should return true after expiry', () => {
      expect(AuthTokenVO.of(valid).isExpired(now + 1_000_000)).toBe(true);
    });
  });

  describe('isRevoked()', () => {
    it('should return false when not revoked', () => {
      expect(AuthTokenVO.of(valid).isRevoked()).toBe(false);
    });

    it('should return true when revoked', () => {
      expect(AuthTokenVO.of({ ...valid, revokedAt: now }).isRevoked()).toBe(true);
    });
  });

  describe('isUsable()', () => {
    it('should return true for active token', () => {
      expect(AuthTokenVO.of(valid).isUsable(now)).toBe(true);
    });

    it('should return false for expired', () => {
      expect(AuthTokenVO.of(valid).isUsable(now + 1_000_000)).toBe(false);
    });

    it('should return false for revoked', () => {
      expect(AuthTokenVO.of({ ...valid, revokedAt: now }).isUsable(now)).toBe(false);
    });
  });
});
