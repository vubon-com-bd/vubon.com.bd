import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { VerificationTypeVO } from '../value-objects/primitives/verification-type.vo';
import { VerificationStatusVO } from '../value-objects/primitives/verification-status.vo';

export interface UserVerificationEntityProps {
  readonly userId: UserIdVO;
  readonly type: VerificationTypeVO;
  readonly status: VerificationStatusVO;
  readonly verifiedAt: Date | null;
  readonly expiresAt: Date | null;
}

export class UserVerificationEntity extends BaseEntity<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _type: VerificationTypeVO;
  private readonly _status: VerificationStatusVO;
  private readonly _verifiedAt: Date | null;
  private readonly _expiresAt: Date | null;

  private constructor(
    id: UserIdVO,
    props: UserVerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._type = props.type;
    this._status = props.status;
    this._verifiedAt = props.verifiedAt;
    this._expiresAt = props.expiresAt;
  }

  static create(props: UserVerificationEntityProps): UserVerificationEntity {
    const now = new Date().toISOString();
    return new UserVerificationEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserVerificationEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserVerificationEntity {
    return new UserVerificationEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markVerified(): UserVerificationEntity {
    return new UserVerificationEntity(
      this.id,
      {
        ...this._toProps(),
        status: VerificationStatusVO.create('verified'),
        verifiedAt: new Date(),
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markExpired(): UserVerificationEntity {
    return new UserVerificationEntity(
      this.id,
      { ...this._toProps(), status: VerificationStatusVO.create('expired') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get type(): VerificationTypeVO { return this._type; }
  get status(): VerificationStatusVO { return this._status; }
  get verifiedAt(): Date | null { return this._verifiedAt; }
  get expiresAt(): Date | null { return this._expiresAt; }

  get isVerified(): boolean {
    return this._status.value === 'verified';
  }

  private _toProps(): UserVerificationEntityProps {
    return {
      userId: this._userId,
      type: this._type,
      status: this._status,
      verifiedAt: this._verifiedAt,
      expiresAt: this._expiresAt,
    };
  }
}
