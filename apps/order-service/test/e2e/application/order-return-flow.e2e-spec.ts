/**
 * E2E — Order Return Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import {
  createPendingOrder,
  createDeliveredOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';
import { CanReturnOrderSpecification } from '@domain/specifications/can-return-order.specification.js';
import { OrderReturnPolicyService } from '@domain/services/order-return-policy.service.js';

describe('E2E — Order Return Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('blocks return on pending order', () => {
    const order = createPendingOrder();
    const spec = CanReturnOrderSpecification.strict();
    expect(spec.isSatisfiedBy({ order })).toBe(false);
  });

  it('allows return on delivered order', () => {
    const order = createDeliveredOrder();
    const spec = CanReturnOrderSpecification.strict();
    expect(spec.isSatisfiedBy({ order })).toBe(true);
  });

  it('computes full refund for delivered order', () => {
    const order = createDeliveredOrder();
    const refund = OrderReturnPolicyService.computeRefundAmount(order);
    expect(refund).toBe(1000);
  });

  it('rejects return after max window', () => {
    const order = createDeliveredOrder();
    const result = OrderReturnPolicyService.checkEligibility(order, {
      now: '2024-08-15T10:00:00.000Z', // 60 days after delivery
    });
    expect(result.eligible).toBe(false);
  });
});
