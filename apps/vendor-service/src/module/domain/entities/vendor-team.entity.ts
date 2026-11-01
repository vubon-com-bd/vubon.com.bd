/**
 * VendorTeamEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_TEAM } from '@vubon/shared-constants/business';

import {
  VendorTeamVO,
  type VendorTeamVOProps,
  type TeamStatusValue,
  type TeamInviteStatusValue,
} from '../value-objects/composites/vendor-team.vo.js';
import { TeamRoleVO } from '../value-objects/primitives/team-role.vo.js';

export interface VendorTeamEntityProps {
  readonly vo: VendorTeamVO;
}

export class VendorTeamEntity extends BaseEntity<string> {
  private _vo: VendorTeamVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorTeamEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorTeamVO { return this._vo; }
  get memberId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get userId() { return this._vo.userId; }
  get role() { return this._vo.role; }
  get status(): TeamStatusValue { return this._vo.status; }
  get inviteStatus(): TeamInviteStatusValue | undefined { return this._vo.inviteStatus; }
  get email(): string { return this._vo.email; }
  get fullName(): string { return this._vo.fullName; }
  get permissions(): readonly string[] { return this._vo.permissions; }
  get invitedAt(): string { return this._vo.invitedAt; }
  get invitedBy(): string | undefined { return this._vo.invitedBy; }
  get joinedAt(): string | undefined { return this._vo.joinedAt; }
  get lastActiveAt(): string | undefined { return this._vo.lastActiveAt; }
  get suspendedAt(): string | undefined { return this._vo.suspendedAt; }
  get removedAt(): string | undefined { return this._vo.removedAt; }
  get removedBy(): string | undefined { return this._vo.removedBy; }
  get memberDays(): number | null { return this._vo.memberDays; }

  // ═══ Predicates ═══
  isActive(): boolean { return this._vo.isActive(); }
  isInactive(): boolean { return this._vo.isInactive(); }
  isInvited(): boolean { return this._vo.isInvited(); }
  isSuspended(): boolean { return this._vo.isSuspended(); }
  isRemoved(): boolean { return this._vo.isRemoved(); }

  isInvitePending(): boolean { return this._vo.isInvitePending(); }
  isInviteAccepted(): boolean { return this._vo.isInviteAccepted(); }
  isInviteRejected(): boolean { return this._vo.isInviteRejected(); }
  isInviteExpired(): boolean { return this._vo.isInviteExpired(); }

  isOwner(): boolean { return this._vo.isOwner(); }
  isManager(): boolean { return this._vo.isManager(); }
  isStaff(): boolean { return this._vo.isStaff(); }
  isViewer(): boolean { return this._vo.isViewer(); }

  canOperate(): boolean { return this._vo.canOperate(); }
  canBeRemoved(): boolean { return this._vo.canBeRemoved(); }
  canBeSuspended(): boolean { return this._vo.canBeSuspended(); }
  isStale(): boolean { return this._vo.isStale(); }
  isInviteExpiredByTime(): boolean { return this._vo.isInviteExpiredByTime(); }

  hasPermission(permission: string): boolean { return this._vo.hasPermission(permission); }
  hasAnyPermission(permissions: readonly string[]): boolean {
    return this._vo.hasAnyPermission(permissions);
  }
  hasAllPermissions(permissions: readonly string[]): boolean {
    return this._vo.hasAllPermissions(permissions);
  }

  // ═══ Business Actions ═══
  acceptInvite(now: string = new Date().toISOString()): void {
    if (!this.isInvitePending()) {
      throw new BusinessRuleError(
        `Cannot accept invite in status "${this.inviteStatus ?? 'none'}"`,
        'TEAM_INVITE_NOT_PENDING',
        { memberId: this.id, inviteStatus: this.inviteStatus },
      );
    }
    if (this.isInviteExpiredByTime()) {
      throw new BusinessRuleError(
        `Invite expired (older than ${VENDOR_TEAM.INVITE_EXPIRY_DAYS} days)`,
        'TEAM_INVITE_EXPIRED',
        { memberId: this.id, invitedAt: this.invitedAt },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      status: 'active',
      inviteStatus: 'accepted',
      joinedAt: now,
    });
    this.touch(now);
  }

  rejectInvite(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.isInvitePending()) {
      throw new BusinessRuleError(
        `Cannot reject invite in status "${this.inviteStatus ?? 'none'}"`,
        'TEAM_INVITE_NOT_PENDING',
        { memberId: this.id, inviteStatus: this.inviteStatus },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      inviteStatus: 'rejected',
    });
    this.touch(now);
  }

  cancelInvite(cancelledBy: string, now: string = new Date().toISOString()): void {
    if (!this.isInvitePending()) {
      throw new BusinessRuleError(
        `Cannot cancel invite in status "${this.inviteStatus ?? 'none'}"`,
        'TEAM_INVITE_NOT_PENDING',
        { memberId: this.id, inviteStatus: this.inviteStatus },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      inviteStatus: 'cancelled',
      status: 'removed',
      removedAt: now,
      removedBy: cancelledBy,
    });
    this.touch(now);
  }

  changeRole(newRole: TeamRoleVO, now: string = new Date().toISOString()): void {
    if (this.isRemoved()) {
      throw new BusinessRuleError(
        'Cannot change role for removed member',
        'TEAM_MEMBER_REMOVED',
        { memberId: this.id },
      );
    }
    if (this.isOwner() && !newRole.isOwner()) {
      throw new BusinessRuleError(
        'Cannot demote owner — transfer ownership first',
        'CANNOT_DEMOTE_OWNER',
        { memberId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({ ...current, role: newRole });
    this.touch(now);
  }

  suspend(suspendedBy: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeSuspended()) {
      throw new BusinessRuleError(
        `Cannot suspend team member in status "${this.status}"`,
        'TEAM_MEMBER_CANNOT_BE_SUSPENDED',
        { memberId: this.id, status: this.status },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      status: 'suspended',
      suspendedAt: now,
    });
    this.touch(now);
  }

  reactivate(reactivatedBy: string, now: string = new Date().toISOString()): void {
    if (!this.isSuspended() && !this.isInactive()) {
      throw new BusinessRuleError(
        `Cannot reactivate team member in status "${this.status}"`,
        'TEAM_MEMBER_CANNOT_BE_REACTIVATED',
        { memberId: this.id, status: this.status },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      status: 'active',
      suspendedAt: undefined,
    });
    this.touch(now);
  }

  remove(removedBy: string, reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeRemoved()) {
      throw new BusinessRuleError(
        'Cannot remove owner or already removed member',
        'CANNOT_REMOVE_OWNER',
        { memberId: this.id, isOwner: this.isOwner() },
      );
    }
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...current,
      status: 'removed',
      removedAt: now,
      removedBy,
    });
    this.touch(now);
  }

  updatePermissions(
    added: readonly string[],
    removed: readonly string[],
    now: string = new Date().toISOString(),
  ): void {
    const current = new Set(this.permissions);
    for (const p of added) current.add(p);
    for (const p of removed) current.delete(p);

    if (current.size > 100) {
      throw new ValidationError('Cannot exceed 100 permissions', 'permissions');
    }

    const voCurrent = this._vo.value;
    this._vo = VendorTeamVO.create({
      ...voCurrent,
      permissions: [...current],
    });
    this.touch(now);
  }

  recordActivity(now: string = new Date().toISOString()): void {
    const current = this._vo.value;
    this._vo = VendorTeamVO.create({ ...current, lastActiveAt: now });
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorTeamVO;
    now: string;
  }): VendorTeamEntity {
    return new VendorTeamEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorTeamEntityProps;
  }): VendorTeamEntity {
    return new VendorTeamEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
