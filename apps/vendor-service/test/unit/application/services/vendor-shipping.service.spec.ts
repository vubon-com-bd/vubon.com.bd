import { jest } from '@jest/globals';
import { VendorShippingService } from '../../../../src/module/application/services/impl/vendor-shipping.service.js';
import type { VendorShippingRepository } from '../../../../src/module/domain/repositories/vendor-shipping.repository.interface.js';
import { VendorShippingEntity } from '../../../../src/module/domain/entities/vendor-shipping.entity.js';
import { ShippingMethodVO } from '../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeShipping(): VendorShippingEntity {
  return VendorShippingEntity.create({
    id: UUID,
    vendorId: UUID,
    defaultMethod: ShippingMethodVO.create('standard'),
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorShippingRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findSupportingZone: jest.fn(),
    findSupportingMethod: jest.fn(),
    findSameDaySupport: jest.fn(),
    findWithFreeShipping: jest.fn(),
    findWithoutActiveRates: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorShippingRepository>;
}

describe('VendorShippingService', () => {
  let service: VendorShippingService;
  let repo: jest.Mocked<VendorShippingRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorShippingService(repo);
  });

  describe('initialize()', () => {
    it('returns existing config', async () => {
      repo.findByVendorId.mockResolvedValue(makeShipping());
      const r = await service.initialize(UUID, 'standard');
      expect(r.vendorId).toBe(UUID);
    });

    it('creates when not exists', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      repo.upsert.mockResolvedValue(makeShipping());
      const r = await service.initialize(UUID, 'standard');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('addRate()', () => {
    it('adds rate to existing config', async () => {
      repo.findByVendorId.mockResolvedValue(makeShipping());
      repo.upsert.mockResolvedValue(makeShipping());
      const r = await service.addRate({
        vendorId: UUID,
        method: 'standard',
        zone: 'inside_city',
        cost: 100,
        currency: 'BDT',
        minDeliveryDays: 1,
        maxDeliveryDays: 3,
      });
      expect(r.vendorId).toBe(UUID);
    });

    it('throws when not initialized', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(
        service.addRate({
          vendorId: UUID,
          method: 'standard',
          zone: 'inside_city',
          cost: 100,
          currency: 'BDT',
          minDeliveryDays: 1,
          maxDeliveryDays: 3,
        }),
      ).rejects.toThrow();
    });
  });

  describe('removeRate()', () => {
    it('removes non-default rate', async () => {
      const s = makeShipping();
      s.addRate({
        method: ShippingMethodVO.create('express'),
        zone: { value: 'inside_city', equals: () => false } as never,
        cost: { amount: 150, currency: 'BDT', isFree: () => false, calculateForOrder: () => 150 } as never,
        deliveryDays: { min: 1, max: 2 } as never,
        isActive: true,
      });
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.removeRate(UUID, 'express', 'inside_city');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('setFreeShippingThreshold()', () => {
    it('sets threshold', async () => {
      const s = makeShipping();
      repo.findByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.setFreeShippingThreshold(UUID, 1000);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('calculateShipping()', () => {
    it('returns cost from cheapest rate', async () => {
      const s = makeShipping();
      s.addRate({
        method: ShippingMethodVO.create('standard'),
        zone: { value: 'inside_city', equals: () => false } as never,
        cost: { amount: 60, currency: 'BDT', isFree: () => false, calculateForOrder: () => 60 } as never,
        deliveryDays: { min: 1, max: 3 } as never,
        isActive: true,
      });
      repo.findByVendorId.mockResolvedValue(s);
      const cost = await service.calculateShipping(UUID, 'inside_city', 500);
      expect(cost).toBe(60);
    });
  });

  describe('getByVendorId()', () => {
    it('returns config', async () => {
      repo.findByVendorId.mockResolvedValue(makeShipping());
      const r = await service.getByVendorId(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow();
    });
  });
});
