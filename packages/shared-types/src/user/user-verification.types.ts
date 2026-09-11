import { BaseEntity } from '../common/base.types';
import { USER_VERIFICATION } from '@vubon/shared-constants/src/user/user-verification.constants';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';

/**
 * Verification type and status values
 */
export type UserVerificationType = (typeof USER_VERIFICATION)[keyof typeof USER_VERIFICATION];
export type UserVerificationStatus = (typeof STATUS.VERIFICATION)[keyof typeof STATUS.VERIFICATION];

/**
 * User verification interface
 */
export interface UserVerification extends BaseEntity {
  verificationId: string;
  userId: string;
  type: UserVerificationType;
  status: UserVerificationStatus;
  documentId?: string;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}
