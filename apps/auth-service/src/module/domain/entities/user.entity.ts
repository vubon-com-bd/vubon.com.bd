/**
 * UserEntity — Root aggregate for a user account
 * @module auth-service/domain/entities
 *
 * Business invariants:
 * - Email must be unique (enforced by repository)
 * - A user cannot be un-suspended without super_admin action
 * - Deleted users cannot be re-activated (create new account)
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../value-objects/primitives/user-role.vo';
import { UserNotActiveError } from '../errors/user.errors';

export interface UserEntityProps {
  readonly id: UserId;
  readonly email: UserEmailVO;
  readonly passwordHash: string;
  readonly name: UserNameVO;
  readonly phone?: UserPhoneVO;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly roles: readonly UserRoleVO[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export interface DomainEventLike {
  readonly type: string;
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly occurredAt: string;
}

export class UserEntity extends BaseEntity<UserId> {
  private _email: UserEmailVO;
  private _passwordHash: string;
  private _name: UserNameVO;
  private _phone?: UserPhoneVO;
  private _status: UserStatusVO;
  private _type: UserTypeVO;
  private _roles: UserRoleVO[];
  private _emailVerified: boolean;
  private _phoneVerified: boolean;

  private readonly _events: DomainEventLike[] = [];

  private constructor(props: UserEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this._email = props.email;
    this._passwordHash = props.passwordHash;
    this._name = props.name;
    this._phone = props.phone;
    this._status = props.status;
    this._type = props.type;
    this._roles = [...props.roles];
    this._emailVerified = props.emailVerified;
    this._phoneVerified = props.phoneVerified;
  }

  static create(props: UserEntityProps): UserEntity {
    return new UserEntity(props);
  }

  get email(): UserEmailVO { return this._email; }
  get passwordHash(): string { return this._passwordHash; }
  get name(): UserNameVO { return this._name; }
  get phone(): UserPhoneVO | undefined { return this._phone; }
  get status(): UserStatusVO { return this._status; }
  get type(): UserTypeVO { return this._type; }
  get roles(): readonly UserRoleVO[] { return [...this._roles]; }
  get emailVerified(): boolean { return this._emailVerified; }
  get phoneVerified(): boolean { return this._phoneVerified; }

  isActive(): boolean { return this._status.isActive(); }
  canLogin(): boolean { return this._status.isLoginAllowed(); }

  assertCanLogin(): void {
    if (!this.canLogin()) {
      throw new UserNotActiveError(this.id, this._status.value);
    }
  }

  hasRole(role: UserRoleVO): boolean {
    return this._roles.some((r) => r.equals(role));
  }

  isSuperAdmin(): boolean {
    return this._roles.some((r) => r.isSuperAdmin());
  }

  changeName(next: UserNameVO): void {
    if (this._name.equals(next)) return;
    this._name = next;
    this.recordEvent('UserUpdatedEvent');
  }

  changePhone(next: UserPhoneVO): void {
    if (this._phone && this._phone.equals(next)) return;
    this._phone = next;
    this._phoneVerified = false;
    this.recordEvent('UserUpdatedEvent');
  }

  changePasswordHash(nextHash: string): void {
    if (!nextHash || nextHash.length < 20) {
      throw new Error('Password hash is invalid');
    }
    this._passwordHash = nextHash;
    this.recordEvent('UserPasswordChangedEvent');
  }

  changeStatus(next: UserStatusVO): void {
    if (!this._status.canTransitionTo(next)) {
      throw new Error(
        `Invalid status transition: ${this._status.value} → ${next.value}`,
      );
    }
    this._status = next;
    this.recordEvent('UserStatusChangedEvent');
  }

  markEmailVerified(): void {
    if (this._emailVerified) return;
    this._emailVerified = true;
    this.recordEvent('UserVerifiedEvent');
  }

  markPhoneVerified(): void {
    if (this._phoneVerified) return;
    this._phoneVerified = true;
    this.recordEvent('UserVerifiedEvent');
  }

  assignRole(role: UserRoleVO): void {
    if (this.hasRole(role)) return;
    this._roles = [...this._roles, role];
    this.recordEvent('UserRoleAssignedEvent');
  }

  revokeRole(role: UserRoleVO): void {
    const before = this._roles.length;
    this._roles = this._roles.filter((r) => !r.equals(role));
    if (this._roles.length !== before) {
      this.recordEvent('UserRoleRevokedEvent');
    }
  }

  pullEvents(): readonly DomainEventLike[] {
    const events = [...this._events];
    this._events.length = 0;
    return events;
  }

  private recordEvent(type: string): void {
    this._events.push({
      type,
      aggregateId: this.id,
      aggregateType: 'User',
      occurredAt: new Date().toISOString(),
    });
  }
}
