/**
 * E2E — Full Order Journey (pending → completed)
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import { createPendingOrder, E2E_NOW } from '@fixtures/e2e/order-scenario.js';
import { fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

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

describe('E2E — Full Order Journey', () => {
  let service: OrderService;
  let repo: jest.Mocked<OrderRepository>;

  beforeEach(() => {
    repo = makeOrderRepo();
    service = new OrderService(repo);
  });

  it('journey: create → confirm → process → pack → ship → deliver → complete', () => {
    const order = createPendingOrder();
    expect(order.isPending()).toBe(true);
    order.confirm('admin-1', E2E_NOW);
    expect(order.isConfirmed()).toBe(true);
    order.startProcessing(E2E_NOW);
    expect(order.isProcessing()).toBe(true);
    order.pack(E2E_NOW);
    expect(order.isPacked()).toBe(true);
    order.ship('admin-1', E2E_NOW);
    expect(order.isShipped()).toBe(true);
    order.markDelivered('customer', E2E_NOW);
    expect(order.isDelivered()).toBe(true);
    order.complete(E2E_NOW);
    expect(order.isCompleted()).toBe(true);
    expect(order.isTerminal()).toBe(true);
  });

  it('journey via service: load → confirm → save', async () => {
    const order = createPendingOrder();
    repo.findByIdVO.mockResolvedValue(order);
    repo.save.mockResolvedValue(order);

    await service.confirm({ orderId: fixtureOrderId.value } as never, 'admin-1');

    expect(order.isConfirmed()).toBe(true);
    expect(order.confirmedAt).toBeDefined();
    expect(order.confirmedAt).toEqual(expect.any(String));
    expect(repo.save).toHaveBeenCalled();
  });

  it('journey with domain events emitted', () => {
    const order = createPendingOrder();
    order.confirm('admin-1', E2E_NOW);
    order.startProcessing(E2E_NOW);
    order.pack(E2E_NOW);
    order.ship('admin-1', E2E_NOW);
    expect(order.domainEvents.length).toBeGreaterThanOrEqual(4);
  });

  it('journey version increments per transition', () => {
    const order = createPendingOrder();
    const v0 = order.version;
    order.confirm('admin-1', E2E_NOW);
    const v1 = order.version;
    order.startProcessing(E2E_NOW);
    const v2 = order.version;
    expect(v1).toBeGreaterThan(v0);
    expect(v2).toBeGreaterThan(v1);
  });

  it('cancelled journey prevents further transitions', () => {
    const order = createPendingOrder();
    order.cancel('customer', 'customer-1', E2E_NOW);
    expect(order.isTerminal()).toBe(true);
    expect(() => order.confirm('admin-1', E2E_NOW)).toThrow();
  });
});
