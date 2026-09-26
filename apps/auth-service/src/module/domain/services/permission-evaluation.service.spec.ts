/**
 * PermissionEvaluationService — Unit Tests
 * @module auth-service/domain/services
 */
import { PermissionEvaluationService } from './permission-evaluation.service';
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { RoleNameVO } from '../value-objects/primitives/role-name.vo';
import { RoleDescriptionVO } from '../value-objects/primitives/role-description.vo';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';

const NOW = '2024-01-01T00:00:00.000Z';

const buildRole = (
  name: string,
  perms: string[],
  isSystem = false,
): AuthRoleEntity =>
  AuthRoleEntity.create({
    id: `role-${name}`,
    name: RoleNameVO.of(name),
    description: RoleDescriptionVO.of(`${name} role`),
    permissions: perms.map((p) => PermissionNameVO.of(p)),
    isSystem,
    createdAt: NOW,
    updatedAt: NOW,
  });

describe('PermissionEvaluationService', () => {
  // ═══════════════════════════════════════════════════════════
  // hasPermission
  // ═══════════════════════════════════════════════════════════

  describe('hasPermission()', () => {
    it('should return true for exact match', () => {
      const roles = [buildRole('admin', ['user:view'])];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('user:view'),
      });
      expect(result).toBe(true);
    });

    it('should return false for missing permission', () => {
      const roles = [buildRole('admin', ['user:view'])];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('user:create'),
      });
      expect(result).toBe(false);
    });

    it('should return true for super_admin without permissions', () => {
      const roles = [buildRole('super_admin', [], true)];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('user:delete'),
      });
      expect(result).toBe(true);
    });

    it('should return true when user has wildcard permission', () => {
      const roles = [buildRole('admin', ['*'])];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('user:create'),
      });
      expect(result).toBe(true);
    });

    it('should return true for resource wildcard match', () => {
      const roles = [buildRole('vendor_manager', ['user:*'])];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('user:view'),
      });
      expect(result).toBe(true);
    });

    it('should return false when resource wildcard mismatches', () => {
      const roles = [buildRole('vendor_manager', ['user:*'])];
      const result = PermissionEvaluationService.hasPermission({
        roles,
        required: PermissionNameVO.of('product:view'),
      });
      expect(result).toBe(false);
    });

    it('should return false with empty roles', () => {
      const result = PermissionEvaluationService.hasPermission({
        roles: [],
        required: PermissionNameVO.of('user:view'),
      });
      expect(result).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // hasAnyPermission
  // ═══════════════════════════════════════════════════════════

  describe('hasAnyPermission()', () => {
    it('should return true if user has at least one', () => {
      const roles = [buildRole('admin', ['user:view'])];
      expect(
        PermissionEvaluationService.hasAnyPermission(roles, [
          PermissionNameVO.of('user:view'),
          PermissionNameVO.of('user:create'),
        ]),
      ).toBe(true);
    });

    it('should return false if user has none', () => {
      const roles = [buildRole('admin', ['user:view'])];
      expect(
        PermissionEvaluationService.hasAnyPermission(roles, [
          PermissionNameVO.of('product:view'),
          PermissionNameVO.of('product:create'),
        ]),
      ).toBe(false);
    });

    it('should return false for empty required list', () => {
      const roles = [buildRole('admin', ['user:view'])];
      expect(PermissionEvaluationService.hasAnyPermission(roles, [])).toBe(false);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // hasAllPermissions
  // ═══════════════════════════════════════════════════════════

  describe('hasAllPermissions()', () => {
    it('should return true when user has all', () => {
      const roles = [buildRole('admin', ['user:view', 'user:create'])];
      expect(
        PermissionEvaluationService.hasAllPermissions(roles, [
          PermissionNameVO.of('user:view'),
          PermissionNameVO.of('user:create'),
        ]),
      ).toBe(true);
    });

    it('should return false when user missing one', () => {
      const roles = [buildRole('admin', ['user:view'])];
      expect(
        PermissionEvaluationService.hasAllPermissions(roles, [
          PermissionNameVO.of('user:view'),
          PermissionNameVO.of('user:create'),
        ]),
      ).toBe(false);
    });

    it('should return true for empty required list', () => {
      const roles = [buildRole('admin', ['user:view'])];
      expect(PermissionEvaluationService.hasAllPermissions(roles, [])).toBe(true);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // effectivePermissions
  // ═══════════════════════════════════════════════════════════

  describe('effectivePermissions()', () => {
    it('should merge permissions from multiple roles (dedup)', () => {
      const roles = [
        buildRole('admin', ['user:view', 'user:create']),
        buildRole('moderator', ['user:view', 'user:update']),
      ];
      const perms = PermissionEvaluationService.effectivePermissions(roles);
      const values = perms.map((p) => p.value);
      expect(values).toEqual(expect.arrayContaining(['user:view', 'user:create', 'user:update']));
      // No duplicates
      expect(new Set(values).size).toBe(values.length);
    });

    it('should return wildcard for super_admin', () => {
      const roles = [buildRole('super_admin', [], true)];
      const perms = PermissionEvaluationService.effectivePermissions(roles);
      expect(perms).toHaveLength(1);
      expect(perms[0]?.value).toBe('*');
    });

    it('should return [] for no roles', () => {
      expect(PermissionEvaluationService.effectivePermissions([])).toEqual([]);
    });
  });

  // ═══════════════════════════════════════════════════════════
  // isSuperAdmin
  // ═══════════════════════════════════════════════════════════

  describe('isSuperAdmin()', () => {
    it('should return true for super_admin', () => {
      const roles = [buildRole('super_admin', [], true)];
      expect(PermissionEvaluationService.isSuperAdmin(roles)).toBe(true);
    });

    it('should return false for admin', () => {
      const roles = [buildRole('admin', ['*'])];
      expect(PermissionEvaluationService.isSuperAdmin(roles)).toBe(false);
    });

    it('should return false for empty', () => {
      expect(PermissionEvaluationService.isSuperAdmin([])).toBe(false);
    });
  });
});
