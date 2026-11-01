import type { TrackingStatusValue } from '@domain/primitives/tracking-status.vo';
import type { TrackingSourceValue } from '@domain/primitives/tracking-source.vo';

export interface TrackingResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly status: TrackingStatusValue;
  readonly source: TrackingSourceValue;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly expiresAt?: string;
  readonly eventCount: number;
  readonly lastUpdatedAt: string;
  readonly completedAt?: string;
  readonly failedAt?: string;
  readonly expiredAt?: string;
  readonly failureReason?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
