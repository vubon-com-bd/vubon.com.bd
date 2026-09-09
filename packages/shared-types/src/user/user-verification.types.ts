import { BaseEntity } from '../common/base.types';
import { USER_VERIFICATION } from '@vubon/shared-constants/src/user/user-verification.constants';

/**
 * User verification interface
 */
export interface UserVerification extends BaseEntity {
  verificationId: string;
  userId: string;
  type: keyof typeof USER_VERIFICATION | string;
  status: string;
  documentId?: string;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}
