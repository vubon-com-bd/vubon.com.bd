/**
 * UserKycEntity — AggregateRoot
 * @module identity-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { KycIdVO } from '../value-objects/primitives/kyc-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { KycStatusVO } from '../value-objects/primitives/kyc-status.vo.js';
import type { KycDocumentEntry } from '../value-objects/composites/user-kyc.vo.js';

import {
  KycSubmittedEvent,
  KycVerifiedEvent,
  KycRejectedEvent,
} from '../events/user-kyc.events.js';

// Re-export type so barrel order doesn't matter
export type { KycDocumentEntry };

export interface UserKycEntityProps {
  readonly userId: UserIdVO;
  status: KycStatusVO;
  documents: readonly KycDocumentEntry[];
  submittedAt?: string;
  verifiedAt?: string;
  rejectedAt?: string;
  rejectionReason?: string;
  expiresAt?: string;
  reviewedBy?: string;
}

export class UserKycEntity extends AggregateRoot<string> {
  private props: UserKycEntityProps;

  private constructor(id: KycIdVO, createdAt: string, updatedAt: string, props: UserKycEntityProps) {
    super(id.value, createdAt, updatedAt, null);
    this.props = props;
  }

  get kycId(): KycIdVO { return KycIdVO.reconstitute(this.id); }
  get userId(): UserIdVO { return this.props.userId; }
  get status(): KycStatusVO { return this.props.status; }
  get documents(): readonly KycDocumentEntry[] { return this.props.documents; }
  get submittedAt(): string | undefined { return this.props.submittedAt; }
  get verifiedAt(): string | undefined { return this.props.verifiedAt; }
  get rejectedAt(): string | undefined { return this.props.rejectedAt; }
  get rejectionReason(): string | undefined { return this.props.rejectionReason; }
  get expiresAt(): string | undefined { return this.props.expiresAt; }
  get reviewedBy(): string | undefined { return this.props.reviewedBy; }

  isVerified(): boolean { return this.props.status.isVerified(); }
  isPending(): boolean { return this.props.status.isPending(); }
  isRejected(): boolean { return this.props.status.isRejected(); }

  submit(documents: readonly KycDocumentEntry[], now: string = new Date().toISOString()): void {
    if (documents.length === 0) {
      throw new BusinessRuleError(
        'At least one document is required',
        'KYC_NO_DOCUMENTS',
        { userId: this.props.userId.value },
      );
    }
    if (!this.props.status.isPending() && !this.props.status.isRejected() && !this.props.status.isExpired()) {
      throw new BusinessRuleError(
        `Cannot submit KYC in status "${this.props.status.value}"`,
        'KYC_CANNOT_SUBMIT',
        { status: this.props.status.value },
      );
    }
    this.props = {
      ...this.props,
      documents,
      status: KycStatusVO.pending(),
      submittedAt: now,
      rejectedAt: undefined,
      rejectionReason: undefined,
    };
    this.addDomainEvent(
      new KycSubmittedEvent({
        aggregateId: this.id,
        payload: {
          kycId: this.id,
          userId: this.props.userId.value,
          documentCount: documents.length,
          submittedAt: now,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  verify(reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this.props.status.isPending() && !this.props.status.isResubmitted()) {
      throw new BusinessRuleError(
        `Cannot verify KYC in status "${this.props.status.value}"`,
        'KYC_CANNOT_VERIFY',
        { status: this.props.status.value },
      );
    }
    this.props = {
      ...this.props,
      status: KycStatusVO.verified(),
      verifiedAt: now,
      reviewedBy,
    };
    this.addDomainEvent(
      new KycVerifiedEvent({
        aggregateId: this.id,
        payload: { kycId: this.id, userId: this.props.userId.value, reviewedBy, verifiedAt: now },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reject(reason: string, reviewedBy: string, now: string = new Date().toISOString()): void {
    if (!this.props.status.isPending() && !this.props.status.isResubmitted()) {
      throw new BusinessRuleError(
        `Cannot reject KYC in status "${this.props.status.value}"`,
        'KYC_CANNOT_REJECT',
        { status: this.props.status.value },
      );
    }
    this.props = {
      ...this.props,
      status: KycStatusVO.rejected(),
      rejectedAt: now,
      rejectionReason: reason,
      reviewedBy,
    };
    this.addDomainEvent(
      new KycRejectedEvent({
        aggregateId: this.id,
        payload: { kycId: this.id, userId: this.props.userId.value, reviewedBy, reason, rejectedAt: now },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: { id: KycIdVO; userId: UserIdVO; now: string }): UserKycEntity {
    return new UserKycEntity(params.id, params.now, params.now, {
      userId: params.userId,
      status: KycStatusVO.pending(),
      documents: [],
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserKycEntityProps;
    version?: number;
  }): UserKycEntity {
    const entity = new UserKycEntity(KycIdVO.reconstitute(params.id), params.createdAt, params.updatedAt, params.props);
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
