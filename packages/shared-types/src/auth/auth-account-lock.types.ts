import { BaseEntity } from '../common/base.types';

/**
 * Account lock status — explicit union
 */
export type AccountLockStatus = 'active' | 'locked' | 'unlocked' | 'expired';

/**
 * Auth account lock interface
 */
export interface AuthAccountLock extends Omit<BaseEntity, 'status'> {
  lockId: string;
  userId: string;
  reason: string;
  status: AccountLockStatus;
  lockedAt: Date;
  unlockedAt?: Date;
  lockedBy: string;
  /** Duration in seconds */
  duration: number;
  metadata: Record<string, unknown>;
}
