import type { TrackingSourceValue } from '@domain/primitives/tracking-source.vo';

export interface CreateTrackingRequestDTO {
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly source: TrackingSourceValue;
  readonly estimatedDeliveryAt?: string;
  readonly expiresAt?: string;
}
