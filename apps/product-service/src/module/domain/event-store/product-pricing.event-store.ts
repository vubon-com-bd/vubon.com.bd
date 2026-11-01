/**
 * Product Pricing Event Store Interface
 * @module product-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ProductPricingEntity } from '../entities/product-pricing.entity.js';

export const PRICING_EVENT_STORE = Symbol('PRICING_EVENT_STORE');

export interface PricingEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ProductPricingEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ProductPricingEntity | null>;

  loadLatest(limit: number): Promise<readonly ProductPricingEntity[]>;

  loadByProduct(productId: string): Promise<ProductPricingEntity | null>;

  /**
   * Price change history — analytics & audit এর জন্য।
   */
  loadPriceHistory(productId: string): Promise<readonly unknown[]>;

  purge(cutoff: string): Promise<number>;

  statistics(): Promise<PricingEventStoreStats>;

  countByAggregate(aggregateId: string): Promise<number>;

  listAggregateIds(): Promise<readonly string[]>;
}
