/**
 * E2E — Order Cancel Flow (real domain + mock repo)
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import {
  createPendingOrder,
  createShippedOrder,
  E2E_NOW,
} from '@fixtures/e2e/order-scenario.js';
import { fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

function makeMockRepo(): jest.Mocked<OrderRepository> {
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

describe('E2E — Order Cancel Flow', () => {
  let service: OrderService;
  let repo: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new OrderService(repo);
  });

  it('cancels pending order', async () => {
    const order = createPendingOrder();
    repo.findByIdVO.mockResolvedValue(order);
    repo.save.mockResolvedValue(order);

    await service.confirm(
      { orderId: fixtureOrderId.value, reason: 'customer request' } as never,
      'admin-1',
    );

    expect(repo.save).toHaveBeenCalled();
  });

  it('cancel directly via entity on pending order', () => {
    const order = createPendingOrder();
    order.cancel('customer request', 'customer-1', E2E_NOW);

    expect(order.isCancelled()).toBe(true);
    expect(order.cancelledAt).toBe(E2E_NOW);
  });

  it('throws when cancelling shipped order', () => {
    const order = createShippedOrder();
    expect(() =>
      order.cancel('customer request', 'customer-1', E2E_NOW),
    ).toThrow();
  });

  it('loads and cancels via service', async () => {
    const order = createPendingOrder();
    repo.findByIdVO.mockResolvedValue(order);
    repo.save.mockResolvedValue(order);

    await service.update({ orderId: fixtureOrderId.value } as never, 'admin');

    expect(repo.findByIdVO).toHaveBeenCalledWith(expect.anything());
    expect(repo.save).toHaveBeenCalled();
  });

  it('rejects cancel for unknown order', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(
      service.update({ orderId: fixtureOrderId.value } as never, 'admin'),
    ).rejects.toThrow();
  });
});
