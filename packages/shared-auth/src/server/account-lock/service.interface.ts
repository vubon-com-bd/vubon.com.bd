import type { AccountLockRecord } from './account-lock.types';

export interface AccountLockServiceContract {
  assertNotLocked(identifier: string): Promise<void>;
  recordFailure(identifier: string): Promise<AccountLockRecord>;
  reset(identifier: string): Promise<void>;
}
