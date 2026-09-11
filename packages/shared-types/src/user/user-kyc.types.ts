import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { DOCUMENT } from '@vubon/shared-constants/src/common/document.constants';
import { USER_KYC } from '@vubon/shared-constants/src/user/user-kyc.constants';

/**
 * Value types
 */
export type UserKycType = (typeof USER_KYC)[keyof typeof USER_KYC];
export type KycStatus = (typeof STATUS.VERIFICATION)[keyof typeof STATUS.VERIFICATION];
export type DocumentTypeValue = (typeof DOCUMENT.TYPES)[keyof typeof DOCUMENT.TYPES];

/**
 * User KYC interface
 * @internal documentImageUrl points to secure storage (S3/signed URL).
 */
export interface UserKyc extends BaseEntity {
  kycId: string;
  userId: string;
  type: UserKycType;
  documentType: DocumentTypeValue;
  /** @internal — hashed/masked document number */
  documentNumberHash: string;
  /** @internal — S3/secure storage URL, not base64 */
  documentImageUrl: string;
  status: KycStatus;
  submittedAt: Date;
  verifiedAt?: Date;
  rejectedReason?: string;
  metadata: Record<string, unknown>;
}
