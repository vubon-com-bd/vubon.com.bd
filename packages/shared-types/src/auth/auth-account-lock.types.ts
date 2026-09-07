import { STATUS } from '@vubon/shared-constants';

export interface AuthAccountLock {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isDeleted: boolean;
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
