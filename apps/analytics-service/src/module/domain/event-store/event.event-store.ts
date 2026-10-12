/**
 * Event Event Store Interface
 * @module analytics-service/domain/event-store
 *
 * Event aggregate-এর event sourcing contract।
 * Business Rule:
 * - Append-only (immutable log)
 * - Ordered by version
 * - Stream per aggregate
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base';
import type { EventEntity } from '../entities/event.entity.js';

export interface EventEventStore extends BaseEventStore {
  /** Rebuild EventEntity from event stream */
  reconstitute(aggregateId: string): Promise<EventEntity | null>;

  /** Load events for a specific session (streaming) */
  loadSessionStream(sessionId: string): Promise<readonly EventEntity[]>;

  /** Get latest N events (real-time view) */
  loadLatest(limit: number): Promise<readonly EventEntity[]>;

  /** Purge events before cutoff (retention policy) */
  purge(cutoff: string): Promise<number>;

  /** Stream statistics */
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
