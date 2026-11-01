/**
 * Warehouse Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { WarehouseEntity } from '../entities/warehouse.entity.js';

export const WAREHOUSE_EVENT_STORE = Symbol('WAREHOUSE_EVENT_STORE');

export interface WarehouseEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface WarehouseEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<WarehouseEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<WarehouseEventStoreStatistics>;
}
