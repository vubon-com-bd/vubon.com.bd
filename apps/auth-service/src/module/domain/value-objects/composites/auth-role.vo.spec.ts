/**
 * AuthRoleVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { AuthRoleVO } from './auth-role.vo';
import { RoleNameVO } from '../primitives/role-name.vo';
import { RoleDescriptionVO } from '../primitives/role-description.vo';
import { PermissionNameVO } from '../primitives/permission-name.vo';

describe('AuthRoleVO', () => {
  const buildRole = (permissions: PermissionNameVO[] = []) =>
    AuthRoleVO.of({
      name: RoleNameVO.of('admin'),
      description: RoleDescriptionVO.of('Administrator role'),
      permissions,
      isSystem: false,
    });

  describe('of()', () => {
    it('should create valid role', () => {
      const vo = buildRole([PermissionNameVO.of('user:view')]);
      expect(vo.name.value).toBe('admin');
      expect(vo.permissionCount()).toBe(1);
    });

    it('should reject duplicate permissions', () => {
      expect(() => buildRole([
        PermissionNameVO.of('user:view'),
        PermissionNameVO.of('user:view'),
      ])).toThrow('Duplicate permissions');
    });
  });

  describe('hasPermission()', () => {
    it('should return true for granted permission', () => {
      const vo = buildRole([PermissionNameVO.of('user:view')]);
      expect(vo.hasPermission(PermissionNameVO.of('user:view'))).toBe(true);
    });

    it('should return false for missing permission', () => {
      const vo = buildRole([PermissionNameVO.of('user:view')]);
      expect(vo.hasPermission(PermissionNameVO.of('user:create'))).toBe(false);
    });

    it('wildcard permission should match', () => {
      const vo = buildRole([PermissionNameVO.of('*')]);
      expect(vo.hasPermission(PermissionNameVO.of('user:view'))).toBe(true);
    });

    it('resource wildcard should match', () => {
      const vo = buildRole([PermissionNameVO.of('user:*')]);
      expect(vo.hasPermission(PermissionNameVO.of('user:create'))).toBe(true);
      expect(vo.hasPermission(PermissionNameVO.of('product:view'))).toBe(false);
    });
  });

  describe('isSuperAdmin()', () => {
    it('should return true for super_admin role', () => {
      const vo = AuthRoleVO.of({
        name: RoleNameVO.of('super_admin'),
        description: RoleDescriptionVO.of('Super admin'),
        permissions: [],
        isSystem: true,
      });
      expect(vo.isSuperAdmin()).toBe(true);
    });

    it('should return false for admin role', () => {
      expect(buildRole().isSuperAdmin()).toBe(false);
    });
  });

  describe('permissionCount()', () => {
    it('should return correct count', () => {
      const vo = buildRole([
        PermissionNameVO.of('user:view'),
        PermissionNameVO.of('user:create'),
        PermissionNameVO.of('user:update'),
      ]);
      expect(vo.permissionCount()).toBe(3);
    });

    it('should return 0 for empty permissions', () => {
      expect(buildRole().permissionCount()).toBe(0);
    });
  });
});
