/**
 * Tracking Request DTOs
 * @module logistics-service/application/dtos/requests/tracking
 */
import type { TrackingStatusValue } from '@vubon/shared-types/logistics';

export interface StartTrackingRequestDTO {
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
}

export interface RecordTrackingEventRequestDTO {
  readonly trackingId: string;
  readonly event: string;
  readonly status?: TrackingStatusValue;
  readonly source: string;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly occurredAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface UpdateTrackingEtaRequestDTO {
  readonly trackingId: string;
  readonly newEta: string;
}

export interface TrackingListFilterDTO {
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly status?: TrackingStatusValue;
  readonly courierCode?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}
