/**
 * TeamPermissionService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute effective permissions from role + overrides
 *  - Check permission grant/revoke rules
 *  - Determine role-based default permissions
 *  - Enforce last-owner protection
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_PERMISSION } from '@vubon/shared-constants/business';
import type { TeamRoleVO } from '../value-objects/primitives/team-role.vo.js';

// ─── Default Permissions by Role ──────────
const ROLE_DEFAULT_PERMISSIONS: Record<string, readonly string[]> = {
  vendor_owner: Object.values(VENDOR_PERMISSION),
  vendor_manager: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PROFILE_UPDATE,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.PRODUCT_CREATE,
    VENDOR_PERMISSION.PRODUCT_UPDATE,
    VENDOR_PERMISSION.PRODUCT_DELETE,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_UPDATE,
    VENDOR_PERMISSION.ORDER_FULFILL,
    VENDOR_PERMISSION.ORDER_CANCEL,
    VENDOR_PERMISSION.PAYOUT_VIEW,
    VENDOR_PERMISSION.TEAM_VIEW,
    VENDOR_PERMISSION.TEAM_MANAGE,
    VENDOR_PERMISSION.TEAM_INVITE,
    VENDOR_PERMISSION.REPORT_VIEW,
    VENDOR_PERMISSION.REPORT_EXPORT,
    VENDOR_PERMISSION.SETTINGS_VIEW,
    VENDOR_PERMISSION.SETTINGS_MANAGE,
  ],
  vendor_staff: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_UPDATE,
    VENDOR_PERMISSION.ORDER_FULFILL,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_accountant: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.PAYOUT_VIEW,
    VENDOR_PERMISSION.PAYOUT_REQUEST,
    VENDOR_PERMISSION.REPORT_VIEW,
    VENDOR_PERMISSION.REPORT_EXPORT,
  ],
  vendor_inventory_manager: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.PRODUCT_CREATE,
    VENDOR_PERMISSION.PRODUCT_UPDATE,
    VENDOR_PERMISSION.PRODUCT_DELETE,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_order_manager: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_UPDATE,
    VENDOR_PERMISSION.ORDER_FULFILL,
    VENDOR_PERMISSION.ORDER_CANCEL,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_customer_support: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.ORDER_UPDATE,
    VENDOR_PERMISSION.ORDER_CANCEL,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_marketing: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PROFILE_UPDATE,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
  vendor_viewer: [
    VENDOR_PERMISSION.PROFILE_VIEW,
    VENDOR_PERMISSION.PRODUCT_VIEW,
    VENDOR_PERMISSION.ORDER_VIEW,
    VENDOR_PERMISSION.REPORT_VIEW,
  ],
};

// ─── Permission Check Result ──────────────
export interface PermissionCheckResult {
  readonly granted: boolean;
  readonly reason: string;
  readonly source: 'role' | 'override' | 'denial' | 'none';
}

// ─── Effective Permission Input ──────────
export interface EffectivePermissionInput {
  readonly role: TeamRoleVO;
  readonly overrides: readonly string[];
  readonly denials: readonly string[];
}

export class TeamPermissionService {
  /**
   * Default permissions for a role।
   */
  static getDefaultPermissions(role: TeamRoleVO): readonly string[] {
    return ROLE_DEFAULT_PERMISSIONS[role.value] ?? [];
  }

  /**
   * Effective permissions compute করো (role + overrides - denials)।
   */
  static computeEffective(input: EffectivePermissionInput): readonly string[] {
    const rolePermissions = new Set(this.getDefaultPermissions(input.role));
    const overrides = new Set(input.overrides);
    const denials = new Set(input.denials);

    // Owner gets all, no denial possible
    if (input.role.isOwner()) {
      return [...ROLE_DEFAULT_PERMISSIONS.vendor_owner!];
    }

    const effective = new Set<string>();
    for (const p of rolePermissions) {
      if (!denials.has(p)) effective.add(p);
    }
    for (const p of overrides) {
      if (!denials.has(p)) effective.add(p);
    }

    return [...effective];
  }

  /**
   * Permission check with source attribution।
   */
  static check(input: EffectivePermissionInput, permission: string): PermissionCheckResult {
    if (!permission || permission.trim().length === 0) {
      throw new BusinessRuleError(
        'permission must be a non-empty string',
        'INVALID_PERMISSION',
      );
    }

    // Owner bypasses all
    if (input.role.isOwner()) {
      return { granted: true, reason: 'Owner role grants all permissions', source: 'role' };
    }

    if (input.denials.includes(permission)) {
      return {
        granted: false,
        reason: `Permission denied by explicit denial`,
        source: 'denial',
      };
    }

    if (input.overrides.includes(permission)) {
      return {
        granted: true,
        reason: 'Permission granted by explicit override',
        source: 'override',
      };
    }

    const roleDefaults = this.getDefaultPermissions(input.role);
    if (roleDefaults.includes(permission)) {
      return {
        granted: true,
        reason: `Permission granted by role "${input.role.value}"`,
        source: 'role',
      };
    }

    return {
      granted: false,
      reason: 'Permission not granted by role or override',
      source: 'none',
    };
  }

  /**
   * Multiple permissions check।
   */
  static checkAny(
    input: EffectivePermissionInput,
    permissions: readonly string[],
  ): boolean {
    return permissions.some((p) => this.check(input, p).granted);
  }

  static checkAll(
    input: EffectivePermissionInput,
    permissions: readonly string[],
  ): boolean {
    return permissions.every((p) => this.check(input, p).granted);
  }

  /**
   * Permission grant validate করো।
   */
  static canGrant(
    input: EffectivePermissionInput,
    permission: string,
  ): { readonly allowed: boolean; readonly reason: string } {
    if (!permission || !/^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/.test(permission)) {
      return { allowed: false, reason: 'Invalid permission format' };
    }

    const validPermissions = new Set(Object.values(VENDOR_PERMISSION));
    if (!validPermissions.has(permission as typeof VENDOR_PERMISSION[keyof typeof VENDOR_PERMISSION])) {
      return { allowed: false, reason: `Unknown permission: ${permission}` };
    }

    if (input.role.isViewer()) {
      return { allowed: false, reason: 'Cannot modify viewer permissions' };
    }

    return { allowed: true, reason: 'Grant allowed' };
  }

  /**
   * Permission revoke validate করো।
   */
  static canRevoke(
    input: EffectivePermissionInput,
    permission: string,
  ): { readonly allowed: boolean; readonly reason: string } {
    if (input.role.isOwner()) {
      return { allowed: false, reason: 'Cannot revoke owner permissions' };
    }
    if (!this.check(input, permission).granted) {
      return { allowed: false, reason: 'Permission is not currently granted' };
    }
    return { allowed: true, reason: 'Revoke allowed' };
  }

  /**
   * Last-owner protection — vendor এর একমাত্র owner remove করা যাবে না।
   */
  static assertNotLastOwner(
    isOwner: boolean,
    remainingOwnerCount: number,
  ): void {
    if (isOwner && remainingOwnerCount <= 1) {
      throw new BusinessRuleError(
        'Cannot remove or demote the last owner — transfer ownership first',
        'CANNOT_REMOVE_LAST_OWNER',
        { remainingOwnerCount },
      );
    }
  }

  /**
   * Member এর role change permissions (downgrade check)।
   */
  static canChangeRole(
    currentRole: TeamRoleVO,
    newRole: TeamRoleVO,
    remainingOwnerCount: number,
  ): { readonly allowed: boolean; readonly reason: string } {
    if (currentRole.isOwner() && !newRole.isOwner()) {
      if (remainingOwnerCount <= 1) {
        return {
          allowed: false,
          reason: 'Cannot demote the last owner',
        };
      }
    }
    if (currentRole.value === newRole.value) {
      return { allowed: false, reason: 'Role is unchanged' };
    }
    return { allowed: true, reason: 'Role change allowed' };
  }

  /**
   * All role default permissions snapshot (for admin UI)।
   */
  static allRoleDefaults(): readonly {
    readonly role: string;
    readonly permissions: readonly string[];
    readonly count: number;
  }[] {
    return Object.entries(ROLE_DEFAULT_PERMISSIONS).map(([role, permissions]) => ({
      role,
      permissions,
      count: permissions.length,
    }));
  }

  /**
   * Permission namespaces (for grouping)।
   */
  static groupByNamespace(
    permissions: readonly string[],
  ): Readonly<Record<string, readonly string[]>> {
    const grouped: Record<string, string[]> = {};
    for (const p of permissions) {
      const [ns] = p.split(':');
      if (!ns) continue;
      if (!grouped[ns]) grouped[ns] = [];
      grouped[ns]!.push(p);
    }
    return grouped;
  }
}
