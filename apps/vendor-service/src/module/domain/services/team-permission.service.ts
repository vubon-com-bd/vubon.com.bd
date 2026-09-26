import { VENDOR_PERMISSION } from '@vubon/shared-constants/business/vendor';
import { TeamRoleVO } from '../value-objects/primitives/team-role.vo';
import { TeamPermissionVO } from '../value-objects/primitives/team-permission.vo';

const ROLE_PERMISSIONS: Readonly<Record<string, readonly string[]>> = {
  vendor_owner: Object.values(VENDOR_PERMISSION),
  vendor_manager: [
    VENDOR_PERMISSION.PROFILE_UPDATE,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.PRODUCT_CREATE,
    VENDOR_PERMISSION.PRODUCT_UPDATE,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_UPDATE,
    VENDOR_PERMISSION.ORDER_FULFILL,
    VENDOR_PERMISSION.TEAM_VIEW,
    VENDOR_PERMISSION.TEAM_MANAGE,
    VENDOR_PERMISSION.TEAM_INVITE,
    VENDOR_PERMISSION.REPORT_VIEW,
    VENDOR_PERMISSION.PAYOUT_VIEW,
  ],
  vendor_staff: [
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.PRODUCT_UPDATE,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_FULFILL,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_viewer: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
};

export class TeamPermissionService {
  getPermissionsForRole(role: TeamRoleVO): readonly TeamPermissionVO[] {
    const allowed = ROLE_PERMISSIONS[role.value] ?? [];
    return allowed.map((p) => TeamPermissionVO.create(p));
  }

  can(role: TeamRoleVO, permission: TeamPermissionVO): boolean {
    const allowed = ROLE_PERMISSIONS[role.value] ?? [];
    return allowed.includes(permission.value);
  }

  canAny(role: TeamRoleVO, permissions: readonly TeamPermissionVO[]): boolean {
    return permissions.some((p) => this.can(role, p));
  }

  canAll(role: TeamRoleVO, permissions: readonly TeamPermissionVO[]): boolean {
    return permissions.every((p) => this.can(role, p));
  }
}
