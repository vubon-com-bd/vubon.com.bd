/**
 * Auth Verification Types
 * প্রমাণীকরণ যাচাইকরণ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_VERIFICATION } from '@vubon/shared-constants';

export interface AuthVerification extends BaseEntity {
  userId: string;
  type: AuthVerificationType;
  value: string;
  code?: string;
  token?: string;
  status: AuthVerificationStatus;
  method: AuthVerificationMethod;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

export interface AuthVerificationCreateInput {
  userId: string;
  type: AuthVerificationType;
  value: string;
  method: AuthVerificationMethod;
  expiresIn?: number;
  maxAttempts?: number;
}

export interface AuthVerificationVerifyInput {
  code?: string;
  token?: string;
  metadata?: Record<string, unknown>;
}

export type AuthVerificationType =
  (typeof AUTH_VERIFICATION.TYPES)[keyof typeof AUTH_VERIFICATION.TYPES];
export type AuthVerificationStatus =
  (typeof AUTH_VERIFICATION.STATUS)[keyof typeof AUTH_VERIFICATION.STATUS];
export type AuthVerificationMethod =
  (typeof AUTH_VERIFICATION.METHODS)[keyof typeof AUTH_VERIFICATION.METHODS];
