import { jest } from '@jest/globals';
import { VendorCommissionService } from '../../../../src/module/application/services/impl/vendor-commission.service.js';
import type { VendorCommissionRepository } from '../../../../src/module/domain/repositories/vendor-commission.repository.interface.js';
import { VendorCommissionEntity } from '../../../../src/module/domain/entities/vendor-commission.entity.js';
import { CommissionPercentVO } from '../../../../src/module/domain/value-objects/primitives/commission-percent.vo.js';
import { CommissionConfigNotFoundError } from '../../../../src/module/application/errors/commission.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeCommission(): VendorCommissionEntity {
  return VendorCommissionEntity.create({
    id: UUID,
    vendorId: UUID,
    type: 'percentage',
    percent: CommissionPercentVO.create(10),
    currency: 'BDT',
    minPercent: 0,
    maxPercent: 50,
    applyOnShipping: false,
    applyOnTax: false,
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorCommissionRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findActiveByVendorId: jest.fn(),
    findActiveAt: jest.fn(),
    findByType: jest.fn(),
    findHistoryByVendorId: jest.fn(),
    findExpiredButActive: jest.fn(),
    findVendorsWithoutConfig: jest.fn(),
    getAveragePercent: jest.fn(),
    countActiveByVendor: jest.fn(),
    deactivateAllForVendor: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorCommissionRepository>;
}

describe('VendorCommissionService', () => {
  let service: VendorCommissionService;
  let repo: jest.Mocked<VendorCommissionRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorCommissionService(repo);
  });

  describe('configure()', () => {
    it('creates config and saves', async () => {
      const c = makeCommission();
      repo.save.mockResolvedValue(c);
      const r = await service.configure({
        vendorId: UUID,
        type: 'percentage',
        percent: 10,
        currency: 'BDT',
        applyOnShipping: false,
        applyOnTax: false,
      });
      expect(r.id).toBe(UUID);
    });
  });

  describe('calculate()', () => {
    it('returns breakdown for active config', async () => {
      const c = makeCommission();
      repo.findActiveByVendorId.mockResolvedValue(c);
      const r = await service.calculate({
        vendorId: UUID,
        orderAmount: 1000,
        currency: 'BDT',
      });
      expect(r.totalCommission).toBe(100);
      expect(r.vendorEarning).toBe(900);
    });

    it('throws when no active config', async () => {
      repo.findActiveByVendorId.mockResolvedValue(null);
      await expect(
        service.calculate({ vendorId: UUID, orderAmount: 1000, currency: 'BDT' }),
      ).rejects.toThrow(CommissionConfigNotFoundError);
    });
  });

  describe('activate()', () => {
    it('activates commission', async () => {
      const c = makeCommission();
      c.deactivate(NOW);
      repo.findById.mockResolvedValue(c);
      repo.save.mockResolvedValue(c);
      const r = await service.activate(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('deactivate()', () => {
    it('deactivates commission', async () => {
      const c = makeCommission();
      repo.findById.mockResolvedValue(c);
      repo.save.mockResolvedValue(c);
      const r = await service.deactivate(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns commission', async () => {
      repo.findById.mockResolvedValue(makeCommission());
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow(CommissionConfigNotFoundError);
    });
  });

  describe('getActiveByVendorId()', () => {
    it('returns active', async () => {
      repo.findActiveByVendorId.mockResolvedValue(makeCommission());
      const r = await service.getActiveByVendorId(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when none active', async () => {
      repo.findActiveByVendorId.mockResolvedValue(null);
      await expect(service.getActiveByVendorId(UUID)).rejects.toThrow(
        CommissionConfigNotFoundError,
      );
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeCommission()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});
