/**
 * UserEmailVO — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { UserEmailVO } from '../../../../src/module/domain/value-objects/primitives/user-email.vo.js';

describe('UserEmailVO', () => {
  describe('create()', () => {
    it('creates from valid email', () => {
      const vo = UserEmailVO.create('User@Example.com');
      expect(vo.value).toBe('user@example.com');
    });

    it('normalizes to lowercase', () => {
      expect(UserEmailVO.create('TEST@TEST.COM').value).toBe('test@test.com');
    });

    it('trims whitespace', () => {
      expect(UserEmailVO.create('  user@example.com  ').value).toBe('user@example.com');
    });

    it('throws for empty', () => {
      expect(() => UserEmailVO.create('')).toThrow();
    });

    it('throws for invalid format', () => {
      expect(() => UserEmailVO.create('invalid')).toThrow();
    });

    it('throws for too long', () => {
      const long = 'a'.repeat(300) + '@example.com';
      expect(() => UserEmailVO.create(long)).toThrow();
    });
  });

  describe('getters', () => {
    it('domain returns part after @', () => {
      expect(UserEmailVO.create('user@example.com').domain).toBe('example.com');
    });

    it('localPart returns part before @', () => {
      expect(UserEmailVO.create('user@example.com').localPart).toBe('user');
    });
  });
});
