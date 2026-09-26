/**
 * OAuthStatusVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { OAuthStatusVO } from './oauth-status.vo';

describe('OAuthStatusVO', () => {
  describe('of()', () => {
    it('should accept all valid statuses', () => {
      ['active', 'expired', 'revoked'].forEach((s) => {
        const vo = OAuthStatusVO.of(s);
        expect(vo.value).toBe(s);
      });
    });

    it('should reject invalid status', () => {
      expect(() => OAuthStatusVO.of('unknown')).toThrow();
    });
  });

  describe('needsRefresh()', () => {
    it('should return true only for expired', () => {
      expect(OAuthStatusVO.of('expired').needsRefresh()).toBe(true);
      ['active', 'revoked'].forEach((s) => {
        expect(OAuthStatusVO.of(s).needsRefresh()).toBe(false);
      });
    });
  });
});
