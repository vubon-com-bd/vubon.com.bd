/**
 * User Verification Types
 * ইউজার ভেরিফিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { USER_VERIFICATION } from '@vubon/shared-constants';

export interface UserVerification extends BaseEntity {
  userId: string;
  method: (typeof USER_VERIFICATION.METHODS)[keyof typeof USER_VERIFICATION.METHODS];
  value: string;
  code?: string;
  token?: string;
  status: (typeof USER_VERIFICATION.STATUS)[keyof typeof USER_VERIFICATION.STATUS];
  level: (typeof USER_VERIFICATION.LEVELS)[keyof typeof USER_VERIFICATION.LEVELS];
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

export interface UserVerificationCreateInput {
  userId: string;
  method: (typeof USER_VERIFICATION.METHODS)[keyof typeof USER_VERIFICATION.METHODS];
  value: string;
  level?: (typeof USER_VERIFICATION.LEVELS)[keyof typeof USER_VERIFICATION.LEVELS];
  expiresIn?: number;
  maxAttempts?: number;
  metadata?: Record<string, unknown>;
}

export interface UserVerificationVerifyInput {
  code?: string;
  token?: string;
  metadata?: Record<string, unknown>;
}

export interface UserVerificationResponse {
  verified: boolean;
  status: (typeof USER_VERIFICATION.STATUS)[keyof typeof USER_VERIFICATION.STATUS];
  level?: (typeof USER_VERIFICATION.LEVELS)[keyof typeof USER_VERIFICATION.LEVELS];
  message?: string;
}
