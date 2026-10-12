/**
 * VendorTeamInviteEntity — pending invitation
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MemberEmailVO } from '../value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../value-objects/primitives/member-role.vo.js';
import { TeamInviteTokenVO } from '../value-objects/primitives/team-invite-token.vo.js';
import { TeamInviteStatusVO } from '../value-objects/primitives/team-invite-status.vo.js';
import { InviteExpiryVO } from '../value-objects/primitives/invite-expiry.vo.js';

export interface VendorTeamInviteEntityProps {
  readonly vendorId: string;
  readonly email: MemberEmailVO;
  readonly role: MemberRoleVO;
  readonly status: TeamInviteStatusVO;
  readonly token: TeamInviteTokenVO;
  readonly invitedBy: string;
  readonly invitedAt: string;
  readonly expiresAt: InviteExpiryVO;
  readonly message?: string;
  readonly acceptedAt?: string;
  readonly acceptedBy?: string;
  readonly rejectedAt?: string;
}

export class VendorTeamInviteEntity extends AggregateRoot<string> {
  private _status: TeamInviteStatusVO;
  private _acceptedAt?: string;
  private _acceptedBy?: string;
  private _rejectedAt?: string;

  private readonly _vendorId: string;
  private readonly _email: MemberEmailVO;
  private readonly _role: MemberRoleVO;
  private readonly _token: TeamInviteTokenVO;
  private readonly _invitedBy: string;
  private readonly _invitedAt: string;
  private readonly _expiresAt: InviteExpiryVO;
  private readonly _message?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorTeamInviteEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._email = props.email;
    this._role = props.role;
    this._status = props.status;
    this._token = props.token;
    this._invitedBy = props.invitedBy;
    this._invitedAt = props.invitedAt;
    this._expiresAt = props.expiresAt;
    this._message = props.message;
    this._acceptedAt = props.acceptedAt;
    this._acceptedBy = props.acceptedBy;
    this._rejectedAt = props.rejectedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Number.isNaN(Date.parse(this._invitedAt))) {
      throw new ValidationError('invitedAt must be a valid ISO timestamp', 'invitedAt');
    }
    if (this._message !== undefined && this._message.length > 500) {
      throw new ValidationError('Invite message cannot exceed 500 chars', 'message');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get email(): MemberEmailVO { return this._email; }
  get role(): MemberRoleVO { return this._role; }
  get status(): TeamInviteStatusVO { return this._status; }
  get token(): TeamInviteTokenVO { return this._token; }
  get invitedBy(): string { return this._invitedBy; }
  get invitedAt(): string { return this._invitedAt; }
  get expiresAt(): InviteExpiryVO { return this._expiresAt; }

  get message(): string | undefined { return this._message; }
  get acceptedAt(): string | undefined { return this._acceptedAt; }
  get acceptedBy(): string | undefined { return this._acceptedBy; }
  get rejectedAt(): string | undefined { return this._rejectedAt; }

  isPending(): boolean { return this._status.isPending(); }
  isAccepted(): boolean { return this._status.isAccepted(); }
  isExpired(at: Date = new Date()): boolean {
    return this._status.isExpired() || this._expiresAt.isExpired(at);
  }

  accept(userId: string, now: string = new Date().toISOString()): void {
    if (!this._status.isPending()) {
      throw new BusinessRuleError(
        `Cannot accept invite in status "${this._status.value}"`,
        'INVITE_NOT_ACCEPTABLE',
        { inviteId: this.id, status: this._status.value },
      );
    }
    if (this._expiresAt.isExpired(new Date(now))) {
      this._status = TeamInviteStatusVO.expired();
      throw new BusinessRuleError('Invite has expired', 'INVITE_EXPIRED', { inviteId: this.id });
    }
    this._status = TeamInviteStatusVO.accepted();
    this._acceptedAt = now;
    this._acceptedBy = userId;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reject(now: string = new Date().toISOString()): void {
    if (!this._status.isPending()) {
      throw new BusinessRuleError(
        `Cannot reject invite in status "${this._status.value}"`,
        'INVITE_NOT_REJECTABLE',
        { inviteId: this.id, status: this._status.value },
      );
    }
    this._status = TeamInviteStatusVO.rejected();
    this._rejectedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  cancel(now: string = new Date().toISOString()): void {
    if (!this._status.isPending()) {
      throw new BusinessRuleError(
        `Cannot cancel invite in status "${this._status.value}"`,
        'INVITE_NOT_CANCELLABLE',
        { inviteId: this.id, status: this._status.value },
      );
    }
    this._status = TeamInviteStatusVO.cancelled();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markExpired(now: string = new Date().toISOString()): void {
    if (!this._status.isPending()) return;
    this._status = TeamInviteStatusVO.expired();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    vendorId: string;
    email: MemberEmailVO;
    role: MemberRoleVO;
    token: TeamInviteTokenVO;
    invitedBy: string;
    expiresAt: InviteExpiryVO;
    message?: string;
    now: string;
  }): VendorTeamInviteEntity {
    return new VendorTeamInviteEntity(params.id, params.now, params.now, {
      vendorId: params.vendorId,
      email: params.email,
      role: params.role,
      status: TeamInviteStatusVO.pending(),
      token: params.token,
      invitedBy: params.invitedBy,
      invitedAt: params.now,
      expiresAt: params.expiresAt,
      message: params.message,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorTeamInviteEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorTeamInviteEntity {
    const entity = new VendorTeamInviteEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
