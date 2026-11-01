/**
 * UserEntity — AGGREGATE ROOT
 * @module identity-service/domain/entities
 *
 * State machine:
 *   pending → unverified → active
 *   active → inactive → active
 *   active → suspended → active
 *   active → deactivated → active
 *   any (except deleted) → blocked
 *   any (except deleted) → deleted
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo.js';
import { UserNameVO } from '../value-objects/primitives/user-name.vo.js';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo.js';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo.js';

import {
  UserCreatedEvent,
  UserStatusChangedEvent,
  UserEmailVerifiedEvent,
  UserPhoneVerifiedEvent,
  UserSuspendedEvent,
  UserRoleAssignedEvent,
  UserRoleRevokedEvent,
} from '../events/user.events.js';

// ─── Props ──────────────────────────────────
export interface UserEntityProps {
  readonly email: UserEmailVO;
  readonly phone?: UserPhoneVO;
  readonly firstName?: UserNameVO;
  readonly lastName?: UserNameVO;
  readonly username?: string;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly roles: readonly UserRoleVO[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly isMfaEnabled: boolean;
  readonly lastLoginAt?: string;
  readonly lastLoginIp?: string;
  readonly lastActiveAt?: string;
  readonly suspendedAt?: string;
  readonly suspendedReason?: string;
  readonly deletedAt?: string;
  readonly deletedBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ─── Entity ─────────────────────────────────
export class UserEntity extends AggregateRoot<string> {
  private _email: UserEmailVO;
  private _phone?: UserPhoneVO;
  private _firstName?: UserNameVO;
  private _lastName?: UserNameVO;
  private _username?: string;
  private _status: UserStatusVO;
  private _type: UserTypeVO;
  private _roles: UserRoleVO[];
  private _emailVerified: boolean;
  private _phoneVerified: boolean;
  private _isMfaEnabled: boolean;
  private _lastLoginAt?: string;
  private _lastLoginIp?: string;
  private _lastActiveAt?: string;
  private _suspendedAt?: string;
  private _suspendedReason?: string;
  private _deletedAt?: string;
  private _deletedBy?: string;

  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._email = props.email;
    this._phone = props.phone;
    this._firstName = props.firstName;
    this._lastName = props.lastName;
    this._username = props.username;
    this._status = props.status;
    this._type = props.type;
    this._roles = [...props.roles];
    this._emailVerified = props.emailVerified;
    this._phoneVerified = props.phoneVerified;
    this._isMfaEnabled = props.isMfaEnabled;
    this._lastLoginAt = props.lastLoginAt;
    this._lastLoginIp = props.lastLoginIp;
    this._lastActiveAt = props.lastActiveAt;
    this._suspendedAt = props.suspendedAt;
    this._suspendedReason = props.suspendedReason;
    this._deletedAt = props.deletedAt;
    this._deletedBy = props.deletedBy;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._roles.length === 0) {
      throw new ValidationError('User must have at least one role', 'roles');
    }
    if (this._isMfaEnabled && !this._emailVerified && !this._phoneVerified) {
      throw new ValidationError(
        'MFA requires email or phone verification',
        'isMfaEnabled',
      );
    }
    if (this._status.isSuspended() && !this._suspendedAt) {
      throw new ValidationError(
        'suspendedAt is required when status is suspended',
        'suspendedAt',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get email(): UserEmailVO { return this._email; }
  get phone(): UserPhoneVO | undefined { return this._phone; }
  get firstName(): UserNameVO | undefined { return this._firstName; }
  get lastName(): UserNameVO | undefined { return this._lastName; }
  get username(): string | undefined { return this._username; }
  get status(): UserStatusVO { return this._status; }
  get type(): UserTypeVO { return this._type; }
  get roles(): readonly UserRoleVO[] { return [...this._roles]; }
  get emailVerified(): boolean { return this._emailVerified; }
  get phoneVerified(): boolean { return this._phoneVerified; }
  get isMfaEnabled(): boolean { return this._isMfaEnabled; }
  get lastLoginAt(): string | undefined { return this._lastLoginAt; }
  get lastLoginIp(): string | undefined { return this._lastLoginIp; }
  get lastActiveAt(): string | undefined { return this._lastActiveAt; }
  get suspendedAt(): string | undefined { return this._suspendedAt; }
  get suspendedReason(): string | undefined { return this._suspendedReason; }
  get deletedBy(): string | undefined { return this._deletedBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): UserIdVO { return UserIdVO.reconstitute(this.id); }

  get displayName(): string {
    if (this._firstName && this._lastName) {
      return `${this._firstName.value} ${this._lastName.value}`;
    }
    return this._firstName?.value ?? this._username ?? this._email.value;
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isSuspended(): boolean { return this._status.isSuspended(); }
  isBlocked(): boolean { return this._status.isBlocked(); }
  isDeleted(): boolean { return this._status.isDeleted(); }
  isDeactivated(): boolean { return this._status.isDeactivated(); }
  isUnverified(): boolean { return this._status.isUnverified(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isUsable(): boolean { return this._status.isUsable(); }

  canLogin(): boolean {
    return this._status.canLogin();
  }

  canBeDeleted(): boolean {
    if (this._status.isDeleted()) return false;
    if (this._roles.some((r) => r.isSuperAdmin())) return false;
    return true;
  }

  hasRole(role: string): boolean {
    return this._roles.some((r) => r.value === role);
  }

  isAdmin(): boolean {
    return this._roles.some((r) => r.isAdmin());
  }

  isFullyVerified(): boolean {
    return this._emailVerified && this._phoneVerified;
  }

  hasAnyVerification(): boolean {
    return this._emailVerified || this._phoneVerified;
  }

  // ═══════════════ Business Actions ═══════════════
  activate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = UserStatusVO.active();
    this._suspendedAt = undefined;
    this._suspendedReason = undefined;
    this.emitStatusChange(from, 'active');
    this.touch(now);
    this.incrementVersion();
  }

  deactivate(reason: string | undefined, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('deactivated');
    const from = this._status.value;
    this._status = UserStatusVO.deactivated();
    this.emitStatusChange(from, 'deactivated', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  suspend(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('suspended');
    const from = this._status.value;
    this._status = UserStatusVO.suspended();
    this._suspendedAt = now;
    this._suspendedReason = reason;
    this.addDomainEvent(
      new UserSuspendedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, reason, suspendedAt: now },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'suspended', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  unsuspend(now: string = new Date().toISOString()): void {
    if (!this._status.isSuspended()) {
      throw new BusinessRuleError(
        'User is not suspended',
        'USER_NOT_SUSPENDED',
        { userId: this.id },
      );
    }
    this._status = UserStatusVO.active();
    this._suspendedAt = undefined;
    this._suspendedReason = undefined;
    this.emitStatusChange('suspended', 'active');
    this.touch(now);
    this.incrementVersion();
  }

  block(reason: string | undefined, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('blocked');
    const from = this._status.value;
    this._status = UserStatusVO.blocked();
    this.emitStatusChange(from, 'blocked', undefined, reason);
    this.touch(now);
    this.incrementVersion();
  }

  markDeleted(deletedBy: string | undefined, now: string = new Date().toISOString()): void {
    if (!this.canBeDeleted()) {
      throw new BusinessRuleError(
        'User cannot be deleted',
        'USER_CANNOT_BE_DELETED',
        { userId: this.id, isSuperAdmin: this.isAdmin() },
      );
    }
    this.assertTransitionTo('deleted');
    const from = this._status.value;
    this._status = UserStatusVO.deleted();
    this._deletedAt = now;
    this._deletedBy = deletedBy;
    this.emitStatusChange(from, 'deleted', deletedBy);
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Profile Updates ═══════════════
  rename(firstName: UserNameVO | undefined, lastName: UserNameVO | undefined, now: string = new Date().toISOString()): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot rename user in status "${this._status.value}"`,
        'USER_CANNOT_BE_RENAMED',
        { userId: this.id, status: this._status.value },
      );
    }
    this._firstName = firstName;
    this._lastName = lastName;
    this.touch(now);
    this.incrementVersion();
  }

  changeEmail(email: UserEmailVO, now: string = new Date().toISOString()): void {
    if (this._email.value === email.value) return;
    this._email = email;
    this._emailVerified = false;
    this.touch(now);
    this.incrementVersion();
  }

  changePhone(phone: UserPhoneVO | undefined, now: string = new Date().toISOString()): void {
    this._phone = phone;
    this._phoneVerified = false;
    this.touch(now);
    this.incrementVersion();
  }

  markEmailVerified(now: string = new Date().toISOString()): void {
    if (this._emailVerified) return;
    this._emailVerified = true;
    this.addDomainEvent(
      new UserEmailVerifiedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, email: this._email.value, verifiedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPhoneVerified(now: string = new Date().toISOString()): void {
    if (this._phoneVerified) return;
    this._phoneVerified = true;
    this.addDomainEvent(
      new UserPhoneVerifiedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, phone: this._phone?.value ?? '', verifiedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordLogin(ip: string | undefined, now: string = new Date().toISOString()): void {
    this._lastLoginAt = now;
    this._lastLoginIp = ip;
    this._lastActiveAt = now;
    this.touch(now);
    this.incrementVersion();
  }

  touchActive(now: string = new Date().toISOString()): void {
    this._lastActiveAt = now;
    this.touch(now);
  }

  // ═══════════════ Role Management ═══════════════
  assignRole(role: UserRoleVO, assignedBy: string, now: string = new Date().toISOString()): void {
    if (this.hasRole(role.value)) {
      throw new BusinessRuleError(
        `Role "${role.value}" already assigned`,
        'USER_ROLE_ALREADY_ASSIGNED',
        { userId: this.id, role: role.value },
      );
    }
    this._roles.push(role);
    this.addDomainEvent(
      new UserRoleAssignedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, role: role.value, assignedBy, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  revokeRole(role: string, revokedBy: string, now: string = new Date().toISOString()): void {
    if (!this.hasRole(role)) {
      throw new BusinessRuleError(
        `Role "${role}" not assigned`,
        'USER_ROLE_NOT_ASSIGNED',
        { userId: this.id, role },
      );
    }
    if (this._roles.length === 1) {
      throw new BusinessRuleError(
        'Cannot revoke last role',
        'USER_LAST_ROLE',
        { userId: this.id },
      );
    }
    this._roles = this._roles.filter((r) => r.value !== role);
    this.addDomainEvent(
      new UserRoleRevokedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, role, revokedBy, revokedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  enableMfa(now: string = new Date().toISOString()): void {
    if (!this.hasAnyVerification()) {
      throw new BusinessRuleError(
        'MFA requires email or phone verification',
        'USER_MFA_REQUIRES_VERIFICATION',
        { userId: this.id },
      );
    }
    if (this._isMfaEnabled) return;
    this._isMfaEnabled = true;
    this.touch(now);
    this.incrementVersion();
  }

  disableMfa(now: string = new Date().toISOString()): void {
    if (!this._isMfaEnabled) return;
    this._isMfaEnabled = false;
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid user status transition: "${this._status.value}" → "${target}"`,
        'INVALID_USER_STATUS_TRANSITION',
        { from: this._status.value, to: target, userId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new UserStatusChangedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, fromStatus: from, toStatus: to, changedBy, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: UserIdVO;
    email: UserEmailVO;
    type: UserTypeVO;
    roles: readonly UserRoleVO[];
    phone?: UserPhoneVO;
    firstName?: UserNameVO;
    lastName?: UserNameVO;
    username?: string;
    status?: UserStatusVO;
    now: string;
  }): UserEntity {
    const entity = new UserEntity(
      params.id.value,
      params.now,
      params.now,
      {
        email: params.email,
        phone: params.phone,
        firstName: params.firstName,
        lastName: params.lastName,
        username: params.username,
        status: params.status ?? UserStatusVO.pending(),
        type: params.type,
        roles: params.roles,
        emailVerified: false,
        phoneVerified: false,
        isMfaEnabled: false,
      },
    );

    entity.addDomainEvent(
      new UserCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          userId: params.id.value,
          email: params.email.value,
          type: params.type.value,
          roles: params.roles.map((r) => r.value),
          createdAt: params.now,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserEntityProps;
    version?: number;
  }): UserEntity {
    const entity = new UserEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
