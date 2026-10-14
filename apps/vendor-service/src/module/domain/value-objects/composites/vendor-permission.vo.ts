/**
 * VendorPermissionVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor team member এর permission assignment।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PermissionIdVO } from '../primitives/permission-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { TeamMemberIdVO } from '../primitives/team-member-id.vo.js';
import { TeamRoleVO } from '../primitives/team-role.vo.js';

export interface VendorPermissionVOProps {
  readonly id: PermissionIdVO;
  readonly vendorId: VendorIdVO;
  readonly memberId: TeamMemberIdVO;
  readonly role: TeamRoleVO;
  readonly permissions: readonly string[];
  readonly overrides: readonly string[];
  readonly denials: readonly string[];
  readonly grantedAt: string;
  readonly grantedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PERMISSION_PATTERN = /^[a-z][a-z0-9_]*:[a-z][a-z0-9_]*:[a-z][a-z0-9_]*$/;

export class VendorPermissionVO extends BaseVO<VendorPermissionVOProps> {
  private constructor(props: VendorPermissionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorPermissionVOProps): VendorPermissionVO {
    const vo = new VendorPermissionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorPermissionVOProps): VendorPermissionVO {
    return new VendorPermissionVO(props);
  }

  protected validate(): void {
    const v = this.value;

    for (const list of [v.permissions, v.overrides, v.denials]) {
      if (list.length > 200) {
        throw new ValidationError('Permission list cannot exceed 200', 'permissions');
      }
      for (const p of list) {
        if (typeof p !== 'string' || !PERMISSION_PATTERN.test(p)) {
          throw new ValidationError(`Invalid permission format: "${p}"`, 'permissions');
        }
      }
    }

    // Denials cannot overlap with base permissions
    const permSet = new Set(v.permissions);
    for (const denied of v.denials) {
      if (permSet.has(denied)) {
        throw new ValidationError(
          `Cannot deny base permission "${denied}"`,
          'denials',
        );
      }
    }

    // Overrides cannot be in denials
    for (const override of v.overrides) {
      if (v.denials.includes(override)) {
        throw new ValidationError(
          `Permission "${override}" cannot be both override and denial`,
          'overrides',
        );
      }
    }
  }

  // ─── Getters ───
  get id(): PermissionIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get memberId(): TeamMemberIdVO { return this.value.memberId; }
  get role(): TeamRoleVO { return this.value.role; }
  get permissions(): readonly string[] { return this.value.permissions; }
  get overrides(): readonly string[] { return this.value.overrides; }
  get denials(): readonly string[] { return this.value.denials; }
  get grantedAt(): string { return this.value.grantedAt; }
  get grantedBy(): string | undefined { return this.value.grantedBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Effective Permissions ───
  /** All effective permissions (base + overrides - denials) */
  get effectivePermissions(): readonly string[] {
    const set = new Set<string>([...this.permissions, ...this.overrides]);
    for (const d of this.denials) set.delete(d);
    return [...set];
  }

  // ─── Predicates ───
  isOwner(): boolean { return this.role.isOwner(); }
  isManager(): boolean { return this.role.isManager(); }
  isViewer(): boolean { return this.role.isReadOnly(); }

  hasBasePermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  hasOverride(permission: string): boolean {
    return this.overrides.includes(permission);
  }

  hasDenial(permission: string): boolean {
    return this.denials.includes(permission);
  }

  /** Has permission through any mechanism */
  hasPermission(permission: string): boolean {
    if (this.hasDenial(permission)) return false;
    if (this.hasBasePermission(permission) || this.hasOverride(permission)) return true;
    // Owner implicitly has all admin permissions
    if (this.isOwner() && permission.startsWith('admin:')) return true;
    return false;
  }

  /** Has any of the given permissions */
  hasAnyPermission(permissions: readonly string[]): boolean {
    return permissions.some((p) => this.hasPermission(p));
  }

  /** Has all of the given permissions */
  hasAllPermissions(permissions: readonly string[]): boolean {
    return permissions.every((p) => this.hasPermission(p));
  }

  /** Total effective permissions count */
  get effectiveCount(): number {
    return this.effectivePermissions.length;
  }

  /** Has any overrides */
  hasAnyOverrides(): boolean {
    return this.overrides.length > 0;
  }

  /** Has any denials */
  hasAnyDenials(): boolean {
    return this.denials.length > 0;
  }

  /** Permission belongs to a namespace */
  hasNamespace(namespace: string): boolean {
    return this.effectivePermissions.some((p) => p.startsWith(`${namespace}:`));
  }

  /** All permissions for a given namespace */
  getPermissionsInNamespace(namespace: string): readonly string[] {
    return this.effectivePermissions.filter((p) => p.startsWith(`${namespace}:`));
  }
}
