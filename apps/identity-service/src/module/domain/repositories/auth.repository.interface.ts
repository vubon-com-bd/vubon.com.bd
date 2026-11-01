/**
 * Auth Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { AuthEntity } from '../entities/auth.entity.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

// ─── DI Token ───────────────────────────────
export const AUTH_REPOSITORY = Symbol('AUTH_REPOSITORY');

// ─── Filter ─────────────────────────────────
export interface AuthListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly provider?: string;
  readonly status?: string;
  readonly identifier?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── List Options ───────────────────────────
export interface AuthListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'lastLoginAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: AuthListFilter;
}

// ─── Pagination Result ──────────────────────
export interface AuthPaginationResult {
  readonly items: readonly AuthEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ──────────────────────────────────
export interface AuthStats {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byProvider: Readonly<Record<string, number>>;
  readonly activeCount: number;
  readonly lockedCount: number;
  readonly mfaEnabledCount: number;
}

// ─── Main Interface ─────────────────────────
export interface AuthRepository extends BaseRepository<AuthEntity, string> {
  findByIdVO(id: AuthIdVO): Promise<AuthEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly AuthEntity[]>;
  findByIdentifier(identifier: string): Promise<AuthEntity | null>;
  findByUserIdAndProvider(userId: UserIdVO, provider: string): Promise<AuthEntity | null>;

  findPaginated(options: AuthListOptions): Promise<AuthPaginationResult>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<AuthStats>;

  // Cron support
  findLockedExpired(): Promise<readonly AuthEntity[]>;
  findInactive(olderThanDays: number): Promise<readonly AuthEntity[]>;
  findUnverified(olderThanHours: number): Promise<readonly AuthEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
