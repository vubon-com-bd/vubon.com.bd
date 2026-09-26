import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';

/**
 * Event Store contract for Shipment aggregate.
 * Inherits append/appendBatch/loadStream/getVersion/exists.
 */
export type ShipmentEventStore = BaseEventStore;
