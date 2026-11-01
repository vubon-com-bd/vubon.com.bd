/**
 * E2E — Order Full Lifecycle
 * @module order-service/test/e2e/application
 *
 * Tests the complete order state machine from creation → completion.
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import {
  createPendingOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';

describe('E2E — Order Full Lifecycle', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('order starts in pending state', () => {
    const order = createPendingOrder();
    expect(order.isPending()).toBe(true);
    expect(order.isTerminal()).toBe(false);
  });

  it('transitions pending → confirmed', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    expect(order.isConfirmed()).toBe(true);
    expect(order.confirmedAt).toBe(E2E_NOW);
  });

  it('transitions confirmed → processing → packed', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    expect(order.isProcessing()).toBe(true);
    order.pack(E2E_NOW);
    expect(order.isPacked()).toBe(true);
  });

  it('transitions packed → shipped → delivered', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    order.pack(E2E_NOW);
    order.ship('admin-1', E2E_NOW);
    expect(order.isShipped()).toBe(true);
    order.markDelivered('customer', E2E_NOW);
    expect(order.isDelivered()).toBe(true);
  });

  it('completes full lifecycle', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    order.pack(E2E_NOW);
    order.ship('admin-1', E2E_NOW);
    order.markDelivered('customer', E2E_NOW);
    order.complete(E2E_NOW);
    expect(order.isCompleted()).toBe(true);
    expect(order.isTerminal()).toBe(true);
  });

  it('emits domain events for each transition', () => {
    const order = createPendingOrder();
    const initialEventCount = order.domainEvents.length;
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    order.pack(E2E_NOW);
    order.ship('admin-1', E2E_NOW);
    order.markDelivered('customer', E2E_NOW);
    order.complete(E2E_NOW);
    // Should have emitted ≥5 events beyond the initial created event
    expect(order.domainEvents.length).toBeGreaterThanOrEqual(initialEventCount + 5);
  });

  it('tracks version increments', () => {
    const order = createPendingOrder();
    const v1 = order.version;
    order.confirm('admin-1', E2E_NOW);
    expect(order.version).toBeGreaterThan(v1);
  });
});
