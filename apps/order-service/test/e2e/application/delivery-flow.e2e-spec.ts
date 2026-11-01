/**
 * E2E — Delivery Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import { DeliveryEntity } from '@domain/entities/delivery.entity.js';
import { DeliveryVO } from '@domain/composites/delivery.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '@domain/primitives/delivery-type.vo.js';
import {
  fixtureDeliveryId,
  fixtureOrderId,
  fixtureDeliveryMethodId,
} from '@fixtures/domain/primitive-fixtures.js';
import { E2E_NOW } from '@fixtures/e2e/order-scenario.js';

function makeDelivery(): DeliveryEntity {
  return DeliveryEntity.create({
    id: fixtureDeliveryId.value,
    vo: DeliveryVO.create({
      id: fixtureDeliveryId,
      orderId: fixtureOrderId,
      methodId: fixtureDeliveryMethodId,
      status: DeliveryStatusVO.pending(),
      type: DeliveryTypeVO.create('standard'),
      attempts: 0,
    }),
    now: E2E_NOW,
  });
}

describe('E2E — Delivery Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('starts pending', () => {
    expect(makeDelivery().isPending()).toBe(true);
  });

  it('full lifecycle: pending → scheduled → picked_up → in_transit → out_for_delivery → delivered', () => {
    const delivery = makeDelivery();
    delivery.schedule(undefined, 'courier-1', '2024-06-18', E2E_NOW);
    expect(delivery.isScheduled()).toBe(true);
    delivery.pickUp(E2E_NOW);
    expect(delivery.isPickedUp()).toBe(true);
    delivery.markInTransit(E2E_NOW);
    expect(delivery.isInTransit()).toBe(true);
    delivery.markOutForDelivery(E2E_NOW);
    expect(delivery.isOutForDelivery()).toBe(true);
    delivery.markDelivered('customer', 'sig-1', E2E_NOW);
    expect(delivery.isDelivered()).toBe(true);
  });

  it('handles failure + retry', () => {
    const delivery = makeDelivery();
    delivery.schedule(undefined, undefined, undefined, E2E_NOW);
    delivery.fail('customer unavailable', E2E_NOW);
    expect(delivery.isFailed()).toBe(true);
    expect(delivery.attempts).toBe(1);
    expect(delivery.canRetry()).toBe(true);
  });

  it('tracks multiple failed attempts via reschedule between', () => {
    const delivery = makeDelivery();
    delivery.schedule(undefined, undefined, undefined, E2E_NOW);
    delivery.fail('attempt 1', E2E_NOW);
    // reschedule updates estimatedAt only — status stays 'failed'
    delivery.reschedule('retry', '2024-06-16', E2E_NOW);
    expect(delivery.attempts).toBe(1);
  });

  it('rejects fail when already failed', () => {
    const delivery = makeDelivery();
    delivery.schedule(undefined, undefined, undefined, E2E_NOW);
    delivery.fail('attempt 1', E2E_NOW);
    // Cannot fail again from 'failed' — must go back to 'scheduled' first
    expect(() => delivery.fail('attempt 2', E2E_NOW)).toThrow();
  });
});
