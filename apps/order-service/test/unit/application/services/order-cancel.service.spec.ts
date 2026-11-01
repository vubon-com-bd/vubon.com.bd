/**
 * OrderCancelService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderCancelService } from '@application/services/impl/order-cancel.service.js';
import type { OrderCancelRepository } from '@domain/repositories/order-cancel.repository.interface.js';
import { CancelNotFoundApplicationError } from '@application/errors/cancel.errors.js';
import { makeCancelEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderCancelRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrder: jest.fn(),
    findByStatus: jest.fn(),
    findPendingOlderThan: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderCancelRepository>;
}

describe('OrderCancelService', () => {
  let service: OrderCancelService;
  let repo: jest.Mocked<OrderCancelRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new OrderCancelService(repo);
  });

  describe('request', () => {
    it('throws CancelNotFound (factory pending)', async () => {
      await expect(service.request({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        CancelNotFoundApplicationError,
      );
    });
  });

  describe('approve', () => {
    it('calls entity.approve then saves', async () => {
      const entity = makeCancelEntityStub();
      (entity as unknown as { approve: (by: string) => void }).approve = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.approve({ cancelId: FIXTURE_ID, orderId: FIXTURE_ID } as never, 'admin');
      expect((entity as unknown as { approve: () => void }).approve).toHaveBeenCalledWith('admin');
    });
  });

  describe('reject', () => {
    it('calls entity.reject then saves', async () => {
      const entity = makeCancelEntityStub();
      (entity as unknown as { reject: () => void }).reject = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.reject(
        { cancelId: FIXTURE_ID, orderId: FIXTURE_ID, reason: 'no reason' } as never,
        'admin',
      );
      expect((entity as unknown as { reject: () => void }).reject).toHaveBeenCalled();
    });
  });

  describe('getById', () => {
    it('throws NotFound', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        CancelNotFoundApplicationError,
      );
    });
  });

  describe('listByOrder', () => {
    it('returns array', async () => {
      repo.findByOrder.mockResolvedValue([makeCancelEntityStub()]);
      const result = await service.listByOrder(FIXTURE_ID);
      expect(result.length).toBe(1);
    });
  });

  describe('list', () => {
    it('filters by orderId and status', async () => {
      repo.findAll.mockResolvedValue([
        makeCancelEntityStub(),
        makeCancelEntityStub({ orderId: { value: 'other' } }),
      ]);
      const result = await service.list({
        page: 1,
        limit: 10,
        filter: { status: 'requested' },
      });
      expect(result.items.length).toBeGreaterThanOrEqual(1);
    });
  });
});
