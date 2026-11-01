/**
 * ShipmentPublicResponseDTO — Customer-safe view
 * @module logistics-service/application/dtos/responses/shipment
 *
 * No internal IDs, no vendor/warehouse refs, no monetary breakdown.
 */
import type { ShipmentStatusValue } from '@domain/primitives/shipment-status.vo';
import type { ShipmentTypeValue } from '@domain/primitives/shipment-type.vo';

export interface ShipmentPublicResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly itemCount: number;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
  readonly createdAt: string;
}
