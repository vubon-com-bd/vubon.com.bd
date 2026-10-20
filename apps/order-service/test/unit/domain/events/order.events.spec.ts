/**
 * Order Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_EVENT_TYPE,
  OrderCreatedEvent,
  OrderStatusChangedEvent,
  OrderCancelledEvent,
  OrderReturnedEvent,
  OrderRefundedEvent,
  OrderPriorityChangedEvent,
  OrderNoteAddedEvent,
} from '@domain/events/order.events.js';

describe('Order Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_EVENT_TYPE.CREATED).toBe('order-service.order.created');
      expect(ORDER_EVENT_TYPE.CONFIRMED).toBe('order-service.order.confirmed');
      expect(ORDER_EVENT_TYPE.STATUS_CHANGED).toBe('order-service.order.status_changed');
      expect(ORDER_EVENT_TYPE.CANCELLED).toBe('order-service.order.cancelled');
      expect(ORDER_EVENT_TYPE.RETURNED).toBe('order-service.order.returned');
      expect(ORDER_EVENT_TYPE.REFUNDED).toBe('order-service.order.refunded');
    });
  });

  describe('OrderCreatedEvent', () => {
    it('creates event with correct type', () => {
      const event = new OrderCreatedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          orderNumber: 'ORD-2024-000001',
          customerId: 'customer-1',
          totalAmount: 1000,
          currency: 'BDT',
          itemCount: 2,
          createdAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.CREATED);
      expect(event.aggregateId).toBe('order-1');
      expect(event.aggregateType).toBe('Order');
      expect(event.payload.orderNumber).toBe('ORD-2024-000001');
    });

    it('uses provided id and occurredAt', () => {
      const event = new OrderCreatedEvent({
        id: 'custom-id',
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          orderNumber: 'ORD-2024-000001',
          customerId: 'c-1',
          totalAmount: 100,
          currency: 'BDT',
          itemCount: 1,
          createdAt: '2024-01-01T00:00:00Z',
        },
        occurredAt: '2024-01-01T00:00:00Z' as never,
        version: 1,
      });
      expect(event.id).toBe('custom-id');
    });

    it('generates id by default', () => {
      const event = new OrderCreatedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          orderNumber: 'ORD-2024-000001',
          customerId: 'c-1',
          totalAmount: 100,
          currency: 'BDT',
          itemCount: 1,
          createdAt: '2024-01-01T00:00:00Z',
        },
      });
      expect(event.id).toBeDefined();
      expect(event.id.length).toBeGreaterThan(0);
    });
  });

  describe('OrderStatusChangedEvent', () => {
    it('creates with from/to statuses', () => {
      const event = new OrderStatusChangedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          fromStatus: 'pending',
          toStatus: 'confirmed',
          changedBy: 'admin-1',
          reason: 'verified',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.STATUS_CHANGED);
      expect(event.payload.fromStatus).toBe('pending');
      expect(event.payload.toStatus).toBe('confirmed');
      expect(event.payload.changedBy).toBe('admin-1');
    });
  });

  describe('OrderCancelledEvent', () => {
    it('creates with cancel details', () => {
      const event = new OrderCancelledEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          cancelId: 'cancel-1',
          reason: 'customer_request',
          cancelledBy: 'customer-1',
          cancelledAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.CANCELLED);
      expect(event.payload.reason).toBe('customer_request');
    });
  });

  describe('OrderReturnedEvent', () => {
    it('creates with return items', () => {
      const event = new OrderReturnedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          returnId: 'return-1',
          reason: 'defective',
          returnItemIds: ['item-1', 'item-2'],
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.RETURNED);
      expect(event.payload.returnItemIds.length).toBe(2);
    });
  });

  describe('OrderRefundedEvent', () => {
    it('creates with refund amount', () => {
      const event = new OrderRefundedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          refundAmount: 1000,
          currency: 'BDT',
          refundedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.REFUNDED);
      expect(event.payload.refundAmount).toBe(1000);
    });
  });

  describe('OrderPriorityChangedEvent', () => {
    it('creates with priorities', () => {
      const event = new OrderPriorityChangedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          fromPriority: 'normal',
          toPriority: 'urgent',
          changedBy: 'admin-1',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.PRIORITY_CHANGED);
      expect(event.payload.toPriority).toBe('urgent');
    });
  });

  describe('OrderNoteAddedEvent', () => {
    it('creates with note', () => {
      const event = new OrderNoteAddedEvent({
        aggregateId: 'order-1',
        payload: {
          orderId: 'order-1',
          note: 'rush order',
          addedBy: 'admin-1',
        },
      });
      expect(event.type).toBe(ORDER_EVENT_TYPE.NOTE_ADDED);
      expect(event.payload.note).toBe('rush order');
    });
  });
});
