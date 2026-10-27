/**
 * E2E — OrderService Real Wiring
 * @module order-service/test/e2e/application
 *
 * Tests OrderService with a mock repository (no real DB),
 * exercising real domain entities + mappers.
 */
import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import {
  createPendingOrder,
  createConfirmedOrder,
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

const mockEventBridge = { publishFromEntity: jest.fn().mockResolvedValue(undefined) };

describe('E2E — OrderService Real Wiring', () => {
  let service: OrderService;
  let repo: jest.Mocked<OrderRepository>;

  beforeAll(() => {
    repo = makeMockRepo();
    service = new OrderService(repo, mockEventBridge as never);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('creates a service with real domain', () => {
    expect(service).toBeInstanceOf(OrderService);
  });

  it('fetches real OrderEntity via repository', async () => {
    const order = createPendingOrder();
    repo.findByIdVO.mockResolvedValue(order);

    const result = await service.getById(fixtureOrderId.value);

    expect(result.id).toBe(fixtureOrderId.value);
    expect(result.status).toBe('pending');
    expect(repo.findByIdVO).toHaveBeenCalled();
  });

  it('confirms real order via domain + saves', async () => {
    const order = createPendingOrder();
    repo.findByIdVO.mockResolvedValue(order);
    repo.save.mockResolvedValue(order);

    await service.confirm({ orderId: fixtureOrderId.value, orderId$: undefined } as never, 'admin-1');

    expect(order.isConfirmed()).toBe(true);
    expect(order.confirmedAt).toBeDefined();
    expect(repo.save).toHaveBeenCalled();
  });

  it('getById throws when repository returns null', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.getById(fixtureOrderId.value)).rejects.toThrow();
  });

  it('getStats returns stats from repository', async () => {
    repo.getStats.mockResolvedValue({
      total: 42,
      totalRevenue: 12500.5,
      averageOrderValue: 297.63,
      currency: 'BDT',
      byStatus: { pending: 10, confirmed: 20, delivered: 12 },
    });

    const result = await service.getStats();
    expect(result.totalOrders).toBe(42);
    expect(result.totalRevenue).toBe(12500.5);
    expect(result.byStatus.pending).toBe(10);
  });

  it('list returns paginated DTOs', async () => {
    const orders = [createPendingOrder(), createConfirmedOrder()];
    repo.findPaginated.mockResolvedValue({
      items: orders,
      total: 2,
      page: 1,
      limit: 10,
    });

    const result = await service.list({ page: 1, limit: 10 });
    expect(result.items.length).toBe(2);
    expect(result.total).toBe(2);
    expect(result.totalPages).toBe(1);
  });

  it('E2E_NOW constant is consistent', () => {
    expect(E2E_NOW).toBe('2024-06-15T10:00:00.000Z');
  });
});
