/**
 * UserKycEntity — Aggregate Root
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import type { Timestamp } from '@vubon/shared-types/common';
import { KycIdVO } from '../value-objects/primitives/kyc-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { KycDocumentVO } from '../value-objects/primitives/kyc-document.vo.js';
import { KycStatusVO } from '../value-objects/primitives/kyc-status.vo.js';
import { ActivityTimestampVO } from '../value-objects/primitives/activity-timestamp.vo.js';
import { KycSubmittedEvent, KycVerifiedEvent, KycRejectedEvent } from '../events/user-kyc.events.js';

export interface UserKycEntityProps {
  readonly kycId: KycIdVO;
  readonly userId: UserIdVO;
  readonly document: KycDocumentVO;
  readonly status: KycStatusVO;
  readonly submittedAt: ActivityTimestampVO | null;
  readonly verifiedAt: ActivityTimestampVO | null;
  readonly rejectionReason: string | null;
}

export class UserKycEntity extends AggregateRoot<string> {
  private _document: KycDocumentVO;
  private _status: KycStatusVO;
  private _submittedAt: ActivityTimestampVO | null;
  private _verifiedAt: ActivityTimestampVO | null;
  private _rejectionReason: string | null;
  private readonly _userId: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserKycEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._document = props.document;
    this._status = props.status;
    this._submittedAt = props.submittedAt;
    this._verifiedAt = props.verifiedAt;
    this._rejectionReason = props.rejectionReason;
    this._userId = props.userId;
  }

  get userId(): UserIdVO { return this._userId; }
  get document(): KycDocumentVO { return this._document; }
  get status(): KycStatusVO { return this._status; }
  get submittedAt(): ActivityTimestampVO | null { return this._submittedAt; }
  get verifiedAt(): ActivityTimestampVO | null { return this._verifiedAt; }
  get rejectionReason(): string | null { return this._rejectionReason; }

  static create(params: {
    kycId: KycIdVO;
    userId: UserIdVO;
    document: KycDocumentVO;
    now: string;
  }): UserKycEntity {
    const entity = new UserKycEntity(
      params.kycId.value,
      params.now,
      params.now,
      {
        kycId: params.kycId,
        userId: params.userId,
        document: params.document,
        status: KycStatusVO.notStarted(),
        submittedAt: null,
        verifiedAt: null,
        rejectionReason: null,
      },
      null
    );
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserKycEntityProps;
  }): UserKycEntity {
    return new UserKycEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  submit(now: string): void {
    if (!this._status.canSubmit()) {
      throw new Error(`Cannot submit KYC when status is "${this._status.value}"`);
    }
    this._status = KycStatusVO.pending();
    this._submittedAt = ActivityTimestampVO.fromEpochMs(Date.now());
    this._rejectionReason = null;

    this.addDomainEvent(
      new KycSubmittedEvent({
        id: `${this.id}:submitted:${Date.now()}`,
        aggregateId: this.id,
        payload: {
          userId: this._userId.value,
          kycId: this.id,
          document: this._document.value,
        },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  approve(now: string): void {
    if (this._status.isApproved()) return;
    if (this._submittedAt === null) {
      throw new Error('Cannot approve KYC before submission');
    }
    this._status = KycStatusVO.approved();
    this._verifiedAt = ActivityTimestampVO.fromEpochMs(Date.now());

    this.addDomainEvent(
      new KycVerifiedEvent({
        id: `${this.id}:verified:${Date.now()}`,
        aggregateId: this.id,
        payload: {
          userId: this._userId.value,
          kycId: this.id,
          verifiedAt: now,
        },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  reject(reason: string, now: string): void {
    if (this._status.isRejected()) return;
    if (!this._status.isPending()) {
      throw new Error('Can only reject a pending KYC');
    }
    this._status = KycStatusVO.create('rejected');
    this._rejectionReason = reason;

    this.addDomainEvent(
      new KycRejectedEvent({
        id: `${this.id}:rejected:${Date.now()}`,
        aggregateId: this.id,
        payload: {
          userId: this._userId.value,
          kycId: this.id,
          reason,
        },
        occurredAt: now as unknown as Timestamp,
        version: this.version + 1,
      })
    );
    this.incrementVersion();
  }

  isVerified(): boolean {
    return this._status.isApproved() && this._verifiedAt !== null;
  }
}
