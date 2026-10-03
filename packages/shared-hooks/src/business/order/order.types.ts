export type OrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';

export interface Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly status: OrderStatus;
  readonly total: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface TrackingEvent {
  readonly status: string;
  readonly location?: string;
  readonly message?: string;
  readonly occurredAt: string;
}

export interface OrderTracking {
  readonly orderId: string;
  readonly trackingNumber?: string;
  readonly currentStatus: string;
  readonly events: readonly TrackingEvent[];
}
