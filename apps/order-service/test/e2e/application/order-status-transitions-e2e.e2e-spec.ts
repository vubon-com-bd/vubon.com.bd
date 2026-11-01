/**
 * E2E — Order Status State Machine
 * @module order-service/test/e2e/application
 *
 * Exercises the full domain state machine (no mocks needed — pure domain).
 */
import { describe, it, expect } from '@jest/globals';
import {
  createPendingOrder,
  createConfirmedOrder,
  createPackedOrder,
  createShippedOrder,
  createDeliveredOrder,
  createCompletedOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';

describe('E2E — Order Status State Machine', () => {
  it('pending → confirmed', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    expect(order.isConfirmed()).toBe(true);
  });

  it('pending → confirmed → processing', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    expect(order.isProcessing()).toBe(true);
  });

  it('pending → confirmed → processing → packed', () => {
    const order = createPackedOrder();
    expect(order.isPacked()).toBe(true);
  });

  it('packed → shipped', () => {
    const order = createShippedOrder();
    expect(order.isShipped()).toBe(true);
    expect(order.shippedAt).toBe(E2E_NOW);
  });

  it('shipped → delivered', () => {
    const order = createDeliveredOrder();
    expect(order.isDelivered()).toBe(true);
    expect(order.deliveredAt).toBe(E2E_NOW);
  });

  it('delivered → completed', () => {
    const order = createCompletedOrder();
    expect(order.isCompleted()).toBe(true);
    expect(order.isTerminal()).toBe(true);
  });

  it('cancelled order is terminal', () => {
    const order = createPendingOrder();
    order.cancel('customer request', 'customer-1', E2E_NOW);
    expect(order.isCancelled()).toBe(true);
    expect(order.isTerminal()).toBe(true);
  });

  it('invalid transition throws', () => {
    const order = createCompletedOrder();
    expect(() => order.confirm('admin-1', E2E_NOW)).toThrow();
  });

  it('full lifecycle pending → completed has version > 0', () => {
    const order = createCompletedOrder();
    expect(order.version).toBeGreaterThan(0);
    expect(order.domainEvents.length).toBeGreaterThan(0);
  });

  it('confirmed order has domain event', () => {
    const order = createConfirmedOrder();
    const events = order.domainEvents;
    expect(events.length).toBeGreaterThanOrEqual(1);
  });
});
