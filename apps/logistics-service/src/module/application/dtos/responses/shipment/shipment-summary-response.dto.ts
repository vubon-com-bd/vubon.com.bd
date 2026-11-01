/**
 * ShipmentSummaryResponseDTO — List view
 * @module logistics-service/application/dtos/responses/shipment
 */
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';
import type { ShipmentTypeValue } from '@domain/primitives/shipment-type.vo';
import type { ShipmentPriorityValue } from '@domain/primitives/shipment-priority.vo';

export interface ShipmentSummaryResponseDTO {
  readonly id: string;
  readonly shipmentNumber: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly priority: ShipmentPriorityValue;
  readonly itemCount: number;
  readonly createdAt: string;
}
