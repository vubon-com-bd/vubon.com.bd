/**
 * UserIdVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { UserIdVO } from './user-id.vo';

describe('UserIdVO', () => {
  describe('of()', () => {
    it('should create from non-empty string', () => {
      const vo = UserIdVO.of('user-123');
      expect(vo.value).toBe('user-123');
    });

    it('should trim whitespace', () => {
      const vo = UserIdVO.of('  user-123  ');
      expect(vo.value).toBe('user-123');
    });

    it('should reject empty string', () => {
      expect(() => UserIdVO.of('')).toThrow('UserId cannot be empty');
    });

    it('should reject whitespace-only string', () => {
      expect(() => UserIdVO.of('   ')).toThrow('UserId cannot be empty');
    });

    it('should reject very long id (>64 chars)', () => {
      const longId = 'x'.repeat(65);
      expect(() => UserIdVO.of(longId)).toThrow('UserId exceeds max length');
    });

    it('should accept 64-char id (max boundary)', () => {
      const maxId = 'x'.repeat(64);
      const vo = UserIdVO.of(maxId);
      expect(vo.value).toBe(maxId);
    });

    it('should accept 1-char id (min boundary)', () => {
      const vo = UserIdVO.of('x');
      expect(vo.value).toBe('x');
    });
  });

  describe('length getter', () => {
    it('should return correct length', () => {
      const vo = UserIdVO.of('user-123');
      expect(vo.length).toBe(8);
    });
  });

  describe('equals()', () => {
    it('should equal same value', () => {
      const a = UserIdVO.of('user-123');
      const b = UserIdVO.of('user-123');
      expect(a.equals(b)).toBe(true);
    });

    it('should not equal different value', () => {
      const a = UserIdVO.of('user-123');
      const b = UserIdVO.of('user-456');
      expect(a.equals(b)).toBe(false);
    });
  });
});
