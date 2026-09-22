import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserNameVO } from '../value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../value-objects/primitives/user-type.vo';
import {
  UserCreatedEvent,
  UserUpdatedEvent,
  UserDeletedEvent,
  UserActivatedEvent,
  UserDeactivatedEvent,
  UserSuspendedEvent,
  UserUnsuspendedEvent,
} from '../events/user.events';

export interface UserEntityProps {
  readonly email: UserEmailVO;
  readonly name: UserNameVO;
  readonly phone: UserPhoneVO | null;
  readonly status: UserStatusVO;
  readonly type: UserTypeVO;
  readonly emailVerified: boolean;
}

export class UserEntity extends AggregateRoot<UserIdVO> {
  private readonly _email: UserEmailVO;
  private readonly _name: UserNameVO;
  private readonly _phone: UserPhoneVO | null;
  private readonly _status: UserStatusVO;
  private readonly _type: UserTypeVO;
  private readonly _emailVerified: boolean;

  private constructor(
    id: UserIdVO,
    props: UserEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._email = props.email;
    this._name = props.name;
    this._phone = props.phone;
    this._status = props.status;
    this._type = props.type;
    this._emailVerified = props.emailVerified;
  }

  static create(props: UserEntityProps): UserEntity {
    const now = new Date().toISOString();
    const id = UserIdVO.create(crypto.randomUUID());
    const entity = new UserEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new UserCreatedEvent(id.value, id.value, props.email.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: UserIdVO,
    props: UserEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserEntity {
    return new UserEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changeName(name: UserNameVO): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), name },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserUpdatedEvent(this.id.value, this.id.value, ['name'], this.version + 1),
    );
    return updated;
  }

  changePhone(phone: UserPhoneVO | null): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), phone },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserUpdatedEvent(this.id.value, this.id.value, ['phone'], this.version + 1),
    );
    return updated;
  }

  activate(): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), status: UserStatusVO.create('active') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserActivatedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  deactivate(): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), status: UserStatusVO.create('inactive') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserDeactivatedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  suspend(reason: string): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), status: UserStatusVO.create('suspended') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserSuspendedEvent(this.id.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  unsuspend(): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), status: UserStatusVO.create('active') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new UserUnsuspendedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  verifyEmail(): UserEntity {
    const updated = new UserEntity(
      this.id,
      { ...this._toProps(), emailVerified: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    return updated;
  }

  softDelete(): UserEntity {
    const now = new Date().toISOString();
    const updated = new UserEntity(
      this.id,
      this._toProps(),
      this.createdAt,
      now,
      now,
    );
    updated.addDomainEvent(
      new UserDeletedEvent(this.id.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  get email(): UserEmailVO { return this._email; }
  get name(): UserNameVO { return this._name; }
  get phone(): UserPhoneVO | null { return this._phone; }
  get status(): UserStatusVO { return this._status; }
  get type(): UserTypeVO { return this._type; }
  get emailVerified(): boolean { return this._emailVerified; }

  private _toProps(): UserEntityProps {
    return {
      email: this._email,
      name: this._name,
      phone: this._phone,
      status: this._status,
      type: this._type,
      emailVerified: this._emailVerified,
    };
  }
}
