/**
 * Order Item Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  ORDER_ITEM_EVENT_TYPE,
  OrderItemAddedEvent,
  OrderItemUpdatedEvent,
  OrderItemRemovedEvent,
  OrderItemStatusChangedEvent,
  OrderItemQuantityChangedEvent,
} from '@domain/events/order-item.events.js';

describe('Order Item Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(ORDER_ITEM_EVENT_TYPE.ADDED).toBe('order.order-item.added');
      expect(ORDER_ITEM_EVENT_TYPE.UPDATED).toBe('order.order-item.updated');
      expect(ORDER_ITEM_EVENT_TYPE.REMOVED).toBe('order.order-item.removed');
    });
  });

  describe('OrderItemAddedEvent', () => {
    it('creates with item details', () => {
      const event = new OrderItemAddedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          productId: 'prod-1',
          quantity: 2,
          unitPrice: 500,
          currency: 'BDT',
        },
      });
      expect(event.type).toBe(ORDER_ITEM_EVENT_TYPE.ADDED);
      expect(event.aggregateType).toBe('OrderItem');
      expect(event.payload.quantity).toBe(2);
    });

    it('accepts optional variantId', () => {
      const event = new OrderItemAddedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          productId: 'prod-1',
          variantId: 'variant-1',
          quantity: 1,
          unitPrice: 100,
          currency: 'BDT',
        },
      });
      expect(event.payload.variantId).toBe('variant-1');
    });
  });

  describe('OrderItemUpdatedEvent', () => {
    it('creates with changed fields', () => {
      const event = new OrderItemUpdatedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          changedFields: ['quantity', 'price'],
        },
      });
      expect(event.type).toBe(ORDER_ITEM_EVENT_TYPE.UPDATED);
      expect(event.payload.changedFields.length).toBe(2);
    });
  });

  describe('OrderItemRemovedEvent', () => {
    it('creates with reason', () => {
      const event = new OrderItemRemovedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          reason: 'customer request',
        },
      });
      expect(event.type).toBe(ORDER_ITEM_EVENT_TYPE.REMOVED);
      expect(event.payload.reason).toBe('customer request');
    });
  });

  describe('OrderItemStatusChangedEvent', () => {
    it('creates with from/to statuses', () => {
      const event = new OrderItemStatusChangedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          fromStatus: 'pending',
          toStatus: 'confirmed',
        },
      });
      expect(event.type).toBe(ORDER_ITEM_EVENT_TYPE.STATUS_CHANGED);
    });
  });

  describe('OrderItemQuantityChangedEvent', () => {
    it('creates with quantity transition', () => {
      const event = new OrderItemQuantityChangedEvent({
        aggregateId: 'item-1',
        payload: {
          orderItemId: 'item-1',
          orderId: 'order-1',
          fromQuantity: 2,
          toQuantity: 5,
        },
      });
      expect(event.type).toBe(ORDER_ITEM_EVENT_TYPE.QUANTITY_CHANGED);
      expect(event.payload.fromQuantity).toBe(2);
      expect(event.payload.toQuantity).toBe(5);
    });
  });
});
