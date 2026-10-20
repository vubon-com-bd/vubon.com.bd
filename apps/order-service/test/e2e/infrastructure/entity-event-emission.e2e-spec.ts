/**
 * E2E — Entity Event Emission
 * @module order-service/test/e2e/infrastructure
 *
 * Verifies event emission + payload structure.
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import {
  createPendingOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';

describe('E2E — Entity Event Emission', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('creates OrderCreatedEvent on entity creation', () => {
    const order = createPendingOrder();
    const events = order.domainEvents;
    expect(events.length).toBeGreaterThanOrEqual(1);
    const created = events.find((e) => e.type === 'order-service.order.created');
    expect(created).toBeDefined();
    expect(created?.aggregateType).toBe('Order');
  });

  it('emits OrderStatusChangedEvent on transition', () => {
    const order = createPendingOrder();
    order.confirm('admin', E2E_NOW);
    const statusEvents = order.domainEvents.filter(
      (e) => e.type === 'order-service.order.status_changed',
    );
    expect(statusEvents.length).toBe(1);
    const payload = statusEvents[0].payload as {
      fromStatus: string;
      toStatus: string;
    };
    expect(payload.fromStatus).toBe('pending');
    expect(payload.toStatus).toBe('confirmed');
  });

  it('clears events after pullDomainEvents()', () => {
    const order = createPendingOrder();
    const events = order.pullDomainEvents();
    expect(events.length).toBeGreaterThanOrEqual(1);
    expect(order.domainEvents.length).toBe(0);
  });

  it('events are serializable', () => {
    const order = createPendingOrder();
    const events = order.domainEvents;
    for (const event of events) {
      expect(() => JSON.stringify(event)).not.toThrow();
    }
  });

  it('events have required fields', () => {
    const order = createPendingOrder();
    for (const event of order.domainEvents) {
      expect(event.id).toBeDefined();
      expect(event.type).toBeDefined();
      expect(event.aggregateId).toBeDefined();
      expect(event.aggregateType).toBeDefined();
      expect(event.payload).toBeDefined();
      expect(event.occurredAt).toBeDefined();
      expect(event.version).toBeDefined();
    }
  });
});
