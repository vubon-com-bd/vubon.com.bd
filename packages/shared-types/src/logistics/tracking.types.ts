import { BaseEntity } from '../common/base.types';
import { TRACKING } from '@vubon/shared-constants/src/logistics/tracking.constants';
import { Shipment } from './shipment.types';

export interface TrackingEvent {
  eventId: string;
  status: string;
  location: string;
  description: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
}

export interface Tracking extends BaseEntity {
  trackingId: string;
  shipmentId: string;
  shipment: Shipment;
  trackingNumber: string;
  status: keyof typeof TRACKING.STATUS | string;
  carrier: string;
  events: TrackingEvent[];
  isActive: boolean;
  isDelivered: boolean;
  isExpired: boolean;
  expiresAt: Date;
  metadata: Record<string, unknown>;
}
