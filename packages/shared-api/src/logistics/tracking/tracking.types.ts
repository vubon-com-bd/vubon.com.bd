export interface LogisticsTrackingEvent {
  readonly status: string;
  readonly location?: string;
  readonly message?: string;
  readonly occurredAt: string;
}

export interface TrackingInfo {
  readonly trackingId: string;
  readonly currentStatus: string;
  readonly courierName?: string;
  readonly estimatedDelivery?: string;
  readonly events: readonly LogisticsTrackingEvent[];
}
