/**
 * E2E — Order Cancel Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import {
  createPendingOrder,
  createShippedOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';
import { OrderCancelPolicyService } from '@domain/services/order-cancel-policy.service.js';
import { CanCancelOrderSpecification } from '@domain/specifications/can-cancel-order.specification.js';

describe('E2E — Order Cancel Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('allows cancel on pending order', () => {
    const order = createPendingOrder();
    const spec = CanCancelOrderSpecification.strict();
    expect(spec.isSatisfiedBy({ order, ctx: { requestedAt: E2E_NOW } })).toBe(true);
  });

  it('blocks cancel on shipped order (ALLOW_AFTER_SHIPMENT false)', () => {
    const order = createShippedOrder();
    const spec = CanCancelOrderSpecification.strict();
    expect(spec.isSatisfiedBy({ order, ctx: { requestedAt: E2E_NOW } })).toBe(false);
  });

  it('cancels pending order and marks terminal', () => {
    const order = createPendingOrder();
    order.cancel('customer request', 'customer-1', E2E_NOW);
    expect(order.isCancelled()).toBe(true);
    expect(order.isTerminal()).toBe(true);
  });

  it('emits order.cancelled event', () => {
    const order = createPendingOrder();
    order.cancel('customer request', 'customer-1', E2E_NOW);
    const cancelledEvents = order.domainEvents.filter(
      (e) => e.type === 'order.order.cancelled',
    );
    expect(cancelledEvents.length).toBe(1);
  });

  it('computes refund amount via policy', () => {
    const order = createPendingOrder();
    const refund = OrderCancelPolicyService.computeRefundAmount(order);
    expect(refund).toBe(1000); // 500 * 2 items
  });

  it('rejects cancel after window via policy', () => {
    const order = createPendingOrder();
    const result = OrderCancelPolicyService.checkEligibility(order, {
      now: '2024-06-20T10:00:00.000Z', // 5 days later
    });
    expect(result.eligible).toBe(false);
  });
});
