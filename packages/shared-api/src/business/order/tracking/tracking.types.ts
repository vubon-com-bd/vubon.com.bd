export type TrackingStatus =
  'created' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';

export interface TrackingEvent {
  readonly status: TrackingStatus;
  readonly location?: string;
  readonly message?: string;
  readonly occurredAt: string;
}

export interface OrderTracking {
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly courierName?: string;
  readonly currentStatus: TrackingStatus;
  readonly events: readonly TrackingEvent[];
}
