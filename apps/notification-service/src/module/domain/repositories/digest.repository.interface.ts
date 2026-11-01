/**
 * Digest Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { DigestEntity } from '@domain/entities/digest.entity.js';
import type { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import type { UserIdVO } from '@domain/primitives/user-id.vo.js';

// ─── DI Token ─────────────────────────────
export const DIGEST_REPOSITORY = Symbol('DIGEST_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface DigestListFilter {
  readonly userId?: string;
  readonly status?: string;
  readonly frequency?: string;
  readonly type?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

// ─── List Options ─────────────────────────
export interface DigestListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'sentAt' | 'itemCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: DigestListFilter;
}

// ─── Pagination Result ────────────────────
export interface DigestPaginationResult {
  readonly items: readonly DigestEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface DigestStats {
  readonly total: number;
  readonly totalItems: number;
  readonly averageItemsPerDigest: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byFrequency: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface DigestRepository extends BaseRepository<DigestEntity, string> {
  findByIdVO(id: DigestIdVO): Promise<DigestEntity | null>;
  findByUser(userId: UserIdVO | string): Promise<readonly DigestEntity[]>;
  findByStatus(status: string): Promise<readonly DigestEntity[]>;
  findByFrequency(frequency: string): Promise<readonly DigestEntity[]>;

  findPaginated(options: DigestListOptions): Promise<DigestPaginationResult>;

  findPending(): Promise<readonly DigestEntity[]>;
  findGenerating(): Promise<readonly DigestEntity[]>;
  findReadyToSend(): Promise<readonly DigestEntity[]>;

  findByUserAndPeriod(userId: string, periodStart: string, periodEnd: string): Promise<DigestEntity | null>;
  findLatestForUser(userId: string): Promise<DigestEntity | null>;

  countPending(): Promise<number>;
  getStats(userId?: string, fromDate?: string, toDate?: string): Promise<DigestStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeOlderThan(cutoff: string): Promise<number>;
}
