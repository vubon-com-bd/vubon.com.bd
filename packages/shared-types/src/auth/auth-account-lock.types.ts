import { BaseEntity } from '../common/base.types';
import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';

/**
 * Account lock status — derived from AUTH_STATUS where possible.
 * Custom states: 'unlocked', 'expired' (not in AUTH_STATUS).
 */
export type AccountLockStatus =
  typeof AUTH_STATUS.ACTIVE | typeof AUTH_STATUS.LOCKED | 'unlocked' | 'expired';

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
