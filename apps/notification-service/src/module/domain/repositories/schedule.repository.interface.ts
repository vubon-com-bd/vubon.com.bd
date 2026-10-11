/**
 * Schedule Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ScheduleEntity } from '../entities/schedule.entity.js';
import { ScheduleIdVO } from '../value-objects/primitives/schedule-id.vo.js';
import { ScheduleStatusVO } from '../value-objects/primitives/schedule-status.vo.js';
import { ScheduleTypeVO } from '../value-objects/primitives/schedule-type.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const SCHEDULE_REPOSITORY = Symbol('SCHEDULE_REPOSITORY');

export interface ScheduleListFilter {
  readonly userId?: string;
  readonly type?: string;
  readonly status?: string;
  readonly templateId?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface ScheduleListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'nextOccurrenceAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ScheduleListFilter;
}

export interface SchedulePaginationResult {
  readonly items: readonly ScheduleEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ScheduleRepository extends BaseRepository<ScheduleEntity, string> {
  findByIdVO(id: ScheduleIdVO): Promise<ScheduleEntity | null>;
  findByUserId(userId: UserIdVO): Promise<readonly ScheduleEntity[]>;
  findByStatus(status: ScheduleStatusVO): Promise<readonly ScheduleEntity[]>;
  findByType(type: ScheduleTypeVO): Promise<readonly ScheduleEntity[]>;
  findPaginated(options: ScheduleListOptions): Promise<SchedulePaginationResult>;
  /** Active schedules whose next occurrence is due. */
  findDue(at?: Date): Promise<readonly ScheduleEntity[]>;
  /** Recurring schedules that should trigger within a window (for pre-loading). */
  findUpcoming(withinMinutes: number): Promise<readonly ScheduleEntity[]>;
}
