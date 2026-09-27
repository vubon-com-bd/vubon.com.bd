/**
 * UserEmailVO Unit Test
 */
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';

describe('UserEmailVO', () => {
  describe('create', () => {
    it('should create valid email', () => {
      const vo = UserEmailVO.create('user@example.com');
      expect(vo.value).toBe('user@example.com');
    });

    it('should normalize to lowercase', () => {
      const vo = UserEmailVO.create('USER@EXAMPLE.COM');
      expect(vo.value).toBe('user@example.com');
    });

    it('should trim whitespace', () => {
      const vo = UserEmailVO.create('  user@example.com  ');
      expect(vo.value).toBe('user@example.com');
    });

    it('should throw on invalid email', () => {
      expect(() => UserEmailVO.create('not-an-email')).toThrow();
    });

    it('should throw on empty string', () => {
      expect(() => UserEmailVO.create('')).toThrow();
    });
  });

  describe('domain', () => {
    it('should extract domain', () => {
      const vo = UserEmailVO.create('user@example.com');
      expect(vo.domain).toBe('example.com');
    });

    it('should extract localPart', () => {
      const vo = UserEmailVO.create('user@example.com');
      expect(vo.localPart).toBe('user');
    });

    it('should identify gmail', () => {
      const vo = UserEmailVO.create('user@gmail.com');
      expect(vo.isGmail()).toBe(true);
    });

    it('should identify corporate domain', () => {
      const vo = UserEmailVO.create('user@mycompany.com');
      expect(vo.isCorporateDomain()).toBe(true);
    });
  });
});
