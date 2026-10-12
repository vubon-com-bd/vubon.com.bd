/**
 * Login Attempt Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { LoginAttemptEntity } from '../entities/login-attempt.entity.js';

export const LOGIN_ATTEMPT_REPOSITORY = Symbol('LOGIN_ATTEMPT_REPOSITORY');

export interface LoginAttemptListFilter {
  readonly authId?: string;
  readonly identifier?: string;
  readonly status?: string;
  readonly ipAddress?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface LoginAttemptListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'attemptedAt' | 'createdAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: LoginAttemptListFilter;
}

export interface LoginAttemptPaginationResult {
  readonly items: readonly LoginAttemptEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface LoginAttemptStats {
  readonly total: number;
  readonly successCount: number;
  readonly failureCount: number;
  readonly blockedCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
}

export interface LoginAttemptRepository extends BaseRepository<LoginAttemptEntity, string> {
  findByIdentifier(identifier: string, limit?: number): Promise<readonly LoginAttemptEntity[]>;
  findByIp(ipAddress: string, limit?: number): Promise<readonly LoginAttemptEntity[]>;
  findRecent(identifier: string, windowSeconds: number, nowMs?: number): Promise<readonly LoginAttemptEntity[]>;
  countRecent(identifier: string, windowSeconds: number, nowMs?: number): Promise<number>;
  countRecentByIp(ipAddress: string, windowSeconds: number, nowMs?: number): Promise<number>;

  findPaginated(options: LoginAttemptListOptions): Promise<LoginAttemptPaginationResult>;
  getStats(identifier?: string, fromDate?: string, toDate?: string): Promise<LoginAttemptStats>;

  // Cron support
  purge(cutoffIso: string): Promise<number>;
  softDelete(id: string): Promise<void>;
}
