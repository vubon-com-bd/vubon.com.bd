/**
 * UserContactEntity — BaseEntity
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ContactIdVO } from '../value-objects/primitives/contact-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ContactTypeVO } from '../value-objects/primitives/contact-type.vo.js';
import { ContactValueVO } from '../value-objects/primitives/contact-value.vo.js';
import { UserContactVO } from '../value-objects/composites/user-contact.vo.js';

export interface UserContactEntityProps {
  readonly contactId: ContactIdVO;
  readonly userId: UserIdVO;
  readonly type: ContactTypeVO;
  readonly contactValue: ContactValueVO;
  readonly isPrimary: boolean;
  readonly isVerified: boolean;
}

export class UserContactEntity extends BaseEntity<string> {
  private _type: ContactTypeVO;
  private _contactValue: ContactValueVO;
  private _isPrimary: boolean;
  private _isVerified: boolean;
  private readonly _userId: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserContactEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._type = props.type;
    this._contactValue = props.contactValue;
    this._isPrimary = props.isPrimary;
    this._isVerified = props.isVerified;
    this._userId = props.userId;
  }

  get type(): ContactTypeVO { return this._type; }
  get contactValue(): ContactValueVO { return this._contactValue; }
  get isPrimary(): boolean { return this._isPrimary; }
  get isVerified(): boolean { return this._isVerified; }
  get userId(): UserIdVO { return this._userId; }

  static create(params: {
    contactId: ContactIdVO;
    userId: UserIdVO;
    type: ContactTypeVO;
    contactValue: ContactValueVO;
    isPrimary: boolean;
    now: string;
  }): UserContactEntity {
    return new UserContactEntity(
      params.contactId.value,
      params.now,
      params.now,
      {
        contactId: params.contactId,
        userId: params.userId,
        type: params.type,
        contactValue: params.contactValue,
        isPrimary: params.isPrimary,
        isVerified: false,
      },
      null
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserContactEntityProps;
  }): UserContactEntity {
    return new UserContactEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  verify(): void {
    if (this._isVerified) return;
    this._isVerified = true;
  }

  unverify(): void {
    this._isVerified = false;
  }

  makePrimary(): void {
    this._isPrimary = true;
  }

  unmarkPrimary(): void {
    this._isPrimary = false;
  }

  updateValue(v: ContactValueVO): void {
    this._contactValue = v;
    this._isVerified = false;
  }

  toContactVO(): UserContactVO {
    return UserContactVO.create({
      id: ContactIdVO.create(this.id),
      userId: this._userId,
      type: this._type,
      contactValue: this._contactValue,
      isPrimary: this._isPrimary,
      isVerified: this._isVerified,
    });
  }
}
