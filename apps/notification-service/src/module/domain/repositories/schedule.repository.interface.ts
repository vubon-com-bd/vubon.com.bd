/**
 * Schedule Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import type { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';

// ─── DI Token ─────────────────────────────
export const SCHEDULE_REPOSITORY = Symbol('SCHEDULE_REPOSITORY');

// ─── Filter ───────────────────────────────
export interface ScheduleListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly frequency?: string;
  readonly createdBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly search?: string;
}

// ─── List Options ─────────────────────────
export interface ScheduleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'nextRunAt' | 'runCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ScheduleListFilter;
}

// ─── Pagination Result ────────────────────
export interface SchedulePaginationResult {
  readonly items: readonly ScheduleEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

// ─── Stats ────────────────────────────────
export interface ScheduleStats {
  readonly total: number;
  readonly activeCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byFrequency: Readonly<Record<string, number>>;
}

// ─── Main Interface ───────────────────────
export interface ScheduleRepository extends BaseRepository<ScheduleEntity, string> {
  findByIdVO(id: ScheduleIdVO): Promise<ScheduleEntity | null>;
  findByStatus(status: string): Promise<readonly ScheduleEntity[]>;
  findByCreator(userId: string): Promise<readonly ScheduleEntity[]>;

  findPaginated(options: ScheduleListOptions): Promise<SchedulePaginationResult>;

  /** Cron-friendly: schedules whose nextRunAt has passed */
  findDue(now: string): Promise<readonly ScheduleEntity[]>;
  /** Schedules active with nextRunAt before cutoff */
  findPendingRuns(cutoff: string): Promise<readonly ScheduleEntity[]>;

  countActive(): Promise<number>;
  getStats(): Promise<ScheduleStats>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
  purgeCompletedOlderThan(cutoff: string): Promise<number>;
}
