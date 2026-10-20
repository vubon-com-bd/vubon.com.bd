/**
 * Delivery Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  DELIVERY_EVENT_TYPE,
  DeliveryScheduledEvent,
  DeliveryRescheduledEvent,
  DeliveryStatusChangedEvent,
  DeliveryDeliveredEvent,
  DeliveryFailedEvent,
} from '@domain/events/delivery.events.js';

describe('Delivery Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(DELIVERY_EVENT_TYPE.SCHEDULED).toBe('order-service.delivery.scheduled');
      expect(DELIVERY_EVENT_TYPE.DELIVERED).toBe('order-service.delivery.delivered');
      expect(DELIVERY_EVENT_TYPE.FAILED).toBe('order-service.delivery.failed');
    });
  });

  describe('DeliveryScheduledEvent', () => {
    it('creates scheduled event', () => {
      const event = new DeliveryScheduledEvent({
        aggregateId: 'delivery-1',
        payload: {
          deliveryId: 'delivery-1',
          orderId: 'order-1',
          methodId: 'method-1',
          type: 'standard',
          estimatedAt: '2024-01-05',
        },
      });
      expect(event.type).toBe(DELIVERY_EVENT_TYPE.SCHEDULED);
      expect(event.aggregateType).toBe('Delivery');
    });
  });

  describe('DeliveryRescheduledEvent', () => {
    it('creates rescheduled event', () => {
      const event = new DeliveryRescheduledEvent({
        aggregateId: 'delivery-1',
        payload: {
          deliveryId: 'delivery-1',
          orderId: 'order-1',
          reason: 'customer request',
          newEstimatedAt: '2024-01-10',
        },
      });
      expect(event.type).toBe(DELIVERY_EVENT_TYPE.RESCHEDULED);
    });
  });

  describe('DeliveryStatusChangedEvent', () => {
    it('creates status change event', () => {
      const event = new DeliveryStatusChangedEvent({
        aggregateId: 'delivery-1',
        payload: {
          deliveryId: 'delivery-1',
          orderId: 'order-1',
          fromStatus: 'scheduled',
          toStatus: 'picked_up',
        },
      });
      expect(event.payload.fromStatus).toBe('scheduled');
    });
  });

  describe('DeliveryDeliveredEvent', () => {
    it('creates delivered event', () => {
      const event = new DeliveryDeliveredEvent({
        aggregateId: 'delivery-1',
        payload: {
          deliveryId: 'delivery-1',
          orderId: 'order-1',
          deliveredAt: '2024-01-01T10:00:00Z',
          receivedBy: 'customer',
          signature: 'sig-1',
        },
      });
      expect(event.type).toBe(DELIVERY_EVENT_TYPE.DELIVERED);
    });
  });

  describe('DeliveryFailedEvent', () => {
    it('creates failed event', () => {
      const event = new DeliveryFailedEvent({
        aggregateId: 'delivery-1',
        payload: {
          deliveryId: 'delivery-1',
          orderId: 'order-1',
          reason: 'customer unavailable',
          attempts: 1,
        },
      });
      expect(event.type).toBe(DELIVERY_EVENT_TYPE.FAILED);
      expect(event.payload.attempts).toBe(1);
    });
  });
});
