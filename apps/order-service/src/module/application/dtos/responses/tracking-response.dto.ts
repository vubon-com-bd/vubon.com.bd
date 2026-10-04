export interface TrackingResponseDTO {
  readonly id: string;
  readonly orderId: string;
  readonly event: string;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly trackingNumber?: string;
  readonly createdBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
  readonly createdAt: string;
}

export interface TrackingSummaryResponseDTO {
  readonly orderId: string;
  readonly currentEvent: string;
  readonly currentMessage: string;
  readonly lastUpdatedAt: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly TrackingResponseDTO[];
}
