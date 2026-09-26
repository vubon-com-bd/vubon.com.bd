/**
 * TokenValueVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { TokenValueVO } from './token-value.vo';
import { InvalidTokenError } from '../../errors/token.errors';

describe('TokenValueVO', () => {
  const JWT_LIKE = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIn0.abcdefg';
  const OPAQUE = 'a'.repeat(64);

  describe('of()', () => {
    it('should accept JWT-like token', () => {
      const vo = TokenValueVO.of(JWT_LIKE);
      expect(vo.value).toBe(JWT_LIKE);
    });

    it('should accept opaque token', () => {
      const vo = TokenValueVO.of(OPAQUE);
      expect(vo.value).toBe(OPAQUE);
    });

    it('should trim whitespace', () => {
      const vo = TokenValueVO.of(`  ${OPAQUE}  `);
      expect(vo.value).toBe(OPAQUE);
    });

    it('should reject too short (<8 chars)', () => {
      expect(() => TokenValueVO.of('short')).toThrow(InvalidTokenError);
    });

    it('should reject too long (>4096 chars)', () => {
      expect(() => TokenValueVO.of('a'.repeat(4097))).toThrow(InvalidTokenError);
    });

    it('should reject whitespace in token', () => {
      expect(() => TokenValueVO.of('abc def ghi')).toThrow('must not contain whitespace');
    });

    it('should reject non-string', () => {
      expect(() => TokenValueVO.of(123 as never)).toThrow(InvalidTokenError);
    });
  });

  describe('isJwt()', () => {
    it('should return true for 3-segment token', () => {
      const vo = TokenValueVO.of(JWT_LIKE);
      expect(vo.isJwt()).toBe(true);
    });

    it('should return false for 2-segment (valid length)', () => {
      const vo = TokenValueVO.of('abcdefgh.12345678'); // 17 chars, 2 segments
      expect(vo.isJwt()).toBe(false);
    });

    it('should return false for opaque token', () => {
      const vo = TokenValueVO.of(OPAQUE);
      expect(vo.isJwt()).toBe(false);
    });
  });

  describe('masked getter', () => {
    it('should mask long tokens', () => {
      const vo = TokenValueVO.of('abcdefghij' + 'x'.repeat(20) + 'wxyz');
      expect(vo.masked).toMatch(/^abcd…wxyz$/);
    });

    it('should return *** for short token', () => {
      const vo = TokenValueVO.of('abcdefgh'); // 8 chars
      expect(vo.masked).toBe('***');
    });
  });

  describe('toJSON()', () => {
    it('should return masked value', () => {
      const vo = TokenValueVO.of('abcdefghij' + 'x'.repeat(20) + 'wxyz');
      const json = JSON.parse(JSON.stringify(vo));
      expect(json).toContain('…');
    });
  });
});
