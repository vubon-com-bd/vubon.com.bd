import type { DeliveryStatusValue } from '@domain/primitives/delivery-status.vo';

export interface DeliveryPublicResponseDTO {
  readonly id: string;
  readonly status: DeliveryStatusValue;
  readonly recipientName?: string;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
  readonly attemptCount: number;
  readonly createdAt: string;
}
