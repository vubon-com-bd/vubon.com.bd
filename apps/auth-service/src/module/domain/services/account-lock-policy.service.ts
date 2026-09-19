import { AuthAccountLockEntity } from '../entities/auth-account-lock.entity';
import { AccountLockedError } from '../errors/account-lock.errors';

export class AccountLockPolicyService {
  assertUnlocked(lock: AuthAccountLockEntity | null): void {
    if (lock && lock.isActive) {
      throw new AccountLockedError(lock.userId.value);
    }
  }

  isLocked(lock: AuthAccountLockEntity | null): boolean {
    return lock !== null && lock.isActive;
  }
}
