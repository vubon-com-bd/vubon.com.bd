/**
 * SsoTokenVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { SsoTokenVO } from './sso-token.vo';

describe('SsoTokenVO', () => {
  const VALID = 'x'.repeat(100);

  describe('of()', () => {
    it('should accept valid token', () => {
      const vo = SsoTokenVO.of(VALID);
      expect(vo.value).toBe(VALID);
    });

    it('should trim whitespace', () => {
      const vo = SsoTokenVO.of(`  ${VALID}  `);
      expect(vo.value).toBe(VALID);
    });

    it('should reject too short (<16 chars)', () => {
      expect(() => SsoTokenVO.of('short')).toThrow();
    });

    it('should reject too long (>8192 chars)', () => {
      expect(() => SsoTokenVO.of('a'.repeat(8193))).toThrow();
    });

    it('should reject non-string', () => {
      expect(() => SsoTokenVO.of(12345 as never)).toThrow();
    });
  });

  describe('masked getter', () => {
    it('should mask with first 6 + last 6', () => {
      const vo = SsoTokenVO.of('abcdefghij' + 'x'.repeat(30) + 'wxyzAB');
      expect(vo.masked).toMatch(/^abcdef…wxyzAB$/);
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = SsoTokenVO.of('abcdefghij' + 'x'.repeat(30) + 'wxyzAB');
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toContain('…');
    });
  });
});
