/**
 * VendorTeamVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * একটি team member record, যা vendor aggregate-এর সাথে যুক্ত।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_TEAM } from '@vubon/shared-constants/business';

import { TeamMemberIdVO } from '../primitives/team-member-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { TeamRoleVO } from '../primitives/team-role.vo.js';

export type TeamStatusValue = 'active' | 'inactive' | 'invited' | 'suspended' | 'removed';
export type TeamInviteStatusValue = 'pending' | 'accepted' | 'rejected' | 'expired' | 'cancelled';

const VALID_STATUSES = new Set<TeamStatusValue>([
  'active',
  'inactive',
  'invited',
  'suspended',
  'removed',
]);

const VALID_INVITE_STATUSES = new Set<TeamInviteStatusValue>([
  'pending',
  'accepted',
  'rejected',
  'expired',
  'cancelled',
]);

export interface VendorTeamVOProps {
  readonly id: TeamMemberIdVO;
  readonly vendorId: VendorIdVO;
  readonly userId: UserIdVO;
  readonly role: TeamRoleVO;
  readonly status: TeamStatusValue;
  readonly inviteStatus?: TeamInviteStatusValue;
  readonly email: string;
  readonly fullName: string;
  readonly permissions: readonly string[];
  readonly invitedAt: string;
  readonly invitedBy?: string;
  readonly joinedAt?: string;
  readonly lastActiveAt?: string;
  readonly suspendedAt?: string;
  readonly removedAt?: string;
  readonly removedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorTeamVO extends BaseVO<VendorTeamVOProps> {
  private constructor(props: VendorTeamVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorTeamVOProps): VendorTeamVO {
    const vo = new VendorTeamVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorTeamVOProps): VendorTeamVO {
    return new VendorTeamVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!VALID_STATUSES.has(v.status)) {
      throw new ValidationError(`Invalid team status: "${v.status}"`, 'status');
    }
    if (v.inviteStatus && !VALID_INVITE_STATUSES.has(v.inviteStatus)) {
      throw new ValidationError(`Invalid invite status: "${v.inviteStatus}"`, 'inviteStatus');
    }

    if (!v.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) {
      throw new ValidationError('Team email must be valid', 'email');
    }
    if (!v.fullName || v.fullName.trim().length < 2) {
      throw new ValidationError('Team fullName min 2 chars', 'fullName');
    }
    if (v.fullName.length > 100) {
      throw new ValidationError('Team fullName max 100 chars', 'fullName');
    }

    if (v.permissions.length > 100) {
      throw new ValidationError('Cannot have more than 100 permissions', 'permissions');
    }

    // Status-specific invariants
    if (v.status === 'active' && !v.joinedAt) {
      throw new ValidationError('Active team member must have joinedAt', 'joinedAt');
    }
    if (v.status === 'invited' && v.inviteStatus !== 'pending') {
      throw new ValidationError('Invited member must have inviteStatus = pending', 'inviteStatus');
    }
    if (v.status === 'suspended' && !v.suspendedAt) {
      throw new ValidationError('Suspended member must have suspendedAt', 'suspendedAt');
    }
    if (v.status === 'removed' && !v.removedAt) {
      throw new ValidationError('Removed member must have removedAt', 'removedAt');
    }
  }

  // ─── Getters ───
  get id(): TeamMemberIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get userId(): UserIdVO { return this.value.userId; }
  get role(): TeamRoleVO { return this.value.role; }
  get status(): TeamStatusValue { return this.value.status; }
  get inviteStatus(): TeamInviteStatusValue | undefined { return this.value.inviteStatus; }
  get email(): string { return this.value.email; }
  get fullName(): string { return this.value.fullName; }
  get permissions(): readonly string[] { return this.value.permissions; }
  get invitedAt(): string { return this.value.invitedAt; }
  get invitedBy(): string | undefined { return this.value.invitedBy; }
  get joinedAt(): string | undefined { return this.value.joinedAt; }
  get lastActiveAt(): string | undefined { return this.value.lastActiveAt; }
  get suspendedAt(): string | undefined { return this.value.suspendedAt; }
  get removedAt(): string | undefined { return this.value.removedAt; }
  get removedBy(): string | undefined { return this.value.removedBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isActive(): boolean { return this.status === 'active'; }
  isInactive(): boolean { return this.status === 'inactive'; }
  isInvited(): boolean { return this.status === 'invited'; }
  isSuspended(): boolean { return this.status === 'suspended'; }
  isRemoved(): boolean { return this.status === 'removed'; }

  isInvitePending(): boolean { return this.inviteStatus === 'pending'; }
  isInviteAccepted(): boolean { return this.inviteStatus === 'accepted'; }
  isInviteRejected(): boolean { return this.inviteStatus === 'rejected'; }
  isInviteExpired(): boolean { return this.inviteStatus === 'expired'; }
  isInviteCancelled(): boolean { return this.inviteStatus === 'cancelled'; }

  isOwner(): boolean { return this.role.isOwner(); }
  isManager(): boolean { return this.role.isManager(); }
  isStaff(): boolean { return this.role.isStaff(); }
  isViewer(): boolean { return this.role.isReadOnly(); }

  /** Can login + operate */
  canOperate(): boolean { return this.isActive(); }

  /** Has specific permission */
  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  /** Has any of the given permissions */
  hasAnyPermission(permissions: readonly string[]): boolean {
    return permissions.some((p) => this.hasPermission(p));
  }

  /** Has all of the given permissions */
  hasAllPermissions(permissions: readonly string[]): boolean {
    return permissions.every((p) => this.hasPermission(p));
  }

  /** Can be removed */
  canBeRemoved(): boolean {
    return !this.isRemoved() && !this.isOwner();
  }

  /** Can be suspended */
  canBeSuspended(): boolean {
    return this.isActive() && !this.isOwner();
  }

  /** Days since joining */
  get memberDays(): number | null {
    if (!this.joinedAt) return null;
    const diff = Date.now() - new Date(this.joinedAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Is inactive (no login for 90+ days) */
  isStale(): boolean {
    if (!this.lastActiveAt) return false;
    const diff = Date.now() - new Date(this.lastActiveAt).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > 90;
  }

  /** Invitation has expired */
  isInviteExpiredByTime(): boolean {
    if (!this.isInvitePending()) return false;
    const diff = Date.now() - new Date(this.invitedAt).getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    return days > VENDOR_TEAM.INVITE_EXPIRY_DAYS;
  }
}
