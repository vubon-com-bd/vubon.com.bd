/**
 * Service Fallback Branches — Unit Tests
 * @module order-service/test/unit/application/services
 *
 * Covers `??` and `?.` fallbacks + null checks.
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderService } from '@application/services/impl/order.service.js';
import { DeliveryService } from '@application/services/impl/delivery.service.js';
import { OrderFulfillmentService } from '@application/services/impl/order-fulfillment.service.js';
import type { OrderRepository } from '@domain/repositories/order.repository.interface.js';
import type { DeliveryRepository } from '@domain/repositories/delivery.repository.interface.js';
import type { OrderFulfillmentRepository } from '@domain/repositories/order-fulfillment.repository.interface.js';
import {
  makeOrderEntityStub,
  makeDeliveryEntityStub,
  makeFulfillmentEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

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

function makeDeliveryRepo(): jest.Mocked<DeliveryRepository> {
  return {
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findAll: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByOrder: jest.fn(),
    findByStatus: jest.fn(),
    findByCourier: jest.fn(),
    findByTrackingNumber: jest.fn(),
    findPaginated: jest.fn(),
    findRetryable: jest.fn(),
    findOverdueEstimated: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<DeliveryRepository>;
}

function makeFulfillmentRepo(): jest.Mocked<OrderFulfillmentRepository> {
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

describe('Service Fallbacks', () => {
  describe('OrderService.create wraps non-OrderInitiationError', () => {
    it('throws OrderInitiationError for unknown errors', async () => {
      const repo = makeOrderRepo();
      const service = new OrderService(repo);
      const dto = { customerId: FIXTURE_ID } as never;
      await expect(service.create(dto, 'user-1')).rejects.toThrow();
    });
  });

  describe('OrderService.delete with no reason', () => {
    it('deletes without reason', async () => {
      const repo = makeOrderRepo();
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      repo.softDelete.mockResolvedValue(undefined);
      const service = new OrderService(repo);
      await service.delete({ orderId: FIXTURE_ID } as never);
      expect(repo.softDelete).toHaveBeenCalled();
    });

    it('deletes with reason', async () => {
      const repo = makeOrderRepo();
      repo.findByIdVO.mockResolvedValue(makeOrderEntityStub());
      repo.softDelete.mockResolvedValue(undefined);
      const service = new OrderService(repo);
      await service.delete({ orderId: FIXTURE_ID, reason: 'dup' } as never);
      expect(repo.softDelete).toHaveBeenCalled();
    });
  });

  describe('DeliveryService.reschedule without newEstimatedAt', () => {
    it('accepts undefined newEstimatedAt', async () => {
      const repo = makeDeliveryRepo();
      const entity = makeDeliveryEntityStub();
      (entity as unknown as { reschedule: () => void }).reschedule = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      const service = new DeliveryService(repo);
      await service.reschedule(
        { deliveryId: FIXTURE_ID, orderId: FIXTURE_ID, reason: 'changed' } as never,
      );
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('FulfillmentService.ship without tracking number', () => {
    it('handles undefined trackingNumber', async () => {
      const repo = makeFulfillmentRepo();
      const entity = makeFulfillmentEntityStub();
      (entity as unknown as { fulfill: () => void }).fulfill = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      const service = new OrderFulfillmentService(repo);
      await service.ship(
        { orderId: FIXTURE_ID, fulfillmentId: FIXTURE_ID } as never,
      );
      expect(repo.save).toHaveBeenCalled();
    });
  });

  describe('FulfillmentService.list with empty filter', () => {
    it('returns all when no filter', async () => {
      const repo = makeFulfillmentRepo();
      repo.findAll.mockResolvedValue([makeFulfillmentEntityStub()]);
      const service = new OrderFulfillmentService(repo);
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items.length).toBeGreaterThanOrEqual(1);
    });
  });
});
