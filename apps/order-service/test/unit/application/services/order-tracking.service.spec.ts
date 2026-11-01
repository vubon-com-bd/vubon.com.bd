/**
 * OrderTrackingService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderTrackingService } from '@application/services/impl/order-tracking.service.js';
import type { OrderTrackingRepository } from '@domain/repositories/order-tracking.repository.interface.js';
import { TrackingNotFoundApplicationError } from '@application/errors/tracking.errors.js';
import {
  makeTrackingEntityStub,
  FIXTURE_ID,
  FIXTURE_ID_2,
} from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<OrderTrackingRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findByOrder: jest.fn(),
    findByTrackingNumber: jest.fn(),
    findLatestByOrder: jest.fn(),
    findByStatus: jest.fn(),
  } as unknown as jest.Mocked<OrderTrackingRepository>;
}

describe('OrderTrackingService', () => {
  let service: OrderTrackingService;
  let repo: jest.Mocked<OrderTrackingRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new OrderTrackingService(repo);
  });

  describe('add', () => {
    it('throws TrackingNotFound (factory pending)', async () => {
      await expect(service.add({ orderId: FIXTURE_ID } as never)).rejects.toThrow(
        TrackingNotFoundApplicationError,
      );
    });
  });

  describe('getById', () => {
    it('returns DTO', async () => {
      repo.findByIdVO.mockResolvedValue(makeTrackingEntityStub());
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        TrackingNotFoundApplicationError,
      );
    });
  });

  describe('getSummaryByOrder', () => {
    it('builds summary', async () => {
      repo.findByOrder.mockResolvedValue([makeTrackingEntityStub()]);
      const result = await service.getSummaryByOrder(FIXTURE_ID_2);
      expect(result.orderId).toBe(FIXTURE_ID_2);
      expect(result.events.length).toBe(1);
    });
  });

  describe('listByOrder', () => {
    it('returns list', async () => {
      repo.findByOrder.mockResolvedValue([makeTrackingEntityStub()]);
      const result = await service.listByOrder(FIXTURE_ID_2);
      expect(result.items.length).toBe(1);
    });
  });

  describe('listByTrackingNumber', () => {
    it('returns list', async () => {
      repo.findByTrackingNumber.mockResolvedValue([makeTrackingEntityStub()]);
      const result = await service.listByTrackingNumber('TRK-ABCD1234');
      expect(result.items.length).toBe(1);
    });
  });

  describe('update', () => {
    it('loads then saves', async () => {
      repo.findByIdVO.mockResolvedValue(makeTrackingEntityStub());
      repo.save.mockResolvedValue(makeTrackingEntityStub());
      await service.update({ trackingId: FIXTURE_ID } as never);
      expect(repo.save).toHaveBeenCalled();
    });
  });
});
