/**
 * Order Return Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_RETURN_EVENT_TYPE,
  OrderReturnRequestedEvent,
  OrderReturnStatusChangedEvent,
  OrderReturnRefundedEvent,
} from '@domain/events/order-return.events.js';

describe('Order Return Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_RETURN_EVENT_TYPE.REQUESTED).toBe('order.order-return.requested');
      expect(ORDER_RETURN_EVENT_TYPE.REFUNDED).toBe('order.order-return.refunded');
    });
  });

  describe('OrderReturnRequestedEvent', () => {
    it('creates requested event', () => {
      const event = new OrderReturnRequestedEvent({
        aggregateId: 'return-1',
        payload: {
          returnId: 'return-1',
          orderId: 'order-1',
          customerId: 'customer-1',
          reason: 'defective',
          itemIds: ['item-1', 'item-2'],
          requestedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_RETURN_EVENT_TYPE.REQUESTED);
      expect(event.aggregateType).toBe('OrderReturn');
      expect(event.payload.itemIds.length).toBe(2);
    });
  });

  describe('OrderReturnStatusChangedEvent', () => {
    it('creates status changed event', () => {
      const event = new OrderReturnStatusChangedEvent({
        aggregateId: 'return-1',
        payload: {
          returnId: 'return-1',
          orderId: 'order-1',
          fromStatus: 'requested',
          toStatus: 'approved',
        },
      });
      expect(event.payload.toStatus).toBe('approved');
    });
  });

  describe('OrderReturnRefundedEvent', () => {
    it('creates refunded event', () => {
      const event = new OrderReturnRefundedEvent({
        aggregateId: 'return-1',
        payload: {
          returnId: 'return-1',
          orderId: 'order-1',
          refundAmount: 500,
          currency: 'BDT',
          refundedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.payload.refundAmount).toBe(500);
    });
  });
});
