/**
 * AuthOAuthVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthOAuthVO } from './auth-oauth.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OAuthProviderVO } from '../primitives/oauth-provider.vo';
import { OAuthStatusVO } from '../primitives/oauth-status.vo';

describe('AuthOAuthVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  const valid = {
    oauthId: 'oa-1',
    userId,
    provider: OAuthProviderVO.of('google'),
    providerUserId: 'google-123',
    scopes: ['email', 'profile'],
    status: OAuthStatusVO.of('active'),
    linkedAt: now,
  };

  describe('of()', () => {
    it('should create valid oauth link', () => {
      const vo = AuthOAuthVO.of(valid);
      expect(vo.provider.value).toBe('google');
      expect(vo.isActive()).toBe(true);
    });

    it('should reject empty providerUserId', () => {
      expect(() => AuthOAuthVO.of({ ...valid, providerUserId: '' })).toThrow('required');
    });
  });

  describe('hasScope()', () => {
    it('should return true for granted scope', () => {
      const vo = AuthOAuthVO.of(valid);
      expect(vo.hasScope('email')).toBe(true);
      expect(vo.hasScope('profile')).toBe(true);
    });

    it('should return false for missing scope', () => {
      const vo = AuthOAuthVO.of(valid);
      expect(vo.hasScope('admin')).toBe(false);
    });
  });

  describe('isActive()', () => {
    it('should return true for active status', () => {
      expect(AuthOAuthVO.of(valid).isActive()).toBe(true);
    });

    it('should return false for revoked', () => {
      const vo = AuthOAuthVO.of({ ...valid, status: OAuthStatusVO.of('revoked') });
      expect(vo.isActive()).toBe(false);
    });
  });
});
