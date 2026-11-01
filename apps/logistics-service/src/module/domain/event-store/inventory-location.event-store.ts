/**
 * InventoryLocation Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { InventoryLocationEntity } from '../entities/inventory-location.entity.js';

export const INVENTORY_LOCATION_EVENT_STORE = Symbol('INVENTORY_LOCATION_EVENT_STORE');

export interface InventoryLocationEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface InventoryLocationEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<InventoryLocationEntity | null>;
  loadByWarehouseId(warehouseId: string): Promise<readonly InventoryLocationEntity[]>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<InventoryLocationEventStoreStatistics>;
}
