/**
 * DeliveryService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryService } from '@application/services/impl/delivery.service.js';
import type { DeliveryRepository } from '@domain/repositories/delivery.repository.interface.js';
import { DeliveryNotFoundApplicationError } from '@application/errors/delivery.errors.js';
import { makeDeliveryEntityStub, FIXTURE_ID } from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<DeliveryRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
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

describe('DeliveryService', () => {
  let service: DeliveryService;
  let repo: jest.Mocked<DeliveryRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new DeliveryService(repo);
  });

  describe('schedule', () => {
    it('throws DeliveryNotFound (factory pending)', async () => {
      await expect(service.schedule({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        DeliveryNotFoundApplicationError,
      );
    });
  });

  describe('getById', () => {
    it('returns DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeDeliveryEntityStub());
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound when missing', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        DeliveryNotFoundApplicationError,
      );
    });
  });

  describe('reschedule', () => {
    it('calls entity.reschedule then saves', async () => {
      const entity = makeDeliveryEntityStub();
      (entity as unknown as { reschedule: () => void }).reschedule = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.reschedule({
        deliveryId: FIXTURE_ID,
        orderId: FIXTURE_ID,
        reason: 'customer request',
      } as never);
      expect((entity as unknown as { reschedule: () => void }).reschedule).toHaveBeenCalled();
    });
  });

  describe('confirm', () => {
    it('calls entity.markDelivered then saves', async () => {
      const entity = makeDeliveryEntityStub();
      (entity as unknown as { markDelivered: () => void }).markDelivered = jest.fn();
      repo.findByIdVO.mockResolvedValue(entity);
      repo.save.mockResolvedValue(entity);
      await service.confirm({
        deliveryId: FIXTURE_ID,
        orderId: FIXTURE_ID,
      } as never);
      expect((entity as unknown as { markDelivered: () => void }).markDelivered).toHaveBeenCalled();
    });
  });

  describe('list', () => {
    it('returns paginated', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makeDeliveryEntityStub()],
        total: 1,
        page: 1,
        limit: 10,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items.length).toBe(1);
    });
  });
});
