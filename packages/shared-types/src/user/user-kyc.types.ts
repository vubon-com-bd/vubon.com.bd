import { STATUS } from '@vubon/shared-constants';
import { USER_KYC } from '@vubon/shared-constants';

export interface UserKyc {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
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
