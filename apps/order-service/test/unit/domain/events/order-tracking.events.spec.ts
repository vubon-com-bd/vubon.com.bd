/**
 * Order Tracking Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_TRACKING_EVENT_TYPE,
  OrderTrackingUpdatedEvent,
  OrderTrackingStatusChangedEvent,
  OrderTrackingLocationUpdatedEvent,
} from '@domain/events/order-tracking.events.js';

describe('Order Tracking Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_TRACKING_EVENT_TYPE.UPDATED).toBe(
        'order.order-tracking.updated',
      );
      expect(ORDER_TRACKING_EVENT_TYPE.STATUS_CHANGED).toBe(
        'order.order-tracking.status_changed',
      );
      expect(ORDER_TRACKING_EVENT_TYPE.LOCATION_UPDATED).toBe(
        'order.order-tracking.location_updated',
      );
    });
  });

  describe('OrderTrackingUpdatedEvent', () => {
    it('creates updated event', () => {
      const event = new OrderTrackingUpdatedEvent({
        aggregateId: 'tracking-1',
        payload: {
          trackingId: 'tracking-1',
          orderId: 'order-1',
          status: 'in_transit',
          message: 'Package is in transit',
          occurredAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_TRACKING_EVENT_TYPE.UPDATED);
      expect(event.aggregateType).toBe('OrderTracking');
    });
  });

  describe('OrderTrackingStatusChangedEvent', () => {
    it('creates status changed event', () => {
      const event = new OrderTrackingStatusChangedEvent({
        aggregateId: 'tracking-1',
        payload: {
          trackingId: 'tracking-1',
          orderId: 'order-1',
          fromStatus: 'pending',
          toStatus: 'in_transit',
        },
      });
      expect(event.payload.toStatus).toBe('in_transit');
    });
  });

  describe('OrderTrackingLocationUpdatedEvent', () => {
    it('creates location updated event', () => {
      const event = new OrderTrackingLocationUpdatedEvent({
        aggregateId: 'tracking-1',
        payload: {
          trackingId: 'tracking-1',
          orderId: 'order-1',
          location: 'Dhaka Hub',
          lat: 23.81,
          lng: 90.41,
        },
      });
      expect(event.type).toBe(ORDER_TRACKING_EVENT_TYPE.LOCATION_UPDATED);
      expect(event.payload.location).toBe('Dhaka Hub');
    });
  });
});
