import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants/src/common/status.constants';
import { USER_KYC } from '@vubon/shared-constants/src/user/user-kyc.constants';

/**
 * User KYC interface
 */
export interface UserKyc extends BaseEntity {
  kycId: string;
  userId: string;
  type: keyof typeof USER_KYC;
  documentType: string;
  documentNumber: string;
  documentImage: string;
  status: keyof typeof STATUS;
  submittedAt: Date;
  verifiedAt?: Date;
  rejectedReason?: string;
  metadata: Record<string, unknown>;
}
