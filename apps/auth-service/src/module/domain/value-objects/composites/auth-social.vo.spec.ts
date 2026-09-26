/**
 * AuthSocialVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthSocialVO } from './auth-social.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { SocialProviderVO } from '../primitives/social-provider.vo';
import { SocialStatusVO } from '../primitives/social-status.vo';

describe('AuthSocialVO', () => {
  const userId = UserIdVO.of('user-1');
  const now = Date.now();

  const valid = {
    socialId: 'soc-1',
    userId,
    provider: SocialProviderVO.of('google'),
    providerUserId: 'google-user-123',
    status: SocialStatusVO.of('active'),
    linkedAt: now,
  };

  describe('of()', () => {
    it('should create valid social link', () => {
      const vo = AuthSocialVO.of(valid);
      expect(vo.provider.value).toBe('google');
      expect(vo.isLinked()).toBe(true);
    });

    it('should reject empty providerUserId', () => {
      expect(() => AuthSocialVO.of({ ...valid, providerUserId: '' })).toThrow('required');
    });
  });

  describe('isLinked()', () => {
    it('should return true for active', () => {
      expect(AuthSocialVO.of(valid).isLinked()).toBe(true);
    });

    it('should return false for revoked', () => {
      const vo = AuthSocialVO.of({ ...valid, status: SocialStatusVO.of('revoked') });
      expect(vo.isLinked()).toBe(false);
    });
  });
});
