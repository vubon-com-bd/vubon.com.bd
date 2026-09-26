/**
 * SocialProviderVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SocialProviderVO } from './social-provider.vo';

describe('SocialProviderVO', () => {
  describe('of()', () => {
    it('should accept all valid providers', () => {
      ['google', 'facebook', 'apple', 'twitter', 'github', 'linkedin', 'tiktok', 'instagram'].forEach((p) => {
        const vo = SocialProviderVO.of(p);
        expect(vo.value).toBe(p);
      });
    });

    it('should normalize to lowercase', () => {
      const vo = SocialProviderVO.of('GOOGLE');
      expect(vo.value).toBe('google');
    });

    it('should trim whitespace', () => {
      const vo = SocialProviderVO.of('  facebook  ');
      expect(vo.value).toBe('facebook');
    });

    it('should reject unsupported provider', () => {
      expect(() => SocialProviderVO.of('myspace')).toThrow();
      expect(() => SocialProviderVO.of('')).toThrow();
    });
  });

  describe('isEnterprise()', () => {
    it('should return true for linkedin', () => {
      expect(SocialProviderVO.of('linkedin').isEnterprise()).toBe(true);
    });

    it('should return true for github', () => {
      expect(SocialProviderVO.of('github').isEnterprise()).toBe(true);
    });

    it('should return false for google', () => {
      expect(SocialProviderVO.of('google').isEnterprise()).toBe(false);
    });

    it('should return false for facebook', () => {
      expect(SocialProviderVO.of('facebook').isEnterprise()).toBe(false);
    });
  });
});
