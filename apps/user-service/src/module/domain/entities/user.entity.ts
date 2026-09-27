/**
 * UserEntity — Aggregate Root
 * @module user-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import type { Timestamp } from '@vubon/shared-types/common';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';
import { UserNameVO } from '../value-objects/primitives/user-name.vo.js';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo.js';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo.js';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo.js';
import { UserVO } from '../value-objects/composites/user.vo.js';
import {
  UserCreatedEvent,
  UserActivatedEvent,
  UserSuspendedEvent,
  UserDeletedEvent,
} from '../events/user.events.js';

export interface UserEntityProps {
  readonly id: UserIdVO;
  readonly email: UserEmailVO;
  readonly name: UserNameVO;
  readonly phone: UserPhoneVO | null;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
}

export class UserEntity extends AggregateRoot<string> {
  private _email: UserEmailVO;
  private _name: UserNameVO;
  private _phone: UserPhoneVO | null;
  private _status: UserStatusVO;
  private readonly _type: UserTypeVO;
  private _emailVerified: boolean;
  private _phoneVerified: boolean;
  private _deletedAt: string | null;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._email = props.email;
    this._name = props.name;
    this._phone = props.phone;
    this._status = props.status;
    this._type = props.type;
    this._emailVerified = props.emailVerified;
    this._phoneVerified = props.phoneVerified;
    this._deletedAt = deletedAt ?? null;
  }

  // ─── Getters ─────────────────────────────────────────
  get email(): UserEmailVO { return this._email; }
  get name(): UserNameVO { return this._name; }
  get phone(): UserPhoneVO | null { return this._phone; }
  get status(): UserStatusVO { return this._status; }
  get type(): UserTypeVO { return this._type; }
  get emailVerified(): boolean { return this._emailVerified; }
  get phoneVerified(): boolean { return this._phoneVerified; }

  /** Public accessor for soft-delete timestamp */
  get deletedAtValue(): string | null {
    return this._deletedAt;
  }

  /** Override to honor our mutable flag */
  override isDeleted(): boolean {
    return this._deletedAt !== null && this._deletedAt !== undefined;
  }

  // ─── Factories ──────────────────────────────────────
  static create(params: {
    id: UserIdVO;
    email: UserEmailVO;
    name: UserNameVO;
    phone?: UserPhoneVO | null;
    type: UserTypeVO;
    now: string;
  }): UserEntity {
    const idStr = params.id.value;
    const entity = new UserEntity(
      idStr,
      params.now,
      params.now,
      {
        id: params.id,
        email: params.email,
        name: params.name,
        phone: params.phone ?? null,
        status: UserStatusVO.pending(),
        type: params.type,
        emailVerified: false,
        phoneVerified: false,
      },
      null
    );

    entity.addDomainEvent(
      new UserCreatedEvent({
        id: `${idStr}:created`,
        aggregateId: idStr,
        payload: {
          userId: idStr,
          email: params.email.value,
          name: params.name.value,
          type: params.type.value,
        },
        occurredAt: params.now as unknown as Timestamp,
        version: entity.version + 1,
      })
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
  }): UserEntity {
    return new UserEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  // ─── Business methods ───────────────────────────────
  activate(now: string): void {
    if (this._status.value === 'active') return;
    if (this.isDeleted()) {
      throw new Error('Cannot activate a deleted user');
    }
    this._status = UserStatusVO.active();
    this.addDomainEvent(
      new UserActivatedEvent({
        id: `${this.id}:activated:${Date.now()}`,
        aggregateId: this.id,
        payload: { userId: this.id, activatedAt: now },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  suspend(reason: string, now: string): void {
    if (this._status.isSuspended()) return;
    if (this.isDeleted()) {
      throw new Error('Cannot suspend a deleted user');
    }
    if (this._type.isAdmin()) {
      throw new Error('Cannot suspend an admin user');
    }
    this._status = UserStatusVO.suspended();
    this.addDomainEvent(
      new UserSuspendedEvent({
        id: `${this.id}:suspended:${Date.now()}`,
        aggregateId: this.id,
        payload: { userId: this.id, reason },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  changeName(newName: UserNameVO, now: string): void {
    if (this.isDeleted()) {
      throw new Error('Cannot change name of deleted user');
    }
    this._name = newName;
    this.touch(now);
  }

  changeEmail(newEmail: UserEmailVO, now: string): void {
    if (this.isDeleted()) {
      throw new Error('Cannot change email of deleted user');
    }
    if (this._email.equals(newEmail)) return;
    this._email = newEmail;
    this._emailVerified = false;
    this.touch(now);
  }

  changePhone(newPhone: UserPhoneVO | null, now: string): void {
    if (this.isDeleted()) {
      throw new Error('Cannot change phone of deleted user');
    }
    this._phone = newPhone;
    this._phoneVerified = false;
    this.touch(now);
  }

  markEmailVerified(): void {
    if (this._emailVerified) return;
    this._emailVerified = true;
  }

  markPhoneVerified(): void {
    if (this._phoneVerified) return;
    this._phoneVerified = true;
  }

  delete(now: string): void {
    if (this.isDeleted()) return;
    this._deletedAt = now;
    this.addDomainEvent(
      new UserDeletedEvent({
        id: `${this.id}:deleted:${Date.now()}`,
        aggregateId: this.id,
        payload: { userId: this.id, deletedAt: now },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  // ─── Invariants ─────────────────────────────────────
  canLogin(): boolean {
    return !this.isDeleted() && this._status.canLogin() && this._emailVerified;
  }

  isActive(): boolean {
    return this._status.isActive();
  }

  isAdmin(): boolean {
    return this._type.isAdmin();
  }

  requiresKyc(): boolean {
    return this._type.requiresKyc();
  }

  hasPhone(): boolean {
    return this._phone !== null;
  }

  // ─── Composite view ─────────────────────────────────
  toUserVO(): UserVO {
    return UserVO.create({
      id: UserIdVO.create(this.id),
      email: this._email,
      name: this._name,
      phone: this._phone,
      status: this._status,
      type: this._type,
    });
  }

  // ─── Private ────────────────────────────────────────
  private touch(now: string): void {
    this.incrementVersion();
    void now;
  }
}
