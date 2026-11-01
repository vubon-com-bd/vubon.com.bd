/**
 * E2E — Order Snapshot Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import { OrderSnapshotService } from '@domain/services/order-snapshot.service.js';
import {
  createConfirmedOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';

describe('E2E — Order Snapshot Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('captures snapshot from order', () => {
    const order = createConfirmedOrder();
    const snapshot = OrderSnapshotService.capture(order);
    expect(snapshot.order.id).toBeDefined();
    expect(snapshot.items.length).toBe(1);
    expect(snapshot.snapshotAt).toBeDefined();
  });

  it('serializes to JSON', () => {
    const order = createConfirmedOrder();
    const snapshot = OrderSnapshotService.capture(order);
    const json = OrderSnapshotService.toJSON(snapshot);
    expect(json.order).toBeDefined();
    expect(json.items).toBeDefined();
    expect(json.shippingAddress).toBeDefined();
  });

  it('compares two snapshots as equal', () => {
    const order = createConfirmedOrder();
    const a = OrderSnapshotService.capture(order, { now: E2E_NOW });
    const b = OrderSnapshotService.capture(order, { now: E2E_NOW });
    expect(OrderSnapshotService.isEquivalent(a, b)).toBe(true);
  });

  it('distinguishes different snapshots', () => {
    const order = createConfirmedOrder();
    const a = OrderSnapshotService.capture(order, { now: E2E_NOW });
    const b = OrderSnapshotService.capture(order, { now: '2024-07-01T00:00:00.000Z' });
    expect(OrderSnapshotService.isEquivalent(a, b)).toBe(false);
  });
});
