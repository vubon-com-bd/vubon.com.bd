/**
 * Admin Verification Types
 * অ্যাডমিন ভেরিফিকেশন সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common';
import { ADMIN_VERIFICATION } from '@vubon/shared-constants';

export interface AdminVerification extends BaseEntity {
  adminId: string;
  method: (typeof ADMIN_VERIFICATION.METHODS)[keyof typeof ADMIN_VERIFICATION.METHODS];
  value: string;
  status: (typeof ADMIN_VERIFICATION.STATUS)[keyof typeof ADMIN_VERIFICATION.STATUS];
  code?: string;
  token?: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
}

export interface AdminVerificationCreateInput {
  adminId: string;
  method: (typeof ADMIN_VERIFICATION.METHODS)[keyof typeof ADMIN_VERIFICATION.METHODS];
  value: string;
  expiresIn?: number;
  maxAttempts?: number;
}

export interface AdminVerificationVerifyInput {
  code?: string;
  token?: string;
}

export interface AdminVerificationResponse {
  verified: boolean;
  status: (typeof ADMIN_VERIFICATION.STATUS)[keyof typeof ADMIN_VERIFICATION.STATUS];
  message?: string;
}
