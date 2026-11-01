/**
 * ShipmentTimelineResponseDTO — Status history
 * @module logistics-service/application/dtos/responses/shipment
 */
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';

export interface ShipmentTimelineEntryDTO {
  readonly status: ShipmentStatusValue;
  readonly occurredAt: string;
  readonly actorId?: string;
  readonly reason?: string;
  readonly notes?: string;
}

export interface ShipmentTimelineResponseDTO {
  readonly shipmentId: string;
  readonly currentStatus: ShipmentStatusValue;
  readonly entries: readonly ShipmentTimelineEntryDTO[];
}
