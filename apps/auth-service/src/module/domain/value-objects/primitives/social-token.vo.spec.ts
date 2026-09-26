/**
 * SocialTokenVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SocialTokenVO } from './social-token.vo';

describe('SocialTokenVO', () => {
  const VALID_TOKEN = 'ya29.a0AfH6SMBx' + 'x'.repeat(50);

  describe('of()', () => {
    it('should accept valid token', () => {
      const vo = SocialTokenVO.of(VALID_TOKEN);
      expect(vo.value).toBe(VALID_TOKEN);
    });

    it('should trim whitespace', () => {
      const vo = SocialTokenVO.of(`  ${VALID_TOKEN}  `);
      expect(vo.value).toBe(VALID_TOKEN);
    });

    it('should reject too short (<8 chars)', () => {
      expect(() => SocialTokenVO.of('short')).toThrow();
    });

    it('should reject too long (>4096 chars)', () => {
      expect(() => SocialTokenVO.of('a'.repeat(4097))).toThrow();
    });

    it('should reject whitespace inside token', () => {
      expect(() => SocialTokenVO.of('token with spaces')).toThrow();
    });

    it('should reject non-string', () => {
      expect(() => SocialTokenVO.of(12345 as never)).toThrow();
    });
  });

  describe('masked getter', () => {
    it('should mask middle', () => {
      const vo = SocialTokenVO.of('abcdefghij' + 'x'.repeat(20) + 'wxyz');
      expect(vo.masked).toMatch(/^abcd…wxyz$/);
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = SocialTokenVO.of('abcdefghij' + 'x'.repeat(20) + 'wxyz');
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toContain('…');
    });
  });
});
