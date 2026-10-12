import { jest } from '@jest/globals';
import { VendorSettlementService } from '../../../../src/module/application/services/impl/vendor-settlement.service.js';
import type { VendorSettlementRepository } from '../../../../src/module/domain/repositories/vendor-settlement.repository.interface.js';
import { VendorSettlementEntity } from '../../../../src/module/domain/entities/vendor-settlement.entity.js';
import { SettlementAmountVO } from '../../../../src/module/domain/value-objects/primitives/settlement-amount.vo.js';
import { CommissionAmountVO } from '../../../../src/module/domain/value-objects/primitives/commission-amount.vo.js';
import { SettlementNotFoundError } from '../../../../src/module/application/errors/payout.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const END = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

function makeSettlement(): VendorSettlementEntity {
  return VendorSettlementEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      settlementNumber: 'ST-TEST-000001',
      grossAmount: SettlementAmountVO.create(10000, 'BDT'),
      commissionAmount: CommissionAmountVO.create(1000, 'BDT'),
      netAmount: SettlementAmountVO.create(9000, 'BDT'),
      periodStart: NOW,
      periodEnd: END,
      orderCount: 5,
    },
  });
}

function makeRepoMock(): jest.Mocked<VendorSettlementRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findByNumber: jest.fn(),
    findByPayoutId: jest.fn(),
    search: jest.fn(),
    findPendingReady: jest.fn(),
    findProcessingPastSla: jest.fn(),
    findLatestByVendorId: jest.fn(),
    sumNetBetween: jest.fn(),
    countByStatus: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorSettlementRepository>;
}

describe('VendorSettlementService', () => {
  let service: VendorSettlementService;
  let repo: jest.Mocked<VendorSettlementRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSettlementService(repo);
  });

  describe('create()', () => {
    it('creates + saves settlement', async () => {
      const s = makeSettlement();
      repo.save.mockResolvedValue(s);
      const result = await service.create({
        vendorId: UUID,
        periodStart: NOW,
        periodEnd: END,
        grossAmount: 10000,
        commissionAmount: 1000,
        netAmount: 9000,
        currency: 'BDT',
        orderCount: 5,
      });
      expect(result.id).toBe(UUID);
    });
  });

  describe('startProcessing()', () => {
    it('moves to processing', async () => {
      const s = makeSettlement();
      repo.findById.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const result = await service.startProcessing(UUID);
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.startProcessing(UUID)).rejects.toThrow(SettlementNotFoundError);
    });
  });

  describe('complete()', () => {
    it('completes processing settlement', async () => {
      const s = makeSettlement();
      s.startProcessing(NOW);
      repo.findById.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const result = await service.complete({ settlementId: UUID, payoutId: UUID, completedBy: UUID });
      expect(result.id).toBe(UUID);
    });
  });

  describe('fail()', () => {
    it('fails settlement', async () => {
      const s = makeSettlement();
      repo.findById.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const result = await service.fail(UUID, 'bank error');
      expect(result.id).toBe(UUID);
    });
  });

  describe('cancel()', () => {
    it('cancels settlement', async () => {
      const s = makeSettlement();
      repo.findById.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const result = await service.cancel(UUID);
      expect(result.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns settlement', async () => {
      repo.findById.mockResolvedValue(makeSettlement());
      const result = await service.getById(UUID);
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow(SettlementNotFoundError);
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeSettlement()]);
      const result = await service.listByVendor(UUID);
      expect(result).toHaveLength(1);
    });
  });
});
