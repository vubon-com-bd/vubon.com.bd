/**
 * PasswordHashVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PasswordHashVO } from '@domain/value-objects/primitives/password-hash.vo.js';
import { PasswordHashInvalidError } from '@domain/errors/credential.errors.js';
import { TEST_PASSWORD_HASH } from '@fixtures/index';

describe('PasswordHashVO', () => {
  describe('create()', () => {
    it('should accept valid bcrypt hash', () => {
      // 60-char bcrypt format: $2b$12$ + 53 chars
      const valid = '$2b$12$' + 'a'.repeat(53);
      const vo = PasswordHashVO.create(valid);
      expect(vo.value).toBe(valid);
      expect(vo.algorithm).toBe('bcrypt');
      expect(vo.cost).toBe(12);
    });

    it('should throw on empty', () => {
      expect(() => PasswordHashVO.create('')).toThrow(PasswordHashInvalidError);
    });

    it('should throw on non-bcrypt format', () => {
      expect(() => PasswordHashVO.create('plaintext')).toThrow(PasswordHashInvalidError);
    });

    it('should parse cost correctly', () => {
      const hash = '$2b$14$' + 'a'.repeat(53);
      expect(PasswordHashVO.create(hash).cost).toBe(14);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      expect(PasswordHashVO.reconstitute('x').value).toBe('x');
    });
  });
});
