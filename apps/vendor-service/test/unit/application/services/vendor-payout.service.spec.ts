import { jest } from '@jest/globals';
import { VendorPayoutService } from '../../../../src/module/application/services/impl/vendor-payout.service.js';
import type { VendorPayoutRepository } from '../../../../src/module/domain/repositories/vendor-payout.repository.interface.js';
import { VendorPayoutEntity } from '../../../../src/module/domain/entities/vendor-payout.entity.js';
import { PayoutMethodVO } from '../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutAmountVO } from '../../../../src/module/domain/value-objects/primitives/payout-amount.vo.js';
import { PayoutNotFoundError } from '../../../../src/module/application/errors/payout.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makePayout(): VendorPayoutEntity {
  return VendorPayoutEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      payoutNumber: 'PO-TEST-000001',
      method: PayoutMethodVO.reconstitute('bank_transfer'),
      cycle: PayoutCycleVO.reconstitute('on_demand'),
      amount: PayoutAmountVO.create(5000, 'BDT'),
      netAmount: PayoutAmountVO.create(5000, 'BDT'),
      periodStart: NOW,
      periodEnd: NOW,
      bankAccountId: UUID,
    },
  });
}

function makeRepoMock(): jest.Mocked<VendorPayoutRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findByMethod: jest.fn(),
    findByNumber: jest.fn(),
    findPaginated: jest.fn(),
    search: jest.fn(),
    findActive: jest.fn(),
    findProcessingPastSla: jest.fn(),
    countTodayByVendor: jest.fn(),
    getSummary: jest.fn(),
    sumPaidBetween: jest.fn(),
    countByStatus: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorPayoutRepository>;
}

describe('VendorPayoutService', () => {
  let service: VendorPayoutService;
  let repo: jest.Mocked<VendorPayoutRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorPayoutService(repo);
  });

  describe('request()', () => {
    it('creates + saves payout', async () => {
      const p = makePayout();
      repo.save.mockResolvedValue(p);
      const result = await service.request({
        vendorId: UUID,
        amount: 5000,
        currency: 'BDT',
        bankAccountId: UUID,
        idempotencyKey: 'req-12345678901',
      });
      expect(result.id).toBe(UUID);
    });
  });

  describe('approve()', () => {
    it('approves pending payout', async () => {
      const p = makePayout();
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.approve({ payoutId: UUID, approvedBy: UUID });
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.approve({ payoutId: UUID, approvedBy: UUID })).rejects.toThrow(
        PayoutNotFoundError,
      );
    });
  });

  describe('reject()', () => {
    it('rejects pending payout', async () => {
      const p = makePayout();
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.reject({ payoutId: UUID, rejectedBy: UUID, reason: 'suspect' });
      expect(result.id).toBe(UUID);
    });
  });

  describe('process()', () => {
    it('processes approved payout', async () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.process({ payoutId: UUID, processedBy: UUID });
      expect(result.id).toBe(UUID);
    });
  });

  describe('markPaid()', () => {
    it('marks processing payout paid', async () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.markPaid({
        payoutId: UUID,
        transactionId: 'txn-1',
        paidBy: UUID,
      });
      expect(result.id).toBe(UUID);
    });
  });

  describe('fail()', () => {
    it('fails processing payout', async () => {
      const p = makePayout();
      p.approve(UUID, NOW);
      p.startProcessing(NOW);
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.fail({
        payoutId: UUID,
        reason: 'bank error',
        failedBy: UUID,
      });
      expect(result.id).toBe(UUID);
    });
  });

  describe('cancel()', () => {
    it('cancels pending payout', async () => {
      const p = makePayout();
      repo.findById.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.cancel({ payoutId: UUID, cancelledBy: UUID });
      expect(result.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns payout', async () => {
      repo.findById.mockResolvedValue(makePayout());
      const result = await service.getById(UUID);
      expect(result.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow(PayoutNotFoundError);
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makePayout()]);
      const result = await service.listByVendor(UUID);
      expect(result).toHaveLength(1);
    });
  });

  describe('list()', () => {
    it('returns paginated result', async () => {
      repo.findPaginated.mockResolvedValue({
        items: [makePayout()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 20 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('getSummary()', () => {
    it('returns summary', async () => {
      repo.getSummary.mockResolvedValue({
        vendorId: UUID,
        totalPaid: 10000,
        totalPending: 5000,
        currency: 'BDT',
      });
      const result = await service.getSummary(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('configure()', () => {
    it('throws not implemented', async () => {
      await expect(
        service.configure({
          vendorId: UUID,
          method: 'bank_transfer',
          cycle: 'weekly',
          autoPayout: false,
          requireApproval: true,
        }),
      ).rejects.toThrow();
    });
  });
});
