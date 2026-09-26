/**
 * OAuthTokenVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { OAuthTokenVO } from './oauth-token.vo';

describe('OAuthTokenVO', () => {
  const VALID_TOKEN = 'ya29.a0AfH6SMBx' + 'x'.repeat(50);

  describe('of()', () => {
    it('should accept valid token', () => {
      const vo = OAuthTokenVO.of(VALID_TOKEN);
      expect(vo.value).toBe(VALID_TOKEN);
    });

    it('should reject too short', () => {
      expect(() => OAuthTokenVO.of('short')).toThrow();
    });

    it('should reject too long (>4096 chars)', () => {
      expect(() => OAuthTokenVO.of('a'.repeat(4097))).toThrow();
    });

    it('should reject non-string', () => {
      expect(() => OAuthTokenVO.of(12345 as never)).toThrow();
    });
  });

  describe('masked getter', () => {
    it('should mask middle', () => {
      const vo = OAuthTokenVO.of('abcdefghij' + 'x'.repeat(20) + 'wxyz');
      expect(vo.masked).toMatch(/^abcd…wxyz$/);
    });
  });
});
