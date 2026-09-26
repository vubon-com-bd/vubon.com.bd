/**
 * PermissionEvaluationService — RBAC evaluation (pure)
 * @module auth-service/domain/services
 *
 * Rules:
 * - SUPER_ADMIN implicitly has all permissions
 * - "*" (wildcard) matches everything
 * - "user:*" matches all user actions
 * - Exact match: "user:view" === "user:view"
 */
import { AuthRoleEntity } from '../entities/auth-role.entity';
import { PermissionNameVO } from '../value-objects/primitives/permission-name.vo';
import { ROLE } from '@vubon/shared-constants/common';

export interface PermissionCheckInput {
  readonly roles: readonly AuthRoleEntity[];
  readonly required: PermissionNameVO;
}

export class PermissionEvaluationService {
  static hasPermission(input: PermissionCheckInput): boolean {
    // Super admin short-circuit
    if (input.roles.some((r) => r.isSuperAdmin())) return true;

    for (const role of input.roles) {
      for (const perm of role.permissions) {
        if (perm.matches(input.required)) return true;
      }
    }
    return false;
  }

  static hasAnyPermission(
    roles: readonly AuthRoleEntity[],
    required: readonly PermissionNameVO[],
  ): boolean {
    return required.some((r) =>
      PermissionEvaluationService.hasPermission({ roles, required: r }),
    );
  }

  static hasAllPermissions(
    roles: readonly AuthRoleEntity[],
    required: readonly PermissionNameVO[],
  ): boolean {
    return required.every((r) =>
      PermissionEvaluationService.hasPermission({ roles, required: r }),
    );
  }

  /** Flatten effective permissions for a set of roles. */
  static effectivePermissions(
    roles: readonly AuthRoleEntity[],
  ): readonly PermissionNameVO[] {
    if (roles.some((r) => r.isSuperAdmin())) {
      return [PermissionNameVO.wildcard()];
    }
    const seen = new Set<string>();
    const out: PermissionNameVO[] = [];
    for (const role of roles) {
      for (const perm of role.permissions) {
        if (!seen.has(perm.value)) {
          seen.add(perm.value);
          out.push(perm);
        }
      }
    }
    return out;
  }

  static isSuperAdmin(roles: readonly AuthRoleEntity[]): boolean {
    return roles.some((r) => r.name.value === ROLE.SUPER_ADMIN);
  }
}
