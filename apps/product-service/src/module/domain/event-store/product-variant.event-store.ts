/**
 * Product Variant Event Store Interface
 * @module product-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ProductVariantEntity } from '../entities/product-variant.entity.js';

export const VARIANT_EVENT_STORE = Symbol('VARIANT_EVENT_STORE');

export interface VariantEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ProductVariantEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ProductVariantEntity | null>;

  loadLatest(limit: number): Promise<readonly ProductVariantEntity[]>;

  loadByProduct(productId: string): Promise<readonly ProductVariantEntity[]>;

  purge(cutoff: string): Promise<number>;

  statistics(): Promise<VariantEventStoreStats>;

  countByAggregate(aggregateId: string): Promise<number>;

  listAggregateIds(): Promise<readonly string[]>;
}
