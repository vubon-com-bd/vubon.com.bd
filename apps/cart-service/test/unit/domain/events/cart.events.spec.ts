/**
 * Cart Domain Events unit tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  CartCreatedEvent,
  CartStatusChangedEvent,
  CartTotalsRecalculatedEvent,
  CART_EVENT_TYPE,
} from '@domain/events/cart.events.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '../../../fixtures/index';

describe('CartCreatedEvent', () => {
  it('constructs with payload', () => {
    const event = new CartCreatedEvent({
      aggregateId: TEST_IDS.CART_ID,
      payload: {
        cartId: TEST_IDS.CART_ID,
        type: 'user',
        currency: TEST_CURRENCY,
        createdAt: TEST_DATES.NOW,
      },
      version: 1,
    });
    expect(event.type).toBe(CART_EVENT_TYPE.CREATED);
    expect(event.aggregateId).toBe(TEST_IDS.CART_ID);
    expect(event.payload.currency).toBe(TEST_CURRENCY);
  });
});

describe('CartStatusChangedEvent', () => {
  it('constructs with fromStatus/toStatus', () => {
    const event = new CartStatusChangedEvent({
      aggregateId: TEST_IDS.CART_ID,
      payload: {
        cartId: TEST_IDS.CART_ID,
        fromStatus: 'active',
        toStatus: 'converted',
      },
      version: 2,
    });
    expect(event.type).toBe(CART_EVENT_TYPE.STATUS_CHANGED);
    expect(event.payload.fromStatus).toBe('active');
    expect(event.payload.toStatus).toBe('converted');
  });
});

describe('CartTotalsRecalculatedEvent', () => {
  it('contains totals payload', () => {
    const event = new CartTotalsRecalculatedEvent({
      aggregateId: TEST_IDS.CART_ID,
      payload: {
        cartId: TEST_IDS.CART_ID,
        subtotal: 200,
        discount: 20,
        tax: 27,
        shipping: 0,
        total: 207,
        currency: TEST_CURRENCY,
      },
      version: 3,
    });
    expect(event.payload.total).toBe(207);
  });
});
