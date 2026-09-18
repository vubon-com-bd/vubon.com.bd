import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export type KycStatus = 'pending' | 'submitted' | 'verified' | 'rejected';

export interface UserKycEntityProps {
  readonly userId: UserIdVO;
  readonly status: KycStatus;
  readonly documentType: string;
  readonly documentNumber: string;
  readonly documentUrl: string;
  readonly submittedAt: Date | null;
  readonly reviewedAt: Date | null;
  readonly rejectionReason: string | null;
}

export class UserKycEntity extends AggregateRoot<UserIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _status: KycStatus;
  private readonly _documentType: string;
  private readonly _documentNumber: string;
  private readonly _documentUrl: string;
  private readonly _submittedAt: Date | null;
  private readonly _reviewedAt: Date | null;
  private readonly _rejectionReason: string | null;

  private constructor(
    id: UserIdVO,
    props: UserKycEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._status = props.status;
    this._documentType = props.documentType;
    this._documentNumber = props.documentNumber;
    this._documentUrl = props.documentUrl;
    this._submittedAt = props.submittedAt;
    this._reviewedAt = props.reviewedAt;
    this._rejectionReason = props.rejectionReason;
  }

  static create(props: UserKycEntityProps): UserKycEntity {
    const now = new Date().toISOString();
    return new UserKycEntity(props.userId, props, now, now, null);
  }

  static reconstitute(
    id: UserIdVO,
    props: UserKycEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserKycEntity {
    return new UserKycEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  submit(): UserKycEntity {
    return new UserKycEntity(
      this.id,
      { ...this._toProps(), status: 'submitted', submittedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  verify(): UserKycEntity {
    return new UserKycEntity(
      this.id,
      { ...this._toProps(), status: 'verified', reviewedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  reject(reason: string): UserKycEntity {
    return new UserKycEntity(
      this.id,
      {
        ...this._toProps(),
        status: 'rejected',
        reviewedAt: new Date(),
        rejectionReason: reason,
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get status(): KycStatus { return this._status; }
  get documentType(): string { return this._documentType; }
  get documentNumber(): string { return this._documentNumber; }
  get documentUrl(): string { return this._documentUrl; }
  get submittedAt(): Date | null { return this._submittedAt; }
  get reviewedAt(): Date | null { return this._reviewedAt; }
  get rejectionReason(): string | null { return this._rejectionReason; }

  get isVerified(): boolean { return this._status === 'verified'; }

  private _toProps(): UserKycEntityProps {
    return {
      userId: this._userId,
      status: this._status,
      documentType: this._documentType,
      documentNumber: this._documentNumber,
      documentUrl: this._documentUrl,
      submittedAt: this._submittedAt,
      reviewedAt: this._reviewedAt,
      rejectionReason: this._rejectionReason,
    };
  }
}
