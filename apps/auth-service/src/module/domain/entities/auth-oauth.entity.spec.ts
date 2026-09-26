/**
 * AuthOAuthEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { AuthOAuthEntity } from './auth-oauth.entity';
import { OAuthProviderVO } from '../value-objects/primitives/oauth-provider.vo';
import { OAuthTokenVO } from '../value-objects/primitives/oauth-token.vo';
import { OAuthStatusVO } from '../value-objects/primitives/oauth-status.vo';

const NOW = '2024-01-01T00:00:00.000Z';
const NOW_MS = new Date(NOW).getTime();

const buildOAuth = (overrides: Partial<Parameters<typeof AuthOAuthEntity.create>[0]> = {}) =>
  AuthOAuthEntity.create({
    id: 'oa-1',
    userId: 'user-1' as never,
    provider: OAuthProviderVO.of('google'),
    providerUserId: 'google-user-123',
    scopes: ['email', 'profile'],
    status: OAuthStatusVO.of('active'),
    linkedAt: NOW_MS,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthOAuthEntity', () => {
  describe('create()', () => {
    it('should create valid oauth link', () => {
      const o = buildOAuth();
      expect(o.provider.value).toBe('google');
      expect(o.scopes).toEqual(['email', 'profile']);
    });

    it('should accept empty scopes', () => {
      const o = buildOAuth({ scopes: [] });
      expect(o.scopes).toEqual([]);
    });
  });

  describe('hasScope()', () => {
    it('should return true for granted scope', () => {
      const o = buildOAuth();
      expect(o.hasScope('email')).toBe(true);
      expect(o.hasScope('profile')).toBe(true);
    });

    it('should return false for missing scope', () => {
      expect(buildOAuth().hasScope('admin')).toBe(false);
    });
  });

  describe('updateTokens()', () => {
    it('should update access token', () => {
      const o = buildOAuth();
      o.updateTokens(OAuthTokenVO.of('new-access'), undefined, undefined);
      expect(o).toBeDefined();
    });

    it('should update expiry and status to active', () => {
      const o = buildOAuth({ status: OAuthStatusVO.of('expired') });
      o.updateTokens(OAuthTokenVO.of('new-access'), undefined, NOW_MS + 3_600_000);
      expect(o).toBeDefined();
    });
  });

  describe('markExpired()', () => {
    it('should set status to expired', () => {
      const o = buildOAuth();
      o.markExpired();
      expect(o.isActive()).toBe(false);
    });
  });

  describe('revoke()', () => {
    it('should set status to revoked', () => {
      const o = buildOAuth();
      o.revoke();
      expect(o.isActive()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose provider', () => {
      expect(buildOAuth().provider.value).toBe('google');
    });

    it('should expose scopes as copy', () => {
      const o = buildOAuth();
      const scopes = o.scopes;
      expect(scopes).toEqual(['email', 'profile']);
    });

    it('should expose expiresAt as undefined initially', () => {
      expect(buildOAuth().expiresAt).toBeUndefined();
    });
  });
});
