import { AuthAccountLock } from '@vubon/shared-types';

export const isAccountLocked = (account: AuthAccountLock): boolean => {
  return account.status === 'LOCKED' && new Date(account.lockedAt) > new Date();
};

export const getLockDuration = (attempts: number): number => {
  if (attempts >= 5) return 60 * 60 * 1000;
  if (attempts >= 3) return 15 * 60 * 1000;
  return 5 * 60 * 1000;
};
