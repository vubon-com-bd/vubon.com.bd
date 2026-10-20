/**
 * E2E — Order Fulfillment Flow
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { createTestApp, TestAppContext } from '@fixtures/e2e/test-app.factory.js';
import { OrderFulfillmentEntity } from '@domain/entities/order-fulfillment.entity.js';
import { OrderFulfillmentVO } from '@domain/composites/order-fulfillment.vo.js';
import { FulfillmentStatusVO } from '@domain/primitives/fulfillment-status.vo.js';
import { FulfillmentAllocationService } from '@domain/services/fulfillment-allocation.service.js';
import { createOrderItem, E2E_NOW } from '@fixtures/e2e/order-scenario.js';
import {
  fixtureFulfillmentId,
  fixtureOrderId,
} from '@fixtures/domain/primitive-fixtures.js';

function makeFulfillment(): OrderFulfillmentEntity {
  return OrderFulfillmentEntity.create({
    id: fixtureFulfillmentId.value,
    vo: OrderFulfillmentVO.create({
      id: fixtureFulfillmentId,
      orderId: fixtureOrderId,
      status: FulfillmentStatusVO.unfulfilled(),
      itemIds: ['item-1', 'item-2'],
    }),
    now: E2E_NOW,
  });
}

describe('E2E — Order Fulfillment Flow', () => {
  let ctx: TestAppContext;

  beforeAll(async () => {
    ctx = await createTestApp();
  });

  afterAll(async () => {
    await ctx.close();
  });

  it('starts unfulfilled', () => {
    expect(makeFulfillment().isUnfulfilled()).toBe(true);
  });

  it('unfulfilled → pending → fulfilled', () => {
    const fulfillment = makeFulfillment();
    fulfillment.start(E2E_NOW);
    fulfillment.fulfill('TRK-ABCD1234', E2E_NOW);
    expect(fulfillment.isFulfilled()).toBe(true);
    expect(fulfillment.isTerminal()).toBe(true);
  });

  it('partially_fulfilled transition', () => {
    const fulfillment = makeFulfillment();
    fulfillment.markPartiallyFulfilled(E2E_NOW);
    expect(fulfillment.status.isPartiallyFulfilled()).toBe(true);
  });

  it('allocates items across warehouses', () => {
    const item = createOrderItem();
    const stock = [
      { warehouseId: 'wh-1', itemId: item.id.value, available: 1 },
      { warehouseId: 'wh-2', itemId: item.id.value, available: 5 },
    ];
    const result = FulfillmentAllocationService.allocate([item], stock);
    expect(result.fullyAllocated).toBe(true);
    expect(result.allocations.length).toBe(2);
  });

  it('reports unallocated when stock insufficient', () => {
    const item = createOrderItem();
    const stock = [{ warehouseId: 'wh-1', itemId: item.id.value, available: 1 }];
    const result = FulfillmentAllocationService.allocate([item], stock);
    expect(result.fullyAllocated).toBe(false);
    expect(result.unallocated.length).toBe(1);
  });
});
