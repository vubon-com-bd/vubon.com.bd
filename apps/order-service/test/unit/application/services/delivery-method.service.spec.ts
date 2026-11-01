/**
 * DeliveryMethodService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryMethodService } from '@application/services/impl/delivery-method.service.js';
import type { DeliveryMethodRepository } from '@domain/repositories/delivery-method.repository.interface.js';
import { DeliveryMethodNotFoundApplicationError } from '@application/errors/delivery.errors.js';
import {
  makeDeliveryMethodEntityStub,
  FIXTURE_ID,
} from '@fixtures/application/entity-factories.js';

function makeRepo(): jest.Mocked<DeliveryMethodRepository> {
  return {
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findByIdVO: jest.fn(),
    findActive: jest.fn(),
    findByType: jest.fn(),
    findFree: jest.fn(),
    findFast: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as jest.Mocked<DeliveryMethodRepository>;
}

describe('DeliveryMethodService', () => {
  let service: DeliveryMethodService;
  let repo: jest.Mocked<DeliveryMethodRepository>;

  beforeEach(() => {
    repo = makeRepo();
    service = new DeliveryMethodService(repo);
  });

  describe('getById', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(makeDeliveryMethodEntityStub() as never);
      const result = await service.getById(FIXTURE_ID);
      expect(result.id).toBe(FIXTURE_ID);
    });

    it('throws NotFound', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(FIXTURE_ID)).rejects.toThrow(
        DeliveryMethodNotFoundApplicationError,
      );
    });
  });

  describe('listActive', () => {
    it('returns active methods', async () => {
      repo.findActive.mockResolvedValue([makeDeliveryMethodEntityStub() as never]);
      const result = await service.listActive();
      expect(result.length).toBe(1);
    });
  });

  describe('listAll', () => {
    it('returns all methods', async () => {
      repo.findAll.mockResolvedValue([makeDeliveryMethodEntityStub() as never]);
      const result = await service.listAll();
      expect(result.length).toBe(1);
    });
  });
});
