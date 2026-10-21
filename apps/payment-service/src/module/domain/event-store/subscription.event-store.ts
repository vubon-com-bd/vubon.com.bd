/**
 * Subscription Event Store Interface
 * @module payment-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { SubscriptionEntity } from '@domain/entities/subscription.entity';

export const SUBSCRIPTION_EVENT_STORE = Symbol('SUBSCRIPTION_EVENT_STORE');

export interface SubscriptionEventStore extends BaseEventStore {
  reconstitute(subscriptionId: string): Promise<SubscriptionEntity | null>;
  loadLatest(limit: number): Promise<readonly SubscriptionEntity[]>;
  loadByUser(userId: string): Promise<readonly SubscriptionEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<{
    readonly totalEvents: number;
    readonly oldestOccurredAt: string | null;
    readonly newestOccurredAt: string | null;
  }>;
}
