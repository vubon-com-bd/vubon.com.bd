import { jest } from '@jest/globals';
import { VendorReturnPolicyService } from '../../../../src/module/application/services/impl/vendor-return-policy.service.js';
import type { VendorReturnPolicyRepository } from '../../../../src/module/domain/repositories/vendor-return-policy.repository.interface.js';
import { VendorReturnPolicyEntity } from '../../../../src/module/domain/entities/vendor-return-policy.entity.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makePolicy(): VendorReturnPolicyEntity {
  return VendorReturnPolicyEntity.create({ id: UUID, vendorId: UUID, now: NOW });
}

function makeRepoMock(): jest.Mocked<VendorReturnPolicyRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findNoReturnPolicies: jest.fn(),
    findGenerousPolicies: jest.fn(),
    findRequiringImages: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorReturnPolicyRepository>;
}

describe('VendorReturnPolicyService', () => {
  let service: VendorReturnPolicyService;
  let repo: jest.Mocked<VendorReturnPolicyRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorReturnPolicyService(repo);
  });

  describe('initialize()', () => {
    it('returns existing', async () => {
      repo.findByVendorId.mockResolvedValue(makePolicy());
      const r = await service.initialize(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('creates when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      repo.upsert.mockResolvedValue(makePolicy());
      const r = await service.initialize(UUID);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateType()', () => {
    it('updates type', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      repo.upsert.mockResolvedValue(p);
      const r = await service.updateType(UUID, 'exchange_only');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('updateWindow()', () => {
    it('updates window days', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      repo.upsert.mockResolvedValue(p);
      const r = await service.updateWindow(UUID, 14);
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('addExclusion()', () => {
    it('adds exclusion', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      repo.upsert.mockResolvedValue(p);
      const r = await service.addExclusion(UUID, 'custom-made');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('removeExclusion()', () => {
    it('removes exclusion', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      repo.upsert.mockResolvedValue(p);
      const r = await service.removeExclusion(UUID, 'custom-made');
      expect(r.vendorId).toBe(UUID);
    });
  });

  describe('canReturn()', () => {
    it('returns bool', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      const r = await service.canReturn(UUID, NOW);
      expect(typeof r).toBe('boolean');
    });
  });

  describe('calculateRestockFee()', () => {
    it('returns number', async () => {
      const p = makePolicy();
      repo.findByVendorId.mockResolvedValue(p);
      const r = await service.calculateRestockFee(UUID, 1000);
      expect(typeof r).toBe('number');
    });
  });

  describe('getByVendorId()', () => {
    it('returns policy', async () => {
      repo.findByVendorId.mockResolvedValue(makePolicy());
      const r = await service.getByVendorId(UUID);
      expect(r.vendorId).toBe(UUID);
    });

    it('throws when missing', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow();
    });
  });
});
