/**
 * Order Cancel Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_CANCEL_EVENT_TYPE,
  OrderCancelRequestedEvent,
  OrderCancelApprovedEvent,
  OrderCancelRejectedEvent,
  OrderCancelProcessedEvent,
  OrderCancelRefundedEvent,
} from '@domain/events/order-cancel.events.js';

describe('Order Cancel Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_CANCEL_EVENT_TYPE.REQUESTED).toBe('order.order-cancel.requested');
      expect(ORDER_CANCEL_EVENT_TYPE.REFUNDED).toBe('order.order-cancel.refunded');
    });
  });

  describe('OrderCancelRequestedEvent', () => {
    it('creates requested event', () => {
      const event = new OrderCancelRequestedEvent({
        aggregateId: 'cancel-1',
        payload: {
          cancelId: 'cancel-1',
          orderId: 'order-1',
          reason: 'customer_request',
          requestedBy: 'customer-1',
          requestedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_CANCEL_EVENT_TYPE.REQUESTED);
      expect(event.aggregateType).toBe('OrderCancel');
    });
  });

  describe('OrderCancelApprovedEvent', () => {
    it('creates approved event', () => {
      const event = new OrderCancelApprovedEvent({
        aggregateId: 'cancel-1',
        payload: {
          cancelId: 'cancel-1',
          orderId: 'order-1',
          approvedBy: 'admin-1',
          approvedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_CANCEL_EVENT_TYPE.APPROVED);
    });
  });

  describe('OrderCancelRejectedEvent', () => {
    it('creates rejected event', () => {
      const event = new OrderCancelRejectedEvent({
        aggregateId: 'cancel-1',
        payload: {
          cancelId: 'cancel-1',
          orderId: 'order-1',
          rejectedBy: 'admin-1',
          rejectionReason: 'not eligible',
        },
      });
      expect(event.type).toBe(ORDER_CANCEL_EVENT_TYPE.REJECTED);
    });
  });

  describe('OrderCancelProcessedEvent', () => {
    it('creates processed event', () => {
      const event = new OrderCancelProcessedEvent({
        aggregateId: 'cancel-1',
        payload: {
          cancelId: 'cancel-1',
          orderId: 'order-1',
          processedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_CANCEL_EVENT_TYPE.PROCESSED);
    });
  });

  describe('OrderCancelRefundedEvent', () => {
    it('creates refunded event', () => {
      const event = new OrderCancelRefundedEvent({
        aggregateId: 'cancel-1',
        payload: {
          cancelId: 'cancel-1',
          orderId: 'order-1',
          refundAmount: 1000,
          currency: 'BDT',
          refundedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.payload.refundAmount).toBe(1000);
    });
  });
});
