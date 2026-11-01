/**
 * CreateDeliveryRequestDTO
 */
import type { DeliveryTypeValue } from '@domain/primitives/delivery-type.vo';

export interface DeliveryWindowDTO {
  readonly startAt: string;
  readonly endAt: string;
}

export interface CreateDeliveryRequestDTO {
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly type: DeliveryTypeValue;
  readonly deliveryAddress: string;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly window?: DeliveryWindowDTO;
  readonly scheduledAt?: string;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly notes?: string;
}
