import { jest } from '@jest/globals';
import { VendorWarrantyService } from '../../../../src/module/application/services/impl/vendor-warranty.service.js';
import type { VendorWarrantyRepository } from '../../../../src/module/domain/repositories/vendor-warranty.repository.interface.js';
import { VendorWarrantyEntity } from '../../../../src/module/domain/entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../../../../src/module/domain/value-objects/primitives/warranty-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeWarranty(): VendorWarrantyEntity {
  return VendorWarrantyEntity.create({ id: UUID, vendorId: UUID, now: NOW });
}

function makeRepoMock(): jest.Mocked<VendorWarrantyRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findWithNoWarranty: jest.fn(),
    findByType: jest.fn(),
    findCoveringShipping: jest.fn(),
    findLongTermWarranty: jest.fn(),
    findWithExclusions: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorWarrantyRepository>;
}

describe('VendorWarrantyService', () => {
  let service: VendorWarrantyService;
  let repo: jest.Mocked<VendorWarrantyRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorWarrantyService(repo);
  });

  describe('initialize()', () => {
    it('returns existing', async () => {
      repo.findByVendorId.mockResolvedValue(makeWarranty());
      const r = await service.initialize(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('creates when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      repo.upsert.mockResolvedValue(makeWarranty());
      const r = await service.initialize(UUID);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateType()', () => {
    it('updates warranty type', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      repo.upsert.mockResolvedValue(w);
      const r = await service.updateType(UUID, 'manufacturer');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updatePeriod()', () => {
    it('updates warranty period', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      repo.upsert.mockResolvedValue(w);
      const r = await service.updatePeriod(UUID, 90);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateTerms()', () => {
    it('updates terms', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      repo.upsert.mockResolvedValue(w);
      const r = await service.updateTerms(UUID, 'Warranty terms text');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('addExclusion()', () => {
    it('adds exclusion', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      repo.upsert.mockResolvedValue(w);
      const r = await service.addExclusion(UUID, 'water damage');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('removeExclusion()', () => {
    it('removes exclusion', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      repo.upsert.mockResolvedValue(w);
      const r = await service.removeExclusion(UUID, 'water damage');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('calculateExpiry()', () => {
    it('returns expiry ISO string', async () => {
      const w = makeWarranty();
      repo.findByVendorId.mockResolvedValue(w);
      const r = await service.calculateExpiry(UUID, NOW);
      expect(typeof r).toBe('string');
      expect(Number.isNaN(Date.parse(r))).toBe(false);
    });
  });

  describe('getByVendorId()', () => {
    it('returns warranty', async () => {
      repo.findByVendorId.mockResolvedValue(makeWarranty());
      const r = await service.getByVendorId(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('throws when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow();
    });
  });
});
