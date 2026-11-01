import type { TrackingStatusValue } from '@domain/primitives/tracking-status.vo';

export interface TrackingPublicResponseDTO {
  readonly trackingNumber: string;
  readonly status: TrackingStatusValue;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
  readonly lastUpdatedAt: string;
}
