/**
 * ShipmentPublicResponseDto — public tracking view (no internal fields)
 * @module logistics-service/application/dtos/responses
 */
import type {
  ShipmentStatusValue,
  ShipmentTypeValue,
} from '@vubon/shared-types/logistics';

export interface ShipmentPublicResponseDto {
  readonly id: string;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusValue;
  readonly type: ShipmentTypeValue;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
}
