import { USER_VERIFICATION } from '@vubon/shared-constants';

export interface UserVerification {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
  verificationId: string;
  userId: string;
  type: keyof typeof USER_VERIFICATION;
  status: keyof typeof USER_VERIFICATION;
  documentId?: string;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata: Record<string, unknown>;
}
