/**
 * DeliveryMethodService tests
 */
import { jest } from '@jest/globals';
import { DeliveryMethodService } from '../../../../src/module/application/services/impl/delivery-method.service.js';
import { DeliveryMethodEntity } from '../../../../src/module/domain/entities/delivery-method.entity.js';
import { DeliveryMethodTypeVO } from '../../../../src/module/domain/value-objects/primitives/delivery-method-type.vo.js';
import { DeliveryMethodNotFoundApplicationError } from '../../../../src/module/application/errors/delivery.errors.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_METHOD = 'mmmmmmmm-mmmm-4mmm-8mmm-mmmmmmmmmmmm';

function makeMethod(active = true, type = 'standard', cost = 50): DeliveryMethodEntity {
  const days = type === 'express' || type === 'same_day' || type === 'next_day' ? 1 : 3;
  return DeliveryMethodEntity.create({
    id: UUID_METHOD,
    now: NOW,
    props: {
      name: 'Standard Delivery',
      type: DeliveryMethodTypeVO.create(type),
      baseCost: cost,
      currency: 'BDT',
      estimatedDays: days,
      isActive: active,
    },
  });
}

function makeMockRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByName: jest.fn().mockResolvedValue(null),
    findByType: jest.fn().mockResolvedValue([]),
    findActive: jest.fn().mockResolvedValue([]),
    findActiveByType: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    existsByName: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (m: DeliveryMethodEntity) => m),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('DeliveryMethodService', () => {
  let repo: ReturnType<typeof makeMockRepo>;
  let service: DeliveryMethodService;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new DeliveryMethodService(repo as never);
  });

  describe('getById()', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(makeMethod());
      const result = await service.getById(UUID_METHOD);
      expect(result.id).toBe(UUID_METHOD);
      expect(result.name).toBe('Standard Delivery');
      expect(result.isFree).toBe(false);
    });

    it('throws when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(DeliveryMethodNotFoundApplicationError);
    });
  });

  describe('listAll()', () => {
    it('returns all methods', async () => {
      repo.findAll.mockResolvedValue([makeMethod(), makeMethod(false)]);
      const result = await service.listAll();
      expect(result).toHaveLength(2);
    });
  });

  describe('listActive()', () => {
    it('returns only active', async () => {
      repo.findActive.mockResolvedValue([makeMethod(true)]);
      const result = await service.listActive();
      expect(result).toHaveLength(1);
    });
  });

  describe('listByType()', () => {
    it('delegates to findByType', async () => {
      repo.findByType.mockResolvedValue([makeMethod(true, 'express', 100)]);
      const result = await service.listByType('express');
      expect(result).toHaveLength(1);
      expect(result[0].isFast).toBe(true);
    });
  });
});
