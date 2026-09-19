import { Injectable } from '@nestjs/common';
import { ACCOUNT_LOCK_CONFIG } from '../../config/account-lock.config';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockedError } from '../../../domain/errors/account-lock.errors';

@Injectable()
export class AccountLockValidatorService {
  assertUnlocked(lock: AuthAccountLockEntity | null): void {
    if (lock && lock.isActive) {
      throw new AccountLockedError(lock.userId.value);
    }
  }

  isLocked(lock: AuthAccountLockEntity | null): boolean {
    return lock !== null && lock.isActive;
  }

  getMaxAttempts(): number {
    return ACCOUNT_LOCK_CONFIG.maxAttempts;
  }

  getLockoutDurationMs(): number {
    return ACCOUNT_LOCK_CONFIG.lockoutDurationSeconds * 1000;
  }
}
