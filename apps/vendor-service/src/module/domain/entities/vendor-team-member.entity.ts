/**
 * VendorTeamMemberEntity — a single team member record
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { MemberNameVO } from '../value-objects/primitives/member-name.vo.js';
import { MemberEmailVO } from '../value-objects/primitives/member-email.vo.js';
import { MemberRoleVO } from '../value-objects/primitives/member-role.vo.js';
import { TeamMemberStatusVO } from '../value-objects/primitives/team-member-status.vo.js';
import { MemberPermissionVO } from '../value-objects/primitives/member-permission.vo.js';

export interface VendorTeamMemberEntityProps {
  readonly vendorId: string;
  readonly userId: string;
  readonly email: MemberEmailVO;
  readonly name: MemberNameVO;
  readonly role: MemberRoleVO;
  readonly status: TeamMemberStatusVO;
  readonly permissions: readonly MemberPermissionVO[];
  readonly joinedAt: string;
  readonly lastActiveAt?: string;
  readonly invitedBy?: string;
}

export class VendorTeamMemberEntity extends BaseEntity<string> {
  private _role: MemberRoleVO;
  private _status: TeamMemberStatusVO;
  private _permissions: MemberPermissionVO[];
  private _lastActiveAt?: string;

  private readonly _vendorId: string;
  private readonly _userId: string;
  private readonly _email: MemberEmailVO;
  private readonly _name: MemberNameVO;
  private readonly _joinedAt: string;
  private readonly _invitedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorTeamMemberEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._userId = props.userId;
    this._email = props.email;
    this._name = props.name;
    this._role = props.role;
    this._status = props.status;
    this._permissions = [...props.permissions];
    this._joinedAt = props.joinedAt;
    this._lastActiveAt = props.lastActiveAt;
    this._invitedBy = props.invitedBy;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (Number.isNaN(Date.parse(this._joinedAt))) {
      throw new ValidationError('joinedAt must be a valid ISO timestamp', 'joinedAt');
    }
    if (this._permissions.length > 100) {
      throw new ValidationError('Permissions cannot exceed 100 items', 'permissions');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get userId(): string { return this._userId; }
  get email(): MemberEmailVO { return this._email; }
  get name(): MemberNameVO { return this._name; }
  get role(): MemberRoleVO { return this._role; }
  get status(): TeamMemberStatusVO { return this._status; }
  get permissions(): readonly MemberPermissionVO[] { return this._permissions; }
  get joinedAt(): string { return this._joinedAt; }
  get lastActiveAt(): string | undefined { return this._lastActiveAt; }

  get invitedBy(): string | undefined { return this._invitedBy; }

  isOwner(): boolean { return this._role.isOwner(); }
  isActive(): boolean { return this._status.isActive(); }
  canLogin(): boolean { return this._status.canLogin(); }

  hasPermission(permission: MemberPermissionVO): boolean {
    return this._permissions.some((p) => p.value === permission.value);
  }

  canManage(other: VendorTeamMemberEntity): boolean {
    return this._role.canManage(other.role);
  }

  activate(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('active')) {
      throw new BusinessRuleError(
        `Cannot activate member in status "${this._status.value}"`,
        'MEMBER_NOT_ACTIVATABLE',
        { memberId: this.id, status: this._status.value },
      );
    }
    this._status = TeamMemberStatusVO.active();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  suspend(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('suspended')) {
      throw new BusinessRuleError(
        `Cannot suspend member in status "${this._status.value}"`,
        'MEMBER_NOT_SUSPENDABLE',
        { memberId: this.id, status: this._status.value },
      );
    }
    this._status = TeamMemberStatusVO.suspended();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  remove(now: string = new Date().toISOString()): void {
    if (this.isOwner()) {
      throw new BusinessRuleError(
        'Owner cannot be removed',
        'OWNER_CANNOT_BE_REMOVED',
        { memberId: this.id },
      );
    }
    if (!this._status.canTransitionTo('removed')) {
      throw new BusinessRuleError(
        `Cannot remove member in status "${this._status.value}"`,
        'MEMBER_NOT_REMOVABLE',
        { memberId: this.id, status: this._status.value },
      );
    }
    this._status = TeamMemberStatusVO.removed();
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  changeRole(newRole: MemberRoleVO, now: string = new Date().toISOString()): void {
    if (!(newRole instanceof MemberRoleVO)) {
      throw new ValidationError('Role must be MemberRoleVO', 'role');
    }
    if (this.isOwner()) {
      throw new BusinessRuleError(
        'Cannot change owner role',
        'OWNER_ROLE_IMMUTABLE',
        { memberId: this.id },
      );
    }
    this._role = newRole;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  grantPermission(permission: MemberPermissionVO, now: string = new Date().toISOString()): void {
    if (!(permission instanceof MemberPermissionVO)) {
      throw new ValidationError('Permission must be MemberPermissionVO', 'permission');
    }
    if (this.hasPermission(permission)) return;
    this._permissions = [...this._permissions, permission];
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  revokePermission(permission: MemberPermissionVO, now: string = new Date().toISOString()): void {
    if (!(permission instanceof MemberPermissionVO)) {
      throw new ValidationError('Permission must be MemberPermissionVO', 'permission');
    }
    this._permissions = this._permissions.filter((p) => p.value !== permission.value);
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markActive(now: string = new Date().toISOString()): void {
    this._lastActiveAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: Omit<VendorTeamMemberEntityProps, 'status' | 'joinedAt' | 'permissions'> & {
      permissions?: readonly MemberPermissionVO[];
      joinedAt?: string;
    };
    now: string;
    asInvited?: boolean;
  }): VendorTeamMemberEntity {
    return new VendorTeamMemberEntity(params.id, params.now, params.now, {
      ...params.props,
      permissions: params.props.permissions ?? [],
      joinedAt: params.props.joinedAt ?? params.now,
      status: params.asInvited ? TeamMemberStatusVO.invited() : TeamMemberStatusVO.active(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorTeamMemberEntityProps;
    deletedAt?: string | null;
  }): VendorTeamMemberEntity {
    return new VendorTeamMemberEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
