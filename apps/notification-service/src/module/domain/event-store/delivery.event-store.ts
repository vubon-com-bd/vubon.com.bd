/**
 * DeliveryEventStore
 * @module notification-service/domain/event-store
 *
 * Event sourcing for delivery attempts lifecycle।
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { NotificationDeliveryEntity } from '@domain/entities/notification-delivery.entity.js';
import type { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';

// ─── DI Token ─────────────────────────────
export const DELIVERY_EVENT_STORE = Symbol('DELIVERY_EVENT_STORE');

// ─── Statistics ───────────────────────────
export interface DeliveryEventStoreStats {
  readonly totalEvents: number;
  readonly totalDeliveries: number;
  readonly totalAttempts: number;
  readonly successRate: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
}

// ─── Main Interface ───────────────────────
export interface DeliveryEventStore extends BaseEventStore {
  reconstituteDelivery(notificationId: string): Promise<NotificationDeliveryEntity | null>;
  reconstituteAttempts(notificationId: string): Promise<readonly NotificationAttemptEntity[]>;

  loadByStatus(status: string, limit?: number): Promise<readonly NotificationDeliveryEntity[]>;
  loadFailedSince(cutoff: string): Promise<readonly NotificationDeliveryEntity[]>;

  purge(cutoff: string): Promise<number>;
  statistics(): Promise<DeliveryEventStoreStats>;
}
