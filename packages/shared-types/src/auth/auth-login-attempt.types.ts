/**
 * Auth Login Attempt Types
 * প্রমাণীকরণ লগইন প্রচেষ্টা সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';
import { AUTH_LOGIN_ATTEMPT } from '@vubon/shared-constants';

export interface AuthLoginAttempt extends BaseEntity {
  userId?: string;
  email?: string;
  phone?: string;
  ipAddress: string;
  userAgent?: string;
  status: AuthLoginAttemptStatus;
  blockReason?: AuthBlockReason;
  success: boolean;
  attemptAt: Date;
  metadata?: Record<string, unknown>;
}

export interface AuthLoginAttemptCreateInput {
  userId?: string;
  email?: string;
  phone?: string;
  ipAddress: string;
  userAgent?: string;
  success: boolean;
  status?: AuthLoginAttemptStatus;
  metadata?: Record<string, unknown>;
}

export interface AuthLoginAttemptStats {
  totalAttempts: number;
  failedAttempts: number;
  successAttempts: number;
  blockedAttempts: number;
  lastAttemptAt?: Date;
  lastSuccessAt?: Date;
  lastFailureAt?: Date;
  blockReason?: AuthBlockReason;
  remainingAttempts: number;
  lockoutUntil?: Date;
}

export type AuthLoginAttemptStatus =
  (typeof AUTH_LOGIN_ATTEMPT.STATUS)[keyof typeof AUTH_LOGIN_ATTEMPT.STATUS];
export type AuthBlockReason =
  (typeof AUTH_LOGIN_ATTEMPT.BLOCK_REASONS)[keyof typeof AUTH_LOGIN_ATTEMPT.BLOCK_REASONS];
