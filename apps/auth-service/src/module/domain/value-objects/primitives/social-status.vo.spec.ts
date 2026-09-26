/**
 * SocialStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SocialStatusVO } from './social-status.vo';

describe('SocialStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['active', 'revoked', 'expired', 'pending'].forEach((s) => {
        const vo = SocialStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => SocialStatusVO.of('unknown')).toThrow();
    });
  });

  describe('isActive()', () => {
    it('should return true only for active', () => {
      expect(SocialStatusVO.of('active').isActive()).toBe(true);
      ['revoked', 'expired', 'pending'].forEach((s) => {
        expect(SocialStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });
});
