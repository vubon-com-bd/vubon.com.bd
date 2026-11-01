import type { AccountLockConfig } from './account-lock.types';

export const DEFAULT_ACCOUNT_LOCK_CONFIG: AccountLockConfig = {
  maxFailures: 5,
  windowMs: 15 * 60 * 1000,
  lockMs: 30 * 60 * 1000,
};
