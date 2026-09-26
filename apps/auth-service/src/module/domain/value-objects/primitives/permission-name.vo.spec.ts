/**
 * PermissionNameVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { PermissionNameVO } from './permission-name.vo';

describe('PermissionNameVO', () => {
  describe('of()', () => {
    it('should accept standard permission format', () => {
      const vo = PermissionNameVO.of('user:create');
      expect(vo.value).toBe('user:create');
    });

    it('should accept wildcard', () => {
      const vo = PermissionNameVO.of('*');
      expect(vo.value).toBe('*');
    });

    it('should normalize to lowercase', () => {
      const vo = PermissionNameVO.of('USER:CREATE');
      expect(vo.value).toBe('user:create');
    });

    it('should reject invalid format', () => {
      expect(() => PermissionNameVO.of('invalid')).toThrow();
      expect(() => PermissionNameVO.of('user:')).toThrow();
      expect(() => PermissionNameVO.of(':create')).toThrow();
    });
  });

  describe('resource / action getters', () => {
    it('should split resource:action', () => {
      const vo = PermissionNameVO.of('user:create');
      expect(vo.resource).toBe('user');
      expect(vo.action).toBe('create');
    });

    it('should return * for wildcard', () => {
      const vo = PermissionNameVO.of('*');
      expect(vo.resource).toBe('*');
      expect(vo.action).toBe('*');
    });
  });

  describe('isWildcard()', () => {
    it('should return true for *', () => {
      expect(PermissionNameVO.of('*').isWildcard()).toBe(true);
    });

    it('should return false for specific permission', () => {
      expect(PermissionNameVO.of('user:view').isWildcard()).toBe(false);
    });
  });

  describe('matches()', () => {
    it('should match exact permission', () => {
      const a = PermissionNameVO.of('user:view');
      const b = PermissionNameVO.of('user:view');
      expect(a.matches(b)).toBe(true);
    });

    it('wildcard should match anything', () => {
      const wildcard = PermissionNameVO.of('*');
      const specific = PermissionNameVO.of('user:view');
      expect(wildcard.matches(specific)).toBe(true);
      expect(specific.matches(wildcard)).toBe(true);
    });

    it('user:* should match user:view', () => {
      const a = PermissionNameVO.of('user:*');
      const b = PermissionNameVO.of('user:view');
      expect(a.matches(b)).toBe(true);
    });

    it('user:* should NOT match product:view', () => {
      const a = PermissionNameVO.of('user:*');
      const b = PermissionNameVO.of('product:view');
      expect(a.matches(b)).toBe(false);
    });

    it('exact match should not match different action', () => {
      const a = PermissionNameVO.of('user:view');
      const b = PermissionNameVO.of('user:create');
      expect(a.matches(b)).toBe(false);
    });
  });
});
