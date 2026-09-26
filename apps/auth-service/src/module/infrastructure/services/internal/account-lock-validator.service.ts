/**
 * AccountLockValidatorService — Lock-state checks
 * @module auth-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import { AuthAccountLockEntity } from '../../../domain/entities/auth-account-lock.entity';
import { AccountLockedError } from '../../../domain/errors/account-lock.errors';

@Injectable()
export class AccountLockValidatorService {
  readonly name = 'AccountLockValidatorService';

  assertNotLocked(lock: AuthAccountLockEntity | null, now: number): void {
    if (lock && lock.isLocked(now)) {
      throw new AccountLockedError(
        lock.userId,
        lock.reason.value,
        new Date(lock.lockedAt + (lock.duration?.value ?? 0)).toISOString(),
      );
    }
  }

  isLocked(lock: AuthAccountLockEntity | null, now: number): boolean {
    return lock !== null && lock.isLocked(now);
  }
}
