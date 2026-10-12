/**
 * PermissionEvaluatorService
 * @module identity-service/domain/services
 */
import { PERMISSION } from '@vubon/shared-constants/common';

export interface PermissionContext {
  readonly userPermissions: readonly string[];
  readonly userRoles: readonly string[];
  readonly resourceOwnerId?: string;
  readonly userId: string;
}

export class PermissionEvaluatorService {
  /**
   * Check if user has a permission.
   * Rules:
   *   - "*" (wildcard ALL) grants everything
   *   - exact match grants
   *   - resource wildcard "resource:*" grants
   */
  static has(permission: string, context: PermissionContext): boolean {
    const perms = context.userPermissions;
    if (perms.includes(PERMISSION.ALL)) return true;
    if (perms.includes(permission)) return true;

    // resource wildcard: "auth:*" matches "auth:login"
    const [resource] = permission.split(':');
    if (resource && perms.includes(`${resource}:*`)) return true;

    return false;
  }

  /**
   * Check if user has any of the permissions.
   */
  static hasAny(permissions: readonly string[], context: PermissionContext): boolean {
    return permissions.some((p) => this.has(p, context));
  }

  /**
   * Check if user has all of the permissions.
   */
  static hasAll(permissions: readonly string[], context: PermissionContext): boolean {
    return permissions.every((p) => this.has(p, context));
  }

  /**
   * Ownership check — user can act on own resource.
   */
  static canAccessOwn(context: PermissionContext): boolean {
    return context.userId === context.resourceOwnerId;
  }

  /**
   * Evaluate combined: permission OR ownership.
   */
  static canAccess(
    permission: string,
    context: PermissionContext,
  ): boolean {
    return this.has(permission, context) || this.canAccessOwn(context);
  }

  /**
   * Role-based fallback — admin gets all.
   */
  static isAdminBypass(roles: readonly string[]): boolean {
    return roles.some((r) =>
      [PERMISSION.ALL, 'admin', 'super_admin', 'moderator'].includes(r),
    );
  }
}
