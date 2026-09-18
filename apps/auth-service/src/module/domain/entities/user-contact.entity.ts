import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';

export interface UserContactEntityProps {
  readonly userId: UserIdVO;
  readonly phone: UserPhoneVO;
  readonly email: UserEmailVO;
  readonly alternatePhone: UserPhoneVO | null;
  readonly alternateEmail: UserEmailVO | null;
}

export class UserContactEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _phone: UserPhoneVO;
  private readonly _email: UserEmailVO;
  private readonly _alternatePhone: UserPhoneVO | null;
  private readonly _alternateEmail: UserEmailVO | null;

  private constructor(
    id: UserIdVO,
    props: UserContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._phone = props.phone;
    this._email = props.email;
    this._alternatePhone = props.alternatePhone;
    this._alternateEmail = props.alternateEmail;
  }

  static create(props: UserContactEntityProps): UserContactEntity {
    const now = new Date().toISOString();
    return new UserContactEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserContactEntity {
    return new UserContactEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  changePhone(phone: UserPhoneVO): UserContactEntity {
    return new UserContactEntity(
      this.id,
      { ...this._toProps(), phone },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get phone(): UserPhoneVO { return this._phone; }
  get email(): UserEmailVO { return this._email; }
  get alternatePhone(): UserPhoneVO | null { return this._alternatePhone; }
  get alternateEmail(): UserEmailVO | null { return this._alternateEmail; }

  private _toProps(): UserContactEntityProps {
    return {
      userId: this._userId,
      phone: this._phone,
      email: this._email,
      alternatePhone: this._alternatePhone,
      alternateEmail: this._alternateEmail,
    };
  }
}
