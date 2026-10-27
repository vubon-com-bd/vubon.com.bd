/**
 * Checkout Events — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  CHECKOUT_EVENT_TYPE,
  CheckoutStartedEvent,
  CheckoutStepChangedEvent,
  CheckoutCompletedEvent,
  CheckoutAbandonedEvent,
  CheckoutExpiredEvent,
} from '@domain/events/checkout.events.js';

describe('Checkout Events', () => {
  describe('event type constants', () => {
    it('has all required types', () => {
      expect(CHECKOUT_EVENT_TYPE.STARTED).toBe('order.checkout.started');
      expect(CHECKOUT_EVENT_TYPE.STEP_CHANGED).toBe('order.checkout.step_changed');
      expect(CHECKOUT_EVENT_TYPE.COMPLETED).toBe('order.checkout.completed');
    });
  });

  describe('CheckoutStartedEvent', () => {
    it('creates started event', () => {
      const event = new CheckoutStartedEvent({
        aggregateId: 'checkout-1',
        payload: {
          checkoutId: 'checkout-1',
          customerId: 'customer-1',
          startedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(CHECKOUT_EVENT_TYPE.STARTED);
      expect(event.aggregateType).toBe('Checkout');
    });
  });

  describe('CheckoutStepChangedEvent', () => {
    it('creates step change event', () => {
      const event = new CheckoutStepChangedEvent({
        aggregateId: 'checkout-1',
        payload: {
          checkoutId: 'checkout-1',
          fromStep: 'cart',
          toStep: 'shipping_address',
        },
      });
      expect(event.type).toBe(CHECKOUT_EVENT_TYPE.STEP_CHANGED);
      expect(event.payload.toStep).toBe('shipping_address');
    });
  });

  describe('CheckoutCompletedEvent', () => {
    it('creates completion event', () => {
      const event = new CheckoutCompletedEvent({
        aggregateId: 'checkout-1',
        payload: {
          checkoutId: 'checkout-1',
          orderId: 'order-1',
          completedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(CHECKOUT_EVENT_TYPE.COMPLETED);
    });
  });

  describe('CheckoutAbandonedEvent', () => {
    it('creates abandoned event', () => {
      const event = new CheckoutAbandonedEvent({
        aggregateId: 'checkout-1',
        payload: {
          checkoutId: 'checkout-1',
          reason: 'timeout',
          abandonedAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(CHECKOUT_EVENT_TYPE.ABANDONED);
    });
  });

  describe('CheckoutExpiredEvent', () => {
    it('creates expired event', () => {
      const event = new CheckoutExpiredEvent({
        aggregateId: 'checkout-1',
        payload: {
          checkoutId: 'checkout-1',
          expiredAt: '2024-01-01T10:00:00Z',
        },
      });
      expect(event.type).toBe(CHECKOUT_EVENT_TYPE.EXPIRED);
    });
  });
});
