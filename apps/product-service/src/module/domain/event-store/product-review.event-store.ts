/**
 * Product Review Event Store Interface
 * @module product-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ProductReviewEntity } from '../entities/product-review.entity.js';

export const REVIEW_EVENT_STORE = Symbol('REVIEW_EVENT_STORE');

export interface ReviewEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ProductReviewEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ProductReviewEntity | null>;

  loadLatest(limit: number): Promise<readonly ProductReviewEntity[]>;

  loadByProduct(productId: string): Promise<readonly ProductReviewEntity[]>;

  loadByUser(userId: string): Promise<readonly ProductReviewEntity[]>;

  /**
   * Moderation audit trail — approved/rejected/deleted events।
   */
  loadModerationHistory(reviewId: string): Promise<readonly unknown[]>;

  purge(cutoff: string): Promise<number>;

  statistics(): Promise<ReviewEventStoreStats>;

  countByAggregate(aggregateId: string): Promise<number>;

  listAggregateIds(): Promise<readonly string[]>;
}
