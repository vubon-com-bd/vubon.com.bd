/**
 * Broadcast Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import type { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';

// ─── DI Token ─────────────────────────────
export const BROADCAST_REPOSITORY = Symbol('BROADCAST_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface BroadcastListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly target?: string;
  readonly createdBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

// ─── List Options ─────────────────────────
export interface BroadcastListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'scheduledAt' | 'recipientCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: BroadcastListFilter;
}

// ─── Pagination Result ────────────────────
export interface BroadcastPaginationResult {
  readonly items: readonly BroadcastEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface BroadcastStats {
  readonly total: number;
  readonly totalRecipients: number;
  readonly totalSent: number;
  readonly totalFailed: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface BroadcastRepository extends BaseRepository<BroadcastEntity, string> {
  findByIdVO(id: BroadcastIdVO): Promise<BroadcastEntity | null>;
  findByStatus(status: string): Promise<readonly BroadcastEntity[]>;
  findByCreator(userId: string): Promise<readonly BroadcastEntity[]>;

  findPaginated(options: BroadcastListOptions): Promise<BroadcastPaginationResult>;

  /** Scheduled broadcasts due for execution */
  findDue(now: string): Promise<readonly BroadcastEntity[]>;
  /** Currently in-progress broadcasts */
  findInProgress(): Promise<readonly BroadcastEntity[]>;
  /** Draft broadcasts pending approval */
  findPendingApproval(): Promise<readonly BroadcastEntity[]>;

  countInProgress(): Promise<number>;
  getStats(fromDate?: string, toDate?: string): Promise<BroadcastStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeCompletedOlderThan(cutoff: string): Promise<number>;
}
