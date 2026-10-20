/**
 * OrderItemService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderItemService } from '@application/services/impl/order-item.service.js';
import type { OrderItemRepository } from '@domain/repositories/order-item.repository.interface.js';
import { OrderItemNotFoundApplicationError } from '@application/errors/order-item.errors.js';
import { makeOrderItemEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderItemRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrder: jest.fn(),
    findByProduct: jest.fn(),
    findByVendor: jest.fn(),
    findByStatus: jest.fn(),
    findByOrderAndStatus: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderItemRepository>;
}

describe('OrderItemService', () => {
  let service: OrderItemService;
  let repo: jest.Mocked<OrderItemRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new OrderItemService(repo);
  });

  describe('getById', () => {
    it('returns DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderItemEntityStub());
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(OrderItemNotFoundApplicationError);
    });
  });

  describe('listByOrder', () => {
    it('returns list', async () => {
      repo.findByOrder.mockResolvedValue([makeOrderItemEntityStub()]);
      const result = await service.listByOrder(FIXTURE_ID);
      expect(result.items.length).toBe(1);
    });
  });

  describe('remove', () => {
    it('soft deletes', async () => {
      await service.remove({ itemId: FIXTURE_ID } as never, 'admin');
      expect(repo.softDelete).toHaveBeenCalledWith(FIXTURE_ID, 'admin');
    });
  });

  describe('update', () => {
    it('loads then saves', async () => {
      repo.findByIdVO.mockResolvedValue(makeOrderItemEntityStub());
      repo.save.mockResolvedValue(makeOrderItemEntityStub());
      await service.update({ itemId: FIXTURE_ID } as never);
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
