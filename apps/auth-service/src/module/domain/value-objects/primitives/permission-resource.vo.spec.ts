/**
 * PermissionResourceVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { PermissionResourceVO } from './permission-resource.vo';

describe('PermissionResourceVO', () => {
  describe('of()', () => {
    it('should accept simple resource', () => {
      const vo = PermissionResourceVO.of('user');
      expect(vo.value).toBe('user');
    });

    it('should accept resource with underscore', () => {
      const vo = PermissionResourceVO.of('user_profile');
      expect(vo.value).toBe('user_profile');
    });

    it('should accept wildcard', () => {
      const vo = PermissionResourceVO.of('*');
      expect(vo.value).toBe('*');
    });

    it('should normalize to lowercase', () => {
      const vo = PermissionResourceVO.of('USER');
      expect(vo.value).toBe('user');
    });

    it('should reject invalid format', () => {
      expect(() => PermissionResourceVO.of('user-profile')).toThrow();
      expect(() => PermissionResourceVO.of('user profile')).toThrow();
      expect(() => PermissionResourceVO.of('')).toThrow();
    });
  });

  describe('isWildcard()', () => {
    it('should return true for *', () => {
      expect(PermissionResourceVO.of('*').isWildcard()).toBe(true);
    });

    it('should return false for specific resource', () => {
      expect(PermissionResourceVO.of('user').isWildcard()).toBe(false);
    });
  });
});
