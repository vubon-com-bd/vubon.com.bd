/**
 * Order Fulfillment Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_FULFILLMENT_EVENT_TYPE,
  FulfillmentStartedEvent,
  FulfillmentStatusChangedEvent,
  FulfillmentCompletedEvent,
  FulfillmentCancelledEvent,
} from '@domain/events/order-fulfillment.events.js';

describe('Order Fulfillment Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_FULFILLMENT_EVENT_TYPE.STARTED).toBe(
        'order-service.order-fulfillment.started',
      );
      expect(ORDER_FULFILLMENT_EVENT_TYPE.FULFILLED).toBe(
        'order-service.order-fulfillment.fulfilled',
      );
    });
  });

  describe('FulfillmentStartedEvent', () => {
    it('creates started event', () => {
      const event = new FulfillmentStartedEvent({
        aggregateId: 'fulfillment-1',
        payload: {
          fulfillmentId: 'fulfillment-1',
          orderId: 'order-1',
          itemIds: ['item-1'],
          vendorId: 'vendor-1',
          warehouseId: 'wh-1',
        },
      });
      expect(event.type).toBe(ORDER_FULFILLMENT_EVENT_TYPE.STARTED);
      expect(event.aggregateType).toBe('OrderFulfillment');
    });
  });

  describe('FulfillmentStatusChangedEvent', () => {
    it('creates status change event', () => {
      const event = new FulfillmentStatusChangedEvent({
        aggregateId: 'fulfillment-1',
        payload: {
          fulfillmentId: 'fulfillment-1',
          orderId: 'order-1',
          fromStatus: 'unfulfilled',
          toStatus: 'pending',
        },
      });
      expect(event.payload.toStatus).toBe('pending');
    });
  });

  describe('FulfillmentCompletedEvent', () => {
    it('creates completed event', () => {
      const event = new FulfillmentCompletedEvent({
        aggregateId: 'fulfillment-1',
        payload: {
          fulfillmentId: 'fulfillment-1',
          orderId: 'order-1',
          fulfilledAt: '2024-01-01T10:00:00Z',
          itemIds: ['item-1', 'item-2'],
          trackingNumber: 'TRK-ABCD1234',
        },
      });
      expect(event.type).toBe(ORDER_FULFILLMENT_EVENT_TYPE.FULFILLED);
      expect(event.payload.trackingNumber).toBe('TRK-ABCD1234');
    });
  });

  describe('FulfillmentCancelledEvent', () => {
    it('creates cancelled event', () => {
      const event = new FulfillmentCancelledEvent({
        aggregateId: 'fulfillment-1',
        payload: {
          fulfillmentId: 'fulfillment-1',
          orderId: 'order-1',
          reason: 'out of stock',
        },
      });
      expect(event.type).toBe(ORDER_FULFILLMENT_EVENT_TYPE.CANCELLED);
    });
  });
});
