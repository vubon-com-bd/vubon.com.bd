/**
 * E2E — FulfillmentService Real Wiring
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderFulfillmentService } from '@application/services/impl/order-fulfillment.service.js';
import type { OrderFulfillmentRepository } from '@domain/repositories/order-fulfillment.repository.interface.js';
import { makeFulfillmentEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeMockRepo(): jest.Mocked<OrderFulfillmentRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByVendor: jest.fn(),
    findByStatus: jest.fn(),
    findAwaitingFulfillment: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderFulfillmentRepository>;
}

describe('E2E — FulfillmentService Real Wiring', () => {
  let service: OrderFulfillmentService;
  let repo: jest.Mocked<OrderFulfillmentRepository>;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new OrderFulfillmentService(repo);
  });

  it('getById returns mapped fulfillment', async () => {
    repo.findByIdVO.mockResolvedValue(makeFulfillmentEntityStub());
    const result = await service.getById(FIXTURE_ID);
    expect(result.id).toBe(FIXTURE_ID);
    expect(result.itemIds.length).toBe(2);
  });

  it('getById throws for missing fulfillment', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.getById(FIXTURE_ID)).rejects.toThrow();
  });

  it('pack saves fulfillment', async () => {
    const entity = makeFulfillmentEntityStub();
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    await service.pack(
      { fulfillmentId: FIXTURE_ID, orderId: FIXTURE_ID } as never,
      'admin',
    );
    expect(repo.save).toHaveBeenCalled();
  });

  it('complete saves fulfillment', async () => {
    const entity = makeFulfillmentEntityStub();
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    await service.complete(
      { fulfillmentId: FIXTURE_ID, orderId: FIXTURE_ID } as never,
      'admin',
    );
    expect(repo.save).toHaveBeenCalled();
  });

  it('list returns paginated results', async () => {
    repo.findAll.mockResolvedValue([makeFulfillmentEntityStub()]);
    const result = await service.list({ page: 1, limit: 10 });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
  });

  it('ship rejects missing fulfillmentId', async () => {
    await expect(
      service.ship({ orderId: FIXTURE_ID } as never, 'admin'),
    ).rejects.toThrow();
  });
});
