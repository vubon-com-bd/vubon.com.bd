/**
 * Verification Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VerificationEntity } from '../entities/verification.entity.js';
import type { VerificationIdVO } from '../value-objects/primitives/verification-id.vo.js';
import type { AuthIdVO } from '../value-objects/primitives/auth-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const VERIFICATION_REPOSITORY = Symbol('VERIFICATION_REPOSITORY');

export interface VerificationListFilter {
  readonly authId?: string;
  readonly userId?: string;
  readonly channel?: string;
  readonly purpose?: string;
  readonly status?: string;
  readonly target?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface VerificationListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'expiresAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VerificationListFilter;
}

export interface VerificationPaginationResult {
  readonly items: readonly VerificationEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VerificationStats {
  readonly total: number;
  readonly verifiedCount: number;
  readonly pendingCount: number;
  readonly byPurpose: Readonly<Record<string, number>>;
}

export interface VerificationRepository extends BaseRepository<VerificationEntity, string> {
  findByIdVO(id: VerificationIdVO): Promise<VerificationEntity | null>;
  findByAuthId(authId: AuthIdVO): Promise<readonly VerificationEntity[]>;
  findByUserId(userId: UserIdVO): Promise<readonly VerificationEntity[]>;
  findPendingByTarget(target: string, purpose: string): Promise<VerificationEntity | null>;
  findLatestByAuthId(authId: AuthIdVO): Promise<VerificationEntity | null>;

  findPaginated(options: VerificationListOptions): Promise<VerificationPaginationResult>;
  getStats(fromDate?: string, toDate?: string): Promise<VerificationStats>;

  // Cron support
  findExpired(nowMs?: number): Promise<readonly VerificationEntity[]>;
  findPendingOlderThan(minutes: number, nowMs?: number): Promise<readonly VerificationEntity[]>;

  purge(cutoffIso: string): Promise<number>;
  softDelete(id: string): Promise<void>;
}
