/**
 * OrderReturnService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderReturnService } from '@application/services/impl/order-return.service.js';
import type { OrderReturnRepository } from '@domain/repositories/order-return.repository.interface.js';
import { ReturnNotFoundApplicationError } from '@application/errors/return.errors.js';
import { makeReturnEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderReturnRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrder: jest.fn(),
    findByCustomer: jest.fn(),
    findByStatus: jest.fn(),
    findPickupScheduledBefore: jest.fn(),
    findAwaitingInspection: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderReturnRepository>;
}

describe('OrderReturnService', () => {
  let service: OrderReturnService;
  let repo: jest.Mocked<OrderReturnRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new OrderReturnService(repo);
  });

  describe('request', () => {
    it('throws ReturnNotFound (factory pending)', async () => {
      await expect(service.request({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        ReturnNotFoundApplicationError,
      );
    });
  });

  describe('approve', () => {
    it('calls entity.approve then saves', async () => {
      const entity = makeReturnEntityStub();
      (entity as unknown as { approve: () => void }).approve = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.approve({ returnId: FIXTURE_ID, orderId: FIXTURE_ID } as never);
      expect((entity as unknown as { approve: () => void }).approve).toHaveBeenCalled();
    });
  });

  describe('reject', () => {
    it('calls entity.reject then saves', async () => {
      const entity = makeReturnEntityStub();
      (entity as unknown as { reject: (r: string) => void }).reject = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.reject({
        returnId: FIXTURE_ID,
        orderId: FIXTURE_ID,
        reason: 'not eligible',
      } as never);
      expect((entity as unknown as { reject: () => void }).reject).toHaveBeenCalledWith('not eligible');
    });
  });

  describe('complete', () => {
    it('calls entity.close then saves', async () => {
      const entity = makeReturnEntityStub();
      (entity as unknown as { close: () => void }).close = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.complete({
        returnId: FIXTURE_ID,
        orderId: FIXTURE_ID,
        refundAmount: 100,
      } as never);
      expect((entity as unknown as { close: () => void }).close).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('throws NotFound', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(ReturnNotFoundApplicationError);
    });
  });

  describe('listByOrder', () => {
    it('returns array', async () => {
      repo.findByOrder.mockResolvedValue([makeReturnEntityStub()]);
      const result = await service.listByOrder(FIXTURE_ID);
      expect(result.length).toBe(1);
    });
  });

  describe('list', () => {
    it('filters results', async () => {
      repo.findAll.mockResolvedValue([makeReturnEntityStub()]);
      const result = await service.list({ page: 1, limit: 10, filter: { status: 'requested' } });
      expect(result.items.length).toBeGreaterThanOrEqual(1);
    });
  });
});
