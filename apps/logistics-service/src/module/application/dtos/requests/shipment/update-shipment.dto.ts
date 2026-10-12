/**
 * UpdateShipmentRequestDto — input for UpdateShipmentCommand
 * @module logistics-service/application/dtos/requests/shipment
 */
import type { ShipmentPriorityValue } from '@vubon/shared-types/logistics';

export interface UpdateShipmentRequestDto {
  readonly shipmentId: string;
  readonly priority?: ShipmentPriorityValue;
  readonly notes?: string;
}
