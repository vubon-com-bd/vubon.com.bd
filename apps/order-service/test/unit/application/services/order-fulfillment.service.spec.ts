/**
 * OrderFulfillmentService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderFulfillmentService } from '@application/services/impl/order-fulfillment.service.js';
import type { OrderFulfillmentRepository } from '@domain/repositories/order-fulfillment.repository.interface.js';
import { FulfillmentNotFoundApplicationError } from '@application/errors/fulfillment.errors.js';
import {
  makeFulfillmentEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderFulfillmentRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrder: jest.fn(),
    findByVendor: jest.fn(),
    findByStatus: jest.fn(),
    findAwaitingFulfillment: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<OrderFulfillmentRepository>;
}

describe('OrderFulfillmentService', () => {
  let service: OrderFulfillmentService;
  let repo: jest.Mocked<OrderFulfillmentRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new OrderFulfillmentService(repo);
  });

  describe('start', () => {
    it('throws FulfillmentNotFound (factory pending)', async () => {
      await expect(service.start({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        FulfillmentNotFoundApplicationError,
      );
    });
  });

  describe('ship', () => {
    it('throws when fulfillmentId missing', async () => {
      await expect(service.ship({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        FulfillmentNotFoundApplicationError,
      );
    });

    it('calls entity.fulfill', async () => {
      const entity = makeFulfillmentEntityStub();
      (entity as unknown as { fulfill: () => void }).fulfill = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.ship({
        orderId: FIXTURE_ID,
        fulfillmentId: FIXTURE_ID,
        trackingNumber: 'TRK-123',
      } as never);
      expect((entity as unknown as { fulfill: () => void }).fulfill).toHaveBeenCalledWith('TRK-123');
    });
  });

  describe('getById', () => {
    it('throws NotFound', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        FulfillmentNotFoundApplicationError,
      );
    });
  });

  describe('listByOrder', () => {
    it('returns array', async () => {
      repo.findByOrder.mockResolvedValue([makeFulfillmentEntityStub()]);
      const result = await service.listByOrder(FIXTURE_ID);
      expect(result.length).toBe(1);
    });
  });

  describe('list', () => {
    it('filters and paginates', async () => {
      repo.findAll.mockResolvedValue([makeFulfillmentEntityStub()]);
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items.length).toBeGreaterThanOrEqual(1);
    });
  });
});
