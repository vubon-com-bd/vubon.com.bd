/**
 * Event Repository Interface
 * @module analytics-service/domain/repositories
 *
 * Analytics event-এর persistence contract।
 * Business Rule:
 * - Time-range queries essential
 * - Source/name filtered queries
 * - Session-based lookup
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { EventEntity } from '../entities/event.entity.js';
import type { EventIdVO } from '../value-objects/primitives/event-id.vo.js';
import type { EventNameVO } from '../value-objects/primitives/event-name.vo.js';
import type { EventSourceVO } from '../value-objects/primitives/event-source.vo.js';
import type { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import type { TimeRangeVO } from '../value-objects/composites/time-range.vo.js';

export interface EventQueryFilters {
  readonly name?: EventNameVO;
  readonly source?: EventSourceVO;
  readonly sessionId?: SessionIdVO;
  readonly userId?: UserIdVO;
  readonly range?: TimeRangeVO;
  readonly status?: 'received' | 'processed' | 'failed' | 'archived';
}

export interface EventRepository extends BaseRepository<EventEntity, string> {
  /** Find by EventIdVO */
  findByEventId(id: EventIdVO): Promise<EventEntity | null>;

  /** Find events matching filters */
  findByFilters(filters: EventQueryFilters): Promise<readonly EventEntity[]>;

  /** Count events matching filters */
  countByFilters(filters: EventQueryFilters): Promise<number>;

  /** Find events in a session, ordered by timestamp */
  findBySession(sessionId: SessionIdVO): Promise<readonly EventEntity[]>;

  /** Find events by user in time range */
  findByUser(userId: UserIdVO, range: TimeRangeVO): Promise<readonly EventEntity[]>;

  /** Get last N events for a user */
  findRecentByUser(userId: UserIdVO, limit: number): Promise<readonly EventEntity[]>;

  /** Find unprocessed (received) events */
  findUnprocessed(limit: number): Promise<readonly EventEntity[]>;

  /** Find failed events for retry */
  findFailed(limit: number): Promise<readonly EventEntity[]>;

  /** Bulk insert events (high-throughput ingestion) */
  bulkInsert(events: readonly EventEntity[]): Promise<number>;

  /** Delete events older than cutoff (retention policy) */
  deleteOlderThan(cutoff: string): Promise<number>;

  /** Check if event already exists (idempotency) */
  existsByEventId(id: EventIdVO): Promise<boolean>;
}
