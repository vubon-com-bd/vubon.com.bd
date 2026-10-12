/**
 * Tracking Response DTOs
 * @module logistics-service/application/dtos/responses/tracking
 */
import type { TrackingStatusValue } from '@vubon/shared-types/logistics';

export interface TrackingEventResponseDTO {
  readonly id: string;
  readonly event: string;
  readonly status: TrackingStatusValue;
  readonly source: string;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly occurredAt: string;
  readonly receivedAt: string;
}

export interface TrackingResponseDTO {
  readonly id: string;
  readonly trackingNumber: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly status: TrackingStatusValue;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly eventCount: number;
  readonly events: readonly TrackingEventResponseDTO[];
  readonly publicAccess: boolean;
  readonly lastUpdatedAt: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface TrackingPublicResponseDTO {
  readonly trackingNumber: string;
  readonly status: TrackingStatusValue;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly TrackingEventResponseDTO[];
}

export interface TrackingListResponseDTO {
  readonly items: readonly TrackingResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
