/**
 * Auth Account Lock Types
 * প্রমাণীকরণ অ্যাকাউন্ট লক সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../common/base.entity';

export interface AuthAccountLock extends BaseEntity {
  userId: string;
  locked: boolean;
  lockedAt?: Date;
  unlockedAt?: Date;
  lockReason?: string;
  lockedBy?: string;
  attempts: number;
  maxAttempts: number;
  lockDuration: number;
  metadata?: Record<string, unknown>;
}

export interface AuthAccountLockInput {
  userId: string;
  reason?: string;
  lockedBy?: string;
  duration?: number;
}

export interface AuthAccountUnlockInput {
  userId: string;
  reason?: string;
  unlockedBy?: string;
}

export interface AuthAccountLockStatus {
  locked: boolean;
  attempts: number;
  maxAttempts: number;
  remainingAttempts: number;
  lockedAt?: Date;
  unlockAt?: Date;
}
