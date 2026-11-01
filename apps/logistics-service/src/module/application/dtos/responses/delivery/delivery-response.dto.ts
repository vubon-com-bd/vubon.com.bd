/**
 * DeliveryResponseDTO — Full admin
 */
import type { DeliveryStatusValue } from '@domain/primitives/delivery-status.vo';
import type { DeliveryTypeValue } from '@domain/primitives/delivery-type.vo';

export interface DeliveryResponseDTO {
  readonly id: string;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly status: DeliveryStatusValue;
  readonly type: DeliveryTypeValue;
  readonly window?: { startAt: string; endAt: string };
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly deliveryAddress: string;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly inTransitAt?: string;
  readonly outForDeliveryAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly refusedAt?: string;
  readonly rescheduledAt?: string;
  readonly attemptCount: number;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly refusedReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly createdAt: string;
  readonly updatedAt: string;
}
