/**
 * RoleAssignmentService — Rules for assigning/revoking roles
 * @module auth-service/domain/services
 *
 * Business rules:
 * - Only a super_admin can grant/revoke super_admin
 * - A user cannot have duplicate roles
 * - Vendor role requires verified email + phone
 */
import { UserEntity } from '../entities/user.entity';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { InvalidRoleError, PermissionDeniedError } from '../errors/permission.errors';
import { ROLE } from '@vubon/shared-constants/common';

export class RoleAssignmentService {
  /**
   * Validate that `actor` may assign `targetRole` to `target`.
   */
  static assertCanAssign(
    actor: UserEntity,
    target: UserEntity,
    targetRole: UserRoleVO,
  ): void {
    if (!targetRole.isSuperAdmin()) return;

    if (!actor.isSuperAdmin()) {
      throw new PermissionDeniedError('Cannot assign super_admin role');
    }
    if (target.hasRole(targetRole)) {
      throw new InvalidRoleError(`User already has role: ${targetRole.value}`);
    }
  }

  static assertCanRevoke(
    actor: UserEntity,
    target: UserEntity,
    targetRole: UserRoleVO,
  ): void {
    if (targetRole.isSuperAdmin() && !actor.isSuperAdmin()) {
      throw new PermissionDeniedError('Cannot revoke super_admin role');
    }
    if (targetRole.isSuperAdmin() && actor.id === target.id) {
      throw new PermissionDeniedError('Cannot revoke your own super_admin role');
    }
    if (!target.hasRole(targetRole)) {
      throw new InvalidRoleError(`User does not have role: ${targetRole.value}`);
    }
  }

  static canAssignVendor(user: UserEntity): boolean {
    return user.emailVerified && user.phoneVerified;
  }

  static assertVendorEligible(user: UserEntity): void {
    if (!RoleAssignmentService.canAssignVendor(user)) {
      throw new InvalidRoleError(
        `Cannot assign ${ROLE.VENDOR}: email and phone must be verified`,
      );
    }
  }

  /** Default roles assigned at registration. */
  static defaultRolesFor(): readonly UserRoleVO[] {
    return [UserRoleVO.customer()];
  }
}
