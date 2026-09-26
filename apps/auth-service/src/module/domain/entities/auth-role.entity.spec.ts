/**
 * AuthRoleEntity — Unit Tests (Aggregate Root)
 * @module auth-service/domain/entities
 */
import { AuthRoleEntity } from './auth-role.entity';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildRole = (overrides: Partial<Parameters<typeof AuthRoleEntity.create>[0]> = {}) =>
  AuthRoleEntity.create({
    id: 'role-1',
    name: RoleNameVO.of('admin'),
    description: RoleDescriptionVO.of('Admin role'),
    permissions: [],
    isSystem: false,
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('AuthRoleEntity (Aggregate Root)', () => {
  describe('create()', () => {
    it('should create valid role', () => {
      const r = buildRole();
      expect(r.name.value).toBe('admin');
      expect(r.description.value).toBe('Admin role');
      expect(r.isSystem).toBe(false);
    });

    it('should accept permissions', () => {
      const r = buildRole({
        permissions: [PermissionNameVO.of('user:view'), PermissionNameVO.of('user:create')],
      });
      expect(r.permissions).toHaveLength(2);
    });

    it('should reject duplicate permissions', () => {
      expect(() =>
        buildRole({
          permissions: [PermissionNameVO.of('user:view'), PermissionNameVO.of('user:view')],
        }),
      ).toThrow('Duplicate permissions in role');
    });

    it('should create system role', () => {
      const r = buildRole({ isSystem: true });
      expect(r.isSystem).toBe(true);
    });
  });

  describe('isSuperAdmin()', () => {
    it('should return true for super_admin role', () => {
      const r = buildRole({ name: RoleNameVO.of('super_admin') });
      expect(r.isSuperAdmin()).toBe(true);
    });

    it('should return false for admin role', () => {
      expect(buildRole().isSuperAdmin()).toBe(false);
    });
  });

  describe('hasPermission()', () => {
    it('should return true for granted permission', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('user:view')] });
      expect(r.hasPermission(PermissionNameVO.of('user:view'))).toBe(true);
    });

    it('should return false for missing permission', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('user:view')] });
      expect(r.hasPermission(PermissionNameVO.of('user:create'))).toBe(false);
    });

    it('wildcard should match anything', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('*')] });
      expect(r.hasPermission(PermissionNameVO.of('user:view'))).toBe(true);
    });

    it('resource wildcard should match', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('user:*')] });
      expect(r.hasPermission(PermissionNameVO.of('user:create'))).toBe(true);
      expect(r.hasPermission(PermissionNameVO.of('product:view'))).toBe(false);
    });
  });

  describe('addPermission()', () => {
    it('should add new permission', () => {
      const r = buildRole();
      r.addPermission(PermissionNameVO.of('user:view'));
      expect(r.hasPermission(PermissionNameVO.of('user:view'))).toBe(true);
    });

    it('should throw on duplicate permission', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('user:view')] });
      expect(() => r.addPermission(PermissionNameVO.of('user:view')))
        .toThrow('already assigned');
    });
  });

  describe('removePermission()', () => {
    it('should remove permission', () => {
      const r = buildRole({
        permissions: [PermissionNameVO.of('user:view'), PermissionNameVO.of('user:create')],
      });
      r.removePermission(PermissionNameVO.of('user:view'));
      expect(r.hasPermission(PermissionNameVO.of('user:view'))).toBe(false);
      expect(r.hasPermission(PermissionNameVO.of('user:create'))).toBe(true);
    });

    it('should throw on system role', () => {
      const r = buildRole({
        isSystem: true,
        permissions: [PermissionNameVO.of('user:view')],
      });
      expect(() => r.removePermission(PermissionNameVO.of('user:view')))
        .toThrow('Cannot modify permissions of a system role');
    });
  });

  describe('rename()', () => {
    it('should rename non-system role', () => {
      const r = buildRole();
      r.rename(RoleNameVO.of('super_admin'));
      expect(r.name.value).toBe('super_admin');
    });

    it('should throw on system role', () => {
      const r = buildRole({ isSystem: true });
      expect(() => r.rename(RoleNameVO.of('admin')))
        .toThrow('Cannot rename a system role');
    });
  });

  describe('getters', () => {
    it('should expose permissions as copy', () => {
      const r = buildRole({ permissions: [PermissionNameVO.of('user:view')] });
      const perms = r.permissions;
      expect(perms).toHaveLength(1);
    });

    it('should expose name', () => {
      expect(buildRole().name.value).toBe('admin');
    });

    it('should expose description', () => {
      expect(buildRole().description.value).toBe('Admin role');
    });

    it('should expose isSystem', () => {
      expect(buildRole().isSystem).toBe(false);
    });
  });
});
