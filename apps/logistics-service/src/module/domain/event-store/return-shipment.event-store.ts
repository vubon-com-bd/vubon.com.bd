/**
 * ReturnShipment Event Store Interface
 * @module logistics-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { ReturnShipmentEntity } from '../entities/return-shipment.entity.js';

export const RETURN_SHIPMENT_EVENT_STORE = Symbol('RETURN_SHIPMENT_EVENT_STORE');

export interface ReturnShipmentEventStoreStatistics {
  readonly totalEvents: number;
  readonly totalAggregates: number;
  readonly oldestOccurredAt: string | null;
  readonly newestOccurredAt: string | null;
  readonly byEventType: Readonly<Record<string, number>>;
}

export interface ReturnShipmentEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<ReturnShipmentEntity | null>;
  purge(cutoff: string): Promise<number>;
  statistics(): Promise<ReturnShipmentEventStoreStatistics>;
}
