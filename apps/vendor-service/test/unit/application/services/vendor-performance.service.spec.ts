import { jest } from '@jest/globals';
import { VendorPerformanceService } from '../../../../src/module/application/services/impl/vendor-performance.service.js';
import type { VendorPerformanceRepository } from '../../../../src/module/domain/repositories/vendor-performance.repository.interface.js';
import { VendorPerformanceEntity } from '../../../../src/module/domain/entities/vendor-performance.entity.js';
import { PerformanceGradeVO } from '../../../../src/module/domain/value-objects/primitives/performance-grade.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const END = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

function makePerf(): VendorPerformanceEntity {
  return VendorPerformanceEntity.create({
    id: UUID,
    vendorId: UUID,
    evaluationPeriodStart: NOW,
    evaluationPeriodEnd: END,
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorPerformanceRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findLatestByVendorId: jest.fn(),
    findByGrade: jest.fn(),
    findAtRisk: jest.fn(),
    findAutoSuspendCandidates: jest.fn(),
    findReinstatementCandidates: jest.fn(),
    findEvaluationDue: jest.fn(),
    getStats: jest.fn(),
    countByGrade: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorPerformanceRepository>;
}

describe('VendorPerformanceService', () => {
  let service: VendorPerformanceService;
  let repo: jest.Mocked<VendorPerformanceRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorPerformanceService(repo);
  });

  describe('evaluate()', () => {
    it('creates + recalculates + saves', async () => {
      const p = makePerf();
      repo.save.mockResolvedValue(p);
      const result = await service.evaluate({
        vendorId: UUID,
        evaluationPeriodStart: NOW,
        evaluationPeriodEnd: END,
        orderCount: 100,
      });
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('issueWarning()', () => {
    it('issues when record exists', async () => {
      const p = makePerf();
      repo.findLatestByVendorId.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.issueWarning(UUID);
      expect(result.vendorId).toBe(UUID);
    });

    it('throws when no record', async () => {
      repo.findLatestByVendorId.mockResolvedValue(null);
      await expect(service.issueWarning(UUID)).rejects.toThrow();
    });
  });

  describe('clearWarning()', () => {
    it('clears warning', async () => {
      const p = makePerf();
      repo.findLatestByVendorId.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.clearWarning(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('suspend()', () => {
    it('suspends performance record', async () => {
      const p = makePerf();
      repo.findLatestByVendorId.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.suspend(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('reinstate()', () => {
    it('reinstates performance record', async () => {
      const p = makePerf();
      repo.findLatestByVendorId.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.reinstate(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('recalculate()', () => {
    it('recomputes score', async () => {
      const p = makePerf();
      repo.findLatestByVendorId.mockResolvedValue(p);
      repo.save.mockResolvedValue(p);
      const result = await service.recalculate(UUID);
      expect(result.vendorId).toBe(UUID);
    });
  });

  describe('getLatestByVendorId()', () => {
    it('returns latest', async () => {
      repo.findLatestByVendorId.mockResolvedValue(makePerf());
      const result = await service.getLatestByVendorId(UUID);
      expect(result.vendorId).toBe(UUID);
    });

    it('throws when none', async () => {
      repo.findLatestByVendorId.mockResolvedValue(null);
      await expect(service.getLatestByVendorId(UUID)).rejects.toThrow();
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makePerf()]);
      const result = await service.listByVendor(UUID);
      expect(result).toHaveLength(1);
    });
  });
});
