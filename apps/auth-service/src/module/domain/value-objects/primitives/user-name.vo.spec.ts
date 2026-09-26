/**
 * UserNameVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserNameVO } from './user-name.vo';
import { InvalidNameError } from '../../errors/user.errors';

describe('UserNameVO', () => {
  describe('of()', () => {
    it('should create from valid name', () => {
      const vo = UserNameVO.of('John Doe');
      expect(vo.value).toBe('John Doe');
    });

    it('should trim whitespace', () => {
      const vo = UserNameVO.of('  John Doe  ');
      expect(vo.value).toBe('John Doe');
    });

    it('should collapse multiple spaces', () => {
      const vo = UserNameVO.of('John    Doe');
      expect(vo.value).toBe('John Doe');
    });

    it('should reject too short (<2 chars)', () => {
      expect(() => UserNameVO.of('J')).toThrow(InvalidNameError);
    });

    it('should reject too long (>100 chars)', () => {
      const longName = 'J'.repeat(101);
      expect(() => UserNameVO.of(longName)).toThrow(InvalidNameError);
    });

    it('should reject name with HTML tags', () => {
      expect(() => UserNameVO.of('<script>alert("x")</script>')).toThrow(InvalidNameError);
      expect(() => UserNameVO.of('John <Doe>')).toThrow(InvalidNameError);
    });

    it('should reject name with control chars', () => {
      expect(() => UserNameVO.of('John\u0000Doe')).toThrow(InvalidNameError);
    });

    it('should accept unicode letters', () => {
      const vo = UserNameVO.of('মোহাম্মদ রফিক');
      expect(vo.value).toBe('মোহাম্মদ রফিক');
    });

    it('should accept apostrophes and hyphens', () => {
      expect(() => UserNameVO.of("O'Brien")).not.toThrow();
      expect(() => UserNameVO.of('Mary-Jane')).not.toThrow();
    });
  });

  describe('firstName getter', () => {
    it('should return first word', () => {
      const vo = UserNameVO.of('John Michael Doe');
      expect(vo.firstName).toBe('John');
    });

    it('should return whole name if single word', () => {
      const vo = UserNameVO.of('John');
      expect(vo.firstName).toBe('John');
    });
  });

  describe('initials getter', () => {
    it('should return first 2 initials', () => {
      const vo = UserNameVO.of('John Doe');
      expect(vo.initials).toBe('JD');
    });

    it('should return single initial for single name', () => {
      const vo = UserNameVO.of('John');
      expect(vo.initials).toBe('J');
    });

    it('should handle 3-word name (first 2 only)', () => {
      const vo = UserNameVO.of('John Michael Doe');
      expect(vo.initials).toBe('JM');
    });
  });
});
