/**
 * UserIdVO Unit Test
 */
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';

describe('UserIdVO', () => {
  describe('create', () => {
    it('should create a valid UserIdVO', () => {
      const vo = UserIdVO.create('abc-123');
      expect(vo.value).toBe('abc-123');
    });

    it('should trim whitespace', () => {
      const vo = UserIdVO.create('  abc-123  ');
      expect(vo.value).toBe('abc-123');
    });

    it('should throw on empty string', () => {
      expect(() => UserIdVO.create('')).toThrow('UserId cannot be empty');
    });

    it('should throw on whitespace-only string', () => {
      expect(() => UserIdVO.create('   ')).toThrow('UserId cannot be empty');
    });

    it('should throw on non-string input', () => {
      expect(() => UserIdVO.create(123 as never)).toThrow('UserId must be a string');
    });

    it('should throw on too-long string', () => {
      const long = 'a'.repeat(200);
      expect(() => UserIdVO.create(long)).toThrow('UserId too long');
    });
  });

  describe('equality', () => {
    it('should equal same value', () => {
      const a = UserIdVO.create('same');
      const b = UserIdVO.create('same');
      expect(a.equals(b)).toBe(true);
    });

    it('should not equal different value', () => {
      const a = UserIdVO.create('a');
      const b = UserIdVO.create('b');
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the value', () => {
      const vo = UserIdVO.create('xyz');
      expect(vo.toString()).toBe('xyz');
    });
  });
});
