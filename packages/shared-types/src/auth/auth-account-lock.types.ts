import { BaseEntity } from '../common/base.types';
import { STATUS } from '@vubon/shared-constants';

export interface AuthAccountLock extends BaseEntity {
  lockId: string;
  userId: string;
  reason: string;
  status: keyof typeof STATUS;
  lockedAt: Date;
  unlockedAt?: Date;
  lockedBy: string;
  duration: number;
  metadata: Record<string, unknown>;
}
