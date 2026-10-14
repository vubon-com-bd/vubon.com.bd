/**
 * TeamRole Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_ROLE } from '@vubon/shared-constants/business';

export type TeamRoleValue = (typeof VENDOR_ROLE)[keyof typeof VENDOR_ROLE];

const VALID_ROLES = new Set<string>(Object.values(VENDOR_ROLE));

export class TeamRoleVO extends BaseTypeVO<TeamRoleValue> {
  private constructor(value: TeamRoleValue) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return VALID_ROLES;
  }

  static create(raw: string): TeamRoleVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('TeamRole must be a string', 'role');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_ROLES.has(normalized)) {
      throw new ValidationError(
        `Invalid TeamRole: "${normalized}". Allowed: ${[...VALID_ROLES].join(', ')}`,
        'role',
      );
    }
    return new TeamRoleVO(normalized as TeamRoleValue);
  }

  static reconstitute(raw: string): TeamRoleVO {
    return new TeamRoleVO(raw as TeamRoleValue);
  }

  // ─── Predicates ───
  isOwner(): boolean { return this.value === 'vendor_owner'; }
  isManager(): boolean { return this.value === 'vendor_manager'; }
  isStaff(): boolean { return this.value === 'vendor_staff'; }
  isAccountant(): boolean { return this.value === 'vendor_accountant'; }
  isInventoryManager(): boolean { return this.value === 'vendor_inventory_manager'; }
  isOrderManager(): boolean { return this.value === 'vendor_order_manager'; }
  isCustomerSupport(): boolean { return this.value === 'vendor_customer_support'; }
  isMarketing(): boolean { return this.value === 'vendor_marketing'; }
  isViewer(): boolean { return this.value === 'vendor_viewer'; }

  /** Role has administrative power */
  isAdminLevel(): boolean {
    return this.isOwner() || this.isManager();
  }

  /** Role is read-only */
  isReadOnly(): boolean {
    return this.isViewer();
  }

  /** Role can approve payouts/financial ops */
  canApproveFinancials(): boolean {
    return this.isOwner() || this.isAccountant() || this.isManager();
  }

  /** Role can manage team members */
  canManageTeam(): boolean {
    return this.isOwner() || this.isManager();
  }

  /** Role is protected (cannot be removed if sole) */
  isProtected(): boolean {
    return this.isOwner();
  }
}
