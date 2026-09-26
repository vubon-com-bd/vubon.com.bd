/**
 * UserKycEntity — KYC submission aggregate
 * @module auth-service/domain/entities
 *
 * NOTE: KycStatus and KycDocumentType are defined in the composite VO
 * (single source of truth) and re-exported here for convenience.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import type { UserId } from '@vubon/shared-types/common';
import type {
  KycStatus,
  KycDocumentType,
} from '../value-objects/composites/user-kyc.vo';

export type { KycStatus, KycDocumentType };

export interface UserKycEntityProps {
  readonly id: string;
  readonly userId: UserId;
  readonly status: KycStatus;
  readonly documentType: KycDocumentType;
  readonly documentNumber: string;
  readonly frontImageUrl?: string;
  readonly backImageUrl?: string;
  readonly rejectionReason?: string;
  readonly submittedAt?: string;
  readonly reviewedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt?: string | null;
}

export class UserKycEntity extends BaseEntity<string> {
  readonly userId: UserId;
  private _status: KycStatus;
  private _documentType: KycDocumentType;
  private _documentNumber: string;
  private _frontImageUrl?: string;
  private _backImageUrl?: string;
  private _rejectionReason?: string;
  private _submittedAt?: string;
  private _reviewedAt?: string;

  private constructor(props: UserKycEntityProps) {
    super(props.id, props.createdAt, props.updatedAt, props.deletedAt ?? null);
    this.userId = props.userId;
    this._status = props.status;
    this._documentType = props.documentType;
    this._documentNumber = props.documentNumber;
    this._frontImageUrl = props.frontImageUrl;
    this._backImageUrl = props.backImageUrl;
    this._rejectionReason = props.rejectionReason;
    this._submittedAt = props.submittedAt;
    this._reviewedAt = props.reviewedAt;
  }

  static create(props: UserKycEntityProps): UserKycEntity {
    return new UserKycEntity(props);
  }

  get status(): KycStatus { return this._status; }
  get documentType(): KycDocumentType { return this._documentType; }
  get documentNumber(): string { return this._documentNumber; }

  submit(at: string, front: string, back?: string): void {
    if (this._status === 'pending') throw new Error('KYC already pending');
    if (this._status === 'approved') throw new Error('KYC already approved');
    if (!front) throw new Error('Front image is required');
    this._frontImageUrl = front;
    this._backImageUrl = back;
    this._submittedAt = at;
    this._status = 'pending';
  }

  approve(at: string): void {
    if (this._status !== 'pending') throw new Error('KYC not pending');
    this._status = 'approved';
    this._reviewedAt = at;
    this._rejectionReason = undefined;
  }

  reject(at: string, reason: string): void {
    if (this._status !== 'pending') throw new Error('KYC not pending');
    if (!reason) throw new Error('Rejection reason required');
    this._status = 'rejected';
    this._reviewedAt = at;
    this._rejectionReason = reason;
  }
}
