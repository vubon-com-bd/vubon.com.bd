/**
 * Account Lock Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AccountLockEntity } from '../entities/account-lock.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';

export const ACCOUNT_LOCK_REPOSITORY = Symbol('ACCOUNT_LOCK_REPOSITORY');

export interface AccountLockListFilter {
  readonly authId?: string;
  readonly userId?: string;
  readonly reason?: string;
  readonly active?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface AccountLockListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'lockedAt' | 'lockedUntil';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AccountLockListFilter;
}

export interface AccountLockPaginationResult {
  readonly items: readonly AccountLockEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface AccountLockStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byReason: Readonly<Record<string, number>>;
}

export interface AccountLockRepository extends BaseRepository<AccountLockEntity, string> {
  findActiveByAuthId(authId: AuthIdVO): Promise<AccountLockEntity | null>;
  findActiveByUserId(userId: string): Promise<AccountLockEntity | null>;
  findByAuthId(authId: AuthIdVO): Promise<readonly AccountLockEntity[]>;

  findPaginated(options: AccountLockListOptions): Promise<AccountLockPaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<AccountLockStats>;

  // Cron support
  findExpired(nowMs?: number): Promise<readonly AccountLockEntity[]>;
  autoUnlockExpired(nowMs?: number): Promise<number>;

  softDelete(id: string): Promise<void>;
}
