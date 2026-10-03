export type DeliveryStatus = 'scheduled' | 'attempted' | 'delivered' | 'failed';

export interface Delivery {
  readonly id: string;
  readonly shipmentId: string;
  readonly status: DeliveryStatus;
  readonly scheduledAt?: string;
  readonly deliveredAt?: string;
  readonly recipientName?: string;
  readonly signature?: string;
  readonly notes?: string;
}

export interface DeliveryListResponse {
  readonly deliveries: readonly Delivery[];
  readonly total: number;
}
