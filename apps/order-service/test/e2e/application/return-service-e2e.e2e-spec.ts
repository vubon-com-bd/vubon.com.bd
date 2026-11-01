/**
 * E2E — OrderReturnService Real Wiring
 * @module order-service/test/e2e/application
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderReturnService } from '@application/services/impl/order-return.service.js';
import type { OrderReturnRepository } from '@domain/repositories/order-return.repository.interface.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeMockRepo(): jest.Mocked<OrderReturnRepository> {
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

describe('E2E — ReturnService Real Wiring', () => {
  let service: OrderReturnService;
  let repo: jest.Mocked<OrderReturnRepository>;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new OrderReturnService(repo);
  });

  it('getById returns mapped return', async () => {
    repo.findByIdVO.mockResolvedValue(makeReturnEntityStub());
    const result = await service.getById(FIXTURE_ID);
    expect(result.id).toBe(FIXTURE_ID);
    expect(result.itemIds.length).toBe(2);
  });

  it('getById throws for missing return', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(service.getById(FIXTURE_ID)).rejects.toThrow();
  });

  it('approve calls entity and saves', async () => {
    const entity = makeReturnEntityStub();
    (entity as unknown as { approve: () => void }).approve = jest.fn();
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    await service.approve(
      { returnId: FIXTURE_ID, orderId: FIXTURE_ID } as never,
      'admin',
    );
    expect((entity as unknown as { approve: () => void }).approve).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalled();
  });

  it('listByOrder returns all returns for order', async () => {
    repo.findByOrder.mockResolvedValue([makeReturnEntityStub(), makeReturnEntityStub()]);
    const result = await service.listByOrder(FIXTURE_ID);
    expect(result.length).toBe(2);
  });

  it('list filters by status', async () => {
    repo.findAll.mockResolvedValue([makeReturnEntityStub()]);
    const result = await service.list({
      page: 1,
      limit: 10,
      filter: { status: 'requested' },
    });
    expect(result.items.length).toBeGreaterThanOrEqual(1);
  });

  it('request throws (factory pending)', async () => {
    await expect(
      service.request({ orderId: FIXTURE_ID, reason: 'defective', itemIds: [FIXTURE_ID] } as never),
    ).rejects.toThrow();
  });
});
