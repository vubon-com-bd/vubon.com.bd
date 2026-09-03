/**
 * User KYC Types
 * ইউজার KYC সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_KYC } from '@vubon/shared-constants';

export interface UserKYC extends BaseEntity {
  userId: string;
  type: (typeof USER_KYC.TYPES)[keyof typeof USER_KYC.TYPES];
  status: (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
  documentType: (typeof USER_KYC.DOCUMENT_TYPES)[keyof typeof USER_KYC.DOCUMENT_TYPES];
  documentNumber?: string;
  documentUrl?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  riskLevel: (typeof USER_KYC.RISK_LEVELS)[keyof typeof USER_KYC.RISK_LEVELS];
  submittedAt?: Date;
  reviewedAt?: Date;
  expiresAt?: Date;
  reviewComments?: string;
  metadata?: Record<string, unknown>;
}

export interface UserKYCCreateInput {
  userId: string;
  type: (typeof USER_KYC.TYPES)[keyof typeof USER_KYC.TYPES];
  documentType: (typeof USER_KYC.DOCUMENT_TYPES)[keyof typeof USER_KYC.DOCUMENT_TYPES];
  documentNumber?: string;
  documentUrl?: string;
  documentFront?: string;
  documentBack?: string;
  selfie?: string;
  metadata?: Record<string, unknown>;
}

export interface UserKYCUpdateInput extends Partial<UserKYCCreateInput> {
  status?: (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
  riskLevel?: (typeof USER_KYC.RISK_LEVELS)[keyof typeof USER_KYC.RISK_LEVELS];
  reviewComments?: string;
}

export interface UserKYCResponse {
  kyc: UserKYC;
  status: (typeof USER_KYC.STATUS)[keyof typeof USER_KYC.STATUS];
  isVerified: boolean;
  level: number;
}
