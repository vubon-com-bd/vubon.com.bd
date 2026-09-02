/**
 * Auth MFA Types
 * প্রমাণীকরণ মাল্টি-ফ্যাক্টর অথেনটিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_MFA } from '@vubon/shared-constants';

export interface AuthMFA extends BaseEntity {
  userId: string;
  type: AuthMFAType;
  method: AuthMFAMethod;
  status: AuthMFAStatus;
  secret?: string;
  backupCodes?: string[];
  phoneNumber?: string;
  email?: string;
  deviceId?: string;
  enabledAt?: Date;
  disabledAt?: Date;
  lastUsedAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthMFASetupInput {
  type: AuthMFAType;
  method: AuthMFAMethod;
  phoneNumber?: string;
  email?: string;
  deviceId?: string;
}

export interface AuthMFAVerifyInput {
  code: string;
  method: AuthMFAMethod;
  backupCode?: string;
}

export interface AuthMFASetupResponse {
  type: AuthMFAType;
  method: AuthMFAMethod;
  qrCode?: string;
  secret?: string;
  backupCodes?: string[];
  recoveryCodes?: string[];
}

export type AuthMFAType = (typeof AUTH_MFA.TYPES)[keyof typeof AUTH_MFA.TYPES];
export type AuthMFAStatus = (typeof AUTH_MFA.STATUS)[keyof typeof AUTH_MFA.STATUS];
export type AuthMFAMethod = (typeof AUTH_MFA.METHODS)[keyof typeof AUTH_MFA.METHODS];
