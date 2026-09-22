import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { KycIdVO } from '../value-objects/primitives/kyc-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { KycDocumentVO } from '../value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '../value-objects/primitives/kyc-status.vo';
import {
  KycSubmittedEvent,
  KycVerifiedEvent,
  KycRejectedEvent,
} from '../events/user-kyc.events';

export interface UserKycEntityProps {
  readonly userId: UserIdVO;
  readonly document: KycDocumentVO;
  readonly status: KycStatusVO;
  readonly submittedAt: Date | null;
  readonly reviewedAt: Date | null;
  readonly rejectionReason: string | null;
}

export class UserKycEntity extends AggregateRoot<KycIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _document: KycDocumentVO;
  private readonly _status: KycStatusVO;
  private readonly _submittedAt: Date | null;
  private readonly _reviewedAt: Date | null;
  private readonly _rejectionReason: string | null;

  private constructor(
    id: KycIdVO,
    props: UserKycEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._document = props.document;
    this._status = props.status;
    this._submittedAt = props.submittedAt;
    this._reviewedAt = props.reviewedAt;
    this._rejectionReason = props.rejectionReason;
  }

  static create(props: UserKycEntityProps): UserKycEntity {
    const now = new Date().toISOString();
    const id = KycIdVO.create(crypto.randomUUID());
    const entity = new UserKycEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new KycSubmittedEvent(id.value, props.userId.value, id.value, 0),
    );
    return entity;
  }

  static reconstitute(
    id: KycIdVO,
    props: UserKycEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserKycEntity {
    return new UserKycEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  submit(): UserKycEntity {
    const updated = new UserKycEntity(
      this.id,
      { ...this._toProps(), status: KycStatusVO.create('submitted'), submittedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    return updated;
  }

  verify(): UserKycEntity {
    const updated = new UserKycEntity(
      this.id,
      { ...this._toProps(), status: KycStatusVO.create('verified'), reviewedAt: new Date() },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new KycVerifiedEvent(this.id.value, this._userId.value, this.id.value, this.version + 1),
    );
    return updated;
  }

  reject(reason: string): UserKycEntity {
    const updated = new UserKycEntity(
      this.id,
      {
        ...this._toProps(),
        status: KycStatusVO.create('rejected'),
        reviewedAt: new Date(),
        rejectionReason: reason,
      },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
    updated.addDomainEvent(
      new KycRejectedEvent(this.id.value, this._userId.value, this.id.value, reason, this.version + 1),
    );
    return updated;
  }

  get userId(): UserIdVO { return this._userId; }
  get document(): KycDocumentVO { return this._document; }
  get status(): KycStatusVO { return this._status; }
  get submittedAt(): Date | null { return this._submittedAt; }
  get reviewedAt(): Date | null { return this._reviewedAt; }
  get rejectionReason(): string | null { return this._rejectionReason; }

  private _toProps(): UserKycEntityProps {
    return {
      userId: this._userId,
      document: this._document,
      status: this._status,
      submittedAt: this._submittedAt,
      reviewedAt: this._reviewedAt,
      rejectionReason: this._rejectionReason,
    };
  }
}
