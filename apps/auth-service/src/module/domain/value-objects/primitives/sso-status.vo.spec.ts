/**
 * SsoStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SsoStatusVO } from './sso-status.vo';

describe('SsoStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['active', 'expired', 'revoked', 'pending'].forEach((s) => {
        const vo = SsoStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => SsoStatusVO.of('unknown')).toThrow();
    });
  });

  describe('isActive()', () => {
    it('should return true only for active', () => {
      expect(SsoStatusVO.of('active').isActive()).toBe(true);
      ['expired', 'revoked', 'pending'].forEach((s) => {
        expect(SsoStatusVO.of(s).isActive()).toBe(false);
      });
    });
  });
});
