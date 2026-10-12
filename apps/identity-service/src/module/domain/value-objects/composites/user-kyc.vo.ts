/**
 * UserKycVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { KycIdVO } from '../primitives/kyc-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { KycStatusVO } from '../primitives/kyc-status.vo.js';
import { KycDocumentTypeVO } from '../primitives/kyc-document-type.vo.js';

export interface KycDocumentEntry {
  readonly type: KycDocumentTypeVO;
  readonly number: string;
  readonly frontUrl: string;
  readonly backUrl?: string;
  readonly selfieUrl?: string;
  readonly verified: boolean;
}

export interface UserKycVOProps {
  readonly id: KycIdVO;
  readonly userId: UserIdVO;
  readonly status: KycStatusVO;
  readonly documents: readonly KycDocumentEntry[];
  readonly submittedAt?: string;
  readonly verifiedAt?: string;
  readonly rejectedAt?: string;
  readonly rejectionReason?: string;
  readonly expiresAt?: string;
  readonly reviewedBy?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserKycVO extends BaseVO<UserKycVOProps> {
  private constructor(props: UserKycVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserKycVOProps): UserKycVO {
    const vo = new UserKycVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserKycVOProps): UserKycVO {
    return new UserKycVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.documents.length === 0 && v.status.isPending()) {
      throw new ValidationError(
        'At least one document is required for pending KYC',
        'documents',
      );
    }
    if (v.status.isRejected() && !v.rejectionReason) {
      throw new ValidationError(
        'Rejection reason is required when KYC is rejected',
        'rejectionReason',
      );
    }
  }

  get id(): KycIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get status(): KycStatusVO { return this.value.status; }
  get documents(): readonly KycDocumentEntry[] { return this.value.documents; }
  get submittedAt(): string | undefined { return this.value.submittedAt; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get rejectedAt(): string | undefined { return this.value.rejectedAt; }
  get rejectionReason(): string | undefined { return this.value.rejectionReason; }
  get expiresAt(): string | undefined { return this.value.expiresAt; }
  get reviewedBy(): string | undefined { return this.value.reviewedBy; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isPending(): boolean { return this.value.status.isPending(); }
  isVerified(): boolean { return this.value.status.isVerified(); }
  isRejected(): boolean { return this.value.status.isRejected(); }
  isExpired(nowMs: number = Date.now()): boolean {
    if (!this.value.expiresAt) return false;
    return nowMs >= Date.parse(this.value.expiresAt);
  }
  hasDocument(type: string): boolean {
    return this.value.documents.some((d) => d.type.value === type);
  }
}
