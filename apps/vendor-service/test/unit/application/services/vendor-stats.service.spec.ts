import { jest } from '@jest/globals';
import { VendorStatsService } from '../../../../src/module/application/services/impl/vendor-stats.service.js';
import type { VendorStatsRepository } from '../../../../src/module/domain/repositories/vendor-stats.repository.interface.js';
import { VendorStatsEntity } from '../../../../src/module/domain/entities/vendor-stats.entity.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const END = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

function makeStats(): VendorStatsEntity {
  return VendorStatsEntity.create({
    id: UUID,
    vendorId: UUID,
    periodStart: NOW,
    periodEnd: END,
    currency: 'BDT',
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorStatsRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findLatestByVendorId: jest.fn(),
    findByVendorIdAndDate: jest.fn(),
    findByVendorIdBetween: jest.fn(),
    findTopByRevenue: jest.fn(),
    findDecliningVendors: jest.fn(),
    findHighCancellationRate: jest.fn(),
    findHighRefundRate: jest.fn(),
    sumRevenueBetween: jest.fn(),
    sumCommissionBetween: jest.fn(),
    sumPayoutBetween: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorStatsRepository>;
}

describe('VendorStatsService', () => {
  let service: VendorStatsService;
  let repo: jest.Mocked<VendorStatsRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorStatsService(repo);
  });

  describe('initializePeriod()', () => {
    it('creates + saves', async () => {
      repo.upsert.mockResolvedValue(makeStats());
      const r = await service.initializePeriod(UUID, NOW, END, 'BDT');
      expect(r.id).toBe(UUID);
    });
  });

  describe('recordOrder()', () => {
    it('records order', async () => {
      const s = makeStats();
      repo.findLatestByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.recordOrder(UUID, 1000);
      expect(r.id).toBe(UUID);
    });

    it('throws when no record', async () => {
      repo.findLatestByVendorId.mockResolvedValue(null);
      await expect(service.recordOrder(UUID, 1000)).rejects.toThrow();
    });
  });

  describe('recordRefund()', () => {
    it('records refund', async () => {
      const s = makeStats();
      repo.findLatestByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.recordRefund(UUID, 100);
      expect(r.id).toBe(UUID);
    });
  });

  describe('recordPayout()', () => {
    it('records payout', async () => {
      const s = makeStats();
      repo.findLatestByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.recordPayout(UUID, 700);
      expect(r.id).toBe(UUID);
    });
  });

  describe('recordCancellation()', () => {
    it('records cancellation', async () => {
      const s = makeStats();
      repo.findLatestByVendorId.mockResolvedValue(s);
      repo.upsert.mockResolvedValue(s);
      const r = await service.recordCancellation(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('getLatestByVendorId()', () => {
    it('returns latest', async () => {
      repo.findLatestByVendorId.mockResolvedValue(makeStats());
      const r = await service.getLatestByVendorId(UUID);
      expect(r?.id).toBe(UUID);
    });

    it('returns null when none', async () => {
      repo.findLatestByVendorId.mockResolvedValue(null);
      const r = await service.getLatestByVendorId(UUID);
      expect(r).toBeNull();
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeStats()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});
