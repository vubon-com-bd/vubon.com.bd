/**
 * AuthPermissionVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthPermissionVO } from './auth-permission.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';
import { PermissionActionVO } from '../primitives/permission-action.vo';
import { PermissionResourceVO } from '../primitives/permission-resource.vo';

describe('AuthPermissionVO', () => {
  describe('of()', () => {
    it('should create valid permission', () => {
      const vo = AuthPermissionVO.of({
        name: PermissionNameVO.of('user:view'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('view'),
      });
      expect(vo.name.value).toBe('user:view');
      expect(vo.resource.value).toBe('user');
      expect(vo.action.value).toBe('view');
    });

    it('should create wildcard permission', () => {
      const vo = AuthPermissionVO.of({
        name: PermissionNameVO.of('*'),
        resource: PermissionResourceVO.of('*'),
        action: PermissionActionVO.of('*'),
      });
      expect(vo.name.isWildcard()).toBe(true);
    });

    it('should reject name mismatch', () => {
      expect(() => AuthPermissionVO.of({
        name: PermissionNameVO.of('user:view'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('create'),
      })).toThrow('must equal');
    });
  });

  describe('matches()', () => {
    it('should match exact permission', () => {
      const a = AuthPermissionVO.of({
        name: PermissionNameVO.of('user:view'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('view'),
      });
      const b = AuthPermissionVO.of({
        name: PermissionNameVO.of('user:view'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('view'),
      });
      expect(a.matches(b)).toBe(true);
    });

    it('wildcard should match anything', () => {
      const wildcard = AuthPermissionVO.of({
        name: PermissionNameVO.of('*'),
        resource: PermissionResourceVO.of('*'),
        action: PermissionActionVO.of('*'),
      });
      const specific = AuthPermissionVO.of({
        name: PermissionNameVO.of('user:view'),
        resource: PermissionResourceVO.of('user'),
        action: PermissionActionVO.of('view'),
      });
      expect(wildcard.matches(specific)).toBe(true);
    });
  });
});
