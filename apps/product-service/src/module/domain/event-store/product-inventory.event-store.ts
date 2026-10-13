/**
 * Product Inventory Event Store Interface
 * @module product-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ProductInventoryEntity } from '../entities/product-inventory.entity.js';

export const INVENTORY_EVENT_STORE = Symbol('INVENTORY_EVENT_STORE');

export interface InventoryEventStoreStats {
  readonly totalEvents: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly distinctAggregates: number;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ProductInventoryEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ProductInventoryEntity | null>;

  loadLatest(limit: number): Promise<readonly ProductInventoryEntity[]>;

  loadByProduct(productId: string): Promise<ProductInventoryEntity | null>;

  /**
   * শুধু inventory adjustment/restock/reserve events।
   */
  loadAdjustmentHistory(inventoryId: string): Promise<readonly unknown[]>;

  purge(cutoff: string): Promise<number>;

  statistics(): Promise<InventoryEventStoreStats>;

  countByAggregate(aggregateId: string): Promise<number>;

  listAggregateIds(): Promise<readonly string[]>;
}
