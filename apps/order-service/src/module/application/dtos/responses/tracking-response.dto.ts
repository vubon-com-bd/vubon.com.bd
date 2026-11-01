/**
 * Tracking Response DTOs
 * @module order-service/application/dtos/responses
 */

export interface TrackingEntryResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly status: string;
  readonly trackingNumber: string;
  readonly message: string;
  readonly location?: string;
  readonly carrier?: string;
  readonly occurredAt: string;
}

export interface TrackingSummaryResponseDTO {
  readonly orderId: string;
  readonly trackingNumber: string;
  readonly currentStatus: string;
  readonly currentMessage: string;
  readonly lastUpdatedAt: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly TrackingEntryResponseDTO[];
}

export interface TrackingListResponseDTO {
  readonly items: readonly TrackingEntryResponseDTO[];
  readonly total: number;
}
