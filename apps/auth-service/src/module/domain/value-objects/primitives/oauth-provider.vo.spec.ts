/**
 * OAuthProviderVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { OAuthProviderVO } from './oauth-provider.vo';

describe('OAuthProviderVO', () => {
  describe('of()', () => {
    it('should accept all valid providers', () => {
      ['google', 'facebook', 'github', 'linkedin', 'microsoft', 'gitlab', 'bitbucket', 'custom'].forEach((p) => {
        const vo = OAuthProviderVO.of(p);
        expect(vo.value).toBe(p);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = OAuthProviderVO.of('GOOGLE');
      expect(vo.value).toBe('google');
    });

    it('should reject unsupported provider', () => {
      expect(() => OAuthProviderVO.of('unknown')).toThrow();
    });
  });

  describe('supportsRefresh()', () => {
    it('should return true for all except custom', () => {
      ['google', 'facebook', 'github', 'linkedin', 'microsoft', 'gitlab', 'bitbucket'].forEach((p) => {
        expect(OAuthProviderVO.of(p).supportsRefresh()).toBe(true);
      });
    });

    it('should return false for custom', () => {
      expect(OAuthProviderVO.of('custom').supportsRefresh()).toBe(false);
    });
  });
});
