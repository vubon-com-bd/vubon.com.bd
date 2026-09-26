/**
 * Tracking Types
 * @module shared-types/logistics
 *
 * Values আসে shared-constants/logistics/tracking.constants থেকে।
 */

import type {
  TRACKING_EVENT,
  TRACKING_STATUS,
  TRACKING_SOURCE,
} from '@vubon/shared-constants/logistics';
import type { ShipmentId, OrderId } from '../common/primitives';

export type TrackingEventValue = (typeof TRACKING_EVENT)[keyof typeof TRACKING_EVENT];

export type TrackingStatusValue = (typeof TRACKING_STATUS)[keyof typeof TRACKING_STATUS];

export type TrackingSourceValue = (typeof TRACKING_SOURCE)[keyof typeof TRACKING_SOURCE];

export interface TrackingEvent {
  readonly id: string;
  readonly shipmentId?: ShipmentId;
  readonly orderId?: OrderId;
  readonly event: TrackingEventValue;
  readonly status: TrackingStatusValue;
  readonly source: TrackingSourceValue;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly occurredAt: string;
  readonly receivedAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface TrackingInfo {
  readonly trackingNumber: string;
  readonly courierCode?: string;
  readonly status: TrackingStatusValue;
  readonly currentEvent?: TrackingEventValue;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly TrackingEvent[];
  readonly lastUpdatedAt: string;
}

export interface TrackingPublic {
  readonly trackingNumber: string;
  readonly status: TrackingStatusValue;
  readonly currentEvent?: TrackingEventValue;
  readonly events: readonly TrackingEvent[];
}
