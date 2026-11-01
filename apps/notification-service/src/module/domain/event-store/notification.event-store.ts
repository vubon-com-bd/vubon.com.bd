/**
 * NotificationEventStore
 * @module notification-service/domain/event-store
 *
 * Event sourcing for Notification aggregate।
 * Rebuild state from event stream — no repo.read।
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { NotificationEntity } from '@domain/entities/notification.entity.js';

// ─── DI Token ─────────────────────────────
export const NOTIFICATION_EVENT_STORE = Symbol('NOTIFICATION_EVENT_STORE');

// ─── Statistics ───────────────────────────
export interface NotificationEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byType: Readonly<Record<string, number>>;
  readonly aggregateCount: number;
}

// ─── Main Interface ───────────────────────
export interface NotificationEventStore extends BaseEventStore {
  /** Rebuild aggregate from event stream */
  reconstitute(aggregateId: string): Promise<NotificationEntity | null>;

  /** Load N most recent aggregates (by first event time) */
  loadLatest(limit: number): Promise<readonly NotificationEntity[]>;

  /** Load all aggregates for a user */
  loadByUser(userId: string): Promise<readonly NotificationEntity[]>;

  /** Load all aggregates with a specific event type */
  loadByEventType(eventType: string, limit?: number): Promise<readonly NotificationEntity[]>;

  /** Load aggregate at specific version (time-travel) */
  loadAtVersion(aggregateId: string, version: number): Promise<NotificationEntity | null>;

  /** Delete events older than cutoff */
  purge(cutoff: string): Promise<number>;

  /** Event type statistics */
  statistics(): Promise<NotificationEventStoreStats>;
}
