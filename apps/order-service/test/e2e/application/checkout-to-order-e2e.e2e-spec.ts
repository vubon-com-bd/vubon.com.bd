/**
 * E2E — Checkout → Order Cross-Service Scenario
 * @module order-service/test/e2e/application
 *
 * Simulates the flow: checkout starts → checkout confirms →
 * order created → order transitions through lifecycle.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import { CheckoutService } from '@application/services/impl/checkout.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import type { CheckoutRepository } from '@domain/repositories/checkout.repository.interface.js';
import {
  createPendingOrder,
  createOrderItem,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';
import { fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';
import {
  makeCheckoutEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

function makeOrderRepo(): jest.Mocked<OrderRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrderNumber: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findStalePending: jest.fn(),
    findExpiredUnconfirmed: jest.fn(),
    findAwaitingFulfillment: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderRepository>;
}

function makeCheckoutRepo(): jest.Mocked<CheckoutRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    findExpired: jest.fn(),
    findAbandoned: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<CheckoutRepository>;
}

const mockEventBridge = { publishFromEntity: jest.fn().mockResolvedValue(undefined) };

describe('E2E — Checkout → Order Cross-Service', () => {
  let orderService: OrderService;
  let checkoutService: CheckoutService;
  let orderRepo: jest.Mocked<OrderRepository>;
  let checkoutRepo: jest.Mocked<CheckoutRepository>;

  beforeEach(() => {
    orderRepo = makeOrderRepo();
    checkoutRepo = makeCheckoutRepo();
    orderService = new OrderService(orderRepo, mockEventBridge as never);
    checkoutService = new CheckoutService(checkoutRepo);
  });

  it('creates an order item independent of checkout', () => {
    const item = createOrderItem();
    expect(item.quantity.value).toBe(2);
    expect(item.unitPrice.amount).toBe(500);
    expect(item.lineTotal.amount).toBe(1000);
  });

  it('checkout loads successfully', async () => {
    checkoutRepo.findByIdVO.mockResolvedValue(makeCheckoutEntityStub());
    const checkout = await checkoutService.getById(FIXTURE_ID);
    expect(checkout.id).toBe(FIXTURE_ID);
    expect(checkout.status).toBe('started');
  });

  it('order created after checkout confirm (mocked)', async () => {
    // Simulate: checkout exists → confirms → order created
    checkoutRepo.findByIdVO.mockResolvedValue(makeCheckoutEntityStub());
    checkoutRepo.save.mockResolvedValue(makeCheckoutEntityStub());

    const confirmResult = await checkoutService.confirm(
      { checkoutId: FIXTURE_ID } as never,
      'user-1',
    );

    expect(confirmResult.success).toBe(true);
    expect(confirmResult.checkoutId).toBe(FIXTURE_ID);

    // Now simulate the resulting order
    const order = createPendingOrder();
    orderRepo.findByIdVO.mockResolvedValue(order);
    const loadedOrder = await orderService.getById(fixtureOrderId.value);

    expect(loadedOrder.id).toBe(fixtureOrderId.value);
    expect(loadedOrder.status).toBe('pending');
  });

  it('order transitions after checkout: pending → confirmed', async () => {
    const order = createPendingOrder();
    orderRepo.findByIdVO.mockResolvedValue(order);
    orderRepo.save.mockResolvedValue(order);

    await orderService.confirm(
      { orderId: fixtureOrderId.value } as never,
      'system-after-checkout',
    );

    expect(order.isConfirmed()).toBe(true);
    expect(order.confirmedAt).toBeDefined();
  });
});
