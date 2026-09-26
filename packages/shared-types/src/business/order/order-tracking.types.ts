/**
 * Order Tracking Types
 * @module shared-types/business/order
 *
 * Values আসে shared-constants/business/order/order-tracking.constants থেকে।
 */

import type { ORDER_TRACKING_EVENT } from '@vubon/shared-constants/business';
import type { OrderId } from '../../common/primitives';
import type { LatLng } from '../../common/geo';

export type OrderTrackingEventValue =
  (typeof ORDER_TRACKING_EVENT)[keyof typeof ORDER_TRACKING_EVENT];

export interface OrderTrackingEntry {
  readonly id: string;
  readonly orderId: OrderId;
  readonly event: OrderTrackingEventValue;
  readonly message: string;
  readonly location?: string;
  readonly coordinates?: LatLng;
  readonly occurredAt: string;
  readonly createdBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface OrderTrackingPublic {
  readonly event: OrderTrackingEventValue;
  readonly message: string;
  readonly occurredAt: string;
}

export interface OrderTrackingSummary {
  readonly orderId: OrderId;
  readonly currentEvent: OrderTrackingEventValue;
  readonly currentMessage: string;
  readonly lastUpdatedAt: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly OrderTrackingPublic[];
}
