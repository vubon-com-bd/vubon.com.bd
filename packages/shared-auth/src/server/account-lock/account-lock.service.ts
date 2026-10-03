import { AccountLockedError } from '../../common/errors/account-locked-error';
import { DEFAULT_ACCOUNT_LOCK_CONFIG } from './brute-force';
import type { AccountLockConfig, AccountLockRecord } from './account-lock.types';

/**
 * Server-side account lock service.
 * In production, back this with Redis for multi-instance.
 */
export class AccountLockService {
  private readonly records = new Map<string, AccountLockRecord>();

  constructor(private readonly config: AccountLockConfig = DEFAULT_ACCOUNT_LOCK_CONFIG) {}

  async assertNotLocked(identifier: string): Promise<void> {
    const rec = this.records.get(identifier);
    if (!rec || rec.lockedUntil === undefined) return;
    if (rec.lockedUntil <= Date.now()) {
      this.records.delete(identifier);
      return;
    }
    throw new AccountLockedError({
      identifier,
      lockedUntil: new Date(rec.lockedUntil).toISOString(),
    });
  }

  async recordFailure(identifier: string): Promise<AccountLockRecord> {
    const now = Date.now();
    const existing = this.records.get(identifier);
    const inWindow = existing !== undefined && now - existing.lastFailureAt <= this.config.windowMs;
    const failures = inWindow ? existing.failures + 1 : 1;
    const lockedUntil = failures >= this.config.maxFailures ? now + this.config.lockMs : undefined;
    const record: AccountLockRecord = {
      identifier,
      failures,
      lastFailureAt: now,
      lockedUntil,
    };
    this.records.set(identifier, record);
    return record;
  }

  async reset(identifier: string): Promise<void> {
    this.records.delete(identifier);
  }
}

export const accountLockService = new AccountLockService();
