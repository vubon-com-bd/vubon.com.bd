/**
 * UserEmailVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserEmailVO } from './user-email.vo';
import { InvalidEmailError } from '../../errors/user.errors';

describe('UserEmailVO', () => {
  describe('of()', () => {
    it('should create from valid email', () => {
      const vo = UserEmailVO.of('john@example.com');
      expect(vo.value).toBe('john@example.com');
    });

    it('should normalize to lowercase', () => {
      const vo = UserEmailVO.of('JOHN@EXAMPLE.COM');
      expect(vo.value).toBe('john@example.com');
    });

    it('should trim whitespace', () => {
      const vo = UserEmailVO.of('  john@example.com  ');
      expect(vo.value).toBe('john@example.com');
    });

    it('should reject empty string', () => {
      expect(() => UserEmailVO.of('')).toThrow(InvalidEmailError);
    });

    it('should reject invalid format', () => {
      expect(() => UserEmailVO.of('not-an-email')).toThrow(InvalidEmailError);
      expect(() => UserEmailVO.of('@example.com')).toThrow(InvalidEmailError);
      expect(() => UserEmailVO.of('john@')).toThrow(InvalidEmailError);
    });

    it('should reject very long email', () => {
      const longEmail = `${'a'.repeat(250)}@example.com`;
      expect(() => UserEmailVO.of(longEmail)).toThrow(InvalidEmailError);
    });
  });

  describe('equalsIgnoringAlias()', () => {
    it('should treat gmail dots as equivalent', () => {
      const a = UserEmailVO.of('john.doe@gmail.com');
      const b = UserEmailVO.of('johndoe@gmail.com');
      expect(a.equalsIgnoringAlias(b)).toBe(true);
    });

    it('should treat gmail plus alias as equivalent', () => {
      const a = UserEmailVO.of('john+shop@gmail.com');
      const b = UserEmailVO.of('john@gmail.com');
      expect(a.equalsIgnoringAlias(b)).toBe(true);
    });

    it('should NOT treat other domains as equivalent', () => {
      const a = UserEmailVO.of('john.doe@yahoo.com');
      const b = UserEmailVO.of('johndoe@yahoo.com');
      expect(a.equalsIgnoringAlias(b)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the raw value', () => {
      const vo = UserEmailVO.of('john@example.com');
      expect(vo.toString()).toBe('john@example.com');
    });
  });
});
