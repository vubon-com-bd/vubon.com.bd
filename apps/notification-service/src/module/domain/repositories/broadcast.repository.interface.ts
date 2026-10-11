/**
 * Broadcast Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { BroadcastEntity } from '../entities/broadcast.entity.js';
import { BroadcastIdVO } from '../value-objects/primitives/broadcast-id.vo.js';
import { BroadcastStatusVO } from '../value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTypeVO } from '../value-objects/primitives/broadcast-type.vo.js';

export const BROADCAST_REPOSITORY = Symbol('BROADCAST_REPOSITORY');

export interface BroadcastListFilter {
  readonly type?: string;
  readonly status?: string;
  readonly templateId?: string;
  readonly createdBy?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface BroadcastListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'scheduledAt' | 'completedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: BroadcastListFilter;
}

export interface BroadcastPaginationResult {
  readonly items: readonly BroadcastEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface BroadcastRepository extends BaseRepository<BroadcastEntity, string> {
  findByIdVO(id: BroadcastIdVO): Promise<BroadcastEntity | null>;
  findByStatus(status: BroadcastStatusVO): Promise<readonly BroadcastEntity[]>;
  findByType(type: BroadcastTypeVO): Promise<readonly BroadcastEntity[]>;
  findPaginated(options: BroadcastListOptions): Promise<BroadcastPaginationResult>;
  /** Scheduled broadcasts that should start now. */
  findDueScheduled(at?: Date): Promise<readonly BroadcastEntity[]>;
  /** Sending broadcasts that have stalled. */
  findStaleSending(olderThanMinutes: number): Promise<readonly BroadcastEntity[]>;
}
