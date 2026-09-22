import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo';
import { ContactValueVO } from '../value-objects/primitives/contact-value.vo';

export interface UserContactEntityProps {
  readonly userId: UserIdVO;
  readonly type: ContactTypeVO;
  readonly value: ContactValueVO;
  readonly verified: boolean;
}

export class UserContactEntity extends BaseEntity<ContactIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: ContactTypeVO;
  private readonly _value: ContactValueVO;
  private readonly _verified: boolean;

  private constructor(
    id: ContactIdVO,
    props: UserContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._value = props.value;
    this._verified = props.verified;
  }

  static create(props: UserContactEntityProps): UserContactEntity {
    const now = new Date().toISOString();
    const id = ContactIdVO.create(crypto.randomUUID());
    return new UserContactEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: ContactIdVO,
    props: UserContactEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserContactEntity {
    return new UserContactEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markVerified(): UserContactEntity {
    return new UserContactEntity(
      this.id,
      { ...this._toProps(), verified: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): ContactTypeVO { return this._type; }
  get value(): ContactValueVO { return this._value; }
  get verified(): boolean { return this._verified; }

  private _toProps(): UserContactEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      value: this._value,
      verified: this._verified,
    };
  }
}
