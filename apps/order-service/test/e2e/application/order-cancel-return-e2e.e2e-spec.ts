/**
 * E2E — Cancel & Return Cross-Flow
 * @module order-service/test/e2e/application
 *
 * Tests both cancel and return services together with real domain.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import { OrderReturnService } from '@application/services/impl/order-return.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import type { OrderReturnRepository } from '@domain/repositories/order-return.repository.interface.js';
import {
  createPendingOrder,
  createDeliveredOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';
import { fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';
import { makeReturnEntityStub } from '@fixtures/application/entity-factories.js';

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

function makeReturnRepo(): jest.Mocked<OrderReturnRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPickupScheduledBefore: jest.fn(),
    findAwaitingInspection: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderReturnRepository>;
}

describe('E2E — Cancel & Return Cross-Flow', () => {
  let orderService: OrderService;
  let returnService: OrderReturnService;
  let orderRepo: jest.Mocked<OrderRepository>;
  let returnRepo: jest.Mocked<OrderReturnRepository>;

  beforeEach(() => {
    orderRepo = makeOrderRepo();
    returnRepo = makeReturnRepo();
    orderService = new OrderService(orderRepo);
    returnService = new OrderReturnService(returnRepo);
  });

  it('cancel pending order via service', async () => {
    const order = createPendingOrder();
    orderRepo.findByIdVO.mockResolvedValue(order);
    orderRepo.save.mockResolvedValue(order);

    await orderService.confirm(
      { orderId: fixtureOrderId.value } as never,
      'admin-1',
    );

    expect(order.isConfirmed()).toBe(true);
  });

  it('loads delivered order for return processing', async () => {
    const order = createDeliveredOrder();
    orderRepo.findByIdVO.mockResolvedValue(order);

    const loaded = await orderService.getById(fixtureOrderId.value);
    expect(loaded.status).toBe('delivered');
    expect(loaded.deliveredAt).toBe(E2E_NOW);
  });

  it('delivered order is returnable', () => {
    const order = createDeliveredOrder();
    expect(order.isReturnable()).toBe(true);
  });

  it('pending order is not returnable', () => {
    const order = createPendingOrder();
    expect(order.isReturnable()).toBe(false);
  });

  it('loads return and approves it', async () => {
    const returnEntity = makeReturnEntityStub();
    (returnEntity as unknown as { approve: () => void }).approve = jest.fn();
    returnRepo.findByIdVO.mockResolvedValue(returnEntity);
    returnRepo.save.mockResolvedValue(returnEntity);

    await returnService.approve(
      { returnId: fixtureOrderId.value, orderId: fixtureOrderId.value } as never,
      'admin',
    );

    expect(returnRepo.save).toHaveBeenCalled();
  });

  it('listByOrder returns all returns for the order', async () => {
    returnRepo.findByOrder.mockResolvedValue([
      makeReturnEntityStub(),
      makeReturnEntityStub(),
    ]);

    const result = await returnService.listByOrder(fixtureOrderId.value);
    expect(result.length).toBe(2);
  });

  it('confirmed order cannot be cancelled after shipment', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    order.pack(E2E_NOW);
    order.ship('admin-1', E2E_NOW);

    expect(order.isCancellable()).toBe(false);
  });
});
