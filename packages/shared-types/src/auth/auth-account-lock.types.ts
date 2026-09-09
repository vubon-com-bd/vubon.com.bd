import { BaseEntity } from '../common/base.types';

/**
 * Auth account lock interface
 */
export interface AuthAccountLock extends BaseEntity {
  lockId: string;
  userId: string;
  reason: string;
  status: string;
  lockedAt: Date;
  unlockedAt?: Date;
  lockedBy: string;
  duration: number;
  metadata: Record<string, unknown>;
}
