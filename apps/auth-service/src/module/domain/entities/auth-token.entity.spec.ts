/**
 * AuthTokenEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthTokenEntity } from './auth-token.entity';
import { TokenValueVO } from '../value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../value-objects/primitives/token-expiry.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildToken = (overrides: Partial<Parameters<typeof AuthTokenEntity.create>[0]> = {}) =>
  AuthTokenEntity.create({
    id: 'tok-1',
    subjectId: 'user-1',
    value: TokenValueVO.of('a'.repeat(64)),
    type: TokenTypeVO.of('access'),
    expiry: TokenExpiryVO.fromEpoch(NOW_MS + 900_000),
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthTokenEntity', () => {
  describe('create()', () => {
    it('should create valid token', () => {
      const t = buildToken();
      expect(t.id).toBe('tok-1');
      expect(t.subjectId).toBe('user-1');
      expect(t.type.value).toBe('access');
    });

    it('should accept parentTokenId', () => {
      const t = buildToken({ parentTokenId: 'parent-1' });
      expect(t.parentTokenId).toBe('parent-1');
    });
  });

  describe('isExpired()', () => {
    it('should return false before expiry', () => {
      expect(buildToken().isExpired(NOW_MS)).toBe(false);
    });

    it('should return true after expiry', () => {
      expect(buildToken().isExpired(NOW_MS + 1_000_000)).toBe(true);
    });
  });

  describe('isRevoked()', () => {
    it('should return false initially', () => {
      expect(buildToken().isRevoked()).toBe(false);
    });

    it('should return true after revoke()', () => {
      const t = buildToken();
      t.revoke(NOW_MS);
      expect(t.isRevoked()).toBe(true);
    });
  });

  describe('isUsable()', () => {
    it('should return true for active token', () => {
      expect(buildToken().isUsable(NOW_MS)).toBe(true);
    });

    it('should return false for expired', () => {
      expect(buildToken().isUsable(NOW_MS + 1_000_000)).toBe(false);
    });

    it('should return false for revoked', () => {
      const t = buildToken();
      t.revoke(NOW_MS);
      expect(t.isUsable(NOW_MS)).toBe(false);
    });
  });

  describe('revoke()', () => {
    it('should set revokedAt', () => {
      const t = buildToken();
      t.revoke(NOW_MS);
      expect(t.revokedAt).toBe(NOW_MS);
    });
  });

  describe('getters', () => {
    it('should expose value', () => {
      expect(buildToken().value.value.length).toBe(64);
    });

    it('should expose expiry', () => {
      expect(buildToken().expiry.epochMs).toBe(NOW_MS + 900_000);
    });
  });
});
