/**
 * E2E — Order Entity CRUD (in-memory)
 * @module order-service/test/e2e/interfaces
 *
 * Verifies entity construction + serialization cycles.
 * ⚠️ Once REST controllers exist, replace with HTTP tests.
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import {
  createPendingOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';

describe('E2E — Order Entity CRUD', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('creates order with all fields', () => {
    const order = createPendingOrder();
    expect(order.id).toBeDefined();
    expect(order.orderNumber).toBeDefined();
    expect(order.items.length).toBe(1);
    expect(order.total.amount).toBe(1000);
  });

  it('exposes order via getters', () => {
    const order = createPendingOrder();
    expect(order.vo).toBeDefined();
    expect(order.status.value).toBe('pending');
    expect(order.subtotal.amount).toBe(1000);
    expect(order.total.currency).toBe('BDT');
  });

  it('returns items as readonly array copy', () => {
    const order = createPendingOrder();
    const items1 = order.items;
    const items2 = order.items;
    expect(items1).not.toBe(items2);
    expect(items1.length).toBe(items2.length);
  });

  it('preserves identity across access', () => {
    const order = createPendingOrder();
    expect(order.id).toBe(order.id);
  });

  it('serializes to JSON via toJSON', () => {
    const order = createPendingOrder();
    const json = order.toJSON();
    expect(json).toBeDefined();
    expect((json as { id: string }).id).toBe(order.id);
  });
});
