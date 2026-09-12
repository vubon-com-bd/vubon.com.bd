import { AUTH_STATUS } from '@vubon/shared-constants/src/auth/auth-status.constants';

export interface AuthAccountLock {
  lockId: string;
  userId: string;
  reason: string;
  status: keyof typeof AUTH_STATUS;
  lockedAt: Date;
  unlockedAt?: Date;
  lockedBy: string;
  duration: number;
  metadata: Record<string, unknown>;
}

export const isAccountLocked = (account: AuthAccountLock): boolean => {
  return account.status === 'LOCKED' && new Date(account.lockedAt) > new Date();
};

export const getLockDuration = (attempts: number): number => {
  if (attempts >= 5) return 60 * 60 * 1000; // 1 hour
  if (attempts >= 3) return 15 * 60 * 1000; // 15 minutes
  return 5 * 60 * 1000; // 5 minutes
};
