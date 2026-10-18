/**
 * TokenValueVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { TokenValueVO } from '@domain/value-objects/primitives/token-value.vo.js';
import { InvalidTokenFormatError } from '@domain/errors/token.errors.js';

describe('TokenValueVO', () => {
  it('should create valid token', () => {
    const t = 'a'.repeat(32);
    expect(TokenValueVO.create(t).value).toBe(t);
  });

  it('should throw on too short', () => {
    expect(() => TokenValueVO.create('abc')).toThrow(InvalidTokenFormatError);
  });

  it('should throw on too long', () => {
    expect(() => TokenValueVO.create('a'.repeat(10000))).toThrow(InvalidTokenFormatError);
  });

  it('should throw on empty', () => {
    expect(() => TokenValueVO.create('')).toThrow(InvalidTokenFormatError);
  });

  it('isJwt should detect 3-part tokens', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature';
    expect(TokenValueVO.create(jwt).isJwt).toBe(true);
    expect(TokenValueVO.create('a'.repeat(32)).isJwt).toBe(false);
  });

  it('masked should hide middle', () => {
    const t = 'abcdefghijklmnopqrstuvwxyz1234567890';
    const masked = TokenValueVO.create(t).masked;
    expect(masked).toContain('...');
    expect(masked).not.toBe(t);
  });

  it('should reconstitute without validation', () => {
    expect(TokenValueVO.reconstitute('x').value).toBe('x');
  });
});
